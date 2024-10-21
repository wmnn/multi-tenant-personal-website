<script lang="ts">
    import Button from '$lib/client/Button.svelte';
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
