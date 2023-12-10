<script setup>
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"
import value from '../helpers/valueOrDefault.js'
import { useQuery } from "../composables/useQuery.js";
import { getCountry } from "../services/countryApi.js";

import LoadingIcon from "../components/loadingIcon.vue";
import InfoCountry from "../components/infoCountry.vue";

const route = useRoute()

const params = ref({
    fields: ['name', 'currencies', 'flags', 'population', 'region', 'subregion', 'capital', 'tld', 'languages', 'borders'],
    code: route.params.code,
    borders_fields: ['name', 'code']
})
const { data, error, isLoading } = useQuery(getCountry, params)

watch(() => route.params.code, () => params.value.code = route.params.code)

const nativeName = computed(() => {
    const nativeNames = data.value.name.nativeName
    const keys = Object.keys(nativeNames)

    return nativeNames[keys[keys.length - 1]].common
})

const currencies = computed(() => Object.values(data.value.currencies).map(currency => currency.name))
</script>

<template>
    <main class="max-w-6xl w-full flex-1 mx-auto">
        <div v-if="isLoading" class="h-full flex justify-center items-center dark:text-white">
            <LoadingIcon />
        </div>

        <div v-else-if="error" class="h-full flex justify-center items-center text-center font-semibold text-red-600">
            {{ error }}
        </div>

        <section v-else class="px-5 pb-10">
            <div class="py-16">
                <button @click="$router.go(-1)"
                    class="w-fit flex items-center gap-2 bg-white rounded-lg shadow-lg border px-7 py-1.5 dark:text-white dark:border-dark-blue dark:bg-dark-blue">
                    <v-icon name="md-keyboardbackspace" />
                    <span>Back</span>
                </button>
            </div>

            <article class="flex flex-col md:flex-row gap-10 md:gap-24 dark:text-white">
                <div class="flex-1"><img :src="data.flags.svg" /></div>

                <div class="flex-1 flex flex-col gap-5 justify-around">
                    <div class="text-2xl font-bold">{{ value(data.name.common) }}</div>

                    <div class="text-sm">
                        <div class="flex justify-between flex-col lg:flex-row gap-2">
                            <div class="space-y-2 flex-1">
                                <InfoCountry title="native name">{{ value(nativeName) }}</InfoCountry>
                                <InfoCountry title="population">{{ value(data.population) }}</InfoCountry>
                                <InfoCountry title="region">{{ value(data.region) }}</InfoCountry>
                                <InfoCountry title="sub region">{{ value(data.subregion) }}</InfoCountry>
                                <InfoCountry title="capital">{{ value(data.capital) }}</InfoCountry>
                            </div>

                            <div class="space-y-2 flex-1">
                                <InfoCountry title="top level domain">{{ value(data.tld) }}</InfoCountry>
                                <InfoCountry title="currencies">{{ value(currencies) }}</InfoCountry>
                                <InfoCountry title="languages">{{ value(data.languages) }}</InfoCountry>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-2">
                        <p class="font-semibold md:text-sm whitespace-nowrap">Border Countries:</p>

                        <div v-if="data.borders.length" class="flex gap-2 flex-wrap justify-center">
                            <router-link v-for="border in data.borders"
                                :to="{ name: 'country', params: { code: border.cca3 } }"
                                class="bg-white rounded-lg shadow border text-xs px-7 py-1 dark:border-dark-blue dark:bg-dark-blue">
                                {{ border.name.common }}
                            </router-link>
                        </div>

                        <div v-else> {{ value() }} </div>
                    </div>
                </div>
            </article>
        </section>
    </main>
</template>