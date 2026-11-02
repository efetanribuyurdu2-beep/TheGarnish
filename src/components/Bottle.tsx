"use client";

import { useId } from "react";
import { usePrefs } from "@/lib/prefs";
import type { BottleShape, Ingredient, WorldId } from "@/lib/types";

/**
 * A back-bar bottle. The silhouette follows the real product (gin, whisky decanter,
 * tequila, orb liqueur, champagne, syrup with pourer, bitters dropper...), while the
 * label, cap and finishing follow the world you are in.
 */
interface Geo {
  body: string;
  top: number; // liquid surface
  cap: "screw" | "cork" | "stopper" | "crown" | "foil" | "pourer" | "dropper" | "lid" | "none";
  capBox: [number, number, number, number];
  label: [number, number, number, number];
  oval?: boolean;
}

const GEO: Record<BottleShape, Geo> = {
  tall: { body: "M25 14 H35 V34 C35 40 48 42 48 50 V112 Q48 116 44 116 H16 Q12 116 12 112 V50 C12 42 25 40 25 34 Z", top: 48, cap: "screw", capBox: [24, 5, 12, 10], label: [15, 62, 30, 32] },
  square: { body: "M24 20 H36 V30 C36 34 50 34 50 40 V112 Q50 116 46 116 H14 Q10 116 10 112 V40 C10 34 24 34 24 30 Z", top: 40, cap: "cork", capBox: [23, 9, 14, 12], label: [14, 56, 32, 36] },
  decanter: { body: "M26 24 H34 V30 C34 34 52 36 52 46 V108 Q52 116 44 116 H16 Q8 116 8 108 V46 C8 36 26 34 26 30 Z", top: 46, cap: "stopper", capBox: [22, 6, 16, 18], label: [13, 64, 34, 28], oval: true },
  squat: { body: "M26 30 H34 V44 C34 50 52 52 52 62 V110 Q52 116 46 116 H14 Q8 116 8 110 V62 C8 52 26 50 26 44 Z", top: 60, cap: "screw", capBox: [25, 21, 10, 10], label: [13, 72, 34, 30] },
  tapered: { body: "M26 14 H34 V30 C34 36 46 38 46 46 L42 112 Q42 116 38 116 H22 Q18 116 18 112 L14 46 C14 38 26 36 26 30 Z", top: 44, cap: "stopper", capBox: [23, 2, 14, 13], label: [17, 58, 26, 30] },
  round: { body: "M26 34 H34 V48 C48 52 54 66 54 80 C54 102 44 116 30 116 C16 116 6 102 6 80 C6 66 12 52 26 48 Z", top: 56, cap: "crown", capBox: [24, 23, 12, 12], label: [13, 70, 34, 24], oval: true },
  wine: { body: "M26 6 H34 V44 C34 50 46 52 46 60 V112 Q46 116 42 116 H18 Q14 116 14 112 V60 C14 52 26 50 26 44 Z", top: 56, cap: "foil", capBox: [25.4, 4, 9.2, 22], label: [16, 72, 28, 28] },
  sparkling: { body: "M26 6 H34 V40 C34 48 48 50 48 60 V112 Q48 116 44 116 H16 Q12 116 12 112 V60 C12 50 26 48 26 40 Z", top: 56, cap: "foil", capBox: [24.6, 2, 10.8, 32], label: [15, 74, 30, 24], oval: true },
  syrup: { body: "M26 18 H34 V30 C34 34 44 36 44 42 V112 Q44 116 40 116 H20 Q16 116 16 112 V42 C16 36 26 34 26 30 Z", top: 40, cap: "pourer", capBox: [25, 6, 10, 13], label: [18, 54, 24, 42] },
  bitters: { body: "M23 50 H37 V56 C44 58 46 61 46 67 V112 Q46 116 42 116 H18 Q14 116 14 112 V67 C14 61 16 58 23 56 Z", top: 62, cap: "dropper", capBox: [22, 22, 16, 30], label: [11, 70, 38, 36] },
  carafe: { body: "M23 38 H37 C37 46 46 50 46 62 V112 Q46 116 42 116 H18 Q14 116 14 112 V62 C14 50 23 46 23 38 Z", top: 54, cap: "none", capBox: [22, 34, 16, 5], label: [18, 78, 24, 18] },
  soda: { body: "M26 26 H34 V36 C34 46 42 48 42 56 V112 Q42 116 38 116 H22 Q18 116 18 112 V56 C18 48 26 46 26 36 Z", top: 52, cap: "crown", capBox: [25, 20, 10, 7], label: [19, 72, 22, 24] },
  jar: { body: "M14 50 H46 V112 Q46 116 42 116 H18 Q14 116 14 112 Z", top: 56, cap: "lid", capBox: [12, 42, 36, 10], label: [16, 76, 28, 22] },
};

