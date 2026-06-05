'use client'

import { useEffect, useRef, useState } from 'react'
import { CAROUSEL } from '@/src/motion/tokens'
import { LQIP } from '@/src/data/lqip'

export type CarouselImage = string | { src: string; alt?: string }

interface CarouselProps {
  /** Unique image set. The strip is doubled internally for a seamless loop. */
  images: CarouselImage[]
  /** Strip height. Accepts any CSS length (px, var(), …). Default 333px. */
  height?: string
  /** Fixed item width in px → cover-mode tiles (zero CLS). Omit for natural-aspect items. */
  itemWidth?: number
  /** Seconds per image; total duration = uniqueCount * durationPerImage. */
  durationPerImage?: number
  /** Placeholder aspect ratio (w/h) reserved for natural items lacking an LQIP. */
  placeholderRatio?: number
  /** Skip lazy-loading: request images immediately (use on the first/above-the-fold carousel). */
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}

function normalize(img: CarouselImage): { src: string; alt: string } {
  return typeof img === 'string'
    ? { src: img, alt: '' }
    : { src: img.src, alt: img.alt ?? '' }
}

/** Look up the LQIP for a src by its URL pathname (base-agnostic). */
function lqipFor(src: string): string | undefined {
  try {
    return LQIP[new URL(src).pathname]
  } catch {
    return LQIP[src]
  }
}

function CarouselItem({
  src,
  alt,
  height,
  itemWidth,
  placeholderRatio,
  eager,
}: {
  src: string
  alt: string
  height: string
  itemWidth?: number
  placeholderRatio: number
  /** Only request the full image once the carousel is near the viewport. */
  eager: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const cover = itemWidth != null
  const blur = lqipFor(src)
  // Numeric height (e.g. "333px" → 333) for the intrinsic-size attribute and the
  // explicit placeholder width fallback. NaN for CSS vars → omitted.
  const heightPx = Number.parseInt(height, 10)
  const heightAttr = Number.isFinite(heightPx) ? heightPx : undefined

  // Box width:
  // - cover mode: fixed itemWidth.
  // - natural + LQIP: the blurred <img> drives the width via its real aspect ratio
  //   (correct from the first frame → strip has width → motion is visible immediately,
  //   and no snap when the full image swaps in since the aspect matches).
  // - natural without LQIP: explicit px (height × ratio) so the strip never collapses
  //   to zero width on cold load; falls back to aspect-ratio if height is a CSS var.
  const boxWidth: React.CSSProperties = cover
    ? { width: `${itemWidth}px` }
    : blur
      ? {}
      : loaded
        ? { width: 'auto' }
        : Number.isFinite(heightPx)
          ? { width: `${Math.round(heightPx * placeholderRatio)}px` }
          : { aspectRatio: String(placeholderRatio) }

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        flexShrink: 0,
        overflow: 'hidden',
        background: '#0a0a0a',
        ...boxWidth,
      }}
    >
      {blur ? (
        cover ? (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${blur})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px)',
              transform: 'scale(1.1)',
            }}
          />
        ) : (
          // In-flow blurred image sets the box width via the real aspect ratio.
          <img
            aria-hidden
            src={blur}
            alt=""
            style={{ height: '100%', width: 'auto', objectFit: 'cover', display: 'block', filter: 'blur(8px)', transform: 'scale(1.04)' }}
          />
        )
      ) : (
        !loaded && <span className="carousel-skeleton" aria-hidden />
      )}

      {eager && (
        <img
          src={src}
          alt={alt}
          width={cover ? itemWidth : heightAttr ? Math.round((heightAttr) * placeholderRatio) : undefined}
          height={heightAttr}
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            // Overlay the LQIP exactly in natural mode; fill the fixed box in cover mode.
            position: blur && !cover ? 'absolute' : (cover ? 'absolute' : 'static'),
            inset: (blur && !cover) || cover ? 0 : undefined,
            height: '100%',
            width: cover ? '100%' : (blur ? '100%' : 'auto'),
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}
    </div>
  )
}

/**
 * Auto-scrolling (marquee-style) infinite carousel shared across all projects.
 *
 * Performance / UX behaviour:
 * - Each item shows a tiny blurred LQIP instantly (real aspect ratio → the strip
 *   has width and visibly scrolls from the first frame; the full image fades in on
 *   decode). No black flash, no "frozen" cold-load look.
 * - Section-level lazy load: full-image requests are deferred until the carousel
 *   nears the viewport via IntersectionObserver (large rootMargin), unless
 *   `priority` is set (first/above-the-fold carousel loads immediately).
 */
export function Carousel({
  images,
  height = '333px',
  itemWidth,
  durationPerImage = CAROUSEL.durationPerImage,
  placeholderRatio = 1.4,
  priority = false,
  className,
  style,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(priority)

  useEffect(() => {
    if (priority) return
    const el = containerRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '800px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [priority])

  const items = images.map(normalize)
  const doubled = [...items, ...items]
  const duration = items.length * durationPerImage

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height, overflow: 'hidden', ...style }}
    >
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: 'max-content',
          willChange: 'transform',
          WebkitAnimation: `carousel-scroll ${duration}s linear infinite`,
          animation: `carousel-scroll ${duration}s linear infinite`,
        }}
      >
        {doubled.map((it, i) => (
          <CarouselItem
            key={i}
            src={it.src}
            alt={it.alt}
            height={height}
            itemWidth={itemWidth}
            placeholderRatio={placeholderRatio}
            eager={inView}
          />
        ))}
      </div>
    </div>
  )
}
