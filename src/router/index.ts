import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ShowView from '@/views/ShowView.vue'
import MyWatchListView from '@/views/MyWatchListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export const routes = {
  dashboard: {
    path: '/',
    name: 'dashboard',
    displayName: 'Dashboard',
  },
  watchList: {
    path: '/my-watch-list',
    name: 'my-watch-list',
    displayName: 'My Watchlist',
  },
  show: { path: '/show/:id', name: 'show', displayName: 'Show' },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.dashboard.path,
      name: routes.dashboard.name,
      component: DashboardView,
    },
    {
      path: routes.watchList.path,
      name: routes.watchList.name,
      component: MyWatchListView,
    },
    {
      path: routes.show.path,
      name: routes.show.name,
      component: ShowView,
    },

    { path: '/:catchAll(.*)', name: 'not-found', component: NotFoundView },
  ],
})

export default router
