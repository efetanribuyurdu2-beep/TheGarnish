import type { WorldId } from "@/lib/types";
import { INK } from "./PassportStamp";

/** A wax seal: an irregular blob of wax in the world's ink, the week pressed into it. */
export function SecretSeal({ week, world, size = 96, uid, broken = false }: { week: string; world: WorldId; size?: number; uid: string; broken?: boolean }) {
  const ink = INK[world];
  const n = week.split("-W")[1] ?? "";
  const year = week.split("-W")[0] ?? "";
  // wax spreads unevenly: a ring of bulges around the disc
  const blob = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const r = 44 + ((i * 37) % 7) - 2;
    return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`;
  }).join(" ");
  const text = `GARNISH · ${year} · `;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`secret-seal ${broken ? "broken" : ""}`} aria-hidden>
      <defs>
        <radialGradient id={`wax${uid}`} cx=".38" cy=".32" r=".75">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" />
          <stop offset=".25" stopColor={ink} stopOpacity="1" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>
        <linearGradient id={`waxbase${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={ink} />
          <stop offset="1" stopColor={ink} stopOpacity=".75" />
        </linearGradient>
        <path id={`ring${uid}`} d="M50 50 m-27 0 a27 27 0 1 1 54 0 a27 27 0 1 1 -54 0" />
      </defs>
      <g className="seal-l">
        <polygon points={blob} fill={`url(#waxbase${uid})`} strokeLinejoin="round" stroke={ink} strokeWidth="6" />
        <circle cx="50" cy="50" r="36" fill={`url(#wax${uid})`} opacity=".9" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="#000" strokeOpacity=".35" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="33.8" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth=".6" />
        <text fontSize="6.4" letterSpacing="1.6" fill="#000" fillOpacity=".45" style={{ fontFamily: "var(--font-brand)", fontWeight: 600 }}>
          <textPath href={`#ring${uid}`}>{text + text}</textPath>
        </text>
        <text x="50" y="58" textAnchor="middle" fontSize="22" fill="#000" fillOpacity=".5" style={{ fontFamily: "var(--font-display)" }}>{n}</text>
        <text x="50.6" y="58.6" textAnchor="middle" fontSize="22" fill="#fff" fillOpacity=".25" style={{ fontFamily: "var(--font-display)" }}>{n}</text>
        <ellipse cx="38" cy="32" rx="9" ry="4" fill="#fff" opacity=".22" transform="rotate(-30 38 32)" />
      </g>
      {broken && <path d="M50 4 L46 30 L54 46 L45 62 L52 78 L48 96" stroke="#000" strokeOpacity=".55" strokeWidth="1.6" fill="none" />}
    </svg>
  );
}
