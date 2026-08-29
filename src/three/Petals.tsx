import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TRACK, HALL_WIDTH } from './constants'

const DUMMY = new THREE.Object3D()

interface Petal {
  pos: THREE.Vector3
  vx: number
  vy: number
  vz: number
  rot: number
  rotSpeed: number
  phase: number
  scale: number
}

interface PetalsProps {
  count?: number
}

/**
 * Ever-falling sakura. Instanced, per-petal sway, gentle drift and spin.
 * Nothing holds still: petals swirl on the wind the whole journey.
 */
export function Petals({ count = 150 }: PetalsProps) {
  const mesh = useRef<THREE.InstancedMesh>(null!)

  const petals = useMemo<Petal[]>(() => {
    const list: Petal[] = []
    for (let i = 0; i < count; i++) {
      list.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * HALL_WIDTH * 1.6,
          Math.random() * 26 - 4,
          -Math.random() * TRACK,
        ),
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(0.55 + Math.random() * 0.9),
        vz: (Math.random() - 0.5) * 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 1.6,
        phase: Math.random() * Math.PI * 2,
        scale: 0.55 + Math.random() * 0.9,
      })
    }
    return list
  }, [count])

  const colors = useMemo(() => {
    const palette = ['#ffd6e6', '#ffc2d7', '#fff0f6', '#ffe0ec', '#ffb3d1']
    return petals.map(() => new THREE.Color(palette[Math.floor(Math.random() * palette.length)]))
  }, [petals])

  useLayoutEffect(() => {
    petals.forEach((_, i) => {
      mesh.current.setColorAt(i, colors[i])
    })
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  }, [petals, colors])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const d = Math.min(delta, 0.05)

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i]
      const sway = Math.sin(t * 0.9 + p.phase) * d * 1.4
      p.pos.x += p.vx * d + sway
      p.pos.y += p.vy * d
      p.pos.z += p.vz * d
      p.rot += p.rotSpeed * d

      if (p.pos.y < -5) {
        p.pos.y = 24
        p.pos.x = (Math.random() - 0.5) * HALL_WIDTH * 1.6
        p.pos.z = -Math.random() * TRACK
      }
      if (p.pos.x > HALL_WIDTH) p.pos.x = -HALL_WIDTH
      if (p.pos.x < -HALL_WIDTH) p.pos.x = HALL_WIDTH

      DUMMY.position.copy(p.pos)
      DUMMY.rotation.set(p.rot * 0.7, p.rot, p.rot * 0.4)
      DUMMY.scale.setScalar(p.scale)
      DUMMY.updateMatrix()
      mesh.current.setMatrixAt(i, DUMMY.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <planeGeometry args={[0.42, 0.3]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={0.82} depthWrite={false} />
    </instancedMesh>
  )
}