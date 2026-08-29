import type { Waifu } from '../lib/types'
import { Reveal } from './Reveal'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function AlcoveSection({ w, index }: { w: Waifu; index: number }) {
  const flip = index % 2 === 1
  const c = w.palette.primary

  return (
    <section id={`waifu-${w.id}`} className="relative h-[170vh]">
      <div className="sticky top-0 flex h-screen items-center px-4 py-12 md:px-6">
        <div className="mx-auto w-full max-w-4xl">
          <Reveal className="max-w-[94vw]">
            <article
              className="glass-strong relative overflow-hidden rounded-[var(--radius-glass)] px-6 py-6 md:px-9 md:py-8"
              style={{ borderColor: c }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
                aria-hidden="true"
              />

              <div
                className={`grid items-center gap-6 md:grid-cols-[auto_minmax(0,1fr)] ${flip ? 'md:[direction:rtl]' : ''}`}
              >
                <div className="md:[direction:ltr]">
                  <div
                    className="relative mx-auto aspect-[4/5] w-32 overflow-hidden rounded-2xl border border-white/70 shadow-inner md:w-40"
                    style={{
                      background: `radial-gradient(120% 120% at 30% 10%, ${w.palette.primary}55, ${w.palette.glow}33 45%, #fff 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center font-display font-black leading-none"
                      style={{ color: `${w.palette.primary}cc`, fontSize: 'clamp(3.5rem,10vw,5rem)' }}
                      aria-hidden="true"
                    >
                      {w.name[0]}
                    </div>
                    {w.image && (
                      <img
                        src={w.image}
                        alt={`${w.name} portrait`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                </div>

                <div className="md:[direction:ltr]" style={{ direction: 'ltr' }}>
                  <p className="inline-flex flex-wrap items-center gap-x-2 text-xs font-semibold text-mute">
                    <span style={{ color: c }}>{w.motif.replace(/-/g, ' ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{w.series}</span>
                  </p>

                  <h3 className="mt-2 font-display text-[clamp(2rem,5.2vw,3.4rem)] font-black leading-[0.95] tracking-[-0.03em] text-ink">
                    {w.name}
                  </h3>

                  <p className="mt-2 text-sm font-bold text-ink/80">{w.tagline}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {w.traits.map((t) => (
                      <span key={t.label} className="trait-chip">
                        <b>{t.value}</b>
                        {t.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-mute">
                    <span>
                      Studio <b className="text-ink/80">{w.studio}</b>
                    </span>
                    <span>
                      Debut <b className="text-ink/80">{w.debut}</b>
                    </span>
                    <span>
                      VA <b className="text-ink/80">{w.va}</b>
                    </span>
                    {w.birth && (
                      <span>
                        Born{' '}
                        <b className="text-ink/80">
                          {MONTHS[w.birth.month - 1]}
                          {w.birth.day ? ` ${w.birth.day}` : ''}
                          {w.birth.year ? `, ${w.birth.year}` : ''}
                        </b>
                      </span>
                    )}
                  </div>

                  {w.deceased && (
                    <div className="mt-3 rounded-xl border border-white/70 bg-white/45 px-4 py-2.5">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-mute">deceased</p>
                      <p className="mt-0.5 text-xs font-semibold leading-snug text-ink/85">
                        {w.deceased.at}: {w.deceased.cause}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <blockquote className="mt-5 rounded-2xl border border-white/70 bg-white/50 px-5 py-3.5">
                <div className="font-display text-4xl font-black leading-none" style={{ color: c }} aria-hidden="true">
                  “
                </div>
                <p className="-mt-3 text-base font-bold leading-snug text-ink">{w.quoteEn}</p>
              </blockquote>

              <div className="mt-3 space-y-2">
                {w.bio.map((line) => (
                  <p key={line} className="text-xs leading-relaxed text-ink/75 md:text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}