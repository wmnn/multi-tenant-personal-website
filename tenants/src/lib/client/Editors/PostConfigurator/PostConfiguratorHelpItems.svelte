<script lang="ts">
    import Button from "$lib/client/Button.svelte";
    export let addHeadingToTextarea;

</script>

<div class="xl:w-[20%] p-8 helper hidden xl:flex flex-col gap-2">
    <Button handleClick={(e) => addHeadingToTextarea('\n# ')}><h1>Heading 1</h1></Button>
    <Button handleClick={(e) => addHeadingToTextarea('\n## ')}><h2>Heading 2</h2></Button>
    <Button handleClick={(e) => addHeadingToTextarea('\n### ')}><h3>Heading 3</h3></Button>
    <Button><a href="/" on:click={(e) => e.preventDefault()}>Link</a></Button>
    <Button>Image</Button>
    <Button><code>Code</code></Button>
    <Button><blockquote>Blockquote</blockquote></Button>
</div>