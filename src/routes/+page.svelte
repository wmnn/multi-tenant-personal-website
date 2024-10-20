<script>
	export let data;
</script>

<section class="py-8 px-8 xl:px-[20%]">
	<h1>Latest Posts:</h1>

	<div class="flex flex-col gap-2 justify-center py-8">
		{#each data.posts.splice(0, data.posts.length > 5 ? 5 : data.posts.length) as { id, title, content, thumbnailHash, createdAt }, i}
			<a class="flex justify-between shadow-lg rounded-xl hover:shadow-2xl transition-all py-2 px-2" href="{`/posts/${id}`}">
				<h3 class="font-bold text-xl xl:text-2xl">{title}</h3>
				<h3>{new Date(createdAt).toLocaleString('DE').split(',')[0]}</h3>
			</a>
		{/each}
	</div>
</section>


<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

