import { ref, toValue, watchEffect } from "vue";

export function useQuery(callable, params) {
    const data = ref([])
    const isLoading = ref(true)
    const error = ref(null)

    watchEffect(async () => {
        data.value = []
        error.value = null
        isLoading.value = true

        try {
            data.value = await callable?.(toValue(params))
        } catch(e) {
            error.value = e
        }
        isLoading.value = false
    })

    return {data, isLoading, error}
}