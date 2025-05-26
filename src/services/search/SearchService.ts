import { apiRequest, extractStatusAndData } from '@/utils/apiLayer'
import type { ShowSearch } from './types'

const apiUrl = import.meta.env.VITE_API_URL
const basePath = `${apiUrl}/search`

/**
 * Builds a TVMaze API query URL using the provided base path and search query.
 *
 * @param path - The base path or endpoint for the TVMaze API.
 * @param query - The search query string to be encoded and appended to the URL.
 * @returns The complete URL string for querying the TVMaze API with the given search term.
 */
export const buildTVMazeQueryUrl = (path: string, query: string): string => {
  return `${path}/?q=${encodeURIComponent(query)}`
}

/**
 * Searches for TV shows based on the provided query string.
 *
 * @param query - The search term used to query TV shows.
 * @returns A promise that resolves to the status and data containing an array of `Show` objects or an empty array.
 */
export const searchShows = async (query: string) => {
  const showsPath = `${basePath}/shows`
  return extractStatusAndData<ShowSearch[] | []>(
    apiRequest('get', buildTVMazeQueryUrl(showsPath, query)),
  )
}
