"use client";

import React, { useState, useRef, useEffect } from "react";
import { triggerConfetti } from "@/lib/confetti";

interface OpeningCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const OpeningCover: React.FC<OpeningCoverProps> = ({ onOpen, isOpen }) => {
  const [stage, setStage] = useState<"closed" | "opening" | "done">("closed");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate 16 mandala petals
  const petals = Array.from({ length: 16 }, (_, i) => ({
    angle: i * 22.5,
    key: `petal-${i}`,
  }));

  // Generate 24 mandala dots
  const dots = Array.from({ length: 24 }, (_, i) => {
    const rad = (i * 15 * Math.PI) / 180;
    return {
      cx: (200 + Math.cos(rad) * 124).toFixed(1),
      cy: (200 + Math.sin(rad) * 124).toFixed(1),
      r: i % 2 ? 1.6 : 2.6,
      delay: (-i * 0.21).toFixed(2),
      key: `dot-${i}`,
    };
  });

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");

    // Particle burst
    const count = typeof window !== "undefined" && window.innerWidth < 640 ? 60 : 120;
    triggerConfetti({
      particleCount: count,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#F7DE9A", "#C8973E", "#F2D183", "#8A5E17", "#FFF1C4", "#B8862E"],
      shapes: ["circle"],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
    });

    onOpen();

    // After animation finishes, completely unmount cover
    setTimeout(() => {
      setStage("done");
    }, 1300);
  };

  useEffect(() => {
    if (isOpen && stage === "closed") {
      setStage("done");
    }
  }, [isOpen, stage]);

  if (stage === "done") {
    return null;
  }

  return (
    <div
      id="cover"
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
      className={`${stage === "opening" ? "go" : ""}`}
      style={{
        pointerEvents: stage === "opening" ? "none" : "auto",
        transition: "opacity 0.6s ease",
        opacity: stage === "opening" ? undefined : 1,
      }}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleOpen();
        }
      }}
    >
      <div className="cv-field" />
      <div className="cv-curtain cv-l" aria-hidden="true">
        <i className="cv-fringe" />
      </div>
      <div className="cv-curtain cv-r" aria-hidden="true">
        <i className="cv-fringe" />
      </div>

      <img
        className="cv-swag"
        src="/assets/el/swag.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="cv-hang cv-hang-l" aria-hidden="true">
        <img src="/assets/el/dome_lamp.webp" alt="" />
      </div>
      <div className="cv-hang cv-hang-r" aria-hidden="true">
        <img src="/assets/el/dome_lamp_b.webp" alt="" />
      </div>

      <div className="cv-stage">
        <div className="cv-mandala" aria-hidden="true">
          <svg className="cv-ring cv-ring-a" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="cvGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#F7DE9A" />
                <stop offset=".45" stopColor="#C8973E" />
                <stop offset="1" stopColor="#F2D183" />
              </linearGradient>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="194"
              fill="none"
              stroke="url(#cvGold)"
              strokeWidth="1.2"
              opacity=".75"
            />
            <circle
              cx="200"
              cy="200"
              r="186"
              fill="none"
              stroke="url(#cvGold)"
              strokeWidth=".8"
              strokeDasharray="2 7"
              opacity=".9"
            />
            <g id="cvPetals" fill="none" stroke="url(#cvGold)" strokeWidth="1.3">
              {petals.map((p) => (
                <path
                  key={p.key}
                  d="M200 20 C 214 42, 214 62, 200 80 C 186 62, 186 42, 200 20 Z M200 34 C 206 46, 206 58, 200 68 C 194 58, 194 46, 200 34 Z"
                  transform={`rotate(${p.angle} 200 200)`}
                />
              ))}
            </g>
          </svg>

          <svg className="cv-ring cv-ring-b" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="url(#cvGold)"
              strokeWidth="1"
              opacity=".8"
            />
            <circle
              cx="200"
              cy="200"
              r="142"
              fill="none"
              stroke="url(#cvGold)"
              strokeWidth="3"
              strokeDasharray="1 11"
              strokeLinecap="round"
            />
            <g id="cvDots" fill="#F6D68A">
              {dots.map((d) => (
                <circle
                  key={d.key}
                  cx={d.cx}
                  cy={d.cy}
                  r={d.r}
                  style={{ animationDelay: `${d.delay}s` }}
                />
              ))}
            </g>
          </svg>

          <div className="cv-seal">
            <img src="/assets/couple-logo.webp" alt="The couple's monogram" />
          </div>
        </div>

        <div className="cv-plaque">
          <img src="/assets/el/banner.webp" alt="" aria-hidden="true" />
          <p className="cv-tap">Tap to open</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="cv-burst" id="cvBurst" aria-hidden="true" />
      <div className="cv-flash" aria-hidden="true" />
    </div>
  );
};
