'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useParallax } from '@/src/hooks/useParallax'
import { useParallaxBg } from '@/src/hooks/useParallaxBg'
import { useParallaxFloat } from '@/src/hooks/useParallaxFloat'
import { VideoPlayer } from '@/src/components/media/VideoPlayer'
import { MARQUEE, PARALLAX } from '@/src/motion/tokens'
import type { ParallaxEffect } from '@/src/types/parallax'

export type { ParallaxEffect } from '@/src/types/parallax'
export type LayerType = 'image' | 'video' | 'text' | 'marquee' | 'credits'

export interface BaseLayerProps {
  type: LayerType
  speed?: number
  effect?: ParallaxEffect
  axis?: 'y' | 'x'
  intensity?: number
  className?: string
  isHero?: boolean
  floatAmplitude?: number
  floatFrequency?: number
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
  const outerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLElement>(null)
  const isMarquee = layer.type === 'marquee'
  const isImage = layer.type === 'image'
  const isVideo = layer.type === 'video'
  const isMedia = isImage || isVideo
  const effect = layer.effect || 'inner'
  const isHero = layer.isHero === true

  const speed = layer.speed !== undefined ? layer.speed : PARALLAX.speed.standard
  const { axis = 'y', intensity = PARALLAX.intensity.desktop } = layer
  const marqueeHeight = position.height || '72px'
  const isStickyMarquee = isMarquee && !position.top
  const objectFit = isImage ? (layer.objectFit || 'cover') : undefined
  const isContain = objectFit === 'contain'

  // STANDARDIZED MEDIA PARALLAX
  // All images/videos use the same speed factor regardless of what the layer prop passes.
  // Travel scales with the frame's actual height so visual intensity feels uniform on
  // small thumbnails AND large hero crops. Pass speed:0 explicitly to anchor a layer
  // (e.g. stacked grids that should not drift apart).
  const isMediaParallax = isMedia && !isHero && !isContain && (effect === 'inner' || effect === 'viewport') && speed !== 0
  const STANDARD = PARALLAX.speed.standard
  const BLEED_RATIO = STANDARD * 0.5 * 1.15
  const bleedPct = BLEED_RATIO * 100

  const [frameHeight, setFrameHeight] = useState(0)
  useEffect(() => {
    const frame = outerRef.current
    if (!frame || !isMediaParallax) return
    const measure = () => setFrameHeight(frame.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(frame)
    return () => ro.disconnect()
  }, [isMediaParallax])

  const moveMedia = isMediaParallax && frameHeight > 0
  const moveOuter = effect === 'inner' && !isMedia && !isStickyMarquee && speed !== 0

  useParallax(mediaRef, {
    speed: moveMedia ? STANDARD : 0,
    axis,
    intensity: moveMedia ? frameHeight * 0.5 : 0,
    triggerRef: outerRef,
  })

  useParallax(outerRef, {
    speed: moveOuter ? speed : 0,
    axis,
    intensity,
  })

  if (effect === 'bg') {
    useParallaxBg(outerRef)
  }

  if (effect === 'float') {
    useParallaxFloat(outerRef, {
      amplitude: layer.floatAmplitude ?? 12,
      frequency: layer.floatFrequency ?? 0.5,
      axis,
      phaseOffset: (position.zIndex || 0) * 0.3,
    })
  }

  const needsClip = isMedia || effect === 'bg'
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
      overflow: needsClip ? 'hidden' : undefined,
    }

  const innerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
  }

  const mediaBleedStyle: React.CSSProperties = isMediaParallax
    ? {
      width: '100%',
      height: `${100 + bleedPct * 2}%`,
      marginTop: `-${bleedPct}%`,
      willChange: 'transform',
    }
    : {
      width: '100%',
      height: '100%',
    }

  const imageStyle: React.CSSProperties = isImage
    ? {
      ...mediaBleedStyle,
      objectFit,
      display: 'block',
    }
    : {}

  const renderedContent = useMemo(() => {
    switch (layer.type) {
      case 'image':
        return (
          <img
            ref={mediaRef as React.RefObject<HTMLImageElement>}
            src={layer.src}
            alt={layer.alt || ''}
            loading={isHero ? 'eager' : 'lazy'}
            decoding="async"
            style={imageStyle}
          />
        )
      case 'video':
        return (
          <div ref={mediaRef as React.RefObject<HTMLDivElement>} style={mediaBleedStyle}>
            <VideoPlayer
              id={`${sectionId || 'section'}-video-${layerIndex}`}
              src={layer.src}
              autoPlay={layer.autoPlay ?? true}
              loop={layer.loop ?? true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
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
  }, [layer, isHero, imageStyle])

  return (
    <div
      ref={isStickyMarquee ? undefined : outerRef}
      style={positionStyle}
      className={layer.className}
      data-project-image={isHero ? true : undefined}
    >
      <div style={innerStyle}>
        {children || renderedContent}
      </div>
    </div>
  )
}
