<script lang="ts">
    import { fetchEndpoint } from "$lib/client/auth";
    import Button from "$lib/client/Button.svelte";
    import Input from "$lib/client/Input.svelte";

    function handleSubmit(e: any) {
        
        e.preventDefault();
    }
</script>

<main class="flex justify-center">
    <form method="POST" class="flex flex-col justify-center xl:px-[20%]" enctype="multipart/form-data" on:submit={e => handleSubmit(e)}>
    
        <label for="title">Title</label>
        <Input placeholder="title" name="title"/>
        
        <label for="content">Content</label>        
        <textarea name="content"></textarea>
    
        <label for="thumbnail">Thumbnail</label>
        <input type="file" name="thumbnail">
     
        <Button>
            <p>Save</p>
        </Button>
    
    </form>


    <!-- <div class="flex flex-wrap">
        <Button>Title 1</Button>
        <Button>Title 2</Button>
        <Button>Title 3</Button>
        <Button>p</Button>
        <Button>Link</Button>
        <Button>Upload Image</Button>
        <Button>Image</Button>

    </div> -->

</main>


<style>
    form label {
        padding-top: 16px;
    }
    textarea {
        border-width: 1px;
        border-radius: 8px;
    }
</style>