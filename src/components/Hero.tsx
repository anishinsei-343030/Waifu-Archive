const marquee = [
  'eternal',
  'heroines',
  'archive',
  'waifu',
  'legend',
  'maiden',
  'sakura',
  'blossom',
]

export function Hero() {
  return (
    <section id="hero" className="relative h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(118%_110%_at_50%_36%,rgba(10,7,12,0.12)_0%,rgba(10,7,12,0.52)_58%,rgba(9,6,11,0.78)_100%)]"
        />
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