"use client";

import Image from "next/image";
import { useRef } from "react";

type MoodboardImage = {
  alt: string;
  src: string;
};

export default function MoodboardImmersion({ images }: { images: MoodboardImage[] }) {
  const shellRef = useRef<HTMLDivElement | null>(null);

  const scrollSlide = (direction: -1 | 1) => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    const nextSlide = Math.round(shell.scrollLeft / shell.clientWidth) + direction;
    const maxSlide = Math.max(0, images.length - 1);
    const clampedSlide = Math.min(maxSlide, Math.max(0, nextSlide));

    shell.scrollTo({
      left: shell.clientWidth * clampedSlide,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="moodboard-immersive-section"
      aria-label="Fullscreen moodboards"
    >
      <div ref={shellRef} className="moodboard-immersive-shell">
        {images.map((image, index) => (
          <div
            key={image.src}
            className="moodboard-immersive-slide"
            aria-label={`Moodboard ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="moodboard-immersive-image"
            />
          </div>
        ))}
      </div>
      {images.length > 1 ? (
        <div className="moodboard-immersive-controls">
          <button
            type="button"
            className="moodboard-immersive-control"
            aria-label="Previous moodboard"
            onClick={() => scrollSlide(-1)}
          >
            &lt;
          </button>
          <button
            type="button"
            className="moodboard-immersive-control"
            aria-label="Next moodboard"
            onClick={() => scrollSlide(1)}
          >
            &gt;
          </button>
        </div>
      ) : null}
    </section>
  );
}
