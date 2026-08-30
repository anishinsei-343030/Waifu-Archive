import { Reveal } from './Reveal'

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

const heroShadow = {
  textShadow: '0 2px 4px rgba(255, 255, 255, 0.65), 0 10px 40px rgba(255, 92, 157, 0.22)',
}

export function Hero() {
  return (
    <section id="hero" className="relative h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(118%_110%_at_50%_36%,rgba(10,7,12,0.12)_0%,rgba(10,7,12,0.52)_58%,rgba(9,6,11,0.78)_100%)]"
        />

        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <Reveal delay={0.1}>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#e8dbe8]" style={heroShadow}>
              ( the eternal archive )
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-display font-black leading-[0.88] tracking-[-0.035em]" style={heroShadow}>
              <span className="block text-[clamp(3.4rem,13vw,11rem)] text-[#ffe9f1]">WAIFU</span>
              <span className="block text-[clamp(3.4rem,13vw,11rem)] text-[#ffb3d1]">ARCHIVE</span>
            </h1>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-[#ecddea] md:max-w-lg md:text-lg" style={heroShadow}>
              A rosette-lit hall of legendary anime heroines. Known as the
              eternal archive of the heart. Walk through, and every one of them will move for you.
            </p>
          </Reveal>

          <Reveal delay={0.65} className="mt-12">
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-[#e8dbe8]" style={heroShadow}>
              <span className="size-2 animate-float rounded-full bg-pinkglow" aria-hidden="true" />
              <span>scroll</span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden py-5 opacity-70">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-8 px-4" aria-hidden={copy === 1}>
              {marquee.map((k) => (
                <span key={k + copy} className="flex items-center gap-8 text-4xl text-[#ffe9f1]/35 md:text-6xl">
                  {k}
                  <span className="text-xl text-pinkglow/60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}