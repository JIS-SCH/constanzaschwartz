import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import { TUNNEL_DEPTH } from '../tunnel/scene';

gsap.registerPlugin(ScrollTrigger);

export function initScrub(
  lenis: Lenis,
  camera: THREE.PerspectiveCamera,
  blackoutMaterial: THREE.MeshBasicMaterial,
  canvas: HTMLCanvasElement,
) {
  // Connect Lenis scroll to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Main scroll-driven timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#tunnel-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        // Disable canvas pointer-events after tunnel completes
        if (self.progress >= 0.99) {
          canvas.style.pointerEvents = 'none';
        } else {
          canvas.style.pointerEvents = 'auto';
        }
      },
    },
  });

  // Camera travels through tunnel (full timeline)
  tl.to(camera.position, { z: TUNNEL_DEPTH, duration: 1, ease: 'none' }, 0);

  // Blackout fades IN from progress 0.85 to 0.925
  tl.fromTo(
    blackoutMaterial,
    { opacity: 0 },
    { opacity: 1, duration: 0.075, ease: 'power2.in' },
    0.85,
  );

  // Blackout fades OUT from progress 0.925 to 1.0
  tl.to(
    blackoutMaterial,
    { opacity: 0, duration: 0.075, ease: 'power2.out' },
    0.925,
  );

  return tl;
}
