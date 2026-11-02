"use client";

import { useId } from "react";
import { usePrefs } from "@/lib/prefs";
import type { Glass, Ice, Method, WorldId } from "@/lib/types";

/**
 * Realistic glassware. Each world has its own glass craft:
 *  maison – cut crystal with a gilded rim       anatolia – Paşabahçe crystal, gold rim, çini band
 *  sakura – Edo kiriko (coloured overlay, cut)  jazz – Art Deco etching with gold rim
 *  cosmos – iridescent glass, glowing drink     alchemist – laboratory glass with graduations
 *  tiki – heavy glass wrapped in bamboo
 */
interface Shape {
  bowl: string; // closed silhouette of the vessel
  liquid: string;
  stem?: string;
  foot?: [number, number, number]; // cx, cy, rx
  base?: [number, number, number, number]; // thick tumbler base x, y, w, h
  top: number;
  bottom: number;
  rim: [number, number, number];
  band: [number, number]; // y range for decoration
}

const SHAPES: Record<Glass, Shape> = {
  coupe: { bowl: "M18 42 C18 74 34 92 60 93 C86 92 102 74 102 42 Z", liquid: "M21 50 H99 C97 76 82 88 60 89 C38 88 23 76 21 50 Z", stem: "M58 93 C58 110 58.6 126 57 140 H63 C61.4 126 62 110 62 93 Z", foot: [60, 142, 23], top: 50, bottom: 89, rim: [60, 42, 42], band: [62, 70] },
  martini: { bowl: "M12 34 H108 L62 92 H58 Z", liquid: "M23 44 H97 L61 88 H59 Z", stem: "M58 92 V140 H62 V92 Z", foot: [60, 142, 23], top: 44, bottom: 88, rim: [60, 34, 48], band: [52, 58] },
  nicknora: { bowl: "M30 24 C28 72 42 92 60 92 C78 92 92 72 90 24 Z", liquid: "M32 42 H88 C88 74 76 88 60 88 C44 88 32 74 32 42 Z", stem: "M58 92 C58 112 58.6 128 57 140 H63 C61.4 128 62 112 62 92 Z", foot: [60, 142, 21], top: 42, bottom: 88, rim: [60, 24, 30], band: [56, 64] },
  rocks: { bowl: "M22 62 H98 L95 146 H25 Z", liquid: "M25 80 H95 L93.4 132 H26.6 Z", base: [25, 132, 70, 14], top: 80, bottom: 132, rim: [60, 62, 38], band: [66, 76] },
  highball: { bowl: "M33 10 H87 L85 148 H35 Z", liquid: "M35.4 30 H84.6 L83.4 136 H36.6 Z", base: [35, 136, 50, 12], top: 30, bottom: 136, rim: [60, 10, 27], band: [16, 26] },
  flute: { bowl: "M43 8 C41 54 45 84 60 88 C75 84 79 54 77 8 Z", liquid: "M44.4 24 H75.6 C76.4 56 72 80 60 84 C48 80 43.6 56 44.4 24 Z", stem: "M58.5 88 V140 H61.5 V88 Z", foot: [60, 142, 19], top: 24, bottom: 84, rim: [60, 8, 17], band: [12, 18] },
  wine: { bowl: "M26 22 C24 76 42 98 60 98 C78 98 96 76 94 22 Z", liquid: "M27.4 52 H92.6 C91 82 76 94 60 94 C44 94 29 82 27.4 52 Z", stem: "M58 98 V140 H62 V98 Z", foot: [60, 142, 23], top: 52, bottom: 94, rim: [60, 22, 34], band: [30, 38] },
  mug: { bowl: "M26 46 H94 L91 146 H29 Z", liquid: "M28 52 H92 L90 144 H30 Z", top: 52, bottom: 144, rim: [60, 46, 34], band: [60, 66] },
  tiki: { bowl: "M28 24 H92 L86 148 H34 Z", liquid: "M30 30 H90 L85 146 H35 Z", top: 30, bottom: 146, rim: [60, 24, 32], band: [36, 42] },
};

