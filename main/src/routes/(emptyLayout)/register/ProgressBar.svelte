<script lang="ts">
    export let maxPosition 
    export let currentPosition;
</script>

<div class="w-full h-2 border-reallylight border-[1px] relative">

    <div style:width={`${Math.floor((currentPosition) * 100 / maxPosition)}%`} class={`bg-green-600 h-2 transition-all`}/>

    {#each new Array(maxPosition + 1).fill(0) as _, i}

        {#if i < currentPosition}
            <div 
                style:left={`${Math.floor((i / maxPosition) * 100)}%`}
                class={`border-black border-[1px] bg-green-600 h-4 w-4 absolute top-[-4px] rounded-2xl`}
            />
        {:else if i == currentPosition}
            <div 
                style:left={`${Math.floor((i / maxPosition) * 100)}%`}
                class={`border-black border-[1px] bg-white h-4 w-4 absolute top-[-4px] rounded-2xl`}
            />
        {:else}
            <div 
                style:left={`${Math.floor((i / maxPosition) * 100)}%`}
                class={`border-black border-[1px] bg-white h-4 w-4 absolute top-[-4px] rounded-2xl`}
            />
        {/if}
        
    {/each}
   
</div>