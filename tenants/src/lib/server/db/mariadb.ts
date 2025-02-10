import type { DB, User, UserStore, Post, CategoryEntry, KeyValueStore } from "../types";
// @ts-ignore
// Doesn't work correctly ? Need to use process.env
// import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } from '$env/dynamic/private'

import mysql from 'mysql2/promise';
import { createHash } from "../HashManager";


export class MariaDB implements DB, UserStore, KeyValueStore {

    private con: any;

    constructor() {

        (async () => {
   
            this.con = await mysql.createConnection({
                host: process.env.MYSQL_HOST!,
                user: process.env.MYSQL_USER!,
                database: process.env.MYSQL_DB!,
                password: process.env.MYSQL_PASSWORD!,
                port: parseInt(process.env.MYSQL_PORT!),
            });
  
        })()
        
    }

    async findUser(email: string, password: string) : Promise<undefined | User> {

        return new Promise(async (resolve) => {
            if (!this.con) {
                return resolve(undefined);
            }
    
            const [rows] = await this.con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, createHash(password)]);
            
            if (rows.length == 0) {
                return resolve(undefined);
            }

            const user = rows[0];
            delete user['password'];
            resolve(user);
           
        })
    
    }

    async createUser(email: string, pageName: string, password: string): Promise<boolean> {
        
        const [res] = await this.con.query('INSERT IGNORE INTO users(email, pageName, password) VALUES (?,?,?)', [email, pageName, createHash(password)]);
        return new Promise(resolve => res.affectedRows == 1 ? resolve(true) : resolve(false));

    }

    async get(pageName: string, key: string): Promise<string | undefined> {

        return new Promise(async (resolve) => {
            if (!this.con) {
                return resolve(undefined);
            }

            const [rows] = await this.con.query('SELECT * FROM keyvaluestore WHERE pageName = ? AND \`key\` = ?', [pageName, key]);

            if (rows.length == 0) {
                resolve(undefined);
                return;
            }
            try {   
                resolve(rows[0].value)
            } catch(e) {
                resolve(undefined)
            }
        })    

    }
 
    async set(pageName: string, key: string, value: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            const [res] = await this.con.query(`INSERT INTO keyvaluestore (\`pageName\`, \`key\`, \`value\`)
                VALUES (?, ?, ?) 
                ON DUPLICATE KEY UPDATE value=?`
            , [pageName, key, value, value])
            res.affectedRows == 1 ? resolve(true) : resolve(false);
        });
    }

    // async createPost(post: Post): Promise<number> {
    //     return new Promise(resolve => -1);
    // }

    // async getPost(postId: number): Promise<Post | undefined> {

    //     return new Promise(resolve => resolve(undefined));
    // }

    // async updatePost(post: Post): Promise<number> {
    //     return new Promise(resolve => -1);
    // }

    // async deletePost(postId: number): Promise<boolean> {
    //     return new Promise(resolve => false);
    // }

    // async getPosts(query: string) : Promise<Post[]> {
    //     return new Promise(resolve => []);
    // }

    // async getCategories(): Promise<Post[]> {
        
    //     return new Promise(resolve => []);
    // }

    // async updateCategory(categoryId: number, data: Array<CategoryEntry>): Promise<any> {
    //     return new Promise(resolve => -1);
    // }
}