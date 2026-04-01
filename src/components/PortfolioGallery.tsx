/* eslint-disable @next/next/no-img-element */

import type { PortfolioImage } from "@/lib/portfolio";

export default function PortfolioGallery({ images }: { images: PortfolioImage[] }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
      {images.map((image, index) => (
        <figure
          key={image.src}
          className="gallery-figure mb-5 break-inside-avoid overflow-hidden rounded-[28px]"
        >
          <div className="relative overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              loading={index < 4 ? "eager" : "lazy"}
              className="gallery-image w-full"
            />
            <div className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/28 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          <figcaption className="flex items-center justify-between gap-3 px-5 py-4 text-xs uppercase tracking-[0.24em] text-[var(--muted-2)]">
            <span>{image.label}</span>
            <span>Frame</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
