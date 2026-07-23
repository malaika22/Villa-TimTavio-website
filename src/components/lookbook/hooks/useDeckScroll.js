import { useCallback, useEffect, useRef, useState } from 'react';
import { getLenis, scrollByOffset } from '../lib/lenis';

function padIndex(n) {
  return String(n).padStart(2, '0');
}

// Ease factor for the page-cover / scrub — higher = snappier, lower = silkier.
// Kept snappy so pages track the wheel closely (no floaty lag).
const LERP = 0.16;
const LERP_SCRUB = 0.12;
// Idle settle: once the reader STOPS mid page-transition, ease to the nearest
// page boundary so they never rest on two half-pages. Never fires during an
// active scroll — the reader always dictates the pace.
const SETTLE_IDLE_MS = 360;
const SETTLE_THRESHOLD = 12;

// Mobile full-screen pages (the CSS sticky stack). Matches the sticky selectors
// in app.css — these are the only panels that "cover"; tall panels (galleries,
// program, plans) stay in natural flow and must never be settle-snapped.
const MOBILE_PAGE_SEL =
  '.deck-panel.is-cover, .deck-panel.is-text, .deck-panel.is-media, ' +
  '.deck-panel.is-vertical, .deck-panel.is-swivel, .deck-panel.is-closing, ' +
  '.deck-panel.is-aerial';

