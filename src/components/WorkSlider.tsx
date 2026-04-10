"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";
import StartProjectTrigger from "@/components/StartProjectTrigger";

type Slide = {
  category: string;
  href: string;
  image: string;
  imageCount?: number;
  location: string;
  status: string;
  title: string;
  year: string;
};

export default function WorkSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const advanceSlide = useEffectEvent(() => {
    setActive((prev) => (prev + 1) % total);
  });

  useEffect(() => {
    if (total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      advanceSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [total]);

  const current = slides[active];

  const goPrev = () => setActive((prev) => (prev - 1 + total) % total);
  const goNext = () => setActive((prev) => (prev + 1) % total);

  return (
    <section className="bg-[var(--surface)]">
      <div className="relative h-[calc(100vh-88px)] min-h-[720px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(8,10,12,0.18), rgba(8,10,12,0.7)), url(${slide.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:auto,140px_140px,140px_140px]" />

        <div className="absolute inset-0 px-6 py-8 sm:px-10 lg:px-12">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-between">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="hero-panel max-w-[42rem] border-white/16 bg-[rgba(15,17,20,0.78)] shadow-[0_28px_72px_rgba(0,0,0,0.3)]">
                <p className="text-[11px] uppercase tracking-[0.36em] text-white/68">
                  Arc 11 Architect Portfolio
                </p>
                <h1 className="mt-4 max-w-xl text-4xl text-white sm:text-6xl">
                  Spaces choreographed through light, proportion, and visual calm.
                </h1>
                <p className="mt-4 max-w-xl text-sm text-white/70 sm:text-base">
                  A portfolio spanning residences, institutional environments, and interior
                  studies, presented through curated architectural imagery.
                </p>
              </div>

              <div className="hidden w-full max-w-sm lg:block">
                <div className="hero-panel border-white/12 bg-[rgba(15,17,20,0.62)] shadow-[0_24px_58px_rgba(0,0,0,0.24)]">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/65">
                    Project Sequence
                  </p>
                  <div className="mt-5 space-y-2">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActive(index)}
                        className={`flex w-full items-center justify-between rounded-[20px] px-4 py-3 text-left transition ${
                          index === active
                            ? "bg-white text-[var(--foreground)]"
                            : "bg-white/8 text-white hover:bg-white/12"
                        }`}
                      >
                        <span className="text-sm">{slide.title}</span>
                        <span className="text-[11px] uppercase tracking-[0.26em]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="hero-panel border-white/16 bg-[rgba(15,17,20,0.8)] shadow-[0_28px_72px_rgba(0,0,0,0.3)]">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/68">
                  <span>{current.location}</span>
                  <span>{current.year}</span>
                  <span>{current.category}</span>
                  <span>{current.status}</span>
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl text-white sm:text-5xl">
                  {current.title}
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={current.href} className="button-primary">
                    View Case Study
                  </Link>
                  <StartProjectTrigger
                    className="button-secondary-on-dark"
                    source="work_slider"
                  >
                    Start a Project
                  </StartProjectTrigger>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="hero-panel border-white/10 bg-[rgba(15,17,20,0.6)] shadow-[0_20px_48px_rgba(0,0,0,0.22)]">
                  <span className="metric-label text-white/68">Current Slide</span>
                  <span className="metric-value mt-3 text-white">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="hero-panel border-white/10 bg-[rgba(15,17,20,0.6)] shadow-[0_20px_48px_rgba(0,0,0,0.22)]">
                  <span className="metric-label text-white/68">Project Type</span>
                  <span className="metric-value mt-3 text-white">{current.category}</span>
                </div>
                <div className="hero-panel border-white/10 bg-[rgba(15,17,20,0.6)] shadow-[0_20px_48px_rgba(0,0,0,0.22)]">
                  <span className="metric-label text-white/68">Visual Frames</span>
                  <span className="metric-value mt-3 text-white">{current.imageCount ?? "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-lg text-white backdrop-blur-sm transition hover:border-white hover:bg-black/30 sm:left-6"
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-lg text-white backdrop-blur-sm transition hover:border-white hover:bg-black/30 sm:right-6"
        >
          →
        </button>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition ${
                index === active ? "w-10 bg-white" : "w-2.5 bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
