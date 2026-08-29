import { useEffect, useRef } from 'react'

/**
 * Katana cursor trail. A clean blade-slice line lags the pointer and grows a
 * cherry-blossom petal mark at the tip. Disabled for reduced motion + coarse pointers.
 */
export function KatanaCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    let raf = 0
    let px = -100
    let py = -100
    let cx = -100
    let cy = -100
    let drawing = false

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()

    const onMove = (e: PointerEvent) => {
      px = cx
      py = cy
      cx = e.clientX
      cy = e.clientY
      drawing = true
    }

    const tick = () => {
      const t = Date.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (drawing) {
        // fade the tail of the line
        const grad = ctx.createLinearGradient(px, py, cx, cy)
        grad.addColorStop(0, 'rgba(255,150,190,0)')
        grad.addColorStop(0.55, 'rgba(255,150,190,0.35)')
        grad.addColorStop(1, 'rgba(255,183,210,0.75)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(cx, cy)
        ctx.stroke()

        // petal at the tip
        const pulse = Math.sin(t / 180) * 2 + 6
        ctx.fillStyle = 'rgba(255,170,200,0.8)'
        ctx.beginPath()
        ctx.ellipse(cx, cy, pulse, pulse * 0.55, 0.6, 0, Math.PI * 2)
        ctx.fill()

        px = cx
        py = cy
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="katana-cursor" aria-hidden="true" />
}