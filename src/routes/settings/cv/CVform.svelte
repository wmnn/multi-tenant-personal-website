<script>
    import Button from "$lib/client/Button.svelte";
    import CvInput from "./CVInput.svelte";

    let isChecked = false;

</script>

<form class="flex flex-col gap-2 bg-white p-8 rounded-xl">
    <label for="what">
        What: (Position, Education)
    </label>
    <CvInput id="what" type="text"/>

    <label for="where">
        Where: (Company, University)
    </label>
    <CvInput id="where" type="text"/>

    <label for="start-date">
        Start date: (Company, University)
    </label>
    <CvInput type="date" id="start-date"/>

    <div class="flex gap-2">
        Not ended yet ?
        <input type="checkbox" bind:checked={isChecked} />
    </div>
    
    {#if !isChecked}
        <label for="end-date">
            End date: (Company, University)
        </label>
        <CvInput type="date" id="end-date"/>    
    {/if}
    
    <label for="experience">
        Experience:
    </label>
    <textarea id="experience"/>

    <Button>
        Save
    </Button>
    
</form>