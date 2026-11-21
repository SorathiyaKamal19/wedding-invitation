"use client";

import React, { useEffect, useRef, useState } from "react";

export const GajaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [arrived, setArrived] = useState(false);
  const [isTrumpeting, setIsTrumpeting] = useState(false);

  // Trigger celebration trumpet on click/tap
  const handleElephantClick = () => {
    setIsTrumpeting(true);
    setTimeout(() => setIsTrumpeting(false), 1600);
  };

  // Observe when section enters viewport to trigger royal procession arrival
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setArrived(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  // Periodic royal celebratory trumpet salute
  useEffect(() => {
    if (!arrived) return;
    const interval = setInterval(() => {
      setIsTrumpeting(true);
      setTimeout(() => setIsTrumpeting(false), 1600);
    }, 6500);
    return () => clearInterval(interval);
  }, [arrived]);

  // Gold sparks particle canvas (only animates when visible to eliminate scroll lag)
  useEffect(() => {
    const canvas = canvasRef.current;
    const sec = sectionRef.current;
    if (!canvas || !sec) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let isVisible = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Stop canvas animation when scrolled off-screen to preserve 60/120fps scrolling
    const visObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    visObserver.observe(sec);

    interface Spark {
      x: number;
      y: number;
      vy: number;
      vx: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      speed: number;
    }

    const sparks: Spark[] = [];
    const count = 24;

    for (let i = 0; i < count; i++) {
      sparks.push({
        x: Math.random() * (w || 400),
        y: Math.random() * (h || 400),
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.5 + 0.25),
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.8,
        maxAlpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return; // Skip drawing when off-screen

      const dt = Math.min((now - lastTime) / 16.67, 3);
      lastTime = now;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.y += s.vy * dt;
        s.x += s.vx * dt;
        s.alpha += s.speed * dt;

        if (s.y < 0) {
          s.y = h + 10;
          s.x = Math.random() * w;
        }

        const opacity = (Math.sin(s.alpha) + 1) * 0.5 * s.maxAlpha;

        ctx.fillStyle = `rgba(247, 222, 154, ${opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      visObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sec velvet gaja ${arrived ? "arrived" : ""}`}
      id="gaja"
    >
      <img
        loading="lazy"
        decoding="async"
        className="gaja-swag reveal"
        src="/assets/el/swag.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="shubh-vivah-wrap">
        <p className="gaja-line reveal font-devanagari select-none" lang="sa">
          ॥ शुभ विवाह ॥
        </p>
      </div>

      <span className="flourish reveal" aria-hidden="true" />

      <div className="gaja-scene" id="gajaScene">
        <div className="gaja-glow" aria-hidden="true" />
        <img
          loading="lazy"
          decoding="async"
          className="gaja-floor"
          src="/assets/el/rangoli.webp"
          alt=""
          aria-hidden="true"
        />

        {/* Golden palace wedding gate */}
        <img
          loading="lazy"
          decoding="async"
          className="gaja-gate"
          src="/assets/el/arch.webp"
          alt=""
          aria-hidden="true"
        />

        {/* Left Royal Elephant with walking stride & trumpet salute */}
        <div
          className={`gaja-el gaja-el-l cursor-pointer ${isTrumpeting ? "trumpeting" : ""}`}
          onClick={handleElephantClick}
          role="button"
          tabIndex={0}
          aria-label="Royal guardian elephant"
          title="Tap the royal elephant!"
        >
          <div className={`gaja-bob ${isTrumpeting ? "trumpet" : ""}`}>
            <img
              loading="lazy"
              decoding="async"
              src="/assets/el/elephant.webp"
              alt="Royal elephant procession"
              aria-hidden="true"
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Royal Elephant with walking stride & trumpet salute */}
        <div
          className={`gaja-el gaja-el-r cursor-pointer ${isTrumpeting ? "trumpeting" : ""}`}
          onClick={handleElephantClick}
          role="button"
          tabIndex={0}
          aria-label="Royal guardian elephant"
          title="Tap the royal elephant!"
        >
          <div className={`gaja-bob ${isTrumpeting ? "trumpet" : ""}`}>
            <img
              loading="lazy"
              decoding="async"
              src="/assets/el/elephant.webp"
              alt="Royal elephant procession"
              aria-hidden="true"
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="gaja-canvas"
          id="gajaCanvas"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
