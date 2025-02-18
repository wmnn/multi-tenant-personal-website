<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import AddProject from "$lib/client/Editors/Projects/AddProject.svelte";
    import Project from "$lib/client/Editors/Projects/Project.svelte";
    import { DEFAULT_PROJECTS, position, projects } from "./onboarding";

    async function handleAddProject(prevTitle: string, title: string, thumbnail: string, href: string) {
        $projects = [...$projects, {
            title,
            imageUrl: thumbnail,
            href
        }]
    }

    async function handleEdit(prevTitle: string, newTitle: string, newImageUrl: string, newHref: string) {
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
    function handleDelete(title: string) {
        $projects = $projects.filter((project: any) => project.title != title)
    }

</script>

<div class:hidden={$position != 4} class="flex items-center flex-col w-full">
    <h2 class="w-full">Projects</h2>

    <AddProject {handleAddProject} />

    <div class="mt-8"></div>
    
    <div class="flex flex-col gap-4 xl:max-w-[50%] xl:min-w-[50%]">
        {#each $projects as project}
            <Project 
                title={project.title}
                thumbnail={project.imageUrl}
                href={project.href}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        {/each}
        <div class="w-full">
            <Button type="button" classes={`w-full`} handleClick={(e) => {
                $projects = DEFAULT_PROJECTS;
            }}>
                Use default values
            </Button>
        </div>
        
    </div>
    

    
</div>