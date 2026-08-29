import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollProgress } from './hooks'

gsap.registerPlugin(ScrollTrigger)

/** Module singleton so components (nav) can request buttery scrolls. */
export const lenisRef: { current: Lenis | null } = { current: null }

/**
 * Smooth scroll + a coarse global progress value (0..1) that the 3D camera
 * rig consumes. Section-specific reveals are driven by ScrollTrigger scrubs.
 */
export function ScrollManager({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: window,
      duration: 1.15,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', () => {
      // Lenis drives native window scroll; ScrollTrigger listens natively.
    })

    // The DOM scrollers write a single progress number; GSAP drives scrub tweens.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const scroller = window
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => scroller.document.documentElement.scrollHeight - window.innerHeight,
      onUpdate(self) {
        scrollProgress.value = self.progress
      },
    })
    trigger.refresh()

    return () => {
      trigger.kill()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return children
}