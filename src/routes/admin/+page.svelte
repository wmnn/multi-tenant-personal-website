<script lang="ts">
    import { fetchEndpoint } from '$lib/client/auth.js';
    import { onMount } from 'svelte';

    let data: any = ''

    onMount(async () => {
        data = await fetchEndpoint('/posts')
    })
</script>

<main>
    <p>Admin Panel</p>
    <p>Blocked content: {JSON.stringify(data)}</p>
</main>
