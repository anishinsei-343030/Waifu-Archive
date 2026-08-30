import { Suspense, lazy } from 'react'
import { ScrollManager } from './lib/ScrollManager'
import { KatanaCursor } from './ui/KatanaCursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
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
  return (
    <ScrollManager>
      <div className="canvas-stage" aria-hidden="true">
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </div>
      <div className="noise-overlay" aria-hidden="true" />
      <KatanaCursor />
      <Nav />
      <main className="relative z-10">
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