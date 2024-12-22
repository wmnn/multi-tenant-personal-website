import { getDB, getKeyValueStore } from "$lib/server/singleton.js";
import { json, type RequestEvent } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {

    // const query = event.url.searchParams.get('searchQuery') ?? ''
    
    return json({
        status: 200
	});
  
};

/** @type {import('./$types').RequestHandler} */
export async function PUT(event) {

    const body = await event.request.json()
    await getKeyValueStore().set(body.key, body.value)

    return json({
        status: 200
    })
}