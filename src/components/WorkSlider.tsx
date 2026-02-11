"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  location: string;
  year: string;
  category: string;
  status: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "Private Residence, 8000 Sq. Ft. Built-Up",
    location: "Signature City, Ghaziabad",
    year: "2021",
    category: "Residential",
    status: "On-Going",
    image: "/work/slide-01.svg",
  },
  {
    title: "Jorbagh Villa, 4800 Sq. Ft. Built-Up",
    location: "Near Pari Chowk, Greater Noida",
    year: "2022",
    category: "Residential",
    status: "Completed",
    image: "/work/slide-02.svg",
  },
  {
    title: "4 BHK Apartment, Builder Floor, P-37",
    location: "Gurgaon",
    year: "2024",
    category: "Residential",
    status: "Completed",
    image: "/work/slide-03.svg",
  },
  {
    title: "Micro 2 BHK Apartment",
    location: "Chhatarpur, South Delhi",
    year: "2023",
    category: "Residential",
    status: "Completed",
    image: "/work/slide-04.svg",
  },
  {
    title: "AIIMS Extension Block",
    location: "New Delhi",
    year: "2019",
    category: "Commercial",
    status: "Completed",
    image: "/work/slide-05.svg",
  },
];

export default function WorkSlider() {
  const [active, setActive] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const current = useMemo(() => slides[active], [active]);

  const goPrev = () => setActive((prev) => (prev - 1 + total) % total);
  const goNext = () => setActive((prev) => (prev + 1) % total);

  return (
    <section className="bg-[var(--surface)]">
      <div className="relative h-[calc(100vh-88px)] min-h-[640px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.65)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-lg text-white backdrop-blur transition hover:border-white"
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-lg text-white backdrop-blur transition hover:border-white"
        >
          →
        </button>

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 pb-10 text-white sm:px-12">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              {current.location}
            </p>
            <h3 className="mt-3 max-w-3xl text-2xl sm:text-4xl">
              {current.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span>{current.year}</span>
              <span>•</span>
              <span>{current.category}</span>
              <span>•</span>
              <span>{current.status}</span>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition ${
                    index === active ? "w-8 bg-white" : "w-2.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
