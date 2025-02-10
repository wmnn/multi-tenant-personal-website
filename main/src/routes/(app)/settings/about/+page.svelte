<script lang="ts">
    import { request } from "$lib/client/auth";
    import AboutEditor from "$lib/client/Editors/AboutEditor.svelte";
    import { onMount } from "svelte";
    import { KEYS } from "../../../../lib/client/KEYVALUESTORE_KEYS";
    import Button from "$lib/client/Button.svelte";

    export let data;
    let message: undefined | string = undefined
    let isSuccessfull = false;
    
    let html: string = ''

    async function handleSubmit() {

        const res = await request(`/api/keyvaluestore/${KEYS.about}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: html
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
        
        html = data.about as string;

    })
</script>

<main class="py-8 px-8 xl:px-[10%]">
    <AboutEditor bind:value={html}/>
    {#if message !== undefined}
        <p style:color={isSuccessfull ? 'green' : 'red'}>{message}</p>
    {/if}
    <Button handleClick={() => handleSubmit()}>Save</Button>
</main>
