import { useEffect, useState } from 'react'
import { lenisRef } from '../lib/ScrollManager'

const LINKS = [
  { id: 'hall', label: 'Hall' },
  { id: 'vault', label: 'Vault' },
] as const

export function Nav() {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY < 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -16, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`pointer-events-none fixed left-1/2 top-4 z-30 w-full max-w-3xl -translate-x-1/2 px-4 transition-all duration-500 ${
        hidden ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <nav className="glass flex items-center justify-between gap-2 rounded-full px-4 py-2.5">
        <button onClick={() => go('hero')} className="pointer-events-auto flex items-center gap-2 text-sm font-bold tracking-widest text-ink">
          <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-pink to-lavender text-[0.6rem] font-black text-white">A</span>
          <span className="hidden sm:inline">WAIFU ARCHIVE</span>
        </button>
        <div className="pointer-events-auto flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="pill rounded-full px-3.5 py-1.5 text-xs font-semibold text-mute transition-colors hover:text-pink focus-visible:outline-2 focus-visible:outline-pink"
            >
              {l.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}