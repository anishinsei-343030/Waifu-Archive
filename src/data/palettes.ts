import type { Palette, MotifId } from '../lib/types'

/** The order the halls appear along the corridor. */
export const MOTIF_ORDER: MotifId[] = [
  'bayonet-halo', // Rem
  'time-crystal', // Kurisu Makise
  'explosion-crest', // Megumin
  'ribbon-spiral', // Marin Kitagawa
  'grain-field', // Holo
  'fan-moon', // Kaguya Shinomiya
  'blades-cross', // Asuna
  'ice-crystal', // Emilia
  'clock-hands', // Kurumi Tokisaki
  'sun-spark', // Taiga Aisaka
  'byakugan-petal', // Hinata Hyuga
  'thorn-rose', // Yor Forger
  'scarf-wind', // Mikasa Ackerman
  'devil-bloom', // Nico Robin
  'jewel-sigil', // Rin Tohsaka
  'curiosity-curl', // Chitanda Eru
  'staple-pin', // Hitagi Senjougahara
  'piano-heart', // Chika Fujiwara
  'earbud-serenade', // Miku Nakano
  'bamboo-flame', // Nezuko Kamado
  'raccoon-blade', // Raphtalia
  'bunny-ear', // Mai Sakurajima
  'doll-quill', // Violet Evergarden
  'railgun-coin', // Mikoto Misaka
  'bat-glint', // Shinobu Oshino
  'devil-sigil', // Rias Gremory
  'fragrant-bloom', // Kaoruko Waguri
  'lantern-fire', // Koharu Fuyutsuki
  'snack-moon', // Anna Yamada
  'iron-staff', // Fern
  'herb-veil', // Maomao
  'snow-lily', // Alya
  'net-arc', // Chinatsu Kano
  'camellia-veil', // Miyo Saimori
  'sign-wave', // Yuki Itose
  'lemon-burst', // Lemon Yakishio
  'angel-star', // Mahiru Shiina
  'spirit-flare', // Momo Ayase
  'star-dome', // Isaki Magari
  'bunny-blush', // Chika Komari
  'forge-spark', // Dahlia Rossetti
  'brush-stroke', // Yae Amagami
  'lycoris-petal', // Chisato Nishikigi
  'moon-witch', // Tinasha
  'grimoire-leaf', // Frieren
  'azure-wand', // Roxy Migurdia
  'aura-crown', // Aira Shiratori
  'ribbon-twin', // Nino Nakano
  'veneer-star', // Kei Karuizawa
  'twotone-smile', // Yamada
  'horns-aurora', // Zero Two
  'mermaid-blade', // Sayaka Miki
  'pink-bow', // Madoka Kaname
  'future-diary', // Yuno Gasai
  'blood-hammer', // Power
  'heart-stitch', // Shoko Makinohara
  'petal-bloom', // Sakura Yamauchi
  'violin-spring', // Kaori Miyazono
  'star-twinkle', // Ai Hoshino
  'butterfly-venom', // Shinobu Kocho
  'love-petal', // Mitsuri Kanroji
  'ice-blade', // Esdeath
  'musket-ribbon', // Mami Tomoe
  'hourglass-lights', // Isla
  'bow-wind', // Sasha Braus
  'firefly-spirit', // Menma Honma
  'mask-shift', // Chelsea
  'void-crystal', // Inori Yuzuriha
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
  'byakugan-petal': { primary: '#5d7ce0', glow: '#b7c6ff', accent: '#ffffff', secondary: '#8fa6f5' },
  'thorn-rose': { primary: '#c24d6b', glow: '#ffc2d2', accent: '#ffffff', secondary: '#e08ca3' },
  'scarf-wind': { primary: '#b84a40', glow: '#ffc0a8', accent: '#ffffff', secondary: '#d98a76' },
  'devil-bloom': { primary: '#8a5aa8', glow: '#d2b3e8', accent: '#ffffff', secondary: '#a97ec9' },
  'jewel-sigil': { primary: '#d94b4b', glow: '#ffb3b3', accent: '#ffffff', secondary: '#e88080' },
  'curiosity-curl': { primary: '#3f8f7c', glow: '#b8e6d8', accent: '#ffffff', secondary: '#6fb8a6' },
  'staple-pin': { primary: '#b04a6f', glow: '#ffb8ce', accent: '#ffffff', secondary: '#d78aa4' },
  'piano-heart': { primary: '#f26f9c', glow: '#ffc7da', accent: '#ffffff', secondary: '#ffa6c2' },
  'earbud-serenade': { primary: '#3f7fd0', glow: '#a8ccf0', accent: '#ffffff', secondary: '#71a3dc' },
  'bamboo-flame': { primary: '#f28c5c', glow: '#ffe0c0', accent: '#ffffff', secondary: '#ffbd8e' },
  'raccoon-blade': { primary: '#e0714f', glow: '#ffd2bd', accent: '#ffffff', secondary: '#f09b7f' },
  'bunny-ear': { primary: '#4d9de0', glow: '#bde3ff', accent: '#ffffff', secondary: '#7fc0f2' },
  'doll-quill': { primary: '#3f8a6d', glow: '#bfe8d6', accent: '#ffffff', secondary: '#6fae90' },
  'railgun-coin': { primary: '#f0a63d', glow: '#ffe6b8', accent: '#ffffff', secondary: '#ffc46f' },
  'bat-glint': { primary: '#d9a441', glow: '#ffe8b0', accent: '#ffffff', secondary: '#c08a2f' },
  'devil-sigil': { primary: '#c12638', glow: '#ffa3ad', accent: '#ffffff', secondary: '#dd6673' },
  'fragrant-bloom': { primary: '#f48fb1', glow: '#ffd9e0', accent: '#ffffff', secondary: '#f9b3c8' },
  'lantern-fire': { primary: '#26387d', glow: '#ffb066', accent: '#ffffff', secondary: '#7f93d9' },
  'snack-moon': { primary: '#e8a04c', glow: '#ffe3b3', accent: '#ffffff', secondary: '#f7c479' },
  'iron-staff': { primary: '#2c3948', glow: '#aec3e0', accent: '#ffffff', secondary: '#5e718f' },
  'herb-veil': { primary: '#3f9d6e', glow: '#b4e3c6', accent: '#ffffff', secondary: '#66bd8f' },
  'snow-lily': { primary: '#cfd6f0', glow: '#eef1ff', accent: '#8fa3e0', secondary: '#aab6e8' },
  'net-arc': { primary: '#3d8dd6', glow: '#a8dcff', accent: '#ff8c42', secondary: '#6fb0e8' },
  'camellia-veil': { primary: '#c98cb0', glow: '#f4d3e3', accent: '#ffffff', secondary: '#b06a99' },
  'sign-wave': { primary: '#5cc9c2', glow: '#bdece8', accent: '#ffffff', secondary: '#86d9d3' },
  'lemon-burst': { primary: '#f2c94c', glow: '#ffe9a8', accent: '#66bb6a', secondary: '#e1b63a' },
  'angel-star': { primary: '#f5f2e9', glow: '#ffffff', accent: '#f2b063', secondary: '#eadfc9' },
  'spirit-flare': { primary: '#ff7a3d', glow: '#ffc9a8', accent: '#8f6be8', secondary: '#ff9f73' },
  'star-dome': { primary: '#2b4a7a', glow: '#8fb3e8', accent: '#ffd166', secondary: '#5977a8' },
  'bunny-blush': { primary: '#f28fb0', glow: '#ffd3e3', accent: '#ffffff', secondary: '#f7a9c4' },
  'forge-spark': { primary: '#c96f3d', glow: '#ffc9a0', accent: '#ffd166', secondary: '#df9663' },
  'brush-stroke': { primary: '#c1433f', glow: '#ffb0a3', accent: '#ffffff', secondary: '#d96f63' },
  'lycoris-petal': { primary: '#d14b4b', glow: '#ffb3a3', accent: '#ffffff', secondary: '#e07a63' },
  'moon-witch': { primary: '#7f8fd0', glow: '#ccd6f7', accent: '#ffffff', secondary: '#9ca9de' },
  'grimoire-leaf': { primary: '#6fae8f', glow: '#c6e8d3', accent: '#2c3948', secondary: '#8fc7ab' },
  'azure-wand': { primary: '#5b9fe0', glow: '#b4d8f7', accent: '#ffffff', secondary: '#7fb8ee' },
  'aura-crown': { primary: '#e8b04c', glow: '#ffd98f', accent: '#ffffff', secondary: '#b08a2f' },
  'ribbon-twin': { primary: '#c0304e', glow: '#ff9fb0', accent: '#ffffff', secondary: '#d65f77' },
  'veneer-star': { primary: '#b89fc0', glow: '#e6d6ea', accent: '#ffffff', secondary: '#8f6fa0' },
  'twotone-smile': { primary: '#5b8fd0', glow: '#b8d6f2', accent: '#ffcb6e', secondary: '#7fa8de' },
  'mermaid-blade': { primary: '#3f8ad0', glow: '#bfe0ff', accent: '#ffffff', secondary: '#6fb0e8' },
  'pink-bow': { primary: '#ff7f9e', glow: '#ffd3de', accent: '#ffffff', secondary: '#ffa3b8' },
  'future-diary': { primary: '#e84a7b', glow: '#ffc0d6', accent: '#ffffff', secondary: '#f07fa0' },
  'blood-hammer': { primary: '#dd4e3f', glow: '#ffb8a8', accent: '#ffffff', secondary: '#e88e7b' },
  'heart-stitch': { primary: '#77c2dd', glow: '#d8f0fa', accent: '#ffffff', secondary: '#a3d8ec' },
  'star-twinkle': { primary: '#8f9ff5', glow: '#dfe4ff', accent: '#ffffff', secondary: '#b8c4ff' },
  'butterfly-venom': { primary: '#a78fe0', glow: '#e2d8ff', accent: '#ffffff', secondary: '#c3b8f2' },
  'love-petal': { primary: '#f28ca8', glow: '#ffd3de', accent: '#ffffff', secondary: '#ffb3c4' },
  'ice-blade': { primary: '#4fb6e0', glow: '#d0f0ff', accent: '#ffffff', secondary: '#9fe0f5' },
  'musket-ribbon': { primary: '#eab952', glow: '#fff0c0', accent: '#ffffff', secondary: '#d9b04a' },
  'hourglass-lights': { primary: '#ff6b8a', glow: '#ffc4d2', accent: '#ffffff', secondary: '#ffa0b8' },
  'bow-wind': { primary: '#66bb6a', glow: '#b8e0bb', accent: '#ffffff', secondary: '#8fce93' },
  'firefly-spirit': { primary: '#b39ddb', glow: '#e1d6f5', accent: '#ffffff', secondary: '#cbb6e8' },
  'mask-shift': { primary: '#78909c', glow: '#c3cfd6', accent: '#ffffff', secondary: '#99aab3' },
  'void-crystal': { primary: '#7c4dff', glow: '#c2aaff', accent: '#ffffff', secondary: '#9f7bff' },
}