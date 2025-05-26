import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CastsLayout from '@/components/CastsLayout.vue'

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

const mockCasts = [
  {
    person: {
      id: 1,
      name: 'Actor One',
      image: { medium: 'actor1.jpg', original: 'actor1-orig.jpg' },
      birthday: '1970-01-01',
      country: { name: 'USA', code: 'US', timezone: 'America/New_York' },
    },
    character: {
      id: 10,
      name: 'Hero',
      image: { medium: 'char1.jpg', original: 'char1-orig.jpg' },
    },
  },
  {
    person: {
      id: 2,
      name: 'Actor Two',
      image: { medium: 'actor2.jpg', original: 'actor2-orig.jpg' },
      birthday: '1980-02-02',
      country: { name: 'UK', code: 'GB', timezone: 'Europe/London' },
    },
    character: {
      id: 20,
      name: 'Villain',
      image: { medium: 'char2.jpg', original: 'char2-orig.jpg' },
    },
  },
]

describe('CastsLayout.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(CastsLayout, {
      // @ts-expect-error TODO: create a full Mock
      props: { casts: mockCasts },
      global: {
        stubs: ['Carousel', 'Slide', 'Navigation'],
      },
    })
    expect(wrapper.text()).toContain('Casts')
  })

  it('renders a CastDetails component for each cast', () => {
    const wrapper = mount(CastsLayout, {
      // @ts-expect-error TODO: create a full Mock
      props: { casts: mockCasts },
      global: {
        stubs: ['Carousel', 'Slide', 'Navigation'],
      },
    })
    const castDetails = wrapper.findAllComponents({ name: 'CastDetails' })
    expect(castDetails.length).toBe(mockCasts.length)
  })

  it('passes the correct cast prop to CastDetails', () => {
    const wrapper = mount(CastsLayout, {
      // @ts-expect-error TODO: create a full Mock
      props: { casts: mockCasts },
      global: {
        stubs: ['Carousel', 'Slide', 'Navigation'],
      },
    })
    const castDetails = wrapper.findAllComponents({ name: 'CastDetails' })
    expect(castDetails[0].props('cast')).toEqual(mockCasts[0])
    expect(castDetails[1].props('cast')).toEqual(mockCasts[1])
  })
})
