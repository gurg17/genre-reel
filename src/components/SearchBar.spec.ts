import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

// Mock router
const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
}))

// Mock searchShows
vi.mock('@/services/search/SearchService', () => {
  const mockShows = [
    {
      show: {
        id: 1,
        name: 'Test Show',
        premiered: '2020-01-01',
        image: { medium: 'img.jpg' },
      },
    },
  ]
  return {
    searchShows: vi.fn().mockResolvedValue({ status: 'SUCCESS', data: mockShows }),
  }
})

// Mock constants
vi.mock('@/utils/constants', () => ({ SUCCESS: 'SUCCESS' }))

describe('SearchBar.vue', () => {
  it('renders ComboBox and passes items', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        stubs: {
          ComboBox: {
            template: '<div class="combo-box-stub" />',
            props: ['items', 'icon', 'modelValue'],
          },
          MagnifyingGlassIcon: true,
        },
      },
    })
    expect(wrapper.find('.combo-box-stub').exists()).toBe(true)
  })

  it('calls searchShows and updates items on query', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        stubs: {
          ComboBox: {
            template: '<div class="combo-box-stub" />',
            props: ['items', 'icon', 'modelValue'],
          },
          MagnifyingGlassIcon: true,
        },
      },
    })
    // Call handleQueryChange directly
    // @ts-expect-error: access setup
    await wrapper.vm.handleQueryChange('Test')
    // @ts-expect-error: access setup
    expect(wrapper.vm.showsItem[0].name).toContain('Test Show')
  })

  it('navigates to show on select', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        stubs: {
          ComboBox: {
            template: '<div class="combo-box-stub" />',
            props: ['items', 'icon', 'modelValue'],
          },
          MagnifyingGlassIcon: true,
        },
      },
    })
    // @ts-expect-error: access setup
    await wrapper.vm.handleSelect({ id: 42 })
    expect(push).toHaveBeenCalledWith({ name: 'show', params: { id: 42 } })
  })
})
