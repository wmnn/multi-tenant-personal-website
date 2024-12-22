import type { DB, User, UserStore, Post, CategoryEntry, KeyValueStore } from "../types";

import sqlite3 from 'sqlite3';
import crypto from 'crypto'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private'
import type { CVData } from "../CVManager";

export class Sqlite3Db implements DB, UserStore, KeyValueStore {

    private db;

    constructor() {
        this.db = new sqlite3.Database('db.sqlite3');

        this.initTablesAndContent()

    }

    private async initTablesAndContent() {
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

            this.db.run(`CREATE TABLE IF NOT EXISTS content (
                key TEXT NOT NULL,
                value TEXT NOT NULL,
                PRIMARY KEY(key)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS cvdata (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                position TEXT NOT NULL,
                start TEXT NOT NULL,
                end TEXT NOT NULL,
                location TEXT NOT NULL,
                experience TEXT NOT NULL
            )`);
        
        });
        this.createInitialContent()
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

    async get(key: string): Promise<string> {
        return new Promise(resolve => this.db.get('SELECT value FROM content WHERE key = ?', [key], (err, row: any) => {
            if (err || row == undefined) {
                return resolve('');
            }

            resolve(row.value);
        }))
    }
    async createContent(key: string, value: string): Promise<number> {
        return new Promise(resolve => { 
            this.db.run(
                `INSERT INTO content(key, value) VALUES (?, ?)`, 
                [ key, value ], 
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
    async set(key: string, value: string): Promise<boolean> {
        return new Promise(resolve => { 
            this.db.run(
                `UPDATE content SET value = ? WHERE key = ?`, 
                [ value, key ], 
                function(err: any) {
                    if (err) return resolve(false);
                    
                    // this.changes == 1 => one row is affected
                    if (this.changes == 1) return resolve(true);
                    resolve(false);
                }
            );
        })
    }
    private async createInitialContent() {

        let html = `
        <h1 class="inline-block text-4xl">Hallo !</h1>
        
        <span class="text-xl">
            Ich bin ein Webentwickler, welcher es liebt Nutzerschnittstellen zu erstellen und mit Daten zu arbeiten.<br>
            <br>

            <blockquote>
                <i>
                    Anything that can be Written in JavaScript, will Eventually be Written in JavaScript - Atwood's Law
                </i>
                
            </blockquote> 

            <br>

            In meiner Freizeit spiele ich Fußball, beschäftige mich im Fitnessstudio oder gehe gerne Essen.
        
        </span>

        <div class="max-h-[32px] flex justify-start gap-4 object-cover items-center">
            <img src="/projects/typescript.png" alt="" width='32px' height='32px'/>
            <img src="/projects/javascript.png" alt="" width='32px' height='32px'/>
            <img src="/projects/svelte.svg" alt="" width='32px' height='32px'/>
            <img src="/projects/react.svg" alt="" width='32px' height='32px'/>

            
            <img src="/projects/tailwind.png" alt="" width='32px' height='32px'/>

            <img src="/projects/mysql.png" alt="" width='32px' height='32px'/>
            <img src="/projects/mongo_db.jpeg" alt="" width='32px' height='32px'/>
            <img src="/projects/firebase.svg" alt="" width='32px' height='32px'/>
            <img src="/projects/github.svg" alt="" width='32px' height='32px'/>
        </div>
        
        `
        await this.createContent('about', html)

        
        const cvData: CVData = {
            workExperiences: [
                {
                    what: 'Software Developer Work Study',
                    start: new Date('Oct 2023 1'),
                    end: new Date('Mar 2024 31'),
                    where: 'Fan12 GmbH & Co. KG',
                    experience: ` • Mitarbeit an der Entwicklung neuer Features im Frontend- und Backend-Bereich\n • Sammeln (Scraping) und Aufbereiten von Daten von über 60 verschiedenen Webseiten. Sowie die Bereitstellung der Daten, in Form von Google Sheets Tabellen, durch die Google Cloud API.`
                },
                {
                    what: 'Software Developer Internship',
                    start: new Date('Aug 2023 1'),
                    end: new Date('Sep 2023 30'),
                    where: 'Fan12 GmbH & Co. KG',
                    experience: ` • Mitarbeit an der Entwicklung neuer Features im Frontend- und Backend-Bereich\n • Erstellung eines Programms, welches nach Empfang von neuen Emails, über das Netzwerk auf dem Zieldrucker das angehängte Dokument ausdruckt. Dabei wird in der Email der Zieldrucker spezifiziert.`
                }

            ],
            education: [
                {
                    what: 'Bachelor of Science in Computer Science',
                    start: new Date('Oct 2022 1'),
                    where: 'University Oldenburg',
                    experience: ` • Analysis für Informatiker 1.0\n • Softwareprojekt 1.0`
                }
            ]
        }
        await this.createContent('cv', JSON.stringify(cvData))
        
    }

}