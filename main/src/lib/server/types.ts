import type { RequestEvent } from "@sveltejs/kit"

export interface CVDataEntry {

    what: string,
    start: Date,
    end?: Date,
    where: string,
    experience: string
    
}

/**
 * Interface for a class with database logic
 */
export interface DB {
    addProject(pageName: string, project: any): Promise<boolean>
    deleteProject(pageName: string, title: string): Promise<boolean>
    editProject(pageName: string, title: string, project: any): Promise<boolean>
    getProjects(pageName: string): Promise<Array<any> | undefined>
    // createPost(post: Post): Promise<number>
    // getPost(postId: number): Promise<Post | undefined>
    // getPosts(query: string) : Promise<Post[]>
    // updatePost(post: Post): Promise<number>
    // deletePost(postId: number): Promise<boolean>
    // getCategories(): Promise<Post[]>
    // updateCategory(postId: number, json: any): Promise<any>

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

export interface KeyValueStore {
    get(pageName: string, key: string): Promise<string | undefined>
    set(pageName: string, key: string, value: string): Promise<boolean>
}

export interface UserStore {

    findUser(email: string, password: string): Promise<undefined | User>
    createUser(email: string, pageName: string, password: string): Promise<boolean>

}

export interface User {

    id : string,
    email : string,
    password? : string,
    pageName: string

}

export interface Post {
    id?: number,
    title: string,
    content?: string,
    author?: number,
    createdAt?: string,
    subPosts?: Post[]
}

export interface Socials {
    Email?: string,
    LinkedIn?: string,
    Facebook?: string,
    Instagram?: string,
    YouTube?: string,
    GitHub?: string
}
export interface Project {
    title: string,
    imageUrl: string,
    href: string
}