export function GarnishIcon({ kind, x, y }: { kind: string; x: number; y: number }) {
  const g = `translate(${x} ${y})`;
  if (kind === "olive" || kind === "evil-eye")
    return (
      <g transform={g}>
        <line x1="-14" y1="24" x2="14" y2="-22" stroke="#d9c7a0" strokeWidth="1.4" />
        <circle cx="14" cy="-22" r="1.8" fill="#c9a961" />
        {kind === "olive" ? (
          <>
            <ellipse rx="7.5" ry="5.8" fill="#7a8a32" transform="rotate(-50)" />
            <ellipse cx="-2" cy="-2" rx="3" ry="1.6" fill="#c8d27a" opacity=".6" transform="rotate(-50)" />
            <circle cx="3" cy="-3" r="2.2" fill="#c42a2a" />
          </>
        ) : (
          <>
            <circle r="7.2" fill="#1d4aa6" />
            <circle r="4.8" fill="#f7f7f2" />
            <circle r="3.2" fill="#58b4ea" />
            <circle r="1.6" fill="#0d0d12" />
            <ellipse cx="-2.6" cy="-3.4" rx="2" ry="1" fill="#fff" opacity=".6" transform="rotate(-35)" />
          </>
        )}
      </g>
    );
  if (kind === "cherry" || kind === "pomegranate")
    return (
      <g transform={g}>
        <path d="M0 -2 C2 -12 8 -17 15 -19" fill="none" stroke="#5b3a1a" strokeWidth="1.3" />
        <circle r="6.4" fill="#8e0f22" />
        <circle r="6.4" fill="url(#cherryShine)" />
        <ellipse cx="-2.2" cy="-2.4" rx="1.8" ry="1.2" fill="#fff" opacity=".7" />
      </g>
    );
  if (kind.includes("wheel") || kind === "orange-slice") {
    const c = kind.startsWith("lime") ? ["#7fae35", "#c9e27a"] : kind.startsWith("orange") ? ["#e8821c", "#f8c66a"] : ["#e8c62a", "#f8ec9a"];
    return (
      <g transform={g}>
        <circle r="10.5" fill={c[0]} />
        <circle r="9" fill="#fdf8e6" />
        <circle r="8.2" fill={c[1]} />
        {[0, 45, 90, 135].map((a) => (
          <line key={a} x1="-8" x2="8" transform={`rotate(${a})`} stroke="#fdf8e6" strokeWidth=".9" />
        ))}
        <circle r="1.4" fill="#fdf8e6" />
      </g>
    );
  }
  if (kind.includes("twist")) {
    const c = kind.startsWith("orange") ? "#e8821c" : kind.startsWith("grapefruit") ? "#f0705a" : "#e8c62a";
    return (
      <g transform={g} fill="none" strokeLinecap="round">
        <path d="M-4 8 C8 4 12 -8 2 -12 C-8 -16 -6 -2 4 -3 C14 -4 15 -16 8 -23" stroke={c} strokeWidth="3.6" />
        <path d="M-4 8 C8 4 12 -8 2 -12" stroke="#fff" strokeOpacity=".45" strokeWidth="1" />
      </g>
    );
  }
  if (kind === "mint" || kind === "shiso" || kind === "pineapple-leaf")
    return (
      <g transform={g}>
        {[
          [-30, "#3f7f2e"],
          [10, "#4d9a3a"],
          [40, "#3a7a2a"],
        ].map(([a, c], i) => (
          <g key={i} transform={`rotate(${a})`}>
            <path d="M0 0 C-6 -6 -6 -16 0 -22 C6 -16 6 -6 0 0Z" fill={kind === "shiso" ? "#7b2b5b" : (c as string)} />
            <path d="M0 -2 V-20" stroke="#fff" strokeOpacity=".35" strokeWidth=".6" />
          </g>
        ))}
      </g>
    );
  if (kind === "rose-petal" || kind === "cherry-blossom")
    return (
      <g transform={g} fill={kind === "rose-petal" ? "#d9506f" : "#f6b8c8"}>
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} transform={`rotate(${a})`} d="M0 0 C-4 -3 -5 -8 -2 -10 L0 -8.6 L2 -10 C5 -8 4 -3 0 0Z" />
        ))}
        <circle r="1.8" fill="#f3d36b" />
      </g>
    );
  if (kind === "coffee-beans")
    return (
      <g transform={g}>
        {[-7, 0, 7].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <ellipse rx="3.2" ry="4.2" fill="#3a1f0e" />
            <path d="M0 -3.6 C-1 -1 1 1 0 3.6" stroke="#1a0c04" strokeWidth=".8" fill="none" />
          </g>
        ))}
      </g>
    );
  if (kind === "star-anise")
    return (
      <g transform={g} fill="#6b3a1a">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-5" rx="2" ry="4.5" transform={`rotate(${i * 45})`} />
        ))}
      </g>
    );
  return null;
}

