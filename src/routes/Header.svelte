<script lang="ts">
    import HeaderBlogItem from "./HeaderBlogItem.svelte";

	export let isUserLoggedIn;
	export let headerPosts;
</script>

<header>
	<nav class=''>

		<div class="px-8 flex flex-col justify-between gap-8 py-8">
			<a href={`/`}>
				<h1>{`Peter [Петр]`}</h1>
			</a>
			<a href="/#about"><h2>Über mich</h2></a>
			<a href="/#projects"><h2>Projekte</h2></a>
		</div>
		
		<hr>

		<HeaderBlogItem posts={headerPosts} isMainElement={true} isOpenOnHoverAllowed={true}/>
		
		<ul class="flex gap-4 flex-col w-full px-8 py-8 text-reallylight">			
			<h3 class="text-reallylight">Contact</h3>

			
			{#if isUserLoggedIn}
				<a href={`/admin`}>Admin</a>
				<a href={`/api/logout`}>LogOut</a>
			{:else}
				<a href={`/login`}>Login</a>
			{/if}
		</ul>
	</nav>
</header>

<style>
	
</style>