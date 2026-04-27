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
  const { speed = 0, axis = 'y', intensity = 60 } = options

  useEffect(() => {
    const inner = innerRef.current
    if (!inner || speed === 0) return

    // Trigger on the layout container (parent) so transforms on inner never shift the trigger zone
    const trigger = inner.parentElement ?? inner
    const range = speed * intensity

    const st = ScrollTrigger.create({
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const offset = (self.progress * 2 - 1) * range
        gsap.set(inner, {
          x: axis === 'x' ? offset : 0,
          y: axis === 'y' ? offset : 0,
        })
      },
    })

    return () => st.kill()
  }, [speed, axis, intensity, innerRef])
}
