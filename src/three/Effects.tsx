import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import type { DeviceTier } from '../lib/hooks'
import { useReducedMotion } from '../lib/hooks'

export function Effects({ tier }: { tier: DeviceTier }) {
  const reduced = useReducedMotion()

  if (reduced) return null

  const bloomIntensity = tier === 'high' ? 0.6 : 0.35

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={bloomIntensity} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
      <Vignette eskil={false} offset={0.22} darkness={0.62} />
      <Noise opacity={tier === 'low' ? 0.012 : 0.02} />
    </EffectComposer>
  )
}