'use client'

import { useEffect, useState } from 'react'
import { ParallaxSection } from '@/src/components/parallax/ParallaxSection'
import { ParallaxLayer } from '@/src/components/parallax/ParallaxLayer'
import { VideoPlayer } from '@/src/components/media/VideoPlayer'
import { OffsetLayout } from '@/src/components/parallax/sections/OffsetLayout'
import { OverlayComposition } from '@/src/components/parallax/sections/OverlayComposition'
import type { ParallaxConfig, Section, Layer } from '@/src/types/parallax'

export type { ParallaxConfig, Section, Layer } from '@/src/types/parallax'

interface ProjectPageProps {
  parallaxConfig: ParallaxConfig
}

function hasMarqueeLayer(layers: Layer[]): boolean {
  return layers.some((l) => l.type === 'marquee')
}

function renderStandardSection(section: Section) {
  return section.layers.map((layer, layerIndex) => (
    <ParallaxLayer
      key={`${section.id}-layer-${layerIndex}`}
      layer={layer as any}
      sectionId={section.id}
      layerIndex={layerIndex}
      position={{
        top: layer.position?.top || '0',
        left: layer.position?.left || '0',
        width: layer.position?.width || '100%',
        height: layer.position?.height || '100%',
        zIndex: layer.position?.zIndex || layerIndex + 1,
      }}
    />
  ))
}

function renderOffsetSection(section: Section) {
  const [left, right] = section.layers
  if (!left || !right) return renderStandardSection(section)

  const renderMedia = (layer: Layer, index: number) => {
    if (layer.type === 'video') {
      return (
        <VideoPlayer
          id={`${section.id}-video-${index}`}
          src={layer.src || ''}
          autoPlay={layer.autoPlay ?? true}
          loop={layer.loop ?? true}
          subtitle={layer.subtitle}
          style={{ width: '100%', height: '100%' }}
        />
      )
    }
    return (
      <img
        src={layer.src || ''}
        alt={layer.alt || ''}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )
  }

  return (
    <OffsetLayout variant={section.variant}>
      {[renderMedia(left, 0), renderMedia(right, 1)]}
    </OffsetLayout>
  )
}

function renderFullwidthVideo(section: Section) {
  const layer = section.layers[0]
  if (!layer || layer.type !== 'video') return renderStandardSection(section)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
    }}>
      <VideoPlayer
        id={`${section.id}-video-0`}
        src={layer.src || ''}
        autoPlay={layer.autoPlay ?? true}
        loop={layer.loop ?? false}
        style={{
          width: '100%',
          aspectRatio: '21/9',
          maxHeight: '100%',
        }}
      />
    </div>
  )
}

function renderCarouselSection(section: Section) {
  const images = section.layers.filter((l) => l.type === 'image' && l.src)
  const doubled = [...images, ...images]
  const totalWidth = images.length * 588

  return (
    <div style={{ width: '100%', height: '331px', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes cs-carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          animation: `cs-carousel-scroll ${images.length * 3.5}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((layer, i) => (
          <div key={i} style={{ width: '588px', height: '331px', flexShrink: 0 }}>
            <img
              src={layer.src}
              alt={layer.alt || ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function renderOverlaySection(section: Section) {
  const smallLayer = section.layers[0]
  const largeLayer = section.layers.find((_, i) => i > 0 && section.layers[i].type === 'video') || section.layers[1]
  if (!smallLayer || !largeLayer) return renderStandardSection(section)

  const subtitleLayer = section.layers.find((l) => l.type === 'text')

  return (
    <OverlayComposition
      subtitle={subtitleLayer?.content}
      smallContent={
        <VideoPlayer
          id={`${section.id}-video-small`}
          src={smallLayer.src || ''}
          autoPlay={smallLayer.autoPlay ?? true}
          loop={smallLayer.loop ?? true}
          style={{ width: '100%', height: '100%' }}
        />
      }
      largeContent={
        <VideoPlayer
          id={`${section.id}-video-large`}
          src={largeLayer.src || ''}
          autoPlay={largeLayer.autoPlay ?? true}
          loop={largeLayer.loop ?? true}
          style={{ width: '100%', height: '100%' }}
        />
      }
    />
  )
}

export function ProjectPage({ parallaxConfig }: ProjectPageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ minHeight: '100vh' }} />
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {parallaxConfig.sections.map((section) => {
        const sectionType = section.type || 'standard'
        const disableOverflow = hasMarqueeLayer(section.layers)

        let content
        switch (sectionType) {
          case 'offset':
            content = renderOffsetSection(section)
            break
          case 'fullwidth-video':
            content = renderFullwidthVideo(section)
            break
          case 'overlay':
            content = renderOverlaySection(section)
            break
          case 'carousel':
            content = renderCarouselSection(section)
            break
          default:
            content = renderStandardSection(section)
        }

        return (
          <ParallaxSection
            key={section.id}
            id={section.id}
            overflowHidden={!disableOverflow}
            style={{
              ...(section.height ? { height: section.height } : {}),
              minHeight: section.minHeight || '100vh',
              ...(section.backgroundColor ? { backgroundColor: section.backgroundColor } : {}),
            }}
          >
            {content}
          </ParallaxSection>
        )
      })}
    </div>
  )
}

