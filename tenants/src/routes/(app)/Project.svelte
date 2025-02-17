<script lang="ts">
    export let title: string;
    export let thumbnail: string;
    export let href: string;
</script>

<a href={href} target="_blank" class="block">
    <button class="flex flex-col items-center text-center transition-transform transform hover:scale-105">
        <h1 class="text-lg font-semibold mb-2">{title}</h1>

        <div class="rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <img 
                src={thumbnail} 
                alt={`${title} thumbnail`} 
                class="w-full h-full object-cover"
            />
        </div>
    </button>
</a>
