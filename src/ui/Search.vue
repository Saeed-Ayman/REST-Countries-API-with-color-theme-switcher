<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const search = ref(route.query.search)

watch(search, () => {
    let query = {}

    if (search.value) query.search = search.value
    else if (route.query.region) query.region = route.query.region

    router.push({ query: query })
})

watch(() => route.query.search, (after) => {
    if (!after) search.value = ''
})

</script>

<template>
    <div
        class="relative bg-white text-dark-gray rounded-lg text-xs w-full md:max-w-[400px] shadow font-semibold dark:bg-dark-blue">
        <label for="search" class="absolute top-0 left-0 translate-x-5 translate-y-3.5">
            <v-icon name="hi-search" />
        </label>
        <input id="search" type="text" placeholder="Search for a country..."
            class="text-black rounded-lg pl-14 pr-4 py-4 w-full dark:text-white dark:bg-dark-blue" v-model="search" />
    </div>
</template>