interface Style {
  cap: string;
  capHi: string;
  paper: string;
  ink: string;
  frame: string;
}
const STYLE: Record<WorldId, Style> = {
  maison: { cap: "#b8954a", capHi: "#f3e3b3", paper: "#f4ecd8", ink: "#1a1612", frame: "#b8954a" },
  anatolia: { cap: "#c79a2a", capHi: "#f3d98a", paper: "#f3e8d0", ink: "#1b2a5e", frame: "#7d1a16" },
  sakura: { cap: "#1d1418", capHi: "#6b4a55", paper: "#f6f0e2", ink: "#1d1418", frame: "#c8102e" },
  jazz: { cap: "#c9a24f", capHi: "#fff0c0", paper: "#0d0b08", ink: "#d9b25f", frame: "#d9b25f" },
  cosmos: { cap: "#7d6bd6", capHi: "#e6dcff", paper: "#1a1646", ink: "#e8ecff", frame: "#7fe6ff" },
  alchemist: { cap: "#a8814f", capHi: "#d8b98a", paper: "#e3d3a8", ink: "#3a2412", frame: "#7a5426" },
  tiki: { cap: "#6b4a1f", capHi: "#c9a25a", paper: "#e9d8b4", ink: "#3a2210", frame: "#3a2210" },
  boreal: { cap: "#8fa6bb", capHi: "#f2f8ff", paper: "#f3f6f8", ink: "#1f3f7a", frame: "#1f4fa8" },
  riviera: { cap: "#7a1a26", capHi: "#c4505c", paper: "#efe2c4", ink: "#3a2414", frame: "#a8823a" },
};

function short(name: string) {
  const w = name.replace(/\(.*?\)/g, "").trim().split(/\s+/);
  const s = w[0].length >= 4 || w.length === 1 ? w[0] : `${w[0]} ${w[1] ?? ""}`;
  return s.length > 11 ? s.slice(0, 10) + "." : s;
}

