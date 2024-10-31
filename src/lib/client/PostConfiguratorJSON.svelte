<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import Input from "$lib/client/Input.svelte";
    import Markdown from "$lib/client/Markdown.svelte";
    import type { Post } from "$lib/server/singleton";
    import PostConfiguratorHelpItems from "./PostConfiguratorHelpItems.svelte";
    import { createAndUpdatePostReq } from "./requests";
    import SubPostsSelector from "./SubPostsSelector.svelte";

    export let post: Post;
    export let isEditingExistingPost = false // Is true on already created posts

    let textarea: any
    let isInEditMode = true // true => edit the post, false => preview the post
    let categoryPosts: Array<Post> = post.subPosts ?? []

    async function handleSubmit(e: any) {
        e.preventDefault();
        await createAndUpdatePostReq(post.id!, post.title, post.content!, isEditingExistingPost, categoryPosts)
    }

    function addHeadingToTextarea(string: string) {
        textarea.focus()
        const cursorPosition = textarea.selectionStart;
        let textBeforeCursor = textarea.value.substring(0,  cursorPosition);
        let textAfterCursor  = textarea.value.substring(cursorPosition, textarea.value.length);
        textarea.value = textBeforeCursor + string + textAfterCursor
    }
</script>

<div class="flex"> 

    <main class="flex justify-start w-full flex-col xl:pl-[20%] px-8 xl:px-0 items-start">

        <div class="flex justify-end gap-1 mt-8 w-full">
            <Button handleClick={() => isInEditMode = true} classes={`max-w-24 ${isInEditMode ? 'bg-slate-100' : ''}`}>Edit</Button>
            <Button handleClick={() => isInEditMode = false} classes={`max-w-24 ${isInEditMode ? '' : 'bg-slate-100'}`}>Preview</Button>
        </div>
    
        <form class:hidden={!isInEditMode} class="flex flex-col justify-center w-full" enctype="multipart/form-data" on:submit={e => handleSubmit(e)}>
        
            <label for="title">Title</label>
            <Input placeholder="title" name="title" bind:value={post.title}/>
            
            <label for="content">Content</label>        
            <textarea name="content" class="min-h-[250px] p-2" bind:this={textarea} bind:value={post.content}></textarea>
        
            <SubPostsSelector bind:selectedPosts={categoryPosts}/>
        
            <Button classes="mb-8">
                <p>Save</p>
            </Button>
        
        </form>

        {#if !isInEditMode}
            <div class="w-full">
                <Markdown title={post.title} content={textarea.value}/>    
            </div>
        {/if}

    </main>

    <PostConfiguratorHelpItems {addHeadingToTextarea} />
</div>


<style>
    form label {
        padding-top: 16px;
    }
    textarea {
        border-width: 1px;
        border-radius: 8px;
    }
</style>