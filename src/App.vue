<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <body>
    <NavBar />
    <div class="p-4 sm:px-6 lg:px-8">
      <RouterView />
    </div>
  </body>
</template>
