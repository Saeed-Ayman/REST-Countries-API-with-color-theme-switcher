<script setup>
import { computed, ref } from "vue"
import { useRoute } from "vue-router";

const regions = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']
const show = ref(false);

const route = useRoute()

const filter_regions = computed(() => regions.filter(
    r => (route.query.region && r !== route.query.region) || (!route.query.region && r !== 'All')
))
</script>

<template>
    <div class="relative bg-white rounded-lg shadow-sm w-full max-w-[180px] dark:text-white dark:bg-dark-blue">
        <!-- trigger -->
        <button @click="show = !show" class="flex justify-between items-center w-full h-full pl-5 pr-3 py-3 rounded-lg">
            <span class="text-xs font-semibold">{{ route.query.region ?? 'Filter by Region' }}</span>
            <v-icon name="md-keyboardarrowdown" />
        </button>

        <!-- dropdown -->
        <div v-if="show" @click="show = false"
            class="absolute bg-white flex flex-col left-0 top-14 w-full text-xs font-semibold py-2 rounded-lg shadow-lg dark:bg-dark-blue">
            <router-link v-for="region of filter_regions" :to="region === 'All' ? '/' : '/?region=' + region"
                class="py-1 pl-5 hover:bg-gray-100 dark:hover:bg-gray-600">
                {{ region }}
            </router-link>
        </div>
    </div>
</template>