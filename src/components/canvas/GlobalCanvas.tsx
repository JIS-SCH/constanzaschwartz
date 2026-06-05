// @ts-nocheck
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import * as THREE from 'three'
import gsap from 'gsap'
import { isMobile } from '@/src/utils/detect'
import { setupResize } from '@/src/utils/resize'
import { projectList } from '@/src/projects/registry'
import { useTransition, type OriginRect } from '@/src/contexts/TransitionContext'
import { DURATION, EASE, OVERLAY } from '@/src/motion/tokens'

const OTHER_CARDS_DURATION = 0.55
// Approximate hero rect used while navigating; refined to the real rect once
// the destination page is mounted.
const DEFAULT_HERO_TOP = 80
const DEFAULT_HERO_HEIGHT = 669
// Oversize the in-flight card slightly so it covers the viewport during the
// router push. The settle to the real rect happens via a short tween (not a
// snap) so the size adjustment reads as a single continuous motion.
const HERO_OVERSIZE = 1.05
const HERO_SETTLE_DURATION = 0.25

const BASE_Z = -20
const GROUP_ROTATION = 0
const MOUSE_ROTATION_RANGE = Math.PI / 7
const DRAG_ROTATION_RANGE = Math.PI / 3
const DRAG_TAP_THRESHOLD = 10
const CAMERA_Y = 1.5
const CAMERA_TILT = -0.08

const CARD_W = 12
const CARD_H = 6.75
const REFLECTION_H = 6
const CARD_SPACING = CARD_W + 2
const CARD_BASE_Z = -65

const MOBILE_CARD_W = 10
const MOBILE_CARD_H = 5
const MOBILE_REFLECTION_H = 1.2
const MOBILE_CARD_SPACING = 11
const MOBILE_CARD_BASE_Z = -34
const MOBILE_BASE_Z = -8

function preloadTexture(src: string): Promise<THREE.Texture> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const tex = new THREE.Texture(img)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.flipY = true
      const mobile = typeof window !== 'undefined' && window.innerWidth < 768
      tex.minFilter = mobile ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = !mobile
      tex.anisotropy = mobile ? 2 : 8
      tex.needsUpdate = true
      resolve(tex)
    }
    img.onerror = () => {
      const fallback = new THREE.Texture()
      fallback.flipY = true
      resolve(fallback)
    }
    img.src = src
  })
}

// Convert a 2D screen rect into the 3D pose a card needs to project onto it.
// Places the card at a fixed distance in front of the camera; computes XY
// world coords from NDC, and the scale from rect ratio over viewport size.
function rectToWorldPose(
  rect: OriginRect,
  camera: THREE.PerspectiveCamera,
  cardW: number,
  cardH: number,
) {
  const distFromCamera = 10
  // Camera looks toward -Z, so "in front" is at lower z than camera.position.z
  const z = camera.position.z - distFromCamera

  const fov = (camera.fov * Math.PI) / 180
  const worldHeight = 2 * distFromCamera * Math.tan(fov / 2)
  const worldWidth = worldHeight * camera.aspect

  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const ndcX = (cx / window.innerWidth) * 2 - 1
  const ndcY = -((cy / window.innerHeight) * 2 - 1)

  const x = ndcX * (worldWidth / 2)
  const y = ndcY * (worldHeight / 2)

  const worldRectW = worldWidth * (rect.width / window.innerWidth)
  const worldRectH = worldHeight * (rect.height / window.innerHeight)
  const scaleX = worldRectW / cardW
  const scaleY = worldRectH / cardH

  return { x, y, z, scaleX, scaleY }
}

function getDefaultHeroRect(): OriginRect {
  return {
    left: 0,
    top: DEFAULT_HERO_TOP,
    width: window.innerWidth,
    height: Math.min(DEFAULT_HERO_HEIGHT, window.innerHeight - DEFAULT_HERO_TOP),
  }
}

