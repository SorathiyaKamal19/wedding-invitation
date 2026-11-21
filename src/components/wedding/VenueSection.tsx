"use client";

import React, { useState } from "react";
import { WeddingData } from "@/data/weddingData";

interface VenueSectionProps {
  data: WeddingData;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullText = `${data.venue.name}, ${data.venue.address.replace(/\n/g, ", ")}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="sec parch venue" id="venue">
      <div className="strand strand-l" aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
          src="/assets/el/strand_jasmine.webp"
          alt=""
        />
      </div>
      <div className="strand strand-r" aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
          src="/assets/el/strand_rose.webp"
          alt=""
        />
      </div>

      <div className="inner">
        <img
          loading="lazy"
          decoding="async"
          className="head-orn head-orn-sm reveal"
          src="/assets/el/divider.webp"
          alt=""
          aria-hidden="true"
        />
        <p className="eyebrow reveal">Finding us</p>
        <h2 className="h2 reveal font-playfair">The venue</h2>

        <div className="venue-art reveal">
          <img
            decoding="async"
            src={data.venue.mandapImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </div>

        <p className="v-name reveal font-playfair">{data.venue.name}</p>
        <p className="v-addr reveal whitespace-pre-line">
          {data.venue.address}
        </p>

        {/* Copy Address & Directions Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 reveal mt-3 mb-6">
          <button
            type="button"
            onClick={handleCopyAddress}
            className="btn btn-sm btn-outline"
            style={{ padding: "8px 18px" }}
          >
            <span>{copied ? "✓ Address Copied!" : "📋 Copy Address"}</span>
          </button>
        </div>

        {/* Venue Highlights (Metro, Airport, Valet) */}
        {data.venue.highlights && data.venue.highlights.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 reveal mb-6 max-w-xl mx-auto">
            {data.venue.highlights.map((item, idx) => (
              <div
                key={`hl-${idx}`}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-900/20 bg-amber-50/70 text-xs text-amber-950 font-serif"
              >
                <span className="font-semibold text-amber-900">{item.label}:</span>
                <span className="opacity-85">{item.desc}</span>
              </div>
            ))}
          </div>
        )}

        <a
          className="mapcard reveal"
          href={data.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mc-pin">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"
                fill="none"
                strokeWidth="1.3"
              />
              <circle cx="12" cy="10" r="2.3" fill="none" strokeWidth="1.3" />
            </svg>
          </span>
          <span className="mc-txt">
            <b>Start navigation</b>Opens in Google Maps
          </span>
          <span className="mc-go">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="m9.5 5 7 7-7 7"
                fill="none"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </a>

        <div className="route reveal" aria-hidden="true">
          <svg
            className="route-svg"
            viewBox="0 0 320 168"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#E0B55C" />
                <stop offset="1" stopColor="#A9781F" />
              </linearGradient>
              <radialGradient id="rglow">
                <stop offset="0" stopColor="#F6E2A8" />
                <stop offset="1" stopColor="#F6E2A8" stopOpacity="0" />
              </radialGradient>
              <clipPath id="rvl">
                <rect id="rvlRect" x="0" y="0" width="320" height="168" />
              </clipPath>
            </defs>
            <path
              id="routeCore"
              d="M58 126 C 116 46 208 52 262 82"
              fill="none"
              stroke="#A9781F"
              strokeOpacity=".28"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="1 8"
            />
            <path
              d="M58 126 C 116 46 208 52 262 82"
              clipPath="url(#rvl)"
              fill="none"
              stroke="url(#rg)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="1 8"
            />
            {/* Origin Pin */}
            <g transform="translate(58 126)" opacity=".9">
              <path
                d="M0 0 C -6 -11 -8.5 -16 -8.5 -21 a8.5 8.5 0 1 1 17 0 C 8.5 -16 6 -11 0 0 Z"
                fill="url(#rg)"
                stroke="#7A5412"
                strokeWidth=".5"
              />
              <circle cx="0" cy="-21" r="3.1" fill="#FBF1DC" />
            </g>
            {/* Destination Pin with pulsing radar */}
            <g transform="translate(262 82)">
              <circle
                cx="0"
                cy="-21"
                r="9"
                fill="none"
                stroke="#C8973E"
                strokeWidth="1.4"
                className="animate-ping origin-center"
              />
              <path
                d="M0 0 C -6.5 -12 -9.5 -17 -9.5 -23 a9.5 9.5 0 1 1 19 0 C 9.5 -17 6.5 -12 0 0 Z"
                fill="#6E1414"
                stroke="#7A5412"
                strokeWidth=".6"
              />
              <circle cx="0" cy="-23" r="3.6" fill="#FBF1DC" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

