import type { CategoryEntry, Post } from "$lib/server/types";
import { request } from "./auth";
import type { CreateAndUpdatePostReqData } from "./requestTypes";

export async function createAndUpdatePostReq(postId: number, title: string, content: string, isEditingExistingPost: boolean, categoryPosts: Array<Post>) {
    const categoryEntries: Array<CategoryEntry> = categoryPosts.map((post, i) => {
        return {
            postId: post.id ?? -1,
            position: i + 1
        }
    });
    const postRequestData: CreateAndUpdatePostReqData = {
        title,
        content,
        categoryEntries: categoryEntries
    }
    if (isEditingExistingPost && postId !== -1) {
        postRequestData.id = postId;
    }

    const res = await request('/api/posts', {
        method: isEditingExistingPost ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(postRequestData),
    })

    if (res.status == 200 && res.postUrl) {
        window.location.href = res.postUrl;
    }
}