export interface Show {
  id: number
  url: string
  name: string
  type: Type
  language: Language
  genres: Genre[]
  status: Status
  runtime: number | null
  averageRuntime: number
  premiered: Date
  ended: Date | null
  officialSite: null | string
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: Network | null
  dvdCountry: Country | null
  externals: Externals
  image: Image
  summary: string
  updated: number
  _embedded: Embedded
  _links: Links
}

export interface Links {
  self: Self
  previousepisode: Episode
  nextepisode?: Episode
}

export interface Episode {
  href: string
  name: string
}

export interface Self {
  href: string
}

export interface Country {
  name: Name
  code: Code
  timezone: Timezone
}

export enum Code {
  CA = 'CA',
  De = 'DE',
  Fr = 'FR',
  GB = 'GB',
  Jp = 'JP',
  Us = 'US',
}

export enum Name {
  Canada = 'Canada',
  France = 'France',
  Germany = 'Germany',
  Japan = 'Japan',
  UnitedKingdom = 'United Kingdom',
  UnitedStates = 'United States',
}

export enum Timezone {
  AmericaNewYork = 'America/New_York',
  AmericaToronto = 'America/Toronto',
  AsiaTokyo = 'Asia/Tokyo',
  EuropeBusingen = 'Europe/Busingen',
  EuropeLondon = 'Europe/London',
  EuropeParis = 'Europe/Paris',
}

export interface Externals {
  tvrage: number
  thetvdb: number | null
  imdb: null | string
}

export enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Anime = 'Anime',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Drama = 'Drama',
  Espionage = 'Espionage',
  Family = 'Family',
  Fantasy = 'Fantasy',
  History = 'History',
  Horror = 'Horror',
  Legal = 'Legal',
  Medical = 'Medical',
  Music = 'Music',
  Mystery = 'Mystery',
  Romance = 'Romance',
  ScienceFiction = 'Science-Fiction',
  Sports = 'Sports',
  Supernatural = 'Supernatural',
  Thriller = 'Thriller',
  War = 'War',
  Western = 'Western',
}

export interface Image {
  medium: string
  original: string
}

export enum Language {
  English = 'English',
  Japanese = 'Japanese',
}

export interface Network {
  id: number
  name: string
  country: Country | null
  officialSite: null | string
}

export interface Rating {
  average: number | null
}

export interface Schedule {
  time: Time
  days: Day[]
}

export interface Embedded {
  cast: Cast[]
}

export interface Cast {
  person: Person
  character: Character
  self: boolean
  voice: boolean
}

export interface Character {
  id: number
  url: string
  name: string
  image: Image | null
  _links: Links
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface Image {
  medium: string
  original: string
}

export interface Person {
  id: number
  url: string
  name: string
  country: Country
  birthday: Date
  deathday: Date | null
  gender: string
  image: Image
  updated: number
  _links: Links
}

export interface Country {
  name: Name
  code: Code
  timezone: Timezone
}

export enum Day {
  Friday = 'Friday',
  Monday = 'Monday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Thursday = 'Thursday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
}

export enum Time {
  Empty = '',
  The0900 = '09:00',
  The1200 = '12:00',
  The1300 = '13:00',
  The2000 = '20:00',
  The2030 = '20:30',
  The2100 = '21:00',
  The2130 = '21:30',
  The2200 = '22:00',
  The2230 = '22:30',
  The2300 = '23:00',
  The2330 = '23:30',
}

export enum Status {
  Ended = 'Ended',
  Running = 'Running',
  ToBeDetermined = 'To Be Determined',
}

export enum Type {
  Animation = 'Animation',
  Documentary = 'Documentary',
  Reality = 'Reality',
  Scripted = 'Scripted',
  TalkShow = 'Talk Show',
}

export interface EpisodeDetail {
  id: number
  url: string
  name: string
  season: number
  number: number
  type: string
  airdate: Date
  airtime: string
  airstamp: Date
  runtime: number
  rating: Rating
  image: Image
  summary: string
  _links: Links
}

export interface Links {
  self: Self
  show: Show
}

export interface Self {
  href: string
}

export interface Show {
  href: string
  name: string
}

export interface Image {
  medium: string
  original: string
}

export interface Rating {
  average: number | null
}
