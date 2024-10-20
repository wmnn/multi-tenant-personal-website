<script lang="ts">
    import { marked } from 'marked'
    import sanitizeHtml from 'sanitize-html';
    
    export let title;
    export let content;
</script>

<div>
    <h1 class="font-bold text-4xl pb-8">{title}</h1>
    {#await marked.parse(content ?? '')}
        ...loading markdown
    {:then dirtyHTML} 
        {@html sanitizeHtml(dirtyHTML, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
          })}
    {/await}
</div>