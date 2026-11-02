"use client";

import { useId } from "react";
import { usePrefs } from "@/lib/prefs";
import type { WorldId } from "@/lib/types";

/**
 * The balance dial (tart ← balanced → sweet), crafted differently in every world:
 * Art Deco sunburst, çini plate, sensu fan, VU meter, radar HUD, astrolabe, rope-bound compass,
 * frosted compass (Boreal) and a limestone sundial (Riviera).
 */
const CX = 100;
const CY = 108;
const pol = (a: number, r: number) => [CX + r * Math.sin((a * Math.PI) / 180), CY - r * Math.cos((a * Math.PI) / 180)];
const arc = (a0: number, a1: number, r: number) => {
  const [x0, y0] = pol(a0, r);
  const [x1, y1] = pol(a1, r);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};
const sector = (a0: number, a1: number, r0: number, r1: number) => {
  const [a, b] = pol(a0, r1);
  const [c, d] = pol(a1, r1);
  const [e, f] = pol(a1, r0);
  const [g, h] = pol(a0, r0);
  const big = a1 - a0 > 180 ? 1 : 0;
  return `M${a} ${b} A${r1} ${r1} 0 ${big} 1 ${c} ${d} L${e} ${f} A${r0} ${r0} 0 ${big} 0 ${g} ${h} Z`;
};
const ticks = (n: number, r0: number, r1: number, span = 84) =>
  Array.from({ length: n }, (_, i) => -span + (i * 2 * span) / (n - 1)).map((a) => {
    const [x0, y0] = pol(a, r0);
    const [x1, y1] = pol(a, r1);
    return { a, d: `M${x0} ${y0} L${x1} ${y1}` };
  });

