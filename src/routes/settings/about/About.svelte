<script lang="ts">
    import { request } from "$lib/client/auth";
    import Button from "$lib/client/Button.svelte";
    import { onMount } from "svelte";

    export let about;

    let textarea: any
    let message: undefined | string = undefined
    let isSuccessfull = false;

    async function handleSubmit() {
        textarea.value

        const res = await request('/api/content', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: 'about',
                value: textarea.value
            }),
        })

        if (res.status == 200) {
            message = 'Successfully updated about section.'
            isSuccessfull = true;
        } else {
            isSuccessfull = false;
        }
    }

    onMount(() => {
        textarea.value = about;
    })

</script>

<div>
    <h2>
        About
    </h2>
    <textarea class="border-black border-[1px] rounded-xl min-h-[600px] w-full p-2" bind:this={textarea} />
    {#if message !== undefined}
        <p style:color={isSuccessfull ? 'green' : 'red'}>{message}</p>
    {/if}
    <Button handleClick={() => handleSubmit()}>Save</Button>
</div>
