import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RatingTag from './RatingTag.vue'

describe('RatingTag.vue', () => {
  it('renders the rating value and correct color for high rating', () => {
    const wrapper = mount(RatingTag, { props: { rating: 8.5 } })
    expect(wrapper.text()).toBe('8.5')
    expect(wrapper.classes()).toContain('bg-green-200')
  })

  it('renders the rating value and correct color for medium rating', () => {
    const wrapper = mount(RatingTag, { props: { rating: 6.5 } })
    expect(wrapper.text()).toBe('6.5')
    expect(wrapper.classes()).toContain('bg-yellow-200')
  })

  it('renders the rating value and correct color for low rating', () => {
    const wrapper = mount(RatingTag, { props: { rating: 3.5 } })
    expect(wrapper.text()).toBe('3.5')
    expect(wrapper.classes()).toContain('bg-red-200')
  })

  it('renders dash and gray color for null/invalid rating', () => {
    const wrapper = mount(RatingTag, { props: { rating: undefined } })
    expect(wrapper.text()).toBe('0')

    const wrapper2 = mount(RatingTag, { props: { rating: 'not-a-number' } })
    expect(wrapper2.text()).toBe('-')
    expect(wrapper2.classes()).toContain('bg-gray-200')
  })
})
