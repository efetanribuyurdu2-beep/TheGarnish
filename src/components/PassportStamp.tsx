"use client";

import { useId } from "react";
import { worldById } from "@/data/worlds";
import type { StampKind } from "@/lib/prefs";
import type { Lang, WorldId } from "@/lib/types";

/**
 * A rubber stamp for the cocktail passport: each world has its own ink, outline
 * and motif; the ink is broken up with noise so it reads as pressed by hand.
 */
export const INK: Record<WorldId, string> = {
  maison: "#9a7a2e",
  anatolia: "#1d3f8f",
  cosmos: "#5b3fc4",
  jazz: "#1f6f63",
  sakura: "#c8102e",
  alchemist: "#7a4a1a",
  tiki: "#b8432e",
  boreal: "#1f4fa8",
  riviera: "#6b1a2a",
};

type Outline = "circle" | "octagon" | "rect" | "square" | "hexagon" | "oval";
const OUTLINE: Record<WorldId, Outline> = {
  maison: "octagon",
  anatolia: "circle",
  cosmos: "circle",
  jazz: "rect",
  sakura: "square",
  alchemist: "circle",
  tiki: "circle",
  boreal: "hexagon",
  riviera: "oval",
};

const KIND: Record<StampKind, { tr: string; en: string }> = {
  arrival: { tr: "VARIŞ", en: "ARRIVAL" },
  tasting: { tr: "TADIM", en: "TASTING" },
  master: { tr: "USTA", en: "MASTER" },
};

function Motif({ world }: { world: WorldId }) {
  switch (world) {
    case "maison":
      return (
        <g>
          {[-60, -30, 0, 30, 60].map((a) => <path key={a} d="M0 4 L0 -18" transform={`rotate(${a})`} strokeWidth="1.4" />)}
          <path d="M0 -14 L8 2 L0 16 L-8 2Z" fill="currentColor" stroke="none" />
        </g>
      );
    case "anatolia":
      return (
        <g>
          <circle r="15" strokeWidth="2" />
          <circle r="9.5" strokeWidth="2" />
          <circle r="4.6" fill="currentColor" stroke="none" />
        </g>
      );
    case "cosmos":
      return (
        <g>
          <circle r="8" fill="currentColor" stroke="none" />
          <ellipse rx="17" ry="5" strokeWidth="1.8" transform="rotate(-20)" />
          <path d="M14 -14 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2Z" fill="currentColor" stroke="none" />
        </g>
      );
    case "jazz":
      return (
        <g>
          <circle r="15" strokeWidth="2" />
          <circle r="11" strokeWidth=".8" />
          <circle r="7.5" strokeWidth=".8" />
          <circle r="4" fill="currentColor" stroke="none" />
          <path d="M18 -18 L8 -4" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      );
    case "sakura":
      return (
        <g fill="currentColor" stroke="none">
          {[0, 72, 144, 216, 288].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M0 -2 C-7 -6 -8 -14 -3 -17 L0 -14 L3 -17 C8 -14 7 -6 0 -2Z" />
          ))}
        </g>
      );
    case "alchemist":
      return (
        <g strokeWidth="1.6">
          <circle r="16" />
          <rect x="-11" y="-11" width="22" height="22" />
          <path d="M0 -11 L10 7 H-10Z" />
          <circle r="4" />
        </g>
      );
    case "tiki":
      return (
        <g fill="currentColor" stroke="none">
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cy="-8" rx="6" ry="8.4" transform={`rotate(${a})`} />)}
          <circle r="3.4" fill="var(--paper, #f3ecdc)" />
        </g>
      );
    case "boreal":
      return (
        <g strokeWidth="2" strokeLinecap="round">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M0 0 V-17 M0 -9 l-5 -4 M0 -9 l5 -4 M0 -14 l-3 -2.6 M0 -14 l3 -2.6" />
          ))}
        </g>
      );
    case "riviera":
      return (
        <g>
          <path d="M2 -12 C6 -20 14 -20 16 -15 C11 -12 7 -11 2 -12Z" fill="currentColor" stroke="none" />
          <path d="M0 -10 V-16" strokeWidth="1.6" />
          {[[0, -6], [-5, -6], [5, -6], [-2.5, -1.5], [2.5, -1.5], [-7.5, -1.5], [7.5, -1.5], [0, 3], [-5, 3], [5, 3], [-2.5, 7.5], [2.5, 7.5], [0, 12]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" stroke="none" />
          ))}
        </g>
      );
  }
}

