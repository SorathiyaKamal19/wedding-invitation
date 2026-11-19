"use client";

import React, { useState } from "react";
import { WeddingData } from "@/data/weddingData";

interface FilmSectionProps {
  data: WeddingData;
}

export const FilmSection: React.FC<FilmSectionProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = data.media.video;

  return (
    <>
      <section className="sec parch film-sec" id="film-sec">
        <img
          loading="lazy"
          decoding="async"
          className="pc pc-l"
          src="/assets/el/corner_l.webp"
          alt=""
          aria-hidden="true"
        />
        <img
          loading="lazy"
          decoding="async"
          className="pc pc-r"
          src="/assets/el/corner_r.webp"
          alt=""
          aria-hidden="true"
        />

        <div className="inner">
          <img
            loading="lazy"
            decoding="async"
            className="head-orn head-orn-sm reveal"
            src="/assets/el/divider.webp"
            alt=""
            aria-hidden="true"
          />
          <p className="eyebrow reveal">Before the wedding</p>
          <h2 className="h2 reveal font-playfair">Our film</h2>

          <div className="theatre reveal">
            <div
              className="film"
              id="film"
              role="button"
              tabIndex={0}
              data-provider={video.provider}
              data-id={video.id}
              aria-label="Play our pre-wedding film"
              onClick={() => setIsPlaying(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
              }}
            >
              <img
                decoding="async"
                className="film-poster"
                src={video.poster}
                alt="Pre-wedding film thumbnail"
                loading="lazy"
              />
              <span className="play" aria-hidden="true">
                <i />
              </span>
            </div>
          </div>
        </div>
      </section>

      {isPlaying && (
        <div
          className="video-modal-overlay"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="video-modal-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              aria-label="Close video"
              onClick={() => setIsPlaying(false)}
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
              title="Our Pre-Wedding Film"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
};

