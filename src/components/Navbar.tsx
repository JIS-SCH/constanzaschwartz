'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { useTransition } from '@/src/context/TransitionContext'

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { close } = useTransition()

  // Check if intro already completed (direct nav, refresh, back from project)
  const introComplete = typeof window !== 'undefined' && sessionStorage.getItem('introComplete')

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const monoEl = nav.querySelector<HTMLElement>('[data-nav-monogram]')
    const titleEl = nav.querySelector<HTMLElement>('[data-nav-title]')
    const hamburger = nav.querySelector<HTMLElement>('[data-nav-hamburger]')
    const sound = nav.querySelector<HTMLElement>('[data-nav-sound]')

    // If intro already ran, show everything immediately
    if (sessionStorage.getItem('introComplete')) {
      if (monoEl) gsap.set(monoEl, { opacity: 1 })
      if (titleEl) gsap.set(titleEl, { opacity: 1 })
      gsap.set([hamburger, sound].filter(Boolean), { opacity: 1 })
      return
    }

    // Logo swap: intro "C" lands on top, then we reveal nav logo
    const onLogoMoved = () => {
      if (monoEl) gsap.set(monoEl, { opacity: 1 })
      if (titleEl) gsap.set(titleEl, { opacity: 1 })
    }

    // Hamburger + sound fade in at t=0.85 of exit timeline
    const onNavControls = () => {
      gsap.to([hamburger, sound].filter(Boolean), {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    window.addEventListener('intro:logoMoved', onLogoMoved)
    window.addEventListener('intro:navControls', onNavControls)
    return () => {
      window.removeEventListener('intro:logoMoved', onLogoMoved)
      window.removeEventListener('intro:navControls', onNavControls)
    }
  }, [])

  const handleLogoClick = () => {
    if (pathname !== '/') {
      close()
    }
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Hamburger — left */}
      <button
        data-nav-hamburger
        aria-label="Menu"
        className="text-white"
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          opacity: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <span style={{ display: 'block', width: '18px', height: '1px', background: '#fff' }} />
        <span style={{ display: 'block', width: '18px', height: '1px', background: '#fff' }} />
      </button>

      {/* Center logo — clickable, navigates to home */}
      <button
        onClick={handleLogoClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: pathname !== '/' ? 'pointer' : 'default',
          padding: 0,
        }}
      >
        <span
          data-nav-monogram
          className="text-white select-none"
          style={{ fontSize: '14px', fontWeight: 200, opacity: introComplete ? 1 : 0 }}
        >
          C
        </span>
        <span
          data-nav-title
          className="text-white uppercase select-none"
          style={{
            fontSize: '11px',
            fontWeight: 200,
            letterSpacing: '0.3em',
            opacity: introComplete ? 1 : 0,
          }}
        >
          Constanza Schwartz
        </span>
      </button>

      {/* Sound toggle — right */}
      <button
        data-nav-sound
        aria-label="Toggle sound"
        className="text-white"
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          opacity: 0,
          cursor: 'pointer',
          fontSize: '10px',
          letterSpacing: '0.15em',
          fontWeight: 200,
        }}
      >
        SOUND
      </button>
    </nav>
  )
}
