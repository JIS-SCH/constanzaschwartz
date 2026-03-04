import * as THREE from 'three';
import { isMobile } from './detect';

export function setupResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile() ? 1 : Math.min(window.devicePixelRatio, 2));
  }

  window.addEventListener('resize', onResize);

  return () => window.removeEventListener('resize', onResize);
}
