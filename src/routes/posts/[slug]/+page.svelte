<script lang="ts">
    import Markdown from "$lib/client/Markdown.svelte";
    export let data;
</script>

<main class="py-8 px-8 xl:px-[20%]">
    <Markdown title={data.post?.title} content={data.post?.content}/>
</main>
