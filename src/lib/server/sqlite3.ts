import type { DB, User, UserStore, Post } from "./singleton";

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
                    thumbnailHash	TEXT NOT NULL,
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
        
        return new Promise(resolve => { 
            this.db.run(
                `INSERT INTO posts(title, content, author, thumbnailHash, createdAt) VALUES (?, ?, ?, ?, ?)`, 
                [ post.title, post.content, post.author, post.thumbnailHash, post.createdAt ?? new Date().toISOString()], 
                function(err: any) {
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

    async getPosts(count: number, latestFlag: boolean) : Promise<Post[]> {

        if (latestFlag) {
            return await new Promise(resolve => this.db.all('SELECT * FROM posts ORDER BY createdAt DESC LIMIT ?', [count], (err, posts: Post[]) => {
                if (err) {
                    console.error(err)
                    return resolve([]);
                }
                resolve(posts);
            }))
        } else {
            return await new Promise(resolve => this.db.all('SELECT * FROM posts LIMIT ?', [count], (err, posts: Post[]) => {
                if (err) {
                    console.error(err)
                    return resolve([]);
                }
                resolve(posts);
            }))
        }
    }

    private createHash(stringToBeHashed: string) {
        return crypto.createHash('md5').update(stringToBeHashed).digest('hex')
    }

}