'use client';

import { useEffect, useRef } from 'react';
import { createScene } from '../tunnel/scene';
import { createLayers } from '../tunnel/layers';
import { createBlackout } from '../tunnel/transition';
import { initLenis, destroyLenis } from '../scroll/lenis';
import { initScrub } from '../scroll/scrub';
import { setupResize } from '../utils/resize';
import { prefersReducedMotion } from '../utils/detect';

export default function TunnelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = prefersReducedMotion();

    // 1. Scene setup
    const { scene, camera, renderer } = createScene(canvas);

    // 2. Create tunnel frames + fog
    const { fogMaterial } = createLayers(scene);

    // 3. Blackout transition (attached to camera)
    const { material: blackoutMaterial } = createBlackout(camera);

    // 4. Resize handler
    const cleanupResize = setupResize(camera, renderer);

    // 5. Scroll setup
    let cleanupLenis: (() => void) | undefined;

    if (!reducedMotion) {
      const lenis = initLenis();
      initScrub(lenis, camera, blackoutMaterial, canvas);
      cleanupLenis = () => destroyLenis();
    }

    // 6. Render loop — fog breathing via sine wave
    let frameId: number;
    const startTime = performance.now();

    function animate() {
      frameId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;
      fogMaterial.opacity = Math.sin(elapsed * 0.4) * 0.06 + 0.08;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      cleanupResize();
      cleanupLenis?.();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <>
      <div id="tunnel-container" style={{ height: '500vh', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1,
          }}
        />
      </div>

      <section
        id="portfolio"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          background: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ color: '#fff', fontSize: '3rem', fontFamily: 'sans-serif' }}>
          Constanza Schwartz
        </h1>
      </section>
    </>
  );
}
