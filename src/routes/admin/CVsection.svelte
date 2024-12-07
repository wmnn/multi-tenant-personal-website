<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import CVform from "./CVform.svelte";

    export let title;

</script>

<div>
    <h3 class="py-8">{title}</h3>
    <CVform />
    <Button handleClick={() => {}}>Add {title.toLowerCase()} entry</Button>
</div>