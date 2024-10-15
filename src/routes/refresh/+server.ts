import { getAuthManager } from "$lib/server/singleton.js";
import { error, redirect } from "@sveltejs/kit";

/**
 * This endpoint is responsible for issueing a new access and refresh token
 * @type {import('./$types').RequestHandler}
 */
export async function GET(event) {

    // Checking if the auth manager implemented the handle refresh method
    if (typeof getAuthManager().handleRefresh === 'function') {
        return getAuthManager().handleRefresh!(event);
    }

    // If the auth manager didn't implement the method, we will redirect the user to the main page on this endpoint
    throw redirect(302, '/'); 
    
}