function Face({ world, uid }: { world: WorldId; uid: string }) {
  switch (world) {
    case "anatolia":
      return (
        <g>
          <path d={sector(-96, 96, 0, 96)} fill="#f2efe6" stroke="#d9a521" strokeWidth="2" />
          <path d={sector(-96, 96, 82, 94)} fill="#1d3f8f" />
          {ticks(17, 84, 92, 90).map((t, i) => (
            <circle key={i} cx={pol(t.a, 88)[0]} cy={pol(t.a, 88)[1]} r="2" fill={i % 2 ? "#2fb7b0" : "#c8323c"} />
          ))}
          <path d={sector(-84, -28, 52, 76)} fill="#2fb7b0" opacity=".35" />
          <path d={sector(-28, 28, 52, 76)} fill="#1d3f8f" opacity=".25" />
          <path d={sector(28, 84, 52, 76)} fill="#c8323c" opacity=".3" />
          {ticks(15, 52, 60).map((t) => <path key={t.a} d={t.d} stroke="#1d3f8f" strokeWidth="1.2" />)}
          {[-60, 0, 60].map((a) => {
            const [x, y] = pol(a, 40);
            return <path key={a} transform={`translate(${x} ${y}) rotate(${a}) scale(.7)`} d="M0 -10 C3 -6 7 -5 7 0 C7 4 3 6 0 6 C-3 6 -7 4 -7 0 C-7 -5 -3 -6 0 -10Z" fill="#c8323c" opacity=".55" />;
          })}
        </g>
      );
    case "sakura":
      return (
        <g>
          {Array.from({ length: 12 }, (_, i) => -90 + i * 15).map((a, i) => (
            <path key={a} d={sector(a, a + 15, 24, 96)} fill={i % 2 ? "#f6f0e2" : "#efe4cf"} stroke="#5b3d24" strokeWidth=".5" />
          ))}
          <path d={sector(-90, 90, 70, 96)} fill="#1f2b4a" opacity=".85" />
          {[-60, -20, 25, 65].map((a, i) => {
            const [x, y] = pol(a, 83);
            return (
              <g key={i} transform={`translate(${x} ${y})`} fill="#f2a7bb">
                {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="0" cy="-3" rx="2" ry="3" transform={`rotate(${r})`} />)}
              </g>
            );
          })}
          <path d={arc(-60, 60, 50)} stroke="#c8102e" strokeWidth="1.2" fill="none" strokeDasharray="1 4" />
          {Array.from({ length: 13 }, (_, i) => -90 + i * 15).map((a) => <path key={a} d={`M${pol(a, 24)[0]} ${pol(a, 24)[1]} L${pol(a, 18)[0]} ${pol(a, 18)[1]}`} stroke="#5b3d24" strokeWidth="2" />)}
        </g>
      );
    case "jazz":
      return (
        <g>
          <rect x="4" y="6" width="192" height="116" rx="8" fill={`url(#brass${uid})`} />
          <rect x="11" y="13" width="178" height="102" rx="4" fill="#f4e8c8" />
          <rect x="11" y="13" width="178" height="102" rx="4" fill={`url(#vu${uid})`} />
          <path d={arc(-60, 60, 78)} stroke="#1a1612" strokeWidth="1.4" fill="none" />
          <path d={arc(40, 60, 78)} stroke="#c8102e" strokeWidth="4" fill="none" />
          <path d={arc(-60, -40, 78)} stroke="#2a6b45" strokeWidth="4" fill="none" />
          {ticks(13, 78, 86, 60).map((t, i) => <path key={t.a} d={t.d} stroke={t.a > 38 ? "#c8102e" : "#1a1612"} strokeWidth={i % 3 === 0 ? 1.6 : 0.8} />)}
          <text x={CX} y="92" textAnchor="middle" fontSize="10" fill="#1a1612" style={{ fontFamily: "'Limelight', serif", letterSpacing: ".3em" }}>VU</text>
        </g>
      );
    case "cosmos":
      return (
        <g>
          <path d={sector(-90, 90, 0, 96)} fill="#0b0a2a" />
          {[30, 52, 74, 96].map((r) => <path key={r} d={arc(-90, 90, r)} stroke="#9b7bff" strokeOpacity=".35" fill="none" />)}
          {[-60, -30, 0, 30, 60].map((a) => <path key={a} d={`M${CX} ${CY} L${pol(a, 96)[0]} ${pol(a, 96)[1]}`} stroke="#9b7bff" strokeOpacity=".25" />)}
          <path d={sector(-84, 84, 86, 92)} fill={`url(#neon${uid})`} filter={`url(#glow${uid})`} />
          <path d={sector(-84, 84, 86, 92)} fill={`url(#neon${uid})`} />
          {ticks(29, 76, 82).map((t) => <path key={t.a} d={t.d} stroke="#7fe6ff" strokeOpacity=".8" />)}
          <g className="sweep">
            <path d={sector(-14, 0, 0, 96)} fill="#7fe6ff" opacity=".15" />
          </g>
          {[[-40, 60], [52, 40], [20, 70]].map(([a, r], i) => <circle key={i} cx={pol(a, r)[0]} cy={pol(a, r)[1]} r="1.8" fill="#ff7ac8" className="twinkle" />)}
        </g>
      );
    case "alchemist":
      return (
        <g>
          <path d={sector(-96, 96, 0, 98)} fill="#2a2116" />
          {[98, 88, 62].map((r) => <path key={r} d={arc(-96, 96, r)} stroke="#c39245" strokeWidth={r === 98 ? 2 : 1} fill="none" />)}
          {["☉", "☽", "☿", "♀", "♂", "♃", "♄"].map((g, i) => {
            const a = -78 + i * 26;
            const [x, y] = pol(a, 75);
            return <text key={g} x={x} y={y + 4} fontSize="11" textAnchor="middle" fill="#c39245">{g}</text>;
          })}
          {ticks(43, 88, 94, 90).map((t, i) => <path key={t.a} d={t.d} stroke="#c39245" strokeWidth={i % 6 === 0 ? 1.4 : 0.6} />)}
          <path d={`M${CX} ${CY - 60} L${CX + 52} ${CY} M${CX} ${CY - 60} L${CX - 52} ${CY}`} stroke="#c39245" strokeOpacity=".35" />
          <circle cx={CX} cy={CY} r="40" fill="none" stroke="#c39245" strokeOpacity=".4" strokeDasharray="2 3" />
        </g>
      );
    case "tiki":
      return (
        <g>
          <path d={sector(-96, 96, 0, 98)} fill="#e9d8b4" />
          <path d={arc(-96, 96, 94)} stroke="#c9a25a" strokeWidth="9" fill="none" />
          <path d={arc(-96, 96, 94)} stroke="#6b4a1f" strokeWidth="9" fill="none" strokeDasharray="3 4" opacity=".7" />
          {Array.from({ length: 8 }, (_, i) => -84 + i * 24).map((a) => <path key={a} d={sector(a, a + 12, 64, 84)} fill="#3a2210" />)}
          <path d={sector(-84, 84, 30, 60)} fill="#f0a04b" opacity=".25" />
          {ticks(15, 58, 64).map((t) => <path key={t.a} d={t.d} stroke="#3a2210" strokeWidth="1.2" />)}
        </g>
      );
    case "boreal": // frosted compass
      return (
        <g>
          <path d={sector(-96, 96, 0, 98)} fill="#0b1a2b" />
          <path d={arc(-96, 96, 96)} stroke="#b7d4ff" strokeWidth="2.4" fill="none" />
          <path d={arc(-96, 96, 90)} stroke="#b7d4ff" strokeOpacity=".5" strokeWidth=".8" fill="none" />
          <path d={sector(-84, 84, 66, 86)} fill={`url(#aur${uid})`} opacity=".35" />
          {ticks(29, 80, 88).map((t, i) => <path key={t.a} d={t.d} stroke="#dfeaf2" strokeWidth={i % 7 === 0 ? 1.8 : 0.6} />)}
          {/* compass rose */}
          {[-90, -45, 0, 45, 90].map((a) => {
            const [x, y] = pol(a, a % 90 === 0 ? 58 : 46);
            const [bx, by] = pol(a - 8, 18);
            const [cx2, cy2] = pol(a + 8, 18);
            return <path key={a} d={`M${CX} ${CY} L${bx} ${by} L${x} ${y} L${cx2} ${cy2} Z`} fill={a === 0 ? "#dfeaf2" : "#1f4fa8"} stroke="#b7d4ff" strokeWidth=".5" />;
          })}
          {[-60, 60].map((a) => {
            const [x, y] = pol(a, 70);
            return (
              <g key={a} transform={`translate(${x} ${y})`} stroke="#dfeaf2" strokeWidth=".9" strokeLinecap="round">
                {[0, 60, 120].map((r) => <path key={r} transform={`rotate(${r})`} d="M0 -5 V5" />)}
              </g>
            );
          })}
        </g>
      );
    case "riviera": // sundial in limestone
      return (
        <g>
          <path d={sector(-96, 96, 0, 98)} fill="#e8dcc4" />
          <path d={sector(-96, 96, 0, 98)} fill={`url(#stone${uid})`} />
          <path d={arc(-96, 96, 96)} stroke="#a8823a" strokeWidth="2" fill="none" />
          <path d={sector(-90, 90, 86, 92)} fill="#2a4f8a" opacity=".85" />
          {Array.from({ length: 16 }, (_, i) => -90 + i * 12 + 6).map((a) => {
            const [x, y] = pol(a, 89);
            return <circle key={a} cx={x} cy={y} r="1.3" fill="#e3b341" />;
          })}
          {["VI", "VIII", "X", "XII", "II", "IV", "VI"].map((n, i) => {
            const a = -84 + i * 28;
            const [x, y] = pol(a, 72);
            return <text key={i} x={x} y={y + 3} fontSize="9" textAnchor="middle" fill="#3a2414" style={{ fontFamily: "'Aboreto', serif" }} transform={`rotate(${a} ${x} ${y})`}>{n}</text>;
          })}
          {ticks(25, 56, 62).map((t) => <path key={t.a} d={t.d} stroke="#3a2414" strokeWidth=".8" />)}
          {/* vine across the base */}
          <path d={`M${CX - 50} ${CY - 4} C${CX - 30} ${CY - 20} ${CX - 12} ${CY - 2} ${CX} ${CY - 14} C${CX + 12} ${CY - 2} ${CX + 30} ${CY - 20} ${CX + 50} ${CY - 4}`} stroke="#7d8f3a" strokeWidth="1.2" fill="none" />
          {[-32, 32].map((dx) => (
            <g key={dx} fill="#5a2a5f">
              <circle cx={CX + dx - 2} cy={CY - 10} r="2" /><circle cx={CX + dx + 2} cy={CY - 10} r="2" /><circle cx={CX + dx} cy={CY - 7} r="2" />
            </g>
          ))}
        </g>
      );
    default: // maison
      return (
        <g>
          <path d={sector(-96, 96, 0, 98)} fill="#0e0d0c" />
          {Array.from({ length: 33 }, (_, i) => -96 + i * 6).map((a, i) => <path key={a} d={sector(a, a + 3, 20, 92)} fill="#c9a961" opacity={i % 2 ? 0.05 : 0.12} />)}
          <path d={arc(-96, 96, 98)} stroke="#c9a961" strokeWidth="1.6" fill="none" />
          <path d={arc(-96, 96, 92)} stroke="#c9a961" strokeWidth=".6" fill="none" />
          {ticks(29, 80, 88).map((t, i) => <path key={t.a} d={t.d} stroke="#c9a961" strokeWidth={i % 7 === 0 ? 1.8 : 0.7} />)}
          {[-84, -42, 0, 42, 84].map((a) => {
            const [x, y] = pol(a, 72);
            return <path key={a} d={`M${x} ${y - 3} L${x + 2.4} ${y} L${x} ${y + 3} L${x - 2.4} ${y}Z`} fill="#c9a961" />;
          })}
        </g>
      );
  }
}

