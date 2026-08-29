export interface KurumiPalette {
  primary: string
  glow: string
  accent: string
  secondary: string
}

export type Palette = KurumiPalette

export interface Trait {
  label: string
  value: number
}

export type MotifId =
  | 'bayonet-halo'
  | 'horns-aurora'
  | 'time-crystal'
  | 'explosion-crest'
  | 'ribbon-spiral'
  | 'grain-field'
  | 'fan-moon'
  | 'blades-cross'
  | 'ice-crystal'
  | 'clock-hands'
  | 'sun-spark'
  | 'scarf-wind'

export interface Waifu {
  id: string
  name: string
  jpName: string
  romanji: string
  series: string
  studio: string
  debut: string
  va: string
  tagline: string
  bio: string[]
  whyLoved: string[]
  quoteEn: string
  quoteJp: string
  traits: Trait[]
  palette: KurumiPalette
  motif: MotifId
  order: number
  sources: string[]
}

export interface SceneStop {
  fraction: number
  name: string
  x: number
  y: number
  z: number
}