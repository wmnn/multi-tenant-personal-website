import { getAuthManager } from "$lib/server/singleton.js";
import { json } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import fs from 'fs';

/*
* @type {import('./$types').RequestHandler}
*/
export async function POST(event) {
    if (!await getAuthManager().isAccessTokenValid(event)) {
        return json({
            status: 404
        })
    }

    const formData = await event.request.formData();
    // const title = formData.get('title') as string ?? ''
    // const content = formData.get('content') as string ?? ''
    const thumbnail = formData.get('thumbnail') as File ?? ''

    // console.log(title)
    // console.log(content)
    // console.log(thumbnail)

    const blob = new Blob([thumbnail], { type: thumbnail.type });
    const buffer = await blob.arrayBuffer(); 

    // Create a typed array from the ArrayBuffer
    // const uint8Array = new Uint8Array(buffer);
    // console.log('Typed Array:', uint8Array);

    // Print the content of the typed array
    // console.log('Array Content:', Array.from(uint8Array));
    
    // Convert ArrayBuffer to string
    const decoder = new TextDecoder(); // Use the TextDecoder API
    // console.log('Blob as String:', decoder.decode(buffer));

    fs.writeFileSync('./static/' + randomUUID() + '.' + thumbnail.type.split('/')[1], decoder.decode(buffer));
};
