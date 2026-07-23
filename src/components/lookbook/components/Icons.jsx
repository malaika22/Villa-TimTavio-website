export function IconSymbols() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <symbol id="icon-video" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="2" y="5" width="14" height="14" rx="2" />
        <path d="M16 9.5L22 6.5V17.5L16 14.5" strokeLinejoin="round" />
      </symbol>
      <symbol id="icon-image" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <circle cx="8" cy="10" r="1.6" />
        <path
          d="M2 17L8.5 11.5C9.2 10.9 10.2 10.9 10.9 11.5L16 16M14 14L16.3 12C17 11.4 18 11.4 18.7 12L22 15"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </symbol>
      <symbol id="icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
    </svg>
  );
}

export function MediaIcon({ name, className, size = 30, style }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      style={style}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
}

export function ChevronIcon({ className }) {
  return (
    <svg className={className} width="11" height="11">
      <use href="#icon-chevron" />
    </svg>
  );
}
