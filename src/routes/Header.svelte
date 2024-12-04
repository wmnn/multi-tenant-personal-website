<script lang="ts">
    import Hamburger from "$lib/client/icons/Hamburger.svelte";
    import Portal from "svelte-portal";
	import HeaderBlogItem from "./HeaderBlogItem.svelte";

	export let isUserLoggedIn;
	export let headerPosts;
	let isMobileNavDropdownShown = false;
	function hideMobileNavDrowdown() {
		isMobileNavDropdownShown = false;
	}
</script>

<header class="">
	<Portal>
		<nav class:h-full={isMobileNavDropdownShown} class='absolute w-full xl:hidden top-0 bg-white transition-all'>
			<button class="mt-8 mr-8 z-40 absolute right-0" on:click={() => isMobileNavDropdownShown = !isMobileNavDropdownShown}>
				<Hamburger />
			</button>

			{#if isMobileNavDropdownShown}
				<div>
					<div class="px-8 flex flex-col justify-between gap-8 py-8">
						<a href="/#about" on:click={hideMobileNavDrowdown}><h2>Über mich</h2></a>
						<a href="/#CV" on:click={hideMobileNavDrowdown}><h2>Lebenslauf</h2></a>
						<a href="/#projects" on:click={hideMobileNavDrowdown}><h2>Projekte</h2></a>
					</div>
					
					<hr>
			
					<HeaderBlogItem posts={headerPosts} isMainElement={true} isOpenOnHoverAllowed={false}/>
					
					<ul class="flex gap-4 flex-col w-full px-8 py-8 text-reallylight">			
						<h2 class="text-reallylight">Contact</h2>
						<a href={`https://www.linkedin.com/in/peter-wuerdemann/`} class="text-reallylight pl-4 text-l" target=”_blank”>LinkedIn</a>
			
						
						{#if isUserLoggedIn}
							<!-- <a href={`/admin`} on:click={hideMobileNavDrowdown}>Admin</a>
							<a href={`/api/logout`} on:click={hideMobileNavDrowdown}>LogOut</a> -->
						{:else}
							<a href={`/login`} on:click={hideMobileNavDrowdown}>Login</a>
						{/if}
					</ul>
				</div>
			{/if}
		</nav>
	</Portal>

	<nav class='hidden xl:block w-full h-[100vh] sticky left-0 top-0'>
		<div class="px-8 flex flex-col justify-between gap-8 py-8">
			<a href={`/`}>
				<h1 class="text-nowrap">Peter Würdemann</h1>
			</a>
			<a href="/#about"><h2>Über mich</h2></a>
			<a href="/#CV"><h2>Lebenslauf</h2></a>
			<a href="/#projects"><h2>Projekte</h2></a>
		</div>
		
		<hr>

		<HeaderBlogItem posts={headerPosts} isMainElement={true} isOpenOnHoverAllowed={true}/>
		
		
		<hr>

		<div class="px-8 py-8 flex flex-col gap-2 justify-center">
			<h2 class="text-reallylight">Contact</h2>
			<a href={`https://www.linkedin.com/in/peter-wuerdemann/`} class="text-reallylight pl-4 text-l" target=”_blank”>LinkedIn</a>
		</div>
		

		<ul class="flex gap-4 flex-col w-full px-8 py-8 text-reallylight">			
			
			{#if isUserLoggedIn}
				<!-- <a href={`/admin`}>Admin</a>
				<a href={`/api/logout`}>LogOut</a> -->
			{:else}
				<a href={`/login`}>Login</a>
			{/if}
		</ul>

		<div class="grow h-full"></div>
	</nav>
</header>