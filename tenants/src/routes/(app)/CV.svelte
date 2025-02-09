<script lang="ts">
    import type { CVDataEntry } from "$lib/server/types";

    import DownArrow from "$lib/client/icons/DownArrow.svelte";
    import CVEntry from "$lib/client/Editors/CVEditor/CVEntry.svelte";

    export let workexperience: CVDataEntry[] | undefined = []
    export let education: CVDataEntry[] | undefined = []
</script>

<section id="CV" class="h-[100vh] flex flex-col justify-center">
    
    <h1 class="text-4xl my-16">Lebenslauf</h1>

    <h2 class="text-reallylight">Work Experience</h2>

    {#if workexperience}
        <div class="flex flex-col gap-8 mt-8">
            {#each workexperience as entry}
                <CVEntry data={entry} handleDelete={() => {}} isDeleteIconShown={false} />
            {/each}    
        </div>
    {/if}

    <h2 class="text-reallylight mt-8">Education</h2>

    {#if education}
        <div class="flex flex-col gap-8 mt-8">
            {#each education as entry}
                <CVEntry data={entry} handleDelete={() => {}} isDeleteIconShown={false}/>
            {/each}
        </div>
    {/if}

    <DownArrow href={`/#projects`}/>
    
</section>