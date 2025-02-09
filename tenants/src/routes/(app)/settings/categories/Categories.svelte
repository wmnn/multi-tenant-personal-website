<script lang="ts">
    import AdminViewPostsTable from '$lib/client/AdminViewPostsTable.svelte';
    import Button from '$lib/client/Button.svelte';

    export let categories;
</script>

<div>
    <h2>Categories</h2>
    <AdminViewPostsTable posts={categories} />

    <a href="/posts/create">
        <Button>Add a new category</Button>
    </a>
</div>
