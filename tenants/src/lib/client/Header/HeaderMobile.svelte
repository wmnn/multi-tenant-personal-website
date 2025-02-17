<script lang="ts">
    import Hamburger from "$lib/client/icons/Hamburger.svelte";
    import HeaderBlogItem from "./HeaderBlogItem.svelte";
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
                <div class="px-8 flex flex-col justify-between gap-8 py-8">
                    <a href="/#about" on:click={hideMobileNavDrowdown}>
                        <HeaderTitle>Über mich</HeaderTitle>
                    </a>
                    <a href="/#CV" on:click={hideMobileNavDrowdown}>
                        <HeaderTitle>Lebenslauf</HeaderTitle>
                    </a>
                    <a href="/#projects" on:click={hideMobileNavDrowdown}>
                        <HeaderTitle>Projekte</HeaderTitle>
                    </a>
                </div>
                
                <hr>
           
                <ul class="flex gap-4 flex-col w-full px-8 py-8 text-reallylight">			
                    <h2 class="text-reallylight">Contact</h2>
                    <a href={`https://www.linkedin.com/in/peter-wuerdemann/`} class="text-reallylight pl-4 text-l" target=”_blank”>LinkedIn</a>
        
                    
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