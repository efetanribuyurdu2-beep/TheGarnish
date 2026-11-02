"use client";

import { useId } from "react";
import type { Glass, Ice, Method } from "@/lib/types";

interface Shape {
  outline: string;
  liquid: string;
  stem?: string;
  top: number; // liquid surface y
  bottom: number;
  rim?: [number, number, number]; // cx, y, rx
}

const SHAPES: Record<Glass, Shape> = {
  coupe: { outline: "M18 42 L102 42 Q100 92 60 94 Q20 92 18 42", liquid: "M22 50 L98 50 Q96 88 60 90 Q24 88 22 50 Z", stem: "M60 94 L60 140 M38 143 L82 143", top: 50, bottom: 90, rim: [60, 42, 42] },
  martini: { outline: "M14 34 L106 34 L60 92 Z", liquid: "M24 44 L96 44 L60 87 Z", stem: "M60 92 L60 140 M38 143 L82 143", top: 44, bottom: 87, rim: [60, 34, 46] },
  nicknora: { outline: "M30 26 C28 74 44 92 60 92 C76 92 92 74 90 26", liquid: "M32 44 L88 44 C88 76 74 88 60 88 C46 88 32 76 32 44 Z", stem: "M60 92 L60 140 M40 143 L80 143", top: 44, bottom: 88, rim: [60, 26, 30] },
  rocks: { outline: "M24 66 L96 66 L93 144 L27 144 Z", liquid: "M27 84 L93 84 L91 136 L29 136 Z", top: 84, bottom: 136, rim: [60, 66, 36] },
  highball: { outline: "M34 14 L86 14 L84 146 L36 146 Z", liquid: "M36 34 L84 34 L83 140 L37 140 Z", top: 34, bottom: 140, rim: [60, 14, 26] },
  flute: { outline: "M44 10 C42 56 46 84 60 88 C74 84 78 56 76 10", liquid: "M45 26 L75 26 C76 58 72 80 60 84 C48 80 44 58 45 26 Z", stem: "M60 88 L60 140 M42 143 L78 143", top: 26, bottom: 84, rim: [60, 10, 16] },
  wine: { outline: "M28 24 C26 76 44 98 60 98 C76 98 94 76 92 24", liquid: "M29 52 L91 52 C90 80 76 94 60 94 C44 94 30 80 29 52 Z", stem: "M60 98 L60 140 M38 143 L82 143", top: 52, bottom: 94, rim: [60, 24, 32] },
  mug: { outline: "M28 48 L92 48 L90 144 L30 144 Z M92 66 C110 66 110 116 91 116", liquid: "M30 54 L90 54 L89 142 L31 142 Z", top: 54, bottom: 142, rim: [60, 48, 32] },
  tiki: { outline: "M30 26 L90 26 L86 146 L34 146 Z", liquid: "M32 32 L88 32 L85 144 L35 144 Z", top: 32, bottom: 144, rim: [60, 26, 30] },
};

export function GarnishIcon({ kind, x, y }: { kind: string; x: number; y: number }) {
  const g = `translate(${x} ${y})`;
  if (kind === "olive" || kind === "evil-eye")
    return (
      <g transform={g}>
        <line x1="-14" y1="22" x2="14" y2="-22" stroke="currentColor" strokeWidth="1.5" />
        {kind === "olive" ? (
          <>
            <ellipse rx="7" ry="5.5" fill="#6b7a2a" stroke="currentColor" strokeWidth="1" transform="rotate(-50)" />
            <circle cx="3" cy="-3" r="2" fill="#b3202e" />
          </>
        ) : (
          <>
            <circle r="7" fill="#1f4fa8" />
            <circle r="4.6" fill="#fff" />
            <circle r="3.2" fill="#5fb3e6" />
            <circle r="1.6" fill="#111" />
          </>
        )}
      </g>
    );
  if (kind === "cherry" || kind === "pomegranate")
    return (
      <g transform={g}>
        <path d="M0 0 C2 -10 8 -16 14 -18" fill="none" stroke="#5b3a1a" strokeWidth="1.4" />
        <circle r="6" fill="#9b1b30" />
        <circle cx="-2" cy="-2" r="1.6" fill="#fff" opacity=".5" />
      </g>
    );
  if (kind.includes("wheel") || kind === "orange-slice")
    return (
      <g transform={g}>
        <circle r="10" fill={kind.startsWith("lime") ? "#a8c74a" : kind.startsWith("orange") ? "#f39b2b" : "#f1d84a"} stroke="#fff" strokeWidth="1.2" />
        {[0, 60, 120].map((a) => (
          <line key={a} x1="-9" x2="9" transform={`rotate(${a})`} stroke="#fff" strokeOpacity=".7" strokeWidth=".8" />
        ))}
      </g>
    );
  if (kind.includes("twist"))
    return (
      <path
        transform={g}
        d="M-4 6 C6 2 10 -8 2 -12 C-6 -16 -4 -4 4 -4 C12 -4 14 -16 8 -22"
        fill="none"
        stroke={kind.startsWith("orange") ? "#f39b2b" : kind.startsWith("grapefruit") ? "#f5806a" : "#f1d84a"}
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  if (kind === "mint" || kind === "shiso" || kind === "pineapple-leaf")
    return (
      <g transform={g} fill={kind === "shiso" ? "#7b3b6b" : "#4d8f3a"}>
        <path d="M0 0 C-10 -6 -10 -18 0 -22 C4 -14 4 -6 0 0Z" />
        <path d="M2 0 C12 -4 16 -14 10 -20 C4 -14 2 -8 2 0Z" />
      </g>
    );
  if (kind === "rose-petal" || kind === "cherry-blossom")
    return (
      <g transform={g} fill={kind === "rose-petal" ? "#e2728d" : "#f6b8c8"}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5" rx="3.4" ry="5" transform={`rotate(${a})`} />
        ))}
        <circle r="1.8" fill="#f3d36b" />
      </g>
    );
  if (kind === "coffee-beans")
    return (
      <g transform={g} fill="#3a1f0e">
        {[-7, 0, 7].map((dx) => (
          <ellipse key={dx} cx={dx} cy="0" rx="3" ry="4" />
        ))}
      </g>
    );
  return null;
}

