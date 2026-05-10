'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'
import { getLenis } from '@/src/scroll/lenis'
import { prefersReducedMotion, isMobile } from '@/src/utils/detect'

const LERP = 0.06

interface UseParallaxBgOptions {
  speed?: number
}

export function useParallaxBg(
  targetRef: RefObject<HTMLElement | null>,
  options: UseParallaxBgOptions = {}
) {
  const { speed = 0.15 } = options

  useEffect(() => {
    const target = targetRef.current
    if (!target || speed === 0 || isMobile() || prefersReducedMotion()) return

    // Reference for scroll position = section (parent of target), which never moves
    const reference = target.parentElement ?? target

    let targetOffset = 0
    let currentOffset = 0
    let rafId = 0
    let animating = false

    const computeTarget = () => {
      const rect = reference.getBoundingClientRect()
      const vH = window.innerHeight
      const progress = (rect.top + rect.height / 2 - vH / 2) / vH
      return progress * rect.height * speed
    }

    const tick = () => {
      const diff = targetOffset - currentOffset
      if (Math.abs(diff) < 0.05) {
        currentOffset = targetOffset
        target.style.transform = `translate3d(0, ${targetOffset}px, 0)`
        animating = false
        return
      }
      currentOffset += diff * LERP
      target.style.transform = `translate3d(0, ${currentOffset}px, 0)`
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      targetOffset = computeTarget()
      if (!animating) {
        animating = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const lenis = getLenis()
    if (lenis) {
      lenis.on('scroll', onScroll)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    targetOffset = computeTarget()
    currentOffset = targetOffset
    target.style.transform = `translate3d(0, ${currentOffset}px, 0)`

    return () => {
      cancelAnimationFrame(rafId)
      if (lenis) {
        lenis.off('scroll', onScroll)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
      target.style.transform = ''
    }
  }, [targetRef, speed])
}
