'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/src/utils/detect'

interface UseParallaxFloatOptions {
  amplitude?: number
  frequency?: number
  axis?: 'y' | 'x' | 'both'
  phaseOffset?: number
  /** When false the hook is inert (no ticker subscription). */
  enabled?: boolean
}

export function useParallaxFloat(
  targetRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxFloatOptions = {}
) {
  const { amplitude = 12, frequency = 0.5, axis = 'y', phaseOffset = 0, enabled = true } = options

  useEffect(() => {
    const target = targetRef.current
    if (!target || !enabled || prefersReducedMotion()) return

    // Single shared heartbeat (gsap.ticker) instead of a per-instance
    // requestAnimationFrame loop — dozens of floating layers otherwise spawn
    // dozens of independent rAF loops.
    const startTime = gsap.ticker.time
    let subscribed = false

    const tick = () => {
      const elapsed = gsap.ticker.time - startTime
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
    }

    const subscribe = () => {
      if (subscribed) return
      gsap.ticker.add(tick)
      subscribed = true
    }
    const unsubscribe = () => {
      if (!subscribed) return
      gsap.ticker.remove(tick)
      subscribed = false
    }

    // Only animate while on (or near) screen. Offscreen layers keep writing
    // transforms every frame for nothing — pure wasted compositor work on a
    // 30-layer page. Time base stays continuous, so resuming never jumps.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) subscribe()
        else unsubscribe()
      },
      { rootMargin: '200px' }
    )
    io.observe(target)

    return () => {
      io.disconnect()
      unsubscribe()
      target.style.transform = ''
    }
  }, [targetRef, amplitude, frequency, axis, phaseOffset, enabled])
}
