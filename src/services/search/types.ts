import type { Show } from '../shows/types'

export interface ShowSearch {
  score: number
  show: Show
}

export interface Links {
  self: Self
  previousepisode?: Previousepisode
}

export interface Previousepisode {
  href: string
  name: string
}

export interface Self {
  href: string
}

export interface Externals {
  tvrage: number | null
  thetvdb: number | null
  imdb: null | string
}

export interface Image {
  medium: string
  original: string
}

export interface Network {
  id: number
  name: string
  country: Country | null
  officialSite: null | string
}

export interface Country {
  name: string
  code: string
  timezone: string
}

export interface Rating {
  average: number | null
}

export interface Schedule {
  time: string
  days: string[]
}
