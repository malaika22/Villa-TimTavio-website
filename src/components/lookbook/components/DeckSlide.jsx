import DeckPanel from './DeckPanel';
import { ChevronIcon } from './Icons';

export default function DeckSlide({ slide, slideState, wrapRef, isActive, isNearActive }) {
  const { panelIndex, cueDown, cueText, indexText } = slideState;
  const hasMeta = Boolean(slide.meta);
  const hasCue = hasMeta && slide.panels.length > 1;

  return (
    <section
      className={`deck-wrap${slide.scrub ? ' is-scrub' : ''}`}
      id={slide.id}
      style={{ zIndex: slide.zIndex }}
      ref={wrapRef}
    >
      <div className="deck-slide">
        {hasMeta && (
          <div className="deck-meta">
            <div className="deck-meta-phase">{slide.meta.phase}</div>
            <div className="deck-meta-page">{slide.meta.page}</div>
          </div>
        )}

        {hasCue && indexText && (
          <div className="deck-index">{indexText}</div>
        )}

        {hasCue && (
          <div className={`deck-cue${cueDown ? ' is-down' : ''}`}>
            <span>{cueText}</span>
            <ChevronIcon className="deck-cue-chevron" />
          </div>
        )}

        <div className="deck-track">
          {slide.panels.map((panel, i) => (
            <DeckPanel
              key={`${slide.id}-panel-${i}`}
              panel={panel}
              isActive={isActive}
              isNearActive={isNearActive}
              isPanelActive={isActive && panelIndex === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
