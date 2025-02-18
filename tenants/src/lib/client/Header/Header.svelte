<script lang="ts">
    import HeaderMobile from "./HeaderMobile.svelte";
    import HeaderSubTitleHref from "./HeaderSubTitleHref.svelte";
    import HeaderTitle from "./HeaderTitle.svelte";

	export let isUserLoggedIn;
	export let title;
	export let socials
</script>

<header class="">
	<HeaderMobile {isUserLoggedIn} />

	<nav class='hidden xl:block w-full h-[100vh] sticky left-0 top-0'>
		<div class="px-8 flex flex-col justify-between gap-8 py-8">
			<a href={`/`}>
				<h1 class="text-nowrap">{title}</h1>
			</a>
			<a href="/#about"><HeaderTitle>Über mich</HeaderTitle></a>
			<a href="/#CV"><HeaderTitle>Lebenslauf</HeaderTitle></a>
			<a href="/#projects"><HeaderTitle>Projekte</HeaderTitle></a>
		</div>

		<div class="px-8 py-8 flex flex-col gap-2 justify-center">
			<h2 class="text-reallylight">Contact</h2>
			{#each Object.keys(socials) as key}
				{#if socials[key] && socials[key] != ''}
					<HeaderSubTitleHref href={socials[key]}>
						{key}
					</HeaderSubTitleHref>
				{/if}
			{/each}
		</div>

		<!-- <HeaderAdmin {isUserLoggedIn}/> -->

		<div class="grow h-full"></div>
	</nav>
</header>