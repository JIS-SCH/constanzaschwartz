'use client'

import { useRef } from 'react'
import { useParallax } from '@/src/hooks/useParallax'
import { PARALLAX } from '@/src/motion/tokens'

interface ParallaxImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  speed?: number
  intensity?: number
}

export function PI({ speed = 0.5, intensity = PARALLAX.intensity.mobile, style, ...rest }: ParallaxImgProps) {
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
