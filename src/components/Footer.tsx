export function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-16 pt-6 text-center">
      <div className="hairline mx-auto mb-8 w-32" aria-hidden="true" />

      <h2 className="font-display text-2xl font-black tracking-[-0.02em] text-[#ffe9f1] md:text-3xl">Eternal love</h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#e8dbe8]">
        This archive was built as a tribute to the writers, studios, and voice
        actresses who made these heroines unforgettable, and to the fans who keep
        them alive.
      </p>

      <p className="mx-auto mt-8 max-w-lg text-[0.7rem] leading-relaxed text-[#e8dbe8]/80">
        WAIFU ARCHIVE is an unofficial fan project. All characters, quotes,
        names, and series belong to their respective owners. The 3D world is
        procedurally generated; the character portraits are supplied images and
        belong to their respective owners. Facts and quotes were
        researched from published sources listed in SOURCES.md.
      </p>

      <p className="mx-auto mt-8 max-w-md text-sm italic leading-relaxed text-[#e8dbe8]/90">
        Every character lives because someone, somewhere, refuses to forget.
      </p>

      <p className="mt-4 max-w-md text-[0.7rem] leading-relaxed text-[#e8dbe8]/80">
        Built with React, Three.js, GSAP, Vite &amp; Tailwind CSS
      </p>

      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.7rem] leading-relaxed text-[#e8dbe8]/80">
        <a
          href="https://github.com/anishinsei-343030"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="inline-flex text-[#e8dbe8]/80 transition-colors hover:text-[#ffe9f1]"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://github.com/anishinsei-343030/Waifu-Archive"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[#e8dbe8]/40 underline-offset-4 transition-colors hover:text-[#ffe9f1] hover:decoration-[#ffe9f1]"
        >
          github.com/anishinsei-343030/Waifu-Archive
        </a>
      </p>

      <p className="mx-auto mt-4 max-w-lg text-[0.7rem] leading-relaxed text-[#e8dbe8]/80">
        Special thanks to the fan communities, archivists, and translators who
        keep these stories alive across languages and generations.
      </p>

      <p className="mt-8 text-[0.65rem] uppercase tracking-[0.3em] text-[#e8dbe8]/60">
        WAIFU ARCHIVE · built with love, three.js & GSAP
      </p>

      <p className="mt-10 text-sm font-semibold tracking-[0.18em] text-[#ffe9f1]">
        © 2026 WAIFU ARCHIVE — created by AniShinSei
      </p>
    </footer>
  )
}