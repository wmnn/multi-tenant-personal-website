<script lang="ts">
    import CvEditor from "$lib/client/Editors/CVEditor/CVEditor.svelte";
    import type { CVDataEntry } from "$lib/server/types";


    import { education, position } from "./onboarding";

    function updateEducation(newData: CVDataEntry[]) {
        $education = newData;
    }

</script>
<div class:hidden={$position != 3}>
    <!-- Education -->
    <h2>Education</h2>
    <CvEditor data={$education} handleNewCVData={updateEducation}/>
</div>