<script lang="ts">
    import HeaderCategory from "./HeaderCategory.svelte";
	import HeaderItem from "./HeaderItem.svelte";

	export let isUserLoggedIn;
	export let headerPosts;
</script>
<header>
	<nav class={`flex justify-between gap-8 py-8 px-8 ${/*border-b-2*/''} border-black items-center`}>

		<a href={`/`}>
			<h1>
				{`Peter Würdemann`}
			</h1>
		</a>
		
		<ul class="flex gap-8">

			{#each headerPosts as post}
				<HeaderCategory post={post} />
			{/each}

			{#if isUserLoggedIn}
				<HeaderItem href={'/admin'} title={'Admin'}/>
				<HeaderItem href={'/api/logout'} title={'LogOut'}/>
			{:else}
				<HeaderItem href={'/login'} title={'Login'}/>
			{/if}
			
		</ul>
	</nav>
</header>

<style>
	
</style>