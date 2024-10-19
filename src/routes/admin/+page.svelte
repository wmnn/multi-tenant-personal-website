<script lang="ts">
    import { fetchEndpoint } from '$lib/client/auth.js';
    import { onMount } from 'svelte';

    let data: any = ''

    onMount(async () => {
        data = await fetchEndpoint('/api/posts')
    })
</script>

<main>
    <p>Admin Panel</p>
    <p>Blocked content: {JSON.stringify(data)}</p>

    <hr>
    
    <a href="/posts/create">Create Post</a>
</main>
