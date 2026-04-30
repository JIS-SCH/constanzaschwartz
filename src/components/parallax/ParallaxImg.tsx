'use client'

import { useRef } from 'react'
import { useParallax } from '@/src/hooks/useParallax'

interface ParallaxImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  speed?: number
  intensity?: number
}

const MOBILE_INTENSITY = 60

export function PI({ speed = 0.5, intensity = MOBILE_INTENSITY, style, ...rest }: ParallaxImgProps) {
  const ref = useRef<HTMLImageElement>(null)
  useParallax(ref as React.RefObject<HTMLElement>, { speed, intensity })
  return (
    <img
      ref={ref}
      style={{ ...style, willChange: speed !== 0 ? 'transform' : undefined }}
      {...rest}
    />
  )
}
