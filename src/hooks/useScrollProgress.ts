'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParallaxContext } from '@/src/contexts/ParallaxContext'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollProgressOptions {
  trigger?: HTMLElement | string
  start?: string
  end?: string
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { trigger = 'body', start = 'top top', end = 'bottom bottom' } = options
  const { setScrollProgress } = useParallaxContext()
  const stRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    stRef.current = ScrollTrigger.create({
      trigger: typeof trigger === 'string' ? trigger : trigger,
      start,
      end,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    return () => {
      if (stRef.current) {
        stRef.current.kill()
      }
    }
  }, [trigger, start, end, setScrollProgress])

  return stRef.current
}
