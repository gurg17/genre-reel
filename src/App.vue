<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavBar from './components/ui/NavBar.vue'
</script>

<template>
  <body class="bg-gray-100 h-screen">
    <NavBar />
    <div class="px-4 sm:px-6 lg:px-8">
      <RouterView />
    </div>
  </body>
</template>
