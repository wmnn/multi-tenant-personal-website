<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import CvEditor from "$lib/client/Editors/CVEditor/CVEditor.svelte";
    import type { CVDataEntry } from "$lib/server/types";


    import { DEFAULT_CV_DATA, position, workExperiences } from "./onboarding";

    function updateWorkExperiences(newData: CVDataEntry[]) {
        $workExperiences = newData;
    }

</script>
<div class:hidden={$position != 2}>
    <!-- Work experiences -->
    <h2>Work experiences</h2>
    <CvEditor data={$workExperiences} handleNewCVData={updateWorkExperiences}/>
    <Button type="button" handleClick={(e) => {
        $workExperiences = DEFAULT_CV_DATA.workExperiences
    }}>
        Use default values
    </Button>
</div>