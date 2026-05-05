'use client'

import { useRef, type ReactNode, type CSSProperties } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  id?: string
  className?: string
  style?: CSSProperties
  triggerStart?: string
  triggerEnd?: string
  overflowHidden?: boolean
}

export function ParallaxSection({
  children,
  id,
  className = '',
  style = {},
  overflowHidden = false,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        overflow: overflowHidden ? 'hidden' : 'visible',
        ...style,
      }}
    >
      {children}
    </section>
  )
}