// Document flow offset via the offsetTop chain — stable regardless of sticky
// pinning (getBoundingClientRect().top reads 0 for a pinned page, which would
// make every pinned page look "aligned").
function docTop(el) {
  let y = 0;
  let n = el;
  while (n) {
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return y;
}

export default function useDeckScroll(slides) {
  const wrapRefs = useRef([]);
  const metaRef = useRef([]);
  const currentsRef = useRef([]); // lerped pixel / progress values per slide
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideStates, setSlideStates] = useState(() =>
    slides.map(() => ({
      panelIndex: 0,
      cueDown: false,
      cueText: 'Scroll to continue',
      indexText: '',
      progress: 0,
    })),
  );

  const setWrapRef = useCallback((index) => (el) => {
    wrapRefs.current[index] = el;
  }, []);

  const measure = useCallback(() => {
    const vh = window.innerHeight;
    // Vertical layout for narrow screens AND any portrait viewport (e.g. large
    // tablets like iPad Pro at 1024px portrait, where a width-only check misses).
    const isMobile = window.matchMedia('(max-width: 900px), (orientation: portrait)').matches;
    const meta = slides.map((slide, i) => {
      const wrap = wrapRefs.current[i];
      if (!wrap) return null;

      const slideEl = wrap.querySelector('.deck-slide');
      const track = wrap.querySelector('.deck-track');
      const panelEls = Array.from(wrap.querySelectorAll('.deck-panel'));
      const panels = panelEls.length;
      const isScrub = Boolean(slide.scrub);

      // Mobile: unfold everything into a plain vertical stack — including the
      // swivel, which renders as a plain full-screen page (no pinned scrub).
      // Clear any inline sizing so the responsive CSS owns the layout.
      if (isMobile) {
        panelEls.forEach((p) => {
          p.style.transform = '';
        });
        wrap.style.height = '';
        if (isScrub) slideEl.style.setProperty('--p', '1');
        return { wrap, slideEl, track, panels, pan: 0, isScrub: false, mobile: true };
      }

      // Desktop: stacked vertical pages. Panels sit absolutely on top of each
      // other; panel N slides up from below to cover panel N-1 as the wrap
      // scrolls — one consistent direction, no horizontal movement.
      let pan = 0;
      if (isScrub) {
        // Scrub slides expose scroll progress as a CSS variable that drives an
        // in-panel animation (the swivel door).
        const amount = slide.scrubAmount || 1.2;
        pan = vh * amount;
        wrap.style.height = `${vh + pan}px`;
      } else if (panels <= 1) {
        wrap.style.height = `${vh}px`;
      } else {
        pan = (panels - 1) * vh;
        wrap.style.height = `${vh + pan}px`;
      }

      return { wrap, slideEl, track, panelEls, panels, pan, isScrub, vh, mobile: isMobile };
    });

    metaRef.current = meta;
    if (currentsRef.current.length !== meta.length) {
      currentsRef.current = meta.map(() => 0);
    }
    return meta;
  }, [slides]);

  // Read scroll → target values; write lerped transforms every frame.
  const sampleTargets = useCallback(() => {
    const vh = window.innerHeight;
    const meta = metaRef.current;
    if (!meta.length) return { activeIdx: 0, nextStates: null };

    let activeIdx = 0;
    const nextStates = slides.map((slide, i) => {
      const m = meta[i];
      if (!m) {
        return {
          panelIndex: 0,
          cueDown: false,
          cueText: 'Scroll to continue',
          indexText: '',
          progress: 0,
          target: 0,
        };
      }

      const rect = m.wrap.getBoundingClientRect();

      // Mobile (non-scrub): natural vertical flow — only track the active slide.
      if (m.mobile && !m.isScrub) {
        if (rect.top <= vh * 0.5) activeIdx = i;
        return { panelIndex: 0, cueDown: false, cueText: '', indexText: '', progress: 0, target: 0 };
      }

      const raw = Math.min(Math.max(-rect.top, 0), m.pan);
      const progress = m.pan > 0 ? raw / m.pan : 0;

      let panelIndex = 0;
      let cueDown = false;
      let cueText = 'Scroll to continue';
      let indexText = '';

      if (m.isScrub) {
        cueDown = progress > 0.85;
      } else if (m.pan > 0 && m.panels > 1) {
        panelIndex = Math.min(m.panels - 1, Math.round(progress * (m.panels - 1)));
        const isLast = panelIndex >= m.panels - 1;
        cueDown = isLast;
        cueText = isLast ? 'Scroll for next chapter' : 'Scroll to continue';
        indexText = `${padIndex(panelIndex + 1)} / ${padIndex(m.panels)}`;
      }

      if (rect.top <= vh * 0.5) {
        activeIdx = i;
      }

      // Scrub targets are 0..1; pan targets are pixel offsets.
      const target = m.isScrub ? progress : raw;
      return { panelIndex, cueDown, cueText, indexText, progress, target };
    });

    return { activeIdx, nextStates };
  }, [slides]);

  const applyLerped = useCallback((nextStates, reduceMotion) => {
    const meta = metaRef.current;
    let moving = false;

    for (let i = 0; i < meta.length; i++) {
      const m = meta[i];
      const state = nextStates[i];
      if (!m || !state || (m.mobile && !m.isScrub)) continue;

      const target = state.target ?? 0;
      let current = currentsRef.current[i] ?? 0;
      const ease = m.isScrub ? LERP_SCRUB : LERP;

      if (reduceMotion) {
        current = target;
      } else {
        const delta = target - current;
        if (Math.abs(delta) > 0.05) {
          current += delta * ease;
          moving = true;
        } else {
          current = target;
        }
      }
      currentsRef.current[i] = current;

      if (m.isScrub) {
        m.slideEl.style.setProperty('--p', current.toFixed(4));
        state.progress = current;
      } else if (m.pan > 0 && m.panelEls) {
        // Page j slides up from below (offset vh → 0) across its scroll segment,
        // covering the page before it. Page 0 never moves.
        for (let j = 1; j < m.panelEls.length; j++) {
          const seg = Math.min(1, Math.max(0, (current - (j - 1) * m.vh) / m.vh));
          m.panelEls[j].style.transform = `translate3d(0, ${((1 - seg) * m.vh).toFixed(2)}px, 0)`;
        }
        const progress = current / m.pan;
        state.progress = progress;
        state.panelIndex = Math.min(
          m.panels - 1,
          Math.round(progress * (m.panels - 1)),
        );
      }
    }

    return moving;
  }, []);

  useEffect(() => {
    let resizeTimer;
    let idleTimer;
    let isSettling = false;
    let settleClearTimer;
    let raf = 0;
    let running = false;
    let idleFrames = 0;
    let lastActive = -1;
    let lastStatesKey = '';

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // When scrolling pauses mid page-transition inside a pinned chapter, gently
    // ease to the nearest page boundary so the reader never rests on two
    // half-pages. Skipped for the swivel scrub, single-page chapters, mobile,
    // and reduced motion; never runs during an active scroll.
    const maybeSettle = () => {
      if (isSettling) return;
      const vh = window.innerHeight;
      const meta = metaRef.current;

      for (const m of meta) {
        if (!m || m.mobile || m.isScrub || m.panels <= 1 || m.pan <= 0) continue;

        const rect = m.wrap.getBoundingClientRect();
        const isPinned = rect.top <= 0 && rect.bottom >= vh;
        if (!isPinned) continue;

        const raw = Math.min(Math.max(-rect.top, 0), m.pan);
        const target = Math.min(m.pan, Math.round(raw / m.vh) * m.vh);
        const delta = target - raw;

        if (Math.abs(delta) > SETTLE_THRESHOLD) {
          isSettling = true;
          scrollByOffset(delta, { duration: 0.8 });
          clearTimeout(settleClearTimer);
          settleClearTimer = setTimeout(() => {
            isSettling = false;
          }, 850);
        }
        break;
      }
    };

    // Mobile counterpart: the pages are a CSS sticky stack (no JS transforms),
    // so settle by nudging native scroll to the nearest full-screen page. Only
    // fires between two ADJACENT full-screen pages (~one viewport apart) — if a
    // tall page sits between the bracketing anchors we leave the reader alone.
    const maybeSettleMobile = () => {
      if (isSettling) return;
      const vh = window.innerHeight;
      const s = window.scrollY;

      const anchors = Array.from(document.querySelectorAll(MOBILE_PAGE_SEL))
        .map(docTop)
        .sort((a, b) => a - b);
      if (!anchors.length) return;

      let below = -Infinity;
      let above = Infinity;
      for (const t of anchors) {
        if (t <= s && t > below) below = t;
        if (t >= s && t < above) above = t;
      }
      if (!Number.isFinite(below) || !Number.isFinite(above)) return;

      const gap = above - below;
      if (gap === 0) return; // already resting on a page
      if (gap > vh * 1.15) return; // tall page between anchors — don't yank

      const target = s - below < above - s ? below : above;
      if (Math.abs(target - s) <= SETTLE_THRESHOLD) return;

      isSettling = true;
      window.scrollTo({ top: Math.round(target), behavior: 'smooth' });
      clearTimeout(settleClearTimer);
      settleClearTimer = setTimeout(() => {
        isSettling = false;
      }, 850);
    };

    const isMobileLayout = () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(max-width: 900px), (orientation: portrait)').matches;

    const scheduleSettle = () => {
      if (reduceMotion) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(
        isMobileLayout() ? maybeSettleMobile : maybeSettle,
        SETTLE_IDLE_MS,
      );
    };

    const tick = () => {
      const { activeIdx, nextStates } = sampleTargets();
      if (!nextStates) {
        running = false;
        return;
      }

      const moving = applyLerped(nextStates, reduceMotion);
      const lenisBusy = Boolean(getLenis()?.isScrolling);

      // Avoid React state thrash — only publish when the visible cue/index changes.
      const key = nextStates
        .map((s) => `${s.panelIndex}|${s.cueDown}|${s.indexText}|${s.cueText}`)
        .join(';');
      if (activeIdx !== lastActive || key !== lastStatesKey) {
        lastActive = activeIdx;
        lastStatesKey = key;
        setActiveSlide(activeIdx);
        setSlideStates(
          nextStates.map(({ panelIndex, cueDown, cueText, indexText, progress }) => ({
            panelIndex,
            cueDown,
            cueText,
            indexText,
            progress,
          })),
        );
      }

      if (moving || lenisBusy) {
        idleFrames = 0;
        raf = requestAnimationFrame(tick);
        return;
      }

      if (++idleFrames < 20) {
        raf = requestAnimationFrame(tick);
        return;
      }

      running = false;
    };

    const kick = () => {
      if (!isSettling) scheduleSettle();
      if (!running) {
        running = true;
        idleFrames = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measure();
        currentsRef.current = metaRef.current.map((m) => {
          if (!m || (m.mobile && !m.isScrub)) return 0;
          const rect = m.wrap.getBoundingClientRect();
          const raw = Math.min(Math.max(-rect.top, 0), m.pan);
          return m.isScrub ? (m.pan > 0 ? raw / m.pan : 0) : raw;
        });
        kick();
      }, 150);
    };

    measure();
    kick();

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('wheel', kick, { passive: true });
    window.addEventListener('touchmove', kick, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('wheel', kick);
      window.removeEventListener('touchmove', kick);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      clearTimeout(idleTimer);
      clearTimeout(settleClearTimer);
    };
  }, [measure, sampleTargets, applyLerped]);

  return { activeSlide, slideStates, setWrapRef };
}
