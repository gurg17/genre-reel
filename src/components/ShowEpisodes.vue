<script setup lang="ts">
import { watch, ref } from 'vue'
import { getShowEpisodes } from '@/services/shows/ShowsService'
import { SUCCESS } from '@/utils/constants'
import EpisodeDetails from '@/components/EpisodeDetails.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'

const { id } = defineProps<{
  id: string
}>()

const groupedEpisodes = ref({})

watch(
  () => id,
  async (newId) => {
    const getShowResponse = await getShowEpisodes(newId)
    if (getShowResponse.status === SUCCESS) {
      // Group episodes by season
      const episodes = getShowResponse.data
      const grouped = episodes.reduce((acc: Record<string, Unknown[]>, episode: Unknown) => {
        const season = episode.season || 'Unknown'
        if (!acc[season]) acc[season] = []
        acc[season].push(episode)
        return acc
      }, {})
      groupedEpisodes.value = grouped
    } else {
      console.error('Failed to fetch show episodes')
    }
  },
  { immediate: true }, // fetch on mount as well
)
</script>

<template>
  <div class="w-full px-4 pt-16">
    <h3 class="text-2xl font-bold mb-4 text-teal-600">Seasons & Episodes</h3>
    <div class="mx-auto w-full rounded-2xl bg-white p-2">
      <div v-for="season in Object.keys(groupedEpisodes)" :key="season">
        <Disclosure v-slot="{ open }">
          <DisclosureButton
            :class="[
              'flex w-full justify-between bg-teal-300 px-4 py-2 text-left text-sm font-medium hover:bg-teal-200',
              season === Object.keys(groupedEpisodes)[0] ? 'rounded-tl-lg rounded-tr-lg' : '',
              season === Object.keys(groupedEpisodes).at(-1) ? 'rounded-bl-lg rounded-br-lg' : '',
            ]"
          >
            <span>Season {{ season }}</span>
            <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5" />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pb-2 pt-4 text-sm">
            <div class="flex flex-col gap-2">
              <EpisodeDetails
                v-for="episode in groupedEpisodes[season]"
                :key="episode.id"
                :episode="episode"
              />
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>
</template>
