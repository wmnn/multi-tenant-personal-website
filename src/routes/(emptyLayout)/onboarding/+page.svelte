<script lang="ts">
    
    import AboutEditor from "$lib/client/Editors/AboutEditor.svelte";
    import CvEditor from "$lib/client/Editors/CVEditor/CVEditor.svelte";
    import Input from "$lib/client/Input.svelte";
    import { inputStyles } from "$lib/client/styles";
    import type { CVDataEntry } from "$lib/server/types";
    import { onMount } from "svelte";

    export let form

    let email = ''
    let password = ''
    let about = ''
    let workExperiences: CVDataEntry[] = ([] as any);
    let education: CVDataEntry[] = ([] as any);

    function updateWorkExperiences(newData: CVDataEntry[]) {
        workExperiences = newData;
    }
    function updateEducation(newData: CVDataEntry[]) {
        education = newData;
    }
    function handleSubmit() {

    }

    onMount(() => {
        if (form?.status == 200) {
            window.location.href = '/'
        }
    })

</script>
<form class="flex flex-col grow p-8 gap-4" method="POST">

    <h2>Admin account</h2>
    <Input placeholder="email" bind:value={email} />
    <input placeholder={'password'} class={`${inputStyles}`} bind:value={password} type="password"/>

    <!-- About -->
    <AboutEditor bind:value={about}/>

    <!-- Work experiences -->
    <h2>Work experiences</h2>
    <CvEditor data={workExperiences} handleNewCVData={updateWorkExperiences}/>

    <!-- Education -->
    <h2>Education</h2>
    <CvEditor data={education} handleNewCVData={updateEducation}/>

    <div class="flex mt-16 gap-4">
        <button formaction="?/defaultValues" type="submit">
            Use default values
        </button>
    
        <button formaction="?/customValues" type="submit">
            Save
        </button>
    </div>

</form>