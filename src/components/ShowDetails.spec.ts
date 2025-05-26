// Simple render test for ShowDetails.vue
// TODO: Add more comprehensive tests for user interaction and edge cases
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ShowDetails from './ShowDetails.vue'

// Mock getShow
vi.mock('@/services/shows/ShowsService', () => ({
  getShow: vi.fn().mockResolvedValue({
    status: 'SUCCESS',
    data: { id: 1, name: 'Test Show' },
  }),
}))

vi.mock('@/stores/watchlist', () => ({
  useWatchlistStore: () => ({
    isOnWatchlist: vi.fn().mockReturnValue(false),
    addToWatchlist: vi.fn(),
    removeFromWatchlist: vi.fn(),
  }),
}))

// TODO: Add more detailed assertions for ShowDetails rendering
describe('ShowDetails.vue', () => {
  it('renders without crashing', async () => {
    setActivePinia(createPinia())
    const wrapper = mount(ShowDetails, {
      props: { id: '1' },
      global: {
        stubs: {
          ImageComponent: true,
          RatingTag: true,
          LinkIcon: true,
          CastsLayout: true,
        },
      },
    })
    await flushPromises()
    expect(wrapper.exists()).toBe(true)
  })
})
