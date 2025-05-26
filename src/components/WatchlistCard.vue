<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getShow } from '@/services/shows/ShowsService'
import { SUCCESS } from '@/utils/constants'
import ShowCard from '@/components/ShowCard.vue'

const { id } = defineProps<{
  id: string
}>()

const show = ref<Show | null>(null)

onMounted(async () => {
  const getShowResponse = await getShow(id)
  if (getShowResponse.status === SUCCESS) {
    show.value = getShowResponse.data
  } else {
    console.error('Failed to fetch show')
  }
})
</script>

<template>
  <ShowCard
    v-if="show"
    :id="show.id"
    :title="show.name"
    :image="show.image?.medium"
    :rating="show.rating.average"
    :alt="show.name"
  />
</template>
