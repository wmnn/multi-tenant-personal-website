<script lang="ts">
    import Hamburger from "$lib/client/icons/Hamburger.svelte";
    import Portal from "svelte-portal";
    import HeaderTitle from "./HeaderTitle.svelte";
    export let isUserLoggedIn;

    let isMobileNavDropdownShown = false;
	function hideMobileNavDrowdown() {
		isMobileNavDropdownShown = false;
	}
</script>

<Portal>
    <nav class:h-full={isMobileNavDropdownShown} class='absolute w-full xl:hidden top-0 bg-white transition-all'>

        <button class="mt-8 mr-8 z-40 absolute right-0" on:click={() => isMobileNavDropdownShown = !isMobileNavDropdownShown}>
            <Hamburger />
        </button>

        {#if isMobileNavDropdownShown}
            <div> 
                <ul class="flex gap-4 flex-col w-full px-8 py-8 text-reallylight">   
                    {#if isUserLoggedIn}
                        <div></div>
                    {:else}
                        <a href={`/login`} on:click={hideMobileNavDrowdown}>Login</a>
                    {/if}
                </ul>
            </div>
        {/if}
    </nav>
</Portal>