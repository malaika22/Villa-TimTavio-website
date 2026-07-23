import { RAIL_ITEMS } from '../data/slides';

function slideIdToNum(id) {
  return parseInt(id.replace('slide-', ''), 10);
}

export default function ProgressRail({ activeSlide, slides }) {
  const activeNum = slides[activeSlide] ? slideIdToNum(slides[activeSlide].id) : -1;

  return (
    <div className="rail" id="rail">
      {RAIL_ITEMS.map((item) => (
        <span key={item.slide}>
          {item.gapBefore && <span className="rail-gap" />}
          <a
            className={`rail-dot${activeNum === item.slide ? ' is-active' : ''}`}
            href={`#slide-${item.slide}`}
            data-slide={item.slide}
            title={item.title}
          />
        </span>
      ))}
    </div>
  );
}