function Needle({ world }: { world: WorldId }) {
  switch (world) {
    case "anatolia": // tulip-tipped pointer
      return (
        <g>
          <path d={`M${CX - 1.6} ${CY} L${CX} ${CY - 66} L${CX + 1.6} ${CY} Z`} fill="#1b2a5e" />
          <path transform={`translate(${CX} ${CY - 70}) scale(.55)`} d="M0 -14 C4 -8 9 -7 9 0 C9 5 4 8 0 8 C-4 8 -9 5 -9 0 C-9 -7 -4 -8 0 -14Z" fill="#c8323c" />
        </g>
      );
    case "sakura": // brush stroke
      return <path d={`M${CX - 2.5} ${CY} C${CX - 4} ${CY - 30} ${CX + 2} ${CY - 50} ${CX} ${CY - 74} C${CX + 1} ${CY - 50} ${CX + 4} ${CY - 30} ${CX + 2.5} ${CY} Z`} fill="#1d1418" />;
    case "jazz":
      return <path d={`M${CX - 0.8} ${CY} L${CX} ${CY - 84} L${CX + 0.8} ${CY} Z`} fill="#1a1612" />;
    case "cosmos":
      return (
        <g>
          <path d={`M${CX} ${CY} L${CX} ${CY - 90}`} stroke="#7fe6ff" strokeWidth="5" opacity=".3" />
          <path d={`M${CX} ${CY} L${CX} ${CY - 90}`} stroke="#fff" strokeWidth="1.4" />
          <circle cx={CX} cy={CY - 90} r="3" fill="#ff7ac8" />
        </g>
      );
    case "alchemist":
      return (
        <g fill="#c39245">
          <path d={`M${CX - 2} ${CY} L${CX} ${CY - 84} L${CX + 2} ${CY} Z`} />
          <circle cx={CX} cy={CY - 52} r="4" fill="none" stroke="#c39245" strokeWidth="1.4" />
          <path d={`M${CX} ${CY - 84} l-4 8 h8 Z`} />
        </g>
      );
    case "tiki":
      return (
        <g>
          <path d={`M${CX - 4} ${CY} L${CX} ${CY - 70} L${CX + 4} ${CY} Z`} fill="#6b4a1f" />
          <path d={`M${CX} ${CY - 70} l-5 10 h10 Z`} fill="#e2574c" />
        </g>
      );
    case "boreal": // compass needle: red north, ice south
      return (
        <g>
          <path d={`M${CX} ${CY - 84} L${CX + 5} ${CY} L${CX - 5} ${CY} Z`} fill="#c8323c" />
          <path d={`M${CX} ${CY - 84} L${CX} ${CY}`} stroke="#ff8a8a" strokeWidth=".6" />
          <path d={`M${CX} ${CY + 14} L${CX + 5} ${CY} L${CX - 5} ${CY} Z`} fill="#dfeaf2" />
        </g>
      );
    case "riviera": // bronze gnomon shadow
      return (
        <g>
          <path d={`M${CX} ${CY - 80} L${CX + 3} ${CY} L${CX - 3} ${CY} Z`} fill="#3a2414" opacity=".35" transform={`translate(3 0)`} />
          <path d={`M${CX} ${CY - 80} L${CX + 3} ${CY} L${CX - 3} ${CY} Z`} fill="#8a5a24" />
          <path d={`M${CX} ${CY - 80} L${CX} ${CY}`} stroke="#e3b341" strokeWidth=".7" />
        </g>
      );
    default:
      return (
        <g>
          <path d={`M${CX} ${CY - 84} L${CX + 4} ${CY - 20} L${CX} ${CY + 6} L${CX - 4} ${CY - 20} Z`} fill="#c9a961" />
          <path d={`M${CX} ${CY - 84} L${CX} ${CY + 6}`} stroke="#f3e3b3" strokeWidth=".6" />
        </g>
      );
  }
}

