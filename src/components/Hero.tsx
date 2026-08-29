import { Reveal } from './Reveal'
import { lenisRef } from '../lib/ScrollManager'

const marquee = [
  'legend',
  'masterpiece',
  'corridor',
  'eternal',
  'blossom',
  'maiden',
  'dream',
  'bond',
]

export function Hero() {
  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -16, duration: 1.6 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
        <Reveal delay={0.1}>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-mute">
            ( the eternal archive )
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.035em]">
            <span className="block text-[clamp(3.4rem,13vw,11rem)] text-ink">WAIFU</span>
            <span className="text-prosphantom block text-[clamp(3.4rem,13vw,11rem)]">ARCHIVE</span>
          </h1>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-7 max-w-md text-base leading-relaxed text-mute md:max-w-lg md:text-lg">
            A rosette-lit hall of twelve legendary anime heroines. Known as the
            eternal archive of the heart. Walk through, and every one of them will move for you.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => go('hall')}
              className="glass-strong group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-pink"
            >
              Enter the hall
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => go('vault')}
              className="pill rounded-full px-7 py-3.5 text-sm font-bold text-mute transition-colors hover:text-pink focus-visible:outline-2 focus-visible:outline-pink"
            >
              Open the vault
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.65} className="mt-12">
          <div className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-mute">
            <span className="size-2 animate-float rounded-full bg-pinkglow" aria-hidden="true" />
            <span>scroll</span>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 -z-10 overflow-hidden py-5 opacity-70">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-8 px-4" aria-hidden={copy === 1}>
              {marquee.map((k) => (
                <span key={k + copy} className="flex items-center gap-8 text-4xl text-ink/25 md:text-6xl">
                  {k}
                  <span className="text-xl text-pink/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}