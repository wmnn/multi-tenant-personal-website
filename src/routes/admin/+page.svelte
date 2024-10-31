<script lang="ts">
    import AdminViewPostsTable from '$lib/client/AdminViewPostsTable.svelte';
    import Button from '$lib/client/Button.svelte';
    import SearchPostsInput from '$lib/client/SearchPostsInput.svelte';
    export let data;
</script>

<main class="py-8 px-8 xl:px-[20%]">
    
    <h1 class="pb-4">Admin Panel</h1>
    <hr>
    <h2 class="py-4">Posts</h2>

    <SearchPostsInput bind:shownPosts={data.posts}/>
    
    <AdminViewPostsTable posts={data.posts} />
    
    <a href="/posts/create">
        <Button>
            Create Post
        </Button>
    </a>

    <h2>Categories</h2>
    <AdminViewPostsTable posts={data.categories} />

    <a href="/posts/create">
        <Button>Add a new category</Button>
    </a>
    
</main>
