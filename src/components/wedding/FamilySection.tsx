"use client";

import React, { useEffect, useRef } from "react";
import { WeddingData } from "@/data/weddingData";

interface FamilySectionProps {
  data: WeddingData;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const artRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const fitRef = useRef<HTMLDivElement | null>(null);

  const flameCoords = [
    [9.4, 69.8],
    [10.5, 69.8],
    [17.6, 69.8],
    [18.7, 69.8],
    [19.2, 76.2],
    [24.4, 78.3],
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

      // Aperture coordinates inside the arch:
      const win = isMobile
        ? [10, 14, 80, 72]
        : isTablet
          ? [16, 18, 68, 64]
          : [21, 22, 58, 60];

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
      const wt = Math.max(t + (h * win[1]) / 100, isMobile ? 8 : 14);
      const wh = Math.min((h * win[3]) / 100, sh - wt - (isMobile ? 8 : 14));

      wEl.style.left = `${Math.round(wl)}px`;
      wEl.style.top = `${Math.round(wt)}px`;
      wEl.style.width = `${Math.round(ww)}px`;
      wEl.style.height = `${Math.round(wh)}px`;
      wEl.style.setProperty("--ww", `${Math.round(ww)}px`);

      fit.style.transform = "none";
      const scrollH = fit.scrollHeight;
      const scaleK = scrollH > wh * 0.98 ? (wh * 0.98) / scrollH : 1;
      const minScale = isMobile ? 0.72 : 0.65;
      const finalScale = Math.max(minScale, Math.min(1, scaleK));
      fit.style.transform = finalScale < 0.99 ? `scale(${finalScale.toFixed(3)})` : "none";
    };

    handleLayout();
    window.addEventListener("resize", handleLayout);

    let resizeObserver: ResizeObserver | null = null;
    const fitEl = fitRef.current;
    if (fitEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => handleLayout());
      resizeObserver.observe(fitEl);
    }

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => handleLayout());
    }

    return () => {
      window.removeEventListener("resize", handleLayout);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const groom = data.couple.groom;
  const bride = data.couple.bride;

  return (
    <section
      ref={sectionRef}
      className="stage family-stage relative w-full overflow-hidden"
      id="family"
      data-iw="941"
      data-ih="1672"
    >
      <div className="st-veil" />

      {/* Palace Arch Artwork with deepams & flickering diya flames */}
      <div ref={artRef} className="st-art absolute">
        <div
          className="st-img"
          style={{ backgroundImage: "url(/assets/hero-2.webp)" }}
        />
        <div className="flames">
          {flameCoords.map(([x, y], idx) => {
            const fd = (1.2 + ((idx * 0.3) % 1)).toFixed(2) + "s";
            const fdl = (-idx * 0.37).toFixed(2) + "s";
            const fdl2 = (-idx * 0.53 - 0.2).toFixed(2) + "s";
            return (
              <React.Fragment key={`fam-flame-${idx}`}>
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
      </div>

      {/* Arch aperture window with golden fade gradient */}
      <div
        ref={windowRef}
        className="st-window absolute overflow-hidden z-10 flex items-center justify-center"
      >
        <div
          ref={fitRef}
          className="st-fit fam text-center w-full px-2 sm:px-4 py-1 flex flex-col items-center justify-center origin-center"
        >
          {/* Royal Gold Monogram Emblem */}
          <div className="seal-wrap mx-auto mb-1 sm:mb-2 w-12 h-12 sm:w-16 sm:h-16 relative">
            <svg className="seal-ring w-full h-full animate-spin-slow" viewBox="0 0 200 200" aria-hidden="true">
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="#B8862E"
                strokeWidth="1.5"
                opacity=".8"
              />
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#C99A45"
                strokeWidth="2.5"
                strokeDasharray="2 6"
                strokeLinecap="round"
              />
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="#8A5E17"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
            <div className="seal absolute inset-1 flex items-center justify-center bg-gradient-to-br from-[#FFF8E7] via-[#F5DC96] to-[#D4A346] shadow-md rounded-full border border-gold/50">
              <span className="font-greatvibes text-lg sm:text-2xl text-[#5e1210] font-bold tracking-tight select-none">
                A &amp; A
              </span>
            </div>
          </div>

          <p className="eyebrow uppercase tracking-widest text-[9px] sm:text-[11px] text-[#946650] mb-0.5 font-josefin">
            An invitation
          </p>
          <h2 className="h2 font-playfair text-lg sm:text-2xl md:text-3xl text-[#5e1210] font-semibold mb-1 leading-tight">
            With the blessings
            <br />
            of our families
          </h2>
          <p className="prose text-[11px] sm:text-xs md:text-sm text-[#6e3024] max-w-xs sm:max-w-md mx-auto mb-2 leading-relaxed font-crimson px-2">
            We invite you to join us as we take our vows, and to share in the joy
            of the days that follow.
          </p>

          {/* Groom and Bride Union Section */}
          <div className="union my-1 flex flex-col items-center justify-center gap-1 sm:gap-2 max-w-sm mx-auto w-full">
            {/* Groom Side */}
            <div className="side side-groom text-center w-full">
              <p className="side-name font-playfair font-semibold text-base sm:text-xl text-[#5e1210] leading-tight">
                {groom.full}
              </p>
              <p className="side-role uppercase tracking-widest text-[8.5px] sm:text-[9.5px] text-[#9a6a1c] font-semibold my-0.5 font-josefin">
                Son of
              </p>
              <p className="side-parents text-[11px] sm:text-sm text-[#6e3024] font-crimson leading-snug">
                {groom.parents.father.prefix} {groom.parents.father.name}
                <br />
                &amp; {groom.parents.mother.prefix} {groom.parents.mother.name}
              </p>
            </div>

            {/* Royal Weds Flourish */}
            <div className="weds flex items-center justify-center gap-2 my-0.5 w-full max-w-[180px] sm:max-w-[200px]">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b8862e]" />
              <em className="font-greatvibes text-xl sm:text-3xl text-[#b8862e] px-2 not-italic leading-none">
                weds
              </em>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b8862e]" />
            </div>

            {/* Bride Side */}
            <div className="side side-bride text-center w-full">
              <p className="side-name font-playfair font-semibold text-base sm:text-xl text-[#5e1210] leading-tight">
                {bride.full}
              </p>
              <p className="side-role uppercase tracking-widest text-[8.5px] sm:text-[9.5px] text-[#9a6a1c] font-semibold my-0.5 font-josefin">
                Daughter of
              </p>
              <p className="side-parents text-[11px] sm:text-sm text-[#6e3024] font-crimson leading-snug">
                {bride.parents.father.prefix} {bride.parents.father.name}
                <br />
                &amp; {bride.parents.mother.prefix} {bride.parents.mother.name}
              </p>
            </div>
          </div>

          {/* Hosted By Information */}
          <div className="hosted mt-2 pt-2 border-t border-gold/30 max-w-xs mx-auto pb-1">
            <span className="block w-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-1" />
            <p className="hosted-label uppercase tracking-widest text-[8.5px] sm:text-[10px] text-[#7a1c16] font-semibold mb-0.5 font-josefin">
              Hosted by
            </p>
            <p className="hosted-names text-[11px] sm:text-xs text-[#6e3024] font-crimson leading-snug">
              Shri Mohan &amp; Smt Kamla Malhotra
              <br />
              Shri Suresh &amp; Smt Lata Sharma
            </p>
            <img
              src="/assets/el/lotus_div.webp"
              alt=""
              className="w-10 sm:w-12 mx-auto mt-1 opacity-70"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <a className="cue" href="#count" aria-label="Scroll to countdown">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
};
