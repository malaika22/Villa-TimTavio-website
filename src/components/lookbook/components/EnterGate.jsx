'use client';

import { useEffect, useState } from 'react';

const darkLogo = '/lookbook/dark-logo.svg';

// A brief full-screen "tap to enter" cover, shown on every load. The visitor's
// tap is a real user gesture, so it both starts the ambient audio (via
// AmbientAudio's window listener) and plays a gate-split reveal — the two halves
// slide apart to unveil the walkthrough, echoing the villa's opening gates.
export default function EnterGate() {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (entered) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [entered]);

  if (entered) return null;

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => setEntered(true), 1150);
  };

  return (
    <div
      className={`enter-gate${leaving ? ' is-leaving' : ''}`}
      onClick={enter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') enter();
      }}
      role="button"
      tabIndex={0}
      aria-label="Enter Villa TimTavio"
    >
      <div className="enter-gate-half enter-gate-half--l" />
      <div className="enter-gate-half enter-gate-half--r" />
      <div className="enter-gate-seam" />
      <div className="enter-gate-inner">
        <div className="enter-eyebrow">Puerto Escondido, Oaxaca · Mexico</div>
        <img src={darkLogo} alt="Villa TimTavio" className="enter-logo" />
        <div className="enter-cue">
          <span className="enter-cue-line" />
          <span className="enter-cue-text">Tap to enter</span>
        </div>
      </div>
    </div>
  );
}
