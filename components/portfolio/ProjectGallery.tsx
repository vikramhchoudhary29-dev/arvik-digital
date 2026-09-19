"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useEffect, useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
  thumbnail?: string | null;
};

export default function ProjectGallery({
  images,
  title,
  thumbnail,
}: ProjectGalleryProps) {
  const galleryImages = Array.from(
    new Set([...(thumbnail ? [thumbnail] : []), ...images].filter(Boolean))
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % galleryImages.length
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + galleryImages.length) % galleryImages.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, galleryImages.length]);

  if (galleryImages.length === 0) return null;

  return (
    <>
      <section className="relative overflow-hidden py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
                Project Gallery
              </p>
              <h2 className="text-4xl font-black md:text-5xl">
                See the project <span className="gold-text">up close.</span>
              </h2>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-400 sm:flex">
              <Images size={16} />
              {galleryImages.length} {galleryImages.length === 1 ? "image" : "images"}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative aspect-[16/10] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] text-left"
                aria-label={`Open ${title} gallery image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} project image ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  View image
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <X size={22} />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex(
                    (activeIndex - 1 + galleryImages.length) % galleryImages.length
                  );
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-3 text-white transition hover:bg-white/15 md:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((activeIndex + 1) % galleryImages.length);
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-3 text-white transition hover:bg-white/15 md:right-8"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            className="relative max-h-[90vh] max-w-[92vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={galleryImages[activeIndex]}
              alt={`${title} project image ${activeIndex + 1}`}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm text-zinc-400">
              {activeIndex + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
