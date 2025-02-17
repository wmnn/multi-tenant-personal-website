// import type { CreateAndUpdatePostReqData } from "$lib/client/requestTypes.js";
// import { getDB, type Post } from "$lib/server/singleton.js";
// import { json, type RequestEvent } from "@sveltejs/kit";
// import { randomUUID } from "crypto";
// import fs from 'fs';

// /** @type {import('./$types').RequestHandler} */
// export async function GET(event) {

//     const query = event.url.searchParams.get('searchQuery') ?? ''
    
//     return json({
//         status: 200,
// 		posts: await getDB().getPosts(query as any)
// 	});
  
// };

// /** @type {import('./$types').RequestHandler} */
// export async function POST(event) {

//     const reqData: CreateAndUpdatePostReqData = await event.request.json();
//     console.log(reqData)
//     const post = reqData as Post;
//     post.author = event.locals.userId;

//     // Serving public image
//     if (!isPostTitleAndContentValid(post) || post.author == -1) {
//         return json({
//             status: 501
//         })
//     }

//     // Writing data to database
//     post.id = await getDB().createPost(post)

//     if (post.id == -1) {
//         return json({
//             status: 500,
//         })
//     }
     
//     await getDB().updateCategory(post.id, reqData.categoryEntries);

//     return json({
//         status: 200,
//         postUrl: `/posts/${post.id}`
//     })
    
// };

// function isPostTitleAndContentValid(post: Post): boolean {

//     if (post.title == '' || post.content == '') return false;
//     return true;

// }
// async function writeFileToStaticFolder(file: File): Promise<string> {

//     console.log('Writing image')
//     const buffer = Buffer.from(await file.arrayBuffer()); 
//     const thumbnailHash = randomUUID() + file.type.split('/')[1];
//     const filePath = `./static/images/${thumbnailHash}`;
//     fs.writeFileSync(filePath, buffer); // Write the Buffer directly
//     return thumbnailHash;

// }

// /** @type {import('./$types').RequestHandler} */
// export async function PUT(event) {

//     const reqData: CreateAndUpdatePostReqData = await event.request.json();
//     const post = reqData as Post;
//     post.author = event.locals.userId;

//     // Serving public image
//     if (post.title == '' || post.content == '' || post.author == -1) {
//         return json({
//             status: 501
//         })
//     }

//     // Writing data to database
//     post.id = await getDB().updatePost(post)

//     if (post.id == -1) {
//         return json({
//             status: 500,
//         })
//     }

//     await getDB().updateCategory(post.id, reqData.categoryEntries);
        
//     return json({
//         status: 200,
//         postUrl: `/posts/${post.id}`
//     })

// }

// /** @type {import('./$types').RequestHandler} */
// export async function DELETE(event) {

//     const formData = await event.request.formData();
//     const postId = formData.get('id') ?? -1;

//     if (postId == -1) {
//         return json({
//             status: 500,
//         })
//     }

//     if (!await getDB().deletePost(postId as any)) {
//         return json({
//             status: 500,
//         })
//     }

//     return json({
//         status: 200
//     })

// }