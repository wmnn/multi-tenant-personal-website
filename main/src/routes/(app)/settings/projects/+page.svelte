<script lang="ts">
    import { request } from '$lib/client/auth';
    import Button from '$lib/client/Button.svelte';
    import PlusIcon from '$lib/client/icons/PlusIcon.svelte';
    import { onMount, tick } from 'svelte';
    import Project from './Project.svelte';
    import ProjectPopup from './ProjectPopup.svelte';
    import { projects } from './projects'
    export let data

    let isAddProjectPopupShown = false;
    let isLoading = false;

    onMount(() => {
        $projects = data.projects
    })

    async function handleSubmit(newTitle: string, newImageUrl: string, newHref: string) {
        isLoading = true;
        const newProject: any = {
            title: newTitle,
            imageUrl: newImageUrl,
            href: newHref
        }
        const res = await request('/api/projects', {
            method: 'POST',
            body: JSON.stringify(newProject)
        })

        if (res.status == 200) {
            $projects = [...$projects, newProject]
        }
        
        isAddProjectPopupShown = false;
        isLoading = false;
    }
</script>

<div class="flex flex-col gap-4 mt-8 items-center">
    <Button classes={`md:max-w-[50%] flex gap-2 items-center`} handleClick={() => isAddProjectPopupShown = true}>
    
            <PlusIcon></PlusIcon>
            Add project
    </Button>

    {#if isAddProjectPopupShown}
        <ProjectPopup
            bind:isEditPopupShown={isAddProjectPopupShown}
            {isLoading}
            {handleSubmit}
        />
    {/if}

    {#each $projects as project}
        <Project 
            bind:title={project.title}
            bind:thumbnail={project.imageUrl}
            bind:href={project.href}
        />
    {/each}
</div>
