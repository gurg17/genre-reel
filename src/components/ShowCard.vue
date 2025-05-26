<script setup lang="ts">
import { defineProps } from 'vue'
import ImageComponent from '@/components/ui/ImageComponent.vue'
import { useRouter } from 'vue-router'
import RatingTag from '@/components/RatingTag.vue'

interface ShowCardProps {
  id: number
  image: string
  alt?: string
  title: string
  rating?: number
}

const router = useRouter()

const { image, alt, title, rating } = defineProps<ShowCardProps>()

const handleClick = (showId) => {
  router.push({ name: 'show', params: { id: showId } })
}
</script>

<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer min-w-[350px] bg-white hover:scale-95"
    @click="handleClick(id)"
  >
    <ImageComponent class="w-full" :src="image" :alt="alt || title" />
    <div class="px-6 py-4 flex justify-between">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <RatingTag v-if="rating" :rating="rating" />
    </div>
  </div>
</template>
