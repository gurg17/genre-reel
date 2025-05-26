import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EpisodeDetails from './EpisodeDetails.vue'
import type { EpisodeDetail } from '../services/shows/types'

describe('EpisodeDetails.vue', () => {
  it('renders without crashing', () => {
    const mockEpisode: EpisodeDetail = {
      id: 1,
      name: 'Pilot',
      number: 1,
      url: 'https://www.tvmaze.com/episodes/1',
      summary: '<p>The first episode summary.</p>',
      image: { original: 'https://example.com/ep1.jpg', medium: 'https://example.com/ep1-med.jpg' },
      rating: { average: 7.5 },
      airdate: new Date('2022-01-01'),
      runtime: 42,
      type: 'regular',
      season: 1,
      airtime: '20:00',
      airstamp: new Date('2022-01-01T20:00:00+00:00'),
      _links: {
        self: { href: 'https://www.tvmaze.com/episodes/1' },
        // @ts-expect-error TODO: create a full Mock
        show: { href: '', name: '' },
      },
    }
    // TODO: Add more detailed assertions for EpisodeDetails rendering
    mount(EpisodeDetails, {
      props: { episode: { ...mockEpisode } },
      global: {
        stubs: [
          'Disclosure',
          'DisclosureButton',
          'DisclosurePanel',
          'ChevronUpIcon',
          'ImageComponent',
          'RatingTag',
          'LinkIcon',
        ],
      },
    })
  })
})
