import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ReactNode } from 'react'

type Axis = 'x' | 'y' | 'z'

interface PlainProps {
  children?: ReactNode
}

export function Spin({ speed = 1, axis: Axis = 'y', children }: PlainProps & { speed?: number; axis?: Axis }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    const g = ref.current
    if (Axis === 'x') g.rotation.x += speed * d
    else if (Axis === 'z') g.rotation.z += speed * d
    else g.rotation.y += speed * d
  })
  return <group ref={ref}>{children}</group>
}

export function Bob({ amplitude = 0.3, speed = 1, phase = 0, children }: PlainProps & { amplitude?: number; speed?: number; phase?: number }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((state) => {
    ref.current.position.y = Math.sin(state.clock.elapsedTime * speed + phase) * amplitude
  })
  return <group ref={ref}>{children}</group>
}

export function Pulse({ min = 0.85, max = 1.15, speed = 2, children }: PlainProps & { min?: number; max?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const s = min + (Math.sin(state.clock.elapsedTime * speed) + 1) * 0.5 * (max - min)
    ref.current.scale.setScalar(s)
  })
  return <group ref={ref}>{children}</group>
}

export function Orbit({
  radius = 1,
  speed = 1,
  axis: Axis = 'y',
  tilt = [0, 0, 0] as [number, number, number],
  offset = 0,
  children,
}: PlainProps & { radius?: number; speed?: number; axis?: Axis; tilt?: [number, number, number]; offset?: number }) {
  const ring = useRef<THREE.Group>(null!)
  const holder = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    if (Axis === 'x') ring.current.rotation.x += speed * d
    else if (Axis === 'z') ring.current.rotation.z += speed * d
    else ring.current.rotation.y += speed * d
  })
  useFrame((state) => {
    holder.current.position.x = Math.cos(state.clock.elapsedTime * speed + offset) * radius
    holder.current.position.z = Math.sin(state.clock.elapsedTime * speed + offset) * radius
  })
  return (
    <group rotation={tilt}>
      <group ref={ring}>
        <group ref={holder}>{children}</group>
      </group>
    </group>
  )
}

export function SoftGlow({ color = '#ff9fc0', size = 1, opacity = 0.32 }: { color?: string; size?: number; opacity?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

export function StageLight({ color = '#ffb9d0', radius = 1.6, opacity = 0.22 }: { color?: string; radius?: number; opacity?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.98, 0]}>
      <circleGeometry args={[radius, 40]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * A flowing chain of thin boards following a sinusoid on X. Used by the
 * scarf and ribbon motifs. Animated by advancing the wave.
 */
export function Ribbon({
  count = 22,
  length = 2.4,
  amp = 0.42,
  color = '#ff4d6d',
  width = 0.075,
  thickness = 0.03,
}: {
  count?: number
  length?: number
  amp?: number
  color?: string
  width?: number
  thickness?: number
}) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const g = ref.current
    for (let i = 0; i < count; i++) {
      const child = g.children[i]
      const u = i / (count - 1)
      const posAlong = u * length - length / 2
      child.position.x = posAlong
      child.position.y = Math.sin(posAlong * 2.6 + t * 2.1) * amp
      child.position.z = Math.cos(posAlong * 1.9 + t * 1.4) * amp * 0.55
      child.rotation.z = Math.sin(posAlong * 2.6 + t * 2.1) * 0.9 - Math.PI / 2
      child.rotation.y = Math.cos(posAlong * 1.9 + t * 1.4) * 0.7
    }
  })
  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <boxGeometry args={[width * 2.4, width, thickness]} />
          <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.92} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

export function Sparkles({ count = 18, radius = 1, color = '#fff' }: { count?: number; radius?: number; color?: string }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05)
    ref.current.rotation.y += d * 0.35
  })
  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2
        const r = radius * 0.55
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(i * 3.7) * 0.28, Math.sin(a) * r]} scale={0.06 + ((i * 7) % 10) * 0.012}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.85} depthWrite={false} />
          </mesh>
        )
      })}
    </group>
  )
}