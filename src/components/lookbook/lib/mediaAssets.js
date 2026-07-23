import {
  cldCoverUrl,
  cldVerticalUrl,
  cldVideoUrl,
  optimizeImageUrl,
  optimizeVideoUrl,
  toMp4DeliveryUrl,
} from './cloudinary';

function videoDeliveryUrl(url, publicId) {
  if (url) return toMp4DeliveryUrl(url);
  return cldVideoUrl(publicId);
}

function imageWidthForVariant(variant) {
  if (variant === 'gallery') return 1600;
  if (variant === 'vertical') return 1800;
  return 2560;
}

export function mediaBackgroundStyle(media, variant = 'cover') {
  if (!media?.publicId && !media?.url) return null;

  const width = imageWidthForVariant(variant);
  const url =
    media.resourceType === 'video'
      ? optimizeVideoUrl(videoDeliveryUrl(media.url, media.publicId), { width })
      : optimizeImageUrl(
          media.url ||
            (variant === 'vertical'
              ? cldVerticalUrl(media.publicId)
              : cldCoverUrl(media.publicId)),
          { width },
        );

  if (!url) return null;

  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
}

export function mediaSource(media, variant = 'cover') {
  if (!media) return null;

  const width = imageWidthForVariant(variant);

  if (media.resourceType === 'video') {
    return optimizeVideoUrl(videoDeliveryUrl(media.url, media.publicId), { width });
  }

  const raw =
    media.url ||
    (variant === 'vertical' ? cldVerticalUrl(media.publicId) : cldCoverUrl(media.publicId));

  return optimizeImageUrl(raw, { width });
}
