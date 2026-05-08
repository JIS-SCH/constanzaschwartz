'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
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
    gsap.set(el, {
      left,
      top,
      width,
      height,
      borderRadius: '2px',
      visibility: 'visible',
      opacity: 1,
      yPercent: 0,
      backgroundImage: `url(${state.imageSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    })

    const ctx = gsap.context(() => {
      // 1. Main expansion
      gsap.to(el, {
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        duration: DURATION.lg,
        ease: 'power2.inOut',
        force3D: true, // Force GPU
        z: 0.01,       // Prevent jitter
        onComplete: () => {
          router.push(`/project/${state.slug}`)
          setExpanded()
        },
      })

      // 2. "Thick Liquid" (Viscous) Flex effect
      const disp = document.querySelector('#liquid-morph feDisplacementMap')
      if (disp) {
        const tl = gsap.timeline()
        tl.to(disp, {
          attr: { scale: 40 }, // Higher scale but blurred for "thickness"
          duration: DURATION.lg,
          ease: 'power1.inOut',
        })
        tl.to(disp, {
          attr: { scale: 0 },
          duration: DURATION.lg,
          ease: 'power2.inOut',
        })
      }
    })

    ctxRef.current = ctx
  }, [state.phase, state.originRect, state.imageSrc, state.slug, router, setExpanded])

  // ── Phase: revealing → morph to project image position, then fade ───────
  useEffect(() => {
    if (state.phase !== 'revealing') return
    const el = imageRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    // We DON'T revert here because we want to maintain the fullscreen state 
    // reached in the 'expanding' phase for a continuous morph.

    const target = document.querySelector<HTMLElement>('[data-project-image]')

    const cleanup = () => {
      gsap.set(overlay, { visibility: 'hidden', background: '#0F0F0F', opacity: 1 })
      gsap.set(el, { 
        visibility: 'hidden', 
        left: '', 
        top: '', 
        width: '', 
        height: '', 
        opacity: 1, 
        backgroundImage: '',
        filter: 'none'
      })
      setDone()
    }

    const targetRect = target ? target.getBoundingClientRect() : null
    const hasRealTarget = targetRect && targetRect.width > 0 && targetRect.height > 0

    const ctx = gsap.context(() => {
      if (hasRealTarget && targetRect) {
        const tl = gsap.timeline()

        tl.to(el, {
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          duration: DURATION.md,
          ease: 'power2.out',
        }, 0)

        // Settle the liquid filter if still active
        const disp = document.querySelector('#liquid-morph feDisplacementMap')
        if (disp) {
          gsap.to(disp, {
            attr: { scale: 0 },
            duration: DURATION.md, // Slower settle for viscosity
          })
        }

        tl.to(overlay, {
          opacity: 0,
          duration: DURATION.sm,
          ease: EASE.out,
          onComplete: cleanup,
        })
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
  }, [state.phase, setDone])

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
      {/* Liquid morph filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="liquid-morph" colorInterpolationFilters="sRGB">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.003" 
            numOctaves="1" 
            result="noise" 
          />
          <feGaussianBlur in="noise" stdDeviation="20" result="blurredNoise" />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="blurredNoise" 
            scale="0" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          pointerEvents: isActive ? 'auto' : 'none',
          visibility: 'hidden',
          background: '#0F0F0F',
        }}
      >
        <div
          ref={imageRef}
          style={{
            position: 'fixed',
            visibility: 'hidden',
            willChange: 'transform, width, height, left, top, opacity',
            filter: 'url(#liquid-morph)',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'crisp-edges', // Try to keep it sharp
          }}
        />
      </div>
    </>
  )
}
