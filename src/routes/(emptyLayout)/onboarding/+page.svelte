<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    import AboutEditor from "$lib/client/Editors/AboutEditor.svelte";
    import CvEditor from "$lib/client/Editors/CVEditor/CVEditor.svelte";
    import Input from "$lib/client/Input.svelte";
    import { buttonStyles, inputStyles } from "$lib/client/styles";
    import type { CVDataEntry } from "$lib/server/types";
    import ProgressBar from "./ProgressBar.svelte";
    import { request } from "$lib/client/auth"; // Assuming you have a custom request function

    let position = 0

    let title = ''
    let email = ''
    let password = ''
    let about = ''
    let workExperiences: CVDataEntry[] = [] // Define the types properly
    let education: CVDataEntry[] = [] // Define the types properly

    function updateWorkExperiences(newData: CVDataEntry[]) {
        workExperiences = newData;
    }
    function updateEducation(newData: CVDataEntry[]) {
        education = newData;
    }

    async function handleSubmitDefault() {
        const res = await request('/api/keyvaluestore', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'default',
            })
        });

        if (res.status == 200) {
            window.location.href = '/'
        }

    }
    async function handleSubmitCustom() {

        // Send the request using a custom 'request' function or fetch
        try {
            const res = await request('/api/keyvaluestore', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'batch',
                    data: {
                        title,
                        email,
                        password,
                        about,
                        workexperience: workExperiences,
                        education
                    }
                })
            });
           
            if (res.status == 200) {
                window.location.href = '/'
            }

        } catch (error) {
            console.error('Error during form submission:', error);
        }
    }
</script>

<div class="flex flex-col grow p-8 gap-4 w-[100vh] h-[100vh] justify-between">
    <div class="flex justify-center">
        <ProgressBar currentPosition={position} maxPosition={3} />        
    </div>

    <div>
        <div class="flex flex-col gap-4" class:hidden={position != 0}>
            <h2>Admin account</h2>
            
            <label for="title">
                Title of personal website (typically your name)
            </label>
            <Input placeholder="Max Mustermann" bind:value={title} name="title"/>
            
            <label for="email">
                Email
            </label>
            <Input placeholder="email@email.com" bind:value={email} name="email"/>
            
            <label for="password">
                Password
            </label>
            <input name="password" placeholder={'password'} class={`${inputStyles}`} bind:value={password} type="password"/>  
        </div>
    
        <!-- About -->
        <div class:hidden={position != 1}>
            <AboutEditor bind:value={about}/>
        </div>
        
        <div class:hidden={position != 2}>
            <!-- Work experiences -->
            <h2>Work experiences</h2>
            <CvEditor data={workExperiences} handleNewCVData={updateWorkExperiences}/>
        </div>
        
        <div class:hidden={position != 3}>
            <!-- Education -->
            <h2>Education</h2>
            <CvEditor data={education} handleNewCVData={updateEducation}/>
        </div>
    </div>  

    <div class="flex mt-16 gap-4">
        {#if position != 3}
            {#if position == 0}
                <button type="button" class="grow" on:click={(e) => handleSubmitDefault()}>
                    Use default values
                </button>
            {/if}
            <Button handleClick={(e) => {e.preventDefault(); position = position + 1}}>
                Next
            </Button>
        {:else}
            <button type="submit" class={buttonStyles} on:click={(e) => handleSubmitCustom()}>
                Save
            </button>
        {/if}
    </div>

    <div />
</div>
