'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { getLenis } from '@/src/scroll/lenis'
import type { GalleryImage } from '@/src/types/parallax'
import { PARALLAX } from '@/src/motion/tokens'

gsap.registerPlugin(ScrollTrigger)

export type { GalleryImage } from '@/src/types/parallax'

interface ParallaxGalleryProps {
  images: GalleryImage[]
}

const SIZE_MAP = {
  sm: 220,
  md: 320,
  lg: 450,
} as const

// Base X position per column (in %)
const X_BASE = {
  left: [5, 10, 8, 12],
  center: [35, 42, 38, 45],
  right: [62, 70, 65, 75],
} as const

function getPositionStyle(img: GalleryImage, index: number, totalImages: number) {
  const width = SIZE_MAP[img.size]
  const columnPositions = X_BASE[img.position]
  const left = columnPositions[index % columnPositions.length]

  // Spread images vertically across the container
  // Each image occupies a slot, plus some top offset for stagger effect
  const slotHeight = 100 / totalImages
  const topOffset = img.position === 'left' ? 2 : img.position === 'right' ? -2 : 0
  const top = slotHeight * index + topOffset

  return {
    position: 'absolute' as const,
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}px`,
    aspectRatio: '3 / 4',
    overflow: 'hidden',
  }
}

export function ParallaxGallery({ images }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Bridge Lenis → GSAP ticker if already initialized (e.g. user came through tunnel)
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
    }
  }, [])

  useGSAP(
    () => {
      imageRefs.current.forEach((el, i) => {
        if (!el || !images[i]) return
        const yAmount = PARALLAX.gallery[images[i].position]

        gsap.fromTo(
          el,
          { y: -yAmount },
          {
            y: yAmount,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })
    },
    { scope: containerRef, dependencies: [images] }
  )

  // Container height: enough room for images + parallax travel
  const containerHeight = Math.max(600, images.length * 350)

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        background: '#000',
        width: '100%',
        height: `${containerHeight}px`,
      }}
    >
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          ref={(el) => {
            imageRefs.current[i] = el
          }}
          style={getPositionStyle(img, i, images.length)}
        >
          <img
            src={img.src}
            alt={img.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      ))}
    </div>
  )
}
