import { useRef } from 'react'
import type { ReactElement } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Spin, Orbit, Bob, Pulse, SoftGlow, StageLight, Ribbon, Sparkles } from './Motion'
import { VIGNETTE_RADIUS } from './constants'
import type { Palette } from '../lib/types'

/**
 * One procedural character vignette per alcove. Pure geometry —
 * no copyrighted art. Each vignette is culled by camera proximity so only
 * the near scene pays for draw calls.
 */
export function Vignette({ motif, palette, position }: { motif: string; palette: Palette; position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!)
  const baseZ = position[2]

  useFrame((state) => {
    const group = ref.current
    if (!group) return
    const dist = Math.abs(state.camera.position.z - baseZ)
    const show = dist < VIGNETTE_RADIUS
    if (group.visible !== show) group.visible = show
    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.06
  })

  const scene = MOTIF_SCENES[motif]

  return (
    <group ref={ref} position={position} visible={false}>
      <group scale={2}>
        <StageLight color={palette.secondary} radius={1.9} opacity={0.28} />
        <group position={[0, 0.55, 0]}>{scene ? scene(palette) : <SoftGlow color={palette.glow} />}</group>
      </group>
    </group>
  )
}

type Scene = (p: Palette) => ReactElement

const MOTIF_SCENES: Record<string, Scene> = {
  'bayonet-halo': (p) => (
    <>
      <Spin speed={0.7}>
        <mesh>
          <octahedronGeometry args={[0.42, 0]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
        <SoftGlow color={p.glow} size={0.72} opacity={0.4} />
      </Spin>
      <Orbit radius={1.1} speed={0.9} tilt={[0.25, 0, 0.4]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.07, 1.35, 0.07]} />
          <meshBasicMaterial color={p.accent} toneMapped={false} />
        </mesh>
      </Orbit>
      <Orbit radius={1.75} speed={-0.55} tilt={[0.35, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.05, 1.6, 0.05]} />
          <meshBasicMaterial color={p.secondary} toneMapped={false} />
        </mesh>
      </Orbit>
      <Sparkles count={14} radius={1.35} color={p.secondary} />
    </>
  ),

  'horns-aurora': (p) => (
    <>
      <Spin speed={0.5}>
        <mesh position={[-0.5, 0.28, 0]} rotation={[0, 0, -0.75]}>
          <torusGeometry args={[0.5, 0.055, 10, 18, 2.6]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
        <mesh position={[0.5, 0.28, 0]} rotation={[0, 0, 0.75]}>
          <torusGeometry args={[0.5, 0.055, 10, 18, 2.6]} />
          <meshBasicMaterial color={p.accent} toneMapped={false} />
        </mesh>
        <SoftGlow color={p.glow} size={0.6} opacity={0.4} />
      </Spin>
      <Orbit radius={1.5} speed={0.8} tilt={[0.6, 0, 0]}>
        <Ribbon count={13} length={1.5} color={p.accent} width={0.055} />
      </Orbit>
      <Sparkles count={14} radius={1.45} color={p.secondary} />
    </>
  ),

  'time-crystal': (p) => (
    <>
      <Spin speed={0.6}>
        <mesh>
          <icosahedronGeometry args={[0.38, 0]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
        <SoftGlow color={p.glow} size={0.7} opacity={0.36} />
      </Spin>
      <Orbit radius={1.05} speed={1.1}>
        <Gear count={12} radius={0.34} color={p.accent} />
      </Orbit>
      <Orbit radius={1.85} speed={-0.45} tilt={[0.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.85, 0.045, 6, 40]} />
          <meshBasicMaterial color={p.secondary} toneMapped={false} />
        </mesh>
      </Orbit>
      <Sparkles count={16} radius={1.4} color={p.secondary} />
    </>
  ),

  'explosion-crest': (p) => (
    <>
      <Pulse min={0.9} max={1.18} speed={2.6}>
        <mesh>
          <torusGeometry args={[0.55, 0.09, 10, 30]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.82, 0.04, 8, 30]} />
          <meshBasicMaterial color={p.secondary} toneMapped={false} />
        </mesh>
      </Pulse>
      <Orbit radius={1.2} speed={1.7} tilt={[1.15, 0, 0]}>
        <mesh>
          <tetrahedronGeometry args={[0.17]} />
          <meshBasicMaterial color={p.accent} toneMapped={false} />
        </mesh>
      </Orbit>
      <Orbit radius={1.72} speed={-1.05} tilt={[0.25, 0.5, 0]}>
        <mesh>
          <tetrahedronGeometry args={[0.14]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
      </Orbit>
      <SoftGlow color={p.glow} size={0.85} opacity={0.42} />
    </>
  ),

  'ribbon-spiral': (p) => (
    <>
      <Orbit radius={1.05} speed={0.9} tilt={[1.28, 0, 0]}>
        <Ribbon count={13} length={1.8} color={p.primary} width={0.07} />
      </Orbit>
      <Orbit radius={1.45} speed={-0.7} tilt={[0.5, 0, 1.25]}>
        <Ribbon count={13} length={2.0} color={p.secondary} width={0.06} />
      </Orbit>
      <Orbit radius={0.8} speed={1.35} tilt={[1.9, 0.3, 0]}>
        <Ribbon count={11} length={1.4} color={p.accent} width={0.055} />
      </Orbit>
      <SoftGlow color={p.glow} size={0.5} opacity={0.34} />
    </>
  ),

  'grain-field': (p) => (
    <>
      <Bob amplitude={0.16} speed={0.9}>
        <Spin speed={0.24}>
          <Wheat radius={1.15} color={p.primary} secondary={p.accent} />
        </Spin>
      </Bob>
      <Orbit radius={1.65} speed={0.5} tilt={[0.35, 0, 0]}>
        <mesh>
          <coneGeometry args={[0.05, 0.32, 6]} />
          <meshBasicMaterial color={p.accent} toneMapped={false} />
        </mesh>
      </Orbit>
      <Sparkles count={16} radius={1.3} color={p.secondary} />
      <SoftGlow color={p.glow} size={0.55} opacity={0.32} />
    </>
  ),

  'fan-moon': (p) => (
    <>
      <Orbit radius={0.8} speed={0.55}>
        <mesh rotation={[-0.6, 0, 0]}>
          <circleGeometry args={[0.5, 26, 0, 2.3]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </Orbit>
      <Orbit radius={1.0} speed={-0.45}>
        <mesh rotation={[-0.6, 0, 0.6]}>
          <circleGeometry args={[0.54, 26, 0, 2.3]} />
          <meshBasicMaterial color={p.secondary} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </Orbit>
      <Bob amplitude={0.24} speed={0.8}>
        <group position={[0, 1.15, 0]}>
          <mesh>
            <sphereGeometry args={[0.34, 20, 20]} />
            <meshBasicMaterial color={p.glow} toneMapped={false} />
          </mesh>
          <SoftGlow color={p.glow} size={0.65} opacity={0.5} />
        </group>
      </Bob>
      <Sparkles count={14} radius={1.4} color={p.accent} />
    </>
  ),

  'blades-cross': (p) => (
    <>
      <Spin speed={0.9}>
        <group>
          <mesh>
            <boxGeometry args={[0.05, 1.55, 0.3]} />
            <meshBasicMaterial color={p.primary} toneMapped={false} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.05, 1.55, 0.3]} />
            <meshBasicMaterial color={p.primary} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.06, 0.3, 8]} />
            <meshBasicMaterial color={p.accent} toneMapped={false} />
          </mesh>
          <mesh position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.06, 0.3, 8]} />
            <meshBasicMaterial color={p.accent} toneMapped={false} />
          </mesh>
        </group>
      </Spin>
      <Orbit radius={1.35} speed={1.15} tilt={[0.6, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[0.13]} />
          <meshBasicMaterial color={p.secondary} toneMapped={false} />
        </mesh>
      </Orbit>
      <SoftGlow color={p.glow} size={0.6} opacity={0.34} />
    </>
  ),

  'ice-crystal': (p) => (
    <>
      <Spin speed={0.65}>
        <mesh>
          <octahedronGeometry args={[0.34, 0]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
        <SoftGlow color={p.glow} size={0.68} opacity={0.4} />
      </Spin>
      <Orbit radius={1.0} speed={1} tilt={[0, 0.6, 0]}>
        <mesh>
          <octahedronGeometry args={[0.11]} />
          <meshBasicMaterial color={p.accent} toneMapped={false} />
        </mesh>
      </Orbit>
      <Orbit radius={1.45} speed={-0.8} tilt={[0.7, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[0.1]} />
          <meshBasicMaterial color={p.secondary} toneMapped={false} />
        </mesh>
      </Orbit>
      <Orbit radius={1.2} speed={0.55} tilt={[1.15, 0, 0.3]}>
        <mesh>
          <octahedronGeometry args={[0.09]} />
          <meshBasicMaterial color={p.accent} toneMapped={false} />
        </mesh>
      </Orbit>
      <Sparkles count={18} radius={1.6} color={p.secondary} />
    </>
  ),

  'clock-hands': (p) => (
    <>
      <Spin speed={0.12}>
        <mesh>
          <torusGeometry args={[0.72, 0.05, 10, 36]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
        <group>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            return (
              <mesh key={i} position={[Math.cos(a) * 0.72, Math.sin(a) * 0.72, 0]}>
                <boxGeometry args={[0.03, 0.11, 0.03]} />
                <meshBasicMaterial color={p.accent} toneMapped={false} />
              </mesh>
            )
          })}
        </group>
        <mesh>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color={p.accent} toneMapped={false} />
        </mesh>
      </Spin>
      <Spin speed={0.5}>
        <mesh position={[0, 0.24, 0.02]}>
          <boxGeometry args={[0.045, 0.5, 0.03]} />
          <meshBasicMaterial color={p.secondary} toneMapped={false} />
        </mesh>
      </Spin>
      <Spin speed={1.5}>
        <mesh position={[0, 0.32, 0.04]}>
          <boxGeometry args={[0.028, 0.62, 0.02]} />
          <meshBasicMaterial color={p.glow} toneMapped={false} />
        </mesh>
      </Spin>
      <Orbit radius={1.4} speed={0.5}>
        <mesh>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshBasicMaterial color={p.glow} toneMapped={false} />
        </mesh>
      </Orbit>
      <SoftGlow color={p.glow} size={0.5} opacity={0.28} />
    </>
  ),

  'sun-spark': (p) => (
    <>
      <Pulse min={0.9} max={1.28} speed={2.4}>
        <mesh>
          <sphereGeometry args={[0.4, 22, 22]} />
          <meshBasicMaterial color={p.primary} toneMapped={false} />
        </mesh>
      </Pulse>
      <SoftGlow color={p.glow} size={0.95} opacity={0.52} />
      <Spin speed={0.35}>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.72, Math.sin(a) * 0.72, 0]} rotation={[0, 0, a - Math.PI / 2]}>
              <coneGeometry args={[0.09, 0.42, 6]} />
              <meshBasicMaterial color={p.accent} toneMapped={false} />
            </mesh>
          )
        })}
      </Spin>
      <Sparkles count={20} radius={1.7} color="#fff0d9" />
    </>
  ),
}

function Gear({ count, radius, color }: { count: number; radius: number; color: string }) {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]} rotation={[0, 0, a + Math.PI / 2]}>
            <boxGeometry args={[0.06, 0.28, 0.05]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        )
      })}
    </group>
  )
}

function Wheat({ radius, color, secondary }: { radius: number; color: string; secondary: string }) {
  return (
    <group>
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2
        const jitter = (i % 3) * 0.22
        return (
          <mesh key={i} position={[Math.cos(a) * (radius - 0.15 + jitter * 0.4), (i % 2) * 0.05, Math.sin(a) * (radius - 0.15 + jitter * 0.4)]} rotation={[0, 0, a - Math.PI / 2 + (i % 5) * 0.06]}>
            <coneGeometry args={[0.055, 0.5, 6]} />
            <meshBasicMaterial color={i % 2 === 0 ? color : secondary} toneMapped={false} />
          </mesh>
        )
      })}
    </group>
  )
}