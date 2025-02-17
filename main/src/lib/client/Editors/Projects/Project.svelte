<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import DeleteIcon from "$lib/client/icons/DeleteIcon.svelte";
    import SettingsIcon from "$lib/client/icons/SettingsIcon.svelte";
    import Popup from "$lib/client/Popup.svelte";
    import ProjectPopup from "./ProjectPopup.svelte";

    export let handleEdit
    export let handleDelete
    export let title: string;
    export let thumbnail: string;
    export let href: string;
    let isEditPopupShown = false;
    let isDeletePopupShown = false;
    let isLoading = false;
    
</script>

<div class="flex gap-2 w-full md:max-w-[50%] min-w-[50%]">
    <a class="rounded-xl overflow-hidden shadow-xl border border-gray-200 max-w-[30%]" href={href} target="_blank">
        <img 
            src={thumbnail} 
            alt={`${title} thumbnail`} 
            class="w-full h-full object-cover"
        />
    </a>

    <div class="flex flex-col gap-4 w-full">
        <div>
            <div class="flex justify-between"> 
                <p>{title}</p>

                <div class="flex gap-2">
                    <button on:click={() => isEditPopupShown = true}>
                        <SettingsIcon />
                    </button>
                    <button on:click={() => isDeletePopupShown = true}>
                        <DeleteIcon />
                    </button>
                    
                </div>
            </div>
        
        </div>
        
    </div>

    {#if isEditPopupShown}
        <ProjectPopup
            bind:isEditPopupShown={isEditPopupShown}
            bind:isLoading={isLoading}
            {title}
            {thumbnail}
            {href}
            handleSubmit={handleEdit}
            prevTitle={title}
        />
    {/if}

    {#if isDeletePopupShown}
        <Popup>
            <div class="bg-white p-8 rounded-xl shadow-xl w-full h-full xl:w-[50%] xl:h-[50%] flex flex-col justify-around">
                <div>
                    <h2>Do you really want to delete the project ?</h2>
                </div>
                
                <div class="flex gap-4">
                    <Button handleClick={() => isDeletePopupShown = false}>
                        <p class="text-green-600">Cancel</p>
                    </Button>
                    <Button handleClick={() => {
                        isLoading = true;
                        handleDelete(title)
                        isLoading = false;
                        isDeletePopupShown = false
                    }} classes={``} isLoading={isLoading}>
                        <p class="text-red-600">Delete</p>
                    </Button>
                </div>
            </div>
        </Popup>
    {/if}
</div>