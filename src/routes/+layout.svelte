<script>
	import Header from './Header.svelte';
	import '../app.css';

	export let data;

</script>

<div class="app flex min-h-[100vh]">
	<Header isUserLoggedIn={data.isUserLoggedIn} headerPosts={data.headerPosts} />
	<div class="bg-[#e5e7eb] w-[1px]" />
	<main class="grow py-8">
		<slot />
	</main>
</div>

<style>

</style>
