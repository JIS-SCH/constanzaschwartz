'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseParallaxOptions {
  speed?: number      // signed ratio, recommended range -1 to 1
  axis?: 'y' | 'x'
  intensity?: number  // max displacement in px at speed=1 (default 60)
}

export function useParallax(
  innerRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxOptions = {}
) {
  const { speed = 0, axis = 'y', intensity = 350 } = options

  useEffect(() => {
    const inner = innerRef.current
    if (!inner || speed === 0) return

    // Trigger on the layout container (parent) so transforms on inner never shift the trigger zone
    const trigger = inner.parentElement ?? inner
    const range = speed * intensity

    // Use fromTo with scrub for smoother interpolation and better performance
    const tl = gsap.fromTo(
      inner,
      {
        [axis]: -range,
      },
      {
        [axis]: range,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Add smoothing for a less "brusque" feel
          invalidateOnRefresh: true,
        },
        force3D: true,
      }
    )

    return () => {
      tl.kill()
    }
  }, [speed, axis, intensity, innerRef])
}
