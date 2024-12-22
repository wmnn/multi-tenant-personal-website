<script>
    import Button from "$lib/client/Button.svelte";
    import { inputStyles } from "$lib/client/styles";
</script>

<div class="flex justify-center py-8">
    <form method="POST" class="flex flex-col xl:w-[20%] w-[50%] gap-4">
        <input placeholder={'Email'} name={'email'} class={inputStyles} />
        <input type={'password'} placeholder={'Password'} name={'password'} class={inputStyles} />
        <Button type="submit">
            Log In
        </Button>
    </form>
</div>
