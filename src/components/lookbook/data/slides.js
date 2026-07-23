// Villa TimTavio — a section-rich, stills-only walkthrough of the estate.
//
// Each chapter draws from its OWN Dropbox folder so no photograph is reused
// anywhere. Order is a cinematic day→night arc:
//   Arrival → The Estate (outdoor) → Interiors → Residences → The Evening
//   → The Location → Executive.
//
// These are best-pick images — swap individual ones freely; each panel takes
// one `imageUrl` (galleries take two). IDs & z-index are derived from array
// position in App.jsx, so sections can be added/removed/reordered freely.
//
// Images are hosted on Cloudinary (folder villa/) and optimized on delivery
// (f_auto → WebP/AVIF, q_auto:good, right-sized, retina-aware) via lib/cloudinary.

// Existing Cloudinary account for a handful of original frames (cover, pool
// aerial, the door face, the production texture). The section picks below live
// on the project's own Cloudinary (folder villa/) and are optimized on delivery.
const CLD = 'https://res.cloudinary.com/dgvqx0qje/image/upload';

// Curated picks — grouped by section, one folder per section, no duplicates.
const IMG = {
  // Arrival · Front Entrance Options
  fdApproach: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822856/villa/L1010161.jpg",
  fdThrough: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822413/villa/2J7A3531.jpg",
  fdWood: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822415/villa/L1000065.jpg",
  fdDoor: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822417/villa/2J7A3550.jpg",
  // Reveal · Website HiRes
  revealPalapa: 'https://res.cloudinary.com/esqw89g2/image/upload/v1784823331/villa/2J7A4259.jpg',

  // Estate · Courtyard (Wide Open View)
  ctWide: "https://res.cloudinary.com/esqw89g2/image/upload/v1784826322/villa/IMG_2547.jpg",
  ctA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822423/villa/IMG_2544.jpg",
  ctB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822424/villa/IMG_2549.jpg",
  // Estate · Pool (Pool and Curve Focus + Architecture Focus)
  poolHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822427/villa/2J7A3006.jpg",
  poolFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822429/villa/L1000600.jpg",
  // Estate · Curves & swoop roof (Architecture Focus)
  curveHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822431/villa/2J7A3476.jpg",
  curveA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822433/villa/2J7A3460.jpg",
  curveB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822435/villa/L1000040.jpg",
  // Estate · Brutalist forms (Architecture Focus)
  brutHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822437/villa/2J7A3017.jpg",
  brutFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822439/villa/2J7A3164.jpg",
  brutA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822441/villa/2J7A3113.jpg",
  brutB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822442/villa/2J7A3579.jpg",
  // Estate · Shadows & light (Architecture Focus)
  shadowHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822445/villa/2J7A3184.jpg",
  shadowA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822447/villa/2J7A3215.jpg",
  shadowB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822449/villa/2J7A3208.jpg",
  oculus: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822450/villa/L1000241.jpg",
  // Estate · Stairs (Architecture Focus)
  stairHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822453/villa/L1000677.jpg",
  stairA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822456/villa/2J7A4065.jpg",
  stairB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822458/villa/2J7A4122.jpg",
  // Estate · Objects & sculpture (Architecture Focus)
  objHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822459/villa/2J7A3371.jpg",
  objA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822461/villa/2J7A3940.jpg",
  objB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822463/villa/2J7A4126.jpg",
  // Estate · The Garden (dedicated "Plants" share)
  gardenHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822465/villa/2J7A3096.jpg",
  gardenMedia: "https://res.cloudinary.com/esqw89g2/image/upload/v1784826435/villa/2J7A3559-2.jpg",
  gardenA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784826422/villa/L1000129-2.jpg",
  gardenB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784826413/villa/L1010139.jpg",
  // Estate · The Architecture (villa-showing, day → dusk → night)
  archHero: 'https://res.cloudinary.com/esqw89g2/image/upload/v1784825112/villa/2J7A3335.jpg',
  archFeature: 'https://res.cloudinary.com/esqw89g2/image/upload/v1784825104/villa/2J7A2772.jpg',
  archA: 'https://res.cloudinary.com/esqw89g2/image/upload/v1784825107/villa/2J7A3070.jpg',
  archB: 'https://res.cloudinary.com/esqw89g2/image/upload/v1784822437/villa/2J7A3017.jpg',

  // Interiors · Great room (Living Room Bar Area)
  grHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822470/villa/L1000572.jpg",
  grFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822472/villa/L1000644.jpg",
  grA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822475/villa/L1000646.jpg",
  grB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822477/villa/L1010268.jpg",
  // Interiors · Bar (Living Room Bar Area)
  barHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822479/villa/L1010331.jpg",
  barA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822888/villa/L1010332.jpg",
  barB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822483/villa/L1010322.jpg",
  // Interiors · Indoor pool (Living Room Bar Area)
  ipHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822485/villa/L1010290.jpg",
  ipFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822487/villa/L1010303.jpg",
  // Interiors · Woven ceiling (Detail Focus)
  wcHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822949/villa/L1010012.jpg",
  wcFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822491/villa/L1000465.jpg",
  // Interiors · Dining (Dining Area)
  dnHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822493/villa/2J7A2841.jpg",
  dnFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822494/villa/2J7A2866.jpg",
  dnA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822497/villa/2J7A2792.jpg",
  dnB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822499/villa/2J7A3278.jpg",
  // Interiors · Kitchen (Dining Area)
  ktHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784828207/villa/2J7A2950.jpg",
  ktFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784828217/villa/2J7A3633.jpg",
  // Interiors · Culinary program bg (Dining Area)
  cpBg: "https://res.cloudinary.com/esqw89g2/image/upload/v1784823025/villa/L1000925.jpg",
  // Interiors · Craft & details (Interior Design Elements + Detail Focus)
  crHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822506/villa/2J7A3617.jpg",
  crA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822510/villa/2J7A3807.jpg",
  crB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822512/villa/2J7A3613.jpg",
  crFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822515/villa/L1010017.jpg",

  // Residences · King suites (King Suite)
  suHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822516/villa/2J7A2185.jpg",
  suFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822519/villa/2J7A2215.jpg",
  suA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822521/villa/L1000284.jpg",
  suB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822523/villa/2J7A2299.jpg",
  // Residences · Bathrooms (King Suite)
  baHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822524/villa/L1000300.jpg",
  baA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822527/villa/2J7A2354.jpg",
  baB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822529/villa/L1000320.jpg",
  // Residences · Bunk room (Bunk Room)
  bkHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822531/villa/2J7A2603.jpg",
  bkFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822533/villa/2J7A3452.jpg",
  bkPortrait: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822535/villa/2J7A2611.jpg",
  // Residences · Service bg (King Suite detail)
  svBg: "https://res.cloudinary.com/esqw89g2/image/upload/v1784823090/villa/L1000297.jpg",

  // Evening · Rooftop terraces (Rooftop Terraces)
  rfHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822539/villa/2J7A4044.jpg",
  rfA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784827271/villa/L1000607.jpg",
  rfB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822544/villa/L1000603.jpg",
  // Evening · Sun & social pit (Sun and Social Pit)
  spHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822546/villa/2J7A4204.jpg",
  spFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822548/villa/IMG_2278.jpg",
  spA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822550/villa/2J7A3099.jpg",
  spB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822552/villa/L1000672.jpg",
  // Evening · Golden hour (Interior Design Elements — daybeds)
  ghHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822554/villa/2J7A4081.jpg",
  ghFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822556/villa/2J7A4022.jpg",
  // Evening · Sunset (Website HiRes + Surrounding Location Views)
  ssHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784823058/villa/IMG_2300.jpg",
  ssFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822560/villa/2J7A2924.jpg",
  // Evening · After dark (Website HiRes + Architecture Focus)
  adHero: "https://res.cloudinary.com/esqw89g2/image/upload/v1784823081/villa/L1010043.jpg",
  adFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822563/villa/L1010068.jpg",

  // Location · Surrounding Location Views
  loA: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822566/villa/L1000112.jpg",
  loB: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822568/villa/L1000761.jpg",
  loFeature: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822565/villa/L1000779.jpg",

  // Executive · Retreat bg (Architecture Focus wide)
  retreatBg: "https://res.cloudinary.com/esqw89g2/image/upload/v1784822571/villa/2J7A4210.jpg",
};

