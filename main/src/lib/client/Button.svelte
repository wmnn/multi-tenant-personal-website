<script lang="ts">
    import { Spinner } from "flowbite-svelte";
    import { buttonStyles } from "./styles";

    export let classes = ''
    export let handleClick = (e: any) => {}
    export let type: 'button' | 'submit' = 'button'
    export let isLoading = false
</script>

<button type={type} class={`${buttonStyles} ${classes}`} on:click={handleClick}>
    {#if isLoading}
        <Spinner color="gray" />
    {:else}
        <slot />
    {/if}
   
</button>