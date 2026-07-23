import { useEffect } from 'react';
import { optimizeImageUrl, optimizeVideoUrl } from '../lib/cloudinary';

function collectPanelMedia(panel, items) {
  const add = (media, variant = 'cover') => {
    if (!media?.url && !media?.publicId) return;
    const url = media.url;
    if (!url) return;

    const type = media.resourceType === 'video' ? 'video' : 'image';
    const width = variant === 'gallery' ? 1600 : variant === 'vertical' ? 1800 : 2560;
    const optimized =
      type === 'video' ? optimizeVideoUrl(url, { width }) : optimizeImageUrl(url, { width });

    items.push({ url: optimized, type, priority: Boolean(panel.preload) });
  };

  if (panel.bgMedia) add(panel.bgMedia, 'cover');
  if (panel.media) add(panel.media, panel.variant === 'vertical' ? 'vertical' : 'cover');

  if (panel.imageUrl) {
    const type = panel.resourceType === 'video' ? 'video' : 'image';
    const width = 2560;
    const optimized =
      type === 'video'
        ? optimizeVideoUrl(panel.imageUrl, { width })
        : optimizeImageUrl(panel.imageUrl, { width });
    items.push({ url: optimized, type, priority: Boolean(panel.preload) });
  }

  panel.columns?.forEach((col) => {
    if (col.media) add(col.media, 'gallery');
    else if (col.imageUrl) {
      items.push({
        url: optimizeImageUrl(col.imageUrl, { width: 1600 }),
        type: 'image',
        priority: false,
      });
    }
  });
}

function collectAllMedia(slides) {
  const items = [];
  const seen = new Set();

  slides.forEach((slide) => {
    slide.panels.forEach((panel) => collectPanelMedia(panel, items));
  });

  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function preloadImage(url, priority) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  if (priority) link.fetchPriority = 'high';
  document.head.appendChild(link);

  const img = new Image();
  img.decoding = 'async';
  if (priority) img.fetchPriority = 'high';
  img.src = url;
}

function preloadVideoMetadata(url) {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.muted = true;
  video.src = url;
}

export function preloadMediaItems(items) {
  const priorityImages = items.filter((i) => i.type === 'image' && i.priority);
  const otherImages = items.filter((i) => i.type === 'image' && !i.priority);
  const videos = items.filter((i) => i.type === 'video');

  priorityImages.forEach(({ url }) => preloadImage(url, true));

  const loadRest = () => {
    otherImages.forEach(({ url }) => preloadImage(url, false));
    videos.forEach(({ url }) => preloadVideoMetadata(url));
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadRest, { timeout: 2500 });
  } else {
    setTimeout(loadRest, 400);
  }
}

export function useMediaPreload(slides) {
  useEffect(() => {
    if (!slides?.length) return;
    preloadMediaItems(collectAllMedia(slides));
  }, [slides]);
}
