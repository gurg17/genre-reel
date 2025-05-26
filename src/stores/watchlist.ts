import type { Show } from '@/services/shows/types'
import { localStore } from '@/utils/localStore'
import { WATCHLIST_KEY } from '@/utils/constants'
import { defineStore } from 'pinia'

const loadWatchlist = (): Array<Show['id']> =>
  localStore.get<Array<Show['id']>>(WATCHLIST_KEY) || []

const saveWatchlist = (watchlist: Array<Show['id']>) => {
  localStore.set(WATCHLIST_KEY, watchlist)
}

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    watchlist: loadWatchlist(),
  }),
  actions: {
    addToWatchlist(showId: Show['id']) {
      if (!this.watchlist.includes(showId)) {
        this.watchlist = [...this.watchlist, showId]
        saveWatchlist(this.watchlist)
      }
    },
    removeFromWatchlist(showId: Show['id']) {
      this.watchlist = this.watchlist.filter((id) => id !== showId)
      saveWatchlist(this.watchlist)
    },
    loadWatchlistFromStorage() {
      this.watchlist = loadWatchlist()
    },
    isOnWatchlist(showId: Show['id']): boolean {
      return this.watchlist.includes(showId)
    },
    clearWatchlist() {
      this.watchlist = []
      saveWatchlist(this.watchlist)
    },
  },
})
