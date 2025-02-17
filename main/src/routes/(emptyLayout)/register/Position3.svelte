<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import CvEditor from "$lib/client/Editors/CVEditor/CVEditor.svelte";
    import type { CVDataEntry } from "$lib/server/types";

    import { DEFAULT_CV_DATA, education, position } from "./onboarding";

    function updateEducation(newData: CVDataEntry[]) {
        $education = newData;
    }

</script>
<div class:hidden={$position != 3}>
    <!-- Education -->
    <h2>Education</h2>
    <CvEditor data={$education} handleNewCVData={updateEducation}/>
    <Button type="button" handleClick={(e) => {
        $education = DEFAULT_CV_DATA.education
    }}>
        Use default values
    </Button>
</div>