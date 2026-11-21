/**
 * Safe client-only dynamic wrapper for canvas-confetti.
 * Prevents SSR / webpack runtime chunk evaluation errors in Next.js App Router.
 */
export const triggerConfetti = async (options?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  try {
    const confetti = (await import("canvas-confetti")).default;
    if (typeof confetti === "function") {
      confetti(options);
    }
  } catch (err) {
    // Graceful fallback if blocked by browser policy
    console.debug("Confetti unavailable", err);
  }
};
