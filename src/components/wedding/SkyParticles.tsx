"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  swaySpeed: number;
  swayAmplitude: number;
  phase: number;
  rotation: number;
  vRot: number;
  color: string;
  alpha: number;
  isMote?: boolean;
}

export const SkyParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const petalsColors = [
      "#E28B93", // rose
      "#C23B4E", // deep red
      "#F8E2A0", // marigold
      "#FFF7E6", // jasmine cream
      "#D4A373", // gold-blush
    ];

    const particles: Particle[] = [];
    const maxParticles = width < 640 ? 35 : 65;

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const isMote = Math.random() < 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMote ? 0.3 : 0.6),
        vy: isMote ? -(Math.random() * 0.4 + 0.15) : Math.random() * 0.6 + 0.35,
        size: isMote ? Math.random() * 2.2 + 1 : Math.random() * 9 + 6,
        swaySpeed: Math.random() * 1.2 + 0.5,
        swayAmplitude: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.03,
        color: isMote
          ? "#F7DE9A"
          : petalsColors[Math.floor(Math.random() * petalsColors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        isMote,
      });
    }

    let lastTime = performance.now();

    const drawPetal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = alpha;
      c.fillStyle = color;

      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.9, -size * 0.5, size * 0.8, size * 0.8, 0, size);
      c.bezierCurveTo(-size * 0.8, size * 0.8, -size * 0.9, -size * 0.5, 0, -size);
      c.fill();

      c.restore();
    };

    const drawMote = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      c.save();
      c.globalAlpha = alpha;
      const grad = c.createRadialGradient(x, y, 0, x, y, size * 2);
      grad.addColorStop(0, "#FFF3D1");
      grad.addColorStop(0.4, "#F7DE9A");
      grad.addColorStop(1, "rgba(200, 151, 62, 0)");
      c.fillStyle = grad;
      c.beginPath();
      c.arc(x, y, size * 2, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 3);
      lastTime = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.rotation += p.vRot * dt;
        p.x += (p.vx + Math.sin(t * p.swaySpeed + p.phase) * p.swayAmplitude) * dt;
        p.y += p.vy * dt;

        // Wrap around
        if (p.isMote) {
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          drawMote(ctx, p.x, p.y, p.size, p.alpha);
        } else {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="sky" aria-hidden="true" />;
};

