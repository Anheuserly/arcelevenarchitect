"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type MoodboardImage = {
  alt: string;
  src: string;
};

export default function MoodboardImmersion({ images }: { images: MoodboardImage[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    const edgePadding = 2;

    const onWheel = (event: WheelEvent) => {
      const primaryDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

      if (primaryDelta === 0) {
        return;
      }

      const maxScrollLeft = shell.scrollWidth - shell.clientWidth;
      const isAtStart = shell.scrollLeft <= edgePadding;
      const isAtEnd = shell.scrollLeft >= maxScrollLeft - edgePadding;
      const wantsPrevious = primaryDelta < 0;
      const wantsNext = primaryDelta > 0;

      if ((wantsPrevious && isAtStart) || (wantsNext && isAtEnd)) {
        return;
      }

      event.preventDefault();
      shell.scrollBy({
        left: primaryDelta,
        behavior: "smooth",
      });
    };

    shell.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      shell.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
    </section>
  );
}
