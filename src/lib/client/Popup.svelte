<script lang="ts">
    import Portal from 'svelte-portal'
</script>

<Portal>
    <div class="alert">
        <slot />
    </div>
</Portal>

<style>
    .alert {
        display: flex;
        position: fixed;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 2000000 !important;
    }
</style>