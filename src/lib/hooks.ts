import { useEffect, useState, useRef } from 'react'

export type DeviceTier = 'high' | 'mid' | 'low'

/** Rough hardware tier. Low gets fewer instanced objects and a lower DPR cap. */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('mid')

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number }
    const cores = navigator.hardwareConcurrency ?? 4
    const mem = nav.deviceMemory ?? 4
    const mobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
    if ((mobile && cores <= 4) || mem <= 3) setTier('low')
    else if (mobile || cores <= 4 || mem <= 4) setTier('mid')
    else setTier('high')
  }, [])

  return tier
}

/** Respect prefers-reduced-motion. When true, everything slows to a calm near-hold. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** Motion intensity scale: 1 = full, 0.12 = reduced-motion calm. */
export function useMotionScale(reduced: boolean): number {
  return reduced ? 0.12 : 1
}

export interface PointerState {
  x: number
  y: number
}

export interface SmoothPointerRefs {
  target: { current: PointerState }
  smooth: { current: PointerState }
}

/** Smoothed normalized pointer, ready for useFrame. */
export function usePointerSmoothing(): SmoothPointerRefs {
  const target = useRef<PointerState>({ x: 0, y: 0 })
  const smooth = useRef<PointerState>({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [target])

  return { target, smooth }
}

/** Shared global scroll progress target, written by GSAP ScrollTrigger. */
export const scrollProgress = { value: 0 }