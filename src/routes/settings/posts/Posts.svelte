<script lang="ts">
    import AdminViewPostsTable from '$lib/client/AdminViewPostsTable.svelte';
    import Button from '$lib/client/Button.svelte';
    import SearchPostsInput from '$lib/client/SearchPostsInput.svelte';
    export let posts: any;
</script>

<div>
    <h2 class="py-4">Posts</h2>

    <SearchPostsInput bind:shownPosts={posts}/>
    
    <AdminViewPostsTable posts={posts} />
    
    <a href="/posts/create">
        <Button>
            Create Post
        </Button>
    </a>
</div>