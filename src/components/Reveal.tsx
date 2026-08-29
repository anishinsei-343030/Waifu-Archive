import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Visibility-gated entrance reveal driven by GSAP ScrollTrigger. */
export function Reveal({
  children,
  y = 44,
  delay = 0,
  className,
}: {
  children: ReactNode
  y?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const tween = gsap.from(el, {
      opacity: 0,
      y,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, delay])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', opacity: 0 }}>
      {children}
    </div>
  )
}