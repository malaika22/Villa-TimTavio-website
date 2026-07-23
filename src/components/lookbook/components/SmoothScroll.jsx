'use client';

import { useEffect } from 'react';
import { startLenis, stopLenis } from '../lib/lenis';

// Capitolium / GSAP-style inertia on wheel — softens the sticky-deck scrub so
// panels ease instead of locking 1:1 with every tick of the scroll wheel.
export default function SmoothScroll() {
  useEffect(() => {
    startLenis();
    return () => stopLenis();
  }, []);

  return null;
}
