import type { CreateAndUpdatePostReqData } from "$lib/client/requestTypes.js";
import { getDB, type Post } from "$lib/server/singleton.js";
import { json, type RequestEvent } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import fs from 'fs';

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
    await getDB().updateContent(body.key, body.value)

    return json({
        status: 200
    })
}