<script>
    import AboutEditor from "$lib/client/Editors/AboutEditor.svelte";
    import { about, position } from "./onboarding";

</script>
<!-- About -->
<div class:hidden={$position != 1}>
    <AboutEditor bind:value={$about}/>
</div>