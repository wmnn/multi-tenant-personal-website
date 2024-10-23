import { getDB, type PostBeforeSaving, type Post } from "$lib/server/singleton.js";
import { json, type RequestEvent } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {

    const formData = await event.request.formData();
    const post = getPost(formData, event);

    // Serving public image
    if (!isPostTitleAndContentValid(post)) {
        return json({
            status: 501
        })
    }

    /*if (post.file) {
        post.thumbnailHash = await writeFileToStaticFolder(post.file);
    } else {*/
    post.thumbnailHash = ''
    //}

    // Writing data to database
    post.id = await getDB().createPost(post)

    if (post.id == -1) {
        return json({
            status: 500,
        })
    }

    return json({
        status: 200,
        postUrl: `/posts/${post.id}`
    })
    
};

function isPostTitleAndContentValid(post: Post): boolean {

    if (post.title == '' || post.content == '') return false;
    return true;

}
async function writeFileToStaticFolder(file: File): Promise<string> {

    console.log('Writing image')
    const buffer = Buffer.from(await file.arrayBuffer()); 
    const thumbnailHash = randomUUID() + file.type.split('/')[1];
    const filePath = `./static/images/${thumbnailHash}`;
    fs.writeFileSync(filePath, buffer); // Write the Buffer directly
    return thumbnailHash;

}
function getPost(formData: FormData, e: RequestEvent): PostBeforeSaving {

    return {
        id: formData.get('id') as any ?? -1,
        title: formData.get('title') as string ?? '',
        content: formData.get('content') as string ?? '',
        author: (e.locals.userId as number),
        createdAt: new Date().toISOString(),
        file: formData.get('thumbnail') as File
    }
}

/** @type {import('./$types').RequestHandler} */
export async function PUT(event) {

    const formData = await event.request.formData();
    const post = getPost(formData, event);

    // Serving public image
    if (post.title == '' || post.content == '') {
        return json({
            status: 501
        })
    }

    post.thumbnailHash = ''

    // Writing data to database
    post.id = await getDB().updatePost(post)

    if (post.id == -1) {
        return json({
            status: 500,
        })
    }

    return json({
        status: 200,
        postUrl: `/posts/${post.id}`
    })

}

/** @type {import('./$types').RequestHandler} */
export async function DELETE(event) {

    const formData = await event.request.formData();
    const postId = formData.get('id') ?? -1;

    if (postId == -1) {
        return json({
            status: 500,
        })
    }

    if (!await getDB().deletePost(postId as any)) {
        return json({
            status: 500,
        })
    }

    return json({
        status: 200
    })

}