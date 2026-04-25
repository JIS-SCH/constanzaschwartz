'use client'

import { useEffect, useRef, useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { cldImg } from '@/src/utils/cloudinary'

// Sub-items split into rows matching Figma layout
const SUB_ROWS = [
  ['MÁS ALLÁ DEL INFINITO', 'DESIGN WEEK MEXICO', 'MUTEK'],
  ['ATRIO (NAMING WIP)', 'SILVESTRE Y LA NARANJA "ALTEREGO"'],
]

const MENU_ITEMS = ['PROJECTS', 'PROFILE', 'CONTACT'] as const

interface NavMenuProps {
  isOpen: boolean
  onContactClick: () => void
  onClose: () => void
}

const SUB_ITEM_MAPPING: Record<string, string> = {
  'MÁS ALLÁ DEL INFINITO': 'mas-alla-del-infinito',
  'DESIGN WEEK MEXICO': 'design-week-mexico',
  'MUTEK': 'mutek',
  'ATRIO (NAMING WIP)': 'eco-al-infinito',
  'SILVESTRE Y LA NARANJA "ALTEREGO"': 'silvestre-y-la-naranja-alterego',
}

export function NavMenu({ isOpen, onContactClick, onClose }: NavMenuProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemWrappers = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const wrappers = itemWrappers.current.filter(Boolean) as HTMLDivElement[]
    if (!overlay) return

    if (tlRef.current) tlRef.current.kill()

    if (isOpen) {
      setHoveredItem(null)
      gsap.set(overlay, { visibility: 'visible', pointerEvents: 'auto' })

      tlRef.current = gsap.timeline()
      tlRef.current
        .fromTo(
          overlay,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'power3.inOut' }
        )
        .fromTo(
          wrappers,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' },
          '-=0.2'
        )
    } else {
      tlRef.current = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden', pointerEvents: 'none' })
          gsap.set(wrappers, { yPercent: 110 })
        },
      })
      tlRef.current
        .to(wrappers, {
          yPercent: -110,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.in',
        })
        .to(
          overlay,
          { clipPath: 'inset(0% 0 100% 0)', duration: 0.5, ease: 'power3.inOut' },
          '-=0.3'
        )
    }
  }, [isOpen])

  const projectsOpen = hoveredItem === 'PROJECTS'

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        visibility: 'hidden',
        pointerEvents: 'none',
        clipPath: 'inset(100% 0 0 0)',
      }}
    >
      <Image
        src={cldImg('CONSTANZA-SCHWARTZ_WEBSITE_BACKGROUND_xrkjoh')}
        alt=""
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />

      {/* Centered container — 1163px max-width matching Figma */}
      <nav
        aria-label="Main navigation"
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1163px',
          margin: '0 auto',
          gap: '0',
        }}
      >
        {MENU_ITEMS.map((item, i) => (
          <div
            key={item}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{ width: '100%', textAlign: 'center' }}
          >
            {/* Label with clip-based wipe animation */}
            <div style={{ overflow: 'hidden' }}>
              <div ref={(el) => { itemWrappers.current[i] = el }}>
                <button
                  onClick={() => {
                    if (item === 'CONTACT') {
                      onContactClick()
                    } else if (item === 'PROFILE') {
                      onClose()
                      router.push('/profile')
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: hoveredItem === item ? '#FFDF00' : '#fff',
                    fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                    fontWeight: 100,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    lineHeight: 1.05,
                    textTransform: 'uppercase',
                    opacity: hoveredItem !== null && hoveredItem !== item ? 0.2 : 1,
                    transition: 'opacity 0.25s ease, color 0.25s ease',
                    display: 'block',
                    width: '100%',
                  }}
                >
                  {item}
                </button>
              </div>
            </div>

            {/* Sub-items for PROJECTS — 2 rows, gap: 26px, items gap: 10px */}
            {item === 'PROJECTS' && (
              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: projectsOpen ? '120px' : '0',
                  transition: 'max-height 0.25s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '26px',
                    padding: '4px 0 8px',
                  }}
                >
                  {SUB_ROWS.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '29px',
                        // Staggered wipe-up per row
                        transform: projectsOpen ? 'translateY(0%)' : 'translateY(110%)',
                        transition: `transform 0.3s ease ${rowIdx * 0.07 + 0.05}s`,
                      }}
                    >
                      {row.map((sub, subIdx) => (
                        <Fragment key={sub}>
                          <span
                            onClick={() => {
                              const slug = SUB_ITEM_MAPPING[sub]
                              if (slug) {
                                onClose()
                                router.push(`/project/${slug}`)
                              }
                            }}
                            style={{
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 300,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFDF00')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                          >
                            {sub}
                          </span>
                          {subIdx < row.length - 1 && (
                            <span
                              key={`sep-${subIdx}`}
                              style={{ color: '#fff', opacity: 0.4, fontSize: '16px' }}
                            >
                              |
                            </span>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
