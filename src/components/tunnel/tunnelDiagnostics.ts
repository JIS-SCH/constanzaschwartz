export function createTunnelDiagnostics(video: HTMLVideoElement) {
  if (new URLSearchParams(window.location.search).get('debugTunnel') !== '1') return null

  const started = performance.now()
  const samples: unknown[] = []
  const events: unknown[] = []
  const state = { target: 0, internal: 0, requested: null as number | null, rafAt: 0, rafCount: 0, frames: 0, mediaTime: null as number | null, frameAt: 0, phase: 'loading' }
  const panel = document.createElement('div')
  panel.style.cssText = 'position:fixed;bottom:12px;left:8px;right:8px;z-index:2147483647;background:#111e;color:white;padding:10px;font:11px/1.4 monospace;max-height:40vh;overflow:auto;pointer-events:auto'
  const output = document.createElement('pre')
  output.style.cssText = 'white-space:pre-wrap;margin:0'
  const button = document.createElement('button')
  button.textContent = 'Descargar diagnóstico'
  button.style.cssText = 'padding:8px;margin-top:6px;background:white;color:black;border:0'
  panel.append(output, button)
  document.body.append(panel)

  const ranges = (value: TimeRanges) => Array.from({ length: value.length }, (_, i) => [value.start(i), value.end(i)])
  const record = (event: string, detail?: unknown) => {
    events.push({ ms: performance.now() - started, event, detail })
    if (events.length > 2000) events.shift()
  }
  const mediaEvents = ['loadstart', 'loadedmetadata', 'loadeddata', 'canplay', 'seeking', 'seeked', 'waiting', 'stalled', 'suspend', 'error', 'playing', 'pause', 'emptied']
  const onMedia = (event: Event) => record(event.type, { time: video.currentTime, ready: video.readyState, error: video.error?.message })
  mediaEvents.forEach(name => video.addEventListener(name, onMedia))
  const onLifecycle = (event: Event) => record(event.type, { visibility: document.visibilityState, width: innerWidth, height: innerHeight })
  document.addEventListener('visibilitychange', onLifecycle)
  window.addEventListener('pageshow', onLifecycle)
  window.addEventListener('resize', onLifecycle)
  window.addEventListener('error', onLifecycle)

  let stopped = false
  let frameId: number | undefined
  if (typeof video.requestVideoFrameCallback === 'function') {
    const frame: VideoFrameRequestCallback = (_, metadata) => {
      state.frames++
      state.mediaTime = metadata.mediaTime
      state.frameAt = performance.now()
      if (!stopped) frameId = video.requestVideoFrameCallback(frame)
    }
    frameId = video.requestVideoFrameCallback(frame)
  }
  let readProgress = () => ({ scrollProgress: 0, timelineProgress: 0 })
  const timer = window.setInterval(() => {
    const now = performance.now()
    const sample = { ms: now - started, ...state, ...readProgress(), scrollY, actual: video.currentTime, seeking: video.seeking, ready: video.readyState, network: video.networkState, buffered: ranges(video.buffered), seekable: ranges(video.seekable), rafAge: state.rafAt ? now - state.rafAt : null, frameAge: state.frameAt ? now - state.frameAt : null, visibility: document.visibilityState }
    samples.push(sample)
    if (samples.length > 2400) samples.shift()
    output.textContent = `Tunnel debug · ${state.phase}\nScroll: ${scrollY.toFixed(0)} · progrès: ${sample.scrollProgress.toFixed(3)}\nObjetivo: ${state.target.toFixed(3)} · interno: ${state.internal.toFixed(3)}\nPedido: ${state.requested?.toFixed(3) ?? '-'} · actual: ${video.currentTime.toFixed(3)}\nSeeking: ${video.seeking} · ready: ${video.readyState}\nRAF: ${sample.rafAge?.toFixed(0) ?? '-'}ms · frames: ${state.frames}\nFrame: ${state.mediaTime?.toFixed(3) ?? '-'} · edad: ${sample.frameAge?.toFixed(0) ?? '-'}ms`
  }, 250)
  button.onclick = () => {
    const blob = new Blob([JSON.stringify({ userAgent: navigator.userAgent, source: video.currentSrc, duration: video.duration, frameCallbackSupported: typeof video.requestVideoFrameCallback === 'function', samples, events }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'tunnel-diagnostics.json'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return {
    state, record,
    setProgressReader(reader: typeof readProgress) { readProgress = reader },
    dispose() {
      stopped = true
      clearInterval(timer)
      if (frameId !== undefined) video.cancelVideoFrameCallback(frameId)
      mediaEvents.forEach(name => video.removeEventListener(name, onMedia))
      document.removeEventListener('visibilitychange', onLifecycle)
      window.removeEventListener('pageshow', onLifecycle)
      window.removeEventListener('resize', onLifecycle)
      window.removeEventListener('error', onLifecycle)
      panel.remove()
    },
  }
}
