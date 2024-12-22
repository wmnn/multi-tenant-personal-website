<script lang="ts">
    import { formatDate, formatDates, getDateDifference } from "$lib/client/cv";
    import DeleteIcon from "$lib/client/icons/DeleteIcon.svelte";
    import type { CVDataEntry } from "$lib/server/types";

    export let data: CVDataEntry;
    export let handleDelete
    export let isDeleteIconShown = true
</script>

<div class="flex w-full">
    
    <div class="grow">
        <h3>{data.what} at {data.where}</h3>
        <p class="text-reallylight py-2">{formatDates(new Date(data.start), new Date(data.end ?? ''))}</p> 
        <p>
            {@html data.experience.replace(/\n/g, '<br>')}
        </p>
    </div>
 
    {#if isDeleteIconShown}
        <button on:click={() => handleDelete(data)}>
            <DeleteIcon />
        </button>
    {/if}
</div>