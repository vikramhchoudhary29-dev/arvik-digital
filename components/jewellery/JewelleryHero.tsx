"use client";

import { useEffect, useState } from "react";

type Slide = { id: string; imageUrl: string; title: string; subtitle: string };

export default function JewelleryHero({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const activeSlide = slides[index];
  const activeRatio = activeSlide ? ratios[activeSlide.id] : undefined;

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-[#fff9f5]" aria-label="Jewellery marketing image slider">
      {slides.length > 0 ? (
        <>
          <div
            className="relative w-full transition-[aspect-ratio] duration-500"
            style={{ aspectRatio: activeRatio ?? 3.2 }}
          >
            {slides.map((slide, slideIndex) => (
              <img
                key={slide.id}
                src={slide.imageUrl}
                alt={`Jewellery marketing banner ${slideIndex + 1}`}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden={slideIndex !== index}
                onLoad={(event) => {
                  const image = event.currentTarget;
                  if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                    const ratio = image.naturalWidth / image.naturalHeight;
                    setRatios((previous) => previous[slide.id] === ratio ? previous : { ...previous, [slide.id]: ratio });
                  }
                }}
              />
            ))}
          </div>
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" aria-label="Select hero slide">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show banner ${slideIndex + 1}`}
                  aria-current={slideIndex === index ? "true" : undefined}
                  onClick={() => setIndex(slideIndex)}
                  className={`h-2 rounded-full shadow-sm transition-all ${slideIndex === index ? "w-9 bg-[#784b5d]" : "w-2 bg-[#784b5d]/40"}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex aspect-[16/5] w-full items-center justify-center px-6 text-center text-sm text-[#876e76]">
          Jewellery banners will appear here once uploaded from the admin panel.
        </div>
      )}
    </section>
  );
}
