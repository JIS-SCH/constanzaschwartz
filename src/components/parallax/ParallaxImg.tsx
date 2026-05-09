import { useRef, useState, useEffect } from 'react'
import { useParallax } from '@/src/hooks/useParallax'
import { PARALLAX } from '@/src/motion/tokens'

interface ParallaxImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  speed?: number
  intensity?: number
}

export function PI({ 
  speed = PARALLAX.speed.standard, 
  intensity, 
  style, 
  ...rest 
}: ParallaxImgProps) {
  const [currentIntensity, setCurrentIntensity] = useState<number>(PARALLAX.intensity.desktop)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    setCurrentIntensity(intensity ?? (isMobile ? PARALLAX.intensity.mobile : PARALLAX.intensity.desktop))
  }, [intensity])

  useParallax(ref as React.RefObject<HTMLElement>, { speed, intensity: currentIntensity })
  
  return (
    <img
      ref={ref}
      style={{ ...style, willChange: speed !== 0 ? 'transform' : undefined }}
      {...rest}
    />
  )
}
