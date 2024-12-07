<script lang="ts">
    import { inputStyles } from '$lib/client/styles'
    export let placeholder = ''
    export let name = ''
    export let id = ""
    export let type

    let input
</script>

<input placeholder={placeholder} name={name} class={inputStyles} id={id} type={type} bind:this={input}/>