<script>
    import Categories from "./Categories.svelte";
    export let data;

</script>

<main class="py-8 px-8 xl:px-[10%]">
    <h1 class="pb-4">Categories</h1>
    <hr>
    <Categories categories={data.categories}/>
</main>