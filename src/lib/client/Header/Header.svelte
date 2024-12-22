<script lang="ts">
    import HeaderAdmin from "./HeaderAdmin.svelte";
	import HeaderBlogItem from "./HeaderBlogItem.svelte";
    import HeaderMobile from "./HeaderMobile.svelte";
    import HeaderSubTitleHref from "./HeaderSubTitleHref.svelte";
    import HeaderTitle from "./HeaderTitle.svelte";

	export let isUserLoggedIn;
	export let headerPosts;
	export let title;
</script>

<header class="">
	<HeaderMobile {isUserLoggedIn} posts={headerPosts} />

	<nav class='hidden xl:block w-full h-[100vh] sticky left-0 top-0'>
		<div class="px-8 flex flex-col justify-between gap-8 py-8">
			<a href={`/`}>
				<h1 class="text-nowrap">{title}</h1>
			</a>
			<a href="/#about"><HeaderTitle>Über mich</HeaderTitle></a>
			<a href="/#CV"><HeaderTitle>Lebenslauf</HeaderTitle></a>
			<a href="/#projects"><HeaderTitle>Projekte</HeaderTitle></a>
		</div>
		
		<hr>
		<HeaderBlogItem posts={headerPosts} isMainElement={true} isOpenOnHoverAllowed={true}/>
		<hr>

		<div class="px-8 py-8 flex flex-col gap-2 justify-center">
			<h2 class="text-reallylight">Contact</h2>
			<HeaderSubTitleHref href={`https://www.linkedin.com/in/peter-wuerdemann/`}>
				LinkedIn
			</HeaderSubTitleHref>
		</div>

		<HeaderAdmin {isUserLoggedIn}/>

		<div class="grow h-full"></div>
	</nav>
</header>