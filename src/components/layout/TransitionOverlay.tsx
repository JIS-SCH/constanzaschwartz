'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { useTransition } from '@/src/contexts/TransitionContext'
import { DURATION, EASE } from '@/src/motion/tokens'

export function TransitionOverlay() {
  const { state, setExpanded, setDone, setClosed, reset } = useTransition()
  const router = useRouter()
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<gsap.Context | null>(null)

  // ── Phase: expanding → animate card rect to fullscreen ──────────────────

  // ── Phase: expanding → animate card rect to hero-like position ────────────────
  useEffect(() => {
    if (state.phase !== 'expanding') return
    const el = imageRef.current
    const overlay = overlayRef.current
    if (!el || !overlay || !state.originRect || !state.imageSrc) return

    ctxRef.current?.revert()

    const { left, top, width, height } = state.originRect

    gsap.set(overlay, { visibility: 'visible', opacity: 1 })

    if (el instanceof HTMLImageElement) {
      el.src = state.imageSrc
    }

    gsap.set(el, {
      left,
      top,
      width,
      height,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      borderRadius: '2px',
      visibility: 'visible',
      opacity: 1,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      WebkitTransformStyle: 'preserve-3d',
    })

    const ctx = gsap.context(() => {
      // Direct Navigation: We don't animate to fullscreen anymore.
      // We jump straight to the navigation and let the 'revealing' phase handle the direct morph.
      router.push(`/project/${state.slug}`)
      setExpanded()
    })

    ctxRef.current = ctx
  }, [state.phase, state.originRect, state.imageSrc, state.slug, router, setExpanded])

  // ── Phase: revealing → uniform-scale FLIP morph: card origin → hero ───────
  // Pure transform (translate + UNIFORM scale) so it runs on the GPU and never
  // distorts. object-fit:cover keeps the image proportional; the morph adapts to
  // any hero rect, so every project behaves identically.
  useEffect(() => {
    if (state.phase !== 'revealing') return
    const el = imageRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    // Pick the *visible* hero (desktop/mobile heroes share the attribute; the
    // hidden one has a zero rect). This makes the morph land correctly on both.
    const target = Array.from(
      document.querySelectorAll<HTMLElement>('[data-project-image]')
    ).find((t) => {
      const r = t.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    })

    const cleanup = () => {
      gsap.set(overlay, { visibility: 'hidden', background: '#0F0F0F', opacity: 1 })
      gsap.set(el, {
        visibility: 'hidden',
        left: '',
        top: '',
        width: '',
        height: '',
        opacity: 1,
        clearProps: 'transform',
      })
      setDone()
    }

    const targetRect = target?.getBoundingClientRect()
    const o = state.originRect
    const hasTarget = !!(targetRect && targetRect.width > 0 && targetRect.height > 0 && o)

    const ctx = gsap.context(() => {
      if (hasTarget && targetRect && o) {
        // FINAL = the hero rect exactly (identity transform), cover-fitted.
        gsap.set(el, {
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: 0,
          transformOrigin: 'center center',
          force3D: true,
        })

        // INVERT = uniform scale that covers the card, centred on it. One scale
        // factor for both axes → zero distortion.
        const scale = Math.max(o.width / targetRect.width, o.height / targetRect.height)
        const dx = o.left + o.width / 2 - (targetRect.left + targetRect.width / 2)
        const dy = o.top + o.height / 2 - (targetRect.top + targetRect.height / 2)
        gsap.set(el, { x: dx, y: dy, scale })

        // PLAY = back to identity, then reveal the real hero behind it.
        const tl = gsap.timeline({ onComplete: cleanup })
        tl.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: DURATION.lg,
          ease: 'power3.inOut',
        }, 0)
        // Start the reveal only once the image is essentially on the hero, so the
        // overlay fade uncovers an identical real hero (no ghost / double image).
        tl.to(overlay, {
          opacity: 0,
          duration: DURATION.md,
          ease: EASE.out,
        }, DURATION.lg * 0.92)
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: DURATION.md,
          ease: EASE.out,
          onComplete: cleanup,
        })
      }
    })

    ctxRef.current = ctx
  }, [state.phase, state.originRect, setDone])

  // ── Phase: closing → fade to black, then navigate home ──────────────────
  useEffect(() => {
    if (state.phase !== 'closing') return
    const overlay = overlayRef.current
    const el = imageRef.current
    if (!overlay) return

    ctxRef.current?.revert()

    // Hide the image element (not needed for back transition)
    if (el) gsap.set(el, { visibility: 'hidden' })

    // Fade in black overlay
    gsap.set(overlay, { visibility: 'visible', opacity: 0, background: '#0F0F0F' })

    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        opacity: 1,
        duration: DURATION.md,
        ease: EASE.inOut,
        onComplete: () => {
          router.push('/')
          setClosed()
        },
      })
    })

    ctxRef.current = ctx
  }, [state.phase, router, setClosed])

  // ── Phase: closed → home arrived, fade out black overlay ────────────────
  useEffect(() => {
    if (state.phase !== 'closed') return
    const overlay = overlayRef.current
    if (!overlay) return

    ctxRef.current?.revert()

    // Wait for home page to mount and paint
    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        opacity: 0,
        duration: DURATION.md,
        delay: 0.15,
        ease: EASE.out,
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden', opacity: 1 })
          reset()
        },
      })
    })

    ctxRef.current = ctx
  }, [state.phase, reset])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ctxRef.current?.revert()
    }
  }, [])

  const isActive = !['idle', 'done'].includes(state.phase)

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          pointerEvents: isActive ? 'auto' : 'none',
          visibility: 'hidden',
          background: '#0F0F0F',
          isolation: 'isolate',
          contain: 'strict',
        }}
      >
        <img
          ref={imageRef as any}
          alt=""
          decoding="async"
          style={{
            position: 'fixed',
            visibility: 'hidden',
            objectFit: 'cover',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
            // Only transform/opacity animate → GPU-composited, no layout/paint.
            willChange: 'transform, opacity',
          }}
        />
      </div>
    </>
  )
}
