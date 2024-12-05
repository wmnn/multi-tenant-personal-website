<script lang="ts">
    import About from './About.svelte';
    import Categories from './Categories.svelte';
    import Posts from './Posts.svelte';
    export let data;
</script>

<main class="py-8 px-8 xl:px-[10%]">
    
    <h1 class="pb-4">Admin Panel</h1>
    <hr>
    <About about={data.about ?? ''}/>
    <Posts posts={data.posts}/>
    <Categories categories={data.categories} />
    
</main>
