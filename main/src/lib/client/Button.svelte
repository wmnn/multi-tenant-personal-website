<script lang="ts">
    import { buttonStyles } from "./styles";
    import LoadingSpinner from "./LoadingSpinner.svelte";

    export let classes = ''
    export let handleClick = (e: any) => {}
    export let type: 'button' | 'submit' = 'button'
    export let isLoading = false
</script>

<button type={type} class={`${buttonStyles} ${classes}`} on:click={handleClick}>
    {#if isLoading}
        <LoadingSpinner />
    {:else}
        <slot />
    {/if}
</button>        