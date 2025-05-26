<script setup lang="ts">
import ComboBox from '@/components/ui/ComboBox.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { searchShows } from '@/services/search/SearchService'
import { SUCCESS } from '@/utils/constants'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const selectedItem = ref(null)
const showsItem = ref<ComboBoxItem>([])

const router = useRouter()

const handleSelect = (item) => {
  router.push({
    name: 'show',
    params: { id: item.id },
  })
}

const handleQueryChange = async (query) => {
  const showsResponse = await searchShows(query)

  if (showsResponse.status === SUCCESS) {
    showsItem.value = showsResponse.data.map(({ show }): ComboBoxItem => {
      const premiered = show.premiered ? show.premiered.split('-')[0] : 'Unknown'
      const image = show.image ? show.image.medium : null
      return {
        id: show.id,
        name: `${show.name} (${premiered})`,
        image: image,
      }
    })
  } else {
    console.error('Search for shows failed')
  }
}
</script>

<template>
  <ComboBox
    :items="showsItem"
    :icon="MagnifyingGlassIcon"
    v-model="selectedItem"
    @query="handleQueryChange"
    @select="handleSelect"
    class="w-full sm:w-64 md:w-72 lg:w-96"
  />
</template>
