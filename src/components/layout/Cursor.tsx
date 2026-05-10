'use client'

import { useRef, useEffect } from 'react'
import { useGsapCursor } from '@/src/hooks/useGsapCursor'
import { isMobile } from '@/src/utils/detect'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  useGsapCursor(cursorRef)

  useEffect(() => {
    if (isMobile()) return
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = ''
    }
  }, [])
  return (
    <div
      ref={cursorRef}
      className="blend-difference"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        background: '#fff',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    />
  )
}
