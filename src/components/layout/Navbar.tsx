'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { useTransition } from '@/src/contexts/TransitionContext'
import { useAudio } from '@/src/contexts/AudioContext'
import { CloseIcon } from '@/src/components/icons/CloseIcon'
import { WaveformIcon } from '@/src/components/icons/WaveformIcon'

interface NavbarProps {
  menuOpen: boolean
  onMenuToggle: () => void
}

export function Navbar({ menuOpen, onMenuToggle }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { close } = useTransition()
  const { isMuted, toggleMute } = useAudio()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const logo = nav.querySelector<HTMLElement>('[data-nav-logo]')
    const left = nav.querySelector<HTMLElement>('[data-nav-left]')
    const right = nav.querySelector<HTMLElement>('[data-nav-right]')

    if (sessionStorage.getItem('introComplete')) {
      gsap.set([logo, left, right].filter(Boolean), { opacity: 1 })
      return
    }

    const onLogoMoved = () => gsap.set(logo, { opacity: 1 })
    const onNavControls = () => {
      gsap.to([left, right].filter(Boolean), {
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
    if (pathname !== '/') close()
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
        height: '40px',
        padding: '0 21px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Left — MENU / close toggle */}
      <button
        data-nav-left
        onClick={onMenuToggle}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        style={{
          position: 'absolute',
          left: '21px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          opacity: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '24px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            fontFamily: 'HelveticaLTStd, Helvetica Neue, sans-serif',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? 'translateY(4px)' : 'translateY(0)',
          }}
        >
          MENU
        </span>
        <span
          style={{
            position: 'absolute',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(-4px)',
          }}
        >
          <CloseIcon size={14} color="#fff" />
        </span>
      </button>

      {/* Center — logo as file */}
      <button
        data-nav-logo
        onClick={handleLogoClick}
        aria-label="Home"
        style={{
          background: 'none',
          border: 'none',
          cursor: pathname !== '/' ? 'pointer' : 'default',
          padding: 0,
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/CONSTANZA SCHWARTZ_ISOTIPO_white.svg"
          alt="Constanza Schwartz"
          width={13}
          height={28}
          style={{ objectFit: 'contain' }}
          priority
        />
      </button>

      {/* Right — waveform + MUTE/SOUND */}
      <button
        data-nav-right
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
        style={{
          position: 'absolute',
          right: '21px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          opacity: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#fff',
        }}
      >
        <WaveformIcon width={18} color="#fff" />
        <span
          style={{
            fontSize: '10px',
            fontWeight: 200,
            letterSpacing: '0.2em',
            fontFamily: 'HelveticaLTStd, Helvetica Neue, sans-serif',
          }}
        >
          {isMuted ? 'MUTE' : 'SOUND'}
        </span>
      </button>
    </nav>
  )
}
