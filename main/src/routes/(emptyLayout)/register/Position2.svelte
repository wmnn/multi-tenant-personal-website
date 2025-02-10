<script lang="ts">
    import CvEditor from "$lib/client/Editors/CVEditor/CVEditor.svelte";
    import type { CVDataEntry } from "$lib/server/types";


    import { position, workExperiences } from "./onboarding";

    function updateWorkExperiences(newData: CVDataEntry[]) {
        $workExperiences = newData;
    }

</script>
<div class:hidden={$position != 2}>
    <!-- Work experiences -->
    <h2>Work experiences</h2>
    <CvEditor data={$workExperiences} handleNewCVData={updateWorkExperiences}/>
</div>