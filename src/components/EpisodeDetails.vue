<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import ImageComponent from '@/components/ui/ImageComponent.vue'
import { EpisodeDetail } from '@/services/shows/types'
import { LinkIcon } from '@heroicons/vue/24/outline'
import { formatDate } from '@/utils/helper'
import RatingTag from '@/components/RatingTag.vue'

const { episode } = defineProps<{
  episode: EpisodeDetail
}>()
</script>

<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="flex w-full justify-between rounded-lg bg-yellow-300 px-4 py-2 text-left text-sm font-medium hover:bg-yellow-200"
    >
      <span> Episode {{ episode.number }}: {{ episode.name }} </span>
      <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5" />
    </DisclosureButton>
    <DisclosurePanel class="px-4 pb-2 pt-4 text-sm">
      <div class="flex gap-4 flex-wrap md:flex-nowrap">
        <ImageComponent
          class="w-full md:w-64 object-cover rounded-lg shadow-lg"
          :src="episode.image?.original"
        />
        <div>
          <div class="flex gap-4 items-center">
            <h3 class="text-2xl font-bold mb-4 text-teal-600">Episode details</h3>
            <RatingTag :rating="episode.rating.average || 'Unknown'" />
          </div>

          <ul class="flex flex-col space-y-2">
            <li>
              <div v-html="episode.summary"></div>
            </li>
            <li>
              <strong>TV Maze: </strong>
              <a :href="episode.url" target="_blank" rel="noopener">
                {{ episode.url || 'Unknown' }}
                <LinkIcon class="inline-block h-4 w-4 text-blue-500" />
              </a>
            </li>
            <li><strong>Air Date:</strong> {{ formatDate(episode.airdate) }}</li>
            <li><strong>Runtime:</strong> {{ episode.runtime }} minutes</li>
            <li><strong>Type:</strong> {{ episode.type }}</li>
          </ul>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
