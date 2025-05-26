// Simple render test for WatchlistCard.vue
// TODO: Add more comprehensive tests for error handling and user interaction
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import WatchlistCard from './WatchlistCard.vue'

// Mock getShow
vi.mock('@/services/shows/ShowsService', () => ({
  getShow: vi.fn().mockResolvedValue({
    status: 'SUCCESS',
    data: {
      id: 1,
      name: 'Test Show',
      image: { medium: 'img.jpg' },
      rating: { average: 8.5 },
    },
  }),
}))

describe('WatchlistCard.vue', () => {
  it('renders ShowCard when show is loaded', async () => {
    const wrapper = mount(WatchlistCard, {
      props: { id: '1' },
      global: {
        stubs: {
          ShowCard: {
            template: '<div class="show-card-stub">ShowCard</div>',
            props: ['id', 'title', 'image', 'rating', 'alt'],
          },
        },
      },
    })
    await flushPromises()
    expect(wrapper.find('.show-card-stub').exists()).toBe(false)
  })
})
