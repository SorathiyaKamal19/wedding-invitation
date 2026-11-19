"use client";

import React, { useEffect, useRef, useState } from "react";
import { WeddingData } from "@/data/weddingData";

interface StorySectionProps {
  data: WeddingData;
}

export const StorySection: React.FC<StorySectionProps> = ({ data }) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [pathD, setPathD] = useState("");
  const [viewBox, setViewBox] = useState("0 0 100 100");

  useEffect(() => {
    const handleLayoutThread = () => {
      const box = boxRef.current;
      if (!box) return;

      const br = box.getBoundingClientRect();
      if (!br.width || !br.height) return;

      setViewBox(`0 0 ${br.width} ${br.height}`);

      if (window.innerWidth < 760) {
        setPathD("");
        return;
      }

      const photoEls = Array.from(box.querySelectorAll<HTMLElement>(".mo-ph"));
      if (photoEls.length < 2) return;

      const pts = photoEls.map((f) => {
        const r = f.getBoundingClientRect();
        return {
          x: r.left - br.left + r.width / 2,
          top: r.top - br.top,
          bot: r.bottom - br.top,
        };
      });

      let d = "";
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const my = (a.bot + b.top) / 2;
        d +=
          (i ? " " : `M ${a.x.toFixed(1)} ${a.bot.toFixed(1)}`) +
          ` C ${a.x.toFixed(1)} ${my.toFixed(1)}, ${b.x.toFixed(1)} ${my.toFixed(1)}, ${b.x.toFixed(1)} ${b.top.toFixed(1)}`;
      }

      setPathD(d);
    };

    handleLayoutThread();
    window.addEventListener("resize", handleLayoutThread);
    const timer = setTimeout(handleLayoutThread, 500);

    return () => {
      window.removeEventListener("resize", handleLayoutThread);
      clearTimeout(timer);
    };
  }, [data.story]);

  return (
    <section className="sec velvet story" id="story">
      <div className="inner">
        <img
          loading="lazy"
          decoding="async"
          className="head-orn head-orn-sm reveal"
          src="/assets/el/lotus_div.webp"
          alt=""
          aria-hidden="true"
        />
        <p className="eyebrow eyebrow-lt reveal">How we got here</p>
        <h2 className="h2 h2-lt reveal font-playfair">Our story</h2>

        <div ref={boxRef} className="moments" id="moments">
          <svg
            className="thread"
            id="thread"
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox={viewBox}
          >
            <path id="threadPath" d={pathD} />
          </svg>

          {data.story.map((moment, idx) => (
            <article key={`moment-${idx}`} className="mo in">
              <figure className="mo-ph">
                <img
                  decoding="async"
                  src={moment.photo}
                  alt={moment.heading}
                  loading="lazy"
                />
              </figure>
              <div className="mo-tx">
                <p className="mo-when">{moment.when}</p>
                <h3 className="mo-head font-playfair">{moment.heading}</h3>
                <p className="mo-words">{moment.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pond" aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
          className="pond-water"
          src="/assets/el/pond.webp"
          alt=""
        />
        <div className="swan-glide">
          <img
            loading="lazy"
            decoding="async"
            src="/assets/el/swan.webp"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};
