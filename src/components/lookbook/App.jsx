'use client';

import Nav from './components/Nav';
import ProgressRail from './components/ProgressRail';
import DeckSlide from './components/DeckSlide';
import Footer from './components/InquiryForm';
import AmbientAudio from './components/AmbientAudio';
import ScrollReveal from './components/ScrollReveal';
import SmoothScroll from './components/SmoothScroll';
import EnterGate from './components/EnterGate';
import { IconSymbols } from './components/Icons';
import { SLIDES } from './data/slides';
import useDeckScroll from './hooks/useDeckScroll';
import { useMediaPreload } from './hooks/useMediaPreload';
import { enrichSlides } from './lib/resolveMedia';

// IDs and z-index are derived from array position so sections can be added,
// removed, or reordered without hand-renumbering anchors or the rail.
const slides = enrichSlides(SLIDES).map((slide, i) => ({
  ...slide,
  id: `slide-${i}`,
  zIndex: i + 1,
}));

export default function App() {
  useMediaPreload(slides);
  const { activeSlide, slideStates, setWrapRef } = useDeckScroll(slides);

  return (
    <>
      <SmoothScroll />
      <EnterGate />
      <IconSymbols />
      <Nav />
      <ProgressRail activeSlide={activeSlide} slides={slides} />
      <AmbientAudio />
      <ScrollReveal />

      {slides.map((slide, i) => (
        <DeckSlide
          key={slide.id}
          slide={slide}
          slideState={slideStates[i]}
          wrapRef={setWrapRef(i)}
          isActive={activeSlide === i}
          isNearActive={Math.abs(activeSlide - i) <= 1}
        />
      ))}

      <Footer />
    </>
  );
}
