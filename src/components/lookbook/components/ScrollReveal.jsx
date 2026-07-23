import { useEffect } from 'react';

// Marks each panel with `data-inview` as it enters the viewport — the sole
// driver of the deck's single, subtle fade-in (opacity only, no stagger, no
// re-trigger). Reveal-once, then unobserve.
//
// A data attribute (not a class) on purpose: React re-renders rewrite
// `className` (e.g. when `is-live` toggles) and would wipe an imperative
// class, but attributes React doesn't render are left untouched.
export default function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // No observer support — reveal everything so nothing stays hidden.
      document.querySelectorAll('.deck-panel').forEach((p) => {
        p.dataset.inview = '1';
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.inview = '1';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const panels = document.querySelectorAll('.deck-panel');
    panels.forEach((p) => io.observe(p));

    return () => io.disconnect();
  }, []);

  return null;
}
