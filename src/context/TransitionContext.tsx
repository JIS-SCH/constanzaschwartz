'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OriginRect {
  left: number
  top: number
  width: number
  height: number
}

export type TransitionPhase =
  | 'idle'
  | 'expanding'    // image animating from card rect → fullscreen
  | 'expanded'     // fullscreen reached, waiting for project page
  | 'revealing'    // image sliding away to reveal project content
  | 'done'         // transition complete, overlay hidden
  | 'closing'      // fade to black, navigate back to home
  | 'closed'       // arrived at home, fade out overlay

interface TransitionState {
  phase: TransitionPhase
  slug: string | null
  imageSrc: string | null
  originRect: OriginRect | null
}

interface TransitionContextValue {
  state: TransitionState
  start: (params: { slug: string; imageSrc: string; rect: OriginRect }) => void
  setExpanded: () => void
  reveal: () => void
  setDone: () => void
  /** Trigger back-to-home transition */
  close: () => void
  setClosed: () => void
  reset: () => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const TransitionContext = createContext<TransitionContextValue | null>(null)

const INITIAL_STATE: TransitionState = {
  phase: 'idle',
  slug: null,
  imageSrc: null,
  originRect: null,
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>(INITIAL_STATE)

  const start = useCallback(
    (params: { slug: string; imageSrc: string; rect: OriginRect }) => {
      setState({
        phase: 'expanding',
        slug: params.slug,
        imageSrc: params.imageSrc,
        originRect: params.rect,
      })
    },
    []
  )

  const setExpanded = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'expanded' }))
  }, [])

  const reveal = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'revealing' }))
  }, [])

  const setDone = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'done' }))
  }, [])

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'closing' }))
  }, [])

  const setClosed = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'closed' }))
  }, [])

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return (
    <TransitionContext.Provider
      value={{ state, start, setExpanded, reveal, setDone, close, setClosed, reset }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('useTransition must be used within TransitionProvider')
  return ctx
}
