<script lang="ts">
    import DeleteIcon from '$lib/client/DeleteIcon.svelte';
    import { request } from './auth';
    import Button from './Button.svelte';
    import Popup from './Popup.svelte';

    export let posts
    let selectedPost: number = -1;

    async function handleDelete(postId: number) {
        if (selectedPost == -1) return;

        const formData = new FormData();
        formData.set('id', selectedPost as any);

        const res = await request('/api/posts', {
            method: 'DELETE',
            body: formData
        })

        if (res.status == 200) {
            window.location.reload()
        }
    }
</script>

<div class="border-[1px] rounded-xl">
    {#each posts as { id, title, content, thumbnailHash, createdAt }, i}
        <div>
            <hr>
            <div class="flex justify-between p-4 gap-4">
                <a class="flex gap-2 justify-between w-full" href="{`/posts/${id}`}">
                    <h3 class=" text-xl xl:text-xl">{title}</h3>
                    <h3>{new Date(createdAt ?? '').toLocaleString('DE').split(',')[0]}</h3>
                </a>
                <button on:click={() => {selectedPost = id}}>
                    <DeleteIcon />
                </button>
            </div>
        </div>    
    {/each}
</div>

{#if selectedPost !== -1}
    <Popup>
        <div class="bg-white rounded-xl p-4 flex flex-col gap-4 shadow-xl">
            <h3>
                Do you really want to delete the post ?
            </h3>
            <div class="flex gap-4">
                <Button handleClick={(e) => selectedPost = -1}>
                    Cancel
                </Button>
    
                <Button classes="bg-red-700 text-white" handleClick={(e) => handleDelete(selectedPost)}>
                    Delete
                </Button>
            </div>
        </div>
    </Popup>
{/if}