export const PHASES = [
  { key: 'arrival', label: 'I · Arrival', startSlide: 1 },
  { key: 'estate', label: 'II · The Estate', startSlide: 3 },
  { key: 'interiors', label: 'III · Interiors', startSlide: 7 },
  { key: 'residences', label: 'IV · The Residences', startSlide: 13 },
  { key: 'evening', label: 'V · The Evening', startSlide: 17 },
  { key: 'location', label: 'VI · The Location', startSlide: 22 },
  { key: 'executive', label: 'VII · Executive', startSlide: 23 },
];

export const RAIL_ITEMS = [
  { slide: 0, title: 'Cover', gapBefore: false },
  { slide: 1, title: 'The Reveal', gapBefore: true },
  { slide: 2, title: 'The Front Door', gapBefore: false },
  { slide: 3, title: 'The Courtyard', gapBefore: true },
  { slide: 4, title: 'The Pool', gapBefore: false },
  { slide: 5, title: 'The Architecture', gapBefore: false },
  { slide: 6, title: 'The Garden', gapBefore: false },
  { slide: 7, title: 'The Great Room', gapBefore: true },
  { slide: 8, title: 'The Bar', gapBefore: false },
  { slide: 9, title: 'The Indoor Pool', gapBefore: false },
  { slide: 10, title: 'The Table', gapBefore: false },
  { slide: 11, title: 'The Kitchen', gapBefore: false },
  { slide: 12, title: 'Culinary Program', gapBefore: false },
  { slide: 13, title: 'The King Suites', gapBefore: true },
  { slide: 14, title: 'The Bathrooms', gapBefore: false },
  { slide: 15, title: 'The Bunk Room', gapBefore: false },
  { slide: 16, title: 'The Service', gapBefore: false },
  { slide: 17, title: 'Rooftop Terraces', gapBefore: true },
  { slide: 18, title: 'The Sun Pit', gapBefore: false },
  { slide: 19, title: 'Golden Hour', gapBefore: false },
  { slide: 20, title: 'The Sunset', gapBefore: false },
  { slide: 21, title: 'After Dark', gapBefore: false },
  { slide: 22, title: 'The Location', gapBefore: true },
  { slide: 23, title: 'The Aerial Chapter', gapBefore: true },
  { slide: 24, title: 'The Floor Plan', gapBefore: false },
  { slide: 25, title: 'Production Footprint', gapBefore: false },
  { slide: 26, title: 'The Retreat', gapBefore: false },
  { slide: 27, title: 'Closing', gapBefore: true },
];

