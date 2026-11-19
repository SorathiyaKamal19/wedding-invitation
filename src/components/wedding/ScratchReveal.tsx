"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";

interface ScratchRevealProps {
  days: number;
  hours: number;
  minutes: number;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({
  days,
  hours,
  minutes,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [clearedPercent, setClearedPercent] = useState(0);
  const isDrawing = useRef(false);

  const reveal = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#F7DE9A", "#C8973E", "#F2D183", "#8A5E17"],
      });
    } catch {
      // fallback
    }
  }, [isRevealed]);

  // Paint the golden foil
  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (!w || !h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.globalCompositeOperation = "source-over";

    // Rich royal gold linear gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#B8862E");
    grad.addColorStop(0.2, "#F0D38A");
    grad.addColorStop(0.42, "#C8973E");
    grad.addColorStop(0.6, "#F7E2A6");
    grad.addColorStop(0.8, "#A87520");
    grad.addColorStop(1, "#E2BC6A");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Gold dust texture
    for (let i = 0; i < 400; i++) {
      ctx.globalAlpha = 0.06 + Math.random() * 0.08;
      ctx.fillStyle = i % 2 ? "#FFF6DA" : "#7A5412";
      ctx.fillRect(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 12 + 2,
        Math.random() * 1.5 + 0.5
      );
    }

    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(110,70,10,0.45)";
    ctx.lineWidth = 1;
    ctx.strokeRect(6.5, 6.5, w - 13, h - 13);
    ctx.strokeStyle = "rgba(255,245,210,0.6)";
    ctx.strokeRect(8.5, 8.5, w - 17, h - 17);
  }, [isRevealed]);

  useEffect(() => {
    paintFoil();
    window.addEventListener("resize", paintFoil);
    return () => {
      window.removeEventListener("resize", paintFoil);
    };
  }, [paintFoil]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check cleared percentage periodically
    setClearedPercent((prev) => {
      const next = prev + 1.2;
      if (next > 30) {
        reveal();
      }
      return next;
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  return (
    <>
      <div
        ref={wrapRef}
        className={`scratch ${isRevealed ? "cleared" : ""}`}
        id="scratch"
      >
        <div className={`clock ${isRevealed ? "revealed" : ""}`} id="clock">
          <div className="tile">
            <b id="cdD">{days}</b>
            <i>Days</i>
          </div>
          <span className="sep" aria-hidden="true" />
          <div className="tile">
            <b id="cdH">{hours}</b>
            <i>Hours</i>
          </div>
          <span className="sep" aria-hidden="true" />
          <div className="tile">
            <b id="cdM">{minutes}</b>
            <i>Minutes</i>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className={`foil ${isRevealed ? "done" : ""}`}
          id="foil"
          aria-hidden="true"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
        <span className="foil-sheen" aria-hidden="true" />
      </div>

      <p
        className={`scratch-hint ${isRevealed ? "gone" : ""}`}
        id="scratchHint"
      >
        <span className="hand" aria-hidden="true" />
        Scratch the gold to reveal
      </p>

      <button
        className={`foil-btn ${isRevealed ? "gone" : ""}`}
        id="foilBtn"
        type="button"
        onClick={reveal}
      >
        Reveal the countdown
      </button>
    </>
  );
};

