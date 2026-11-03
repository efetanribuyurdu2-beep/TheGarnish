"use client";

import { worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { WorldId } from "@/lib/types";

/**
 * The slide-show style transition between worlds. The screen is covered in the
 * destination world's way, the world swaps underneath, then it is revealed:
 *  boreal – a short blizzard        sakura – a storm of blossom petals
 *  anatolia – kilim curtains + nazar jazz – red velvet stage curtains
 *  riviera – wooden shutters        cosmos – a jump to light speed
 *  maison – a golden Art Deco fan   alchemist – green smoke and glyphs
 *  tiki – palm fronds sweeping in
 */
const r = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function Particles({ to }: { to: WorldId }) {
  switch (to) {
    case "boreal":
      return (
        <div className="wt-snow">
          {Array.from({ length: 110 }, (_, i) => (
            <i key={i} style={{ top: `${r(i, 1) * 100}%`, width: 2 + r(i, 2) * 26, height: 1.5 + r(i, 3) * 3.5, animationDelay: `${r(i, 4) * 0.9}s`, animationDuration: `${0.5 + r(i, 5) * 0.7}s`, opacity: 0.5 + r(i, 6) * 0.5 }} />
          ))}
        </div>
      );
    case "sakura":
      return (
        <div className="wt-petals">
          {Array.from({ length: 90 }, (_, i) => (
            <i key={i} style={{ left: `${-10 + r(i, 1) * 60}%`, top: `${40 + r(i, 2) * 70}%`, width: 10 + r(i, 3) * 14, height: 8 + r(i, 3) * 10, animationDelay: `${r(i, 4) * 0.8}s`, animationDuration: `${1 + r(i, 5) * 0.8}s`, background: r(i, 6) > 0.7 ? "#fbd3de" : r(i, 6) > 0.3 ? "#f2a7bb" : "#e68aa3" }} />
          ))}
        </div>
      );
    case "cosmos":
      return (
        <div className="wt-warp">
          {Array.from({ length: 120 }, (_, i) => (
            <i key={i} style={{ transform: `rotate(${r(i, 1) * 360}deg)`, animationDelay: `${r(i, 2) * 0.6}s` }}>
              <b style={{ width: 40 + r(i, 3) * 160, background: r(i, 4) > 0.6 ? "#ff7ac8" : r(i, 4) > 0.3 ? "#7fe6ff" : "#ffffff" }} />
            </i>
          ))}
        </div>
      );
    case "maison":
      return (
        <div className="wt-fan">
          <svg viewBox="-100 -100 200 100" preserveAspectRatio="xMidYMax slice" aria-hidden>
            {Array.from({ length: 19 }, (_, i) => (
              <path key={i} d="M0 0 L-4 -140 L4 -140 Z" transform={`rotate(${-90 + i * 10})`} fill={i % 2 ? "#c9a961" : "#f3e3b3"} opacity={i % 2 ? 0.9 : 0.6} />
            ))}
            {[30, 55, 80].map((rr) => <path key={rr} d={`M${-rr} 0 A${rr} ${rr} 0 0 1 ${rr} 0`} fill="none" stroke="#0b0b0b" strokeWidth="2.5" />)}
          </svg>
          {Array.from({ length: 50 }, (_, i) => (
            <span key={i} className="wt-glint" style={{ left: `${r(i, 1) * 100}%`, top: `${r(i, 2) * 100}%`, animationDelay: `${0.2 + r(i, 3) * 1}s` }} />
          ))}
        </div>
      );
    case "alchemist":
      return (
        <div className="wt-smoke">
          {Array.from({ length: 10 }, (_, i) => (
            <i key={i} style={{ left: `${10 + r(i, 1) * 80}%`, top: `${15 + r(i, 2) * 70}%`, animationDelay: `${r(i, 3) * 0.4}s` }} />
          ))}
          {["☉", "☽", "☿", "♀", "♂", "♃", "♄", "△", "▽", "☉", "☿", "♄", "☽", "♃"].map((g, i) => (
            <span key={i} style={{ left: `${8 + r(i, 4) * 84}%`, top: `${10 + r(i, 5) * 80}%`, fontSize: 24 + r(i, 6) * 40, animationDelay: `${0.2 + r(i, 7) * 0.6}s` }}>{g}</span>
          ))}
        </div>
      );
    case "tiki":
      return (
        <div className="wt-fronds">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <svg key={i} className={`frond f${i}`} viewBox="0 0 400 120" aria-hidden>
              <path d="M0 60 C120 -10 300 -10 400 60 C300 130 120 130 0 60Z" fill={i % 2 ? "#2a6b45" : "#1f5a3a"} />
              <path d="M0 60 H400" stroke="#0c1a14" strokeWidth="4" />
              {Array.from({ length: 14 }, (_, j) => (
                <path key={j} d={`M${30 + j * 26} 60 L${50 + j * 26} ${j % 2 ? 100 : 20}`} stroke="#0c1a14" strokeWidth="3" />
              ))}
            </svg>
          ))}
          <i className="wt-torch" />
        </div>
      );
    default:
      return null;
  }
}

function Panels({ to }: { to: WorldId }) {
  if (to === "anatolia")
    return (
      <>
        <div className="wt-panel l kilim" />
        <div className="wt-panel r kilim" />
        <div className="wt-nazar" aria-hidden>
          <svg viewBox="-22 -22 44 44">
            <circle r="21" fill="#1d4aa6" />
            <circle r="13.5" fill="#f7f7f2" />
            <circle r="9" fill="#58b4ea" />
            <circle r="4.6" fill="#0d0d12" />
          </svg>
        </div>
      </>
    );
  if (to === "jazz")
    return (
      <>
        <div className="wt-panel l velvet" />
        <div className="wt-panel r velvet" />
        <div className="wt-valance" />
      </>
    );
  if (to === "riviera")
    return (
      <>
        <div className="wt-panel l shutter" />
        <div className="wt-panel r shutter" />
        <div className="wt-leaves">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ left: `${r(i, 1) * 100}%`, animationDelay: `${0.3 + r(i, 2) * 0.9}s`, background: r(i, 3) > 0.5 ? "#5e7a2e" : "#f2c94c", borderRadius: r(i, 3) > 0.5 ? "0 70% 0 70%" : "50%" }} />
          ))}
        </div>
      </>
    );
  return null;
}

const CURTAIN = new Set<WorldId>(["anatolia", "jazz", "riviera"]);

export function WorldTransition() {
  const { transit, pick } = usePrefs();
  if (!transit) return null;
  const { to, phase } = transit;
  const w = worldById(to);
  return (
    <div className={`wt wt-${to} wc-${to} ${phase} ${CURTAIN.has(to) ? "curtain" : "veiled"}`} aria-live="polite" role="status">
      {!CURTAIN.has(to) && <div className="wt-veil" style={{ background: w.swatch[0] }} />}
      <Panels to={to} />
      <Particles to={to} />
      <div className="wt-title">
        <span className="wc-name">{pick(w.name)}</span>
        <small>{pick(w.tagline)}</small>
      </div>
    </div>
  );
}
