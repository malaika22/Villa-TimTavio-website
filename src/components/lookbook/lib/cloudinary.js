const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD = /^https:\/\/res\.cloudinary\.com\/[^/]+\/(image|video)\/upload\/(.+)$/;

function firstPathSegment(path) {
  return path.split('/')[0] ?? '';
}

function hasDeliveryTransforms(path) {
  const seg = firstPathSegment(path);
  return Boolean(seg && !/^v\d+$/.test(seg));
}

function injectTransforms(url, transformString) {
  const match = url.match(CLOUDINARY_UPLOAD);
  if (!match) return url;

  const [, type, rest] = match;
  const prefix = url.slice(0, url.length - rest.length);

  if (hasDeliveryTransforms(rest)) {
    const seg = firstPathSegment(rest);
    if (seg.includes('q_auto') && seg.includes('w_')) return url;

    const merged = seg.includes('f_mp4')
      ? `${seg},q_auto:best,w_2560,c_limit`
      : transformString;
    const tail = rest.split('/').slice(1).join('/');
    return `${prefix}${merged}${tail ? `/${tail}` : ''}`;
  }

  return `${prefix}${transformString}/${rest}`;
}

/** Production CDN transforms — auto format, smart quality, retina-aware.
 *  q_auto:good balances near-original quality against noticeably smaller files
 *  for faster loads. */
export function optimizeImageUrl(url, { width = 2560 } = {}) {
  if (!url?.includes('res.cloudinary.com') || !url.includes('/image/upload/')) {
    return url;
  }
  return injectTransforms(url, `f_auto,q_auto:good,w_${width},c_limit,dpr_auto`);
}

export function optimizeVideoUrl(url, { width = 2560 } = {}) {
  if (!url?.includes('res.cloudinary.com') || !url.includes('/video/upload/')) {
    return url;
  }
  const mp4 = toMp4DeliveryUrl(url);
  return injectTransforms(mp4, `f_mp4,vc_h264,q_auto:best,w_${width},c_limit`);
}

export function isCloudinaryConfigured() {
  return Boolean(cloudName);
}

export function cldUrl(publicId, options = {}) {
  if (!cloudName || !publicId) return null;

  const {
    resourceType = 'image',
    transforms = 'f_auto,q_auto',
    format,
  } = options;

  const tx = transforms ? `${transforms}/` : '';
  const id = format ? `${publicId}.${format}` : publicId;

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${tx}${id}`;
}

export function cldVideoUrl(publicId, options = {}) {
  return cldUrl(publicId, {
    ...options,
    resourceType: 'video',
    transforms: options.transforms ?? 'f_mp4,vc_h264',
  });
}

/** Cloudinary .mov / raw video URL → MP4 delivery (transcoded on CDN) */
export function toMp4DeliveryUrl(url) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/video/upload/')) {
    return url;
  }
  if (url.includes('f_mp4')) return url.replace(/\.mov(?=($|\?))/i, '');

  const mp4Transforms = 'f_mp4,vc_h264';
  const withTransforms = url.replace('/video/upload/', `/video/upload/${mp4Transforms}/`);
  return withTransforms.replace(/\.mov(?=($|\?))/i, '');
}

export function cldCoverUrl(publicId, options = {}) {
  return cldUrl(publicId, {
    ...options,
    transforms: options.transforms ?? 'f_auto,q_auto,c_fill,g_auto',
  });
}

export function cldVerticalUrl(publicId, options = {}) {
  return cldUrl(publicId, {
    ...options,
    transforms: options.transforms ?? 'f_auto,q_auto,h_1200,c_limit',
  });
}
