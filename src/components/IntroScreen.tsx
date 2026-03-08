'use client'

import { forwardRef, useRef } from 'react'
import { useGsapIntro } from '@/src/hooks/useGsapIntro'

interface IntroScreenProps {
  onComplete: () => void
}

export const IntroScreen = forwardRef<HTMLDivElement, IntroScreenProps>(
  function IntroScreen({ onComplete }, ref) {
    const internalRef = useRef<HTMLDivElement>(null)
    useGsapIntro(internalRef, onComplete)
    return (
      <>
        <div
          ref={(node) => {
            internalRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          data-intro
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000',
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <span
              data-intro-monogram
              className="text-white select-none"
              style={{ fontSize: '32px', fontWeight: 200, opacity: 0 }}
            >
              C
            </span>

            <h1
              data-intro-title
              className="text-white uppercase select-none"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                letterSpacing: '0.3em',
                opacity: 0,
                transform: 'scale(0)',
              }}
            >
              Constanza Schwartz
            </h1>

            <div
              data-intro-line
              style={{
                width: '60px',
                height: '1px',
                background: 'white',
                opacity: 0.3,
                transform: 'scaleX(0)',
                transformOrigin: 'left center',
              }}
            />
          </div>

          <span
            data-intro-scroll
            className="absolute bottom-12 text-white uppercase select-none"
            style={{
              fontSize: '9px',
              letterSpacing: '0.25em',
              opacity: 0,
              transform: 'scale(0)',
            }}
          >
            Scroll down
          </span>
        </div>
        <div style={{ height: '200vh' }} aria-hidden="true" />
      </>
    )
  }
)
