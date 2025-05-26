<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'default', // e.g., 'default', 'success', 'warning', 'error'
  },
})

const tagClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-200'
    case 'warning':
      return 'bg-yellow-200'
    case 'error':
      return 'bg-red-200'
    default:
      return 'bg-gray-200'
  }
})
</script>

<template>
  <span
    :class="[
      'inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
      tagClass,
    ]"
  >
    <slot>{{ label }}</slot>
  </span>
</template>
