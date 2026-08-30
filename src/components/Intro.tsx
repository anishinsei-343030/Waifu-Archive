import { Reveal } from './Reveal'
import { WAIFUS } from '../lib/waifus'

const STATS = [
  { n: String(WAIFUS.length), label: 'legendary halls' },
  { n: '2008–22', label: 'years of anime debut' },
  { n: '∞', label: 'devotion' },
]

export function Intro() {
  return (
    <section id="intro" className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center md:py-44">
      <Reveal delay={0.1}>
        <h2 className="font-display font-black leading-[1.02] tracking-[-0.03em] text-ink">
          <span className="text-prosphantom text-[clamp(2rem,6vw,4.5rem)]">What is a waifu?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#e8dbe8] md:text-lg">
          A waifu is a fictional character you love with your whole heart, a
          figure from anime and games so vividly written that affection stops
          being ironic. The word entered the world as shorthand for a favorite
          character and left as the name for a feeling. This archive walks you
          through the heroines who earned it most.
        </p>
      </Reveal>

      <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={0.08 * i} className="h-full">
            <div className="glass h-full rounded-[var(--radius-glass)] px-6 py-8">
              <div className="text-prosphantom font-display text-5xl font-black md:text-6xl">{s.n}</div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-mute">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}