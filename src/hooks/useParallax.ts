'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PARALLAX } from '@/src/motion/tokens'
import { prefersReducedMotion } from '@/src/utils/detect'

gsap.registerPlugin(ScrollTrigger)

interface UseParallaxOptions {
  speed?: number
  axis?: 'y' | 'x'
  intensity?: number
  triggerRef?: React.RefObject<HTMLElement | null>
  withZoom?: boolean
}

export function useParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxOptions = {}
) {
  const { speed = 0, axis = 'y', intensity = PARALLAX.intensity.desktop, triggerRef, withZoom = false } = options

  useEffect(() => {
    const target = targetRef.current
    if (!target || speed === 0 || prefersReducedMotion()) return

    const trigger = triggerRef?.current ?? target.parentElement ?? target
    const range = speed * intensity

    const fromVars: gsap.TweenVars = { [axis]: range }
    const toVars: gsap.TweenVars = {
      [axis]: -range,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
      force3D: true,
    }

    if (withZoom) {
      fromVars.scale = 1.05
      toVars.scale = 1.15
    }

    const tl = gsap.fromTo(target, fromVars, toVars)

    return () => {
      tl.kill()
    }
  }, [speed, axis, intensity, targetRef, triggerRef, withZoom])
}
