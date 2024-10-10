import { getAuthManager } from "$lib/server/singleton.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {

    if (!await getAuthManager().handleTokenVerification(event)) {
        return json({
            status : 401
        });
    }
    
    return json({
        status: 200
    });

}