import { MediaIcon } from './Icons';
import { mediaSource } from '../lib/mediaAssets';
import { optimizeImageUrl } from '../lib/cloudinary';

function Headline({ text, style, className = 'deck-headline' }) {
  const lines = text.split('\n');
  return (
    <h2 className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </h2>
  );
}

function PanelMedia({ media, variant, className, fit = 'contain', priority = false, shouldLoad = true, kenBurns = false }) {
  if (!media || !shouldLoad) return null;

  const src = mediaSource(media, variant);
  if (!src) return null;

  const fillClass = fit === 'cover' ? ' media-fill' : '';
  const kbClass = kenBurns ? ' kb' : '';

  if (media.resourceType === 'video') {
    return (
      <video
        className={`${className}${fillClass}`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
      />
    );
  }

  return (
    <img
      className={`${className}${fillClass}${kbClass}`}
      src={src}
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}

function BackgroundMedia({ media, variant, priority, shouldLoad }) {
  if (!media || !shouldLoad) return null;

  const src = mediaSource(media, variant);
  if (!src) return null;

  return (
    <img
      className="deck-panel-bg-img"
      src={src}
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      aria-hidden="true"
    />
  );
}

function GalleryPanel({ panel, isNearActive }) {
  return (
    <div className="deck-panel is-gallery">
      {panel.columns.map((col, i) => (
        <div key={i} className="gallery-col">
          {col.media ? (
            <PanelMedia
              media={col.media}
              variant="gallery"
              fit={col.fit || 'cover'}
              className="gallery-col-media"
              priority={isNearActive}
              shouldLoad={isNearActive}
            />
          ) : (
            <div className="gallery-col-bg" style={{ background: col.bg }} />
          )}
          {!col.media && col.kind && (
            <div className="gallery-col-label">
              <MediaIcon name={col.icon} size={22} style={{ color: 'rgba(255,255,255,0.45)' }} />
              <div className="deck-media-kind">{col.kind}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MediaContent({ panel }) {
  const hasMedia = Boolean(panel.media);
  const isFill = panel.mediaFit === 'cover';

  if (isFill && !panel.caption) return null;

  return (
    <>
      {!hasMedia && panel.icon && <MediaIcon name={panel.icon} className="deck-media-icon" />}
      {panel.headline && <Headline text={panel.headline} style={panel.headlineStyle} />}
      {!hasMedia && panel.kind && (
        <div className="deck-media-kind" style={panel.kindStyle}>
          {panel.kind}
        </div>
      )}
      {panel.caption && (
        <div className={`deck-media-caption${isFill ? ' deck-media-caption--fill' : ''}`}>
          {panel.caption}
        </div>
      )}
    </>
  );
}

// A dimmed cover image + gradient scrim shared by the editorial variants.
function BackdropImage({ panel, priority, shouldLoad, dim = true }) {
  return (
    <>
      {panel.bg && <div className="deck-panel-bg" style={{ background: panel.bg }} />}
      {panel.imageUrl && shouldLoad && (
        <img
          className={`deck-panel-bg-img${dim ? ' is-dim' : ''}`}
          src={optimizeImageUrl(panel.imageUrl, { width: 2560 })}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          aria-hidden="true"
        />
      )}
      {panel.overlay && <div className="deck-panel-overlay" style={{ background: panel.overlay }} />}
    </>
  );
}

function PlaceholderNote({ note }) {
  if (!note) return null;
  return <div className="panel-placeholder-note">{note}</div>;
}

// ── Signature: 16ft swivel door, scrubbed by scroll progress (--p) ──
function SwivelPanel({ panel, priority, shouldLoad }) {
  return (
    <div className="deck-panel is-swivel">
      <div className="swivel-reveal">
        {panel.bg && <div className="deck-panel-bg" style={{ background: panel.bg }} />}
        {panel.revealImageUrl && shouldLoad && (
          <img className="swivel-reveal-img" src={optimizeImageUrl(panel.revealImageUrl, { width: 2560 })} alt="" aria-hidden="true" decoding="async" />
        )}
        <div className="swivel-reveal-scrim" />
      </div>

      <div className="swivel-stage">
        <div className="swivel-door">
          {panel.doorImageUrl && shouldLoad ? (
            <img className="swivel-door-img" src={optimizeImageUrl(panel.doorImageUrl, { width: 2560 })} alt="" aria-hidden="true" decoding="async" />
          ) : (
            <div className="swivel-door-face" />
          )}
          <div className="swivel-door-edge" />
          <div className="swivel-door-handle" />
        </div>
      </div>

      <div className="deck-panel-content is-center swivel-copy">
        {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
        <Headline text={panel.headline} style={panel.headlineStyle} />
        {panel.body && <p className="deck-body">{panel.body}</p>}
      </div>

      {panel.hint && (
        <div className="swivel-hint">
          <span className="swivel-hint-inner">{panel.hint}</span>
        </div>
      )}
    </div>
  );
}

// ── 24-hour culinary program ──
function ProgramPanel({ panel, priority, shouldLoad, isPanelActive }) {
  return (
    <div className={`deck-panel is-program${isPanelActive ? ' is-live' : ''}`}>
      <BackdropImage panel={panel} priority={priority} shouldLoad={shouldLoad} />
      <div className="deck-panel-content program-content">
        <div className="program-intro">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
          {panel.body && <p className="deck-body">{panel.body}</p>}
        </div>
        <ol className="program-rail">
          {panel.windows.map((w, i) => (
            <li className="program-window" key={i} style={{ '--i': i }}>
              <span className="program-time">{w.time}</span>
              <span className="program-dot" />
              <span className="program-text">
                <span className="program-title">{w.title}</span>
                <span className="program-desc">{w.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ── Premium amenities ──
function AmenitiesPanel({ panel, priority, shouldLoad, isPanelActive }) {
  return (
    <div className={`deck-panel is-amenities${isPanelActive ? ' is-live' : ''}`}>
      <BackdropImage panel={panel} priority={priority} shouldLoad={shouldLoad} />
      <div className="deck-panel-content amenities-content">
        <div className="amenities-intro">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
        </div>
        <div className="amenities-grid">
          {panel.items.map((it, i) => (
            <div className="amenity-card" key={i} style={{ '--i': i }}>
              <span className="amenity-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="amenity-title">{it.title}</span>
              <span className="amenity-desc">{it.desc}</span>
            </div>
          ))}
        </div>
        <PlaceholderNote note={panel.placeholderNote} />
      </div>
    </div>
  );
}

// ── Production footprint (spec sheet) ──
function SpecPanel({ panel, priority, shouldLoad, isPanelActive }) {
  return (
    <div className={`deck-panel is-spec${isPanelActive ? ' is-live' : ''}`}>
      <BackdropImage panel={panel} priority={priority} shouldLoad={shouldLoad} />
      <div className="deck-panel-content spec-content">
        <div className="spec-intro">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
          {panel.body && <p className="deck-body">{panel.body}</p>}
        </div>
        <div className="spec-stats">
          {panel.stats.map((s, i) => (
            <div className="spec-stat" key={i} style={{ '--i': i }}>
              <span className="spec-value">{s.value}</span>
              <span className="spec-label">{s.label}</span>
            </div>
          ))}
        </div>
        <ul className="spec-points">
          {panel.points.map((p, i) => (
            <li key={i} style={{ '--i': i }}>{p}</li>
          ))}
        </ul>
        <PlaceholderNote note={panel.placeholderNote} />
      </div>
    </div>
  );
}

// ── Production village (neighbor residences) ──
function VillagePanel({ panel, priority, shouldLoad, isPanelActive }) {
  return (
    <div className={`deck-panel is-village${isPanelActive ? ' is-live' : ''}`}>
      <BackdropImage panel={panel} priority={priority} shouldLoad={shouldLoad} />
      <div className="deck-panel-content village-content">
        <div className="village-intro">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
          {panel.body && <p className="deck-body">{panel.body}</p>}
        </div>
        <div className="village-grid">
          {panel.properties.map((pr, i) => (
            <div className="village-card" key={i} style={{ '--i': i }}>
              <span className="village-pin" />
              <span className="village-name">{pr.name}</span>
              <span className="village-note">{pr.note}</span>
            </div>
          ))}
        </div>
        <PlaceholderNote note={panel.placeholderNote} />
      </div>
    </div>
  );
}

// ── Scale & corporate events ──
function ScalePanel({ panel, priority, shouldLoad, isPanelActive }) {
  return (
    <div className={`deck-panel is-scale${isPanelActive ? ' is-live' : ''}`}>
      <BackdropImage panel={panel} priority={priority} shouldLoad={shouldLoad} />
      <div className="deck-panel-content scale-content">
        <div className="scale-intro">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
          {panel.body && <p className="deck-body">{panel.body}</p>}
        </div>
        <div className="scale-grid">
          {panel.modes.map((m, i) => (
            <div className="scale-mode" key={i} style={{ '--i': i }}>
              <span className="scale-tag">{m.tag}</span>
              <span className="scale-title">{m.title}</span>
              <span className="scale-desc">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Production footprint: annotated site plan ──
function SiteplanPanel({ panel, isPanelActive }) {
  return (
    <div className={`deck-panel is-siteplan${isPanelActive ? ' is-live' : ''}`}>
      {panel.bg && <div className="deck-panel-bg" style={{ background: panel.bg }} />}
      {panel.overlay && <div className="deck-panel-overlay" style={{ background: panel.overlay }} />}
      <div className="deck-panel-content siteplan-content">
        <div className="siteplan-head">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
          {panel.legend && (
            <ul className="siteplan-legend">
              {panel.legend.map((l, i) => (
                <li key={i} className="sp-legend-item" style={{ '--i': i }}>
                  <span className={`sp-swatch sp-swatch--${l.key}`} />
                  {l.label}
                </li>
              ))}
            </ul>
          )}
          <PlaceholderNote note={panel.placeholderNote} />
        </div>

        <div className="siteplan-map">
          <svg viewBox="0 0 1000 640" className="sp-svg" role="img" aria-label="Illustrative site plan">
            {/* Pacific Ocean */}
            <path className="sp-ocean" d="M0,560 Q250,538 500,554 T1000,546 L1000,640 L0,640 Z" />
            <text className="sp-ocean-label" x="850" y="612">PACIFIC OCEAN</text>

            {/* Estate perimeter (gated, high-security) */}
            <rect className="sp-perimeter" x="380" y="140" width="470" height="382" rx="16" />

            {/* Villa & guest areas */}
            <g className="sp-anim" style={{ '--i': 1 }}>
              <rect className="sp-villa" x="470" y="352" width="205" height="92" rx="10" />
              <rect className="sp-villa" x="690" y="372" width="72" height="72" rx="8" />
              <rect className="sp-villa" x="422" y="384" width="60" height="60" rx="8" />
              <rect className="sp-pool" x="470" y="470" width="255" height="26" rx="13" />
              <text className="sp-label" x="576" y="336">Villa &amp; Guest Areas</text>
              <text className="sp-sublabel" x="597" y="490">infinity pool</text>
            </g>

            {/* Guest entry — top */}
            <g className="sp-anim" style={{ '--i': 2 }}>
              <line className="sp-guest-path" x1="600" y1="140" x2="600" y2="352" />
              <rect className="sp-gatepost" x="576" y="134" width="12" height="12" />
              <rect className="sp-gatepost" x="612" y="134" width="12" height="12" />
              <text className="sp-label sp-label--gold" x="600" y="120">24/7 Gated Guest Entry</text>
            </g>

            {/* Production staging lot — adjacent, outside perimeter */}
            <g className="sp-anim" style={{ '--i': 3 }}>
              <rect className="sp-lot" x="70" y="250" width="250" height="250" rx="8" />
              <rect className="sp-truck" x="96" y="286" width="86" height="30" rx="4" />
              <rect className="sp-truck" x="96" y="330" width="86" height="30" rx="4" />
              <rect className="sp-truck" x="198" y="286" width="96" height="74" rx="4" />
              <rect className="sp-basecamp" x="92" y="424" width="206" height="56" rx="6" />
              <text className="sp-label sp-label--gold" x="195" y="238">Production Staging Lot</text>
              <text className="sp-sublabel" x="245" y="304">grip trucks</text>
              <text className="sp-label sp-label--amber" x="195" y="458">Catering Basecamp</text>
            </g>

            {/* Service road + discreet crew circulation (separate from guests) */}
            <g className="sp-anim" style={{ '--i': 4 }}>
              <line className="sp-road" x1="320" y1="372" x2="380" y2="372" />
              <rect className="sp-gatepost" x="374" y="352" width="12" height="12" />
              <rect className="sp-gatepost" x="374" y="386" width="12" height="12" />
              <path className="sp-crew-path" d="M320,372 L400,372 L400,300" />
              <text className="sp-label sp-label--amber" x="352" y="418" textAnchor="middle">Discreet Crew Circulation</text>
            </g>

            {/* North arrow + scale */}
            <g className="sp-compass">
              <line x1="936" y1="92" x2="936" y2="52" />
              <path d="M936,46 L931,58 L941,58 Z" />
              <text x="936" y="108">N</text>
            </g>
            <g className="sp-scale">
              <line x1="70" y1="604" x2="190" y2="604" />
              <line x1="70" y1="598" x2="70" y2="610" />
              <line x1="190" y1="598" x2="190" y2="610" />
              <text x="130" y="626">50 m</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Aerial chapter — designed placeholder for the Sept/Oct drone shoot ──
function AerialPanel({ panel, isPanelActive }) {
  return (
    <div className={`deck-panel is-aerial${isPanelActive ? ' is-live' : ''}`}>
      {panel.bg && <div className="deck-panel-bg" style={{ background: panel.bg }} />}
      <div className="aerial-frame" aria-hidden="true">
        <span className="aerial-corner aerial-corner--tl" />
        <span className="aerial-corner aerial-corner--tr" />
        <span className="aerial-corner aerial-corner--bl" />
        <span className="aerial-corner aerial-corner--br" />
        <span className="aerial-reticle" />
        {panel.note && <span className="aerial-note">{panel.note}</span>}
      </div>
      <div className="deck-panel-content is-center aerial-content">
        {panel.eyebrow && <div className="deck-eyebrow aerial-eyebrow">{panel.eyebrow}</div>}
        <Headline text={panel.headline} style={panel.headlineStyle} />
        {panel.body && <p className="deck-body">{panel.body}</p>}
      </div>
    </div>
  );
}

// ── Executive floor plan — stylized, illustrative room map ──
function FloorplanPanel({ panel, isPanelActive }) {
  return (
    <div className={`deck-panel is-floorplan${isPanelActive ? ' is-live' : ''}`}>
      {panel.bg && <div className="deck-panel-bg" style={{ background: panel.bg }} />}
      {panel.overlay && <div className="deck-panel-overlay" style={{ background: panel.overlay }} />}
      <div className="deck-panel-content siteplan-content">
        <div className="siteplan-head">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
          {panel.body && <p className="deck-body">{panel.body}</p>}
          {panel.legend && (
            <ul className="siteplan-legend">
              {panel.legend.map((l, i) => (
                <li key={i} className="sp-legend-item" style={{ '--i': i }}>
                  <span className={`sp-swatch fp-swatch--${l.key}`} />
                  {l.label}
                </li>
              ))}
            </ul>
          )}
          <PlaceholderNote note={panel.placeholderNote} />
        </div>

        <div className="siteplan-map">
          <svg viewBox="0 0 1000 660" className="sp-svg" role="img" aria-label="Illustrative floor plan">
            {/* Outer shell */}
            <rect className="fp-shell" x="70" y="80" width="860" height="470" rx="18" />

            {/* Pivot door entry — top center */}
            <g>
              <circle className="fp-door" cx="500" cy="80" r="16" />
              <text className="sp-label sp-label--gold" x="500" y="48">Pivot Door Entry</text>
            </g>

            {/* King suites — west wing */}
            <g>
              <rect className="fp-suite" x="100" y="110" width="120" height="100" rx="8" />
              <rect className="fp-suite" x="230" y="110" width="120" height="100" rx="8" />
              <rect className="fp-suite" x="100" y="220" width="120" height="100" rx="8" />
              <rect className="fp-suite" x="230" y="220" width="120" height="100" rx="8" />
              <text className="sp-label" x="225" y="170">King Suites</text>
              <text className="sp-sublabel" x="225" y="192">I – IV · garden & ocean</text>
            </g>

            {/* Bunk room — east wing */}
            <g>
              <rect className="fp-bunk" x="770" y="110" width="130" height="120" rx="8" />
              <text className="sp-label" x="835" y="165">Bunk Room</text>
              <text className="sp-sublabel" x="835" y="187">sleeps 6+</text>
            </g>

            {/* Courtyard — sand heart of the plan */}
            <g>
              <circle className="fp-courtyard" cx="500" cy="230" r="88" />
              <text className="sp-label" x="500" y="225">Courtyard</text>
              <text className="sp-sublabel" x="500" y="247">sand · palapa</text>
            </g>

            {/* Social band — living, dining, bar */}
            <g>
              <rect className="fp-social" x="130" y="360" width="230" height="130" rx="8" />
              <text className="sp-label" x="245" y="415">Dining</text>
              <text className="sp-sublabel" x="245" y="437">seats 14 · open air</text>
              <rect className="fp-social" x="380" y="360" width="240" height="130" rx="8" />
              <text className="sp-label" x="500" y="415">Great Room</text>
              <text className="sp-sublabel" x="500" y="437">living · lounge</text>
              <rect className="fp-social" x="640" y="360" width="120" height="130" rx="8" />
              <text className="sp-label" x="700" y="415">Bar</text>
              <text className="sp-sublabel" x="700" y="437">architectural</text>
            </g>

            {/* Sun pit + rooftop stair — east */}
            <g>
              <circle className="fp-outdoor" cx="845" cy="420" r="55" />
              <text className="sp-label" x="845" y="415">Sun Pit</text>
              <text className="sp-sublabel" x="845" y="437">sunken lounge</text>
              <rect className="fp-stair" x="770" y="260" width="130" height="60" rx="6" />
              <text className="sp-sublabel" x="835" y="295">stair → rooftops</text>
            </g>

            {/* Infinity pool + ocean */}
            <g>
              <rect className="fp-pool" x="130" y="565" width="630" height="30" rx="15" />
              <text className="sp-sublabel" x="445" y="586" style={{ fill: 'rgba(255,255,255,0.75)' }}>infinity pool</text>
              <path className="sp-ocean" d="M0,625 Q250,610 500,620 T1000,615 L1000,660 L0,660 Z" />
              <text className="sp-ocean-label" x="960" y="650">PACIFIC</text>
            </g>

            {/* Compass */}
            <g className="sp-compass">
              <line x1="940" y1="620" x2="940" y2="585" />
              <path d="M940,579 L935,591 L945,591 Z" />
              <text x="940" y="640">N</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Welcome ritual (service list over image) ──
function ServicePanel({ panel, priority, shouldLoad, isPanelActive }) {
  return (
    <div className={`deck-panel is-service${isPanelActive ? ' is-live' : ''}`}>
      <BackdropImage panel={panel} priority={priority} shouldLoad={shouldLoad} />
      <div className="deck-panel-content service-content">
        <div className="service-intro">
          {panel.eyebrow && <div className="deck-eyebrow">{panel.eyebrow}</div>}
          <Headline text={panel.headline} style={panel.headlineStyle} />
        </div>
        <div className="service-grid">
          {panel.items.map((it, i) => (
            <div className="service-item" key={i} style={{ '--i': i }}>
              <span className="service-title">{it.title}</span>
              <span className="service-desc">{it.desc}</span>
            </div>
          ))}
        </div>
        <PlaceholderNote note={panel.placeholderNote} />
      </div>
    </div>
  );
}

export default function DeckPanel({ panel, isActive = false, isNearActive = false, isPanelActive = false }) {
  const shouldLoad = isNearActive || Boolean(panel.preload);
  const priority = isActive || Boolean(panel.preload);

  if (panel.variant === 'gallery') {
    return <GalleryPanel panel={panel} isNearActive={isNearActive} />;
  }
  if (panel.variant === 'swivel') {
    return <SwivelPanel panel={panel} priority={priority} shouldLoad={shouldLoad} />;
  }
  if (panel.variant === 'program') {
    return <ProgramPanel panel={panel} priority={priority} shouldLoad={shouldLoad} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'amenities') {
    return <AmenitiesPanel panel={panel} priority={priority} shouldLoad={shouldLoad} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'spec') {
    return <SpecPanel panel={panel} priority={priority} shouldLoad={shouldLoad} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'village') {
    return <VillagePanel panel={panel} priority={priority} shouldLoad={shouldLoad} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'scale') {
    return <ScalePanel panel={panel} priority={priority} shouldLoad={shouldLoad} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'siteplan') {
    return <SiteplanPanel panel={panel} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'floorplan') {
    return <FloorplanPanel panel={panel} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'aerial') {
    return <AerialPanel panel={panel} isPanelActive={isPanelActive} />;
  }
  if (panel.variant === 'service') {
    return <ServicePanel panel={panel} priority={priority} shouldLoad={shouldLoad} isPanelActive={isPanelActive} />;
  }

  const classNames = ['deck-panel'];
  if (panel.variant === 'cover') classNames.push('is-cover');
  if (panel.variant === 'text') classNames.push('is-text');
  if (panel.variant === 'media') {
    classNames.push('is-media');
    if (panel.mediaFit === 'cover') classNames.push('is-fill');
  }
  if (panel.variant === 'vertical') {
    classNames.push('is-vertical');
    if (panel.mediaFit === 'cover') classNames.push('is-fill');
  }
  if (panel.variant === 'closing') {
    classNames.push('is-center');
    classNames.push('is-closing');
  }
  if (isPanelActive) classNames.push('is-live');

  const mediaFit = panel.mediaFit || 'contain';
  const mediaClass = panel.variant === 'vertical' ? 'vt-media' : 'deck-panel-media';
  const hasBgImage = Boolean(panel.bgMedia);

  return (
    <div className={classNames.join(' ')}>
      {panel.bg && (!hasBgImage || !shouldLoad) && (
        <div className="deck-panel-bg" style={{ background: panel.bg }} />
      )}

      {hasBgImage && (
        <BackgroundMedia
          media={panel.bgMedia}
          variant="cover"
          priority={priority}
          shouldLoad={shouldLoad}
        />
      )}

      {panel.media && (panel.variant === 'media' || panel.variant === 'vertical') ? (
        <PanelMedia
          media={panel.media}
          variant={panel.variant === 'vertical' && mediaFit !== 'cover' ? 'vertical' : 'cover'}
          fit={mediaFit}
          className={mediaClass}
          priority={priority}
          shouldLoad={shouldLoad}
          kenBurns={panel.kenBurns}
        />
      ) : !hasBgImage && !panel.bg ? (
        <div className="deck-panel-bg" />
      ) : null}

      {panel.media &&
        (panel.variant === 'vertical' || panel.variant === 'media') &&
        panel.mediaFit === 'cover' && (
        <div
          className="deck-panel-overlay"
          style={{
            background:
              'linear-gradient(0deg, rgba(10,8,6,0.75) 0%, rgba(10,8,6,0) 50%)',
          }}
        />
      )}

      {panel.overlay && (
        <div className="deck-panel-overlay" style={{ background: panel.overlay }} />
      )}

      <div className="deck-panel-content" style={panel.contentStyle}>
        {panel.variant === 'cover' && (
          <>
            <div className="deck-eyebrow">{panel.eyebrow}</div>
            <h1 className="deck-headline">
              {panel.headline.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="deck-body">{panel.body}</p>
            {panel.coverCue && (
              <div className="deck-cover-cue">
                <div className="deck-cover-cue-line" />
                <span className="deck-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Begin the walkthrough
                </span>
              </div>
            )}
          </>
        )}

        {panel.variant === 'text' && (
          <>
            <Headline text={panel.headline} />
            <p className="deck-body">{panel.body}</p>
          </>
        )}

        {(panel.variant === 'media' || panel.variant === 'vertical') && (
          <MediaContent panel={panel} />
        )}

        {panel.variant === 'closing' && (
          <>
            <div className="deck-eyebrow closing-eyebrow">{panel.eyebrow}</div>
            <Headline text={panel.headline} style={panel.headlineStyle} className="deck-headline closing-headline" />
            {panel.divider && <span className="closing-divider" aria-hidden="true" />}
            {panel.tagline && <p className="closing-tagline">{panel.tagline}</p>}
            {panel.signoff && <p className="closing-signoff">{panel.signoff}</p>}
          </>
        )}
      </div>
    </div>
  );
}
