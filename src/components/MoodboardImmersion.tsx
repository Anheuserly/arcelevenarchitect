"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type MoodboardImage = {
  alt: string;
  src: string;
};

export default function MoodboardImmersion({ images }: { images: MoodboardImage[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          document.body.dataset.fullscreenMoodboard = "true";
          return;
        }

        delete document.body.dataset.fullscreenMoodboard;
      },
      {
        threshold: [0, 0.35, 0.55, 0.8],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      delete document.body.dataset.fullscreenMoodboard;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="moodboard-immersive-section"
      aria-label="Fullscreen moodboards"
    >
      <div className="moodboard-immersive-shell">
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
    </section>
  );
}