function getCardScreenRect(
  group: THREE.Group,
  camera: THREE.Camera,
  cardW: number,
  cardH: number,
): OriginRect {
  const halfW = cardW / 2
  const halfH = cardH / 2
  const mesh = group.children[0] as THREE.Mesh

  const corners = [
    new THREE.Vector3(-halfW, -halfH, 0),
    new THREE.Vector3(halfW, -halfH, 0),
    new THREE.Vector3(-halfW, halfH, 0),
    new THREE.Vector3(halfW, halfH, 0),
  ]

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  corners.forEach((corner) => {
    mesh.localToWorld(corner)
    corner.project(camera)
    const sx = ((corner.x + 1) / 2) * window.innerWidth
    const sy = ((-corner.y + 1) / 2) * window.innerHeight
    minX = Math.min(minX, sx)
    minY = Math.min(minY, sy)
    maxX = Math.max(maxX, sx)
    maxY = Math.max(maxY, sy)
  })

  return {
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}

export function GlobalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { state, start } = useTransition()

  // Refs for values read inside long-lived listeners
  const pathnameRef = useRef(pathname)
  const startRef = useRef(start)
  const phaseRef = useRef(state.phase)
  const routerRef = useRef(router)

  // Refs exposing canvas state to transition-phase useEffects
  const cardGroupsRef = useRef<THREE.Group[]>([])
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const arcPositionsRef = useRef<{ x: number; z: number }[]>([])
  const baseRotationsRef = useRef<number[]>([])
  const refMatsRef = useRef<THREE.MeshBasicMaterial[]>([])
  const cardSizeRef = useRef({ w: CARD_W, h: CARD_H })

  useEffect(() => { pathnameRef.current = pathname }, [pathname])
  useEffect(() => { startRef.current = start }, [start])
  useEffect(() => { phaseRef.current = state.phase }, [state.phase])
  useEffect(() => { routerRef.current = router }, [router])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ── Toggle canvas visibility based on route + transition phase ──────────
  // Visible on home (/), or during any active transition. Hidden on project
  // pages when idle (so the DOM hero shows through).
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const shouldShow = pathname === '/' || state.phase !== 'idle'
    container.style.visibility = shouldShow ? 'visible' : 'hidden'
    container.style.pointerEvents = pathname === '/' && state.phase === 'idle' ? 'auto' : 'none'
  }, [pathname, state.phase])

  // ── Reset container opacity at the start of every transition ────────────
  // A previous forward transition may have faded the canvas out; bring it
  // back to fully opaque before the next animation begins.
  useEffect(() => {
    if (state.phase !== 'entering') return
    const container = containerRef.current
    if (!container) return
    gsap.set(container, { opacity: 1, visibility: 'visible', overwrite: 'auto' })
  }, [state.phase])

  // ── Hand-off: fade the canvas out near the end of a forward leaving so
  // the DOM hero (which has its own entrance) takes over without showing
  // two heroes stacked. Only applies on home → project transitions.
  useEffect(() => {
    if (state.phase !== 'leaving') return
    if (!state.targetRoute?.startsWith('/project/')) return
    const container = containerRef.current
    if (!container) return
    gsap.to(container, {
      opacity: 0,
      duration: 0.35,
      delay: Math.max(0, OVERLAY.duration - 0.35),
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [state.phase, state.targetRoute])

  // ── Phase: entering → animate cards in 3D in parallel with the curve ────
  useEffect(() => {
    if (state.phase !== 'entering') return
    const cards = cardGroupsRef.current
    const camera = cameraRef.current
    if (!cards.length || !camera) return

    const isForward = state.targetRoute?.startsWith('/project/') ?? false
    const { w: cardW, h: cardH } = cardSizeRef.current

    if (isForward && state.targetIndex !== null) {
      const targetIdx = state.targetIndex
      const heroPose = rectToWorldPose(getDefaultHeroRect(), camera, cardW, cardH)

      cards.forEach((card, i) => {
        if (i === targetIdx) {
          gsap.to(card.position, {
            x: heroPose.x,
            y: heroPose.y,
            z: heroPose.z,
            duration: OVERLAY.duration,
            ease: OVERLAY.ease,
            overwrite: 'auto',
          })
          gsap.to(card.scale, {
            x: heroPose.scaleX * HERO_OVERSIZE,
            y: heroPose.scaleY * HERO_OVERSIZE,
            z: 1,
            duration: OVERLAY.duration,
            ease: OVERLAY.ease,
            overwrite: 'auto',
          })
          gsap.to(card.rotation, {
            y: 0,
            duration: OVERLAY.duration,
            ease: OVERLAY.ease,
            overwrite: 'auto',
          })
          gsap.to(refMatsRef.current[i], {
            opacity: 0,
            duration: OVERLAY.duration / 2,
            ease: 'power2.in',
            overwrite: 'auto',
          })
        } else {
          gsap.to(card.scale, {
            x: 0, y: 0, z: 0,
            duration: OTHER_CARDS_DURATION,
            ease: 'power2.in',
            overwrite: 'auto',
          })
        }
      })
    } else if (!isForward) {
      // Project → Home: active card returns to grid; others scale back up
      const slug = pathnameRef.current.replace('/project/', '')
      const idx = projectList.findIndex((p) => p.slug === slug)
      console.log('[GlobalCanvas] reverse animation start', {
        pathname: pathnameRef.current,
        slug,
        idx,
        cardsCount: cards.length,
        cardScales: cards.map((c, i) => `${i}: (${c.scale.x.toFixed(2)}, ${c.scale.y.toFixed(2)}, ${c.scale.z.toFixed(2)})`),
      })
      if (idx === -1) {
        console.warn('[GlobalCanvas] reverse: slug not found in projectList, slug:', slug)
        return
      }

      cards.forEach((card, i) => {
        if (i === idx) {
          const pos = arcPositionsRef.current[i]
          gsap.to(card.position, {
            x: pos.x,
            y: 0,
            z: pos.z,
            duration: OVERLAY.duration,
            ease: OVERLAY.ease,
            overwrite: 'auto',
          })
          gsap.to(card.scale, {
            x: 1, y: 1, z: 1,
            duration: OVERLAY.duration,
            ease: OVERLAY.ease,
            overwrite: 'auto',
          })
          gsap.to(card.rotation, {
            y: baseRotationsRef.current[i],
            duration: OVERLAY.duration,
            ease: OVERLAY.ease,
            overwrite: 'auto',
          })
          gsap.to(refMatsRef.current[i], {
            opacity: 0.2,
            duration: OVERLAY.duration / 2,
            delay: OVERLAY.duration / 2,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        } else {
          gsap.to(card.scale, {
            x: 1, y: 1, z: 1,
            duration: OTHER_CARDS_DURATION,
            delay: Math.max(0, OVERLAY.duration - OTHER_CARDS_DURATION),
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      })
    }
  }, [state.phase, state.targetIndex, state.targetRoute])

  // ── Phase: entered → snap card to the REAL hero rect of the destination page.
  // Instant snap (no tween) so the user only ever perceives a single movement.
  useEffect(() => {
    if (state.phase !== 'entered') return
    if (state.targetIndex === null) return
    if (!state.targetRoute?.startsWith('/project/')) return
    if (pathname !== state.targetRoute) return

    const cards = cardGroupsRef.current
    const camera = cameraRef.current
    if (!cards.length || !camera) return

    const target = document.querySelector<HTMLElement>('[data-project-image]')
    if (!target) return

    const rect = target.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return

    const pose = rectToWorldPose(
      { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
      camera,
      cardSizeRef.current.w,
      cardSizeRef.current.h,
    )
    const card = cards[state.targetIndex]
    gsap.to(card.position, {
      x: pose.x,
      y: pose.y,
      z: pose.z,
      duration: HERO_SETTLE_DURATION,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    gsap.to(card.scale, {
      x: pose.scaleX,
      y: pose.scaleY,
      z: 1,
      duration: HERO_SETTLE_DURATION,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [state.phase, state.targetIndex, state.targetRoute, pathname])

  useEffect(() => {
    if (!isMounted) return
    const canvas = canvasRef.current
    if (!canvas) return

    const mobile = isMobile()

    // ── Scene setup ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    // Transparent background so the canvas can sit above project DOM during transitions
    scene.background = null

    const camera = new THREE.PerspectiveCamera(
      mobile ? 70 : 38,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    )
    const camY = mobile ? 0.5 : CAMERA_Y
    camera.position.set(0, camY, -50)
    camera.rotation.x = mobile ? -0.05 : CAMERA_TILT

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !mobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)

    const cleanupResize = setupResize(camera, renderer)

    const cardsGroup = new THREE.Group()
    cardsGroup.rotation.y = GROUP_ROTATION
    scene.add(cardsGroup)

    const count = projectList.length

    const cardMeshes: THREE.Mesh[] = []
    const cardGroups: THREE.Group[] = []
    const cardMats: THREE.MeshBasicMaterial[] = []
    const refMats: THREE.MeshBasicMaterial[] = []
    const baseRotations: number[] = []

    const arcPositions: { x: number; z: number }[] = []

    const cardSpacing = mobile ? MOBILE_CARD_SPACING : CARD_SPACING
    const baseCardZ = mobile ? MOBILE_CARD_BASE_Z : CARD_BASE_Z
    const cameraZ = mobile ? MOBILE_BASE_Z : BASE_Z
    const radius = Math.abs(baseCardZ - cameraZ)

    const totalArc = (count - 1) * cardSpacing
    const maxTheta = (totalArc / radius) / 2
    const rotationLimit = maxTheta * 1.1

    const cardW = mobile ? MOBILE_CARD_W : CARD_W
    const cardH = mobile ? MOBILE_CARD_H : CARD_H
    const refH = mobile ? MOBILE_REFLECTION_H : REFLECTION_H

    projectList.forEach((_, i) => {
      const arcLength = -totalArc / 2 + i * cardSpacing
      const theta = arcLength / radius
      const x = radius * Math.sin(theta)
      const z = cameraZ - (radius * Math.cos(theta))
      const rotationY = -theta

      arcPositions.push({ x, z })
      baseRotations.push(rotationY)

      const group = new THREE.Group()
      group.position.set(x, 0, z)
      group.rotation.y = rotationY
      group.userData = { index: i, hoverY: 0, hoverZ: 0 }

      const geo = new THREE.PlaneGeometry(cardW, cardH)
      const mat = new THREE.MeshBasicMaterial({ color: 0x222222 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.userData = { index: i }
      group.add(mesh)
      cardMeshes.push(mesh)
      cardMats.push(mat)

      const refGeo = new THREE.PlaneGeometry(cardW, refH)
      const refMat = new THREE.MeshBasicMaterial({
        color: 0x222222,
        transparent: true,
        opacity: 0.2,
      })
      const refMesh = new THREE.Mesh(refGeo, refMat)
      refMesh.scale.y = -1
      refMesh.position.y = -(cardH / 2 + refH / 2)
      group.add(refMesh)
      refMats.push(refMat)

      cardsGroup.add(group)
      cardGroups.push(group)
    })

    // Expose canvas state to transition-driven useEffects below
    cardGroupsRef.current = cardGroups
    cameraRef.current = camera
    arcPositionsRef.current = arcPositions
    baseRotationsRef.current = baseRotations
    refMatsRef.current = refMats
    cardSizeRef.current = { w: cardW, h: cardH }

    // If we mounted directly on a project page (deep link / refresh), pre-pose
    // the active card at the hero location and hide the rest, so the reverse
    // transition can animate from a sensible starting state.
    if (pathnameRef.current.startsWith('/project/')) {
      const slug = pathnameRef.current.replace('/project/', '')
      const idx = projectList.findIndex((p) => p.slug === slug)
      if (idx !== -1) {
        const heroPose = rectToWorldPose(getDefaultHeroRect(), camera, cardW, cardH)
        cardGroups.forEach((card, i) => {
          if (i === idx) {
            card.position.set(heroPose.x, heroPose.y, heroPose.z)
            card.scale.set(heroPose.scaleX, heroPose.scaleY, 1)
            card.rotation.y = 0
            refMats[i].opacity = 0
          } else {
            card.scale.set(0, 0, 0)
          }
        })
      }
    }

    // ── Preload textures ──────────────────────────────────────────────────
    const uniqueUrls = [...new Set(projectList.flatMap((p) => {
      const urls = [p.image]
      if (p.mobileImage) urls.push(p.mobileImage)
      return urls
    }))]
    const texturePromises = uniqueUrls.map((url) => preloadTexture(url))

    Promise.all(texturePromises).then((textures) => {
      const textureMap = new Map<string, THREE.Texture>()
      uniqueUrls.forEach((url, i) => textureMap.set(url, textures[i]))

      projectList.forEach((p, i) => {
        const tex = textureMap.get(p.image)
        if (!tex || !tex.image) return

        cardMats[i].map = tex
        cardMats[i].color.set(0xffffff)
        cardMats[i].needsUpdate = true

        refMats[i].map = tex
        refMats[i].color.set(0xffffff)
        refMats[i].needsUpdate = true
      })
    })

    // ── Camera entrance ────────────────────────────────────────────────────
    let interactionEnabled = !!sessionStorage.getItem('introComplete')
    const targetZ = mobile ? MOBILE_BASE_Z : BASE_Z

    const startEntrance = () => {
      cameraTargetRotY = 0
      gsap.to(camera.position, {
        z: targetZ,
        duration: DURATION.xl,
        ease: EASE.out,
        onStart: () => {
          interactionEnabled = true
        }
      })
    }

    // ── Pointer / drag tracking ────────────────────────────────────────────
    const pointer = { x: 0, y: 0 }
    let cameraTargetRotY = 0

    const onMouseMove = (e: MouseEvent) => {
      if (!interactionEnabled) return
      if (pathnameRef.current !== '/') return
      if (phaseRef.current !== 'idle') return
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
      cameraTargetRotY = -pointer.x * MOUSE_ROTATION_RANGE
    }

    let dragStart: { x: number; y: number; rot: number } | null = null
    let didDrag = false

    const onTouchStart = (e: TouchEvent) => {
      if (!interactionEnabled) return
      if (pathnameRef.current !== '/') return
      if (phaseRef.current !== 'idle') return
      dragStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        rot: cameraTargetRotY,
      }
      didDrag = false
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!interactionEnabled || !dragStart) return
      if (pathnameRef.current !== '/') return
      if (phaseRef.current !== 'idle') return
      const dx = e.touches[0].clientX - dragStart.x
      const dy = e.touches[0].clientY - dragStart.y
      if (Math.abs(dx) > DRAG_TAP_THRESHOLD || Math.abs(dy) > DRAG_TAP_THRESHOLD) {
        didDrag = true
      }
      const rawRot = dragStart.rot + (dx / window.innerWidth) * DRAG_ROTATION_RANGE * 2
      cameraTargetRotY = THREE.MathUtils.clamp(rawRot, -rotationLimit, rotationLimit)
      pointer.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
    }
    const onTouchEnd = () => {
      dragStart = null
    }

    if (!mobile) {
      window.addEventListener('mousemove', onMouseMove)
    } else {
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchend', onTouchEnd, { passive: true })
    }

    // ── Initial fade-in (controlled by intro tunnel) ───────────────────────
    function fadeInCards() {
      if (!containerRef.current) return
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.lg,
          ease: EASE.out
        }
      )
    }

    const onShowCards = () => {
      fadeInCards()
      startEntrance()
    }

    if (sessionStorage.getItem('introComplete')) {
      if (containerRef.current) gsap.set(containerRef.current, { opacity: 1, y: 0 })
      camera.position.z = targetZ
      cameraTargetRotY = 0
      interactionEnabled = true
    } else if (pathnameRef.current === '/') {
      camera.position.z = -50
    } else {
      // Deep-linked into a project page — skip the tunnel intro
      if (containerRef.current) gsap.set(containerRef.current, { opacity: 1, y: 0 })
      camera.position.z = targetZ
      cameraTargetRotY = 0
      interactionEnabled = true
    }

    window.addEventListener('intro:showCards', onShowCards)

    // ── Raycaster ──────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse2d = new THREE.Vector2()
    let hoveredGroup: THREE.Group | null = null

    function getHitGroup(clientX: number, clientY: number): THREE.Group | null {
      mouse2d.x = (clientX / window.innerWidth) * 2 - 1
      mouse2d.y = -(clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse2d, camera)
      const hits = raycaster.intersectObjects(cardMeshes)
      if (hits.length > 0) return hits[0].object.parent as THREE.Group
      return null
    }

    function applyHover(group: THREE.Group) {
      gsap.to(group.userData, {
        hoverZ: 1.2,
        hoverY: 0.6,
        duration: DURATION.md,
        ease: EASE.soft
      })
    }

    function removeHover(group: THREE.Group) {
      gsap.to(group.userData, {
        hoverZ: 0,
        hoverY: 0,
        duration: DURATION.md,
        ease: EASE.soft
      })
    }

    const onHoverCheck = (e: MouseEvent) => {
      if (mobile) return
      if (pathnameRef.current !== '/') return
      const group = getHitGroup(e.clientX, e.clientY)
      if (group !== hoveredGroup) {
        if (hoveredGroup) removeHover(hoveredGroup)
        if (group) {
          applyHover(group)
          const idx = group.userData.index as number
          routerRef.current.prefetch(`/project/${projectList[idx].slug}`)
        }
        hoveredGroup = group
      }
      canvas.style.cursor = group ? 'pointer' : 'default'
    }
    if (!mobile) canvas.addEventListener('mousemove', onHoverCheck)

    const onClick = (e: MouseEvent) => {
      if (pathnameRef.current !== '/') return
      if (mobile && didDrag) {
        didDrag = false
        return
      }
      const group = getHitGroup(e.clientX, e.clientY)
      if (!group) return

      const idx = group.userData.index as number
      const project = projectList[idx]
      if (!project) return

      const rect = getCardScreenRect(group, camera, cardW, cardH)
      startRef.current({
        route: `/project/${project.slug}`,
        index: idx,
        rect,
      })
    }
    canvas.addEventListener('click', onClick)

    // ── Render loop ────────────────────────────────────────────────────────
    let frameId: number
    let lastTime = performance.now()

    function animate() {
      frameId = requestAnimationFrame(animate)
      const now = performance.now()
      const delta = (now - lastTime) / 1000
      lastTime = now

      // Re-center camera while a transition is in progress so the flying card
      // doesn't drift off-center.
      if (phaseRef.current !== 'idle') {
        cameraTargetRotY = 0
        pointer.y = 0
      }

      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        cameraTargetRotY,
        0.04
      )

      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        targetZ - (pointer.y * 2),
        4,
        delta
      )

      // Only steer positions from hover state when idle on home. During
      // transitions, gsap owns position/scale/rotation of every card.
      const ownPositions = phaseRef.current === 'idle' && pathnameRef.current === '/'
      if (ownPositions) {
        cardGroups.forEach((group, i) => {
          const baseZ = arcPositions[i].z
          const hoverZ = group.userData.hoverZ || 0
          const hoverY = group.userData.hoverY || 0
          group.position.y = hoverY
          group.position.z = baseZ + hoverZ
        })
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      cleanupResize()
      if (!mobile) {
        window.removeEventListener('mousemove', onMouseMove)
        canvas.removeEventListener('mousemove', onHoverCheck)
      } else {
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
      }
      canvas.removeEventListener('click', onClick)
      window.removeEventListener('intro:showCards', onShowCards)
      renderer.dispose()
      scene.clear()
    }
  }, [isMounted])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        opacity: 0,
        visibility: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  )
}
