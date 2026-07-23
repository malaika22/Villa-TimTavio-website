import Lenis from 'lenis';

let lenis = null;
let rafId = 0;

export function getLenis() {
  return lenis;
}

export function startLenis() {
  if (lenis) return lenis;

  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return null;

  // Touch devices already have momentum scroll — Lenis can feel laggy there.
  // Keep the cinematic smooth scroll for pointer/desktop only.
  const isTouch =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch) return null;

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.4,
    wheelMultiplier: 0.85,
    anchors: true,
  });

  document.documentElement.classList.add('has-smooth-scroll');

  const raf = (time) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return lenis;
}

export function stopLenis() {
  cancelAnimationFrame(rafId);
  rafId = 0;
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  document.documentElement.classList.remove('has-smooth-scroll');
}

export function scrollByOffset(delta, opts = {}) {
  const instance = getLenis();
  const top = window.scrollY + delta;
  if (instance) {
    instance.scrollTo(top, { duration: opts.duration ?? 0.85, ...opts });
    return;
  }
  window.scrollTo({ top, behavior: opts.immediate ? 'auto' : 'smooth' });
}
