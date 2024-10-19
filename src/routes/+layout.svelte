<script>
	import Header from './Header.svelte';
	import '../app.css';

	export let data;

</script>

<div class="app">
	<Header isUserLoggedIn={data.isUserLoggedIn}/>

	<main>
		<slot />
	</main>

	<footer class="py-8 border-t-2 border-black flex justify-center">
		<p>Some Footer</p>
	</footer>
</div>

<style>

</style>
