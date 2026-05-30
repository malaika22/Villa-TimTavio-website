import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/** Responsive `sizes` hints so Next.js serves appropriately scaled images. */
export const IMAGE_SIZES = {
  hero: "100vw",
  pillarHero: "100vw",
  estateCard: "(max-width: 1024px) 100vw, 50vw",
  pillarCardLarge: "(max-width: 1024px) 100vw, 66vw",
  pillarCardSmall: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  portrait: "(max-width: 1024px) 100vw, 50vw",
} as const;

type OptimizedImageProps = Omit<ImageProps, "quality"> & {
  quality?: number;
};

/**
 * Wrapper around next/image with high-quality defaults (quality 88, lazy loading).
 * Pass `preload` for above-the-fold images (e.g. hero).
 */
export function OptimizedImage({
  className,
  quality = 88,
  fill = true,
  loading,
  preload,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      fill={fill}
      quality={quality}
      preload={preload}
      loading={loading ?? (preload ? undefined : "lazy")}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
