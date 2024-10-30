
<script lang="ts">

    import type { Post } from "$lib/server/singleton";
    import { onMount, tick } from "svelte";
    import Input from "./Input.svelte";
    import { request } from "./auth";

    export let shownPosts
    let searchQuery: string = ''

    onMount(async () => {
        await updateShownPosts();
    });

    async function updateShownPosts() {

        console.log('Updating shown posts')
        const res = await request('/api/posts?searchQuery=' + searchQuery, {
            method: 'GET',
        })

        if (res.status == 200) {
            shownPosts = res.posts
        }
        await tick();

    }
</script>

<div class="py-2 max-w-[360px]">
    <input bind:value={searchQuery} placeholder="Search" type ="text" on:input={async () => await updateShownPosts()}/>
</div>