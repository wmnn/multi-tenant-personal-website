<script>
	import Header from '$lib/client/Header/Header.svelte';
	import '../app.css';
	export let data;

</script>

<div class="app flex flex-col min-h-[100vh]">
	<Header isUserLoggedIn={data.isUserLoggedIn} />
	<div class="bg-[#e5e7eb] h-[1px]" />
	<main class="grow py-8 px-8">
		<slot />
	</main>
</div>