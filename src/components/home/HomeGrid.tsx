'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { isMobile } from '@/src/utils/detect'
import { setupResize } from '@/src/utils/resize'
import type { ProjectMeta } from '@/src/projects/types'
import type { OriginRect } from '@/src/contexts/TransitionContext'

interface HomeGridProps {
  projects: ProjectMeta[]
  onProjectClick: (index: number, rect: OriginRect) => void
}

const BASE_Z = -20
const GROUP_ROTATION = 0              // arc is symmetric in front of camera
const MOUSE_ROTATION_RANGE = Math.PI / 10    // ±18° max camera yaw on desktop hover
const DRAG_ROTATION_RANGE = Math.PI / 3      // full-window drag = ±60° on mobile
const DRAG_TAP_THRESHOLD = 10                // px movement to count as drag (not tap)
const CAMERA_Y = 1.5    // Height of the camera (higher = more floor visible)
const CAMERA_TILT = -0.08             // Tilt camera down (-) to move the grid UP on screen


const CARD_W = 12
const CARD_H = 6.75
const REFLECTION_H = 6
const CARD_SPACING = CARD_W + 2              // Tight gap for continuous screen look
const CARD_BASE_Z = -65                      // Original arc distance

// Mobile card geometry — portrait-friendly:
// • Radius = 10 (camera -24, base -34) so adjacent cards stay in front
// • Near-square cards (4:5 aspect) to fill portrait viewport
// • FOV=80° vertical gives ~42° horizontal at portrait aspect
const MOBILE_CARD_W = 5
const MOBILE_CARD_H = 5  // portrait-ish aspect, fills ~35% of viewport height
const MOBILE_REFLECTION_H = 1.5
const MOBILE_CARD_SPACING = 6   // adjacent shows ~25% of card
const MOBILE_CARD_BASE_Z = -34    // radius = 10 from camera
const MOBILE_BASE_Z = -20

function getTitle(index: number): string {
  return `Project ${String(index + 1).padStart(2, '0')}`
}

// ─── Preload a single image and return a Three.js texture ────────────────────
function preloadTexture(src: string): Promise<THREE.Texture> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const tex = new THREE.Texture(img)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.flipY = true
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

// ─── Build an overlay canvas texture (dark + text) ───────────────────────────
function createOverlayTexture(project: ProjectMeta, index: number): THREE.CanvasTexture {
  const w = 512
  const h = 320
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  // Dark translucent fill
  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.fillRect(0, 0, w, h)

  // Date — top left, 9px equivalent scaled to canvas
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '300 20px sans-serif'
  ctx.letterSpacing = '3px'
  ctx.fillText(project.date, 20, 38)

  // Title — centered
  ctx.fillStyle = '#ffffff'
  ctx.font = '300 48px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(getTitle(index), w / 2, h / 2)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.flipY = true
  return tex
}

