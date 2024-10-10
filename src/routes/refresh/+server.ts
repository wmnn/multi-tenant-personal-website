import { getAuthManager } from "$lib/server/singleton.js";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {

    if (typeof getAuthManager().handleRefresh === 'function') {
        return getAuthManager().handleRefresh!(event);
    }

    throw redirect(302, '/'); 
    
}