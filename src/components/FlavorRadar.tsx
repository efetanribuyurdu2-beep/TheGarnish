"use client";

import { usePrefs } from "@/lib/prefs";
import type { Flavor, Profile } from "@/lib/types";

const AXES: Flavor[] = ["sweet", "sour", "bitter", "strong", "fresh", "aromatic"];

export function FlavorRadar({ profile, size = 220 }: { profile: Profile; size?: number }) {
  const { t } = usePrefs();
  const r = 70;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
    return [Math.cos(a) * r * v, Math.sin(a) * r * v];
  };
  const poly = AXES.map((k, i) => pt(i, Math.max(0.04, profile[k] / 5)).join(",")).join(" ");
  return (
    <svg width={size} height={size} viewBox="-110 -105 220 210" className="radar" role="img" aria-label="Flavour profile">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon key={s} points={AXES.map((_, i) => pt(i, s).join(",")).join(" ")} fill="none" stroke="currentColor" strokeOpacity=".18" />
      ))}
      {AXES.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="currentColor" strokeOpacity=".18" />;
      })}
      <polygon points={poly} fill="var(--accent)" fillOpacity=".28" stroke="var(--accent)" strokeWidth="1.6" className="radar-shape" />
      {AXES.map((k, i) => {
        const [x, y] = pt(i, 1.28);
        return (
          <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="currentColor" style={{ letterSpacing: ".08em" }}>
            {t(`f_${k}` as const)}
          </text>
        );
      })}
    </svg>
  );
}
