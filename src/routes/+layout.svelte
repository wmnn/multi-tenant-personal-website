<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="py-8 border-t-2 border-black flex justify-center">
		<p>Some Footer</p>
	</footer>
</div>

<style>

</style>
