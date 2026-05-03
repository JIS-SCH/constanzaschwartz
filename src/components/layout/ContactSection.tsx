'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CloseIcon } from '@/src/components/icons/CloseIcon'
import { DURATION, EASE } from '@/src/motion/tokens'

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
        {/* Right-side vertical arc */}
        <svg
          className="cs-svg cs-svg--vert"
          viewBox="0 0 410 899"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M184.409 896.284C184.322 896.218 184.198 896.126 184.041 896.006C183.692 895.74 183.174 895.342 182.499 894.813C181.148 893.756 179.167 892.175 176.646 890.084C171.602 885.901 164.396 879.672 155.749 871.492C138.455 855.131 115.394 830.963 92.335 799.734C46.2156 737.275 0.0996094 646.577 0.0996094 533.613C0.0996177 420.608 46.2157 329.89 92.335 267.421C115.394 236.186 138.455 212.015 155.749 195.653C164.396 187.472 171.602 181.244 176.646 177.06C179.167 174.969 181.148 173.388 182.499 172.331C183.174 171.802 183.692 171.405 184.041 171.139C184.199 171.019 184.322 170.925 184.409 170.859V896.284Z" stroke="white" strokeWidth="0.2"/>
          <path d="M409.901 898.84H184.831C184.916 898.781 185.021 898.709 185.145 898.623C185.527 898.357 186.093 897.958 186.833 897.429C188.312 896.37 190.482 894.789 193.243 892.696C198.765 888.511 206.653 882.28 216.118 874.097C235.048 857.73 260.289 833.552 285.529 802.312C336.009 739.831 386.494 649.092 386.494 536.069C386.494 429.732 353.001 361.291 319.513 304.285C286.021 247.273 252.559 201.729 252.559 141.148C252.559 61.66 330.631 0.151159 409.901 0.0996094V898.84Z" stroke="white" strokeWidth="0.2"/>
        </svg>

        {/* Bottom horizontal leaf */}
        <svg
          className="cs-svg cs-svg--horiz"
          viewBox="0 0 899 410"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M2.65723 184.41C2.72309 184.322 2.81566 184.199 2.93555 184.042C3.20118 183.693 3.59939 183.175 4.12794 182.5C5.18513 181.149 6.7659 179.168 8.85743 176.646C13.0405 171.602 19.2689 164.397 27.4492 155.75C43.8101 138.455 67.978 115.395 99.207 92.3355C161.666 46.2162 252.364 0.100118 365.328 0.100114C478.334 0.100117 569.051 46.2162 631.521 92.3355C662.755 115.395 686.926 138.455 703.288 155.75C711.469 164.396 717.698 171.602 721.881 176.646C723.972 179.168 725.553 181.149 726.61 182.5C727.139 183.175 727.536 183.693 727.802 184.042C727.922 184.199 728.016 184.322 728.082 184.41L2.65723 184.41Z" stroke="white" strokeWidth="0.2"/>
          <path d="M0.101572 409.901L0.101563 184.831C0.159989 184.915 0.232106 185.02 0.318359 185.144C0.584495 185.526 0.983635 186.093 1.5127 186.833C2.57096 188.312 4.15236 190.482 6.24512 193.243C10.4306 198.765 16.6613 206.653 24.8447 216.118C41.2118 235.048 65.3895 260.289 96.6299 285.529C159.11 336.009 249.849 386.494 362.872 386.494C469.209 386.494 537.65 353.001 594.656 319.512C651.668 286.02 697.212 252.558 757.793 252.558C837.281 252.558 898.79 330.631 898.842 409.901L0.101572 409.901Z" stroke="white" strokeWidth="0.2"/>
        </svg>

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
  left: 71.53%;
  right: 0;
  bottom: 0;
  width: 28.47%;
  height: 100%;
}

.cs-svg--horiz {
  top: 54.44%;
  left: 0;
  right: 37.57%;
  bottom: 0;
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
  }

  .cs-value { text-align: left; }

  .cs-row--email { top: 25%; }
  .cs-row--ig    { top: 55%; }

  .cs-svg--vert {
    left: 70%;
    width: 30%;
  }

  .cs-svg--horiz {
    top: 65%;
    right: 20%;
    width: 80%;
    height: 35%;
  }

  .cs-close {
    top: 20px;
    right: 20px;
  }
}
`
