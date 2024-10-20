<script lang="ts">
    export let classes = ''
    export let handleClick = (e: any) => {}
</script>

<button type='submit' class={`flex justify-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-200 transition-all ${classes}`} on:click={handleClick}>
    <slot />
</button>