<script>
	export let data;
</script>

<section class="py-8 px-8">
	<h1>Latest Posts:</h1>

	<div class="flex gap-8 justify-center flex-wrap sm:flex-nowrap py-8">
		{#each data.posts as { id, title, content, thumbnailHash, createdAt }, i}
			<a class="flex shadow-lg rounded-xl hover:shadow-2xl transition-all  sm:max-w-[720px]" href="{`/posts/${id}`}">
				{#if thumbnailHash}
					<div class="flex-grow basis-0">
						<img alt={`${title} thumbnail`} src={`/images/${thumbnailHash}`} class=""/>
					</div>	
				{/if}
				<div class="flex-grow basis-0 pt-8 justify-center text-center">
					<h3 class="font-bold text-xl xl:text-2xl">{id}-{title}</h3>
				</div>
			</a>
		{/each}
	</div>
</section>


<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

