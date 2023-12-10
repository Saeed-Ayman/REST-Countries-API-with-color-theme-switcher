<script setup>
import { useCountriesStore } from "../stores/useCountriesStore"
import InfoCountry from "../components/infoCountry.vue"
import value from "../helpers/valueOrDefault";

const countriesStore = useCountriesStore()
</script>

<template>
    <section class="flex justify-evenly flex-wrap gap-10 py-8 items-stretch">
        <div v-if="countriesStore.error" class="font-semibold text-red-600">
            {{ countriesStore.error }}
        </div>
        <div v-else-if="countriesStore.data" v-for="country in countriesStore.data" :key="country.cca3" :id="country.cca3"
            class="w-[400px] md:w-[240px] bg-white shadow rounded-lg overflow-hidden border dark:border-dark-blue dark:text-white dark:bg-dark-blue">
            <img class="object-fill w-full md:h-40" :src="country.flags.png">
            <div class="px-6 py-4">
                <div class="font-bold">
                    <router-link :to="{ name: 'country', params: { code: country.cca3 } }">
                        {{ country.name.common }}
                    </router-link>
                </div>

                <div class="py-4 text-sm">
                    <InfoCountry title="population">{{ value(country.population) }}</InfoCountry>
                    <InfoCountry title="region">{{ value(country.region) }}</InfoCountry>
                    <InfoCountry title="capital">{{ value(country.capital) }}</InfoCountry>
                </div>
            </div>
        </div>
    </section>
</template>