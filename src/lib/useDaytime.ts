"use client";

import { useEffect, useState } from "react";
import { phaseOf, type Phase } from "./daytime";

/** The current phase of the day; keeps <html data-time> in step (checked every 5 minutes). */
export function usePhase(): Phase {
  const [phase, setPhase] = useState<Phase>("dusk");
  useEffect(() => {
    const tick = () => {
      const p = phaseOf(new Date().getHours());
      document.documentElement.dataset.time = p;
      setPhase(p);
    };
    tick();
    const id = setInterval(tick, 5 * 60_000);
    const vis = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);
  return phase;
}
