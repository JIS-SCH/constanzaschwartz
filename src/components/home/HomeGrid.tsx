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

// ─── Layout constants ────────────────────────────────────────────────────────
const BASE_Z = 11.5
const ARC_DISTANCE = 20
const GROUP_ROTATION = -Math.PI / 12  // global offset

// Card geometry
const CARD_W = 9.8
const CARD_H = 8.0
const REFLECTION_H = 2.4

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
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 20)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(mobile ? 1 : Math.min(window.devicePixelRatio, 2))

    const cleanupResize = setupResize(camera, renderer)

    // ── Cards group ────────────────────────────────────────────────────────
    const cardsGroup = new THREE.Group()
    cardsGroup.rotation.y = GROUP_ROTATION
    scene.add(cardsGroup)

    const count = projects.length

    // Per-card refs
    const cardMeshes: THREE.Mesh[] = []
    const cardGroups: THREE.Group[] = []
    const overlayMeshes: THREE.Mesh[] = []
    const overlayMats: THREE.MeshBasicMaterial[] = []
    const cardMats: THREE.MeshBasicMaterial[] = []
    const refMats: THREE.MeshBasicMaterial[] = []

    // Arc positions (stored for hover restore)
    const arcPositions: { x: number; z: number }[] = []
    const fov = Math.PI

    projects.forEach((project, i) => {
      const angle = (fov / count) * i
      const x = -ARC_DISTANCE * Math.cos(angle)
      const z = -ARC_DISTANCE * Math.sin(angle)
      const rotationY = Math.PI / 2 - angle

      arcPositions.push({ x, z })

      const group = new THREE.Group()
      group.position.set(x, 0, z)
      group.rotation.y = rotationY
      group.userData = { index: i }

      // ── Image card ──────────────────────────────────────────────────────
      const geo = new THREE.PlaneGeometry(CARD_W, CARD_H)
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
      const refGeo = new THREE.PlaneGeometry(CARD_W, REFLECTION_H)
      const refMat = new THREE.MeshBasicMaterial({
        color: 0x222222,
        transparent: true,
        opacity: 0.2,
      })
      const refMesh = new THREE.Mesh(refGeo, refMat)
      refMesh.scale.y = -1
      refMesh.position.y = -(CARD_H / 2 + REFLECTION_H / 2)
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
    gsap.to(camera.position, {
      z: BASE_Z,
      duration: 1,
      ease: 'power2.out',
    })

    // ── Pointer tracking ────────────────────────────────────────────────────
    const pointer = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onTouchMove = (e: TouchEvent) => {
      pointer.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
    }

    if (!mobile) window.addEventListener('mousemove', onMouseMove)
    else window.addEventListener('touchmove', onTouchMove, { passive: true })

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
      const idx = group.userData.index as number
      // Card pops forward + lifts + scales
      gsap.to(group.position, { z: group.position.z + 1, y: 0.5, duration: 0.4, ease: 'power2.out' })
      gsap.to(group.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.4, ease: 'power2.out' })
      // Overlay fades in
      gsap.to(overlayMats[idx], { opacity: 1, duration: 0.3, ease: 'power2.out' })
    }

    function removeHover(group: THREE.Group) {
      const idx = group.userData.index as number
      const origZ = arcPositions[idx].z
      gsap.to(group.position, { z: origZ, y: 0, duration: 0.4, ease: 'power2.out' })
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: 'power2.out' })
      // Overlay fades out
      gsap.to(overlayMats[idx], { opacity: 0, duration: 0.3, ease: 'power2.out' })
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

      // Camera Y rotation from mouse X
      if (!mobile) {
        camera.rotation.y = THREE.MathUtils.lerp(
          camera.rotation.y,
          -(pointer.x * Math.PI) / 4,
          0.03
        )
      }

      // Camera Z depth from mouse Y
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        BASE_Z - pointer.y,
        7,
        delta
      )

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
        window.removeEventListener('touchmove', onTouchMove)
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
