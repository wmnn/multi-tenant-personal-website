<script lang="ts">
    import { request } from "$lib/client/auth";
    import CVEditor from "$lib/client/Editors/CVEditor/CVEditor.svelte";
    import { KEYS } from "$lib/client/KEYVALUESTORE_KEYS.js";
    import type { CVDataEntry } from "$lib/server/types.js";
    export let data;

    async function handleNewEducation(newData: CVDataEntry[]) {
        updateCVData(newData, KEYS.education)
    }
    async function handleNewWorkExperience(newData: CVDataEntry[]) {
        updateCVData(newData, KEYS.workexperience)
    }
    async function updateCVData (newData: CVDataEntry[], key: string) {

        await request(`/api/keyvaluestore/${key == KEYS.workexperience ? KEYS.workexperience : KEYS.education}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: newData
            })
        });
        if (key == KEYS.workexperience) {
            data.workExperiences = newData
        } else {
            data.education = newData
        }

    }
    async function handleDeleteWorkExperience(deletedItem: CVDataEntry) {
        updateCVData(data.workExperiences.filter(o => o != deletedItem), KEYS.workexperience);
    }
    async function handleDeleteEducation(deletedItem: CVDataEntry) {
        updateCVData(data.education.filter(o => o != deletedItem), KEYS.education);
    }
</script>

<main class="py-8 px-8 xl:px-[10%]">
    <h2>
        CV
    </h2>
    
    <h3 class="py-8">{`Work experiences`}</h3>
    <CVEditor data={data.workExperiences} handleNewCVData={handleNewWorkExperience} handleDelete={handleDeleteWorkExperience} />

    <h3 class="py-8">{`Education`}</h3>
    <CVEditor data={data.education} handleNewCVData={handleNewEducation} handleDelete={handleDeleteEducation} />
</main>


