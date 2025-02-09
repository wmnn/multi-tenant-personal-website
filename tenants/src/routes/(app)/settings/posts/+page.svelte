<script>

    import Posts from "./Posts.svelte";
    export let data;

</script>
<main class="py-8 px-8 xl:px-[10%]">
    <h1 class="pb-4">Posts</h1>
    <hr>
    <Posts posts={data.posts}/>
    
</main>