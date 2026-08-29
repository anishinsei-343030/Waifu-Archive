import { useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollProgress, usePointerSmoothing } from '../lib/hooks'
import type { SmoothPointerRefs } from '../lib/hooks'
import { STOP, TRACK } from './constants'
import { SoftGlow, Spin, Bob } from './Motion'

/**
 * The torii gate stands between hero and hall. It rises out of the floor as
 * the camera passes, then the walkway slides beneath it.
 */
export function ToriiGate() {
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    const group = ref.current
    const p = THREE.MathUtils.clamp((scrollProgress.value - 0.062) / 0.055, 0, 1)
    group.position.y = -5.5 + p * 3 * 1.83
    group.position.z = -(STOP.torii * TRACK) + 6
  })

  const red = '#e0485d'
  return (
    <group ref={ref} position={[0, -5.5, -(STOP.torii * TRACK) + 6]}>
      <group>
        <mesh position={[-3.35, 2.25, 0]}>
          <cylinderGeometry args={[0.26, 0.32, 4.5, 14]} />
          <meshBasicMaterial color={red} toneMapped={false} />
        </mesh>
        <mesh position={[3.35, 2.25, 0]}>
          <cylinderGeometry args={[0.26, 0.32, 4.5, 14]} />
          <meshBasicMaterial color={red} toneMapped={false} />
        </mesh>
        <mesh position={[0, 5.15, 0]}>
          <boxGeometry args={[8.4, 1.15, 0.62]} />
          <meshBasicMaterial color={red} toneMapped={false} />
        </mesh>
        <mesh position={[0, 3.85, 0]}>
          <boxGeometry args={[8.4, 0.92, 0.5]} />
          <meshBasicMaterial color="#c93a51" toneMapped={false} />
        </mesh>
        <mesh position={[-3.35, 4.6, 0]}>
          <boxGeometry args={[0.5, 1, 0.62]} />
          <meshBasicMaterial color={red} toneMapped={false} />
        </mesh>
        <mesh position={[3.35, 4.6, 0]}>
          <boxGeometry args={[0.5, 1, 0.62]} />
          <meshBasicMaterial color={red} toneMapped={false} />
        </mesh>
      </group>
      <mesh position={[0, 2.6, 2.6]} rotation={[0, 0, 0]}>
        <circleGeometry args={[2.5, 40]} />
        <meshBasicMaterial
          color="#ffb08a"
          toneMapped={false}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {[-3.35, 3.35].map((x) => (
        <Bob key={x} amplitude={0.25} speed={1.4} phase={x}>
          <mesh position={[x, 5.7, 0]}>
            <sphereGeometry args={[0.34, 12, 12]} />
            <meshBasicMaterial color="#ffd600" toneMapped={false} />
          </mesh>
        </Bob>
      ))}
    </group>
  )
}

/**
 * The hero constellation: a loose galaxy of 20 revolving objects around the
 * opening shot. Every piece spins and orbits; nothing rests.
 */
export function HeroConstellation() {
  const ref = useRef<THREE.Group>(null!)
  const pointer = usePointerSmoothing()

  const items = useMemo(
    () => [
      { geo: 'torus-knot', color: '#ff7ba9' },
      { geo: 'icosa', color: '#ffb3d1' },
      { geo: 'octa', color: '#ff9fc0' },
      { geo: 'ring', color: '#ffd6e6' },
      { geo: 'box', color: '#fff0f6' },
      { geo: 'cone', color: '#ffc2d7' },
      { geo: 'torus', color: '#ff8fb2' },
      { geo: 'tetra', color: '#ffe4ee' },
    ],
    [],
  )

  useFrame((state) => {
    const group = ref.current
    const dist = Math.abs(state.camera.position.z - group.position.z)
    group.visible = dist < 60
    group.rotation.y = state.clock.elapsedTime * 0.05
    group.position.x = pointer.target.current.x * 1.4
    group.position.y = 1.2 + pointer.target.current.y * 0.8
  })

  return (
    <group ref={ref} position={[0, 1.2, -18]}>
      <SoftGlow color="#ff8fb2" size={4.2} opacity={0.16} />
      {Array.from({ length: 20 }).map((_, i) => {
        const item = items[i % items.length]
        const a = (i / 20) * Math.PI * 2 + ((i * 37) % 100) / 100
        const r = 2 + (i % 5) * 0.55
        const x = Math.cos(a) * r
        const z = Math.sin(a) * r
        const s = 0.16 + ((i * 13) % 10) * 0.045
        return (
          <group key={i} position={[x, Math.sin(i * 1.7) * 0.8, z]}>
            <Spin speed={0.4 + ((i * 19) % 20) / 40}>
              <OrbitOnly speed={0.3 + (i % 5) * 0.12} radius={0.55}>
                <Shape kind={item.geo} color={item.color} scale={s} />
              </OrbitOnly>
            </Spin>
          </group>
        )
      })}
    </group>
  )
}

/**
 * Motion Lab: interactive demo tiles living in the corridor. Each reacts to a
 * central pointer hover — grow + spin boost — plus perpetual motion.
 */
