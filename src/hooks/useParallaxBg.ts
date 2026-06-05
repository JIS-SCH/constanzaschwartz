'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { getLenis } from '@/src/scroll/lenis'
import { prefersReducedMotion, isMobile } from '@/src/utils/detect'

const LERP = 0.06

interface UseParallaxBgOptions {
  speed?: number
  /** When false the hook is inert (no listeners, no ticker subscription). */
  enabled?: boolean
}

export function useParallaxBg(
  targetRef: RefObject<HTMLElement | null>,
  options: UseParallaxBgOptions = {}
) {
  const { speed = 0.15, enabled = true } = options

  useEffect(() => {
    const target = targetRef.current
    if (!target || !enabled || speed === 0 || isMobile() || prefersReducedMotion()) return

    // Reference for scroll position = section (parent of target), which never moves
    const reference = target.parentElement ?? target

    let targetOffset = 0
    let currentOffset = 0
    let subscribed = false

    const computeTarget = () => {
      const rect = reference.getBoundingClientRect()
      const vH = window.innerHeight
      const progress = (rect.top + rect.height / 2 - vH / 2) / vH
      return progress * rect.height * speed
    }

    // Drive the lerp off gsap's shared ticker instead of a private rAF loop.
    // We only stay subscribed while settling toward the target, then drop off.
    const tick = () => {
      const diff = targetOffset - currentOffset
      if (Math.abs(diff) < 0.05) {
        currentOffset = targetOffset
        target.style.transform = `translate3d(0, ${targetOffset}px, 0)`
        unsubscribe()
        return
      }
      currentOffset += diff * LERP
      target.style.transform = `translate3d(0, ${currentOffset}px, 0)`
    }

    function subscribe() {
      if (subscribed) return
      gsap.ticker.add(tick)
      subscribed = true
    }
    function unsubscribe() {
      if (!subscribed) return
      gsap.ticker.remove(tick)
      subscribed = false
    }

    const onScroll = () => {
      targetOffset = computeTarget()
      subscribe()
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
      unsubscribe()
      if (lenis) {
        lenis.off('scroll', onScroll)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
      target.style.transform = ''
    }
  }, [targetRef, speed, enabled])
}
