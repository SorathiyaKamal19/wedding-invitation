"use client";

import React, { useEffect, useState } from "react";
import { WeddingData } from "@/data/weddingData";
import { ScratchReveal } from "./ScratchReveal";

interface CountdownSectionProps {
  data: WeddingData;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(data.targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [data.targetDate]);

  return (
    <section
      className="sec velvet count"
      id="count"
      data-target={data.targetDate}
    >
      <div className="swing swing-l" aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
          src="/assets/el/dome_lamp.webp"
          alt=""
        />
      </div>
      <div className="swing swing-r" aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
          src="/assets/el/dome_lamp_b.webp"
          alt=""
        />
      </div>

      <div className="inner">
        <img
          loading="lazy"
          decoding="async"
          className="count-lamp reveal"
          src="/assets/el/deepam_hang.webp"
          alt=""
          aria-hidden="true"
        />
        <p className="eyebrow eyebrow-lt reveal">Counting down</p>
        <h2 className="h2 h2-lt reveal font-playfair">Until we say yes</h2>

        <div className="scard reveal">
          <img
            loading="lazy"
            decoding="async"
            className="sc-c sc-tl"
            src="/assets/el/corner_l.webp"
            alt=""
            aria-hidden="true"
          />
          <img
            loading="lazy"
            decoding="async"
            className="sc-c sc-tr"
            src="/assets/el/corner_r.webp"
            alt=""
            aria-hidden="true"
          />
          <img
            loading="lazy"
            decoding="async"
            className="sc-c sc-bl"
            src="/assets/el/corner_l.webp"
            alt=""
            aria-hidden="true"
          />
          <img
            loading="lazy"
            decoding="async"
            className="sc-c sc-br"
            src="/assets/el/corner_r.webp"
            alt=""
            aria-hidden="true"
          />

          <p className="sc-kick">The wedding</p>
          <p className="sc-date">
            {data.targetDateDisplay.dayOfWeek},{" "}
            {data.targetDateDisplay.dayNum}
            <sup>{data.targetDateDisplay.daySuffix}</sup>{" "}
            {data.targetDateDisplay.month} {data.targetDateDisplay.year}
          </p>
          <span className="sc-rule" aria-hidden="true">
            <i />
          </span>

          <ScratchReveal
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
          />
        </div>

        <div className="count-foot reveal">
          <img
            loading="lazy"
            decoding="async"
            className="deepam"
            src="/assets/el/deepam.webp"
            alt=""
            aria-hidden="true"
          />
          <p className="hashtag">{data.hashtag}</p>
          <img
            loading="lazy"
            decoding="async"
            className="deepam"
            src="/assets/el/deepam.webp"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

