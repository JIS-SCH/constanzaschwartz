import Lenis from 'lenis';

let instance: Lenis | null = null;

export function initLenis(): Lenis {
  instance = new Lenis({
    duration: 1.8,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
  });

  return instance;
}

export function destroyLenis() {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}

export function getLenis(): Lenis | null {
  return instance;
}
