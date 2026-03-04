import * as THREE from 'three';
import { createNoiseTexture, createFogTexture } from './materials';
import { isMobile } from '../utils/detect';
import { CAMERA_START_Z } from './scene';

const FOV = 75;
const SCALE_PER_STEP = 0.85;
const HOLE_RATIO = 0.3;

const DESKTOP_Z = [0, -100, -200, -320, -460, -620];
const MOBILE_Z = [0, -200, -460, -620];

// Base color #1a2e1a
const BASE_R = 0x1a;
const BASE_G = 0x2e;
const BASE_B = 0x1a;

export interface LayerResult {
  fogMaterial: THREE.MeshBasicMaterial;
}

function darkenColor(step: number, totalSteps: number): THREE.Color {
  const t = step / (totalSteps - 1); // 0 to 1
  const mix = t * 0.75; // darken up to 75% toward black
  const r = Math.floor(BASE_R * (1 - mix)) / 255;
  const g = Math.floor(BASE_G * (1 - mix)) / 255;
  const b = Math.floor(BASE_B * (1 - mix)) / 255;
  return new THREE.Color(r, g, b);
}

function createFramePanels(
  scene: THREE.Scene,
  outerW: number,
  outerH: number,
  holeSize: number,
  z: number,
  color: THREE.Color,
  noiseTexture: THREE.CanvasTexture,
) {
  const halfHole = holeSize / 2;

  // Top panel: full width, above the hole
  const topH = (outerH - holeSize) / 2;
  addPanel(scene, outerW, topH, 0, halfHole + topH / 2, z, color, noiseTexture);

  // Bottom panel: full width, below the hole
  addPanel(scene, outerW, topH, 0, -(halfHole + topH / 2), z, color, noiseTexture);

  // Left panel: hole height, left of hole
  const sideW = (outerW - holeSize) / 2;
  addPanel(scene, sideW, holeSize, -(halfHole + sideW / 2), 0, z, color, noiseTexture);

  // Right panel: hole height, right of hole
  addPanel(scene, sideW, holeSize, halfHole + sideW / 2, 0, z, color, noiseTexture);
}

function addPanel(
  scene: THREE.Scene,
  w: number,
  h: number,
  x: number,
  y: number,
  z: number,
  color: THREE.Color,
  noiseTexture: THREE.CanvasTexture,
) {
  const geometry = new THREE.PlaneGeometry(w, h);
  const material = new THREE.MeshBasicMaterial({
    color,
    map: noiseTexture,
    side: THREE.DoubleSide,
    depthWrite: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);
}

export function createLayers(scene: THREE.Scene): LayerResult {
  const mobile = isMobile();
  const aspect = window.innerWidth / window.innerHeight;
  const frameZPositions = mobile ? MOBILE_Z : DESKTOP_Z;
  const totalFrames = frameZPositions.length;

  const noiseTexture = createNoiseTexture();

  // Calculate base frame size from frustum at camera start distance to first frame
  const distToFirst = CAMERA_START_Z - frameZPositions[0]; // 50
  const fovRad = (FOV / 2) * (Math.PI / 180);
  const vpHeight = 2 * distToFirst * Math.tan(fovRad);
  const vpWidth = vpHeight * aspect;

  // Outer frame: 2.2x viewport to guarantee full coverage
  const baseOuterH = vpHeight * 2.2;
  const baseOuterW = vpWidth * 2.2;
  // Hole: perfect square, 30% of viewport height
  const baseHoleSize = vpHeight * HOLE_RATIO;

  for (let i = 0; i < totalFrames; i++) {
    const scale = Math.pow(SCALE_PER_STEP, i);
    const z = frameZPositions[i];
    const color = darkenColor(i, totalFrames);

    const outerW = baseOuterW * scale;
    const outerH = baseOuterH * scale;
    const holeSize = baseHoleSize * scale;

    createFramePanels(scene, outerW, outerH, holeSize, z, color, noiseTexture);
  }

  // Fog layer: semi-transparent white plane at Z=30
  const fogGeom = new THREE.PlaneGeometry(vpWidth * 1.6, vpHeight * 1.6);
  const fogTexture = createFogTexture();
  const fogMaterial = new THREE.MeshBasicMaterial({
    map: fogTexture,
    transparent: true,
    opacity: 0.08,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const fogMesh = new THREE.Mesh(fogGeom, fogMaterial);
  fogMesh.position.z = 30;
  fogMesh.name = 'fog';
  scene.add(fogMesh);

  return { fogMaterial };
}
