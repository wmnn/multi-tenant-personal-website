import type { AuthManager, User, UserStore } from "./singleton";

import { error, json, redirect, type RequestEvent } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private'

const refreshPath = '/api/refresh'

/**
 * Handles mostly authentication / authorization through cookies and a RequestEvent.
 */
export class AuthManagement implements AuthManager {

    private userStore;

    constructor(userStore: UserStore) {
        this.userStore = userStore;
    }

    userCanCreatePosts(): boolean {
        return true;
    }

    async getUserId(e: RequestEvent) : Promise<number> {
        
        const accessToken = e.cookies.get('access-token') ?? undefined

        // No access token cookie
        if (!accessToken) {
            this.removeAllCookies(e);
            return -1;
        }

        return await (new Promise(async (resolve, _) => {
            jwt.verify(accessToken, JWT_SECRET, function(err, decoded: any) {
                if (err || !decoded || !decoded.id) return resolve(-1);
                console.log(decoded)
                resolve(decoded.id)
            })
        }))
    }

    async handleLogin(event: RequestEvent) {
        
        const formData = await event.request.formData();
        const email = formData.get('email') as string ?? '';
        const password = formData.get('password') as string ?? '';

        // Getting user and checking password
        const user: User | undefined = await this.userStore.findUser(email, password);
        
        if (user == undefined) {
            error(401, {
                message: "Couldn't log in user."
            });
        }

        // Setting cookies
        this.setAccessToken(event, user.id);
        this.setRefreshToken(event, user.id);

        // Redirecting to admin panel
        redirect(303, '/admin');
    }

    async isAccessTokenValid(e: RequestEvent): Promise<boolean> {

        const accessToken = e.cookies.get('access-token') ?? undefined

        // No access token cookie
        if (!accessToken) {
            this.removeAllCookies(e);
            return false;
        }

        return await (new Promise(async (resolve, _) => {
            jwt.verify(accessToken, JWT_SECRET, function(err, _) {
                if (err) console.log('Access token is not valid')
                if (err) return resolve(false);
                console.log('Access token is valid')
                return resolve(true)
            })
        }))
    
    }

    removeAllCookies(e: RequestEvent) {

        // Deleting the cookies set in the authentication process
        e.cookies.delete('access-token', { path: '/' })
        e.cookies.delete('refresh-token', { path: refreshPath,  httpOnly: true })

    }

    handleLogout(e: RequestEvent) {
        
        this.removeAllCookies(e);
        throw redirect(303, '/');

    }

    async handleRefresh(e: RequestEvent) {

        console.log('Refreshing tokens')
        const refreshToken = e.cookies.get('refresh-token') ?? undefined;

        // No refresh token cookie
        if (!refreshToken) {
            this.removeAllCookies(e);
            return json({status: 401});
        }

        const decoded: any = await (new Promise(async (resolve, reject) => {
            jwt.verify(refreshToken, JWT_SECRET, function(err, decoded) {
                if (err) reject(err);
                resolve(decoded)
            })
        })).catch(rejected => {
            this.removeAllCookies(e);
            return json({status: 401});
        });
   
        // Updating cookies
        this.setAccessToken(e, decoded.id);
        this.setRefreshToken(e, decoded.id);
        return json({status: 200});
    }

    private setAccessToken(e: RequestEvent, userId: string) {
        e.cookies.set('access-token', jwt.sign({ id: userId }, JWT_SECRET, {expiresIn: 10}), {
            path: '/',
            httpOnly: true
        });
    }

    private setRefreshToken(e: RequestEvent, userId: string) {
        e.cookies.set('refresh-token', jwt.sign({ id: userId }, JWT_SECRET, {expiresIn: '7d'}), {
            path: refreshPath,
            httpOnly: true
        });
    }

}