"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#270507] text-[#fff9ec] text-center px-4 font-crimson">
      <h2 className="font-playfair text-3xl text-gold mb-3">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full border border-gold/50 bg-[#8a5e17] text-[#fff9ec] font-josefin uppercase tracking-widest text-xs hover:bg-[#a5701e] transition-colors cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
