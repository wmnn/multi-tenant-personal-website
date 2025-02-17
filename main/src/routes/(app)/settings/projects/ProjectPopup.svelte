<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import CrossIcon from "$lib/client/icons/CrossIcon.svelte";
    import Input from "$lib/client/Input.svelte";
    import Popup from "$lib/client/Popup.svelte";
    export let handleSubmit
    export let isLoading
    export let isEditPopupShown
    export let title = ''
    export let thumbnail = ''
    export let href = ''
</script>

<Popup>
    <div class="bg-white p-8 rounded-xl shadow-xl w-full h-full xl:w-[50%] xl:h-[50%] flex flex-col justify-around">
        <div>
            <div class="flex justify-end text-red-600">
                <button on:click={() => isEditPopupShown = false}>
                    <CrossIcon />
                </button>
            </div>
            <label>
                Project name:
            </label>
            <Input bind:value={title} />

            <label>
                Thumbnail url:
            </label>
            <Input bind:value={thumbnail} />

            <label>
                Project url:
            </label>
            <Input bind:value={href} />
        </div>
        

        <div class="flex gap-4">
            <Button handleClick={() => isEditPopupShown = false}>
                Cancel
            </Button>
            <Button handleClick={() => handleSubmit(title, thumbnail, href)} isLoading={isLoading}>
                <p class="text-green-600">
                    Save
                </p>
                
            </Button>
        </div>
    </div>
</Popup>