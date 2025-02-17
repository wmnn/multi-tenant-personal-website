<script>
    import Input from "$lib/client/Input.svelte";
    import {email, firstName, lastName, password, position} from './onboarding'
    import { buttonStyles, inputStyles } from "$lib/client/styles";
    import Button from "$lib/client/Button.svelte";

</script>
<div class="flex flex-col gap-4" class:hidden={$position != 0}>
    
    <label for="firstName">
        First name
    </label>
    <Input placeholder="John" bind:value={$firstName} name="firstName"/>

    <label for="lastName">
        Last name
    </label>
    <Input placeholder="Doe" bind:value={$lastName} name="lastName"/>

    <label for="email">
        Email
    </label>
    <Input placeholder="email@email.com" bind:value={$email} name="email"/>
    
    <label for="password">
        Password
    </label>
    <input name="password" placeholder={'password'} class={`${inputStyles}`} bind:value={$password} type="password"/>  

   
    <Button type="button" handleClick={(e) => {
        $firstName = 'John'
        $lastName = 'Doe'
        $email = 'test'
        $password = '123456'
        alert(`Password is: ${$password}`)
    }}>
        Use default values
    </Button>
</div>

