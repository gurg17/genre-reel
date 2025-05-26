import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CastDetails from '@/components/CastDetails.vue'

// Mock props for CastDetails

const mockCast = {
  person: {
    id: 1,
    name: 'John Doe',
    image: {
      medium: 'https://example.com/medium.jpg',
      original: 'https://example.com/original.jpg',
    },

    birthday: '1980-01-01',
    country: { name: 'USA', code: 'US', timezone: 'America/New_York' },
  },
  character: {
    id: 2,
    name: 'Detective',
    image: {
      medium: 'https://example.com/char-medium.jpg',
      original: 'https://example.com/char-original.jpg',
    },
  },
}

describe('CastDetails.vue', () => {
  it('renders cast person and character names', () => {
    const wrapper = mount(CastDetails, {
      // @ts-expect-error TODO: create a full Mock
      props: { cast: mockCast },
    })
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Detective')
  })

  it('renders person image if available', () => {
    const wrapper = mount(CastDetails, {
      // @ts-expect-error TODO: create a full Mock
      props: { cast: mockCast },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/char-original.jpg')
  })
})
