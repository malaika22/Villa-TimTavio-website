'use client';

import { useEffect, useRef, useState } from 'react';

// Ambient bed: audio extracted from the client-provided video, bundled at
// public/lookbook/ambient.m4a (AAC).
const TARGET_VOLUME = 0.35;
const FADE_MS = 1300;

function SoundIcon({ on }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      {on ? (
        <>
          <path d="M16.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 6a8 8 0 0 1 0 12" />
        </>
      ) : (
        <path d="M17 9l4 6M21 9l-4 6" />
      )}
    </svg>
  );
}

// Ambient sound is ON by default. Browsers block audio until the visitor
// interacts, so we attempt to play on load and — if blocked — start on the
// first click/tap/keypress anywhere. The toggle then lets them mute.
export default function AmbientAudio() {
  const audioRef = useRef(null);
  const rafRef = useRef(0);
  const fadeToRef = useRef(0);
  const onRef = useRef(true);
  const startedRef = useRef(false);
  const [on, setOn] = useState(true);
  // Until audio actually starts, invite a tap (desktop scroll can't unlock audio).
  const [started, setStarted] = useState(false);

  const fadeAudio = (to, onDone) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(rafRef.current);
    clearTimeout(fadeToRef.current);
    const target = Math.max(0, Math.min(1, to));
    const from = audio.volume;
    const start = performance.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(fadeToRef.current);
      audio.volume = target;
      if (onDone) onDone();
    };
    const tick = (now) => {
      const p = Math.min(1, (now - start) / FADE_MS);
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else finish();
    };
    rafRef.current = requestAnimationFrame(tick);
    // Safety net: if rAF is throttled (e.g. background tab), still reach target.
    fadeToRef.current = setTimeout(finish, FADE_MS + 150);
  };

  const tryStart = async () => {
    const audio = audioRef.current;
    if (!audio || startedRef.current || !onRef.current) return;
    audio.volume = 0;
    try {
      await audio.play();
      startedRef.current = true;
      setStarted(true);
      fadeAudio(TARGET_VOLUME);
    } catch {
      // Autoplay still blocked — a later real gesture will retry.
    }
  };

  useEffect(() => {
    // Whenever the audio actually plays (by any path), drop the "tap" prompt.
    const audio = audioRef.current;
    const onPlaying = () => {
      startedRef.current = true;
      setStarted(true);
    };
    if (audio) audio.addEventListener('playing', onPlaying);

    tryStart(); // attempt immediate autoplay (works if the browser allows it)

    const evs = ['pointerdown', 'touchstart', 'keydown'];
    const onGesture = (e) => {
      // Let the toggle button manage its own clicks.
      if (e.target && e.target.closest && e.target.closest('.audio-toggle')) return;
      tryStart();
      if (startedRef.current) evs.forEach((ev) => window.removeEventListener(ev, onGesture));
    };
    evs.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));

    return () => {
      if (audio) audio.removeEventListener('playing', onPlaying);
      evs.forEach((ev) => window.removeEventListener(ev, onGesture));
      cancelAnimationFrame(rafRef.current);
      clearTimeout(fadeToRef.current);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;

    // On visually, but autoplay was blocked and it never started → start it.
    if (on && !startedRef.current) {
      await tryStart();
      return;
    }

    if (!on) {
      onRef.current = true;
      setOn(true);
      if (audio) {
        audio.volume = 0;
        try {
          await audio.play();
          startedRef.current = true;
          setStarted(true);
          fadeAudio(TARGET_VOLUME);
        } catch {
          /* ignore */
        }
      }
    } else {
      onRef.current = false;
      setOn(false);
      if (audio && !audio.paused) fadeAudio(0, () => audio.pause());
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/lookbook/ambient.m4a" loop preload="auto" />
      <button
        type="button"
        className={`audio-toggle${on ? ' is-on' : ''}${!started ? ' has-hint' : ''}`}
        onClick={toggle}
        aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
      >
        <SoundIcon on={on} />
        <span className="audio-toggle-label">Sound</span>
        {!started && <span className="audio-hint">Tap for sound</span>}
      </button>
    </>
  );
}
