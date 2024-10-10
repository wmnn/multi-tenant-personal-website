import { Sqlite3Db } from '$lib/server/sqlite3'
import type { RequestEvent } from '@sveltejs/kit'
import { AuthManagement } from './authManagement'
let db: DB | AuthManager

/**
 * Interface for a class with database logic
 */
export interface DB {
    
}

/**
 * Interface for a class with authentication logic
 */
export interface AuthManager {

    userCanCreatePosts(): boolean
    handleLogin(e: RequestEvent): any
    handleLogout(e: RequestEvent): any
    handleRefresh?(e: RequestEvent): any
    handleTokenVerification(e: RequestEvent): any

}

export interface UserStore {

    findUser(email: string, password: string): Promise<undefined | User>

}

export interface User {

    id : string,
    email : string,
    password? : string

}

export function getDB() : DB {
    if (!db) {
        db = new Sqlite3Db();
    }
    return db
}

export function getAuthManager() : AuthManager {

    return new AuthManagement(getUserStore());

}

export function getUserStore() : UserStore {
    return getDB() as UserStore;
}