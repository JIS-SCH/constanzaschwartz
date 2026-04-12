'use client'

import type { ReactNode } from 'react'

interface OverlayCompositionProps {
  smallContent: ReactNode
  largeContent: ReactNode
  subtitle?: string
}

export function OverlayComposition({
  smallContent,
  largeContent,
  subtitle,
}: OverlayCompositionProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Small video — top-left, overlaps large */}
      <div
        style={{
          position: 'absolute',
          top: '5vh',
          left: '5%',
          width: '40%',
          height: '35%',
          zIndex: 2,
        }}
      >
        {smallContent}
        {subtitle && (
          <span
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '16px',
              color: '#FFDF00',
              fontFamily: 'HelveticaLTStd, "Helvetica Neue", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              pointerEvents: 'none',
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      {/* Large video — below-right */}
      <div
        style={{
          position: 'absolute',
          top: '20vh',
          left: '20%',
          width: '80%',
          height: '65%',
          zIndex: 1,
        }}
      >
        {largeContent}
      </div>
    </div>
  )
}
