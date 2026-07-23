import manifest from '../data/cloudinary-manifest.json';
import { cldCoverUrl, cldVideoUrl } from './cloudinary';

function mediaFromDirect(panel, resourceType = 'image') {
  if (panel.imageUrl) {
    return {
      url: panel.imageUrl,
      resourceType: panel.resourceType || resourceType,
      publicId: panel.publicId,
    };
  }

  if (!panel.publicId) return null;

  const type = panel.resourceType || resourceType;
  const url = type === 'video' ? cldVideoUrl(panel.publicId) : cldCoverUrl(panel.publicId);
  if (!url) return null;

  return {
    publicId: panel.publicId,
    url,
    resourceType: type,
  };
}

function normalize(value = '') {
  return value
    .toLowerCase()
    .replace(/^(image|video)\s*[·—\-|]\s*/i, '')
    .replace(/video\s*·\s*vertical\s*[·—\-]\s*/i, '')
    .replace(/video\s*·\s*horizontal\s*[·—\-]\s*/i, '')
    .replace(/#[0-9]+/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function scoreMatch(query, candidate) {
  const q = normalize(query);
  const c = normalize(candidate);
  if (!q || !c) return 0;
  if (c === q) return 100;
  if (c.includes(q) || q.includes(c)) return 80;

  const qTokens = q.split(' ').filter(Boolean);
  const cTokens = new Set(c.split(' ').filter(Boolean));
  const hits = qTokens.filter((t) => cTokens.has(t)).length;
  return hits > 0 ? (hits / qTokens.length) * 60 : 0;
}

function pickBest(pool, label, usedIds) {
  const ranked = pool
    .map((item) => {
      const folder = item.folder || '';
      const file = item.publicId.split('/').pop();
      const score = Math.max(
        scoreMatch(label, item.publicId),
        scoreMatch(label, folder),
        scoreMatch(label, file),
        scoreMatch(label, `${folder} ${file}`),
      );
      return { item, score };
    })
    .filter(({ item, score }) => score > 0 && !usedIds.has(item.publicId))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.item ?? null;
}

const usedIds = new Set();

export function resetMediaUsage() {
  usedIds.clear();
}

export function resolveMedia(label, resourceType = 'image') {
  if (!label) return null;

  const pool = resourceType === 'video' ? manifest.videos : manifest.images;
  if (!pool.length) return null;

  const exact = pool.find((item) => item.publicId === label && !usedIds.has(item.publicId));
  if (exact) {
    usedIds.add(exact.publicId);
    return {
      publicId: exact.publicId,
      url: exact.url,
      width: exact.width,
      height: exact.height,
      resourceType,
    };
  }

  const match = pickBest(pool, label, usedIds);
  if (!match) return null;

  usedIds.add(match.publicId);
  return {
    publicId: match.publicId,
    url: match.url,
    width: match.width,
    height: match.height,
    resourceType,
  };
}

function panelMedia(panel, fallbackLabel, resourceType = 'image') {
  if (panel.imageUrl || panel.publicId) {
    const fromManifest = panel.publicId
      ? resolveMedia(panel.publicId, panel.resourceType || resourceType)
      : null;
    if (fromManifest) return fromManifest;
    return mediaFromDirect(panel, resourceType);
  }
  if (fallbackLabel) {
    return resolveMedia(fallbackLabel, resourceType);
  }
  return null;
}

export function getManifestStats() {
  return {
    images: manifest.images.length,
    videos: manifest.videos.length,
    cloudName: manifest.cloudName,
    generatedAt: manifest.generatedAt,
  };
}

export function enrichPanel(panel) {
  const hasColumnMedia = panel.columns?.some((col) => col.imageUrl || col.publicId);
  const hasDirectMedia = Boolean(panel.imageUrl || panel.publicId || hasColumnMedia);
  const hasManifest = manifest.images.length > 0 || manifest.videos.length > 0;

  if (!hasManifest && !hasDirectMedia) {
    return panel;
  }

  if (panel.variant === 'gallery') {
    return {
      ...panel,
      columns: panel.columns.map((col) => {
        const type = col.resourceType || (col.icon === 'video' ? 'video' : 'image');
        const media = panelMedia(col, col.kind || col.mediaLabel || panel.mediaLabel, type);
        return media ? { ...col, media } : col;
      }),
    };
  }

  if (panel.variant === 'media' || panel.variant === 'vertical') {
    const type = panel.icon === 'video' ? 'video' : 'image';
    const media = panelMedia(panel, panel.kind, type);
    return media ? { ...panel, media } : panel;
  }

  if (panel.variant === 'text' || panel.variant === 'cover' || panel.variant === 'closing') {
    const media = panelMedia(panel, panel.mediaLabel || panel.headline, 'image');
    return media ? { ...panel, bgMedia: media } : panel;
  }

  return panel;
}

export function enrichSlides(slides) {
  resetMediaUsage();
  return slides.map((slide) => ({
    ...slide,
    panels: slide.panels.map(enrichPanel),
  }));
}
