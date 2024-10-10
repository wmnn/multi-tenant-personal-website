import type { DB, User, UserStore } from "./singleton";

import sqlite3 from 'sqlite3';
import crypto from 'crypto'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private'

export class Sqlite3Db implements DB, UserStore {

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

    async findUser(email: string, password: string) : Promise<undefined | User> {

        return await new Promise(resolve => this.db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, this.createHash(password)], (err, user: User | undefined) => {
            if (err || user == undefined) {
                resolve(undefined);
                return;
            }

            delete user['password'];
            resolve(user);
        }))
    
    }

    private createHash(stringToBeHashed: string) {
        return crypto.createHash('md5').update(stringToBeHashed).digest('hex')
    }

}