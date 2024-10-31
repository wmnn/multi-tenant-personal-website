<script lang="ts">
    import HeaderCategory from "./HeaderCategory.svelte";
	import HeaderItem from "./HeaderItem.svelte";

	export let isUserLoggedIn;
	export let headerPosts;
</script>
<header>
	<nav>
		<ul class="flex justify-end gap-8 py-8 px-8 border-b-2 border-black">

			{#each headerPosts as post}
				<HeaderCategory post={post} />
			{/each}

			<HeaderItem href={'/'} title={'Home'}/>

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