"use client";

import React, { useState } from "react";
import { WeddingData } from "@/data/weddingData";

interface CoupleSectionProps {
  data: WeddingData;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyHashtag = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(data.hashtag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="sec velvet couple-sec py-12 sm:py-20 relative overflow-hidden" id="couple">
      <div className="inner text-center max-w-4xl mx-auto px-3 sm:px-6 relative z-10">
        <img
          loading="lazy"
          decoding="async"
          className="head-orn head-orn-sm mx-auto mb-3 sm:mb-4 reveal"
          src="/assets/el/lotus_div.webp"
          alt=""
          aria-hidden="true"
        />
        <p className="eyebrow eyebrow-lt reveal uppercase tracking-widest text-[10px] sm:text-xs text-gold-lt mb-1 sm:mb-2 font-josefin">
          Celebrating Our Love
        </p>
        <h2 className="h2 h2-lt reveal font-playfair text-2xl sm:text-4xl md:text-5xl text-gold-pale mb-4 sm:mb-6">
          {data.couple.groom.first} &amp; {data.couple.bride.first}
        </h2>

        {/* Elegant Royal Couple Portrait Card */}
        <div className="relative max-w-md mx-auto my-6 sm:my-8 p-2 sm:p-3 bg-gradient-to-b from-[#8a5e17] via-[#c8973e] to-[#62101a] rounded-2xl shadow-2xl reveal">
          <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-velvet-4 border border-gold-lt/30">
            <img
              src="/assets/story/proposal.webp"
              alt={`${data.couple.groom.first} and ${data.couple.bride.first}`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            {/* Soft royal gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#270507]/90 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute bottom-4 sm:bottom-6 inset-x-0 px-4 sm:px-6 text-center">
              <p className="font-greatvibes text-2xl sm:text-4xl text-gold-lt mb-1 drop-shadow">
                Two souls, one heart
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-cream/90 font-josefin">
                United in holy matrimony
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Click-to-Copy Signature Hashtag */}
        <div className="reveal mt-6 sm:mt-8">
          <button
            type="button"
            onClick={handleCopyHashtag}
            className="hashtag-box group inline-flex items-center justify-center gap-2 sm:gap-4 py-2 sm:py-3 px-5 sm:px-8 rounded-full border border-gold/50 bg-velvet-4/80 backdrop-blur-sm shadow-xl hover:border-gold hover:bg-velvet-3 transition-all cursor-pointer"
            title="Click to copy wedding hashtag"
          >
            <img
              loading="lazy"
              decoding="async"
              className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 group-hover:rotate-12 transition-transform"
              src="/assets/el/deepam.webp"
              alt=""
              aria-hidden="true"
            />
            <span className="text-sm sm:text-xl md:text-2xl font-playfair text-gold-lt tracking-wider font-semibold break-all sm:break-normal">
              {data.hashtag}
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase px-2 py-0.5 rounded bg-gold/20 text-gold-pale border border-gold/30">
              {copied ? "✓ Copied!" : "Copy"}
            </span>
            <img
              loading="lazy"
              decoding="async"
              className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 group-hover:-rotate-12 transition-transform"
              src="/assets/el/deepam.webp"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        <p className="prose text-cream/80 max-w-lg mx-auto mt-5 sm:mt-6 text-sm sm:text-base italic reveal font-crimson leading-relaxed px-2">
          &ldquo;When you realize you want to spend the rest of your life with somebody,
          you want the rest of your life to start as soon as possible.&rdquo;
        </p>
      </div>
    </section>
  );
};

