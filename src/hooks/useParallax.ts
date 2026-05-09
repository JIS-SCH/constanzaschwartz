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
  isAbsolute?: boolean
}

export function useParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxOptions = {}
) {
  const {
    speed = PARALLAX.speed.standard,
    axis = 'y',
    intensity = PARALLAX.intensity.desktop,
    triggerRef,
    withZoom = false,
    isAbsolute = false
  } = options

  useEffect(() => {
    const target = targetRef.current
    if (!target || speed === 0 || prefersReducedMotion()) return

    const trigger = triggerRef?.current ?? target.parentElement ?? target

    // Total travel distance should be a factor of the total scroll distance
    // (trigger height + viewport height) to ensure constant speed across different heights.
    // We normalize relative to speed 4 and intensity 50.
    const getRange = () => {
      if (isAbsolute) return speed * intensity

      const h = trigger.offsetHeight
      const v = window.innerHeight
      const factor = (speed / 4) * (intensity / 50) * PARALLAX.uniform.imageFactor
      return (h + v) * factor / 2
    }

    const fromVars: gsap.TweenVars = {
      [axis]: getRange,
      immediateRender: false
    }

    const toVars: gsap.TweenVars = {
      [axis]: () => -getRange(),
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        // Use mobileScrub for mobile devices
        scrub: window.innerWidth <= 1023 ? PARALLAX.uniform.mobileScrub : PARALLAX.uniform.scrub,
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
  }, [speed, axis, intensity, targetRef, triggerRef, withZoom, isAbsolute])
}
