import type { AuthManager, DB, User } from "./singleton";

import sqlite3 from 'sqlite3';
import crypto from 'crypto'
import { error, json, redirect, type RequestEvent } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import { JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private'

export class Sqlite3Db implements DB, AuthManager {

    private db;

    constructor() {
        this.db = new sqlite3.Database('db.sqlite3');

        this.db.serialize(() => {

            // Creating user table
            this.db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT, 
                password VARCHAR(24)
            )`);
        
            // Creating admin account in order to be able to create posts
            const stmt = this.db.prepare(`
                INSERT OR REPLACE INTO users(email, password) VALUES ($email, $password);
            `);
            stmt.run({
                $email: ADMIN_EMAIL, 
                $password: this.createHash(ADMIN_PASSWORD)
            });
            stmt.finalize();
        });

    }

    private async findUser(email: string, password: string) : Promise<undefined | User> {

        return await new Promise(resolve => this.db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, this.createHash(password)], (err, user: User | undefined) => {
            if (err || user == undefined) {
                resolve(undefined);
                return;
            }

            delete user['password'];
            resolve(user);
        }))
    
    }

    userCanCreatePosts(): boolean {
        return true;
    }

    private createHash(stringToBeHashed: string) {
        return crypto.createHash('md5').update(stringToBeHashed).digest('hex')
    }

    async handleLogin(event: RequestEvent) {
        
        const formData = await event.request.formData();
        const email = formData.get('email') as string ?? '';
        const password = formData.get('password') as string ?? '';

        // Getting user and checking password
        const user = await this.findUser(email, password);
        
        if (user == undefined) {
            error(401, {
                message: "Couldn't log in user."
            });
        }

        // Setting cookies 60s * 15min = 900s
        event.cookies.set('access-token', jwt.sign({ id: user.id }, JWT_SECRET, {expiresIn: 10}), {
            path: '/',
            httpOnly: true
        });

        event.cookies.set('refresh-token', jwt.sign({ id: user.id }, JWT_SECRET, {expiresIn: '7d'}), {
            path: '/refresh', // The cookie will only be send to the server on the /refresh endpoint (CSRF Protection)
            httpOnly: true
        });        

        // Redirecting to admin panel
        redirect(303, '/admin');
    }

    async handleTokenVerification(e: RequestEvent) {

        const accessToken = e.cookies.get('access-token') ?? undefined

        // No access token cookie
        if (!accessToken) {
            this.removeAllCookies(e);
            return false;
        }

        const isValid = await (new Promise(async (resolve, _) => {
            jwt.verify(accessToken, JWT_SECRET, function(err, _) {
                if (err) resolve(false);
                resolve(true)
            })
        }))

        if (!isValid) {
            return false;
        } 

        return true;
    }

    removeAllCookies(e: RequestEvent) {

        // Deleting the cookies set in the authentication process
        e.cookies.delete('access-token', { path: '/' })
        e.cookies.delete('refresh-token', { path: '/refresh',  httpOnly: true })

    }

    handleLogout(e: RequestEvent) {
        
        this.removeAllCookies(e);
        throw redirect(303, '/');

    }

    handleRefresh(e: RequestEvent) {

        console.log('Refreshing tokens')
        const refreshToken = e.cookies.get('refresh-token') ?? undefined;

        // No refresh token cookie
        if (!refreshToken) {
            this.removeAllCookies(e);
            return json({status: 401});
        }
   
        // Updating cookies
        e.cookies.set('access-token', jwt.sign({ id: '' }, JWT_SECRET, {expiresIn: 10}), {
            path: '/',
            httpOnly: true
        });

        e.cookies.set('refresh-token', jwt.sign({ id: '' }, JWT_SECRET, {expiresIn: '7d'}), {
            path: '/refresh',
            httpOnly: true
        });

        return json({status: 200});
    }

}