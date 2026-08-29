import type { Palette, MotifId } from '../lib/types'

/** The order the halls appear along the corridor. */
export const MOTIF_ORDER: MotifId[] = [
  'bayonet-halo', // Rem
  'horns-aurora', // Zero Two
  'time-crystal', // Kurisu Makise
  'explosion-crest', // Megumin
  'ribbon-spiral', // Marin Kitagawa
  'grain-field', // Holo
  'fan-moon', // Kaguya Shinomiya
  'blades-cross', // Asuna
  'ice-crystal', // Emilia
  'clock-hands', // Kurumi Tokisaki
  'sun-spark', // Taiga Aisaka
  'petal-bloom', // Sakura Yamauchi
  'violin-spring', // Kaori Miyazono
]

/** Procedural accent palettes — creative direction, not sourced facts. */
export const PALETTES: Record<MotifId, Palette> = {
  'bayonet-halo': { primary: '#5f7dff', glow: '#9fb3ff', accent: '#ffffff', secondary: '#bfd0ff' },
  'horns-aurora': { primary: '#ff5f8f', glow: '#ffb3d1', accent: '#ffd1dc', secondary: '#ff8fb2' },
  'time-crystal': { primary: '#2fd6c8', glow: '#8ff0e8', accent: '#eafffb', secondary: '#5fe0d6' },
  'explosion-crest': { primary: '#ff3b5c', glow: '#ffb199', accent: '#ffd166', secondary: '#ff7ba9' },
  'ribbon-spiral': { primary: '#ffa3c4', glow: '#ffd6e6', accent: '#a4c8ff', secondary: '#ffe0ec' },
  'grain-field': { primary: '#ffb84d', glow: '#ffd98f', accent: '#fff3d6', secondary: '#e8923a' },
  'fan-moon': { primary: '#a78bfa', glow: '#d6c6ff', accent: '#ffffff', secondary: '#8b6ff0' },
  'blades-cross': { primary: '#ffffff', glow: '#cfe0ff', accent: '#7da2ff', secondary: '#eaf2ff' },
  'ice-crystal': { primary: '#9fd8ff', glow: '#e1f4ff', accent: '#ffffff', secondary: '#6db9ff' },
  'clock-hands': { primary: '#8d1f35', glow: '#ffb3a3', accent: '#ffd166', secondary: '#c9a227' },
  'sun-spark': { primary: '#ffb340', glow: '#ffd98f', accent: '#fff2cc', secondary: '#ff8a5c' },
  'petal-bloom': { primary: '#ff8fa3', glow: '#ffd9e0', accent: '#ff5c9d', secondary: '#ffc4ce' },
  'violin-spring': { primary: '#7fb5ff', glow: '#d3e6ff', accent: '#ffffff', secondary: '#a8d0ff' },
}