export function GlassArt({
  glass,
  color,
  opaque,
  ice = "none",
  method,
  garnish,
  size = 120,
  animate = true,
}: {
  glass: Glass;
  color: string;
  opaque?: boolean;
  ice?: Ice;
  method?: Method;
  garnish?: string;
  size?: number;
  animate?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const s = SHAPES[glass];
  const foam = method === "dryshake";
  const fizz = glass === "highball" || glass === "flute" || glass === "wine";
  const tikiOrMug = glass === "tiki" || glass === "mug";
  const gx = s.rim ? s.rim[0] + s.rim[2] - 6 : 90;
  const gy = s.rim ? s.rim[1] - 2 : 20;

  return (
    <svg width={size} height={(size * 160) / 120} viewBox="0 0 120 160" className={animate ? "glass-art pour" : "glass-art"} aria-hidden>
      <defs>
        <clipPath id={`liq${uid}`}>
          <path d={s.liquid} />
        </clipPath>
        <linearGradient id={`shine${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".25" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".18" />
        </linearGradient>
      </defs>

      {!tikiOrMug && (
        <g clipPath={`url(#liq${uid})`}>
          <rect className="liquid" x="0" y="0" width="120" height="160" fill={color} opacity={opaque ? 0.95 : 0.78} />
          <rect x="0" y="0" width="120" height="160" fill={`url(#shine${uid})`} />
          {foam && <rect x="0" y={s.top} width="120" height="7" fill="#fbf7ec" opacity=".95" />}
          {ice === "sphere" && <circle cx="60" cy={s.bottom - 26} r="22" fill="#fff" opacity=".22" stroke="#fff" strokeOpacity=".5" />}
          {ice === "cube" &&
            [0, 1, 2].map((i) => (
              <rect key={i} x={36 + i * 16} y={s.top + 6 + (i % 2) * 18} width="18" height="18" rx="3" fill="#fff" opacity=".2" stroke="#fff" strokeOpacity=".45" transform={`rotate(${i * 12 - 10} ${45 + i * 16} ${s.top + 15})`} />
            ))}
          {ice === "collins" && <rect x="50" y={s.top + 4} width="20" height={s.bottom - s.top - 10} rx="3" fill="#fff" opacity=".2" stroke="#fff" strokeOpacity=".45" />}
          {ice === "crushed" &&
            Array.from({ length: 22 }).map((_, i) => (
              <circle key={i} cx={30 + ((i * 37) % 60)} cy={s.top + 6 + ((i * 53) % Math.max(10, s.bottom - s.top - 12))} r={2 + (i % 3)} fill="#fff" opacity=".28" />
            ))}
          {fizz &&
            Array.from({ length: 9 }).map((_, i) => (
              <circle key={i} className="bubble" style={{ animationDelay: `${i * 0.37}s` }} cx={44 + ((i * 13) % 32)} cy={s.bottom - 6} r="1.3" fill="#fff" opacity=".7" />
            ))}
        </g>
      )}

      {glass === "mug" && (
        <>
          <path d="M28 48 L92 48 L90 144 L30 144 Z" fill="#b8693a" />
          <path d="M28 48 L92 48 L90 144 L30 144 Z" fill={`url(#shine${uid})`} />
          <ellipse cx="60" cy="50" rx="31" ry="4" fill={color} />
        </>
      )}
      {glass === "tiki" && (
        <>
          <path d="M30 26 L90 26 L86 146 L34 146 Z" fill="#8a5a2b" />
          <path d="M30 26 L90 26 L86 146 L34 146 Z" fill={`url(#shine${uid})`} />
          <g stroke="#3a2210" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M42 62 L54 62 M66 62 L78 62" />
            <path d="M48 70 a4 4 0 1 0 0.1 0 M72 70 a4 4 0 1 0 0.1 0" />
            <path d="M60 74 L56 94 L64 94" />
            <path d="M44 110 Q60 124 76 110 M44 110 L76 110" />
            <path d="M36 40 L84 40 M36 134 L84 134" strokeWidth="2" />
          </g>
          <ellipse cx="60" cy="28" rx="30" ry="4" fill={color} />
        </>
      )}

      <path d={s.outline} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      {s.stem && <path d={s.stem} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
      {s.rim && <ellipse cx={s.rim[0]} cy={s.rim[1]} rx={s.rim[2]} ry="3" fill="none" stroke="currentColor" strokeWidth="1" opacity=".7" />}
      {garnish && <GarnishIcon kind={garnish} x={gx} y={gy} />}
    </svg>
  );
}
