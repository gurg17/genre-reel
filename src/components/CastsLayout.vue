<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import type { Cast } from '@/services/shows/types'
import CastDetails from '@/components/CastDetails.vue'

const { casts } = defineProps<{
  casts?: Cast[]
}>()

const { width } = useWindowSize()

const carouselConfig = computed(() => ({
  gap: 5,
  itemsToShow: Math.max(1, Math.floor(width.value / 400)),
}))
</script>

<template>
  <h3 class="text-2xl font-bold mb-4 text-teal-600">Casts</h3>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="cast in casts" :key="`${cast.person.id}=${cast.character.id}`">
      <CastDetails :cast="cast" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
