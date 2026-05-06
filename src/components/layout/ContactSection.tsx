'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CloseIcon } from '@/src/components/icons/CloseIcon'
import { DURATION, EASE } from '@/src/motion/tokens'
import { ContactVertical } from '@/src/components/svgs/ContactVertical'
import { ContactHorizontal } from '@/src/components/svgs/ContactHorizontal'

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
      document.body.style.overflow = 'hidden'
      gsap.to(overlayRef.current, { opacity: 1, visibility: 'visible', duration: DURATION.md, ease: EASE.out })
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.lg, delay: 0.2, ease: EASE.soft }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlayRef.current, { opacity: 0, visibility: 'hidden', duration: DURATION.md, ease: 'power2.in' })
    }
  }, [isOpen])

  return (
    <div ref={overlayRef} className="cs-overlay">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <video autoPlay loop muted playsInline className="cs-video">
        <source src="/project5/04-azclip1.mp4" type="video/mp4" />
      </video>

      <button onClick={onClose} className="cs-close" aria-label="Close contact">
        <CloseIcon size={24} color="#fff" />
      </button>

      <div ref={contentRef} className="cs-root">
        <ContactVertical className="cs-svg cs-svg--vert" />
        <ContactHorizontal className="cs-svg cs-svg--horiz" />

        {/* E-MAIL row */}
        <div className="cs-row cs-row--email">
          <span className="cs-label">E-MAIL</span>
          <a href="mailto:contact@constanzaschwartz.com" className="cs-value">
            contact@constanzaschwartz.com
          </a>
        </div>

        {/* IG row */}
        <div className="cs-row cs-row--ig">
          <span className="cs-label">IG</span>
          <a
            href="https://www.instagram.com/constanza.schwartz/"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-value cs-value--link"
          >
            @constanza.schwartz
          </a>
        </div>
      </div>
    </div>
  )
}

const CSS = `
.cs-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #000;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
}

.cs-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.cs-close {
  position: absolute;
  top: 40px;
  right: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 0;
}

/* ── Content root ────────────────────────────────────────────── */
.cs-root {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* ── SVG decorations ─────────────────────────────────────────── */
.cs-svg {
  position: absolute;
  pointer-events: none;
}

.cs-svg--vert {
  top: 0;
  right: 0;
  height: 100%;
  width: 28.47%;
}

.cs-svg--horiz {
  bottom: 0;
  left: 0;
  width: 62.43%;
  height: 45.56%;
}

/* ── Rows ────────────────────────────────────────────────────── */
.cs-row {
  position: absolute;
  left: 4.17%;
  right: 4.17%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 56px;
  line-height: 1;
  letter-spacing: 0;
  color: #fff;
}

.cs-row--email { top: 31.3%; }
.cs-row--ig    { top: 82%; }

/* ── Labels / Values ─────────────────────────────────────────── */
.cs-label {
  text-transform: uppercase;
  white-space: nowrap;
  font-size: inherit;
}

.cs-value {
  text-decoration: none;
  color: #fff;
  text-transform: lowercase;
  text-align: right;
  font-size: inherit;
}

.cs-value--link {
  text-decoration: underline;
  text-underline-offset: 6px;
}

/* ── Mobile ──────────────────────────────────────────────────── */
@media (max-width: 1023px) {
  .cs-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: clamp(24px, 6.4vw, 40px);
    right: auto;
    width: 50%;
  }

  .cs-value { text-align: left; }

  .cs-row--email { top: 38%; }
  .cs-row--ig    { top: calc(38% + 194px); }

  .cs-svg--vert {
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    bottom: auto;
    height: 85%;
    aspect-ratio: 410 / 899;
  }

  .cs-svg--horiz {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    top: auto;
    right: auto;
    width: 100%;
    aspect-ratio: 899 / 410;
  }

  .cs-close {
    top: 20px;
    right: 20px;
  }
}
`
