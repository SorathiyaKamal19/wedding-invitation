"use client";

import React, { useState, useRef, useEffect } from "react";
import { WeddingData } from "@/data/weddingData";

interface GallerySectionProps {
  data: WeddingData;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = data.media.gallery;
  const total = photos.length;

  const prev = () => {
    setCurrentIndex((curr) => (curr > 0 ? curr - 1 : total - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr < total - 1 ? curr + 1 : 0));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const lightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((curr) =>
        curr !== null && curr > 0 ? curr - 1 : total - 1
      );
    }
  };

  const lightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((curr) =>
        curr !== null && curr < total - 1 ? curr + 1 : 0
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxIndex((curr) => (curr !== null && curr > 0 ? curr - 1 : total - 1));
      if (e.key === "ArrowRight") setLightboxIndex((curr) => (curr !== null && curr < total - 1 ? curr + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, total]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      next();
    } else if (diff < -45) {
      prev();
    }
    touchStartX.current = null;
  };

  // Calculate 3D circular coverflow styling for each slide
  const getSlideStyle = (index: number) => {
    let diff = index - currentIndex;
    // Circular wrap-around distance
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Active Center Slide
    if (diff === 0) {
      return {
        transform: "translateX(-50%) translateZ(0) scale(1)",
        zIndex: 25,
        opacity: 1,
        filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.7))",
        cursor: "pointer",
        pointerEvents: "auto" as const,
      };
    }

    // Direct Left Neighbor (Tilted in 3D facing right)
    if (diff === -1) {
      return {
        transform: "translateX(calc(-50% - clamp(140px, 22vw, 260px))) translateZ(-100px) rotateY(26deg) scale(0.85)",
        zIndex: 15,
        opacity: 0.85,
        filter: "brightness(0.75) blur(0.3px) drop-shadow(0 15px 25px rgba(0,0,0,0.5))",
        cursor: "pointer",
        pointerEvents: "auto" as const,
      };
    }

    // Direct Right Neighbor (Tilted in 3D facing left)
    if (diff === 1) {
      return {
        transform: "translateX(calc(-50% + clamp(140px, 22vw, 260px))) translateZ(-100px) rotateY(-26deg) scale(0.85)",
        zIndex: 15,
        opacity: 0.85,
        filter: "brightness(0.75) blur(0.3px) drop-shadow(0 15px 25px rgba(0,0,0,0.5))",
        cursor: "pointer",
        pointerEvents: "auto" as const,
      };
    }

    // Secondary Left
    if (diff === -2) {
      return {
        transform: "translateX(calc(-50% - clamp(230px, 36vw, 420px))) translateZ(-220px) rotateY(38deg) scale(0.7)",
        zIndex: 8,
        opacity: 0.45,
        filter: "brightness(0.5) blur(1px)",
        cursor: "pointer",
        pointerEvents: "auto" as const,
      };
    }

    // Secondary Right
    if (diff === 2) {
      return {
        transform: "translateX(calc(-50% + clamp(230px, 36vw, 420px))) translateZ(-220px) rotateY(-38deg) scale(0.7)",
        zIndex: 8,
        opacity: 0.45,
        filter: "brightness(0.5) blur(1px)",
        cursor: "pointer",
        pointerEvents: "auto" as const,
      };
    }

    // Hidden background slides
    return {
      transform: `translateX(calc(-50% + ${diff > 0 ? 500 : -500}px)) translateZ(-400px) scale(0.5)`,
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none" as const,
    };
  };

  return (
    <>
      <section className="sec velvet gallery relative overflow-visible py-16" id="gallery">
        <div className="inner max-w-5xl mx-auto px-4 overflow-visible">
          <div className="gal-head mb-6">
            <div className="peacock peacock-l reveal" aria-hidden="true" />
            <div className="gal-title text-center">
              <img
                loading="lazy"
                decoding="async"
                className="head-orn head-orn-sm reveal mx-auto mb-2"
                src="/assets/el/lotus_div.webp"
                alt=""
                aria-hidden="true"
              />
              <p className="eyebrow eyebrow-lt reveal font-josefin uppercase tracking-widest text-xs text-gold/80">
                Us, lately
              </p>
              <h2 className="h2 h2-lt reveal font-playfair text-3xl sm:text-4xl text-cream font-semibold mt-1">
                A few favourites
              </h2>
              <p className="text-xs text-gold-pale/70 font-crimson mt-1">
                Click any photo to view full size &bull; Showing {currentIndex + 1} of {total}
              </p>
            </div>
            <div className="peacock peacock-r reveal" aria-hidden="true" />
          </div>

          {/* 3D Multi-Photo Coverflow Showcase */}
          <div
            className="flow relative w-full h-[360px] sm:h-[420px] md:h-[460px] my-6"
            id="flow"
            aria-roledescription="carousel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: "1400px", overflow: "visible" }}
          >
            <div
              className="flow-track absolute inset-0"
              id="flowTrack"
              style={{ transformStyle: "preserve-3d", overflow: "visible" }}
            >
              {photos.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                const style = getSlideStyle(idx);
                return (
                  <figure
                    key={`photo-${idx}`}
                    className={`slide absolute left-1/2 top-0 w-[240px] sm:w-[300px] md:w-[350px] aspect-square transition-all duration-700 ease-out select-none ${
                      isCurrent ? "act" : ""
                    }`}
                    style={style}
                    onClick={() => {
                      if (isCurrent) {
                        openLightbox(idx);
                      } else {
                        setCurrentIndex(idx);
                      }
                    }}
                  >
                    <div className="frame relative w-full h-full p-2.5 rounded-lg bg-gradient-to-br from-[#f6e4b4] via-[#b8862e] to-[#8a5e17] shadow-2xl hover:shadow-[0_0_30px_rgba(200,151,62,0.4)] transition-shadow">
                      <img
                        decoding="async"
                        src={item.src}
                        alt={item.caption || `Wedding photo ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover rounded shadow-inner"
                      />
                      {/* Corner Flourishes */}
                      <span className="absolute -top-2 -right-2 w-10 h-10 bg-[url('/assets/el/corner_tr.webp')] bg-contain bg-no-repeat pointer-events-none" />
                      <span className="absolute -bottom-2 -left-2 w-10 h-10 bg-[url('/assets/el/corner_tr.webp')] bg-contain bg-no-repeat rotate-180 pointer-events-none" />
                    </div>

                    {/* Caption for Active Photo */}
                    {isCurrent && item.caption && (
                      <figcaption className="photo-caption text-center mt-3 text-xs sm:text-sm text-gold-pale drop-shadow font-crimson italic">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>

            {/* Left / Right Nav Arrows */}
            <button
              className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-gold/70 bg-[#270507]/80 hover:bg-gold hover:text-[#270507] text-gold flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
              type="button"
              aria-label="Previous photo"
              onClick={prev}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-gold/70 bg-[#270507]/80 hover:bg-gold hover:text-[#270507] text-gold flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
              type="button"
              aria-label="Next photo"
              onClick={next}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Quick Thumbnail Strip */}
          <div className="thumbnails flex items-center justify-center gap-2 sm:gap-3 mt-4 overflow-x-auto py-2 px-4 max-w-md mx-auto">
            {photos.map((photo, idx) => (
              <button
                key={`thumb-${idx}`}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                  idx === currentIndex
                    ? "border-gold scale-110 shadow-[0_0_12px_rgba(200,151,62,0.6)]"
                    : "border-gold/30 opacity-60 hover:opacity-100 hover:border-gold/70"
                }`}
                aria-label={`Switch to photo ${idx + 1}`}
              >
                <img
                  src={photo.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flow-dots flex justify-center gap-2 mt-4" id="flowDots">
            {photos.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-6 h-2 bg-gold"
                    : "w-2 h-2 bg-gold/40 hover:bg-gold/70"
                }`}
                type="button"
                aria-label={`Go to photo ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeLightbox}>
          <button
            className="lightbox-close absolute top-4 right-5 text-gold text-3xl font-light hover:text-white transition-colors"
            aria-label="Close photo"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <button
            className="lightbox-nav lightbox-prev absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold/50 bg-[#270507]/80 text-gold hover:bg-gold hover:text-[#270507] flex items-center justify-center text-2xl transition-all"
            aria-label="Previous photo"
            onClick={lightboxPrev}
          >
            &#8249;
          </button>
          <div
            className="lightbox-content max-w-4xl max-h-[85vh] flex flex-col items-center bg-[#270507] rounded-xl border border-gold/40 shadow-2xl overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].caption || "Gallery preview"}
              className="max-h-[72vh] max-w-full object-contain rounded-lg"
            />
            {photos[lightboxIndex].caption && (
              <p className="text-center py-3 text-sm text-gold-lt font-crimson italic">
                {photos[lightboxIndex].caption}
              </p>
            )}
            <p className="text-[11px] text-gold/60 font-josefin uppercase tracking-wider pb-1">
              Photo {lightboxIndex + 1} of {total}
            </p>
          </div>
          <button
            className="lightbox-nav lightbox-next absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold/50 bg-[#270507]/80 text-gold hover:bg-gold hover:text-[#270507] flex items-center justify-center text-2xl transition-all"
            aria-label="Next photo"
            onClick={lightboxNext}
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
};
