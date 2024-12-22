<script lang="ts">
    import { request } from "$lib/client/auth";
    import AboutEditor from "$lib/client/Editors/AboutEditor.svelte";
    import { onMount } from "svelte";
    import { KEYS } from "../../../../lib/client/KEYS";
    import Button from "$lib/client/Button.svelte";

    export let data;
    let message: undefined | string = undefined
    let isSuccessfull = false;
    let textarea: any

    async function handleSubmit() {
        textarea.value

        const res = await request(`/api/keyvaluestore/${KEYS.about}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
        textarea.value = data.about ?? '';
    })
</script>

<main class="py-8 px-8 xl:px-[10%]">
    <p>About</p>
    <AboutEditor bind:value={textarea}/>
    {#if message !== undefined}
        <p style:color={isSuccessfull ? 'green' : 'red'}>{message}</p>
    {/if}
    <Button handleClick={() => handleSubmit()}>Save</Button>
</main>