function Hub({ world }: { world: WorldId }) {
  switch (world) {
    case "anatolia":
      return (
        <g>
          <circle cx={CX} cy={CY} r="9" fill="#1d4aa6" />
          <circle cx={CX} cy={CY} r="6" fill="#f7f7f2" />
          <circle cx={CX} cy={CY} r="4" fill="#58b4ea" />
          <circle cx={CX} cy={CY} r="2" fill="#0d0d12" />
        </g>
      );
    case "sakura":
      return (
        <g>
          <rect x={CX - 9} y={CY - 9} width="18" height="18" rx="3" fill="#c8102e" />
          <rect x={CX - 6.5} y={CY - 6.5} width="13" height="13" rx="2" fill="none" stroke="#f7eef0" strokeWidth=".8" />
        </g>
      );
    case "jazz":
      return <rect x={CX - 14} y={CY - 4} width="28" height="8" rx="2" fill="#1a1612" />;
    case "cosmos":
      return (
        <g>
          <circle cx={CX} cy={CY} r="7" fill="#9b7bff" />
          <ellipse cx={CX} cy={CY} rx="13" ry="3.4" fill="none" stroke="#ff7ac8" transform={`rotate(-20 ${CX} ${CY})`} />
        </g>
      );
    case "alchemist":
      return (
        <g>
          <circle cx={CX} cy={CY} r="9" fill="#2a2116" stroke="#c39245" strokeWidth="1.6" />
          <circle cx={CX} cy={CY} r="2.4" fill="#c39245" />
        </g>
      );
    case "boreal":
      return (
        <g>
          <circle cx={CX} cy={CY} r="8" fill="#1f4fa8" stroke="#dfeaf2" strokeWidth="1.2" />
          <g stroke="#fff" strokeWidth="1" strokeLinecap="round">
            {[0, 60, 120].map((r) => <path key={r} transform={`rotate(${r} ${CX} ${CY})`} d={`M${CX} ${CY - 5} V${CY + 5}`} />)}
          </g>
        </g>
      );
    case "riviera":
      return (
        <g>
          <circle cx={CX} cy={CY} r="8" fill="#f2c94c" stroke="#a8823a" strokeWidth="1.2" />
          <path d={`M${CX + 3} ${CY - 6} C${CX + 8} ${CY - 12} ${CX + 13} ${CY - 9} ${CX + 13} ${CY - 9} C${CX + 10} ${CY - 5} ${CX + 6} ${CY - 5} ${CX + 3} ${CY - 6}Z`} fill="#5e7a2e" />
        </g>
      );
    case "tiki":
      return (
        <g fill="#e2574c">
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={CX} cy={CY - 5} rx="4" ry="5.4" transform={`rotate(${a} ${CX} ${CY})`} />)}
          <circle cx={CX} cy={CY} r="2.4" fill="#f3d36b" />
        </g>
      );
    default:
      return (
        <g>
          <circle cx={CX} cy={CY} r="9" fill="#0e0d0c" stroke="#c9a961" strokeWidth="1.4" />
          <path d={`M${CX} ${CY - 5} L${CX + 4} ${CY} L${CX} ${CY + 5} L${CX - 4} ${CY}Z`} fill="#c9a961" />
        </g>
      );
  }
}

