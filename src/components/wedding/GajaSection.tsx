"use client";

import React, { useEffect, useRef } from "react";

export const GajaSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
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
    const count = 30;

    for (let i = 0; i < count; i++) {
      sparks.push({
        x: Math.random() * (w || 400),
        y: Math.random() * (h || 400),
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.3),
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.8,
        maxAlpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
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

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2);
        grad.addColorStop(0, `rgba(255, 245, 200, ${opacity})`);
        grad.addColorStop(0.5, `rgba(232, 197, 122, ${opacity * 0.7})`);
        grad.addColorStop(1, "rgba(200, 151, 62, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="sec velvet gaja" id="gaja">
      <img
        loading="lazy"
        decoding="async"
        className="gaja-swag reveal"
        src="/assets/el/swag.webp"
        alt=""
        aria-hidden="true"
      />
      <p className="gaja-line reveal font-devanagari" lang="sa">
        ॥ शुभ विवाह ॥
      </p>
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
        <img
          loading="lazy"
          decoding="async"
          className="gaja-gate"
          src="/assets/el/arch.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="gaja-el gaja-el-l">
          <div className="gaja-bob">
            <img
              loading="lazy"
              decoding="async"
              src="/assets/el/elephant.webp"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="gaja-el gaja-el-r">
          <div className="gaja-bob">
            <img
              loading="lazy"
              decoding="async"
              src="/assets/el/elephant.webp"
              alt=""
              aria-hidden="true"
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

