<script lang="ts">
    import { request } from '$lib/client/auth';
    import Button from '$lib/client/Button.svelte';
    import Input from '$lib/client/Input.svelte';
    import ContactEditor from './ContactEditor.svelte';
    import { Spinner } from 'flowbite-svelte';

    export let data
    let pageName = data.pageName
    let isMsgShown = false;
    let isSuccess = false;
    let isLoading = false;
    let msg = ''

    async function handleSubmit(e: any) {
        e.preventDefault();
        isLoading = true;
        const formData : any = {};

        // Adding all inputs to the form data
        for (let element of e.target.elements) { 
            // Skip any elements that are not inputs, selects, or textareas
            if (element.name) {
                formData[element.name] = element.value;
            }
        }

        const res = await request('/api/settings', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        isLoading = false;
        if (res.status == 200) {
            isMsgShown = true
            isSuccess = true;
            msg = res.msg;
            return;
        }
        isMsgShown = true
        isSuccess = false;
        msg = res.msg;
    }
</script>

<form on:submit={handleSubmit}>
    <label for="pageName">
        <h1>Page name:</h1>
    </label>
    <Input value={pageName} name={`pageName`}/>

    <h1 class="mt-8">Contact</h1>
    <ContactEditor name="facebook" value={data.socials && data.socials.facebook ? data.socials.facebook : ''} shownName={"Facebook"}/>
    <ContactEditor name="github" value={data.socials && data.socials.github ? data.socials.github : ''} shownName={"Github"}/>
    <ContactEditor name="email" value={data.socials && data.socials.email ? data.socials.email : ''} shownName={"Email"}/>
    <ContactEditor name="linkedin" value={data.socials && data.socials.linkedin ? data.socials.linkedin : ''} shownName={"LinkedIn"}/>

    
    <div class="mt-8">
        {#if isMsgShown}
            <p style:color={isSuccess ? 'green' : 'red'}>{msg}</p>
        {/if}
        <div class="flex gap-2">
            <Button>Cancel</Button>
            <Button type={'submit'} isLoading={isLoading}>
                Save
            </Button>
        </div>
    </div>
    
</form>
