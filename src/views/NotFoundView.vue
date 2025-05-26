<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="text-center flex flex-col justify-center items-center h-96">
    <ExclamationTriangleIcon class="text-yellow-500 text-7xl mb-5"></ExclamationTriangleIcon>
    <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl mb-5">This page does not exist</p>
    <RouterLink to="/" class="text-white bg-teal-600 hover:bg-teal-700 rounded-md px-3 py-2 mt-4"
      >Go Back</RouterLink
    >
  </section>
</template>
