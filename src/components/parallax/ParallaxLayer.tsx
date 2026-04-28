'use client'

import { useRef, useMemo } from 'react'
import { useParallax } from '@/src/hooks/useParallax'
import { VideoPlayer } from '@/src/components/media/VideoPlayer'

export type LayerType = 'image' | 'video' | 'text' | 'marquee' | 'credits'

export interface BaseLayerProps {
  type: LayerType
  speed?: number
  axis?: 'y' | 'x'
  intensity?: number
  className?: string
  isHero?: boolean
}

export interface MarqueeLayerProps extends BaseLayerProps {
  type: 'marquee'
  content: string
}

export interface ImageLayerProps extends BaseLayerProps {
  type: 'image'
  src: string
  alt?: string
  objectFit?: 'cover' | 'contain' | 'fill'
}

export interface VideoLayerProps extends BaseLayerProps {
  type: 'video'
  src: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

export interface TextLayerProps extends BaseLayerProps {
  type: 'text'
  content: string
}

export interface CreditsLayerProps extends BaseLayerProps {
  type: 'credits'
  credits: Array<{ role: string; name: string }>
}

export type LayerProps = ImageLayerProps | VideoLayerProps | TextLayerProps | MarqueeLayerProps | CreditsLayerProps

interface ParallaxLayerProps {
  layer: LayerProps
  position: {
    top?: string
    textAlignment?: 'center' | 'left' | 'right'
    left?: string
    right?: string
    bottom?: string
    width?: string
    height?: string
    aspectRatio?: string
    zIndex: number
  }
  sectionId?: string
  layerIndex?: number
  children?: React.ReactNode
}

// Number of text repetitions per set.
// -50% moves exactly one set → seamless loop.
// Each set must be wider than the viewport for the loop to be gap-free.
const MARQUEE_SET_REPEAT = 4

function MarqueeContent({ content, duration }: { content: string; duration: number }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration * MARQUEE_SET_REPEAT}s` }}
      >
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="marquee-set">
            {Array.from({ length: MARQUEE_SET_REPEAT }, (_, i) => (
              <span key={i} className="marquee-item">{content}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ParallaxLayer({ layer, position, sectionId, layerIndex = 0, children }: ParallaxLayerProps) {
  // Inner ref — parallax transforms apply HERE, not on the position container
  const parallaxInnerRef = useRef<HTMLDivElement>(null)
  const isMarquee = layer.type === 'marquee'

  const { speed = 0, axis = 'y', intensity = 60 } = layer
  const marqueeHeight = position.height || '72px'
  const isStickyMarquee = isMarquee && !position.top

  // Only apply parallax to the inner wrapper
  const parallaxRef = isStickyMarquee
    ? ({ current: null } as unknown as React.RefObject<HTMLElement>)
    : (parallaxInnerRef as React.RefObject<HTMLElement>)

  useParallax(parallaxRef, { speed, axis, intensity })

  // ─── OUTER: position container (NEVER transformed by parallax) ───
  const positionStyle: React.CSSProperties = isStickyMarquee
    ? {
      position: 'sticky',
      top: `calc(100vh - ${marqueeHeight})`,
      width: '100%',
      height: marqueeHeight,
      zIndex: position.zIndex ?? 1,
    }
    : {
      position: 'absolute',
      top: position.top,
      left: position.left,
      right: position.right,
      bottom: position.bottom,
      width: position.width,
      height: position.height,
      aspectRatio: position.aspectRatio,
      zIndex: position.zIndex,
    }

  // ─── INNER: parallax wrapper (receives gsap transforms) ───
  const innerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
  }

  // Only hint willChange when parallax is active
  if (speed !== 0) {
    innerStyle.willChange = 'transform'
  }

  // Blend mode for text/marquee/credits layers
  if (layer.type === 'text' || layer.type === 'marquee' || layer.type === 'credits') {
    innerStyle.mixBlendMode = 'difference'
      ; (innerStyle as any).WebkitMixBlendMode = 'difference'
    innerStyle.transform = 'translateZ(0)'
  }

  const renderedContent = useMemo(() => {
    switch (layer.type) {
      case 'image':
        return (
          <img
            src={layer.src}
            alt={layer.alt || ''}
            loading={layer.isHero ? 'eager' : 'lazy'}
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: layer.objectFit || 'cover',
              display: 'block',
            }}
          />
        )
      case 'video':
        return (
          <VideoPlayer
            id={`${sectionId || 'section'}-video-${layerIndex}`}
            src={layer.src}
            autoPlay={layer.autoPlay ?? true}
            loop={layer.loop ?? true}
            style={{ width: '100%', height: '100%' }}
          />
        )
      case 'text':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              whiteSpace: 'nowrap',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 200,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#fff',
              fontSize: 'clamp(1rem, 2.5vw, 3rem)',
              display: 'flex',
              alignItems: 'center',
              mixBlendMode: 'difference',
              ...({ WebkitMixBlendMode: 'difference' } as any),
              transform: 'translateZ(0)',
            }}
          >
            {layer.content}
          </div>
        )
      case 'marquee':
        return <MarqueeContent content={layer.content} duration={layer.intensity ?? 22} />
      case 'credits':
        return (
          <div
            style={{
              width: '100%',
              padding: '0 clamp(20px, 4vw, 60px)',
              color: '#fff',
              fontSize: 'clamp(14px, 1.4vw, 20px)',
              lineHeight: 1.8,
              boxSizing: 'border-box',
              mixBlendMode: 'difference',
              ...({ WebkitMixBlendMode: 'difference' } as any),
              transform: 'translateZ(0)',
            }}
          >
            {layer.credits.map((entry, i) => (
              <span key={i}>
                {i > 0 && <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 300 }}>{' / '}</span>}
                <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>
                  {entry.role}:
                </span>
                <span style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 300 }}>
                  {' '}{entry.name}
                </span>
              </span>
            ))}
          </div>
        )
      default:
        return null
    }
  }, [layer])

  return (
    <div
      style={positionStyle}
      className={layer.className}
      data-project-image={layer.isHero ? true : undefined}
    >
      <div
        ref={isStickyMarquee ? undefined : parallaxInnerRef}
        style={innerStyle}
      >
        {children || renderedContent}
      </div>
    </div>
  )
}
