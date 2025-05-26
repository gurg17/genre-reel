<script setup lang="ts">
import { Cast } from '@/services/shows/types'
import { defineProps } from 'vue'
import ImageComponent from '@/components/ui/ImageComponent.vue'

const { cast } = defineProps<{ cast: Cast }>()

const { person, character } = cast

const handleClickCharacter = () => {
  window.open(character.url, '_blank')
}

const handleClickPerson = (e) => {
  e.stopPropagation()

  window.open(person.url, '_blank')
}
</script>

<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer min-w-[350px] bg-white"
    @click="handleClickCharacter"
  >
    <ImageComponent
      class="w-full max-h-[350px] aspect-9/16 object-cover"
      :src="character.image?.original"
      :alt="character.name"
    />

    <h5 class="font-bold text-xl text-center bg-yellow-300 hover:bg-yellow-200">
      {{ character.name }}
    </h5>
    <div class="px-6 py-4 flex gap-4 hover:bg-teal-200" @click="handleClickPerson">
      <ImageComponent
        class="w-16 h-16 object-cover rounded-full shadow-lg"
        :src="person.image?.medium"
        :alt="person.name"
      />
      <div class="flex flex-col justify-center items-center">
        <h5 class="font-bold text-xl mb-2">{{ person.name }}</h5>
      </div>
    </div>
  </div>
</template>
