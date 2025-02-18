<script lang="ts">
    import ContactEditor from "./ContactEditor.svelte";
    export let facebook : string
    export let github : string
    export let email : string
    export let linkedin : string
</script>


<div>
    <h1 class="mt-8">Contact</h1>
    <ContactEditor name="Facebook" bind:value={facebook} shownName={"Facebook"} />
    <ContactEditor name="GitHub" bind:value={github} shownName={"GitHub"}/>
    <ContactEditor name="Email" bind:value={email} shownName={"Email"}/>
    <ContactEditor name="LinkedIn" bind:value={linkedin} shownName={"LinkedIn"}/>
</div>