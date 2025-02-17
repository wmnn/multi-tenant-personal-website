<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import { buttonStyles } from "$lib/client/styles";
    import ProgressBar from "./ProgressBar.svelte";
    import { position, handleSubmit } from './onboarding';
    import Position0 from "./Position0.svelte";
    import Position1 from "./Position1.svelte";
    import Position2 from "./Position2.svelte";
    import Position3 from "./Position3.svelte";
    import Position4 from "./Position4.svelte";
    const maxPositionsIdx = 4

</script>

<div class="flex flex-col grow p-8 gap-4 w-[100vh] h-[100vh] justify-between">
    <div class="flex justify-center">
        <ProgressBar currentPosition={$position} maxPosition={maxPositionsIdx} />        
    </div>

    <div>
        <Position0 />
        <Position1 />
        <Position2 />
        <Position3 />
        <Position4 />
    </div>  

    <div class="flex mt-16 gap-4">
        {#if $position != 0}
            <Button handleClick={(e) => {e.preventDefault(); $position--}}>
                Back
            </Button>
        {/if}
        {#if $position != 4}
            <Button handleClick={(e) => {e.preventDefault(); $position++}}>
                Next
            </Button>
        {:else}
            <button type="submit" class={buttonStyles} on:click={(e) => handleSubmit()}>
                Save
            </button>
        {/if}
    </div>

    <div />
</div>
