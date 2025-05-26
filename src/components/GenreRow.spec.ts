import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GenreRow from './GenreRow.vue'

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
// Minimal mock for Show type

const defaultShow = {
  id: 1,
  url: '',
  name: 'Test Show',
  type: 'Scripted',
  language: 'English',
  genres: [],
  status: 'Running',
  runtime: 60,
  averageRuntime: 60,
  premiered: new Date('2020-01-01'),
  ended: null,
  officialSite: null,
  schedule: { time: '', days: [] },
  rating: { average: 8.5 },
  weight: 1,
  network: null,
  webChannel: null,
  dvdCountry: null,
  externals: { tvrage: null, thetvdb: null, imdb: null },
  image: { medium: 'https://example.com/medium.jpg', original: 'https://example.com/original.jpg' },
  summary: 'A test show.',
  updated: 0,
  _embedded: { cast: [] },
  _links: { self: { href: '' }, previousepisode: { href: '', name: '' } },
}

describe('GenreRow.vue', () => {
  it('renders the title and a list of shows', () => {
    const wrapper = mount(GenreRow, {
      props: {
        title: 'Test Genre',
        // @ts-expect-error TODO: create a full Mock
        genreList: [defaultShow],
      },
      global: {
        stubs: {
          Carousel: true,
          Slide: true,
          Navigation: true,
          ShowCard: {
            template: '<div class="show-card-stub">ShowCard</div>',
            props: ['id', 'title', 'image', 'rating', 'alt'],
          },
        },
      },
    })
    expect(wrapper.text()).toContain('Test Genre')
    expect(wrapper.findAll('.show-card-stub').length).toBe(1)
  })
})
