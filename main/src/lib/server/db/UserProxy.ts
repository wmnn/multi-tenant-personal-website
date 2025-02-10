import type { User, UserStore } from "../types";

class UserProxy implements UserStore {

    private userStore: UserStore;

    constructor(userStore: UserStore) {
        this.userStore = userStore;
    }

    findUser(email: string, password: string): Promise<undefined | User> {
        return this.userStore.findUser(email, password);
    }

    createUser(email: string, pageName: string, password: string): Promise<boolean> {
        return this.userStore.createUser(email, pageName, password)
    }
    
}