export function MotionLabObjects() {
  const pointer = usePointerSmoothing()
  const ref = useRef<THREE.Group>(null!)

  const objects = useMemo(
    () => [
      { kind: 'glass-cube' as const, ox: -2.3, oy: 0.6, z: -338, color: '#ffe3ee' },
      { kind: 'shard-ball' as const, ox: 2.4, oy: 0.7, z: -352, color: '#ffb9d0' },
      { kind: 'ribbon-knot' as const, ox: -2.5, oy: 0.5, z: -366, color: '#ff8fb2' },
      { kind: 'spring-heart' as const, ox: 2.3, oy: 0.4, z: -380, color: '#ff5f8f' },
    ],
    [],
  )

  useFrame((state) => {
    const group = ref.current
    const dist = Math.abs(state.camera.position.z - -358)
    group.visible = dist < 70
  })

  return (
    <group ref={ref} position={[0, 0, -358]} visible={false}>
      {objects.map((o) => (
        <HoverObject key={o.z} kind={o.kind} ox={o.ox} oy={o.oy} z={o.z} color={o.color} pointer={pointer} />
      ))}
    </group>
  )
}

function OrbitOnly({ speed, radius, children }: { speed: number; radius: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((state) => {
    ref.current.position.x = Math.cos(state.clock.elapsedTime * speed) * radius
    ref.current.position.z = Math.sin(state.clock.elapsedTime * speed) * radius
  })
  return (
    <group>
      <group ref={ref}>{children}</group>
    </group>
  )
}

function Shape({ kind, color, scale }: { kind: string; color: string; scale: number }) {
  return (
    <mesh scale={scale}>
      {kind === 'torus-knot' && <torusKnotGeometry args={[0.7, 0.22, 48, 12]} />}
      {kind === 'icosa' && <icosahedronGeometry args={[0.8, 0]} />}
      {kind === 'octa' && <octahedronGeometry args={[0.8, 0]} />}
      {kind === 'ring' && <torusGeometry args={[0.7, 0.22, 12, 32]} />}
      {kind === 'box' && <boxGeometry args={[1.1, 1.1, 1.1]} />}
      {kind === 'cone' && <coneGeometry args={[0.7, 1.3, 8]} />}
      {kind === 'torus' && <torusGeometry args={[0.72, 0.16, 12, 32]} />}
      {kind === 'tetra' && <tetrahedronGeometry args={[0.9]} />}
      <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.95} />
    </mesh>
  )
}

type LabKind = 'glass-cube' | 'shard-ball' | 'ribbon-knot' | 'spring-heart'

function HoverObject({
  kind,
  ox,
  oy,
  z,
  color,
  pointer,
}: {
  kind: LabKind
  ox: number
  oy: number
  z: number
  color: string
  pointer: SmoothPointerRefs
}) {
  const ref = useRef<THREE.Group>(null!)
  const spin = useRef(0)

  useFrame((state, delta) => {
    const group = ref.current
    const d = Math.min(delta, 0.05)
    const v = new THREE.Vector3()
    group.getWorldPosition(v)
    v.project(state.camera)
    const nx = pointer.target.current.x
    const ny = pointer.target.current.y
    const inside = Math.abs(v.x - nx) < 0.18 && Math.abs(v.y - ny) < 0.18
    const boost = inside ? 3.2 : 1
    spin.current += d * (0.5 + boost * 0.4)
    const goal = inside ? 1.26 : 1
    group.scale.x += (goal - group.scale.x) * 0.08
    group.scale.y += (goal - group.scale.y) * 0.08
    group.scale.z += (goal - group.scale.z) * 0.08
    group.rotation.y = spin.current * 0.4
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12
    group.position.y = oy + Math.sin(state.clock.elapsedTime * 0.9 + z) * 0.12
  })

  return (
    <group ref={ref} position={[ox, oy, z - -358]} scale={0.001}>
      {kind === 'glass-cube' && (
        <group>
          <mesh>
            <boxGeometry args={[1.1, 1.1, 1.1]} />
            <meshBasicMaterial color={color} transparent opacity={0.45} depthWrite={false} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial color="#ff7ba9" toneMapped={false} />
          </mesh>
        </group>
      )}
      {kind === 'shard-ball' && (
        <group>
          {Array.from({ length: 22 }).map((_, i) => {
            const phi = Math.acos(1 - (2 * (i + 0.5)) / 22)
            const theta = Math.PI * (1 + Math.sqrt(5)) * i
            return (
              <mesh
                key={i}
                position={[Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)]}
                rotation={[phi, theta, 0]}
              >
                <tetrahedronGeometry args={[0.2]} />
                <meshBasicMaterial color={i % 3 === 0 ? '#ffffff' : color} toneMapped={false} transparent opacity={0.9} />
              </mesh>
            )
          })}
        </group>
      )}
      {kind === 'ribbon-knot' && (
        <mesh>
          <torusKnotGeometry args={[0.62, 0.2, 90, 14]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      )}
      {kind === 'spring-heart' && (
        <group>
          <mesh position={[-0.22, 0.1, 0]}>
            <sphereGeometry args={[0.42, 20, 20]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          <mesh position={[0.22, 0.1, 0]}>
            <sphereGeometry args={[0.42, 20, 20]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.55, 0]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[0.5, 0.9, 20]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        </group>
      )}
      <SoftGlow color={color} size={1.15} opacity={0.22} />
    </group>
  )
}