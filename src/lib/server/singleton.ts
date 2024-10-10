import { Sqlite3Db } from '$lib/server/sqlite3'
import type { RequestEvent } from '@sveltejs/kit'
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

    findUser(email: string): User | undefined
    findUser(email: string, password: string): User | undefined

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

    return getDB() as AuthManager;

}