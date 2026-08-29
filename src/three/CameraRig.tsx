import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollProgress, usePointerSmoothing } from '../lib/hooks'
import { TRACK, LOOKAHEAD, alcoveX } from './constants'

interface CameraRigProps {
  reduced: boolean
}

/**
 * The heart of the walkthrough. Camera dollies down the -Z track as the page
 * scrolls, eased with a lerp, breathing gently, and tilting with the pointer.
 */
export function CameraRig({ reduced }: CameraRigProps) {
  const px = useRef(0)
  const py = useRef(0)
  const eyeZ = useRef(6)
  const pointer = usePointerSmoothing()

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime

    // smoothing for pointer parallax
    px.current += (pointer.target.current.x - px.current) * 0.045
    py.current += (pointer.target.current.y - py.current) * 0.045

    // scroll -> camera z (lerped so the camera never snaps)
    const targetZ = -scrollProgress.value * TRACK + 6
    eyeZ.current += (targetZ - eyeZ.current) * Math.min(0.08, d * 2.2)

    const breath = Math.sin(t * 0.5) * 0.18
    const sway = Math.sin(t * 0.21) * 0.14
    const m = reduced ? 0.18 : 1

    // cotton-soft gaze: find the nearest alcove and drift toward it as we pass
    const flick = (scrollProgress.value - 0.2) / 0.052
    const i = THREE.MathUtils.clamp(Math.round(flick), 0, 11)
    const ax = alcoveX(i) ?? 0
    const proximity = 1 - Math.min(1, Math.abs(flick - i) / 0.5)
    const side = Math.sign(ax)

    const cam = state.camera
    cam.position.x = px.current * 1.6 * m + sway * m + side * proximity * 0.9 * m
    cam.position.y = 0.55 + py.current * 0.7 * m + breath * m
    cam.position.z = eyeZ.current

    cam.lookAt(
      cam.position.x * 0.55 + side * proximity * 1.5,
      cam.position.y * 0.5 + 0.3,
      cam.position.z - LOOKAHEAD,
    )
  })

  return null
}