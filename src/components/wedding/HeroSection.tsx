"use client";

import React, { useEffect, useRef } from "react";
import { WeddingData } from "@/data/weddingData";

interface HeroSectionProps {
  data: WeddingData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const artRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const fitRef = useRef<HTMLDivElement | null>(null);

  // Flame coordinate pairs
  const flameCoords = [
    [10.5, 70.3],
    [11.8, 70.3],
    [17.7, 70.3],
    [18.9, 70.3],
    [12.8, 77.2],
    [14.0, 77.2],
    [19.2, 77.2],
    [20.6, 77.2],
    [18.4, 80.9],
    [24.5, 81.3],
    [25.5, 81.3],
  ];

  useEffect(() => {
    const handleLayout = () => {
      const sec = sectionRef.current;
      const art = artRef.current;
      const wEl = windowRef.current;
      const fit = fitRef.current;
      if (!sec || !art || !wEl || !fit) return;

      const iw = 941;
      const ih = 1672;
      const sw = sec.clientWidth;
      const sh = sec.clientHeight;
      const isMobile = sw < 640;
      const isTablet = sw >= 640 && sw < 1024;

      // Responsive window aperture: give text generous breathing room on mobile
      const win = isMobile
        ? [10, 14, 80, 70]
        : isTablet
          ? [16, 20, 68, 60]
          : [21, 24, 58, 54];

      const sCover = Math.max(sw / iw, sh / ih);
      const sContain = Math.min(sw / iw, sh / ih);
      const s = isMobile
        ? sCover
        : Math.max(sContain, Math.min(sCover, sw / (0.8 * iw), sh / (0.84 * ih)));

      const w = iw * s;
      const h = ih * s;
      const l = (sw - w) / 2;
      const t = (sh - h) / 2;

      art.style.left = `${l}px`;
      art.style.top = `${t}px`;
      art.style.width = `${w}px`;
      art.style.height = `${h}px`;

      const wl = l + (w * win[0]) / 100;
      const ww = (w * win[2]) / 100;
      const wt = Math.max(t + (h * win[1]) / 100, isMobile ? 12 : 16);
      const wh = Math.min((h * win[3]) / 100, sh - wt - (isMobile ? 12 : 16));

      wEl.style.left = `${Math.round(wl)}px`;
      wEl.style.top = `${Math.round(wt)}px`;
      wEl.style.width = `${Math.round(ww)}px`;
      wEl.style.height = `${Math.round(wh)}px`;
      wEl.style.setProperty("--ww", `${Math.round(ww)}px`);

      fit.style.transform = "none";
      const scrollH = fit.scrollHeight;
      const scaleK = scrollH > wh * 0.96 ? (wh * 0.96) / scrollH : 1;
      // Ensure text is never scaled down into unreadable sizes on mobile
      const minScale = isMobile ? 0.8 : 0.65;
      const finalScale = Math.max(minScale, Math.min(1, scaleK));
      fit.style.transform = finalScale < 0.99 ? `scale(${finalScale.toFixed(3)})` : "none";
    };

    handleLayout();
    window.addEventListener("resize", handleLayout);
    return () => {
      window.removeEventListener("resize", handleLayout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stage hero"
      id="hero"
      data-iw="941"
      data-ih="1672"
      data-win="21 24 58 54"
    >
      <div className="st-veil" />
      <div ref={artRef} className="st-art">
        <div
          className="st-img"
          style={{ backgroundImage: "url(/assets/hero-1.webp)" }}
        />
        <div className="flames">
          {flameCoords.map(([x, y], idx) => {
            const fd = (1.2 + ((idx * 0.3) % 1)).toFixed(2) + "s";
            const fdl = (-idx * 0.37).toFixed(2) + "s";
            const fdl2 = (-idx * 0.53 - 0.2).toFixed(2) + "s";
            return (
              <React.Fragment key={`flame-${idx}`}>
                <i
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    animationDuration: fd,
                    animationDelay: fdl,
                  }}
                />
                <i
                  style={{
                    left: `${100 - x}%`,
                    top: `${y}%`,
                    animationDuration: fd,
                    animationDelay: fdl2,
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
        <i className="st-sheen" aria-hidden="true" />
      </div>

      <div ref={windowRef} className="st-window">
        <div ref={fitRef} className="st-fit hero-in flex flex-col items-center justify-center">
          <img
            className="deity mb-1"
            src={data.blessing.symbolSrc}
            alt="Shri Ganesh"
          />
          <p className="invocation font-devanagari text-[#8a5e17] font-medium" lang="sa">
            {data.blessing.invocation}
          </p>
          <p className="eyebrow text-xs uppercase tracking-widest text-[#946650] my-1 font-josefin">
            Together with our families
          </p>
          <h1 className="names my-1">
            <span
              className="nm nm-groom lit font-playfair"
              data-name={data.couple.groom.first}
            >
              {data.couple.groom.first}
            </span>
            <span className="amp font-greatvibes text-gold mx-2" aria-hidden="true">
              &amp;
            </span>
            <span
              className="nm nm-bride lit font-playfair"
              data-name={data.couple.bride.first}
            >
              {data.couple.bride.first}
            </span>
          </h1>

          <span className="rule my-2" aria-hidden="true">
            <i />
          </span>

          <p className="hero-date font-josefin font-semibold tracking-widest text-xs uppercase text-[#5e1210] mb-1">
            {data.targetDateDisplay.dayOfWeek},{" "}
            {data.targetDateDisplay.dayNum}
            <sup>{data.targetDateDisplay.daySuffix}</sup>{" "}
            {data.targetDateDisplay.month} {data.targetDateDisplay.year}
          </p>

          <p className="text-[11px] uppercase tracking-wider text-[#946650] mb-2 font-josefin">
            Auspicious Vivah Muhurat &middot; 7:40 PM
          </p>

          <p className="hero-venue font-playfair italic text-[#6e3024] leading-tight">
            Radisson Blu Hotel
            <br />
            <span className="font-josefin not-italic text-[10px] tracking-widest uppercase text-[#946650] block mt-0.5">
              Dwarka City Centre, New Delhi
            </span>
          </p>
        </div>
      </div>

      <a className="cue" href="#gaja" aria-label="Scroll down">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
};
