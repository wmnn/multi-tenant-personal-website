import type { AuthManager, User, UserStore } from "./singleton";

import { error, json, redirect, type RequestEvent } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private'


export class AuthManagement implements AuthManager {

    private userStore;

    constructor(userStore: UserStore) {
        this.userStore = userStore;
    }

    userCanCreatePosts(): boolean {
        return true;
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

    async isAccessTokenValid(e: RequestEvent): Promise<boolean> {

        const accessToken = e.cookies.get('access-token') ?? undefined

        // No access token cookie
        if (!accessToken) {
            this.removeAllCookies(e);
            return false;
        }

        return await (new Promise(async (resolve, _) => {
            jwt.verify(accessToken, JWT_SECRET, function(err, _) {
                if (err) resolve(false);
                resolve(true)
            })
        }))
    
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