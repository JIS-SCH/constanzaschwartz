'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PARALLAX } from '@/src/motion/tokens'
import { prefersReducedMotion, isMobile } from '@/src/utils/detect'

gsap.registerPlugin(ScrollTrigger)

interface UseParallaxViewportOptions {
  speed?: number
  axis?: 'y' | 'x'
  intensity?: number
  triggerRef?: React.RefObject<HTMLElement | null>
}

export function useParallaxViewport(
  targetRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxViewportOptions = {}
) {
  const { speed = 0.18, axis = 'y', intensity = PARALLAX.intensity.desktop, triggerRef } = options

  useEffect(() => {
    const target = targetRef.current
    if (!target || speed === 0 || isMobile() || prefersReducedMotion()) return

    // Trigger must be the section (grandparent of inner), which never moves
    const trigger = triggerRef?.current ?? target.parentElement?.parentElement ?? target.parentElement ?? target
    const range = speed * intensity * 1.5

    const tl = gsap.fromTo(
      target,
      { [axis]: axis === 'y' ? -range : -range, scale: 1.05 },
      {
        [axis]: range,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom-=10%',
          end: 'bottom top+=10%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        force3D: true,
      }
    )

    return () => { tl.kill() }
  }, [speed, axis, intensity, targetRef, triggerRef])
}
