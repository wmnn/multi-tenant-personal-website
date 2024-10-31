<script lang="ts">
    import type { Post } from "$lib/server/singleton";
    import ChevronDown from "$lib/client/icons/ChevronDown.svelte";
    import ChevronLeft from "$lib/client/icons/ChevronLeft.svelte";

    export let post: Post;
    let isExpanded = false;
</script>

<button class={`relative flex gap-4`} on:click={() => isExpanded = !isExpanded} on:mouseenter={() => isExpanded = true} on:mouseleave={() => isExpanded = false}>
    <a href={`/posts/${post.id}`} class="flex gap-2">
        {post.title}
    </a>

    <div class="">
        {#if isExpanded}
            <ChevronDown />    
        {:else}
            <ChevronLeft />
        {/if}
    </div>
    
    
    {#if isExpanded && post.subPosts && post.subPosts.length > 0}
        <ul class="absolute left-0 top-[24px] flex-col gap-2 bg-white shadow-lg group-hover:flex min-w-[180px] rounded-xl overflow-hidden" on:mouseleave={() => isExpanded = false}>
            
            <li class={`p-2 hover:bg-gray-200 cursor-pointer flex grow`}>
                <a class="w-full h-full" href={`/posts/${post.id}`}>{post.title}</a>
            </li>
            <hr class="border-[1px]">
            
            {#each post.subPosts as subPost}
                <li class={`p-2 hover:bg-gray-200 cursor-pointer flex grow`}>
                    <a class="w-full h-full" href={`/posts/${subPost.id}`}>{subPost.title}</a>
                </li>
            {/each}
        </ul>
    {/if}
    

</button>