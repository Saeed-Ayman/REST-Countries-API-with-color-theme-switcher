<script setup>
import LoadingIcon from "../components/loadingIcon.vue"
import { useCountriesStore } from "../stores/useCountriesStore"

const countriesStore = useCountriesStore()
</script>

<template>
    <div v-if="!countriesStore.error" class="mt-10 pb-20 flex justify-center items-center dark:text-white">
        <LoadingIcon v-if="countriesStore.isLoading" />

        <div v-else-if="countriesStore.rest === 0" class="text-lg font-semibold my-1">
            That's All ☻.
        </div>

        <button v-else @click="countriesStore.loading"
            class="bg-white rounded-lg shadow-lg font-semibold border px-7 py-1.5 dark:border-dark-blue dark:bg-dark-blue">
            More ({{ countriesStore.rest }})
        </button>
    </div>
</template>
