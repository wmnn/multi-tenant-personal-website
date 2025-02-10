<script>
    import Button from "$lib/client/Button.svelte";
    import ChevronRight from "$lib/client/icons/ChevronRight.svelte";

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte app" />
</svelte:head>

<div class="px-8 xl:px-[10%] flex flex-col justify-center items-center">

	<a href="/register" class="grow max-w-[50%]">
		<Button classes={`flex items-center gap-4`}>
			<p>Start now</p>
			<ChevronRight />
		</Button>
	</a>
	
</div>



