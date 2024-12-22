import type { DB, User, UserStore, Post, CategoryEntry, KeyValueStore } from "../types";

import sqlite3 from 'sqlite3';
import crypto from 'crypto'

export class Sqlite3Db implements DB, UserStore, KeyValueStore {

    private db;

    constructor() {
        this.db = new sqlite3.Database('db.sqlite3');
        this.initTables()
    }

    private async initTables() {
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

            // Creating categories table
            this.db.run(`CREATE TABLE IF NOT EXISTS categories (
                id INTEGER NOT NULL,
                elementId INTEGER NOT NULL, 
                position INTEGER NOT NULL,
                PRIMARY KEY(id, position)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS keyvaluestore (
                key TEXT NOT NULL,
                value TEXT NOT NULL,
                PRIMARY KEY(key)
            )`);
        });
    }

    async getCategories(): Promise<Post[]> {
        
        const ids: any = (await new Promise(resolve => this.db.all('SELECT DISTINCT id FROM categories', [], (err, row: any) => {
            if (err || row == undefined) {
                return resolve(undefined);
            }

            console.log(row)
            resolve(row);
        })) as any).map((o : any) => o.id);

        return await Promise.all(ids.map((id: number) => this.getPost(id)));
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

    async createUser(email: string, password: string): Promise<boolean> {
        // Create user if it doesn't exist yet
        return await new Promise(resolve => this.db.get('SELECT * FROM users WHERE email = ? AND password = ?;', [email, this.createHash(password)], (err, user: User | undefined) => {
            
            if (err || user == undefined) {
                const stmt = this.db.prepare(`
                    INSERT INTO users(id, email, password) VALUES (1, $email, $password);
                `);
                stmt.run({
                    $email: email, 
                    $password: this.createHash(password)
                });
                stmt.finalize();
            }
            return resolve(true);
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

        const post: Post | undefined = await new Promise(resolve => this.db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post: Post | undefined) => {
            if (err || post == undefined) {
                return resolve(undefined);
            }

            resolve(post);
        }))
        if (post == undefined) return undefined;

        const subPostsPromises: Array<Promise<Post | undefined>> = []
        await new Promise(resolve => {
            this.db.each('SELECT * FROM categories WHERE id = ? ORDER BY position', [postId], async (err, row: any) => {
                if (err || row == undefined) {
                    return;
                }
                subPostsPromises.push(this.getPost(row.elementId));
            }, () => {
                resolve(true);
            })
        });

        if (subPostsPromises.length == 0) return post;
        const results : any = await Promise.all(subPostsPromises);
        post.subPosts = results.filter((o: any) => o !== undefined) as Post[];
        console.log(post)
        return post;
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
        return crypto.createHash('sha256').update(stringToBeHashed).digest('hex')
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

    async get(key: string): Promise<string | undefined> {
        return new Promise(resolve => this.db.get('SELECT value FROM keyvaluestore WHERE key = ?', [key], (err, row: any) => {
            console.log(`Key value store getting key: ${key}`)

            if (err || row == undefined) {
                console.log(`Couldn't get value for key: ${key}`)
                return resolve(undefined);
            }

            console.log(`Value: ${row.value}`)

            resolve(row.value);
        }))
    }
 
    async set(key: string, value: string): Promise<boolean> {
        const success = await new Promise(resolve => { 
            this.db.run(
                `UPDATE keyvaluestore SET value = ? WHERE key = ?`, [ value, key ], function (err: any) {

                    if (err) {
                        return resolve(false);   
                    }
                    
                    console.log(this.changes)
                    // this.changes == 1 => one row is affected
                    if (this.changes == 1) return resolve(true);
                    resolve(false);
                }
            );
        })
        console.log(success)
        if (success) return new Promise(resolve => resolve (true));

        return new Promise(resolve => {
            this.db.run(
                `INSERT INTO keyvaluestore(key, value) VALUES (?, ?)`, [ key, value ], function (err: any) {
                    if (err) {
                        resolve(false);
                        return;
                    }
                    // get the last insert id
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                    resolve(true);
                }
            );
        });
    }

}