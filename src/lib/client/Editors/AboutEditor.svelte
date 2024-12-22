<script lang="ts">
    export let value: string;
</script>

<div>
    <h2>
        About
    </h2>
    <textarea class="border-black border-[1px] rounded-xl min-h-[600px] w-full p-2" bind:value={value} />
</div>
