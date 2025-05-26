<script setup lang="ts">
import type { Show } from '@/services/shows/types'
import ShowCard from '@/components/ShowCard.vue'
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { width } = useWindowSize()

const carouselConfig = computed(() => ({
  gap: 5,
  itemsToShow: Math.max(1, Math.floor(width.value / 400)),
}))

const { title, genreList } = defineProps<{
  title: string
  genreList: Show[]
}>()
</script>

<template>
  <div class="flex flex-col gap-4 bg-gray-200 p-4 rounded-2xl shadow-lg">
    <h1
      class="text-3xl sm:text-4xl md:text-6xl text-teal-600 font-bold mb-4 w-full text-center md:text-left"
    >
      {{ title }}
    </h1>
    <Carousel v-bind="carouselConfig">
      <Slide v-for="show in genreList" :key="show.id">
        <ShowCard
          :id="show.id"
          :title="show.name"
          :image="show.image?.medium"
          :rating="show.rating.average"
          :alt="show.name"
        />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
