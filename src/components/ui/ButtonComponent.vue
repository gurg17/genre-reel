<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const baseClasses =
  'inline-flex items-center px-4 py-2 rounded font-medium focus:outline-none transition-colors duration-150 bg-yellow-300 hover:bg-yellow-400 disabled:bg-yellow-200'

const computedClasses = computed(() => {
  return `${baseClasses} ${props.disabled ? 'cursor-not-allowed' : ''}`
})
</script>
<template>
  <button
    :type="type"
    :class="computedClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
