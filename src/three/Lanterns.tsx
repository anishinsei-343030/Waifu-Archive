import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TRACK, HALL_RADIUS_X } from './constants'

const DUMMY = new THREE.Object3D()

interface Lantern {
  pos: THREE.Vector3
  phase: number
  speed: number
  sway: number
  scale: number
}

interface LanternsProps {
  count?: number
}

/**
 * Hanging paper lanterns that sway along the corridor, warm glow pulse.
 * Always alive: gentle swing + glow shimmer every frame.
 */
export function Lanterns({ count = 22 }: LanternsProps) {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const glow = useRef<THREE.InstancedMesh>(null!)

  const lanterns = useMemo<Lantern[]>(() => {
    const list: Lantern[] = []
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? 1 : -1
      list.push({
        pos: new THREE.Vector3(
          side * (HALL_RADIUS_X + 1.6 + Math.random() * 2.4),
          3 + Math.random() * 4,
          -Math.random() * TRACK,
        ),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        sway: 0.35 + Math.random() * 0.6,
        scale: 0.5 + Math.random() * 0.5,
      })
    }
    return list
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < lanterns.length; i++) {
      const l = lanterns[i]
      const swayX = Math.sin(t * l.speed + l.phase) * l.sway
      const bob = Math.sin(t * 0.7 + l.phase * 2) * 0.12

      DUMMY.position.set(l.pos.x + swayX, l.pos.y + bob, l.pos.z)
      DUMMY.rotation.set(swayX * 0.12, Math.sin(t * l.speed + l.phase) * 0.5, swayX * 0.16)
      DUMMY.scale.setScalar(l.scale)
      DUMMY.updateMatrix()
      mesh.current.setMatrixAt(i, DUMMY.matrix)
      DUMMY.scale.setScalar(l.scale * 1.9)
      DUMMY.updateMatrix()
      glow.current.setMatrixAt(i, DUMMY.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
    if (glow.current) {
      glow.current.instanceMatrix.needsUpdate = true
      glow.current.rotation.y = t * 0.05 // drifting glow mist
    }
  })

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshBasicMaterial
          color="#fff1f6"
          transparent
          opacity={0.92}
          toneMapped={false}
          depthWrite={false}
        />
      </instancedMesh>
      <instancedMesh ref={glow} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[0.62, 12, 12]} />
        <meshBasicMaterial
          color="#ff9fc0"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  )
}