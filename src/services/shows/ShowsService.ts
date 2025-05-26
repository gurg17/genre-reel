import { apiRequest, extractStatusAndData } from '@/utils/apiLayer'
import type { Show } from './types'

const apiUrl = import.meta.env.VITE_API_URL
const basePath = `${apiUrl}/shows`

export const buildTVMazeEmbedCastUrl = (path: string, query: string): string => {
  return `${path}?embed=${encodeURIComponent(query)}`
}

/**
 * Searches for TV shows.
 *
 * @returns A promise that resolves to the status and data containing an array of `Show` objects or an empty array.
 */
export const getShows = async () => {
  return extractStatusAndData<Show[] | []>(apiRequest('get', basePath))
}

/**
 * Retrieves a single TV show by its unique identifier.
 *
 * @param showId - The unique identifier of the show to retrieve.
 * @returns A promise that resolves to the status and data containing the `Show` object if found, or `undefined` if not found.
 */
export const getShow = async (showId: Show['id']) => {
  const showPath = `${basePath}/${showId}`
  return extractStatusAndData<Show | undefined>(
    apiRequest('get', buildTVMazeEmbedCastUrl(showPath, 'cast')),
  )
}
export const getShowEpisodes = async (showId: Show['id']) => {
  const showPath = `${basePath}/${showId}/episodes`
  return extractStatusAndData<Show | undefined>(apiRequest('get', showPath))
}
