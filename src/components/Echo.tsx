"use client";

import { usePrefs } from "@/lib/prefs";
import { echo } from "@/lib/scripts";

/** A heading whispered again in the world's historic alphabet (runes, Orkhon, Greek). */
export function Echo({ text, className = "" }: { text: string; className?: string }) {
  const { world } = usePrefs();
  const e = echo(world ?? "maison", text);
  if (!e || !e.text) return null;
  return (
    <span className={`echo ${className}`} dir={e.rtl ? "rtl" : "ltr"} aria-hidden>
      {e.text}
    </span>
  );
}
