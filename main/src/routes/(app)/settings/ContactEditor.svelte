<script lang="ts">
    import Input from "$lib/client/Input.svelte";
    import { onMount } from "svelte";

    export let name;
    export let value;
    export let shownName;
    let isChecked = false;

    onMount(() => {
        value == '' ? isChecked = false : isChecked = true
    })
</script>


<div class="flex gap-2 flex-col">

    <div class="flex gap-2">
        <input type="checkbox" bind:checked={isChecked} />
        <h2>{shownName}</h2>
    </div>
    

    {#if isChecked}
        <Input name={name} value={value}/>
    {/if}
</div>

