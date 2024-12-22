<script lang="ts">
    import type { Post } from "$lib/server/types";
    import ChevronRight from "$lib/client/icons/ChevronRight.svelte";
    import HeaderBlogItem from './HeaderBlogItem.svelte';

    export let title = 'Blog';
    export let href = '/blog/latest';
    export let posts: Array<Post>
    export let isOpenOnHoverAllowed = false; // Only the first parent element is allowed to be opened on hovering
    export let isMainElement = false; // Only the first parent element is the main element 'Blog'
    let isDropdownShown = false;
</script>

<button 
    class={`relative flex flex-col w-full ${isMainElement ? 'px-8 py-8' : ''}`} 
    on:mouseenter={() => isOpenOnHoverAllowed ? isDropdownShown = true : ''} 
    on:mouseleave={() => isOpenOnHoverAllowed ? isDropdownShown = false : ''}>
    
    <button class="flex items-center text-reallylight gap-[4px]">
        {#if isMainElement || posts.length > 0} 
            <button 
            class:rotate-90={isDropdownShown} class="transition-all" 
            on:click={() => isDropdownShown = !isDropdownShown}>
                <ChevronRight />
            </button>
        {/if}
        
        <button on:click={() => window.location.href = href}>
            <h2 class:pl-2={posts.length == 0} class="text-reallylight w-full">{title}</h2>
        </button>
    </button>
    
    {#if isDropdownShown}
        <div class="pl-4">
            {#if posts.length > 0}
                {#each posts as post}
                    <HeaderBlogItem href={`/posts/${post.id}`} title={post.title} posts={post.subPosts ?? []}/>
                {/each}
            {/if}    

            {#if isMainElement}
                <HeaderBlogItem href={`/blog/latest`} title={`Latest posts`} posts={[]}/>
            {/if}       
        </div>  
    {/if}

</button>