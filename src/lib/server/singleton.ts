import { Sqlite3Db } from '$lib/server/sqlite3'
import type { RequestEvent } from '@sveltejs/kit'
import { AuthManagement } from './authManagement'
let db: DB | AuthManager | UserStore

/**
 * Interface for a class with database logic
 */
export interface DB {

    createPost(post: Post): Promise<number>
    getPost(postId: number): Promise<Post | undefined>
    getPosts(count: number, latestFlag: boolean) : Promise<Post[]>
    updatePost(post: Post): Promise<number>

}

/**
 * Interface for a class with authentication logic
 */
export interface AuthManager {

    userCanCreatePosts(): boolean
    handleLogin(e: RequestEvent): any
    handleLogout(e: RequestEvent): any
    handleRefresh?(e: RequestEvent): any
    isAccessTokenValid(e: RequestEvent): Promise<boolean>
    getUserId(e: RequestEvent): Promise<number>

}

export interface UserStore {

    findUser(email: string, password: string): Promise<undefined | User>

}

export interface User {

    id : string,
    email : string,
    password? : string

}

export interface Post {
    id?: number,
    title: string,
    content: string,
    thumbnailHash?: string,
    author?: number,
    createdAt?: string,
}

export interface PostBeforeSaving extends Post {
    file?: File
}

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