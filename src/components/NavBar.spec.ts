import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from './NavBar.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('NavBar.vue', () => {
  it('renders logo, title, and navigation links', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
        stubs: {
          Disclosure: {
            template: '<div><slot :open="false" /><slot name="panel" /></div>',
          },
          DisclosureButton: true,
          DisclosurePanel: true,
          Bars3Icon: true,
          XMarkIcon: true,
          SearchBar: {
            template: '<div class="search-bar-stub">SearchBar</div>',
          },
        },
      },
    })
    await router.isReady()
    // Logo
    expect(wrapper.find('img[alt="Your Company"]').exists()).toBe(true)
    // Title
    expect(wrapper.text()).toContain('GenreReel')
    // Navigation links
    expect(wrapper.findAll('a').length).toBeGreaterThan(0)
    // SearchBar stub
    expect(wrapper.find('.search-bar-stub').exists()).toBe(true)
  })
})