export const NAV_LINKS = [
  { href: '#slide-1', label: 'Arrival' },
  { href: '#slide-7', label: 'Interiors' },
  { href: '#slide-23', label: 'Executive' },
];

// Shared gradient helpers
const warm = 'linear-gradient(160deg, rgb(36,26,16) 0%, rgb(58,44,28) 100%)';
const cool = 'linear-gradient(160deg, rgb(12,22,34) 0%, rgb(24,40,56) 100%)';
const stone = 'linear-gradient(160deg, rgb(22,20,18) 0%, rgb(40,38,34) 100%)';
const dusk = 'linear-gradient(160deg, rgb(40,22,16) 0%, rgb(64,34,22) 100%)';
const scrimBottom = 'linear-gradient(0deg, rgba(14,10,8,0.9) 0%, rgba(14,10,8,0.2) 60%)';

export const SLIDES = [
  // ── COVER ──────────────────────────────────────────────
  {
    meta: null,
    panels: [
      {
        variant: 'cover',
        publicId: 'hero-image_1_tzm5b5',
        imageUrl: `${CLD}/v1782492938/hero-image_1_tzm5b5.webp`,
        preload: true,
        bg: 'linear-gradient(150deg, rgb(18,14,8) 0%, rgb(38,28,14) 45%, rgb(42,54,40) 100%)',
        overlay: 'linear-gradient(0deg, rgba(20,14,10,0.92) 0%, rgba(20,14,10,0.35) 55%, rgba(20,14,10,0.15) 100%)',
        eyebrow: 'Puerto Escondido, Oaxaca · Mexico',
        headline: 'Where the Pacific\nbegins to whisper.',
        body: 'A walk through the estate — from the front door to the last light. Scroll to begin.',
        coverCue: true,
      },
    ],
  },

  // ═══ PHASE I · ARRIVAL ═══
  // 1 · THE REVEAL — the pivot door opens for the guest (desktop scrub)
  {
    scrub: true,
    scrubAmount: 1.35,
    meta: { phase: 'I · Arrival', page: 'The Reveal' },
    panels: [
      {
        variant: 'swivel',
        doorImageUrl: `${CLD}/v1782492909/the-arrival-image-1_1_gdh6kx.webp`,
        revealImageUrl: IMG.revealPalapa,
        preload: true,
        bg: 'linear-gradient(150deg, rgb(10,18,26) 0%, rgb(20,40,54) 60%, rgb(28,56,66) 100%)',
        eyebrow: 'The signature pivot door',
        headline: 'The door opens\nfor you.',
        body: 'The 16-foot pivot door turns, and the estate opens — the courtyard, the palapa, and the Pacific light beyond. Ambient music is already playing; the first drink is already being poured.',
        hint: 'Scroll to open the door',
      },
    ],
  },

  // 2 · THE FRONT DOOR — the gated entrance & the door up close
  {
    meta: { phase: 'I · Arrival', page: 'The Front Door' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.fdApproach,
        preload: true,
        bg: warm,
        overlay: scrimBottom,
        headline: 'A sanctuary that\nnever closes.',
        body: 'Behind a secure, 24-hour gated perimeter, a carved timber curve holds the signature pivot door — the only threshold between the outside world and the estate.',
      },
      {
        variant: 'media',
        imageUrl: IMG.fdThrough,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'Through the pivot door — the courtyard beyond',
      },
      {
        variant: 'gallery',
        columns: [
          { imageUrl: IMG.fdWood, fit: 'cover' },
          { imageUrl: IMG.fdDoor, fit: 'cover' },
        ],
      },
    ],
  },

  // ═══ PHASE II · THE ESTATE ═══
  // 3 · THE COURTYARD & PALAPA
  {
    meta: { phase: 'II · The Estate', page: 'The Courtyard' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.ctWide,
        preload: true,
        bg: warm,
        overlay: scrimBottom,
        headline: 'The courtyard\nholds the day.',
        body: 'Sand underfoot, native planting against raw concrete, and the palapa at the center — the open-air heart the whole estate is built around.',
      },
    ],
  },

  // 4 · THE POOL
  {
    meta: { phase: 'II · The Estate', page: 'The Pool' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.poolHero,
        preload: true,
        bg: cool,
        overlay: 'linear-gradient(0deg, rgba(8,16,26,0.88) 0%, rgba(8,16,26,0.2) 60%)',
        headline: 'The pool starts\nright at your feet.',
        body: 'The doors open completely to an unobstructed vista. The infinity pool bleeds directly into the beach and the Pacific. It is pure magic.',
      },
      {
        variant: 'media',
        imageUrl: IMG.poolFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'Down the sculpted steps to the water and the horizon',
      },
    ],
  },

  // 5 · THE ARCHITECTURE — the villa's forms, day into night
  {
    meta: { phase: 'II · The Estate', page: 'The Architecture' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.archHero,
        preload: true,
        bg: stone,
        overlay: scrimBottom,
        headline: 'One continuous\ngesture in concrete.',
        body: 'The swoop roof lifts over the great room, staircases pour down to the sand, and every level opens to the Pacific — the estate reads as a single sculpted form.',
      },
      {
        variant: 'media',
        imageUrl: IMG.archFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The curved deck stepping down to the infinity pool',
      },
      {
        variant: 'vertical',
        imageUrl: IMG.archA,
        bg: stone,
        preload: true,
        caption: 'Dusk over the great room — the swoop roof and the stair',
      },
    ],
  },

  // 10 · THE GARDEN — the native garden woven through the estate
  {
    meta: { phase: 'II · The Estate', page: 'The Garden' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.gardenHero,
        preload: true,
        bg: warm,
        overlay: scrimBottom,
        headline: 'The jungle\ncame first.',
        body: 'Native Oaxacan flora — cactus, plumeria, and desert bloom — is woven through the raw concrete at every turn: the original inhabitant of this land, kept exactly where it stood.',
      },
      {
        variant: 'media',
        imageUrl: IMG.gardenMedia,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'Prickly pear in bloom against the coast',
      },
      {
        variant: 'gallery',
        columns: [
          { imageUrl: IMG.gardenA, fit: 'cover' },
          { imageUrl: IMG.gardenB, fit: 'cover' },
        ],
      },
    ],
  },

  // ═══ PHASE III · INTERIORS ═══
  // 11 · THE GREAT ROOM
  {
    meta: { phase: 'III · Interiors', page: 'The Great Room' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.grHero,
        preload: true,
        bg: warm,
        overlay: scrimBottom,
        headline: 'The room has\nno fourth wall.',
        body: 'Deep sofas, woven textures, and a floor that runs straight out to the horizon — the great room opens completely to the sea air.',
      },
      {
        variant: 'media',
        imageUrl: IMG.grFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The living room under the curve, open to the Pacific',
      },
      {
        variant: 'gallery',
        columns: [
          { imageUrl: IMG.grA, fit: 'cover' },
          { imageUrl: IMG.grB, fit: 'cover' },
        ],
      },
    ],
  },

  // 12 · THE ARCHITECTURAL BAR
  {
    meta: { phase: 'III · Interiors', page: 'The Bar' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.barHero,
        preload: true,
        bg: warm,
        overlay: scrimBottom,
        headline: 'The first drink is\nalready poured.',
        body: 'The architectural bar anchors the great room — carved timber, open air, and the chef already plating fresh, local ceviche as you arrive.',
      },
      {
        variant: 'gallery',
        columns: [
          { imageUrl: IMG.barA, fit: 'cover' },
          { imageUrl: IMG.barB, fit: 'cover' },
        ],
      },
    ],
  },

  // 13 · THE INDOOR POOL
  {
    meta: { phase: 'III · Interiors', page: 'The Indoor Pool' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.ipHero,
        preload: true,
        bg: cool,
        overlay: 'linear-gradient(0deg, rgba(8,16,26,0.88) 0%, rgba(8,16,26,0.2) 60%)',
        headline: 'A pool that\ncomes indoors.',
        body: 'Water runs beneath the sheltered living space — the line between inside and out dissolves entirely under the curved roof.',
      },
      {
        variant: 'media',
        imageUrl: IMG.ipFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The covered pool, held between the columns',
      },
    ],
  },

  // 15 · DINING — THE TABLE
  {
    meta: { phase: 'III · Interiors', page: 'The Table' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.dnHero,
        preload: true,
        bg: 'linear-gradient(160deg, rgb(20,26,16) 0%, rgb(34,44,26) 100%)',
        overlay: scrimBottom,
        headline: 'No check-in.\nOnly dinner.',
        body: 'Guests flow from their suites straight into an open-air dinner beneath the sculpted stair — the table set, the ocean just beyond.',
      },
      {
        variant: 'media',
        imageUrl: IMG.dnFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The long table at golden hour',
      },
      {
        variant: 'gallery',
        columns: [
          { imageUrl: IMG.dnA, fit: 'cover' },
          { imageUrl: IMG.dnB, fit: 'cover' },
        ],
      },
    ],
  },

  // 16 · THE KITCHEN
  {
    meta: { phase: 'III · Interiors', page: 'The Kitchen' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.ktHero,
        preload: true,
        bg: stone,
        overlay: scrimBottom,
        headline: 'The kitchen is\npart of the room.',
        body: 'An open island, a black range, and the sea in the window — nothing about the cooking is hidden away.',
      },
      {
        variant: 'media',
        imageUrl: IMG.ktFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The prep counter and open shelving, dining just beyond',
      },
    ],
  },

  // 17 · CULINARY PROGRAM (editorial)
  {
    meta: { phase: 'III · Interiors', page: 'Culinary Program' },
    panels: [
      {
        variant: 'program',
        imageUrl: IMG.cpBg,
        preload: true,
        bg: 'linear-gradient(160deg, rgb(24,16,10) 0%, rgb(42,28,16) 55%, rgb(20,16,26) 100%)',
        overlay: 'linear-gradient(0deg, rgba(14,10,6,0.92) 0%, rgba(14,10,6,0.6) 100%)',
        eyebrow: 'Food & beverage, 24 hours a day',
        headline: 'The kitchen never\nfully sleeps.',
        body: 'A seamless, continuous culinary experience that follows the day around the clock.',
        windows: [
          { time: '07:00', title: 'Morning', desc: 'Gourmet breakfast and wellness elixirs.' },
          { time: '12:30', title: 'Mid-day', desc: 'Dynamic poolside bites and snacks.' },
          { time: '19:30', title: 'Evening', desc: 'Long architectural lunches and multi-course dinners.' },
          { time: '01:00', title: 'Late-night', desc: 'Bespoke cravings, on request.' },
        ],
      },
    ],
  },

  // 19 · THE KING SUITES
  {
    meta: { phase: 'IV · The Residences', page: 'The King Suites' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.suHero,
        preload: true,
        bg: warm,
        overlay: scrimBottom,
        headline: 'Your room was\nready before you.',
        body: 'Each guest is escorted to a private suite where their luggage already awaits — a room that opens to the garden and the sound of the Pacific.',
      },
      {
        variant: 'media',
        imageUrl: IMG.suFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'Headboard, textile, and the light beyond',
      },
    ],
  },

  // 20 · THE BATHROOMS
  {
    meta: { phase: 'IV · The Residences', page: 'The Bathrooms' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.baHero,
        preload: true,
        bg: stone,
        overlay: scrimBottom,
        headline: 'Stone, timber,\nand a round of light.',
        body: 'Cast basins, round mirrors, and regional amenities — the bathrooms carry the same material calm as the suites they belong to.',
      },
    ],
  },

  // 21 · THE BUNK ROOM
  {
    meta: { phase: 'IV · The Residences', page: 'The Bunk Room' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.bkHero,
        preload: true,
        bg: warm,
        overlay: scrimBottom,
        headline: 'Room for everyone\nyou brought.',
        body: 'A crafted bunk room extends the estate for families and larger groups — the same materials and calm as the suites, scaled for togetherness.',
      },
      {
        variant: 'media',
        imageUrl: IMG.bkFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'Twin beds in timber and concrete',
      },
      {
        variant: 'vertical',
        imageUrl: IMG.bkPortrait,
        mediaFit: 'cover',
        preload: true,
        caption: 'Lofted bunks, built in',
      },
    ],
  },

  // 22 · THE SERVICE (editorial)
  {
    meta: { phase: 'IV · The Residences', page: 'The Service' },
    panels: [
      {
        variant: 'amenities',
        imageUrl: IMG.svBg,
        preload: true,
        bg: 'linear-gradient(160deg, rgb(26,22,18) 0%, rgb(44,36,28) 100%)',
        overlay: 'linear-gradient(0deg, rgba(16,12,8,0.92) 0%, rgba(16,12,8,0.6) 100%)',
        eyebrow: 'Hyper-detailed hospitality',
        headline: 'Anticipated,\nnever asked for.',
        items: [
          { title: 'Impeccable turndown', desc: 'Suites reset each evening, quietly and completely.' },
          { title: 'Regional bath amenities', desc: 'Custom, locally sourced, replenished daily.' },
          { title: 'Intuitive house staff', desc: 'Highly trained to anticipate every movement.' },
        ],
      },
    ],
  },

  // ═══ PHASE V · THE EVENING ═══
  // 23 · ROOFTOP TERRACES
  {
    meta: { phase: 'V · The Evening', page: 'Rooftop Terraces' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.rfHero,
        preload: true,
        bg: dusk,
        overlay: scrimBottom,
        headline: 'Above everything.\nStill inside it.',
        body: 'The rooftop terraces sit above the canopy — daybeds open to the sky, the ocean, and a silence that only altitude brings.',
      },
      {
        variant: 'media',
        imageUrl: IMG.rfA,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The sunken rooftop lounge as the light goes gold',
      },
    ],
  },

  // 24 · THE SUN & SOCIAL PIT
  {
    meta: { phase: 'V · The Evening', page: 'The Sun Pit' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.spHero,
        preload: true,
        bg: dusk,
        overlay: scrimBottom,
        headline: 'Where the afternoon has\nno intention of ending.',
        body: 'The sunken social pit is the estate’s slowest place — built for the kind of afternoon that turns into evening without anyone noticing.',
      },
      {
        variant: 'media',
        imageUrl: IMG.spFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The pit as the sun goes down',
      },
      {
        variant: 'gallery',
        columns: [
          { imageUrl: IMG.spA, fit: 'cover' },
          { imageUrl: IMG.spB, fit: 'cover' },
        ],
      },
    ],
  },

  // 25 · GOLDEN HOUR
  {
    meta: { phase: 'V · The Evening', page: 'Golden Hour' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.ghHero,
        preload: true,
        bg: dusk,
        overlay: scrimBottom,
        headline: 'The whole estate\nturns gold.',
        body: 'Daybeds on the upper decks catch the last warm light — the hour the concrete glows and no one moves quickly.',
      },
      {
        variant: 'media',
        imageUrl: IMG.ghFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'Daybeds as the light drops',
      },
    ],
  },

  // 26 · THE SUNSET
  {
    meta: { phase: 'V · The Evening', page: 'The Sunset' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.ssHero,
        preload: true,
        bg: 'linear-gradient(160deg, rgb(44,22,16) 0%, rgb(70,36,22) 100%)',
        overlay: 'linear-gradient(0deg, rgba(24,10,8,0.88) 0%, rgba(24,10,8,0.15) 60%)',
        headline: 'The day ends where\nthe ocean begins.',
        body: 'From the terrace daybeds, the sun drops straight into the Pacific — the estate’s nightly, unticketed show.',
      },
      {
        variant: 'media',
        imageUrl: IMG.ssFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The beach at sunset — a few steps from the door',
      },
    ],
  },

  // 27 · AFTER DARK
  {
    meta: { phase: 'V · The Evening', page: 'After Dark' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.adHero,
        preload: true,
        bg: 'linear-gradient(160deg, rgb(10,12,18) 0%, rgb(20,24,34) 100%)',
        overlay: 'linear-gradient(0deg, rgba(6,8,12,0.9) 0%, rgba(6,8,12,0.2) 60%)',
        headline: 'Lit low,\nwarm, and quiet.',
        body: 'After dark the estate glows from within — the palapa a lantern over the water, the stairs traced in light.',
      },
      {
        variant: 'media',
        imageUrl: IMG.adFeature,
        mediaFit: 'cover',
        preload: true,
        icon: 'image',
        caption: 'The estate at dusk, coming alight',
      },
    ],
  },

  // ═══ PHASE VI · THE LOCATION ═══
  // 28 · THE LOCATION
  {
    meta: { phase: 'VI · The Location', page: 'The Location' },
    panels: [
      {
        variant: 'text',
        imageUrl: IMG.loFeature,
        preload: true,
        bg: cool,
        overlay: scrimBottom,
        headline: 'Puerto Escondido,\nuntamed.',
        body: 'The beach is minutes away, the lagoon and banana groves just beyond — the Pacific as it has always been, unhurried and enormous.',
      },
      {
        variant: 'gallery',
        columns: [
          { imageUrl: IMG.loA, fit: 'cover' },
          { imageUrl: IMG.loB, fit: 'cover' },
        ],
      },
    ],
  },

  // ═══ PHASE VII · EXECUTIVE ═══
  // 29 · THE AERIAL CHAPTER (placeholder for Sept/Oct drone shoot)
  {
    meta: { phase: 'Coming September · October', page: 'The Aerial Chapter' },
    panels: [
      {
        variant: 'aerial',
        bg: 'linear-gradient(170deg, rgb(10,14,20) 0%, rgb(16,24,34) 55%, rgb(12,16,14) 100%)',
        eyebrow: 'Drone photography & film · September – October 2026',
        headline: 'The estate,\nfrom above.',
        body: 'A dedicated aerial chapter lands here after the drone shoot — sweeping coastline approaches, the rooftop geometry, and the jungle canopy in motion.',
        note: 'Reserved for aerial hero footage',
      },
    ],
  },

  // 30 · THE FLOOR PLAN
  {
    meta: { phase: 'VII · Executive', page: 'The Floor Plan' },
    panels: [
      {
        variant: 'floorplan',
        bg: 'radial-gradient(120% 100% at 70% 0%, rgb(20,22,26) 0%, rgb(12,13,16) 70%)',
        eyebrow: 'Room assignment · illustrative',
        headline: 'Every room,\nalready decided.',
        body: 'Assign suites before wheels-down — the estate at a glance for planners, EAs, and production leads.',
        legend: [
          { key: 'suite', label: 'King suites' },
          { key: 'bunk', label: 'Bunk room' },
          { key: 'social', label: 'Living, dining & bar' },
          { key: 'outdoor', label: 'Pool, pit & terraces' },
        ],
        placeholderNote: 'Schematic — replace with surveyed floor plan when available',
      },
    ],
  },

  // 31 · PRODUCTION FOOTPRINT
  {
    meta: { phase: 'VII · Executive', page: 'Production Footprint' },
    panels: [
      {
        variant: 'text',
        publicId: 'the-architecture-2_1_dshryn',
        imageUrl: `${CLD}/v1782493282/the-architecture-2_1_dshryn.webp`,
        preload: true,
        bg: 'linear-gradient(160deg, rgb(16,16,18) 0%, rgb(30,30,34) 100%)',
        overlay: 'linear-gradient(0deg, rgba(10,10,12,0.9) 0%, rgba(10,10,12,0.3) 60%)',
        headline: 'Built for productions,\nnot just guests.',
        body: 'A gated, high-security perimeter and a dedicated adjacent lot secured specifically for production staging, grip trucks, and catering basecamps.',
      },
      {
        variant: 'siteplan',
        bg: 'radial-gradient(120% 100% at 70% 0%, rgb(20,22,26) 0%, rgb(12,13,16) 70%)',
        eyebrow: 'Site plan · illustrative',
        headline: 'The logistics are\nalready solved.',
        legend: [
          { key: 'estate', label: 'Villa & guest areas' },
          { key: 'staging', label: 'Production staging lot' },
          { key: 'basecamp', label: 'Catering basecamp' },
          { key: 'crew', label: 'Discreet crew circulation' },
        ],
        placeholderNote: 'Schematic — replace with surveyed site plan / aerial when available',
      },
      {
        variant: 'spec',
        bg: 'linear-gradient(160deg, rgb(14,14,16) 0%, rgb(26,26,30) 100%)',
        overlay: 'linear-gradient(0deg, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.55) 100%)',
        eyebrow: 'Operational footprint',
        headline: 'Everything a unit\nneeds, on site.',
        stats: [
          { value: '24/7', label: 'Gated high-security perimeter' },
          { value: 'Adjacent', label: 'Dedicated staging lot secured' },
          { value: 'Full', label: 'Grip, truck & basecamp access' },
        ],
        points: [
          'Controlled single-point entry with round-the-clock security',
          'Adjacent lot for production staging & grip trucks',
          'Dedicated catering basecamp footprint',
          'Discreet crew circulation, separate from guest areas',
        ],
      },
    ],
  },

  // 32 · THE RETREAT
  {
    meta: { phase: 'VII · Executive', page: 'The Retreat' },
    panels: [
      {
        variant: 'scale',
        imageUrl: IMG.retreatBg,
        preload: true,
        bg: 'linear-gradient(160deg, rgb(16,18,22) 0%, rgb(30,34,40) 100%)',
        overlay: 'linear-gradient(0deg, rgba(8,10,14,0.9) 0%, rgba(8,10,14,0.45) 100%)',
        eyebrow: 'Private, by invitation',
        headline: 'Reserved for\nthe few.',
        body: 'The estate is offered to a small circle at a time — private by design, and entirely yours for the moment you are here.',
        modes: [
          { tag: 'Stays', title: 'Invite-only', desc: 'Private stays for you and your guests.' },
          { tag: 'Business', title: 'Executive offsites', desc: 'Leadership retreats and strategy sessions.' },
          { tag: 'Hosting', title: 'VIP hosting', desc: 'Discreet, high-touch service throughout.' },
        ],
      },
    ],
  },

  // 33 · CLOSING
  {
    meta: null,
    panels: [
      {
        variant: 'closing',
        bg: 'linear-gradient(150deg, rgb(16,12,8) 0%, rgb(34,26,14) 50%, rgb(36,46,34) 100%)',
        overlay: 'radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 0%, rgba(10,8,6,0.7) 100%)',
        eyebrow: 'By invitation · Puerto Escondido, Oaxaca',
        headline: 'This is\nVilla TimTavio.',
        headlineStyle: { fontSize: 'clamp(44px,6vw,84px)' },
        divider: true,
        tagline: 'Where the Pacific begins to whisper.',
        signoff: 'We look forward to your arrival.',
      },
    ],
  },
];
