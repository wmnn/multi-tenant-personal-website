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
    getPosts(query: string) : Promise<Post[]>
    updatePost(post: Post): Promise<number>
    deletePost(postId: number): Promise<boolean>
    getCategories(): Promise<Post[]>
    updateCategory(postId: number, json: any): Promise<any>
    getContent(key: string): Promise<string>
    updateContent(key: string, value: string): Promise<boolean>

}

export interface CategoryEntry {
    categoryId?: number,
    postId: number,
    position?: number
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
    content?: string,
    author?: number,
    createdAt?: string,
    subPosts?: Post[]
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