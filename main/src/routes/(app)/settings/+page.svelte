<script lang="ts">
    import { request } from '$lib/client/auth';
    import Button from '$lib/client/Button.svelte';
    import SocialsEditor from '$lib/client/Editors/SocialsEditor.svelte';
    import Input from '$lib/client/Input.svelte';

    export let data
    let socials = data.socials

    let pageName = data.pageName
    let newPageName = pageName

    let isMsgShown = false;
    let isSuccess = false;
    let isLoading = false;
    let msg = ''

    async function handleSubmit(e: any) {
        e.preventDefault();
        isLoading = true;
        const formData : any = {};
        formData.newPageName = newPageName
        formData.socials = socials

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
    <Input bind:value={newPageName} name={`pageName`}/>
    <p>Online at: <a href={`http://${pageName}.localhost`} class="text-blue-600">{`http://${pageName}.localhost`}</a></p>

    <SocialsEditor 
        bind:facebook={socials.Facebook} 
        bind:github={socials.GitHub} 
        bind:email={socials.Email} 
        bind:linkedin={socials.LinkedIn} 
    />

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
