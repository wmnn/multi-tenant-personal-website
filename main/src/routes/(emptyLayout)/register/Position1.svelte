<script>
    import Button from "$lib/client/Button.svelte";
    import AboutEditor from "$lib/client/Editors/AboutEditor.svelte";
    import { about, DEFAULT_ABOUT_SECTION, position } from "./onboarding";

</script>
<!-- About -->
<div class:hidden={$position != 1}>
    <AboutEditor bind:value={$about}/>
    <Button type="button" handleClick={(e) => {
        $about = DEFAULT_ABOUT_SECTION
    }}>
        Use default values
    </Button>
</div>