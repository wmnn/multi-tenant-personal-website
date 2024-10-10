import { getAuthManager } from "$lib/server/singleton.js";

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {

    return getAuthManager().handleLogout(event);

}