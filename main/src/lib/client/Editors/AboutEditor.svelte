<script lang="ts">
    import Button from "../Button.svelte";
    export let value: string;
    let isPreviewShown = false;
</script>

<div>
    <div class="flex justify-between">
        <h2>
            About
        </h2>
        <div class="flex gap-[2px]">
            <Button handleClick={() => isPreviewShown = false}>
                Edit
            </Button>
            <Button handleClick={() => isPreviewShown = true}>
                Preview
            </Button>
        </div>
    </div>
    
    {#if isPreviewShown}
        <section id="about" class="flex flex-col justify-center gap-8 min-h-[600px] p-2">
            {@html value}
        </section>
    {:else}
        <textarea class="border-black border-[1px] rounded-xl min-h-[600px] w-full p-2" bind:value={value} />
    {/if} 
    
</div>
