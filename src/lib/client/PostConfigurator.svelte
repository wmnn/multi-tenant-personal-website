<script lang="ts">
    import { request } from "$lib/client/auth";
    import Button from "$lib/client/Button.svelte";
    import Input from "$lib/client/Input.svelte";
    import Markdown from "$lib/client/Markdown.svelte";

    export let title: string = ''
    export let content: string = ''
    export let isEditingPost = false
    export let postId: number = -1

    let isCategoryChecked = false
    let textarea: any
    let isInEditMode = true // true => edit the post, false => preview the post

    async function handleSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (isEditingPost && postId !== -1) {
            formData.set('id', postId as any);
        }

        const res = await request('/api/posts', {
            method: isEditingPost ? 'PUT' : 'POST',
            body: formData
        })

        if (res.status == 200 && res.postUrl) {
            window.location.href = res.postUrl;
        }
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
            <Input placeholder="title" name="title" bind:value={title}/>
            
            <label for="content">Content</label>        
            <textarea name="content" class="min-h-[250px] p-2" bind:this={textarea} bind:value={content}></textarea>
        
            <div class="flex justify-start gap-2 my-8">
                <input type="checkbox" class="w-4" bind:checked={isCategoryChecked}/>
                <p>Save as category</p>
            </div>
        
            <Button classes="mb-8">
                <p>Save</p>
            </Button>
        
        </form>

        {#if !isInEditMode}
            <div class="w-full">
                <Markdown title={title} content={textarea.value}/>    
            </div>
            
        {/if}

    </main>

    <div class="xl:w-[20%] p-8 helper hidden xl:flex flex-col gap-2">
        <Button handleClick={(e) => addHeadingToTextarea('\n# ')}><h1>Heading 1</h1></Button>
        <Button handleClick={(e) => addHeadingToTextarea('\n## ')}><h2>Heading 2</h2></Button>
        <Button handleClick={(e) => addHeadingToTextarea('\n### ')}><h3>Heading 3</h3></Button>
        <Button><a href="/" on:click={(e) => e.preventDefault()}>Link</a></Button>
        <Button>Image</Button>
        <Button><code>Code</code></Button>
        <Button><blockquote>Blockquote</blockquote></Button>
    </div>
</div>


<style>
    form label {
        padding-top: 16px;
    }
    textarea {
        border-width: 1px;
        border-radius: 8px;
    }
    a {
        color: #1a0dab;
    }
</style>