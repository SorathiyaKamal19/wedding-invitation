import React from "react";
import { WeddingData } from "@/data/weddingData";

interface FooterSectionProps {
  data: WeddingData;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ data }) => {
  return (
    <footer className="sec parch foot pb-16">
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
      <img
        loading="lazy"
        decoding="async"
        className="foot-orn reveal"
        src="/assets/el/lotus_spray.webp"
        alt=""
        aria-hidden="true"
      />
      <p className="foot-line reveal">With love, from us and our families,</p>
      <p className="foot-names reveal">
        <span className="fn-groom">{data.couple.groom.first}</span>{" "}
        <em className="font-greatvibes">&amp;</em>{" "}
        <span className="fn-bride">{data.couple.bride.first}</span>
      </p>
      <p className="foot-tag reveal">{data.hashtag}</p>

      <a
        className="ig reveal"
        href={`https://instagram.com/${data.connect.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
        <span>@{data.connect.instagram}</span>
      </a>

      <span className="foot-rule" aria-hidden="true" />
    </footer>
  );
};
