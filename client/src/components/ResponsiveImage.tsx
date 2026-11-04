import type { ImgHTMLAttributes } from 'react';
import variants from '@/lib/image-variants.json';

const images: Record<string, { width: number; height: number; variants: { width: number; src: string }[] }> = variants;

export default function ResponsiveImage({ src, sizes = '100vw', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? images[src] : undefined;
  if (!image) return <img src={src} {...props} />;
  return <img
    width={image.width}
    height={image.height}
    decoding="async"
    {...props}
    src={image.variants[image.variants.length - 1].src}
    srcSet={image.variants.map(v => `${v.src} ${v.width}w`).join(', ')}
    sizes={sizes}
  />;
}
