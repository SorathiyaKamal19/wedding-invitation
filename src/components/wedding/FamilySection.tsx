"use client";

import React, { useEffect, useRef, useState } from "react";
import { WeddingData } from "@/data/weddingData";

interface FamilySectionProps {
  data: WeddingData;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ data }) => {
  const secRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const artRef = useRef<HTMLDivElement | null>(null);
  const winRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(true);

  const flameCoords = [
    [9.4, 69.8],
    [10.5, 69.8],
    [17.6, 69.8],
    [18.7, 69.8],
    [19.2, 76.2],
    [24.4, 78.3],
  ];

  useEffect(() => {
    let maxScrollDistance = 0;

    const handleLayout = () => {
      const sec = secRef.current;
      const stage = stageRef.current;
      const art = artRef.current;
      const wEl = winRef.current;
      const content = contentRef.current;
      if (!sec || !stage || !art || !wEl || !content) return;

      const iw = 941;
      const ih = 1672;
      // Arch aperture coordinates: left 23%, top 27%, width 54%, height 49%
      const win = [23, 27, 54, 49];

      const sw = stage.clientWidth;
      const sh = stage.clientHeight;

      const sCover = Math.max(sw / iw, sh / ih);
      const sContain = Math.min(sw / iw, sh / ih);
      const s = Math.max(sContain, Math.min(sCover, sw / (0.8 * iw), sh / (0.84 * ih)));

      const w = iw * s;
      const h = ih * s;
      const l = (sw - w) / 2;
      const t = (sh - h) / 2;

      art.style.left = `${l}px`;
      art.style.top = `${t}px`;
      art.style.width = `${w}px`;
      art.style.height = `${h}px`;

      const wl = l + (w * win[0]) / 100;
      const wt = t + (h * win[1]) / 100;
      const ww = (w * win[2]) / 100;
      const wh = (h * win[3]) / 100;

      wEl.style.left = `${Math.round(wl)}px`;
      wEl.style.top = `${Math.round(wt)}px`;
      wEl.style.width = `${Math.round(ww)}px`;
      wEl.style.height = `${Math.round(wh)}px`;
      wEl.style.setProperty("--ww", `${Math.round(ww)}px`);

      // Calculate how much content needs to scroll
      const ch = content.scrollHeight || content.offsetHeight;
      maxScrollDistance = Math.max(0, ch - wh + 24);

      if (maxScrollDistance > 10) {
        setCanScroll(true);
        // Track height gives enough scroll room for a comfortable reading pace
        const trackLen = window.innerHeight + maxScrollDistance * 2.2;
        sec.style.height = `${Math.round(trackLen)}px`;
      } else {
        setCanScroll(false);
        sec.style.height = "100vh";
      }

      handleScroll();
    };

    const handleScroll = () => {
      const sec = secRef.current;
      const content = contentRef.current;
      if (!sec || !content) return;

      const rect = sec.getBoundingClientRect();
      const scrollDist = sec.offsetHeight - window.innerHeight;
      if (scrollDist <= 0 || maxScrollDistance <= 0) {
        content.style.transform = "translate3d(0, 0, 0)";
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(1, Math.max(0, -rect.top / scrollDist));
      setScrollProgress(progress);
      const translateY = -progress * maxScrollDistance;
      content.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
    };

    handleLayout();
    window.addEventListener("resize", handleLayout);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Allow mousewheel over arch window to scroll the page
    const wEl = winRef.current;
    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({ top: e.deltaY });
    };
    if (wEl) {
      wEl.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", handleLayout);
      window.removeEventListener("scroll", handleScroll);
      if (wEl) {
        wEl.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const groom = data.couple.groom;
  const bride = data.couple.bride;

  return (
    <section
      ref={secRef}
      className="pin relative w-full"
      id="family"
      data-iw="941"
      data-ih="1672"
      data-win="23 27 54 49"
    >
      {/* Sticky palace arch stage that stays pinned during scroll */}
      <div
        ref={stageRef}
        className="pin-stage sticky top-0 h-screen w-full overflow-hidden"
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

        {/* Arch aperture window with golden fade gradient top & bottom */}
        <div
          ref={winRef}
          className="st-window pin-window absolute overflow-hidden z-10"
        >
          {/* Scrollable Pinned Content: Flows upward as the guest scrolls */}
          <div
            ref={contentRef}
            className="pin-content fam absolute left-0 right-0 top-0 text-center will-change-transform"
          >
            {/* Royal Gold Monogram Emblem */}
            <div className="seal-wrap mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 relative">
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
              <div className="seal absolute inset-1.5 flex items-center justify-center bg-gradient-to-br from-[#FFF8E7] via-[#F5DC96] to-[#D4A346] shadow-md rounded-full border border-gold/50">
                <span className="font-greatvibes text-2xl sm:text-3xl text-[#5e1210] font-bold tracking-tight select-none">
                  A &amp; A
                </span>
              </div>
            </div>

            <p className="eyebrow uppercase tracking-widest text-[11px] sm:text-xs text-[#946650] mb-1 font-josefin">
              An invitation
            </p>
            <h2 className="h2 font-playfair text-2xl sm:text-3xl md:text-4xl text-[#5e1210] font-semibold mb-2 leading-tight">
              With the blessings
              <br />
              of our families
            </h2>
            <p className="prose text-xs sm:text-sm text-[#6e3024] max-w-xs sm:max-w-md mx-auto mb-6 leading-relaxed font-crimson">
              We invite you to join us as we take our vows, and to share in the joy
              of the days that follow.
            </p>

            {/* Groom and Bride Union Section */}
            <div className="union my-4 flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
              {/* Groom Side */}
              <div className="side side-groom text-center w-full">
                <p className="side-name font-playfair font-semibold text-lg sm:text-2xl text-[#5e1210] leading-tight">
                  {groom.full}
                </p>
                <p className="side-role uppercase tracking-widest text-[10px] text-[#9a6a1c] font-semibold my-1 font-josefin">
                  Son of
                </p>
                <p className="side-parents text-sm sm:text-base text-[#6e3024] font-crimson leading-snug">
                  {groom.parents.father.prefix} {groom.parents.father.name}
                  <br />
                  &amp; {groom.parents.mother.prefix} {groom.parents.mother.name}
                </p>
              </div>

              {/* Royal Weds Flourish */}
              <div className="weds flex items-center justify-center gap-3 my-2 w-full max-w-[220px]">
                <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b8862e]" />
                <em className="font-greatvibes text-3xl sm:text-4xl text-[#b8862e] px-2 not-italic leading-none">
                  weds
                </em>
                <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b8862e]" />
              </div>

              {/* Bride Side */}
              <div className="side side-bride text-center w-full">
                <p className="side-name font-playfair font-semibold text-lg sm:text-2xl text-[#5e1210] leading-tight">
                  {bride.full}
                </p>
                <p className="side-role uppercase tracking-widest text-[10px] text-[#9a6a1c] font-semibold my-1 font-josefin">
                  Daughter of
                </p>
                <p className="side-parents text-sm sm:text-base text-[#6e3024] font-crimson leading-snug">
                  {bride.parents.father.prefix} {bride.parents.father.name}
                  <br />
                  &amp; {bride.parents.mother.prefix} {bride.parents.mother.name}
                </p>
              </div>
            </div>

            {/* Hosted By Information */}
            <div className="hosted mt-6 pt-4 border-t border-gold/30 max-w-xs sm:max-w-sm mx-auto pb-8">
              <span className="block w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-2" />
              <p className="hosted-label uppercase tracking-widest text-[10px] sm:text-[11px] text-[#7a1c16] font-semibold mb-1 font-josefin">
                Hosted by
              </p>
              <p className="hosted-names text-xs sm:text-sm text-[#6e3024] font-crimson leading-relaxed">
                Shri Mohan &amp; Smt Kamla Malhotra
                <br />
                Shri Suresh &amp; Smt Lata Sharma
              </p>
              <img
                src="/assets/el/lotus_div.webp"
                alt=""
                className="w-16 mx-auto mt-4 opacity-70"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Floating 'Scroll down' prompt inside the arch window */}
          {canScroll && scrollProgress < 0.65 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center opacity-80 animate-bounce transition-opacity duration-300">
              <span className="text-[9px] uppercase tracking-widest font-josefin text-gold font-semibold drop-shadow">
                Scroll to read
              </span>
              <svg className="w-3.5 h-3.5 text-gold drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
