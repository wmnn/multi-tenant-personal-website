import type { DB, User, UserStore, Post, CategoryEntry } from "./singleton";

import sqlite3 from 'sqlite3';
import crypto from 'crypto'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private'

export class Sqlite3Db implements DB, UserStore {

    private db;

    constructor() {
        this.db = new sqlite3.Database('db.sqlite3');

        this.db.serialize(() => {

            // Creating user table
            this.db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT, 
                password VARCHAR(24)
            )`);

            // Creating posts table
            this.db.run(`
                CREATE TABLE IF NOT EXISTS posts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title	TEXT NOT NULL,
                    content	TEXT NOT NULL,
                    author	INTEGER NOT NULL,
                    createdAt	TEXT NOT NULL
                ); 
            `);

            // Create admin account if it doesn't exist
            this.db.get('SELECT * FROM users WHERE email = ? AND password = ?;', [ADMIN_EMAIL, this.createHash(ADMIN_PASSWORD)], (err, user: User | undefined) => {
                if (err || user == undefined) {
                    const stmt = this.db.prepare(`
                        INSERT INTO users(id, email, password) VALUES (1, $email, $password);
                    `);
                    stmt.run({
                        $email: ADMIN_EMAIL, 
                        $password: this.createHash(ADMIN_PASSWORD)
                    });
                    stmt.finalize();
                }
            })

            // Creating categories table
            this.db.run(`CREATE TABLE IF NOT EXISTS categories (
                id INTEGER NOT NULL,
                elementId INTEGER NOT NULL, 
                position INTEGER NOT NULL,
                PRIMARY KEY(id, position)
            )`);
        
        });

    }

    async findUser(email: string, password: string) : Promise<undefined | User> {

        return await new Promise(resolve => this.db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, this.createHash(password)], (err, user: User | undefined) => {
            if (err || user == undefined) {
                resolve(undefined);
                return;
            }

            delete user['password'];
            resolve(user);
        }))
    
    }

    async createPost(post: Post): Promise<number> {
        
        console.log('Saving new post in database ' + JSON.stringify(post))

        return new Promise(resolve => { 
            this.db.run(
                `INSERT INTO posts(title, content, author, createdAt) VALUES (?, ?, ?, ?)`, 
                [ post.title, post.content, post.author, new Date().toISOString()], 
                function (err: any) {
                    if (err) {
                        resolve(-1);
                    }
                    // get the last insert id
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                    resolve(this.lastID);
                }
            );
        })
    }

    async getPost(postId: number): Promise<Post | undefined> {

        return await new Promise(resolve => this.db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post: Post | undefined) => {
            if (err || post == undefined) {
                return resolve(undefined);
            }

            resolve(post);
        }))

    }

    async updatePost(post: Post): Promise<number> {

        console.log('Updating post in database ' + JSON.stringify(post))

        return new Promise(resolve => { 
            this.db.run(
                `UPDATE posts SET title = ?, content = ? WHERE id = ?`, 
                [ post.title, post.content, post.id], 
                function(err: any) {
                    if (err) return resolve(-1);
                    
                    // this.changes == 1 => one row is affected
                    if (this.changes == 1) return resolve(post.id!);
                    resolve(-1);
                }
            );
        })

    }

    async deletePost(postId: number): Promise<boolean> {

        console.log('Deleting post in database ' + postId)

        return new Promise(resolve => { 
            this.db.run(
                `DELETE FROM posts WHERE id = ?`, 
                [ postId ], 
                function(err: any) {
                    if (err) return resolve(false);
                    
                    // this.changes == 1 => one row is affected
                    if (this.changes == 1) return resolve(true);
                    resolve(false);
                }
            );
        })

    }

    async getPosts(query: string) : Promise<Post[]> {

     
        return await new Promise(resolve => this.db.all('SELECT * FROM posts WHERE title LIKE ? ORDER BY createdAt DESC LIMIT 20', [`%${query}%`], (err, posts: Post[]) => {
            if (err) {
                console.error(err)
                return resolve([]);
            }
            resolve(posts);
        }))
           
    }

    private createHash(stringToBeHashed: string) {
        return crypto.createHash('md5').update(stringToBeHashed).digest('hex')
    }
    async updateCategory(categoryId: number, data: Array<CategoryEntry>): Promise<any> {

        console.log('Deleting category entries of category id ' + categoryId)
        await new Promise(resolve => { 
            this.db.run(
                `DELETE FROM categories WHERE id = ?`, 
                [ categoryId ], 
                function(err: any) {
                    if (err) return resolve(false);
                    
                    // this.changes == 1 => one row is affected
                    if (this.changes > 0) return resolve(true);
                    resolve(false);
                }
            );
        })

        if (data.length == 0) return;
        console.log('Updating category ' + categoryId + ' ' + JSON.stringify(data));
        return new Promise(resolve => { 

            const stringToAdd = data.map(_ => '?,?,?').join('),(')
            const sqlStatement = `INSERT INTO categories(id, elementId, position) VALUES (${stringToAdd});`;

            const values: Array<any> = data.reduce((acc, obj) => {
                console.log(obj)
                acc.push(categoryId);
                acc.push(obj.postId);
                acc.push(obj.position);
                return acc;
            }, [] as any);

            this.db.run(sqlStatement, values, function(err: any) {
                if (err) {
                    resolve(-1);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                resolve(this.lastID);
            });
        })

    }

}