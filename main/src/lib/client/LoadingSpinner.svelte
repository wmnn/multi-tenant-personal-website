<script>
    export let color = '#BBBBBB'
    export let diameter = '24px'
    export let thickness = '2px'
    export let speed = '1s'
</script>

<!-- See: https://cssloaders.github.io/ -->
<style>
    #spinner {
        width: var(--diameter);
        height: var(--diameter);
        border: var(--thickness) solid var(--spinner-color);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation var(--speed) linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
</style>

<span id="spinner" style="--spinner-color: {color}; --diameter: {diameter}; --thickness: {thickness}; --speed: {speed}"/>