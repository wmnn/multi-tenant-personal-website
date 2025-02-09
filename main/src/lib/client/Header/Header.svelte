<script lang="ts">
    import HeaderAdmin from "./HeaderAdmin.svelte";
    import HeaderMobile from "./HeaderMobile.svelte";

	export let isUserLoggedIn;
	let title = 'Create your personal website fast';
</script>

<header>
	<HeaderMobile {isUserLoggedIn} />

	<nav class='hidden xl:flex w-full justify-around items-center px-24'>
		<div class="px-8 flex flex-col justify-between gap-8 py-8">
			<a href={`/`}>
				<h1 class="text-nowrap">{title}</h1>
			</a>
		</div>

		<div class="grow"/>
		
		<HeaderAdmin {isUserLoggedIn}/>

	</nav>
</header>