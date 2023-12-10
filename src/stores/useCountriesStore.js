import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "../composables/useQuery";
import { countries } from "../services/countryApi";

export const useCountriesStore = defineStore('countries', () => {
    const increment = 8
    
    const route = useRoute()
    const params = ref({
        fields: ['name', 'population', 'region', 'capital', 'flags', 'cca3'],
        region: route.query.region,
        search: route.query.search
    })    
    const query = useQuery(countries, params)
    const data = ref([])
    const isLoading = ref(true)
    const rest = computed(() => query.data.value.length - data.value.length ?? 0)

    watch(query.isLoading, (_, after) => {
        isLoading.value = true
        if (after) {
            data.value = []
            loading()
        }
    })

    watch(() => route.query.region, () => {
        if (route.name == 'home' && params.value.region != route.query.region) {
            data.value = []
            params.value.region = route.query.region
        }
    })

    watch(() => route.query.search, () => {
        if (route.name == 'home' && params.value.search != route.query.search) {
            data.value = []
            params.value.search = route.query.search
        }
    })

    function reset() {
        data.value = []

        if (params.value.region || params.value.search) {
            params.value.region = undefined
            params.value.search = undefined
        } 
        else loading()
    }

    function loading() {
        isLoading.value = true
        let length = (data.value.length ?? 0) + increment
        
        setTimeout(() => {
            data.value = []
            const allData = query.data.value

            if (allData) {
                data.value = length > allData.length ? allData : allData.slice(0, length)
            }

            isLoading.value = false
        }, 1000)
    }

    return {data, isLoading, loading, error: query.error, rest, reset}
})