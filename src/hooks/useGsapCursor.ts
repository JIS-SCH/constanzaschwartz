'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { isMobile } from '@/src/utils/detect'

export function useGsapCursor(cursorRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (isMobile()) return

    const el = cursorRef.current
    if (!el) return

    gsap.set(el, { autoAlpha: 0 })
    gsap.set(el, { scale: 1, transformOrigin: 'center center' })

    const ctx = gsap.context(() => {
      let hasPosition = false
      let rafId: number | undefined
      let nextX = 0
      let nextY = 0
      const boundTargets = new Set<HTMLElement>()

      const renderPosition = () => {
        rafId = undefined
        el.style.left = `${nextX}px`
        el.style.top = `${nextY}px`
      }

      const onMouseMove = (e: MouseEvent) => {
        nextX = e.clientX
        nextY = e.clientY

        if (!hasPosition) {
          hasPosition = true
          el.style.left = `${nextX}px`
          el.style.top = `${nextY}px`
          gsap.set(el, { autoAlpha: 1 })
        } else {
          gsap.set(el, { autoAlpha: 1 })
        }

        if (rafId === undefined) {
          rafId = requestAnimationFrame(renderPosition)
        }
      }

      const onMouseEnter = () => {
        gsap.to(el, {
          scale: 2,
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: '#fff'
        })
      }

      const onMouseLeave = () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
          backgroundColor: '#fff'
        })
      }

      const bindElements = () => {
        const targets = document.querySelectorAll('a, button, [role="button"], .project-card, canvas')
        targets.forEach((target) => {
          const element = target as HTMLElement
          if (!boundTargets.has(element)) {
            element.addEventListener('mouseenter', onMouseEnter)
            element.addEventListener('mouseleave', onMouseLeave)
            boundTargets.add(element)
          }
        })
      }

      window.addEventListener('mousemove', onMouseMove)
      bindElements()

      const observer = new MutationObserver(bindElements)
      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        if (rafId !== undefined) cancelAnimationFrame(rafId)
        window.removeEventListener('mousemove', onMouseMove)
        boundTargets.forEach((target) => {
          target.removeEventListener('mouseenter', onMouseEnter)
          target.removeEventListener('mouseleave', onMouseLeave)
        })
        observer.disconnect()
      }
    })

    return () => ctx.revert()
  }, [cursorRef])
}
