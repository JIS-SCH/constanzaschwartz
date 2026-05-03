'use client'

import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { DURATION, EASE } from '@/src/motion/tokens'

declare global {
  interface Window {
    __cardsReady?: boolean
  }
}

export function useGsapIntro(
  containerRef: RefObject<HTMLElement | null>,
  onComplete: () => void
) {
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const monogram = el.querySelector<HTMLElement>('[data-intro-monogram]')
    const title = el.querySelector<HTMLElement>('[data-intro-title]')
    const line = el.querySelector<HTMLElement>('[data-intro-line]')
    const scrollEl = el.querySelector<HTMLElement>('[data-intro-scroll]')

    if (!monogram || !title || !line || !scrollEl) return

    const ctx = gsap.context(() => {
      // ── Step 1: "C" fades in first ──────────────────────────────────────
      const introTl = gsap.timeline()

      introTl.to(monogram, {
        opacity: 1,
        duration: DURATION.xl,
        ease: EASE.out,
      })

      // ── Step 2: After 1.2s delay, reveal the rest ──────────────────────
      introTl.to(
        title,
        {
          opacity: 1,
          scale: 1,
          duration: DURATION.lg,
          ease: EASE.out,
        },
        '+=1.2'
      )

      introTl.to(
        line,
        {
          scaleX: 1,
          duration: DURATION.md,
          transformOrigin: 'left center',
        },
        '<'
      )

      introTl.to(
        scrollEl,
        {
          opacity: 0.3,
          scale: 1,
          duration: DURATION.md,
          ease: EASE.out,
          onComplete: () => {
            gsap.fromTo(
              scrollEl,
              { opacity: 0.3 },
              {
                opacity: 1,
                duration: 1.8,
                ease: EASE.inOut,
                repeat: -1,
                yoyo: true,
              }
            )
          },
        },
        '<+=0.2'
      )

      // ── Scroll / touch driven exit ─────────────────────────────────────
      let accumulated = 0
      const threshold = window.innerHeight * 0.4
      let exiting = false

      function playExitAnimation() {
        if (exiting) return
        exiting = true

        gsap.killTweensOf(scrollEl)

        // ── Measure navbar targets ──────────────────────────────────────
        const navMono = document.querySelector<HTMLElement>('[data-nav-monogram]')
        const navTitle = document.querySelector<HTMLElement>('[data-nav-title]')

        if (!navMono || !navTitle) {
          // Logo as file — no fly-to-navbar animation, just fade out and reveal
          const tl = gsap.timeline({
            onComplete: () => {
              el!.style.visibility = 'hidden'
              el!.style.pointerEvents = 'none'
              onComplete()
            },
          })
          tl.to([line, scrollEl], { opacity: 0, duration: DURATION.xs, ease: EASE.out }, 0)
          tl.to([monogram, title], { opacity: 0, duration: DURATION.sm, ease: EASE.out }, 0)
          tl.to(el, { backgroundColor: 'rgba(0,0,0,0)', duration: DURATION.md, ease: 'power2.in' }, 0.2)
          tl.call(() => {
            window.__cardsReady = true
            window.dispatchEvent(new CustomEvent('intro:showCards'))
          }, [], 0.35)
          tl.call(() => {
            window.dispatchEvent(new CustomEvent('intro:navControls'))
            window.dispatchEvent(new CustomEvent('intro:logoMoved'))
          }, [], 0.55)
          return
        }

        const navMonoRect = navMono.getBoundingClientRect()
        const navTitleRect = navTitle.getBoundingClientRect()
        const monoRect = monogram!.getBoundingClientRect()
        const titleRect = title!.getBoundingClientRect()

        const monoDx = (navMonoRect.left + navMonoRect.width / 2) - (monoRect.left + monoRect.width / 2)
        const monoDy = (navMonoRect.top + navMonoRect.height / 2) - (monoRect.top + monoRect.height / 2)
        const monoScale = navMonoRect.height / monoRect.height

        const titleDx = (navTitleRect.left + navTitleRect.width / 2) - (titleRect.left + titleRect.width / 2)
        const titleDy = (navTitleRect.top + navTitleRect.height / 2) - (titleRect.top + titleRect.height / 2)
        const titleScale = navTitleRect.height / titleRect.height

        // ── Single choreographed exit timeline ──────────────────────────
        const exitTl = gsap.timeline({
          onComplete: () => {
            // All animation done — hide intro layer permanently
            el!.style.visibility = 'hidden'
            el!.style.pointerEvents = 'none'
            onComplete()
          },
        })

        // t=0.0 — Fade out scroll text + line
        exitTl.to([line, scrollEl], {
          opacity: 0,
          duration: DURATION.xs,
          ease: EASE.out,
        }, 0)

        // t=0.0 — Logo flies toward navbar
        exitTl.to(monogram, {
          x: monoDx,
          y: monoDy,
          scale: monoScale,
          duration: DURATION.xl,
          ease: EASE.sharp,
        }, 0)

        exitTl.to(title, {
          x: titleDx,
          y: titleDy,
          scale: titleScale,
          duration: DURATION.xl,
          ease: EASE.sharp,
        }, 0)

        // t=0.3 — Background fades to transparent
        exitTl.to(el, {
          backgroundColor: 'rgba(0,0,0,0)',
          duration: DURATION.md,
          ease: 'power2.in',
        }, 0.3)

        // t=0.5 — Cards fade in from below
        exitTl.call(() => {
          window.__cardsReady = true
          window.dispatchEvent(new CustomEvent('intro:showCards'))
        }, [], 0.5)

        // t=0.85 — Nav controls fade in + intro logo fades out
        exitTl.call(() => {
          window.dispatchEvent(new CustomEvent('intro:navControls'))
        }, [], 0.85)
        exitTl.to(monogram, { opacity: 0, duration: 0.05 }, 0.85)
        exitTl.to(title, { opacity: 0, duration: 0.05 }, 0.85)

        // t=0.9 — Nav logo revealed
        exitTl.call(() => {
          window.dispatchEvent(new CustomEvent('intro:logoMoved'))
        }, [], 0.9)
      }

      const onWheel = (e: WheelEvent) => {
        accumulated += e.deltaY
        if (accumulated >= threshold) {
          window.removeEventListener('wheel', onWheel)
          window.removeEventListener('touchmove', onTouch)
          playExitAnimation()
        }
      }

      let touchStartY = 0
      const onTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
      }
      const onTouch = (e: TouchEvent) => {
        const delta = touchStartY - e.touches[0].clientY
        accumulated += delta
        touchStartY = e.touches[0].clientY
        if (accumulated >= threshold) {
          window.removeEventListener('wheel', onWheel)
          window.removeEventListener('touchmove', onTouch)
          playExitAnimation()
        }
      }

      window.addEventListener('wheel', onWheel, { passive: true })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouch, { passive: true })

      return () => {
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouch)
      }
    }, el)

    // Cleanup only runs on page destroy, never during transition
    return () => ctx.kill()
  }, [containerRef, onComplete])
}
