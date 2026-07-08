"use client";

import Image from "next/image";
import { useState } from "react";

type MoodboardImage = {
  alt: string;
  src: string;
};

export default function MoodboardImmersion({ images }: { images: MoodboardImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollSlide = (direction: -1 | 1) => {
    setCurrentIndex((index) => {
      const maxSlide = Math.max(0, images.length - 1);
      return Math.min(maxSlide, Math.max(0, index + direction));
    });
  };

  return (
    <section
      className="moodboard-immersive-section"
      aria-label="Moodboard carousel"
    >
      <div className="moodboard-immersive-shell">
        <div
          className="moodboard-immersive-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              className="moodboard-immersive-slide"
              aria-label={`Moodboard ${index + 1}`}
              aria-hidden={index !== currentIndex}
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
      </div>
      {images.length > 1 ? (
        <div className="moodboard-immersive-controls">
          <button
            type="button"
            className="moodboard-immersive-control"
            aria-label="Previous moodboard"
            disabled={currentIndex === 0}
            onClick={() => scrollSlide(-1)}
          >
            &lt;
          </button>
          <button
            type="button"
            className="moodboard-immersive-control"
            aria-label="Next moodboard"
            disabled={currentIndex === images.length - 1}
            onClick={() => scrollSlide(1)}
          >
            &gt;
          </button>
        </div>
      ) : null}
    </section>
  );
}
