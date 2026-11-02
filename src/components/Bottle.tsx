import type { Ingredient } from "@/lib/types";

/** A back-bar bottle whose silhouette depends on the ingredient category. */
export function Bottle({ ing, size = 54 }: { ing: Ingredient; size?: number }) {
  const c = ing.color;
  const glass = "rgba(255,255,255,.18)";
  const stroke = "currentColor";
  let body: React.ReactNode;
  switch (ing.category) {
    case "spirit":
      body = (
        <>
          <rect x="25" y="2" width="10" height="6" rx="1" fill="#2a1b10" />
          <path d="M26 8 H34 V24 C44 28 46 34 46 42 V92 C46 95 44 96 41 96 H19 C16 96 14 95 14 92 V42 C14 34 16 28 26 24 Z" fill={glass} stroke={stroke} strokeWidth="1.2" />
          <path d="M15 46 H45 V92 C45 94 43 95 41 95 H19 C17 95 15 94 15 92 Z" fill={c} opacity=".85" />
          <rect x="17" y="56" width="26" height="22" fill="var(--bg)" stroke="var(--accent)" strokeWidth=".8" />
          <path d="M21 63 H39 M23 68 H37" stroke="var(--accent)" strokeWidth=".8" />
        </>
      );
      break;
    case "liqueur":
    case "wine":
      body = (
        <>
          <circle cx="30" cy="6" r="5" fill="var(--accent)" />
          <path d="M27 10 H33 V30 C46 36 50 48 50 62 C50 82 42 96 30 96 C18 96 10 82 10 62 C10 48 14 36 27 30 Z" fill={glass} stroke={stroke} strokeWidth="1.2" />
          <path d="M11 58 H49 C49 80 42 95 30 95 C18 95 11 80 11 58 Z" fill={c} opacity=".85" />
          <ellipse cx="30" cy="70" rx="12" ry="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth=".8" />
        </>
      );
      break;
    case "bitters":
      body = (
        <>
          <rect x="26" y="40" width="8" height="12" rx="2" fill="#2a1b10" />
          <path d="M22 52 H38 V58 C42 60 42 62 42 66 V92 C42 95 40 96 38 96 H22 C20 96 18 95 18 92 V66 C18 62 18 60 22 58 Z" fill={c} opacity=".9" stroke={stroke} strokeWidth="1.2" />
          <rect x="16" y="64" width="28" height="22" fill="#f1e8d2" />
          <path d="M20 70 H40 M22 75 H38 M22 80 H36" stroke="#5a1408" strokeWidth=".8" />
        </>
      );
      break;
    case "syrup":
      body = (
        <>
          <path d="M24 16 H36 V12 H24 Z" fill="#ddd" stroke={stroke} strokeWidth=".8" />
          <path d="M26 16 H34 V30 C42 34 44 40 44 48 V92 C44 95 42 96 39 96 H21 C18 96 16 95 16 92 V48 C16 40 18 34 26 30 Z" fill={glass} stroke={stroke} strokeWidth="1.2" />
          <path d="M17 54 H43 V92 C43 94 41 95 39 95 H21 C19 95 17 94 17 92 Z" fill={c} opacity=".85" />
          <path d="M22 18 C14 18 14 8 22 8" stroke={stroke} strokeWidth="1" fill="none" />
        </>
      );
      break;
    case "citrus":
      body = (
        <>
          <path d="M18 40 H40 C40 40 46 42 44 46 L40 48 V92 C40 95 38 96 35 96 H21 C18 96 16 95 16 92 V46 Z" fill={glass} stroke={stroke} strokeWidth="1.2" />
          <path d="M17 56 H39 V92 C39 94 37 95 35 95 H21 C19 95 17 94 17 92 Z" fill={c} opacity=".85" />
          <circle cx="44" cy="80" r="10" fill={c} stroke={stroke} strokeWidth="1" />
          <path d="M44 70 V90 M34 80 H54 M37 73 L51 87 M51 73 L37 87" stroke="#fff" strokeOpacity=".6" strokeWidth=".8" />
        </>
      );
      break;
    case "mixer":
      body = (
        <>
          <rect x="26" y="6" width="8" height="5" fill="var(--accent)" />
          <path d="M27 11 H33 V34 C38 36 38 38 38 42 V92 C38 95 36 96 34 96 H26 C24 96 22 95 22 92 V42 C22 38 22 36 27 34 Z" fill={glass} stroke={stroke} strokeWidth="1.2" />
          <path d="M23 46 H37 V92 C37 94 35 95 34 95 H26 C25 95 23 94 23 92 Z" fill={c} opacity=".8" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={27 + i * 3} cy={80 - i * 12} r="1" fill="#fff" opacity=".8" />
          ))}
        </>
      );
      break;
    default:
      body = (
        <>
          <rect x="14" y="44" width="32" height="8" rx="2" fill="var(--accent)" />
          <path d="M16 52 H44 V92 C44 95 42 96 39 96 H21 C18 96 16 95 16 92 Z" fill={glass} stroke={stroke} strokeWidth="1.2" />
          <path d="M17 62 H43 V92 C43 94 41 95 39 95 H21 C19 95 17 94 17 92 Z" fill={c} opacity=".85" />
        </>
      );
  }
  return (
    <svg width={size} height={(size * 100) / 60} viewBox="0 0 60 100" aria-hidden className="bottle-svg">
      {body}
      <path d="M18 50 V88" stroke="#fff" strokeOpacity=".22" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
