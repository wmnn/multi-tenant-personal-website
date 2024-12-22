<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import type { CVDataEntry } from "$lib/server/types";
    import CVPopup from "./CVPopup.svelte";
    import CVEntry from "./CVEntry.svelte";

    export let data: CVDataEntry[] = [];
    export let handleNewCVData: any
    export let handleDelete = async (deletedItem: CVDataEntry) => {
        data = data.filter(o => o != deletedItem);
    }

    let isPopupShown = false;

    function handleFormSubmit(newEntry: CVDataEntry) {    
        const newData: CVDataEntry[] = (new Array(...data) as any)
        newData.push(newEntry)
        handleNewCVData(newData);
        isPopupShown = false;
    }

</script>

<div>
    <div class="flex flex-col gap-8">
        {#each data as entry}
            <CVEntry data={entry} handleDelete={handleDelete} />
        {/each}
    </div>

    <Button handleClick={() => isPopupShown = true}>Add entry</Button>

    {#if isPopupShown}
        <CVPopup {handleFormSubmit} bind:isPopupShown={isPopupShown} />
    {/if}
</div>