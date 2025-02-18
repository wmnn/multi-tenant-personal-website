<script>
    import Button from "$lib/client/Button.svelte";
    import PlusIcon from "$lib/client/icons/PlusIcon.svelte";
    import ProjectPopup from "./ProjectPopup.svelte";
    export let handleAddProject
    let isAddProjectPopupShown = false
    let isLoading = false

</script>
<div class="w-full flex justify-center">
    <Button classes={`flex gap-2 items-center`} handleClick={() => isAddProjectPopupShown = true}>
        <PlusIcon></PlusIcon>
        Add project
    </Button>

    {#if isAddProjectPopupShown}
        <ProjectPopup
            bind:isEditPopupShown={isAddProjectPopupShown}
            {isLoading}
            handleSubmit={handleAddProject}
            prevTitle={''}
        />
    {/if}
</div>