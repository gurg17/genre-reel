<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot,
} from '@headlessui/vue'
import ImageComponent from '@/components/ui/ImageComponent.vue'
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import { debounce } from '@/utils/helper'

export type ComboBoxItem = { id: number | string; name: string; image?: string }
type Props = {
  items: Array<ComboBoxItem>
  icon?: Component
  modelValue?: ComboBoxItem
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'select', 'query'])
const selected = ref(props.modelValue)
const query = ref('')

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) selected.value = val
  },
)

const emitDebouncedQuery = debounce((val: string) => {
  emit('query', val)
}, 500)

watch(query, (val) => {
  emitDebouncedQuery(val)
})

watch(selected, (val) => {
  emit('update:modelValue', val)
  emit('select', val)
})

const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, '')),
      ),
)
</script>

<template>
  <Combobox v-model="selected">
    <div class="relative mt-1 w-full">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
        <ComboboxInput
          class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          :displayValue="(item) => item?.name ?? ''"
          @change="query = $event.target.value"
          :placeholder="placeholder || 'Search...'"
          autocomplete="false"
        />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <component :is="icon" class="h-5 w-5 text-gray-400" aria-hidden="true" v-if="icon" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50"
        >
          <div
            v-if="(filteredItems.length === 0 && query !== '') || items.length === 0"
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            Nothing found.
          </div>
          <ComboboxOption
            v-for="item in filteredItems"
            as="template"
            :key="item.id"
            :value="item"
            v-slot="{ selected, active }"
            class="max-h-24 overflow-auto"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4 flex items-center"
              :class="{
                'bg-teal-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <ImageComponent :src="item.image" :alt="item.name" class="h-20 w-20 object-contain" />
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ item.name }}
              </span>
              <span
                v-if="selected && !item.image"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
                <slot name="selected-icon">
                  <!-- Default check icon if slot not provided -->
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </slot>
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>