function hash(s: string) {
  let h = 7;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return h;
}

export function PassportStamp({ world, kind, date, lang, size = 120 }: { world: WorldId; kind: StampKind; date?: string; lang: Lang; size?: number }) {
  const uid = useId().replace(/:/g, "");
  const ink = INK[world];
  const outline = OUTLINE[world];
  const rot = (hash(world + kind) % 29) - 14;
  const name = worldById(world).name[lang].toLocaleUpperCase(lang === "tr" ? "tr" : "en");
  const label = KIND[kind][lang];
  const d = date ? new Date(date) : null;
  const when = d ? `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}` : "";
  const curved = outline === "circle";

  return (
    <svg className="pp-stamp" width={size} height={size} viewBox="0 0 120 120" style={{ color: ink, transform: `rotate(${rot}deg)` }} role="img" aria-label={`${name} · ${label}${when ? " · " + when : ""}`}>
      <defs>
        <filter id={`ink${uid}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed={hash(world + kind)} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.05" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
        <path id={`top${uid}`} d="M18 60 A42 42 0 0 1 102 60" />
        <path id={`bot${uid}`} d="M14 60 A46 46 0 0 0 106 60" />
      </defs>
      <g filter={`url(#ink${uid})`} fill="none" stroke="currentColor" opacity=".9">
        {outline === "circle" && (
          <g>
            <circle cx="60" cy="60" r="56" strokeWidth="3" />
            <circle cx="60" cy="60" r="50" strokeWidth="1" />
            <circle cx="60" cy="60" r="33" strokeWidth="1" />
          </g>
        )}
        {outline === "octagon" && (
          <g>
            <path d="M38 4 H82 L116 38 V82 L82 116 H38 L4 82 V38Z" strokeWidth="3" />
            <path d="M40 10 H80 L110 40 V80 L80 110 H40 L10 80 V40Z" strokeWidth="1" />
          </g>
        )}
        {outline === "rect" && (
          <g>
            <rect x="4" y="16" width="112" height="88" rx="6" strokeWidth="3" />
            <rect x="10" y="22" width="100" height="76" rx="3" strokeWidth="1" />
          </g>
        )}
        {outline === "square" && (
          <g>
            <rect x="8" y="8" width="104" height="104" rx="10" strokeWidth="4" />
            <rect x="15" y="15" width="90" height="90" rx="6" strokeWidth="1" />
          </g>
        )}
        {outline === "hexagon" && (
          <g>
            <path d="M60 3 L110 31.5 V88.5 L60 117 L10 88.5 V31.5Z" strokeWidth="3" />
            <path d="M60 10 L104 35 V85 L60 110 L16 85 V35Z" strokeWidth="1" />
          </g>
        )}
        {outline === "oval" && (
          <g>
            <ellipse cx="60" cy="60" rx="57" ry="44" strokeWidth="3" />
            <ellipse cx="60" cy="60" rx="51" ry="38" strokeWidth="1" />
          </g>
        )}
        <g transform={`translate(60 ${curved ? 58 : 54}) scale(${curved ? 0.8 : 0.9})`}>
          <Motif world={world} />
        </g>
        <g fill="currentColor" stroke="none" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600 }}>
          {curved ? (
            <>
              <text fontSize="10" letterSpacing="2.4" textAnchor="middle">
                <textPath href={`#top${uid}`} startOffset="50%">{name}</textPath>
              </text>
              <text fontSize="9.5" letterSpacing="3" textAnchor="middle">
                <textPath href={`#bot${uid}`} startOffset="50%">{label}</textPath>
              </text>
              <text x="60" y="88" fontSize="6.5" textAnchor="middle" letterSpacing="1">{when}</text>
            </>
          ) : (
            <>
              <text x="60" y={outline === "rect" ? 34 : outline === "oval" ? 31 : 28} fontSize="10" textAnchor="middle" letterSpacing="2.4">{name}</text>
              <text x="60" y={outline === "rect" ? 91 : outline === "oval" ? 96 : 100} fontSize="9.5" textAnchor="middle" letterSpacing="3">{label}</text>
              <text x="60" y={outline === "rect" ? 80 : outline === "oval" ? 84 : 84} fontSize="6.5" textAnchor="middle" letterSpacing="1">{when}</text>
            </>
          )}
        </g>
      </g>
    </svg>
  );
}
