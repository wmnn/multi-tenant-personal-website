<script lang="ts">
    import { formatDate, formatDates, getDateDifference } from "$lib/client/cv";
import DeleteIcon from "$lib/client/icons/DeleteIcon.svelte";
import type { CVDataEntry } from "$lib/server/types";

    export let data: CVDataEntry;
</script>

<div class="flex w-full">
    
    <div class="grow">
        <h3>{data.what} at {data.where}</h3>
        <p class="text-reallylight">{formatDates(new Date(data.start), new Date(data.end ?? ''))}</p> 
        <p>
            {@html data.experience.replace(/\n/g, '<br>')}
        </p>
    </div>
 
    <button>
        <DeleteIcon />
    </button>
</div>