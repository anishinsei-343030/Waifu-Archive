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
  | 'petal-bloom'
  | 'violin-spring'
  | 'byakugan-petal'
  | 'thorn-rose'
  | 'scarf-wind'
  | 'devil-bloom'
  | 'jewel-sigil'
  | 'curiosity-curl'
  | 'staple-pin'
  | 'piano-heart'
  | 'earbud-serenade'
  | 'bamboo-flame'
  | 'raccoon-blade'
  | 'bunny-ear'
  | 'doll-quill'
  | 'railgun-coin'
  | 'bat-glint'
  | 'devil-sigil'
  | 'mermaid-blade'
  | 'pink-bow'
  | 'future-diary'
  | 'blood-hammer'
  | 'heart-stitch'
  | 'star-twinkle'
  | 'butterfly-venom'
  | 'love-petal'
  | 'ice-blade'
  | 'musket-ribbon'

export interface Waifu {
  id: string
  name: string
  series: string
  studio: string
  debut: string
  va: string
  tagline: string
  bio: string[]
  whyLoved: string[]
  quoteEn: string
  traits: Trait[]
  palette: KurumiPalette
  motif: MotifId
  order: number
  sources: string[]
  /** Canon birthday. Day and month usually known; year only when sources agree. */
  birth?: { month: number; day?: number; year?: number }
  /** For heroines who died in-canon: when they left and how. */
  deceased?: { at: string; cause: string }
  /** For heroines whose fate is canonically ambiguous or split across continuities. */
  uncertain?: { detail: string }
  /** Portrait asset path under /public, e.g. /portraits/rem.jpg. Optional. */
  image?: string
}

export interface SceneStop {
  fraction: number
  name: string
  x: number
  y: number
  z: number
}