"use client";

import React, { useEffect, useRef } from "react";
import { WeddingData, WeddingEvent } from "@/data/weddingData";

interface EventsSectionProps {
  data: WeddingData;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLOListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Animate the golden rail progress and reveal cards as the guest scrolls
  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
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

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Header reveal observer
    const secEl = sectionRef.current;
    let secObs: IntersectionObserver | null = null;
    if (secEl && typeof IntersectionObserver !== "undefined") {
      secObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              secEl.classList.add("arrived");
            }
          });
        },
        { threshold: 0.1 }
      );
      secObs.observe(secEl);
    }

    // Scroll-triggered reveal observer for each ceremony card
    let itemObs: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      itemObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in", "lit");
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
      );

      itemRefs.current.forEach((el) => {
        if (el) itemObs?.observe(el);
      });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      if (secObs && secEl) secObs.unobserve(secEl);
      if (itemObs) itemObs.disconnect();
    };
  }, []);

  const getGoogleCalendarUrl = (event: WeddingEvent) => {
    const [year, month, day] = event.date.split("-");
    const [hour, min] = event.time.split(":");
    const startDate = `${year}${month}${day}T${hour}${min}00`;
    const endHour = String((parseInt(hour, 10) + 3) % 24).padStart(2, "0");
    const endDate = `${year}${month}${day}T${endHour}${min}00`;

    const title = encodeURIComponent(`Aarav & Ananya's Wedding: ${event.name}`);
    const details = encodeURIComponent(`${event.note} | Dress code: ${event.dressCode}`);
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  return (
    <section ref={sectionRef} className="sec parch events" id="events">
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
        <ol ref={railRef} className="rail" id="rail" style={{ "--prog": "0" } as React.CSSProperties}>
          {data.events.map((event, idx) => (
            <li
              key={event.id}
              ref={(el) => { itemRefs.current[idx] = el; }}
              className="ev"
              style={{ "--ev-i": idx } as React.CSSProperties}
            >
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
                  <div className="ev-actions" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "14px" }}>
                    <a
                      className="btn btn-sm"
                      href={event.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>📍 Directions</span>
                    </a>
                    <a
                      className="btn btn-sm btn-outline"
                      href={getGoogleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Add to Google Calendar"
                    >
                      <span>📅 Calendar</span>
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
