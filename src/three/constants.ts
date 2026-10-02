/** Shared world constants for the scroll-dolly camera rig. */
import { MOTIF_ORDER } from '../data/palettes'

export const TRACK = 420

/** Where each scene stop sits along the Z track (camera z = -progress * TRACK). */
export const STOP = {
  hero: 0,
  torii: 0.1,
  waifuIntro: 0.16,
  vault: 0.92,
  footer: 1,
} as const

export const LOOKAHEAD = 9
export const HALL_RADIUS_X = 4.6
export const HALL_WIDTH = 12

/** How far ahead of its stop each vignette hangs. Negative = ahead of camera. */
export const VIGNETTE_AHEAD = -6

/** Proximity (camera distance) within which a vignette renders. */
export const VIGNETTE_RADIUS = 26

/** The hall starts just past the intro stop and ends before the vault. */
export const ALCOVE_START = STOP.waifuIntro + 0.04
const ALCOVE_END = STOP.vault - 0.04

/**
 * Per-alcove fraction span, derived from the roster so every resident's
 * alcove sits inside the camera's reach (camera z caps at -TRACK).
 */
export const ALCOVE_SPAN = (ALCOVE_END - ALCOVE_START) / Math.max(1, MOTIF_ORDER.length - 1)

export function alcoveFraction(index: number): number {
  return ALCOVE_START + index * ALCOVE_SPAN
}

export function alcoveZ(index: number): number {
  return -(alcoveFraction(index) * TRACK - VIGNETTE_AHEAD)
}

export function alcoveX(index: number): number | null {
  // null keeps it centered for the deep alcove hero shots
  return index % 2 === 0 ? -HALL_RADIUS_X * 0.55 : HALL_RADIUS_X * 0.55
}