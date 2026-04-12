'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CloseIcon } from '@/src/components/icons/CloseIcon'

interface ContactSectionProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactSection({ isOpen, onClose }: ContactSectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current) return

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.5,
        ease: 'power2.out'
      })
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [isOpen])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        visibility: 'hidden',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
        }}
      >
        <source src="/project5/04-azclip1.mp4" type="video/mp4" />
      </video>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <CloseIcon size={24} color="#fff" />
      </button>

      {/* Content */}
      <div 
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.2em', width: '200px' }}>E-MAIL</span>
          <a 
            href="mailto:contact@constanzaschwartz.com"
            style={{ 
              color: '#fff', 
              fontSize: 'clamp(1.5rem, 4vw, 3rem)', 
              fontWeight: 200, 
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            contact@constanzaschwartz.com
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.2em', width: '200px' }}>IG</span>
          <a 
            href="https://instagram.com/constanza.schwartz"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#fff', 
              fontSize: 'clamp(1.5rem, 4vw, 3rem)', 
              fontWeight: 200, 
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            @constanza.schwartz
          </a>
        </div>
      </div>
    </div>
  )
}
