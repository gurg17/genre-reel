import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { CacheStore } from './cacheStore'
import { TTL_MS } from './constants'

const cache = new CacheStore<string, unknown>()

/**
 * Generates a unique cache key based on the provided URL and optional query parameters.
 *
 * @param url - The base URL for the request.
 * @param params - Optional query parameters to include in the cache key. Each parameter value can be a string, number, boolean, or undefined.
 * @returns A string representing the generated cache key, which uniquely identifies the combination of URL and parameters.
 *
 * @remarks
 * - If no parameters are provided, the cache key is generated using only the URL.
 * - Parameters with `undefined` values are omitted from the cache key.
 * - The parameters are serialized into a query string and appended to the URL before generating the cache key.
 */
const getCacheKey = (
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
) => {
  if (!params) return CacheStore.createCacheKey(url)
  const searchParams = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
      if (value !== undefined) acc[key] = String(value)
      return acc
    }, {}),
  ).toString()
  return CacheStore.createCacheKey(`${url}?${searchParams}`)
}

/**
 * Makes an HTTP request using Axios with optional caching for POST requests.
 *
 * @template T - The expected response data type.
 * @param method - The HTTP method to use ('get', 'post', 'put', 'patch', or 'delete').
 * @param url - The endpoint URL for the request.
 * @param data - Optional data to send with the request (for POST, PUT, PATCH).
 * @param config - Optional Axios request configuration.
 * @param cacheTtlMs - Optional cache time-to-live in milliseconds for POST requests.
 * @returns A promise that resolves to an AxiosResponse containing the response data of type T.
 *
 * @remarks
 * - For POST requests, the response is cached based on the URL and params. If a cached response exists, it is returned instead of making a network request.
 * - For other HTTP methods, the cache is cleared for the given key before making the request.
 */
export const apiRequest = async <T = unknown>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  cacheTtlMs?: number,
): Promise<AxiosResponse<T>> => {
  const key = getCacheKey(url, config?.params)

  if (method === 'get') {
    const cached = cache.get(key)
    if (cached) {
      return {
        ...cached,
        config,
        status: 200,
        statusText: 'OK',
        headers: {},
        data: cached,
      } as AxiosResponse<T>
    }
    const response = await axios.get<T>(url, config)
    if (response.status === 200) {
      cache.set(key, response.data, cacheTtlMs ?? TTL_MS)
    }
    return response
  } else {
    cache.delete(key)
    const response = await axios.request<T>({ method, url, data, ...config })
    return response
  }
}

/**
 * Awaits an Axios response promise and returns an object containing only the status and data.
 *
 * @typeParam T - The expected response data type.
 * @param responsePromise - A promise resolving to an AxiosResponse.
 * @returns A promise resolving to an object with status and data.
 */
export const extractStatusAndData = async <T>(
  responsePromise: Promise<AxiosResponse<T>>,
): Promise<{ status: number; data: T }> => {
  const response = await responsePromise
  return { status: response.status, data: response.data as T }
}
