import { Sqlite3Db } from '$lib/server/db/sqlite3'
import { AuthManagement } from './auth/authManagement'
import { CVManager, type CVManagerType } from './CVManager';
import type { AuthManager, DB, KeyValueStore, UserStore } from './types';

let db: DB | AuthManager | UserStore | KeyValueStore

export function getDB() : DB {
    if (!db) {
        db = new Sqlite3Db();
    }
    return db as DB
}

export function getAuthManager() : AuthManager {

    return new AuthManagement(getUserStore());

}

export function getCVManager(): CVManagerType {
    return new CVManager(getKeyValueStore());
}

export function getKeyValueStore(): KeyValueStore {
    if (!db) {
        db = new Sqlite3Db();
    }
    return db as KeyValueStore
}

export function getUserStore() : UserStore {
    if (!db) {
        db = new Sqlite3Db();
    }
    return db as UserStore
}