import { Reveal } from './Reveal'

const TILES = [
  {
    jp: '回転',
    title: 'Orbit & spin',
    body: 'Every relic in the hall turns on its own rhythm, steady and alive. Drag the floating shapes in the lab to feel the weight of the glass world.',
  },
  {
    jp: '追従',
    title: 'Petal rain',
    body: 'Eight hundred sakura petals fall on closed paths, each one a triplanar ghost. The katana cursor trails them as you move.',
  },
  {
    jp: '捻転',
    title: 'Scroll dollies',
    body: 'The whole corridor is one continuous dolly shot. Nothing teleports; the camera simply glides, scrubbed by your scroll.',
  },
  {
    jp: '呼吸',
    title: 'Breath & glow',
    body: 'Glass panels breathe, lanterns sway, halos pulse. The lab is the nursery where every motion in the hall was rehearsed.',
  },
] as const

export function MotionLab() {
  return (
    <section id="lab" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <Reveal>
          <div>
            <p className="jp-accent mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-mute">
              ( 実験所 )
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-black leading-none tracking-[-0.03em] text-ink">
              Motion Lab
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-sm text-sm leading-relaxed text-mute">
            The three.js workbench behind the archive. Four principles, all live above.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {TILES.map((t, i) => (
          <Reveal
            key={t.title}
            delay={0.08 * i}
            className={i % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5'}
          >
            <article className="glass group relative h-full overflow-hidden rounded-[var(--radius-glass)] p-7 transition-transform duration-500 hover:-translate-y-1">
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-40"
                style={{ background: 'var(--color-pinkglow)' }}
                aria-hidden="true"
              />
              <div className="jp-accent text-lg font-bold text-pink">{t.jp}</div>
              <h3 className="mt-2 font-display text-2xl font-black text-ink">{t.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">{t.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}