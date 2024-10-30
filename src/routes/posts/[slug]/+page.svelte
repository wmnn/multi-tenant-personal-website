<script lang="ts">
    import Markdown from "$lib/client/Markdown.svelte";
    import Button from "$lib/client/Button.svelte";
    import PostConfiguratorJSON from "$lib/client/PostConfiguratorJSON.svelte";

    export let data;
    let isInEditMode = false
</script>

{#if !isInEditMode}
    <div class="py-8 px-8 xl:px-[20%]">
        {#if data.isUserLoggedIn}
            <div class="flex justify-end w-full">
                <Button classes={`max-w-24`} handleClick={(e) => isInEditMode = !isInEditMode}>Edit</Button>
            </div>
        {/if}
        <Markdown title={data.post?.title} content={data.post?.content}/>
    </div>
{:else}
    <PostConfiguratorJSON title={data.post?.title} content={data.post?.content} isEditingExistingPost={true} postId={data.slug}/>
{/if}
