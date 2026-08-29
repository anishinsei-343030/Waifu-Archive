import { Suspense, lazy } from 'react'
import { ScrollManager } from './lib/ScrollManager'
import { useReducedMotion } from './lib/hooks'
import { KatanaCursor } from './ui/KatanaCursor'
import { DottedBackground } from './ui/DottedBackground'
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
  const reduced = useReducedMotion()

  return (
    <ScrollManager>
      <div className="dot-bg" aria-hidden="true">
        <DottedBackground
          colors={['#ff9ec4', '#ffd6e6', '#ffffff', '#b48cff']}
          bgColor="transparent"
          cellSize={8}
          paletteBias={6}
          gamma={3}
          play={!reduced}
        />
      </div>
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