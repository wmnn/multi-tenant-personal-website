<script lang="ts">
    import { inputStyles } from './styles'
    export let placeholder = ''
    export let name = ''
    export let value: string
</script>

<input placeholder={placeholder} name={name} class={inputStyles} bind:value={value}/>