// ─── Project 3D card corners to screen rect ──────────────────────────────────
function getCardScreenRect(
  group: THREE.Group,
  camera: THREE.Camera
): OriginRect {
  const halfW = CARD_W / 2
  const halfH = CARD_H / 2
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
    // Local → world
    mesh.localToWorld(corner)
    // World → NDC
    corner.project(camera)
    // NDC → screen pixels
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

export function HomeGrid({ projects, onProjectClick }: HomeGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mobile = isMobile()

    // ── Scene setup ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(
      mobile ? 70 : 38,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    )
    // Elevate camera Y slightly; tilt compensates so cards appear vertically centered
    const camY = mobile ? 0.5 : CAMERA_Y
    camera.position.set(0, camY, -50) // Initial far position
    // Tilt to center cards: -atan(camY / radius). radius=10 → -atan(0.05) ≈ -0.05
    camera.rotation.x = mobile ? -0.05 : CAMERA_TILT

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const cleanupResize = setupResize(camera, renderer)

    const cardsGroup = new THREE.Group()
    cardsGroup.rotation.y = GROUP_ROTATION
    scene.add(cardsGroup)

    const count = projects.length

    const cardMeshes: THREE.Mesh[] = []
    const cardGroups: THREE.Group[] = []
    const overlayMeshes: THREE.Mesh[] = []
    const overlayMats: THREE.MeshBasicMaterial[] = []
    const cardMats: THREE.MeshBasicMaterial[] = []
    const refMats: THREE.MeshBasicMaterial[] = []


    const arcPositions: { x: number; z: number }[] = []

    const cardSpacing = mobile ? MOBILE_CARD_SPACING : CARD_SPACING
    const baseCardZ = mobile ? MOBILE_CARD_BASE_Z : CARD_BASE_Z

    const cameraZ = mobile ? MOBILE_BASE_Z : BASE_Z
    const radius = Math.abs(baseCardZ - cameraZ)

    // Calculate max rotation based on the arc of projects
    const totalArc = (count - 1) * cardSpacing
    const maxTheta = (totalArc / radius) / 2
    // Give it a little bit of extra room (10%) to see the edge cards comfortably
    const rotationLimit = maxTheta * 1.1

    const cardW = mobile ? MOBILE_CARD_W : CARD_W
    const cardH = mobile ? MOBILE_CARD_H : CARD_H
    const refH = mobile ? MOBILE_REFLECTION_H : REFLECTION_H

    projects.forEach((project, i) => {
      // 1. Arc length along the cylinder
      const arcLength = -totalArc / 2 + i * cardSpacing

      // 2. Cylinder angle (theta)
      const theta = arcLength / radius

      // 3. Exact positioning on the cylinder perimeter
      const x = radius * Math.sin(theta)
      const z = cameraZ - (radius * Math.cos(theta))

      // 4. Perfect inward rotation to face the camera dead-on
      const rotationY = -theta

      arcPositions.push({ x, z })

      const group = new THREE.Group()
      group.position.set(x, 0, z)
      group.rotation.y = rotationY
      group.userData = { index: i, hoverY: 0, hoverZ: 0 }

      // ── Image card ──────────────────────────────────────────────────────
      const geo = new THREE.PlaneGeometry(cardW, cardH)
      const mat = new THREE.MeshBasicMaterial({ color: 0x222222 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.userData = { index: i }
      group.add(mesh)
      cardMeshes.push(mesh)
      cardMats.push(mat)

      // ── Hover overlay (starts invisible) ────────────────────────────────
      const overlayTex = createOverlayTexture(project, i)
      const overlayMat = new THREE.MeshBasicMaterial({
        map: overlayTex,
        transparent: true,
        opacity: 0,
        depthTest: false,
      })
      const overlayMesh = new THREE.Mesh(geo, overlayMat)
      overlayMesh.position.z = 0.001
      group.add(overlayMesh)
      overlayMeshes.push(overlayMesh)
      overlayMats.push(overlayMat)

      // ── Reflection ──────────────────────────────────────────────────────
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

    // ── Preload all images, then apply textures + fade in ────────────────
    const uniqueUrls = [...new Set(projects.map((p) => p.image))]
    const texturePromises = uniqueUrls.map((url) => preloadTexture(url))

    Promise.all(texturePromises).then((textures) => {
      const textureMap = new Map<string, THREE.Texture>()
      uniqueUrls.forEach((url, i) => textureMap.set(url, textures[i]))

      // Apply loaded textures to card + reflection materials
      projects.forEach((p, i) => {
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

    // ── Cards fade-in triggered by intro timeline ────────────────────────
    function fadeInCards() {
      if (!containerRef.current) return
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    // If intro already completed (back from project, refresh), show immediately
    if (sessionStorage.getItem('introComplete')) {
      if (containerRef.current) gsap.set(containerRef.current, { opacity: 1 })
    } else if (window.__cardsReady) {
      fadeInCards()
    }

    const onShowCards = () => fadeInCards()
    window.addEventListener('intro:showCards', onShowCards)

    // ── Camera entrance animation ──────────────────────────────────────────
    const targetZ = mobile ? MOBILE_BASE_Z : BASE_Z
    gsap.to(camera.position, {
      z: targetZ,
      duration: 1,
      ease: 'power2.out',
    })

    // ── Pointer / drag tracking ─────────────────────────────────────────────
    // Desktop = mouse-follow (parallax). Mobile = touch-and-drag (rotates camera
    // by drag delta; no rotation when finger isn't pressed).
    const pointer = { x: 0, y: 0 }
    let cameraTargetRotY = 0

    const onMouseMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
      cameraTargetRotY = -pointer.x * MOUSE_ROTATION_RANGE
    }

    let dragStart: { x: number; y: number; rot: number } | null = null
    let didDrag = false

    const onTouchStart = (e: TouchEvent) => {
      dragStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        rot: cameraTargetRotY,
      }
      didDrag = false
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragStart) return
      const dx = e.touches[0].clientX - dragStart.x
      const dy = e.touches[0].clientY - dragStart.y
      if (Math.abs(dx) > DRAG_TAP_THRESHOLD || Math.abs(dy) > DRAG_TAP_THRESHOLD) {
        didDrag = true
      }
      const rawRot = dragStart.rot - (dx / window.innerWidth) * DRAG_ROTATION_RANGE * 2
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

    // ── Raycaster for hover + click ───────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse2d = new THREE.Vector2()
    let hoveredGroup: THREE.Group | null = null
    let mobileActiveGroup: THREE.Group | null = null

    function getHitGroup(clientX: number, clientY: number): THREE.Group | null {
      mouse2d.x = (clientX / window.innerWidth) * 2 - 1
      mouse2d.y = -(clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse2d, camera)
      const hits = raycaster.intersectObjects(cardMeshes)
      if (hits.length > 0) return hits[0].object.parent as THREE.Group
      return null
    }

    function applyHover(group: THREE.Group) {
      // Subtle premium hover: slight pop forward + slight lift + subtle scale
      gsap.to(group.userData, { hoverZ: 0.5, hoverY: 0.3, duration: 0.4, ease: 'power2.out' })
      gsap.to(group.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.4, ease: 'power2.out' })
    }

    function removeHover(group: THREE.Group) {
      gsap.to(group.userData, { hoverZ: 0, hoverY: 0, duration: 0.4, ease: 'power2.out' })
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: 'power2.out' })
    }

    // Desktop: mousemove hover check
    const onHoverCheck = (e: MouseEvent) => {
      if (mobile) return
      const group = getHitGroup(e.clientX, e.clientY)
      if (group !== hoveredGroup) {
        if (hoveredGroup) removeHover(hoveredGroup)
        if (group) applyHover(group)
        hoveredGroup = group
      }
      canvas.style.cursor = group ? 'pointer' : 'default'
    }
    if (!mobile) canvas.addEventListener('mousemove', onHoverCheck)

    // Click / tap — compute screen rect and fire callback
    const onClick = (e: MouseEvent) => {
      // On mobile, swallow the click that follows a drag gesture
      if (mobile && didDrag) {
        didDrag = false
        return
      }
      const group = getHitGroup(e.clientX, e.clientY)
      if (!group) {
        if (mobile && mobileActiveGroup) {
          removeHover(mobileActiveGroup)
          mobileActiveGroup = null
        }
        return
      }

      const triggerProject = (g: THREE.Group) => {
        const idx = g.userData.index as number
        const rect = getCardScreenRect(g, camera)
        onProjectClick(idx, rect)
      }

      if (mobile) {
        // First tap → hover; second tap → open
        if (mobileActiveGroup === group) {
          triggerProject(group)
          return
        }
        if (mobileActiveGroup) removeHover(mobileActiveGroup)
        applyHover(group)
        mobileActiveGroup = group
      } else {
        triggerProject(group)
      }
    }
    canvas.addEventListener('click', onClick)

    // ── Render loop ───────────────────────────────────────────────────────
    let frameId: number
    let lastTime = performance.now()

    function animate() {
      frameId = requestAnimationFrame(animate)
      const now = performance.now()
      const delta = (now - lastTime) / 1000
      lastTime = now

      // Camera Y rotation: smoothly chase the target set by mouse (desktop) or drag (mobile)
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        cameraTargetRotY,
        0.08
      )

      // Camera Z depth from mouse Y
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        targetZ - pointer.y,
        7,
        delta
      )

      cardGroups.forEach((group, i) => {
        const baseZ = arcPositions[i].z
        const hoverZ = group.userData.hoverZ || 0
        const hoverY = group.userData.hoverY || 0

        group.position.y = hoverY
        group.position.z = baseZ + hoverZ
      })

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────
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
  }, [projects, onProjectClick])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        opacity: 0,
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
