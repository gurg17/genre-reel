<template>
  <img
    :src="src ?? logo"
    :alt="alt"
    :width="width"
    :height="height"
    :class="imgClass"
    @error="onError"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import logo from '@/assets/logo.png'

const props = defineProps({
  src: {
    type: String,
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  imgClass: {
    type: [String, Object, Array],
    default: '',
  },
  fallback: {
    type: String,
    default: '',
  },
})

const src = ref(props.src)

function onError() {
  if (props.fallback) {
    src.value = props.fallback
  }
}
</script>
