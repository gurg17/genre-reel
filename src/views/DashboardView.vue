<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getShows } from '@/services/shows/ShowsService'
import { SUCCESS } from '@/utils/constants'
import GenreRow from '@/components/GenreRow.vue'
import type { Genre, Show } from '@/services/shows/type'

interface ShowsByGenre {
  [genre: Genre]: Show[]
}

const showsByGenre = ref<ShowsByGenre>({})

onMounted(async () => {
  const getShowsResponse = await getShows()

  // Check if the API call was successful
  if (getShowsResponse.status === SUCCESS) {
    // Group shows by genre and sort each genre's shows by rating (descending)
    showsByGenre.value = getShowsResponse.data.reduce((acc, show) => {
      // For each genre the show belongs to
      show.genres.forEach((genre) => {
        // If this genre hasn't been added yet, initialize it as an empty array
        if (!acc[genre]) acc[genre] = []
        // Add the current show to the genre's array
        acc[genre].push(show)
        // Sort the shows in this genre by their average rating, highest first
        acc[genre].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
      })
      // Return the accumulator for the next iteration
      return acc
    }, {} as ShowsByGenre)
  } else {
    console.error('Failed to fetch shows')
  }
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <GenreRow
      v-for="genre in Object.keys(showsByGenre)"
      :key="genre"
      :title="genre"
      :genreList="showsByGenre[genre]"
    />
  </div>
</template>
