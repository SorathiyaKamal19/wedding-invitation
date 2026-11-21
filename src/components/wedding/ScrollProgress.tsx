"use client";

import React, { useEffect, useRef } from "react";

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const p = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        bar.style.width = `${p}%`;
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <i ref={barRef} id="progress" style={{ width: "0%", transform: "none" }} />
    </div>
  );
};

