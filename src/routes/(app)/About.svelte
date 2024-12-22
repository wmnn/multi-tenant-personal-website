<script lang="ts">
    import DownArrow from "../../lib/client/icons/DownArrow.svelte";
    export let about;

    let iconSize = '32px'   
</script>

<section id="about" class="h-[100vh] flex flex-col justify-center gap-8">

    {@html about}
    <DownArrow href={`/#CV`}/>

</section>

<style>
    
</style>