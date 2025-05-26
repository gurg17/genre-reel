<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  rating: {
    type: [Number, String],
    required: false,
    default: null,
  },
})

const ratingValue = computed(() => {
  const num = Number(props.rating)
  return isNaN(num) ? null : num
})

const ratingClass = computed(() => {
  if (ratingValue.value === null) return 'bg-gray-200'
  if (ratingValue.value >= 8) return 'bg-green-200'
  if (ratingValue.value >= 6) return 'bg-yellow-200'
  if (ratingValue.value >= 4) return 'bg-orange-200'
  if (ratingValue.value < 4) return 'bg-red-200'
  return 'bg-gray-200'
})

const displayRating = computed(() => {
  return ratingValue.value !== null ? ratingValue.value : '-'
})
</script>

<template>
  <span
    :class="[
      'inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
      ratingClass,
    ]"
  >
    {{ displayRating }}
  </span>
</template>
