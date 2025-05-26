type CacheEntry<T> = {
  value: T
  expiresAt?: number
}

/**
 * A generic in-memory cache store with optional time-to-live (TTL) support for each entry.
 *
 * @typeParam K - The type of the cache key.
 * @typeParam V - The type of the cache value.
 *
 * @example
 * ```ts
 * const cache = new CacheStore<string, number>();
 * cache.set('foo', 42, 1000); // Store value 42 with a TTL of 1 second
 * const value = cache.get('foo'); // 42
 * ```
 */
export class CacheStore<K, V> {
  private store = new Map<K, CacheEntry<V>>()

  static createCacheKey(url: string): string {
    try {
      const parsedUrl = new URL(url)
      const path = parsedUrl.pathname
      const params = Array.from(parsedUrl.searchParams.entries())
      if (params.length === 0) {
        return path
      }
      params.sort(([a], [b]) => a.localeCompare(b))
      const queryString = params
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
      return `${path}?${queryString}`
    } catch {
      return url
    }
  }

  set(key: K, value: V, ttlMs?: number) {
    const expiresAt = ttlMs ? Date.now() + ttlMs : undefined
    this.store.set(key, { value, expiresAt })
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.store.delete(key)
      return undefined
    }
    return entry.value
  }

  has(key: K): boolean {
    return this.get(key) !== undefined
  }

  delete(key: K): boolean {
    return this.store.delete(key)
  }

  clear() {
    this.store.clear()
  }
}
