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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#fff',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
