import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraRig } from './CameraRig'
import { Petals } from './Petals'
import { Lanterns } from './Lanterns'
import { Effects } from './Effects'
import { Vignette } from './Vignettes'
import { ToriiGate, HeroConstellation, MotionLabObjects } from './Scenes'
import { useDeviceTier, useReducedMotion, useMotionScale } from '../lib/hooks'
import { alcoveZ, alcoveX } from './constants'
import { MOTIF_ORDER, PALETTES } from '../data/palettes'

const DPR_CAP: Record<string, number> = { high: 1.8, mid: 1.25, low: 1 }

/**
 * The single persistent WebGL world behind the whole page.
 */
export function Experience() {
  const tier = useDeviceTier()
  const reduced = useReducedMotion()
  const scale = useMotionScale(reduced)

  return (
    <Canvas
      dpr={[1, DPR_CAP[tier]]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 50, near: 0.1, far: 460, position: [0, 0.55, 6] }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <CameraRig reduced={reduced} />
        <group scale={scale}>
          <Petals count={tier === 'low' ? 90 : 200} />
          <Lanterns count={tier === 'low' ? 14 : 28} />
          <HeroConstellation />
          <ToriiGate />
          <MotionLabObjects />
          {MOTIF_ORDER.map((id, i) => (
            <group key={id} scale={1.5}>
              <Vignette motif={id} palette={PALETTES[id]} position={[alcoveX(i) ?? 0, 0, alcoveZ(i)]} />
            </group>
          ))}
        </group>
        <Effects tier={tier} />
      </Suspense>
    </Canvas>
  )
}