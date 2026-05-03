'use client'

import { useRef, useMemo } from 'react'
import { useParallax } from '@/src/hooks/useParallax'
import { VideoPlayer } from '@/src/components/media/VideoPlayer'
import { MARQUEE } from '@/src/motion/tokens'

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
    paddingBottom?: string
  }
  sectionId?: string
  layerIndex?: number
  children?: React.ReactNode
}

function MarqueeContent({ content, duration }: { content: string; duration: number }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration * MARQUEE.setRepeat}s` }}
      >
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="marquee-set">
            {Array.from({ length: MARQUEE.setRepeat }, (_, i) => (
              <span key={i} className="marquee-item">{content}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ParallaxLayer({ layer, position, sectionId, layerIndex = 0, children }: ParallaxLayerProps) {
  // Outer ref — scroll parallax transforms apply to the position container so the whole layer floats
  const outerRef = useRef<HTMLDivElement>(null)
  const isMarquee = layer.type === 'marquee'

  const defaultSpeed = layer.type === 'image' ? 0.3 : 0
  const speed = layer.speed !== undefined ? layer.speed : defaultSpeed
  const { axis = 'y', intensity = 60 } = layer
  const marqueeHeight = position.height || '72px'
  const isStickyMarquee = isMarquee && !position.top

  useParallax(
    isStickyMarquee ? ({ current: null } as unknown as React.RefObject<HTMLElement>) : outerRef as React.RefObject<HTMLElement>,
    { speed, axis, intensity }
  )

  // ─── OUTER: position container (scroll parallax transform applied here) ───
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
      willChange: speed !== 0 ? 'transform' : undefined,
    }

  // ─── INNER: content wrapper (no parallax transforms) ───
  const innerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
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
            }}
          >
            {layer.content}
          </div>
        )
      case 'marquee':
        return <MarqueeContent content={layer.content} duration={layer.intensity ?? MARQUEE.speed.medium} />
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
      ref={isStickyMarquee ? undefined : outerRef}
      style={positionStyle}
      className={layer.className}
      data-project-image={layer.isHero ? true : undefined}
    >
      <div style={innerStyle}>
        {children || renderedContent}
      </div>
    </div>
  )
}
