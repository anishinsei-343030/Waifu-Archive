import { Reveal } from './Reveal'

/** The passage beneath the torii: a single quiet beat as the world shifts. */
export function Entrance() {
  return (
    <section className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-mute">
            ( through the gate )
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display font-black text-[clamp(2.6rem,8vw,6rem)] leading-none tracking-[-0.03em] text-ink/90">
            welcome home
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mute md:text-lg">
            You pass beneath the gate. Petals fall. Lanterns sway. Ahead, the
            hall opens one alcove at a time, each one a legend waiting to speak.
          </p>
        </Reveal>
        <Reveal delay={0.45} className="mt-10">
          <div className="hairline w-40" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}