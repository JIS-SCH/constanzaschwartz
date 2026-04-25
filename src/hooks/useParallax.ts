'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseParallaxOptions {
  speed?: number
  direction?: 'y' | 'x' | 'both'
  multiplier?: number
}

export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  options: UseParallaxOptions = {}
) {
  const {
    speed = 1,
    direction = 'y',
    multiplier = 300,
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element || speed === 0) return

    const range = speed * multiplier

    const st = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const offset = (1 - self.progress * 2) * range
        const xVal = direction === 'x' || direction === 'both' ? offset : 0
        const yVal = direction === 'y' || direction === 'both' ? offset : 0
        gsap.set(element, { x: xVal, y: yVal })
      },
    })

    return () => {
      st.kill()
    }
  }, [speed, direction, multiplier, elementRef])
}
