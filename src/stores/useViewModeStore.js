import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useViewModeStore = defineStore('view-mode', () => {
    const mode = ref();
    const reverse = computed(() => mode.value != 'light' ? 'light' : 'dark')

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        mode.value = 'dark'
        document.documentElement.classList.add('dark')
    } else {
        mode.value = 'light'
        document.documentElement.classList.remove('dark')
    }
    
    
    watch(mode, () => localStorage.theme = mode.value)

    function change() {
        if (!mode.value || mode.value == 'light') {
            mode.value = 'dark'
            document.documentElement.classList.add('dark')
        } else {
            mode.value = 'light'
            document.documentElement.classList.remove('dark')
        }
    }

    return {mode, change, reverse}
})