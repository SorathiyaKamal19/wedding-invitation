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
  spriteIndex: number;
  alpha: number;
  isMote?: boolean;
}

export const SkyParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
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

    // Pre-render petal sprites into offscreen canvases (HUGE GPU performance boost)
    const petalSprites: HTMLCanvasElement[] = petalsColors.map((color) => {
      const off = document.createElement("canvas");
      off.width = 48;
      off.height = 48;
      const oc = off.getContext("2d");
      if (oc) {
        oc.translate(24, 24);
        oc.fillStyle = color;
        oc.beginPath();
        oc.moveTo(0, -20);
        oc.bezierCurveTo(18, -10, 16, 16, 0, 20);
        oc.bezierCurveTo(-16, 16, -18, -10, 0, -20);
        oc.fill();
      }
      return off;
    });

    // Pre-render gold mote sprite
    const moteSprite = document.createElement("canvas");
    moteSprite.width = 32;
    moteSprite.height = 32;
    const mc = moteSprite.getContext("2d");
    if (mc) {
      const grad = mc.createRadialGradient(16, 16, 0, 16, 16, 15);
      grad.addColorStop(0, "rgba(255, 243, 209, 1)");
      grad.addColorStop(0.4, "rgba(247, 222, 154, 0.8)");
      grad.addColorStop(1, "rgba(200, 151, 62, 0)");
      mc.fillStyle = grad;
      mc.beginPath();
      mc.arc(16, 16, 15, 0, Math.PI * 2);
      mc.fill();
    }

    const particles: Particle[] = [];
    const maxParticles = width < 640 ? 25 : 50;

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const isMote = Math.random() < 0.35;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMote ? 0.25 : 0.45),
        vy: isMote ? -(Math.random() * 0.35 + 0.12) : Math.random() * 0.55 + 0.3,
        size: isMote ? Math.random() * 3 + 2 : Math.random() * 8 + 6,
        swaySpeed: Math.random() * 1.2 + 0.5,
        swayAmplitude: Math.random() * 0.45 + 0.2,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.025,
        spriteIndex: Math.floor(Math.random() * petalsColors.length),
        alpha: Math.random() * 0.45 + 0.35,
        isMote,
      });
    }

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 2.5);
      lastTime = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.rotation += p.vRot * dt;
        p.x += (p.vx + Math.sin(t * p.swaySpeed + p.phase) * p.swayAmplitude) * dt;
        p.y += p.vy * dt;

        // Wrap around borders
        if (p.isMote) {
          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          ctx.globalAlpha = p.alpha;
          ctx.drawImage(moteSprite, p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        } else {
          if (p.y > height + 25) {
            p.y = -25;
            p.x = Math.random() * width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          const sprite = petalSprites[p.spriteIndex];
          ctx.drawImage(sprite, -p.size, -p.size, p.size * 2, p.size * 2);
          ctx.restore();
        }

        if (p.x < -25) p.x = width + 25;
        if (p.x > width + 25) p.x = -25;
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
