import { Sqlite3Db } from '$lib/server/sqlite3'
import type { RequestEvent } from '@sveltejs/kit'
import { AuthManagement } from './authManagement'
import type { AuthManager, DB, UserStore } from './types';
let db: DB | AuthManager | UserStore


export function getDB() : DB {
    if (!db) {
        db = new Sqlite3Db();
    }
    return db as DB
}

export function getAuthManager() : AuthManager {

    return new AuthManagement(getUserStore());

}

export function getUserStore() : UserStore {
    if (!db) {
        db = new Sqlite3Db();
    }
    return db as UserStore
}