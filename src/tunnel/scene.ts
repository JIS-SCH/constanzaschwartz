import * as THREE from 'three';
import { isMobile } from '../utils/detect';

export const CAMERA_START_Z = 50;
export const TUNNEL_DEPTH = -580;

export function createScene(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(0, 0, CAMERA_START_Z);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile(),
    alpha: false,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(isMobile() ? 1 : Math.min(window.devicePixelRatio, 2));

  scene.add(camera);

  return { scene, camera, renderer };
}
