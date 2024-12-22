<script lang="ts">
    import HeaderSubTitleHref from "./HeaderSubTitleHref.svelte";
    import HeaderTitle from "./HeaderTitle.svelte";

    export let isUserLoggedIn;
</script>
<ul class="flex gap-4 flex-col w-full px-8 py-8 text-reallylight">			
			
    {#if isUserLoggedIn}
        <HeaderTitle>
            Einstellungen
        </HeaderTitle>
        <HeaderSubTitleHref href={`/settings/about`}>
            Über mich
        </HeaderSubTitleHref>
        <HeaderSubTitleHref href={`/settings/cv`}>
            Lebenslauf
        </HeaderSubTitleHref>
        <HeaderSubTitleHref href={`/settings/posts`}>
            Posts
        </HeaderSubTitleHref>
        <HeaderSubTitleHref href={`/settings/categories`}>
            Blog Categories
        </HeaderSubTitleHref>
        <HeaderSubTitleHref href={`/api/logout`}>
            Log out
        </HeaderSubTitleHref>
    {:else}
        <a href={`/login`}>Login</a>
    {/if}
</ul>