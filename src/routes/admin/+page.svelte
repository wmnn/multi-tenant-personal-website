<script lang="ts">
    import { fetchEndpoint } from '$lib/client/auth.js';
    import Button from '$lib/client/Button.svelte';
    import { onMount } from 'svelte';

    let data: any = ''

    onMount(async () => {
        data = await fetchEndpoint('/api/posts')
    })
</script>

<main class="py-8 px-8 xl:px-[20%]">
    <h1>Admin Panel</h1>

    <hr>
    
    <a href="/posts/create">
        <Button>
            Create Post
        </Button>
    </a>

    <h2>Categories</h2>

    <a href="/posts/create">
        <Button>Add a new category</Button>
    </a>
    
</main>
