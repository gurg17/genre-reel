import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

const push = vi.fn()
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))

import ShowCard from './ShowCard.vue'

describe('ShowCard.vue', () => {
  it('renders image, title, and rating', () => {
    const wrapper = mount(ShowCard, {
      props: {
        id: 1,
        image: 'img.jpg',
        alt: 'Alt text',
        title: 'Test Show',
        rating: 8.5,
      },
      global: {
        stubs: {
          ImageComponent: {
            template: '<img class="image-stub" />',
            props: ['src', 'alt'],
          },
          RatingTag: {
            template: '<span class="rating-tag-stub">8.5</span>',
            props: ['rating'],
          },
        },
      },
    })
    expect(wrapper.find('.image-stub').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Show')
    expect(wrapper.find('.rating-tag-stub').exists()).toBe(true)
  })

  it('navigates to show page on click', async () => {
    const wrapper = mount(ShowCard, {
      props: {
        id: 42,
        image: 'img.jpg',
        title: 'Test Show',
      },
      global: {
        stubs: {
          ImageComponent: true,
          RatingTag: true,
        },
      },
    })
    await wrapper.trigger('click')
    expect(push).toHaveBeenCalledWith({ name: 'show', params: { id: 42 } })
  })
})
