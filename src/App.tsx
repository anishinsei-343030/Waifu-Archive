import { Suspense, lazy, useEffect } from 'react'
import { ScrollManager } from './lib/ScrollManager'
import { KatanaCursor } from './ui/KatanaCursor'
import { Hero } from './components/Hero'
import { KageBackdrop } from './components/KageBackdrop'
import { Intro } from './components/Intro'
import { AlcoveSection } from './components/AlcoveSection'
import { Vault } from './components/Vault'
import { Footer } from './components/Footer'
import { WAIFUS } from './lib/waifus'

const Experience = lazy(async () => {
  const m = await import('./three/Experience')
  return { default: m.Experience }
})

export default function App() {
  useEffect(() => {
    const hallEl = document.getElementById('hall')
    if (!hallEl) return
    const io = new IntersectionObserver(
      ([e]) => {
        document.querySelector('main')?.classList.toggle('hide-sticky-alcoves', !e.isIntersecting)
      },
      { root: null, threshold: 0 }
    )
    io.observe(hallEl)
    return () => io.disconnect()
  }, [])

  return (
    <ScrollManager>
      <div className="canvas-stage" aria-hidden="true">
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </div>
      <KageBackdrop />
      <div className="noise-overlay" aria-hidden="true" />
      <KatanaCursor />
      <main className="relative z-10 isolate">
        <Hero />
        <Intro />
        <div id="hall">
          {WAIFUS.map((w, i) => (
            <AlcoveSection key={w.id} w={w} index={i} />
          ))}
        </div>
        <Vault waifus={WAIFUS} />
        <Footer />
      </main>
    </ScrollManager>
  )
}