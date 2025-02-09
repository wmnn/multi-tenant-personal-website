<script>
    import About from "./About.svelte";
    import Cv from "./CV.svelte";
    import Projects from "./Projects.svelte";

	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="px-8 xl:px-[10%]">

	<About about={data.about} />
	<hr class="my-8">
	<Cv workexperience={data.workexperience} education={data.education} />
	<hr class="my-8">
	<Projects />	
	
</div>



