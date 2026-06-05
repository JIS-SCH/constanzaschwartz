'use client'

/**
 * Self-activating wheel-scroll fallback.
 *
 * On some Chromium builds (observed on macOS 26 + Chrome bleeding-edge) the
 * browser stops translating wheel events into native scroll on heavy pages,
 * even though the scroll chain is healthy, nothing calls preventDefault, and
 * programmatic scroll (window.scrollBy) works perfectly. Keyboard scroll still
 * works; only the wheel/trackpad dies.
 *
 * This component does NOTHING on healthy browsers. It listens to the wheel
 * passively and only watches: did a wheel event fire, with room to scroll in
 * that direction, yet scrollY did not move? If that happens a couple of times,
 * it concludes native wheel-scroll is broken for this session and takes over,
 * driving the scroll manually from the wheel. Native momentum is preserved
 * everywhere the bug is absent because the driver never attaches there.
 */

import { useEffect } from 'react'

export function WheelScrollFix() {
  useEffect(() => {
    let active = false
    let brokenHits = 0

    const maxScroll = () =>
      document.documentElement.scrollHeight - document.documentElement.clientHeight

    const deltaPx = (e: WheelEvent) => {
      const mult = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      return { x: e.deltaX * mult, y: e.deltaY * mult }
    }

    // Detector — passive, never blocks anything.
    const detect = (e: WheelEvent) => {
      if (active || e.deltaY === 0) return
      const before = window.scrollY
      const hasRoom = e.deltaY > 0 ? before < maxScroll() - 1 : before > 1
      if (!hasRoom) return
      requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - before) < 1) {
          // Wheel fired, room existed, yet nothing moved → native is broken.
          if (++brokenHits >= 2) activate()
        } else {
          brokenHits = 0
        }
      })
    }

    // Driver — only attached once the bug is confirmed for this session.
    const drive = (e: WheelEvent) => {
      e.preventDefault()
      const { x, y } = deltaPx(e)
      window.scrollBy(x, y)
    }

    const activate = () => {
      if (active) return
      active = true
      window.removeEventListener('wheel', detect)
      window.addEventListener('wheel', drive, { passive: false })
    }

    window.addEventListener('wheel', detect, { passive: true })

    return () => {
      window.removeEventListener('wheel', detect)
      window.removeEventListener('wheel', drive)
    }
  }, [])

  return null
}
