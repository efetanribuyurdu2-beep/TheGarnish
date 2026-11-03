"use client";

import { usePrefs } from "@/lib/prefs";
import { playSfxPreview } from "@/lib/sfx";

/** Switch for the transition sound effects (separate from the music button). */
export function SfxToggle() {
  const { sfx, set, t, world } = usePrefs();
  const toggle = () => {
    if (!sfx) playSfxPreview(world ?? "maison");
    set({ sfx: !sfx });
  };
  return (
    <button className={`sfx-toggle chip ${sfx ? "on" : ""}`} onClick={toggle} aria-pressed={sfx} title={t(sfx ? "sfxOn" : "sfxOff")}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
        <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
        {sfx ? (
          <path d="M16 8.5c1.2 1 1.8 2.2 1.8 3.5s-.6 2.5-1.8 3.5M18.5 6c2 1.6 3 3.6 3 6s-1 4.4-3 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        ) : (
          <path d="M16.5 9l5 6m0-6l-5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        )}
      </svg>
      <span>{t(sfx ? "sfxOn" : "sfxOff")}</span>
    </button>
  );
}
