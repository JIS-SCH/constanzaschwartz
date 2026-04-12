'use client'

import type { ReactNode } from 'react'

interface OffsetLayoutProps {
  children: [ReactNode, ReactNode]
  variant?: 'default' | 'inverted'
  className?: string
  style?: React.CSSProperties
}

export function OffsetLayout({
  children,
  variant = 'default',
  className,
  style,
}: OffsetLayoutProps) {
  const isDefault = variant === 'default'

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {/* Left block */}
      <div
        data-parallax-item
        style={{
          position: 'absolute',
          top: isDefault ? '30%' : '8%',
          left: '8%',
          width: '42%',
          height: '55%',
        }}
      >
        {children[0]}
      </div>

      {/* Right block */}
      <div
        data-parallax-item
        style={{
          position: 'absolute',
          top: isDefault ? '8%' : '30%',
          right: '8%',
          width: '37%',
          height: '50%',
        }}
      >
        {children[1]}
      </div>
    </div>
  )
}
