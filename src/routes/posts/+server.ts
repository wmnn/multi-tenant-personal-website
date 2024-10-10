import { getAuthManager } from "$lib/server/singleton.js";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET(e) {

    // Protected route needs access token checking
    if (!await getAuthManager().isAccessTokenValid(e)) {
        return json({
            status : 401
        });
    }

    return json({
        status: 200
    });

}