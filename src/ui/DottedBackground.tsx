import { useEffect, useRef } from 'react'
import { Camera, Geometry, Mesh, Program, Renderer } from 'ogl'

export type DottedBackgroundProps = {
  colors?: readonly string[]
  bgColor?: string
  cellSize?: number
  paletteBias?: number
  gamma?: number
  play?: boolean
}

const DOT_DEFAULTS = {
  colors: ['#ff9ec4', '#ffd6e6', '#ffffff', '#b48cff'],
  cellSize: 8,
  paletteBias: 6,
  gamma: 3,
  alpha: 0.9,
} as const

const dotVertex = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const dotFragment = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform float uCell;
  uniform float uBias;
  uniform float uGamma;
  uniform float uAlpha;

  vec3 pal(int i) {
    if (i == 0) return uC0;
    if (i == 1) return uC1;
    if (i == 2) return uC2;
    return uC3;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 px = vUv * uRes;
    vec2 id = floor(px / uCell);
    float r = hash(id);
    float t = pow(r, uBias);
    float fi = clamp(t * 3.0, 0.0, 3.0);
    int lo = int(floor(fi));
    int hi = min(lo + 1, 3);
    vec3 col = mix(pal(lo), pal(hi), fract(fi));

    vec2 center = (id + 0.5) * uCell;
    vec2 off = uMouse * (0.3 + 0.7 * hash(id + 3.7)) * uCell * 0.5;
    float d = length(px - (center + off));
    float rad = uCell * 0.46;
    float dot = smoothstep(rad, rad - 1.5, d);

    col = pow(col, vec3(1.0 / uGamma));
    gl_FragColor = vec4(col * dot, dot * uAlpha);
  }
`

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '')
  const n = parseInt(c.length === 3 ? c[0] + c[0] + c[1] + c[1] + c[2] + c[2] : c, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function cappedDpr() {
  const w = window.innerWidth
  const cap = w >= 1440 ? 1.8 : w >= 768 ? 1.25 : 1
  return Math.min(window.devicePixelRatio || 1, cap)
}

export function DottedBackground({
  colors = DOT_DEFAULTS.colors,
  cellSize = DOT_DEFAULTS.cellSize,
  paletteBias = DOT_DEFAULTS.paletteBias,
  gamma = DOT_DEFAULTS.gamma,
  play = true,
}: DottedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: Renderer
    try {
      renderer = new Renderer({ canvas, alpha: true, antialias: false, webgl: 1 })
    } catch {
      return
    }

    const camera = new Camera(renderer.gl)
    const geometry = new Geometry(renderer.gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    })

    const [c0, c1, c2, c3] = [0, 1, 2, 3].map((i) => hexToRgb(colors[i] ?? colors[0] ?? '#ffffff'))

    const program = new Program(renderer.gl, {
      vertex: dotVertex,
      fragment: dotFragment,
      uniforms: {
        uRes: { value: [1, 1] },
        uMouse: { value: [0, 0] },
        uC0: { value: c0 },
        uC1: { value: c1 },
        uC2: { value: c2 },
        uC3: { value: c3 },
        uCell: { value: cellSize },
        uBias: { value: paletteBias },
        uGamma: { value: gamma },
        uAlpha: { value: DOT_DEFAULTS.alpha },
      },
    })

    const mesh = new Mesh(renderer.gl, { geometry, program })

    let raf = 0
    let curX = 0
    let curY = 0
    let tgtX = 0
    let tgtY = 0

    const setSize = () => {
      const cssW = canvas.clientWidth || 1
      const cssH = canvas.clientHeight || 1
      const dpr = cappedDpr()
      renderer.dpr = dpr
      renderer.setSize(cssW, cssH)
      program.uniforms.uRes.value = [cssW * dpr, cssH * dpr]
      program.uniforms.uCell.value = cellSize * dpr
    }

    setSize()
    renderer.render({ scene: mesh, camera })

    const onPointer = (e: PointerEvent) => {
      tgtX = (e.clientX / window.innerWidth) * 2 - 1
      tgtY = 1 - (e.clientY / window.innerHeight) * 2
    }

    const tick = () => {
      curX += (tgtX - curX) * 0.08
      curY += (tgtY - curY) * 0.08
      program.uniforms.uMouse.value = [curX, curY]
      renderer.render({ scene: mesh, camera })
      raf = requestAnimationFrame(tick)
    }

    if (play) raf = requestAnimationFrame(tick)

    const observer = new ResizeObserver(() => {
      setSize()
      renderer.render({ scene: mesh, camera })
    })

    const parent = canvas.parentElement ?? canvas
    observer.observe(parent)
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
  }, [colors, cellSize, paletteBias, gamma, play])

  return <canvas ref={canvasRef} />
}