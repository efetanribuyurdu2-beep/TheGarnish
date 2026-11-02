"use client";

import { useEffect, useRef, useState } from "react";
import { getPlayer } from "@/lib/music";
import { usePrefs } from "@/lib/prefs";
import type { WorldId } from "@/lib/types";

/** A tiny instrument per world. Parts with class names animate while music plays. */
function Instrument({ world }: { world: WorldId }) {
  switch (world) {
    case "anatolia": // darbuka
      return (
        <svg viewBox="0 0 40 40" className="ins ins-darbuka">
          <g className="hop">
            <ellipse cx="20" cy="9" rx="11" ry="3.5" fill="#f1e4c8" stroke="#d9a521" strokeWidth="1.4" />
            <path d="M9 9 C9 17 15 19 16.5 23 C17 26 13 31 12 36 H28 C27 31 23 26 23.5 23 C25 19 31 17 31 9" fill="#a3231c" stroke="#d9a521" strokeWidth="1.4" />
            <path d="M10.5 14 L13 12 L15.5 14 L18 12 L20.5 14 L23 12 L25.5 14 L28 12 L30 14" stroke="#d9a521" strokeWidth="1.2" fill="none" />
            <path d="M14 31 H26" stroke="#1b2a5e" strokeWidth="2.4" />
            <circle cx="20" cy="27" r="1.6" fill="#2fb7b0" />
          </g>
        </svg>
      );
    case "jazz": // vinyl
      return (
        <svg viewBox="0 0 40 40" className="ins ins-vinyl">
          <g className="spin">
            <circle cx="20" cy="20" r="17" fill="#111" stroke="#d9b25f" strokeWidth="1" />
            {[14, 11.5, 9].map((r) => (
              <circle key={r} cx="20" cy="20" r={r} fill="none" stroke="#333" strokeWidth=".8" />
            ))}
            <circle cx="20" cy="20" r="6" fill="#d9b25f" />
            <path d="M17 18 h6" stroke="#111" strokeWidth=".8" />
            <circle cx="20" cy="20" r="1.2" fill="#111" />
            <path d="M8 12 A14 14 0 0 1 16 6.5" stroke="#fff" strokeOpacity=".35" fill="none" />
          </g>
          <path d="M37 4 L30 16" stroke="#c9c9c9" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="37" cy="4" r="2" fill="#d9b25f" />
        </svg>
      );
    case "maison": // mini piano
      return (
        <svg viewBox="0 0 40 40" className="ins ins-piano">
          <path d="M4 14 C4 6 14 4 22 6 C30 8 36 10 36 16 V18 H4Z" fill="#0b0b0b" stroke="#c9a961" strokeWidth="1.2" />
          <rect x="4" y="18" width="32" height="12" fill="#f4efe2" stroke="#c9a961" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} className={`key k${i}`} x={4 + i * 4.57} y="18" width="4.57" height="12" fill="#f4efe2" stroke="#999" strokeWidth=".4" />
          ))}
          {[1, 2, 4, 5, 6].map((i) => (
            <rect key={i} x={4 + i * 4.57 - 1.3} y="18" width="2.6" height="7" fill="#111" />
          ))}
          <path d="M8 30 V36 M32 30 V36" stroke="#c9a961" strokeWidth="1.6" />
        </svg>
      );
    case "sakura": // fūrin wind chime
      return (
        <svg viewBox="0 0 40 40" className="ins ins-furin">
          <path d="M20 1 V6" stroke="#c9a27a" strokeWidth="1" />
          <g className="sway">
            <path d="M11 17 C11 9 15 6 20 6 C25 6 29 9 29 17 Z" fill="#cfe8f3" fillOpacity=".75" stroke="#f7eef0" strokeWidth="1" />
            <path d="M14 13 C15 11 16 11 17 12 M22 10 C23 9 24 9 25 11" stroke="#c8102e" strokeWidth="1.2" fill="none" />
            <circle cx="16" cy="12.5" r="1.4" fill="#f2a7bb" />
            <path d="M20 17 V24" stroke="#f7eef0" strokeWidth=".8" />
            <circle cx="20" cy="18.5" r="1.3" fill="#c9a27a" />
            <rect x="16.5" y="24" width="7" height="12" rx="1" fill="#f4ecdc" stroke="#c8102e" strokeWidth=".8" />
            <path d="M18 27 h4 M18 30 h4 M18 33 h3" stroke="#c8102e" strokeWidth=".7" />
          </g>
        </svg>
      );
    case "cosmos": // satellite dish
      return (
        <svg viewBox="0 0 40 40" className="ins ins-dish">
          <path className="wave w1" d="M26 10 A6 6 0 0 1 30 14" stroke="#7fe6ff" strokeWidth="1.4" fill="none" />
          <path className="wave w2" d="M27 5 A11 11 0 0 1 35 13" stroke="#7fe6ff" strokeWidth="1.4" fill="none" />
          <path d="M6 14 C6 26 16 32 26 26 Z" fill="#9b7bff" stroke="#e8ecff" strokeWidth="1.2" />
          <path d="M16 22 L24 14" stroke="#e8ecff" strokeWidth="1.2" />
          <circle cx="24.5" cy="13.5" r="1.8" fill="#ff7ac8" />
          <path d="M16 29 L14 36 H24 L20 28" fill="none" stroke="#e8ecff" strokeWidth="1.2" />
        </svg>
      );
    case "alchemist": // music box
      return (
        <svg viewBox="0 0 40 40" className="ins ins-box">
          <path d="M5 12 L10 6 H30 L25 12Z" fill="#7a5426" stroke="#c39245" strokeWidth="1" />
          <rect x="5" y="12" width="20" height="18" fill="#5a3d1f" stroke="#c39245" strokeWidth="1" />
          <path d="M25 12 L30 6 V24 L25 30Z" fill="#3b2612" stroke="#c39245" strokeWidth="1" />
          <circle cx="15" cy="21" r="3.5" fill="none" stroke="#c39245" />
          <path d="M15 17.5 V24.5 M11.5 21 H18.5" stroke="#c39245" strokeWidth=".7" />
          <g className="crank">
            <path d="M30 17 H34 V12" stroke="#c39245" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <circle cx="34" cy="11" r="1.6" fill="#c39245" />
          </g>
          <g className="notes" fill="#c39245">
            <text x="8" y="5" fontSize="6">♪</text>
            <text x="18" y="3" fontSize="5">♫</text>
          </g>
        </svg>
      );
    case "boreal": // kantele
      return (
        <svg viewBox="0 0 40 40" className="ins ins-kantele">
          <path d="M4 14 L36 8 L36 30 L4 26 Z" fill="#c9965a" stroke="#5a3a1e" strokeWidth="1" />
          <path d="M4 14 L36 8" stroke="#e8c08a" strokeWidth="1" />
          <circle cx="22" cy="19" r="3.2" fill="#3a2410" />
          <g className="strings" stroke="#f2f6fa" strokeWidth=".55">
            <path d="M7 15.5 L34 11 M7 18 L34 14.5 M7 20.5 L34 18 M7 23 L34 21.5 M7 25 L34 25" />
          </g>
          <path d="M28 30 l2 4 l2 -4" stroke="#7fe3c4" strokeWidth="1" fill="none" />
          <g stroke="#dfeaf2" strokeWidth=".8" strokeLinecap="round">
            <path d="M33 1.5 v5 m-2.2 -3.8 l4.4 2.6 m0 -2.6 l-4.4 2.6" />
          </g>
        </svg>
      );
    case "riviera": // mandolin
      return (
        <svg viewBox="0 0 40 40" className="ins ins-mando">
          <g transform="rotate(40 20 20)">
            <rect x="18.4" y="1" width="3.2" height="15" fill="#5a3a1e" />
            <path d="M17 0 H23 L22.4 4 H17.6 Z" fill="#3a2410" />
            <path d="M20 14 C10 14 9 26 13 32 C15 36 25 36 27 32 C31 26 30 14 20 14Z" fill="#b8603a" stroke="#3a2410" strokeWidth="1" />
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M${14 + i * 3} 17 C${13 + i * 3} 24 ${14 + i * 3} 30 ${15 + i * 2.5} 33`} stroke="#8a4024" strokeWidth=".5" fill="none" />
            ))}
            <ellipse cx="20" cy="22" rx="2.8" ry="2.4" fill="#2a1408" />
            <rect x="16.5" y="27" width="7" height="1.4" fill="#e3b341" />
            <g className="strings" stroke="#f2e6cc" strokeWidth=".45">
              <path d="M19 2 V28 M19.7 2 V28 M20.3 2 V28 M21 2 V28" />
            </g>
          </g>
          <circle cx="33" cy="31" r="3.4" fill="#f2c94c" />
          <path d="M34 28 C36 25 38 26 38 26 C37 28 35.5 28.6 34 28Z" fill="#5e7a2e" />
        </svg>
      );
    case "tiki": // ukulele
      return (
        <svg viewBox="0 0 40 40" className="ins ins-uke">
          <g transform="rotate(-35 20 20)">
            <rect x="18" y="1" width="4" height="17" fill="#6b4a1f" />
            <rect x="17" y="0" width="6" height="4" rx="1" fill="#3a2210" />
            <path d="M20 16 C13 16 12 21 14 24 C11 27 12 36 20 36 C28 36 29 27 26 24 C28 21 27 16 20 16Z" fill="#f0a04b" stroke="#3a2210" strokeWidth="1" />
            <circle cx="20" cy="24" r="2.8" fill="#3a2210" />
            <rect x="17" y="31" width="6" height="1.6" fill="#3a2210" />
            <g className="strings" stroke="#f4ead2" strokeWidth=".5">
              <path d="M18.8 2 V32 M19.6 2 V32 M20.4 2 V32 M21.2 2 V32" />
            </g>
          </g>
          <circle cx="33" cy="30" r="4" fill="#e2574c" />
          <circle cx="33" cy="30" r="1.3" fill="#f3d36b" />
        </svg>
      );
  }
}

export function MusicButton() {
  const { world, lang } = usePrefs();
  const w = world ?? "maison";
  const [on, setOn] = useState(false);
  const [vol, setVol] = useState(0.6);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // follow world changes while playing
  useEffect(() => {
    const p = getPlayer();
    if (on && p.current !== w) void p.play(w);
  }, [w, on]);

  useEffect(() => () => getPlayer().stop(), []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const toggle = async () => {
    const p = getPlayer();
    if (on) {
      p.stop();
      setOn(false);
    } else {
      await p.play(w);
      setOn(true);
      setOpen(true);
    }
  };

  const label = lang === "tr" ? (on ? "Müziği durdur" : "Müziği çal") : on ? "Stop music" : "Play music";

  return (
    <div className="music" ref={wrap}>
      <button className={`music-btn ${on ? "playing" : ""}`} onClick={toggle} aria-pressed={on} aria-label={label} title={label}>
        <Instrument world={w} />
      </button>
      {open && on && (
        <div className="music-pop">
          <span>{lang === "tr" ? "Ses" : "Volume"}</span>
          <input
            type="range"
            className="themed"
            min={0}
            max={1}
            step={0.05}
            value={vol}
            style={{ "--pct": `${vol * 100}%` } as React.CSSProperties}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVol(v);
              getPlayer().setVolume(v);
            }}
            aria-label={lang === "tr" ? "Ses seviyesi" : "Volume"}
          />
        </div>
      )}
    </div>
  );
}
