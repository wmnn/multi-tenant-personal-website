<script>
    import Project from "./Project.svelte";
    export let projects;
</script>

<section id="projects" class="min-h-screen flex flex-col">
    <h1>Projekte</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each projects as project}
            <Project 
                title={project.title}
                href={project.href}
                thumbnail={project.imageUrl}
            />
        {/each}
    </div>
</section>
