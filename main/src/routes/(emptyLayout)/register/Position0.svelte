<script>
    import Input from "$lib/client/Input.svelte";
    import {email, password, position, socials} from './onboarding'
    import { inputStyles } from "$lib/client/styles";
    import Button from "$lib/client/Button.svelte";
    import SocialsEditor from "$lib/client/Editors/SocialsEditor.svelte";
    let forceUpdateSocials = false

</script>
<div class="flex flex-col gap-4" class:hidden={$position != 0}>

    <label for="email">
        Email
    </label>
    <Input placeholder="email@email.com" bind:value={$email} name="email"/>
    
    <label for="password">
        Password
    </label>
    <input name="password" placeholder={'password'} class={`${inputStyles}`} bind:value={$password} type="password"/>  

    {#key forceUpdateSocials}
        <SocialsEditor 
            bind:facebook={$socials.Facebook}
            bind:github={$socials.GitHub}
            bind:linkedin={$socials.LinkedIn}
            bind:email={$socials.Email}
        />
    {/key}
    
   
    <Button type="button" handleClick={(e) => {
        $email = 'test@test.com'
        $password = '123456'
        alert(`Password is: ${$password}`)
        $socials = {
            ...$socials,
            LinkedIn: 'https://www.linkedin.com/in/peter-christian-wuerdemann/'
        }
        forceUpdateSocials = !forceUpdateSocials
    }}>
        Use default values
    </Button>
</div>

