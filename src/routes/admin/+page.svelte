<script lang="ts">
    import AdminViewPostsTable from '$lib/client/AdminViewPostsTable.svelte';
import Button from '$lib/client/Button.svelte';
    import Input from '$lib/client/Input.svelte';
    export let data;
    let searchQuery: string;
</script>

<main class="py-8 px-8 xl:px-[20%]">
    
    <h1 class="pb-4">Admin Panel</h1>
    <hr>
    <h2 class="py-4">Posts</h2>

    <div class="py-2 max-w-[360px]">
        <Input value={searchQuery} placeholder="Search"/>
    </div>
    
    <AdminViewPostsTable posts={data.posts} />
    
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
