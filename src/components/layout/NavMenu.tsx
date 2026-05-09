'use client'

import { useEffect, useRef, useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { cldImg } from '@/src/utils/cloudinary'
import { DURATION, EASE, STAGGER } from '@/src/motion/tokens'

const PROJECT_ROWS = [
  [
    { name: 'MÁS ALLÁ DEL INFINITO', slug: 'mas-alla-del-infinito' },
    { name: 'ECO AL INFINITO', slug: 'eco-al-infinito' },
  ],
  [
    { name: 'DESIGN WEEK MEXICO', slug: 'design-week-mexico' },
    { name: 'MUTEK', slug: 'mutek' },
    { name: 'SYLN "ALTEREGO"', slug: 'silvestre-y-la-naranja-alterego' },
  ]
]

const MENU_ITEMS = ['PROJECTS', 'PROFILE', 'CONTACT'] as const

interface NavMenuProps {
  isOpen: boolean
  onContactClick?: () => void
  onClose: () => void
}

export function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemWrappers = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
          { clipPath: 'inset(0% 0 0 0)', duration: DURATION.md, ease: EASE.soft }
        )
        .fromTo(
          wrappers,
          { yPercent: 110 },
          { yPercent: 0, duration: DURATION.xl, stagger: STAGGER.lg, ease: EASE.out },
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
          duration: DURATION.md,
          stagger: STAGGER.sm,
          ease: 'power2.in',
        })
        .to(
          overlay,
          { clipPath: 'inset(0% 0 100% 0)', duration: DURATION.md, ease: EASE.soft },
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

      <nav
        aria-label="Main navigation"
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: isMobile ? '100%' : '1163px',
          margin: '0 auto',
          width: '100%',
          padding: isMobile ? '80px 20px' : '277.5px 0 10px 0',
          overflowY: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `nav::-webkit-scrollbar { display: none; }` }} />
        {MENU_ITEMS.map((item, i) => (
          <div
            key={item}
            onMouseEnter={() => !isMobile && setHoveredItem(item)}
            onMouseLeave={() => !isMobile && setHoveredItem(null)}
            onClick={() => isMobile && (item === 'PROJECTS' ? setHoveredItem(hoveredItem === 'PROJECTS' ? null : 'PROJECTS') : null)}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'stretch',
              position: 'relative',
              marginBottom: isMobile ? '20px' : (item === 'PROJECTS' ? '24px' : item === 'PROFILE' ? '20px' : '0'),
              flexShrink: 0
            }}
          >
            <div
              style={{
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                width: '100%',
                position: 'relative'
              }}
            >
              <div ref={(el) => { itemWrappers.current[i] = el }} style={{ width: '100%' }}>
                <button
                  onClick={() => {
                    if (item === 'CONTACT') {
                      onClose()
                      router.push('/contact')
                    } else if (item === 'PROFILE') {
                      onClose()
                      router.push('/profile')
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: (hoveredItem === item) ? '#FFDF00' : '#FFF',
                    fontSize: isMobile ? '54px' : '128px',
                    fontWeight: 100,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
                    lineHeight: '1.1',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    opacity: hoveredItem !== null && hoveredItem !== item ? 0.2 : 1,
                    transition: 'opacity 0.25s ease, color 0.25s ease',
                    display: 'block',
                    width: '100%',
                    padding: 0
                  }}
                >
                  {item}
                </button>
              </div>
            </div>

            {item === 'PROJECTS' && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: projectsOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '100%',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      paddingTop: isMobile ? '20px' : '0px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      width: '100%',
                      alignItems: 'center',
                      opacity: projectsOpen ? 1 : 0,
                      transform: projectsOpen ? 'translateY(0)' : 'translateY(-4px)',
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                    }}
                  >
                    {isMobile ? (
                      PROJECT_ROWS.flat().map((p) => (
                        <span
                          key={p.slug}
                          onClick={(e) => {
                            e.stopPropagation()
                            onClose()
                            router.push(`/project/${p.slug}`)
                          }}
                          style={{
                            color: '#fff',
                            fontSize: '20px',
                            fontWeight: 100,
                            textTransform: 'uppercase',
                            fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
                            cursor: 'pointer',
                            transition: 'color 0.2s ease',
                            lineHeight: 1,
                            textAlign: 'center',
                            display: 'block',
                            width: '100%',
                            padding: '5px 0',
                          }}
                        >
                          {p.name}
                        </span>
                      ))
                    ) : (
                      PROJECT_ROWS.map((row, rowIdx) => (
                        <div
                          key={rowIdx}
                          style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                          }}
                        >
                          {row.map((p, idx) => (
                            <Fragment key={p.slug}>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onClose()
                                  router.push(`/project/${p.slug}`)
                                }}
                                style={{
                                  color: '#fff',
                                  fontSize: '40px',
                                  fontWeight: 100,
                                  textTransform: 'uppercase',
                                  fontFamily: '"Helvetica Neue LT Std", "Helvetica Neue", Helvetica, Arial, sans-serif',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap',
                                  transition: 'color 0.2s ease',
                                  lineHeight: 1,
                                  textAlign: 'center',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFDF00')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                              >
                                {p.name}
                              </span>
                              {idx < row.length - 1 && (
                                <span style={{
                                  color: '#fff',
                                  opacity: 0.4,
                                  fontSize: '40px',
                                  fontWeight: 100,
                                  fontFamily: '"Helvetica Neue LT Std", sans-serif'
                                }}>|</span>
                              )}
                            </Fragment>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
