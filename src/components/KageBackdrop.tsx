import { useEffect, useRef } from 'react'

/**
 * Full-viewport Kage night-walk backdrop. The landing page runs inside the
 * iframe; the page scroll drives the iframe's internal scroll from the top of
 * the hero through the end of the character hall, then holds the final frame.
 */
export function KageBackdrop() {
  const kageRef = useRef<HTMLIFrameElement>(null)

  const hideKageChrome = () => {
    const kage = kageRef.current
    const doc = kage?.contentDocument
    if (!kage || !doc) return
    const style = doc.createElement('style')
    style.textContent =
      'body > *:not(#gl):not(#vignette):not(#grain){visibility:hidden !important}'
    doc.head.appendChild(style)
    kage.contentWindow?.scrollTo(0, 0)
  }

  useEffect(() => {
    const kage = kageRef.current
    kage?.addEventListener('load', hideKageChrome)
    if (kage?.contentDocument?.body) hideKageChrome()
    return () => kage?.removeEventListener('load', hideKageChrome)
  }, [])

  useEffect(() => {
    let raf = 0
    const drive = () => {
      const kage = kageRef.current
      const doc = kage?.contentDocument
      if (kage && doc?.body) {
        const win = kage.contentWindow!
        const hero = document.getElementById('hero')
        const hall = document.getElementById('hall')
        if (hero && hall) {
          const top = hero.offsetTop
          const bottom = hall.offsetTop + hall.offsetHeight
          const range = Math.max(1, bottom - top - win.innerHeight)
          const p = Math.min(1, Math.max(0, (window.scrollY - top) / range))
          const max = Math.max(0, doc.body.scrollHeight - win.innerHeight)
          const target = p * max
          if (Math.abs(win.scrollY - target) > 0.5) win.scrollTo(0, target)
        }
      }
      raf = requestAnimationFrame(drive)
    }
    raf = requestAnimationFrame(drive)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="kage-backdrop" aria-hidden="true">
      <iframe
        ref={kageRef}
        src="/landing-pages/kage.html"
        title=""
        loading="eager"
        sandbox="allow-scripts allow-same-origin"
        tabIndex={-1}
      />
    </div>
  )
}