import type { DB, User, UserStore, Post, CategoryEntry, KeyValueStore } from "../types";
// @ts-ignore
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } from '$env/dynamic/private'

import mysql from 'mysql2/promise';
import crypto from 'crypto'


export class MariaDB implements DB, UserStore, KeyValueStore {

    private db;

    constructor() {
        this.db = null;
        return;
        this.db = mysql.createPool({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DB,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    async getCategories(): Promise<Post[]> {
        
        return new Promise(resolve => []);
    }

    async findUser(email: string, password: string) : Promise<undefined | User> {

        return new Promise(resolve => undefined);
    
    }

    async createUser(email: string, password: string): Promise<boolean> {
        return new Promise(resolve => false);
    }


    async createPost(post: Post): Promise<number> {
        return new Promise(resolve => -1);
    }

    async getPost(postId: number): Promise<Post | undefined> {

        return new Promise(resolve => undefined);
    }

    async updatePost(post: Post): Promise<number> {
        return new Promise(resolve => -1);
    }

    async deletePost(postId: number): Promise<boolean> {
        return new Promise(resolve => false);
    }

    async getPosts(query: string) : Promise<Post[]> {
        return new Promise(resolve => []);
    }

    private createHash(stringToBeHashed: string) {
        return crypto.createHash('sha256').update(stringToBeHashed).digest('hex')
    }
    async updateCategory(categoryId: number, data: Array<CategoryEntry>): Promise<any> {
        return new Promise(resolve => -1);
    }

    async get(key: string): Promise<string | undefined> {
        return new Promise(resolve => undefined);
    }
 
    async set(key: string, value: string): Promise<boolean> {
        return new Promise(resolve => false);
    }

}