<script>
    import CVsection from "./CVsection.svelte";
    export let data;

</script>

<main class="py-8 px-8 xl:px-[10%]">
    <h2>
        CV
    </h2>
    
    <CVsection title={`Work experiences`} cvData={data.workExperiences} />
    <CVsection title={`Education`} cvData={data.education} />
</main>


