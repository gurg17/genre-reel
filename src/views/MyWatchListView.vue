<script setup lang="ts">
import { useWatchlistStore } from '@/stores/watchlist'
import { storeToRefs } from 'pinia'
import WatchlistCard from '@/components/WatchlistCard.vue'

const watchlistStore = useWatchlistStore()

const { watchlist } = storeToRefs(watchlistStore)
</script>

<template>
  <div class="flex w-full gap-4 flex-wrap justify-center">
    <WatchlistCard v-for="id in watchlist" :id="id" :key="id" class="w-full" />
  </div>
</template>
