<script lang="ts">
    import { request } from '$lib/client/auth';
    import Button from '$lib/client/Button.svelte';
    import Input from '$lib/client/Input.svelte';
    import LoadingSpinner from '$lib/client/LoadingSpinner.svelte';
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
    <p>Online at: <a href={`http://${pageName}.localhost`} class="text-blue-600">{`http://${pageName}.localhost`}</a></p>

    <h1 class="mt-8">Contact</h1>
    <ContactEditor name="Facebook" value={data.socials && data.socials.Facebook ? data.socials.Facebook : ''} shownName={"Facebook"}/>
    <ContactEditor name="GitHub" value={data.socials && data.socials.GitHub ? data.socials.GitHub : ''} shownName={"GitHub"}/>
    <ContactEditor name="Email" value={data.socials && data.socials.Email ? data.socials.Email : ''} shownName={"Email"}/>
    <ContactEditor name="LinkedIn" value={data.socials && data.socials.LinkedIn ? data.socials.LinkedIn : ''} shownName={"LinkedIn"}/>

    
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
