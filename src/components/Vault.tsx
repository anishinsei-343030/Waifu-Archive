import type { Waifu } from '../lib/types'
import { lenisRef } from '../lib/ScrollManager'
import { Reveal } from './Reveal'

export function Vault({ waifus }: { waifus: Waifu[] }) {
  const go = (id: string) => {
    const el = document.getElementById(`waifu-${id}`)
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -16, duration: 1.6 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="vault" className="relative mx-auto max-w-6xl px-6 pb-44 pt-28">
      <Reveal>
        <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-black leading-none tracking-[-0.03em] text-ink">
          VAULT
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute">
          One legend per alcove, and alcoves keep arriving. Jump to any one
          and the hall will glide you there.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {waifus.map((w, i) => (
          <Reveal key={w.id} delay={0.04 * (i % 4)}>
            <button
              onClick={() => go(w.id)}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/70 bg-white/45 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-pinkglow"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25"
                style={{ background: `radial-gradient(120% 90% at 20% 0%, ${w.palette.primary}, transparent 60%)` }}
                aria-hidden="true"
              />
              <div className="relative">
                {w.image && (
                  <div
                    className="relative mb-3 aspect-[4/5] overflow-hidden rounded-xl border border-white/70"
                    style={{
                      background: `radial-gradient(120% 120% at 30% 10%, ${w.palette.primary}55, ${w.palette.glow}33 45%, #fff 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center font-display font-black leading-none"
                      style={{ color: `${w.palette.primary}cc`, fontSize: 'clamp(3rem,9vw,4rem)' }}
                      aria-hidden="true"
                    >
                      {w.name[0]}
                    </div>
                    <img
                      src={w.image}
                      alt={`${w.name} portrait`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                )}
                <div className="mt-2 font-display text-xl font-black leading-tight text-ink md:text-2xl">
                  {w.name}
                </div>
                <div className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wider text-mute">
                  {w.series.split('(')[0].trim()}
                </div>
                <div className="mt-3 inline-flex gap-1.5">
                  <span className="size-3 rounded-full border border-white/80 transition-transform duration-300 group-hover:scale-125"
                    style={{ background: w.palette.primary }}
                  />
                  <span className="size-3 rounded-full transition-transform duration-300 group-hover:scale-125"
                    style={{ background: `${w.palette.secondary}`, border: '1px solid rgba(255,255,255,0.7)' }}
                  />
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}