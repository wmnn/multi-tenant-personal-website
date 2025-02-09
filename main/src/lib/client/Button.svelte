<script lang="ts">
    import { buttonStyles } from "./styles";

    export let classes = ''
    export let handleClick = (e: any) => {}
    export let type: 'button' | 'submit' = 'button'
</script>

<button type={type} class={`${buttonStyles} ${classes}`} on:click={handleClick}>
    <slot />
</button>