export function BalanceGauge({ balance, active }: { balance: number; active: boolean }) {
  const { t, world: w } = usePrefs();
  const world = w ?? "maison";
  const uid = useId().replace(/:/g, "");
  const span = world === "jazz" ? 60 : 84;
  const angle = active ? Math.max(-1, Math.min(1, balance)) * span : world === "jazz" ? -span : 0;
  const verdict = !active ? "—" : Math.abs(balance) < 0.25 ? t("balanced") : balance < 0 ? t("tooSour") : t("tooSweet");
  const ink = world === "jazz" || world === "sakura" || world === "tiki" || world === "anatolia" || world === "riviera" ? "#1a1612" : "currentColor";

  return (
    <figure className={`gauge-wrap gg-${world}`}>
      <svg className="gauge" viewBox="0 0 200 128" role="img" aria-label={`${t("balance")}: ${verdict}`}>
        <defs>
          <linearGradient id={`brass${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f3e3b3" />
            <stop offset=".4" stopColor="#b8862a" />
            <stop offset=".7" stopColor="#e8c77a" />
            <stop offset="1" stopColor="#7a5a22" />
          </linearGradient>
          <radialGradient id={`vu${uid}`} cx=".5" cy="1" r="1">
            <stop offset="0" stopColor="#fff6d8" stopOpacity=".9" />
            <stop offset="1" stopColor="#e8d8a8" stopOpacity=".2" />
          </radialGradient>
          <linearGradient id={`neon${uid}`} x1="0" x2="1">
            <stop offset="0" stopColor="#7fe6ff" />
            <stop offset=".5" stopColor="#9b7bff" />
            <stop offset="1" stopColor="#ff7ac8" />
          </linearGradient>
          <linearGradient id={`aur${uid}`} x1="0" x2="1">
            <stop offset="0" stopColor="#7fe3c4" />
            <stop offset=".5" stopColor="#5fb8e8" />
            <stop offset="1" stopColor="#b48fd6" />
          </linearGradient>
          <radialGradient id={`stone${uid}`} cx=".3" cy=".2" r="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".25" />
            <stop offset="1" stopColor="#8a7350" stopOpacity=".25" />
          </radialGradient>
          <filter id={`glow${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <Face world={world} uid={uid} />
        <g className="needle" style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${CX}px ${CY}px` }}>
          <Needle world={world} />
        </g>
        <Hub world={world} />
      </svg>
      <figcaption>
        <span>{t("tooSour")}</span>
        <b style={{ color: ink === "currentColor" ? undefined : undefined }}>{verdict}</b>
        <span>{t("tooSweet")}</span>
      </figcaption>
    </figure>
  );
}
