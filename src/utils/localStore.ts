export const localStore = {
  get<T = unknown>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch {
      return null
    }
  },

  set<T = unknown>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle quota exceeded or serialization errors silently
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // Handle errors silently
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch {
      // Handle errors silently
    }
  },
}
