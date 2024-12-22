<script lang="ts">

    import CVForm from "$lib/client/Editors/CVEditor/CVForm.svelte";
    import Popup from "$lib/client/Popup.svelte";
    export let handleFormSubmit
    export let isPopupShown: boolean

</script>

<Popup>
    <CVForm {handleFormSubmit} bind:isPopupShown={isPopupShown}/>
</Popup>