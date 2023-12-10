<script setup>
import { useCountriesStore } from '../stores/useCountriesStore';
import { useViewModeStore } from '../stores/useViewModeStore';

const viewModel = useViewModeStore()
</script>
<template>
    <nav class="bg-white shadow-sm dark:text-white dark:bg-dark-blue">
        <div class="mx-auto max-w-6xl w-full flex justify-between items-center px-5 py-6">
            <div>
                <h1 class="text-lg md:text-xl font-bold">
                    <router-link to="/" @click="() => useCountriesStore().reset()">Where in the world?</router-link>
                </h1>
            </div>
            <div>
                <button class="flex gap-2 items-center text-xs sm:text-sm md:text-base font-semibold"
                    @click="viewModel.change">
                    <v-icon :name="`bi-${viewModel.reverse == 'dark' ? 'moon' : 'sun'}-fill`" class="my-0.5" />
                    <span class="hidden sm:block capitalize">{{ viewModel.reverse }} Mode</span>
                </button>
            </div>
        </div>
    </nav>
</template>