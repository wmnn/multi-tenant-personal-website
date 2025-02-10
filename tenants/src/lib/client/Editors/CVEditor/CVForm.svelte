<script lang="ts">
    import { request } from "$lib/client/auth";
    import Button from "$lib/client/Button.svelte";
    import type { CVDataEntry } from "$lib/server/types";
    import CvInput from "./CVInput.svelte";
    import CrossIcon from "$lib/client/icons/CrossIcon.svelte";
    import { borderStyles, inputStyles } from "$lib/client/styles";

    export let handleFormSubmit: any
    export let isPopupShown
    let isChecked = true;

    let what: HTMLInputElement
    let where: HTMLInputElement
    let start: any
    let end: HTMLInputElement
    let experience: any

    function prepareFormSubmit(e: any) {
        e.preventDefault()

        const newEntry: CVDataEntry = {
            what: what.value,
            where: where.value,
            start: start.value as any,
            end: isChecked ? undefined : end.value as any,
            experience: experience.value
        }

        handleFormSubmit(newEntry)
    }
</script>

<form class="flex flex-col gap-2 bg-white p-8 rounded-xl relative" method="POST" on:submit={e => prepareFormSubmit(e)}>
    
    <div class="flex justify-end">
        <button on:click={(e) => {e.preventDefault(); isPopupShown = false}}>
            <CrossIcon />
        </button>
    </div>

    <label for="what">
        What ?
    </label>
    <input placeholder={''} class={inputStyles} id={'what'} type={'text'} bind:this={what}/>

    <label for="where">
        Where ? 
    </label>
    <input placeholder={''} class={inputStyles} id={'where'} type={'text'} bind:this={where}/>

    <label for="start-date">
        When did you start ?
    </label>
    <input placeholder={''} class={inputStyles} id={'start-date'} type={'date'} bind:this={start}/>   

    <div class="flex gap-2">
        Are you still there ?
        <input type="checkbox" bind:checked={isChecked} />
    </div>
    
    {#if !isChecked}
        <label for="end-date">
            When did you finish it ?
        </label>
        <input placeholder={''} class={inputStyles} id={'end-date'} type={'date'} bind:this={end}/>   
    {/if}
    
    <label for="experience">
        Experience:
    </label>
    <textarea id="experience" class={`${borderStyles} p-2 min-h-36`} bind:this={experience} />

    <Button type={'submit'}>
        Save
    </Button>
    
</form>