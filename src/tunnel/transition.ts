import * as THREE from 'three';

export function createBlackout(camera: THREE.Camera) {
  // Full-screen blackout plane, always in front of camera
  // Sized large enough to fill the viewport at z=-2 from camera
  const geometry = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -2;
  mesh.renderOrder = 999;
  mesh.name = 'blackout';

  // Attach to camera so it always stays in front
  camera.add(mesh);

  return { mesh, material };
}
