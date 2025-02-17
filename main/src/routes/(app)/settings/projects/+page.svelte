<script lang="ts">
    import { request } from '$lib/client/auth';
    import { onMount, tick } from 'svelte';
    import Project from '$lib/client/Editors/Projects/Project.svelte';
    import { projects } from './projects'
    import AddProject from '$lib/client/Editors/Projects/AddProject.svelte';
    export let data

    onMount(() => {
        $projects = data.projects
    })

    async function handleAddProject(prevTitle: string, newTitle: string, newImageUrl: string, newHref: string) {
     
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

    }

    async function handleEdit(prevTitle: string, newTitle: string, newImageUrl: string, newHref: string) {
        const editedProject: any = {
            title: newTitle,
            imageUrl: newImageUrl,
            href: newHref
        }
        const res = await request('/api/projects', {
            method: 'PATCH',
            body: JSON.stringify({
                title: prevTitle,
                editedProject
            })
        })

        if (res.status == 200) {
            $projects = $projects.map((project: any) => {
                if (project.title != prevTitle) {
                    return project
                }
                return {
                    title: newTitle,
                    imageUrl: newImageUrl,
                    href: newHref
                }
            })
        }
    }

    async function handleDelete(title: string) {    
        const res = await request('/api/projects', {
            method: 'DELETE',
            body: JSON.stringify({
                title
            })
        })

        if (res.status == 200) {
            $projects = $projects.filter((project: any) => project.title != title)
        }
    }
</script>

<div class="flex flex-col gap-4 mt-8 items-center">

    <AddProject handleAddProject={handleAddProject}/>

    {#each $projects as project}
        <Project 
            title={project.title}
            thumbnail={project.imageUrl}
            href={project.href}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    {/each}
</div>