const RIM_GOLD: Partial<Record<WorldId, string>> = { maison: "#d9b25f", anatolia: "#d9a521", jazz: "#d9b25f" };

export function GlassArt({
  glass,
  color,
  opaque,
  ice = "none",
  method,
  garnish,
  size = 120,
  animate = true,
  world: forced,
}: {
  glass: Glass;
  color: string;
  opaque?: boolean;
  ice?: Ice;
  method?: Method;
  garnish?: string;
  size?: number;
  animate?: boolean;
  world?: WorldId;
}) {
  const { world: current } = usePrefs();
  const world = forced ?? current ?? "maison";
  const uid = useId().replace(/:/g, "");
  const s = SHAPES[glass];
  const foam = method === "dryshake";
  const fizz = glass === "highball" || glass === "flute" || glass === "wine";
  const empty = color === "transparent";
  const tikiMug = glass === "tiki";
  const copper = glass === "mug";
  const gx = s.rim[0] + s.rim[2] - 6;
  const gy = s.rim[1] - 2;
  const tumbler = glass === "rocks" || glass === "highball";
  const rimGold = RIM_GOLD[world];

  return (
    <svg width={size} height={(size * 160) / 120} viewBox="0 0 120 160" className={`glass-art gw-${world} ${animate ? "pour" : ""}`} aria-hidden>
      <defs>
        <clipPath id={`bowl${uid}`}>
          <path d={s.bowl} />
        </clipPath>
        <clipPath id={`liq${uid}`}>
          <path d={s.liquid} />
        </clipPath>
        <linearGradient id={`lq${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={opaque ? 0.92 : 0.62} />
          <stop offset="1" stopColor={color} stopOpacity={opaque ? 1 : 0.92} />
        </linearGradient>
        <linearGradient id={`gl${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".42" />
          <stop offset=".12" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".02" />
          <stop offset=".85" stopColor="#fff" stopOpacity=".08" />
          <stop offset="1" stopColor="#fff" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id={`iri${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe6ff" />
          <stop offset=".5" stopColor="#9b7bff" />
          <stop offset="1" stopColor="#ff7ac8" />
        </linearGradient>
        <radialGradient id={`ice${uid}`} cx=".3" cy=".25" r=".9">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset=".5" stopColor="#e8f4ff" stopOpacity=".35" />
          <stop offset="1" stopColor="#bcd8ee" stopOpacity=".18" />
        </radialGradient>
        <radialGradient id="cherryShine" cx=".3" cy=".3" r=".8">
          <stop offset="0" stopColor="#ff6b7a" stopOpacity=".7" />
          <stop offset="1" stopColor="#5a0010" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`cu${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#7a3a1a" />
          <stop offset=".25" stopColor="#e8a06a" />
          <stop offset=".5" stopColor="#b8693a" />
          <stop offset="1" stopColor="#5a2a12" />
        </linearGradient>
        <pattern id={`kiriko${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 L5 0 L10 5 L5 10 Z" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth=".7" />
          <path d="M5 0 V10 M0 5 H10" stroke="#fff" strokeOpacity=".25" strokeWidth=".4" />
        </pattern>
        <filter id={`glow${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* cast shadow on the counter */}
      <ellipse cx="60" cy="152" rx={glass === "highball" || glass === "tiki" ? 34 : 30} ry="4" fill="#000" opacity=".35" />
      {!empty && !opaque && <ellipse cx="60" cy="152" rx="20" ry="2.6" fill={color} opacity=".25" />}

      {/* cosmos glow */}
      {world === "cosmos" && !empty && <path d={s.liquid} fill={color} opacity=".55" filter={`url(#glow${uid})`} />}

      {/* stem and foot */}
      {s.stem && (
        <g>
          <path d={s.stem} fill="#fff" fillOpacity=".18" stroke="#fff" strokeOpacity=".55" strokeWidth=".7" />
          <path d={s.stem} fill={`url(#gl${uid})`} />
        </g>
      )}
      {s.foot && (
        <g>
          <ellipse cx={s.foot[0]} cy={s.foot[1]} rx={s.foot[2]} ry="4.2" fill="#fff" fillOpacity=".16" stroke="#fff" strokeOpacity=".55" strokeWidth=".7" />
          <ellipse cx={s.foot[0] - 6} cy={s.foot[1] - 1} rx={s.foot[2] * 0.5} ry="1.2" fill="#fff" opacity=".35" />
        </g>
      )}

      {/* vessel */}
      {copper ? (
        <g>
          <path d={s.bowl} fill={`url(#cu${uid})`} />
          <path d="M94 66 C114 66 114 118 92 118" stroke={`url(#cu${uid})`} strokeWidth="6" fill="none" />
          <path d="M34 54 V140" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
          {!empty && <ellipse cx="60" cy="48" rx="32" ry="4" fill={color} />}
          <ellipse cx="60" cy="46" rx="34" ry="4.4" fill="none" stroke="#f3c79a" strokeWidth="1.4" />
        </g>
      ) : tikiMug ? (
        <g>
          <path d={s.bowl} fill="#8a5a2b" />
          <path d={s.bowl} fill={`url(#gl${uid})`} opacity=".7" />
          <g stroke="#3a2210" strokeWidth="2.6" fill="none" strokeLinecap="round">
            <path d="M40 62 L54 58 M66 58 L80 62" />
            <path d="M44 72 q4 -6 8 0 M68 72 q4 -6 8 0" />
            <path d="M60 76 L55 98 L65 98" />
            <path d="M42 112 Q60 128 78 112 Z" fill="#3a2210" />
            <path d="M48 112 v5 M54 113 v6 M60 113 v6 M66 113 v6 M72 112 v5" stroke="#f4ead2" strokeWidth="1.4" />
            <path d="M33 40 H87 M35 136 H85" strokeWidth="1.6" />
          </g>
          {!empty && <ellipse cx="60" cy="26" rx="30" ry="4" fill={color} />}
          <ellipse cx="60" cy="24" rx="32" ry="4.4" fill="none" stroke="#c9a25a" strokeWidth="1.2" />
        </g>
      ) : (
        <g>
          {/* glass body */}
          <path d={s.bowl} fill="#fff" fillOpacity={world === "alchemist" ? 0.1 : 0.07} />
          {/* liquid */}
          {!empty && (
            <g clipPath={`url(#liq${uid})`}>
              <rect className="liquid" x="0" y="0" width="120" height="160" fill={`url(#lq${uid})`} />
              {foam && <rect x="0" y={s.top - 1} width="120" height="8" fill="#fbf7ec" />}
              {foam && <rect x="0" y={s.top + 6} width="120" height="2" fill="#fff" opacity=".5" />}
              {fizz &&
                Array.from({ length: 12 }).map((_, i) => (
                  <circle key={i} className="bubble" style={{ animationDelay: `${i * 0.31}s` }} cx={s.rim[0] - 16 + ((i * 13) % 32)} cy={s.bottom - 4} r={0.8 + (i % 3) * 0.4} fill="#fff" opacity=".75" />
                ))}
            </g>
          )}
          {/* ice */}
          <g clipPath={`url(#bowl${uid})`}>
            {ice === "sphere" && (
              <g>
                <circle cx="60" cy={s.bottom - 24} r="23" fill={`url(#ice${uid})`} stroke="#fff" strokeOpacity=".6" strokeWidth=".8" />
                <ellipse cx="52" cy={s.bottom - 34} rx="7" ry="4" fill="#fff" opacity=".6" />
              </g>
            )}
            {ice === "cube" &&
              [
                [38, s.top + 2, -12],
                [58, s.top + 14, 8],
                [44, s.top + 26, 20],
              ].map(([x, y, r], i) => (
                <g key={i} transform={`rotate(${r} ${x + 10} ${y + 10})`}>
                  <rect x={x} y={y} width="21" height="21" rx="4" fill={`url(#ice${uid})`} stroke="#fff" strokeOpacity=".7" strokeWidth=".7" />
                  <path d={`M${x + 3} ${y + 4} h10`} stroke="#fff" strokeOpacity=".9" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              ))}
            {ice === "collins" && (
              <g>
                <rect x="48" y={s.top - 4} width="24" height={s.bottom - s.top - 2} rx="4" fill={`url(#ice${uid})`} stroke="#fff" strokeOpacity=".6" strokeWidth=".7" />
                <path d={`M52 ${s.top + 2} V${s.bottom - 10}`} stroke="#fff" strokeOpacity=".8" strokeWidth="1.4" strokeLinecap="round" />
              </g>
            )}
            {ice === "crushed" &&
              Array.from({ length: 30 }).map((_, i) => (
                <path key={i} d={`M${28 + ((i * 37) % 64)} ${s.top - 2 + ((i * 53) % Math.max(10, s.bottom - s.top - 6))} l${3 + (i % 3)} -2 l2 ${3 + (i % 2)} l-${4 + (i % 2)} 2 Z`} fill="#fff" opacity=".55" />
              ))}
          </g>
          {/* meniscus */}
          {!empty && <ellipse cx={s.rim[0]} cy={s.top} rx={(s.rim[2] * (s.top - s.rim[1] > 20 ? 0.86 : 0.96))} ry="2.2" fill={opaque ? "#fff" : color} opacity={opaque ? 0.25 : 0.55} />}

          {/* world craft */}
          {world === "sakura" && (
            <g clipPath={`url(#bowl${uid})`}>
              <rect x="0" y={tumbler ? s.top + (s.bottom - s.top) * 0.35 : s.band[0]} width="120" height="160" fill={glass === "highball" || glass === "flute" ? "#c8102e" : "#1f4fa8"} opacity=".55" />
              <rect x="0" y={tumbler ? s.top + (s.bottom - s.top) * 0.35 : s.band[0]} width="120" height="160" fill={`url(#kiriko${uid})`} />
            </g>
          )}
          {world === "anatolia" && (
            <g clipPath={`url(#bowl${uid})`}>
              <rect x="0" y={s.band[0]} width="120" height={s.band[1] - s.band[0]} fill="#2fb7b0" opacity=".75" />
              {Array.from({ length: 14 }).map((_, i) => (
                <g key={i} transform={`translate(${10 + i * 8} ${(s.band[0] + s.band[1]) / 2})`}>
                  <path d="M0 -2.6 L2.6 0 L0 2.6 L-2.6 0Z" fill="#1d3f8f" />
                  <circle r=".8" fill="#c8323c" />
                </g>
              ))}
              <rect x="0" y={s.band[0]} width="120" height=".8" fill="#d9a521" />
              <rect x="0" y={s.band[1] - 0.8} width="120" height=".8" fill="#d9a521" />
            </g>
          )}
          {world === "jazz" && (
            <g clipPath={`url(#bowl${uid})`} stroke="#fff" strokeOpacity=".45" fill="none" strokeWidth=".6">
              {Array.from({ length: 6 }).map((_, i) => (
                <path key={i} d={`M${s.rim[0] - 40 + i * 16} ${s.band[1] + 2} a8 8 0 0 1 16 0`} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <path key={`r${i}`} d={`M${s.rim[0] - 32 + i * 16} ${s.band[1] + 2} v-8`} />
              ))}
            </g>
          )}
          {world === "maison" && tumbler && (
            <g clipPath={`url(#bowl${uid})`} stroke="#fff" strokeOpacity=".35" strokeWidth=".7">
              {Array.from({ length: 12 }).map((_, i) => (
                <path key={i} d={`M${18 + i * 8} ${s.rim[1] + 8} L${14 + i * 8} ${s.bottom}`} />
              ))}
            </g>
          )}
          {world === "maison" && !tumbler && (
            <g clipPath={`url(#bowl${uid})`} stroke="#fff" strokeOpacity=".3" strokeWidth=".6" fill="none">
              {Array.from({ length: 9 }).map((_, i) => (
                <path key={i} d={`M${s.rim[0] - 32 + i * 8} ${s.bottom + 4} L${s.rim[0]} ${s.band[0]}`} />
              ))}
            </g>
          )}
          {world === "alchemist" && (
            <g stroke="#fff" strokeOpacity=".7" strokeWidth=".7" fontSize="4" fill="#fff" fillOpacity=".7">
              {Array.from({ length: 5 }).map((_, i) => {
                const y = s.bottom - 6 - i * ((s.bottom - s.top) / 5);
                const x = s.rim[0] + s.rim[2] * 0.42;
                return (
                  <g key={i}>
                    <line x1={x} y1={y} x2={x + (i % 2 ? 4 : 7)} y2={y} />
                    {i % 2 === 0 && <text x={x + 8.5} y={y + 1.4} stroke="none">{(i + 1) * 25}</text>}
                  </g>
                );
              })}
            </g>
          )}
          {world === "tiki" && (
            <g clipPath={`url(#bowl${uid})`}>
              <rect x="0" y={s.bottom - (s.bottom - s.top) * 0.42} width="120" height="160" fill="#c9a25a" />
              {Array.from({ length: 10 }).map((_, i) => (
                <rect key={i} x={i * 12} y={s.bottom - (s.bottom - s.top) * 0.42} width="10" height="160" rx="4" fill={i % 2 ? "#b8914c" : "#d9b56a"} />
              ))}
              <rect x="0" y={s.bottom - (s.bottom - s.top) * 0.42} width="120" height="2.4" fill="#6b4a1f" />
              <rect x="0" y={s.bottom - (s.bottom - s.top) * 0.22} width="120" height="2" fill="#6b4a1f" />
            </g>
          )}

          {/* glass shading, highlights and edges */}
          <path d={s.bowl} fill={`url(#gl${uid})`} />
          <path d={`M${s.rim[0] - s.rim[2] + 7} ${s.rim[1] + 8} Q${s.rim[0] - s.rim[2] + 9} ${(s.rim[1] + s.bottom) / 2} ${s.rim[0] - s.rim[2] + 14} ${s.bottom - 8}`} stroke="#fff" strokeOpacity=".7" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d={`M${s.rim[0] + s.rim[2] - 9} ${s.rim[1] + 12} V${s.rim[1] + 24}`} stroke="#fff" strokeOpacity=".45" strokeWidth="1.4" strokeLinecap="round" />
          <path d={s.bowl} fill="none" stroke={world === "cosmos" ? `url(#iri${uid})` : "#fff"} strokeOpacity={world === "cosmos" ? 0.95 : 0.6} strokeWidth={world === "cosmos" ? 1.4 : 1} />
          {s.base && (
            <g>
              <rect x={s.base[0]} y={s.base[1]} width={s.base[2]} height={s.base[3]} fill="#fff" fillOpacity=".22" />
              <path d={`M${s.base[0] + 4} ${s.base[1] + 3} H${s.base[0] + s.base[2] - 4}`} stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
            </g>
          )}
          {/* condensation */}
          {ice !== "none" &&
            Array.from({ length: 16 }).map((_, i) => (
              <circle key={i} cx={s.rim[0] - s.rim[2] * 0.7 + ((i * 29) % (s.rim[2] * 1.4))} cy={s.top + 6 + ((i * 41) % Math.max(8, s.bottom - s.top - 8))} r={0.6 + (i % 3) * 0.35} fill="#fff" opacity=".55" />
            ))}
        </g>
      )}

      {/* rim */}
      {!copper && !tikiMug && (
        <g>
          <ellipse cx={s.rim[0]} cy={s.rim[1]} rx={s.rim[2]} ry="3" fill="none" stroke={rimGold ?? (world === "cosmos" ? `url(#iri${uid})` : "#fff")} strokeOpacity={rimGold ? 1 : 0.75} strokeWidth={rimGold ? 1.6 : 1} />
          <path d={`M${s.rim[0] - s.rim[2] * 0.7} ${s.rim[1] - 1.6} Q${s.rim[0] - s.rim[2] * 0.3} ${s.rim[1] - 3} ${s.rim[0]} ${s.rim[1] - 3}`} stroke="#fff" strokeOpacity=".9" strokeWidth="1" fill="none" />
        </g>
      )}
      {garnish && garnish !== "none" && <GarnishIcon kind={garnish} x={gx} y={gy} />}
    </svg>
  );
}