function Label({ g, world, name, sub, uid }: { g: Geo; world: WorldId; name: string; sub: string; uid: string }) {
  const st = STYLE[world];
  const [x, y, w, h] = g.label;
  const cx = x + w / 2;
  const fs = Math.min(6.4, (w - 5) / (name.length * 0.55));
  const shape = g.oval ? <ellipse cx={cx} cy={y + h / 2} rx={w / 2} ry={h / 2} /> : <rect x={x} y={y} width={w} height={h} rx={world === "tiki" ? 3 : 1} />;
  const fill = world === "cosmos" ? `url(#holo${uid})` : st.paper;
  return (
    <g>
      <g fill={fill}>{shape}</g>
      {/* world finishing */}
      {world === "maison" && (
        <g fill="none" stroke={st.frame}>
          {g.oval ? <ellipse cx={cx} cy={y + h / 2} rx={w / 2 - 1.6} ry={h / 2 - 1.6} strokeWidth=".6" /> : <rect x={x + 1.6} y={y + 1.6} width={w - 3.2} height={h - 3.2} strokeWidth=".6" />}
          <path d={`M${cx - 3} ${y + 5} L${cx} ${y + 2.6} L${cx + 3} ${y + 5} L${cx} ${y + 7.4}Z`} fill={st.frame} stroke="none" />
        </g>
      )}
      {world === "anatolia" && (
        <g>
          <rect x={x} y={y} width={w} height="3.4" fill="#7d1a16" />
          <rect x={x} y={y + h - 3.4} width={w} height="3.4" fill="#7d1a16" />
          <path d={Array.from({ length: Math.floor(w / 3) }, (_, i) => `M${x + i * 3} ${y + 3.4} l1.5 -2 l1.5 2`).join(" ")} stroke="#d9a521" strokeWidth=".5" fill="none" />
          <circle cx={x + w - 4} cy={y + h - 7} r="2.2" fill="#1d4aa6" />
          <circle cx={x + w - 4} cy={y + h - 7} r="1.3" fill="#fff" />
          <circle cx={x + w - 4} cy={y + h - 7} r=".6" fill="#111" />
        </g>
      )}
      {world === "sakura" && <rect x={x + w - 7} y={y + h - 8} width="5" height="5" rx=".8" fill={st.frame} />}
      {world === "jazz" && (
        <path d={`M${x + 1.5} ${y + 6} V${y + 1.5} H${x + 6} M${x + w - 6} ${y + 1.5} H${x + w - 1.5} V${y + 6} M${x + 1.5} ${y + h - 6} V${y + h - 1.5} H${x + 6} M${x + w - 6} ${y + h - 1.5} H${x + w - 1.5} V${y + h - 6}`} stroke={st.frame} strokeWidth=".6" fill="none" />
      )}
      {world === "alchemist" && <path d={`M${x} ${y + h} l2 -1 l2 1 l2 -1 l2 1 l2 -1 l2 1 l2 -1 l2 1 l2 -1 l2 1 l2 -1 l2 1`} stroke="#c8b88a" strokeWidth=".6" fill="none" />}
      {world === "tiki" && (
        <path d={Array.from({ length: Math.floor(w / 4) }, (_, i) => `M${x + i * 4} ${y} l2 2.6 l2 -2.6`).join(" ")} fill={st.ink} />
      )}
      {world === "boreal" && (
        <g>
          <path d={`M${x} ${y + 3} ${Array.from({ length: Math.ceil(w / 4) }, (_, i) => `q1 -2.4 2 0 q1 2.4 2 0`).join(" ")}`} stroke={st.frame} strokeWidth=".7" fill="none" />
          <path d={`M${x + w - 4.5} ${y + h - 7.5} v5 m-2.2 -3.8 l4.4 2.6 m0 -2.6 l-4.4 2.6`} stroke={st.frame} strokeWidth=".6" />
        </g>
      )}
      {world === "riviera" && (
        <g fill="none" stroke={st.frame}>
          <rect x={x + 1.4} y={y + 1.4} width={w - 2.8} height={h - 2.8} strokeWidth=".7" rx=".6" />
          <rect x={x + 2.6} y={y + 2.6} width={w - 5.2} height={h - 5.2} strokeWidth=".35" rx=".6" />
          <g fill="#5a2a5f" stroke="none">
            <circle cx={cx - 1} cy={y + 5.4} r=".9" /><circle cx={cx + 1} cy={y + 5.4} r=".9" /><circle cx={cx} cy={y + 7} r=".9" />
          </g>
        </g>
      )}
      <text
        x={cx}
        y={y + h / 2 + (world === "maison" ? 2.4 : 1.2)}
        textAnchor="middle"
        fontSize={fs}
        fill={st.ink}
        style={{ fontFamily: "var(--font-display)", fontStyle: world === "alchemist" ? "italic" : "normal", letterSpacing: world === "jazz" || world === "cosmos" ? ".08em" : 0 }}
      >
        {world === "jazz" || world === "cosmos" ? name.toLocaleUpperCase("en") : name}
      </text>
      {h > 22 && (
        <text x={cx} y={y + h / 2 + 7.6} textAnchor="middle" fontSize="3.2" fill={st.ink} opacity=".7" style={{ letterSpacing: ".12em" }}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Cap({ g, world, color, uid }: { g: Geo; world: WorldId; color?: string; uid: string }) {
  const st = STYLE[world];
  const [x, y, w, h] = g.capBox;
  const kind = (world === "alchemist" || world === "riviera") && ["screw", "crown", "stopper"].includes(g.cap) ? "cork" : g.cap;
  const c = color ?? st.cap;
  const metal = `url(#metal${uid})`;
  switch (kind) {
    case "screw":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx="1.4" fill={metal} />
          {Array.from({ length: 5 }, (_, i) => <line key={i} x1={x + 1.5 + i * ((w - 3) / 4)} y1={y + 1} x2={x + 1.5 + i * ((w - 3) / 4)} y2={y + h - 1} stroke="#000" strokeOpacity=".2" strokeWidth=".5" />)}
        </g>
      );
    case "cork":
      return (
        <g>
          <path d={`M${x + 1} ${y + 3} H${x + w - 1} L${x + w - 2} ${y + h} H${x + 2} Z`} fill="#b8915a" />
          <rect x={x - 1} y={y} width={w + 2} height="4" rx="1.5" fill={world === "alchemist" ? "#8a2a1f" : world === "riviera" ? st.cap : metal} />
          {world === "alchemist" && <path d={`M${x} ${y + 3} q2 6 4 1 q2 5 4 0`} fill="#8a2a1f" />}
          {world === "riviera" && <path d={`M${x - 1} ${y + 3} q1.5 7 3 1 q2 4 3.5 -0.5 q1.5 6 3 0.5 q1 3 ${w - 8.5} -1`} fill={st.cap} />}
        </g>
      );
    case "stopper":
      return (
        <g>
          <rect x={x + w / 2 - 3} y={y + h - 6} width="6" height="6" fill={metal} />
          <path d={`M${x} ${y + h - 6} Q${x + w / 2} ${y - 4} ${x + w} ${y + h - 6} Z`} fill={metal} />
          <path d={`M${x + 3} ${y + h - 8} Q${x + w / 2} ${y} ${x + w - 5} ${y + h - 9}`} stroke="#fff" strokeOpacity=".5" fill="none" strokeWidth=".7" />
        </g>
      );
    case "crown":
      return (
        <g>
          <rect x={x} y={y + 2} width={w} height={h - 2} rx="1" fill={metal} />
          <path d={Array.from({ length: 6 }, (_, i) => `M${x + (i * w) / 6} ${y + 2} l${w / 12} -2 l${w / 12} 2`).join(" ")} fill={metal} />
        </g>
      );
    case "foil":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx="1.6" fill={c} />
          <rect x={x} y={y} width={w} height={h} rx="1.6" fill={`url(#shine${uid})`} opacity=".8" />
          <rect x={x - 0.5} y={y + h - 4} width={w + 1} height="2" fill="#000" opacity=".2" />
        </g>
      );
    case "pourer":
      return (
        <g>
          <rect x={x} y={y + 6} width={w} height={h - 6} rx="1" fill="#1d1d1d" />
          <path d={`M${x + 3} ${y + 7} L${x + 4} ${y} L${x + 7} ${y - 1} L${x + 7} ${y + 7} Z`} fill={metal} />
        </g>
      );
    case "dropper":
      return (
        <g>
          <ellipse cx={x + w / 2} cy={y + 7} rx="4.6" ry="7" fill={world === "alchemist" ? "#3a2412" : "#1d1d1d"} />
          <rect x={x + 1} y={y + 13} width={w - 2} height={h - 13} rx="1.4" fill={metal} />
        </g>
      );
    case "lid":
      return <rect x={x} y={y} width={w} height={h} rx="2" fill={metal} />;
    default:
      return <path d={`M${x} ${y + 4} Q${x + w / 2} ${y} ${x + w} ${y + 4}`} stroke="#fff" strokeOpacity=".6" fill="none" />;
  }
}

export function Bottle({ ing, size = 54, world: forced }: { ing: Ingredient; size?: number; world?: WorldId }) {
  const { world: current, pick } = usePrefs();
  const world = forced ?? current ?? "maison";
  const uid = useId().replace(/:/g, "");
  const g = GEO[ing.shape ?? "tall"];
  const st = STYLE[world];
  const glassTint = ing.glass ?? "#ffffff";
  const liquidAlpha = ing.opaque ? 0.97 : Math.min(0.92, 0.35 + (ing.tint ?? 1) * 0.4);

  return (
    <svg width={size} height={(size * 120) / 60} viewBox="0 0 60 120" aria-hidden className="bottle-svg">
      <defs>
        <clipPath id={`b${uid}`}>
          <path d={g.body} />
        </clipPath>
        <linearGradient id={`glass${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".18" stopColor="#fff" stopOpacity=".08" />
          <stop offset=".7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </linearGradient>
        <linearGradient id={`liq${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ing.color} stopOpacity={liquidAlpha * 0.85} />
          <stop offset="1" stopColor={ing.color} stopOpacity={Math.min(1, liquidAlpha + 0.08)} />
        </linearGradient>
        <linearGradient id={`metal${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={st.cap} />
          <stop offset=".35" stopColor={st.capHi} />
          <stop offset=".6" stopColor={st.cap} />
          <stop offset="1" stopColor="#000" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id={`shine${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".3" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`holo${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b2a8a" />
          <stop offset=".4" stopColor="#7b5bd6" />
          <stop offset=".7" stopColor="#3aa8c8" />
          <stop offset="1" stopColor="#c85aa8" />
        </linearGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="30" cy="117" rx="20" ry="2.6" fill="#000" opacity=".45" />
      {/* glass + liquid */}
      <path d={g.body} fill={glassTint} fillOpacity={ing.glass ? 0.55 : 0.1} />
      <g clipPath={`url(#b${uid})`}>
        <rect x="0" y={g.top} width="60" height={120 - g.top} fill={`url(#liq${uid})`} />
        <ellipse cx="30" cy={g.top} rx="24" ry="1.4" fill="#fff" opacity=".25" />
        {world === "cosmos" && <rect x="0" y={g.top} width="60" height={120 - g.top} fill={ing.color} opacity=".25" style={{ filter: "blur(3px)" }} />}
        <rect x="0" y="0" width="60" height="120" fill={`url(#glass${uid})`} />
        <rect x={g.label[0] + 1} y={g.top - 30} width="2.6" height="80" rx="1.3" fill="#fff" opacity=".35" />
      </g>
      <path d={g.body} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth=".8" />
      {/* world extras on the neck */}
      {world === "boreal" && (
        <g clipPath={`url(#b${uid})`}>
          <rect x="0" y="0" width="60" height={g.top + 6} fill="#fff" opacity=".22" />
          <path d={`M8 ${g.top + 6} ${Array.from({ length: 13 }, (_, i) => `L${8 + i * 3.6} ${g.top + 6 + (i % 2 ? 3.4 : 0)}`).join(" ")}`} stroke="#fff" strokeOpacity=".55" strokeWidth=".6" fill="none" />
        </g>
      )}
      {world === "tiki" && g.cap !== "none" && (
        <path d={`M${g.capBox[0]} ${g.capBox[1] + g.capBox[3] + 2} l${g.capBox[2]} 2 m-${g.capBox[2]} 1.6 l${g.capBox[2]} 2 m-${g.capBox[2]} 1.6 l${g.capBox[2]} 2`} stroke="#8a6a2f" strokeWidth="1.2" />
      )}
      {(world === "maison" || world === "anatolia") && ["decanter", "tall", "square", "round"].includes(ing.shape ?? "") && (
        <circle cx={g.label[0] + g.label[2] - 2} cy={g.label[1] + g.label[3] + 4} r="3.2" fill={world === "maison" ? "#7a1a1a" : "#7d1a16"} stroke="#5a0f0f" strokeWidth=".4" />
      )}
      <Label g={g} world={world} name={short(pick(ing.name))} sub={ing.zero ? "0.0% VOL" : ing.abv > 0 ? `${Math.round(ing.abv * 100)}% VOL` : "GARNISH"} uid={uid} />
      <Cap g={g} world={world} color={ing.cap} uid={uid} />
    </svg>
  );
}
