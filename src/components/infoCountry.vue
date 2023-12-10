<script setup>
defineProps({ title: String })
</script>

<template>
    <div class="flex gap-2">
        <span class="font-semibold capitalize whitespace-nowrap">{{ title }}:</span>
        <span class="text-center">
            <slot />
        </span>
    </div>
</template>