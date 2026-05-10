'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/src/utils/detect'

interface UseParallaxFloatOptions {
  amplitude?: number
  frequency?: number
  axis?: 'y' | 'x' | 'both'
  phaseOffset?: number
}

export function useParallaxFloat(
  targetRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxFloatOptions = {}
) {
  const { amplitude = 12, frequency = 0.5, axis = 'y', phaseOffset = 0 } = options
  const rafId = useRef<number>(0)
  const startTime = useRef<number>(0)

  useEffect(() => {
    const target = targetRef.current
    if (!target || prefersReducedMotion()) return

    startTime.current = performance.now()
    let running = true

    const tick = (time: number) => {
      if (!running) return

      const elapsed = (time - startTime.current) / 1000
      const phase = elapsed * frequency * Math.PI * 2 + phaseOffset

      let x = 0
      let y = 0

      if (axis === 'y') {
        y = Math.sin(phase) * amplitude
      } else if (axis === 'x') {
        x = Math.sin(phase) * amplitude
      } else {
        y = Math.sin(phase) * amplitude
        x = Math.cos(phase) * amplitude * 0.6
      }

      target.style.transform = `translate3d(${x}px, ${y}px, 0)`
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(rafId.current)
      target.style.transform = ''
    }
  }, [targetRef, amplitude, frequency, axis, phaseOffset])
}
