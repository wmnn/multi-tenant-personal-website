import type { DB, User, UserStore, Post, CategoryEntry, KeyValueStore, Project } from "../types";
// @ts-ignore
// Doesn't work correctly ? Need to use process.env
// import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } from '$env/dynamic/private'

import mysql from 'mysql2/promise';
import { createHash } from "../HashManager";


export class MariaDB implements DB, UserStore, KeyValueStore {

    private con: mysql.Connection | null = null;

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
            const [rows] : any = await this.con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, createHash(password)]);
            
            if (rows.length == 0) {
                return resolve(undefined);
            }

            const user = rows[0];
            delete user['password'];
            resolve(user);
           
        })
    
    }

    async createUser(email: string, pageName: string, password: string): Promise<boolean> {
        
        try {

            if (!this.con) {
                return new Promise(resolve => resolve(false));
            }
            const [res] : any  = await this.con.query('INSERT IGNORE INTO users(email, pageName, password) VALUES (?,?,?)', [email, pageName, createHash(password)]);
            return new Promise(resolve => res.affectedRows == 1 ? resolve(true) : resolve(false));
        } catch (e) {
            return new Promise(resolve => resolve(false));
        }
    }

    async get(pageName: string, key: string): Promise<string | undefined> {

        return new Promise(async (resolve) => {
            if (!this.con) {
                return resolve(undefined);
            }
            const [rows] : any = await this.con.query('SELECT * FROM keyvaluestore WHERE `pageName` = ? AND \`key\` = ?', [pageName, key]);

            if (rows.length == 0) {
                resolve(undefined);
                return;
            }

            resolve(rows[0].value);
        })    

    }
 
    async set(pageName: string, key: string, value: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            if (!this.con) {
                return resolve(false);
            }

            const [res] : any  = await this.con.query(`INSERT INTO keyvaluestore (\`pageName\`, \`key\`, \`value\`)
                VALUES (?, ?, ?) 
                ON DUPLICATE KEY UPDATE value=?`
            , [pageName, key, value, value])
            res.affectedRows == 1 ? resolve(true) : resolve(false);
        });
    }

    async addProject(pageName:string, project: Project): Promise<boolean> {
        try {
            if (!this.con) {
                return new Promise(resolve => resolve(false));
            }
            const [res] : any  = await this.con.query('INSERT IGNORE INTO projects(pageName, title, imageUrl, href) VALUES (?,?,?,?)', [pageName, project.title, project.imageUrl, project.href]);
            console.log(res)
            return new Promise(resolve => res.affectedRows == 1 ? resolve(true) : resolve(false));
        } catch (e) {
            console.log(e)
            return new Promise(resolve => resolve(false));
        }
    }
    async editProject(pageName: string, title: string, newProject: any): Promise<boolean> {
        if (!this.con) return false;
    
        try {
            if (title !== newProject.title) {
                await this.deleteProject(pageName, title);
                title = newProject.title; 
            }
    
            const [res]: any = await this.con.query(
                `INSERT INTO projects (\`pageName\`, \`title\`, imageUrl, href)
                 VALUES (?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE imageUrl = VALUES(imageUrl), href = VALUES(href)`,
                [pageName, title, newProject.imageUrl, newProject.href]
            );
    
            return res.affectedRows > 0;
        } catch (error) {
            console.error('Error editing project:', error);
            return false;
        }
    }
    
    async deleteProject(pageName: string, title: any): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.con) {
                    return resolve(false);
                }
    
                const [result]: any = await this.con.query(
                    'DELETE FROM projects WHERE pageName = ? AND title = ?', 
                    [pageName, title]
                );
    
                // Check if rows were affected
                if (result.affectedRows > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error); // Reject the promise on error
            }
        });
    }
    
    async getProjects(pageName: string): Promise<Array<any>> {

        return new Promise(async (resolve) => {
            if (!this.con) {
                return resolve([]);
            }
    
            const [rows] : any = await this.con.query('SELECT * FROM projects WHERE pageName = ?', [pageName]);
            
            if (rows.length == 0) {
                return resolve([]);
            }

            resolve(rows as Array<any>);
           
        })

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