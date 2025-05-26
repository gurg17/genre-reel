// Simple render test for ShowEpisodes.vue
// TODO: Add more comprehensive tests for user interaction and edge cases
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ShowEpisodes from './ShowEpisodes.vue'

// Mock getShowEpisodes
vi.mock('@/services/shows/ShowsService', () => ({
  getShowEpisodes: vi.fn().mockResolvedValue({
    status: 'SUCCESS',
    data: [
      { id: 1, season: 1, name: 'Ep1' },
      { id: 2, season: 1, name: 'Ep2' },
      { id: 3, season: 2, name: 'Ep3' },
    ],
  }),
}))

describe('ShowEpisodes.vue', () => {
  it('renders without crashing', async () => {
    const wrapper = mount(ShowEpisodes, {
      props: { id: '1' },
      global: {
        stubs: {
          EpisodeDetails: true,
          Disclosure: true,
          DisclosureButton: true,
          DisclosurePanel: true,
          ChevronUpIcon: true,
        },
      },
    })
    await flushPromises()
    expect(wrapper.exists()).toBe(true)
    // Optionally check for season headers
    expect(wrapper.text()).toContain('Seasons & Episodes')
  })
})
