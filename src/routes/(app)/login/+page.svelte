<script>
    import Button from "$lib/client/Button.svelte";
    import Input from "$lib/client/Input.svelte";
</script>

<div class="flex justify-center py-8">
    <form method="POST" class="flex flex-col xl:w-[20%] w-[50%] gap-4">
        <Input placeholder={'Email'} name={'email'} />
        <Input type={'password'} placeholder={'Password'} name={'password'} />
        <Button>
            Log In
        </Button>
    </form>
</div>
