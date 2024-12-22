<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import type { CVDataEntry } from "$lib/server/types";
    import CvPopup from "./CVPopup.svelte";
    import CvSectionEntry from "./CVSectionEntry.svelte";

    export let title;
    export let cvData: CVDataEntry[];

    let isAddEntryPopupShown = false;

</script>

<div>
    <h3 class="py-8">{title}</h3>

    <div class="flex flex-col gap-8">
        {#each cvData as entry}
            <CvSectionEntry data={entry}/>
        {/each}
    </div>
    

    <Button handleClick={() => isAddEntryPopupShown = true}>Add {title.toLowerCase()} entry</Button>

    {#if isAddEntryPopupShown}
        <CvPopup />
    {/if}
</div>