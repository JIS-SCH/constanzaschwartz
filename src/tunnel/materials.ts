import * as THREE from 'three';
import { isMobile } from '../utils/detect';

export function createNoiseTexture(): THREE.CanvasTexture {
  const size = isMobile() ? 128 : 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Values 180-255 (normalized ~0.7-1.0) — subtle grain when multiplied with color
    const v = 180 + Math.floor(Math.random() * 75);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createFogTexture(): THREE.CanvasTexture {
  const size = isMobile() ? 256 : 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.35)');
  gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}
