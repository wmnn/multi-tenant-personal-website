<script>
    import About from "./About.svelte";
    export let data;
</script>

<main class="py-8 px-8 xl:px-[10%]">
    <p>About</p>
    <About about={data.about ?? ''}/>
</main>
