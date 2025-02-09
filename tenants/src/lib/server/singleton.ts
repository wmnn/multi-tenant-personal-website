import { CVManager, type CVManagerType } from './db/CVManager';
import type { AuthManager, DB, KeyValueStore, UserStore } from './types';

let db: DB | AuthManager | UserStore | KeyValueStore

export function getDB() : DB {
    if (!db) {
        db = {} as any;
    }
    return db as DB
}

export function getCVManager(): CVManagerType {
    return new CVManager(getKeyValueStore());
}

export function getKeyValueStore(): KeyValueStore {
    if (!db) {
        db = {} as any;
    }
    return db as KeyValueStore
}

export function getUserStore() : UserStore {
    if (!db) {
        db = {} as any;
    }
    return db as UserStore
}