<script lang="ts">
    import { onMount } from "svelte";

    export let title;
    export let thumbnail;
    export let href;

    let isVideoShown = false;
    let video: any;

    let hoverItem: any 
    onMount(() => {

        hoverItem.addEventListener('mouseenter', () => {
            isVideoShown = true;
        });

        hoverItem.addEventListener('mousemove', (e: MouseEvent) => {
            const { clientX, clientY } = e;
            // Get the scroll position
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
            
            // Update the video position based on scroll
            video.style.left = clientX + scrollX + 10 + 'px';
            video.style.top = clientY + scrollY + 10 + 'px';
        });

        hoverItem.addEventListener('mouseleave', () => {
            isVideoShown = false;
        });
    });

</script>

<a href={href} target="_blank">
    <button>
    
        
        <h1>{title}</h1>

        <div class="rounded-xl overflow-hidden min-w-[240px] min-h-[240px] max-w-[500px] shadow-xl border-[1px] border-b-reallylight" bind:this={hoverItem}>
            <img src={thumbnail} alt={`${title} thumbnail`}/>
        </div>
        

        {#if isVideoShown}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video bind:this={video} width="210" height="315" title={title + ' video'} controls class="rounded-[20px] max-w-[100vh] absolute" autoplay={true}>
                <source src={`/projects/${title}.mp4`} type="video/mp4">
            </video>
        {/if}
        
    </button>
</a>