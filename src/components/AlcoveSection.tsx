import type { Waifu } from '../lib/types'
import { Reveal } from './Reveal'

export function AlcoveSection({ w, index }: { w: Waifu; index: number }) {
  const flip = index % 2 === 1
  const c = w.palette.primary

  return (
    <section id={`waifu-${w.id}`} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal className="max-w-[92vw]">
            <article
              className="glass-strong relative overflow-hidden rounded-[var(--radius-glass)] p-7 md:p-10"
              style={{ borderColor: c }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
                aria-hidden="true"
              />

              <div className={`grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] ${flip ? 'md:[direction:rtl]' : ''}`}>
                <div className="md:[direction:ltr]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="pill rounded-full px-3 py-1.5 text-xs font-semibold text-mute">
                      № {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-ink">
                    {w.name}
                  </h3>

                  <p className="mt-3 inline-flex flex-wrap items-center gap-x-2 text-sm font-semibold text-mute">
                    <span style={{ color: c }}>{w.motif.replace(/-/g, ' ')}</span>
                    <span aria-hidden="true">·</span>
                    {w.series}
                  </p>

                  <p className="mt-3 text-base font-bold text-ink/80">{w.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.traits.map((t) => (
                      <span key={t.label} className="trait-chip">
                        <b>{t.value}</b>
                        {t.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-mute">
                    <span>
                      Studio <b className="text-ink/80">{w.studio}</b>
                    </span>
                    <span>
                      Debut <b className="text-ink/80">{w.debut}</b>
                    </span>
                    <span>
                      VA <b className="text-ink/80">{w.va}</b>
                    </span>
                  </div>
                </div>

                <div className="md:[direction:ltr]" style={{ direction: 'ltr' }}>
                  <blockquote className="relative rounded-2xl border border-white/70 bg-white/50 px-5 py-4">
                    <div
                      className="font-display text-5xl font-black leading-none"
                      style={{ color: c }}
                      aria-hidden="true"
                    >
                      “
                    </div>
                    <p className="-mt-4 text-lg font-bold leading-snug text-ink">{w.quoteEn}</p>
                  </blockquote>

                  <div className="mt-5 space-y-3">
                    {w.bio.map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-ink/75">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/60 bg-white/40 p-5">
                    <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute">
                      Why she is loved
                    </p>
                    <ul className="space-y-1.5">
                      {w.whyLoved.map((r) => (
                        <li key={r} className="flex gap-2 text-sm leading-relaxed text-ink/80">
                          <span style={{ color: c }} aria-hidden="true">
                            ✦
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-[0.7rem] leading-tight text-mute/80">
                    Sources: {w.sources.map((s) => s.split('/')[0]).join(' · ')}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}