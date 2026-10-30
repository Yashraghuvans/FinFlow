"use client";

import { useEffect, useState } from "react";
import DummyDashboardShowcase from "./DummyDashboardShowcase";

export default function DashboardPreviewPlayer() {
  const [mounted, setMounted] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setAutoRotate(false);
  }, []);

  if (!mounted) {
    return (
      <div
        className="aspect-[960/580] w-full animate-pulse rounded-xl bg-white/[0.04]"
        aria-label="Loading dashboard preview"
      />
    );
  }

  return (
    <div
      className="relative aspect-[960/580] w-full overflow-hidden rounded-xl border border-[color:var(--surface-border)] bg-[var(--surface)] shadow-2xl shadow-black/40 ring-1 ring-white/[0.06]"
      aria-label="Sample owner and contractor dashboard previews"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
        aria-hidden
      />
      <DummyDashboardShowcase autoRotate={autoRotate} />
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-300 backdrop-blur-sm">
        Sample data
      </div>
    </div>
  );
}
