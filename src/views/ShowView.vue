<script setup lang="ts">
import { useRoute } from 'vue-router'
import ShowDetails from '@/components/ShowDetails.vue'
import ShowEpisodes from '@/components/ShowEpisodes.vue'
import { ref, watch } from 'vue'
import type { Show } from '@/services/shows/types'

const route = useRoute()
const showId = ref<Show['id']>(Number(route.params.id))

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      showId.value = Number(newId)
    }
  },
)
</script>

<template>
  <div class="bg-gray-100 rounded-lg p-4">
    <ShowDetails :id="showId" />
    <ShowEpisodes :id="showId" />
  </div>
</template>
