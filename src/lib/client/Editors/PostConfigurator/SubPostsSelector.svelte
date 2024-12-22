<script lang="ts">
    import type { Post } from "$lib/server/types";
    import CrossIcon from "../../icons/CrossIcon.svelte";
    import ArrowDown from "../../icons/ArrowDown.svelte";
    import ArrowUp from "../../icons/ArrowUp.svelte";
    import SearchPostsInput from "../../SearchPostsInput.svelte";

    let shownPosts: Post[] = []
    let selectedPost: Post
    export let selectedPosts: Post[] = []

    function onDragStartFilteredPosts(e: any, post: Post) {
        selectedPost = post
    }

    function movePositionUp(post: Post) {
        const idx = selectedPosts.indexOf(post)
        if (idx !== 0 && idx !== -1) {
            swap(selectedPosts, idx, idx - 1)
            selectedPosts = [...selectedPosts]
        }
    }
    function movePositionDown(post: Post) {
        const idx = selectedPosts.indexOf(post)
        if (idx !== selectedPosts.length - 1 && idx !== -1) {
            swap(selectedPosts, idx, idx + 1)
            selectedPosts = [...selectedPosts]
        }
    }
    function swap(arr: Array<any>, i: number, j: number) {
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    async function onDropInSelectedPostsContainer(e: any) {
        e.preventDefault();
        if (selectedPost && !selectedPosts.includes(selectedPost)) {
             // Neue Referenz erstellen, anstelle von push um die UI zu updaten
            selectedPosts = [...selectedPosts, selectedPost];
        }
    }
</script>

<section>

    <h3>Sub-posts</h3>
    <SearchPostsInput bind:shownPosts={shownPosts} />

    <div class="flex w-full">
        <div class="flex flex-col border-[1px] basis-0 grow items-start">
            {#each shownPosts as post, i}
                <button on:dragstart={e => onDragStartFilteredPosts(e, post)} draggable={true}>
                    {post.title}
                </button>
            {/each}
        </div>
    

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="flex flex-col border-[1px] basis-0 grow" on:drop={e => onDropInSelectedPostsContainer(e)} on:dragover={e => e.preventDefault()}>
            {#each selectedPosts as post, i}
                <div class="flex justify-between" on:dragstart={e => selectedPost = post} on:dragover={e => e.preventDefault()}>
                    <p class="grow">
                        {i + 1}. {post.title}
                    </p>
                    <button on:click={e => {e.preventDefault(); movePositionUp(post)}}>
                        <ArrowUp />
                    </button>
                    <button on:click={e => {e.preventDefault(); movePositionDown(post)}}>
                        <ArrowDown />
                    </button>
                    <button on:click={e => selectedPosts = selectedPosts.filter(item => item != post)}>
                        <CrossIcon />
                    </button>
                    
                </div>
            {/each}
        </div>
    </div>

    

</section>