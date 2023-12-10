<script setup>
import Search from '../ui/Search.vue'
import Filter from '../ui/Filter.vue'
import Countries from '../ui/Countries.vue'
import Footer from '../ui/Footer.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    const back = router.options.history.state.back

    if (!back) return

    const code = back.substring(back.lastIndexOf('/') + 1)
    const element = document.getElementById(code)

    if (!element) return

    const dim = element.getBoundingClientRect()
    window.scrollTo({ top: dim.top - (window.screen.height - (dim.bottom - dim.top)) / 2, behavior: 'smooth' })
    element.classList.add('animate-pulse')
    setTimeout(() => element.classList.remove('animate-pulse'), 6000)
})
</script>


<template>
    <main class="max-w-6xl mx-auto px-5 w-full">
        <section class="flex flex-col md:flex-row justify-between gap-2 items-stretch md:my-10">
            <Search class="my-10 md:my-0" />
            <Filter />
        </section>
        <Countries />
        <Footer />
    </main>
</template>
