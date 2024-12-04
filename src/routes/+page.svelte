<script>
    import About from "./About.svelte";
    import Cv from "./CV.svelte";
    import Projects from "./Projects.svelte";
</script>

<div class="px-8 xl:px-[10%]">
	<About />
	<hr class="my-8">
	<Cv />
	<hr class="my-8">
	<Projects />
</div>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

