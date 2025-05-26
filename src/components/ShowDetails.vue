<script setup lang="ts">
import ImageComponent from '@/components/ui/ImageComponent.vue'
import RatingTag from '@/components/RatingTag.vue'
import { LinkIcon } from '@heroicons/vue/24/outline'
import { formatDate } from '@/utils/helper'
import { watch, ref, computed } from 'vue'
import { getShow } from '@/services/shows/ShowsService'
import { SUCCESS } from '@/utils/constants'
import type { Show } from '@/services/shows/type'
import CastsLayout from '@/components/CastsLayout.vue'
import { useWatchlistStore } from '@/stores/watchlist'

const { id } = defineProps<{
  id: Show['id']
}>()

const show = ref<Show>({})

const watchlistStore = useWatchlistStore()

const onWatchlist = computed(() => watchlistStore.isOnWatchlist(id))

const handleWatchList = () => {
  if (onWatchlist.value) {
    watchlistStore.removeFromWatchlist(id)
  } else {
    watchlistStore.addToWatchlist(id)
  }
}

watch(
  () => id,
  async (newId) => {
    const getShowResponse = await getShow(newId)
    if (getShowResponse.status === SUCCESS) {
      show.value = getShowResponse.data
    } else {
      console.error('Failed to fetch show')
    }
  },
  { immediate: true }, // fetch on mount as well
)
</script>

<template>
  <div class="flex flex-col gap-4 md:flex-row items-center">
    <ImageComponent
      v-if="show.image"
      :key="show.image?.original"
      :src="show.image.original"
      :alt="show.name"
      class="mb-4 rounded-lg shadow-lg object-contain aspect-auto h-96 w-auto"
    />
    <div class="gap-4">
      <div class="flex gap-4 items-center">
        <h2 class="text-4xl font-bold mb-4 text-teal-600">
          {{ show.name }}
        </h2>
        <RatingTag v-if="show.rating?.average" :rating="show.rating.average" />
      </div>
      <button
        :class="
          onWatchlist
            ? 'bg-yellow-300 hover:bg-yellow-600 text-black'
            : 'bg-teal-600 hover:bg-teal-800 text-white'
        "
        class="rounded-lg px-2 text-sm"
        @click="handleWatchList"
      >
        {{ onWatchlist ? 'Remove from ' : 'Add to ' }} Watchlist
      </button>
      <h3 class="text-2xl font-bold mb-4 text-teal-600">Summary</h3>
      <div v-html="show.summary" class="mb-4"></div>
      <div>
        <h4 class="text-1xl font-bold mb-4 text-teal-600">Genre:</h4>
        <span
          class="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-yellow-300 mr-2 mb-2"
          v-for="genre in show.genres"
          :key="genre"
          >{{ genre }}
        </span>
      </div>
      <div class="flex gap-2 mt-2">
        <h4 class="text-1xl font-bold mb-4 text-teal-600">TV Maze URL:</h4>
        <a :href="show.url" target="_blank" rel="noopener">
          {{ show.url || 'Unknown' }}
          <LinkIcon class="inline-block h-4 w-4 text-blue-500" />
        </a>
      </div>
    </div>
  </div>

  <div>
    <h3 class="text-2xl font-bold mb-4 text-teal-600">Show Info</h3>
    <div class="flex w-full gap-20 md:gap-40">
      <ul class="list-disc pl-6">
        <li v-if="show.officialSite">
          <strong>Network:</strong>
          <a :href="show.officialSite ?? show.network.officialSite" target="_blank" rel="noopener">
            {{ show.network?.name || 'Unknown' }}
            <LinkIcon class="inline-block h-4 w-4 text-blue-500" />
          </a>
        </li>
        <li v-if="show.premiered">
          <strong>Premiered:</strong> {{ formatDate(show.premiered) || 'Unknown' }}
        </li>
        <li><strong>Language:</strong> {{ show.language || 'Unknown' }}</li>

        <li><strong>Runtime:</strong> {{ show.runtime || 'Unknown' }} minutes</li>
      </ul>
      <ul class="list-disc pl-6">
        <li><strong>Status:</strong> {{ show.status || 'Unknown' }}</li>
        <li v-if="show.ended"><strong>Ended:</strong> {{ formatDate(show.ended) || 'Unknown' }}</li>
        <li><strong>Type:</strong> {{ show.type || 'Unknown' }}</li>
        <li><strong>Average Runtime:</strong> {{ show.averageRuntime || 'Unknown' }} minutes</li>
      </ul>
    </div>
  </div>

  <div class="mt-4">
    <div class="flex w-full gap-20 md:gap-40">
      <div>
        <h3 class="text-2xl font-bold mb-4 text-teal-600">Show Schedules</h3>

        <ul class="list-disc pl-6">
          <li v-if="show.schedule?.time">
            <strong>Time:</strong> {{ show.schedule.time || 'Unknown' }}
          </li>
          <li v-if="show.network?.country?.timezone">
            <strong>Timezone:</strong> {{ show.network.country.timezone || 'Unknown' }}
          </li>

          <li v-if="show.schedule?.days">
            <strong>Days: </strong>
            <span
              class="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-yellow-300 mr-2 mb-2"
              v-for="days in show.schedule.days"
              :key="days"
              >{{ days }}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-2xl font-bold mb-4 text-teal-600">External Id's</h3>

        <ul class="list-disc pl-6">
          <li v-if="show.externals?.tvrage">
            <strong>TV Rage:</strong>
            {{ show.externals.tvrage || 'Unknown' }}
          </li>
          <li v-if="show.externals?.thetvdb">
            <strong>The TVDB:</strong>
            {{ show.externals.thetvdb || 'Unknown' }}
          </li>
          <li v-if="show.externals?.imdb">
            <strong>IMDB:</strong>
            {{ show.externals.imdb || 'Unknown' }}
          </li>
        </ul>
      </div>
    </div>
    <CastsLayout :casts="show._embedded?.cast" />
  </div>
</template>
