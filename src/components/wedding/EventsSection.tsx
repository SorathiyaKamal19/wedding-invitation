"use client";

import React, { useEffect, useRef } from "react";
import { WeddingData } from "@/data/weddingData";

interface EventsSectionProps {
  data: WeddingData;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ data }) => {
  const railRef = useRef<HTMLOListElement | null>(null);

  // Animate the golden rail progress as the guest scrolls
  useEffect(() => {
    const handleScroll = () => {
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      const h = rail.offsetHeight;
      const wh = window.innerHeight;

      // Start filling when the rail top enters the viewport (bottom 20%)
      const start = wh * 0.8;
      const current = start - rect.top;
      const progress = Math.min(1, Math.max(0, current / (h * 0.85)));
      rail.style.setProperty("--prog", progress.toFixed(3));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="sec parch events" id="events">
      {/* Golden Corner Flourishes */}
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
        {/* Section Header */}
        <img
          loading="lazy"
          decoding="async"
          className="head-orn reveal"
          src="/assets/el/pediment.webp"
          alt=""
          aria-hidden="true"
        />
        <p className="eyebrow reveal">Join us for</p>
        <h2 className="h2 reveal">The celebrations</h2>

        {/* Celebrations Timeline Rail */}
        <ol ref={railRef} className="rail" id="rail" style={{ "--prog": "1" } as React.CSSProperties}>
          {data.events.map((event) => (
            <li key={event.id} className="ev in lit">
              {/* Flickering Diya Flame Node */}
              <span className="node" aria-hidden="true" />

              {/* Ceremony Card */}
              <article className="ev-card">
                <figure className="ev-art">
                  <img
                    decoding="async"
                    src={event.artwork}
                    alt={event.name}
                    loading="lazy"
                  />
                </figure>
                <div className="ev-body">
                  <h3 className="ev-name">{event.name}</h3>
                  <p className="ev-when">{event.dateFormatted}</p>
                  <p className="ev-time">{event.timeFormatted}</p>
                  <p className="ev-venue">
                    {event.venue}
                    <br />
                    <span>{event.address}</span>
                  </p>
                  <dl className="ev-meta">
                    <div>
                      <dt>Dress code</dt>
                      <dd>{event.dressCode}</dd>
                    </div>
                    <div>
                      <dt>Note</dt>
                      <dd>{event.note}</dd>
                    </div>
                  </dl>
                  <a
                    className="btn"
                    href={event.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Directions</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
