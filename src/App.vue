<script setup>
import Nav from './ui/Nav.vue'
</script>

<template>
  <main class="h-screen flex flex-col">
    <Nav />
    <router-view />
  </main>
</template>