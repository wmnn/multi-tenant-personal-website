<script lang="ts">
    export let href;
    export let title;
    export let classes = '';
</script>

<li class={classes}>
    <a href={href}>{title}</a>
</li>