import { getAuthManager, getDB } from "$lib/server/singleton.js";
import { json } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import fs from 'fs';

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

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {

    console.log('Before checking access token')
    if (!await getAuthManager().isAccessTokenValid(event)) {

        console.log('Returning json response with status code 401')
        return json({
            status: 401
        })
    }

    console.log('Writing image')
    const formData = await event.request.formData();
    const title = formData.get('title') as string ?? ''
    const content = formData.get('content') as string ?? ''
    const thumbnail = formData.get('thumbnail') as File;

    // Serving public image
    if (title == '' || content == '') {
        return json({
            status: 501
        })
    }
    if (!thumbnail) {
        // Writing data to database
        const postId = await getDB().createPost({
            title: title,
            content: content,
            author: (event.locals.userId as number),
            thumbnailHash: '',
            createdAt: new Date().toISOString()
        })
        return json({
            status: 200,
            postUrl: `/posts/${postId}`
        })
    }

    const buffer = Buffer.from(await thumbnail.arrayBuffer()); 
    const thumbnailId = randomUUID() + thumbnail.type.split('/')[1];
    const filePath = `./static/images/${thumbnailId}`;
    fs.writeFileSync(filePath, buffer); // Write the Buffer directly

    console.log('Saving new post')
    // Writing data to database
    const postId = await getDB().createPost({
        title: title,
        content: content,
        author: (event.locals.userId as number),
        thumbnailHash: thumbnailId,
        createdAt: new Date().toISOString()
    })

    if (postId == -1) {
        return json({
            status: 500,
        })
    }

    return json({
        status: 200,
        postUrl: `/posts/${postId}`
    })
    
};
