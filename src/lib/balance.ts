import { ingredientById } from "@/data/ingredients";
import type { Flavor, Method, Part, Profile } from "./types";

export interface Analysis {
  volume: number; // ml before dilution
  finalVolume: number; // ml after dilution
  dilution: number; // fraction of water added
  abv: number; // final, fraction
  sugar: number; // g/100ml final
  acid: number; // % final
  balance: number; // -1 (too sour) .. 0 (balanced) .. +1 (too sweet)
  style: "sour" | "spirit" | "long" | "empty";
  kcal: number;
  color: string;
  opaque: boolean;
  profile: Profile;
  tip?: { kind: "add-acid" | "add-sugar" | "ok" | "strong" | "weak"; ml?: number };
}

// Dilution models from Dave Arnold's "Liquid Intelligence" (abv as fraction)
function dilutionFor(method: Method, abv: number): number {
  switch (method) {
    case "shake":
    case "dryshake":
      return Math.max(0.15, 1.567 * abv * abv + 1.742 * abv + 0.203);
    case "stir":
      return Math.max(0.1, -1.21 * abv * abv + 1.246 * abv + 0.145);
    case "blend":
      return 0.6;
    case "swizzle":
      return 0.35;
    default:
      return 0.2; // built over ice
  }
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (rgb: number[]) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

export function analyse(parts: Part[], method: Method): Analysis {
  let vol = 0, alc = 0, sugarG = 0, acidG = 0, extraKcal = 0, cw = 0, opaqueW = 0;
  const rgb = [0, 0, 0];
  const prof: Record<Flavor, number> = { sweet: 0, sour: 0, bitter: 0, strong: 0, fresh: 0, aromatic: 0 };
  let profW = 0;
  for (const p of parts) {
    const ing = ingredientById(p.id);
    if (!ing) continue;
    const ml = p.ml;
    vol += ml;
    alc += ml * ing.abv;
    sugarG += (ml * ing.sugar) / 100;
    acidG += (ml * ing.acid) / 100;
    extraKcal += ((ing.kcal ?? 0) * ml) / 100;
    const weight = ml * (ing.tint ?? 1);
    const c = hex(ing.color);
    rgb[0] += c[0] * weight; rgb[1] += c[1] * weight; rgb[2] += c[2] * weight;
    cw += weight;
    if (ing.opaque) opaqueW += ml;
    // flavour: weight small, intense ingredients (bitters) more than their volume
    const fw = Math.max(ml, ing.category === "bitters" ? 8 : ml === 0 ? 6 : 0) ** 0.7;
    (Object.keys(prof) as Flavor[]).forEach((k) => (prof[k] += ing.profile[k] * fw));
    profW += fw;
  }
  if (vol === 0) {
    return { volume: 0, finalVolume: 0, dilution: 0, abv: 0, sugar: 0, acid: 0, balance: 0, style: "empty", kcal: 0, color: "#ffffff", opaque: false, profile: prof };
  }
  const rawAbv = alc / vol;
  const hasTop = parts.some((p) => p.top);
  const dil = dilutionFor(method, rawAbv) * (hasTop ? 0.5 : 1);
  const finalVol = vol * (1 + dil);
  const sugar = (sugarG / finalVol) * 100;
  const acid = (acidG / finalVol) * 100;
  const abv = alc / finalVol;
  const kcal = alc * 0.789 * 7 + sugarG * 4 + extraKcal;
  const color = cw > 0 ? toHex(rgb.map((v) => v / cw)) : "#f4f1e8";
  (Object.keys(prof) as Flavor[]).forEach((k) => (prof[k] = Math.min(5, prof[k] / (profW || 1))));
  prof.strong = Math.min(5, abv * 20);

  let style: Analysis["style"] = "sour";
  if (acid < 0.25) style = abv > 0.18 ? "spirit" : "long";

  let balance = 0;
  let tip: Analysis["tip"] = { kind: "ok" };
  if (style === "sour") {
    // classic sours sit around 10 g sugar per 1% acid
    const ratio = sugar / Math.max(acid, 0.01);
    balance = Math.max(-1, Math.min(1, Math.log(ratio / 10) / Math.log(2)));
    if (ratio > 14) tip = { kind: "add-acid", ml: Math.round(((sugarG / 10 - acidG) / 0.06) * 2) / 2 };
    else if (ratio < 7) tip = { kind: "add-sugar", ml: Math.round(((acidG * 10 - sugarG) / 0.615) * 2) / 2 };
  } else if (style === "spirit") {
    balance = Math.max(-1, Math.min(1, (sugar - 4) / 6));
    if (abv > 0.32) tip = { kind: "strong" };
  } else {
    balance = Math.max(-1, Math.min(1, (sugar - 6) / 8));
    if (abv < 0.04 && alc > 0) tip = { kind: "weak" };
  }
  if (tip.ml !== undefined && tip.ml <= 0) tip = { kind: "ok" };

  return {
    volume: vol,
    finalVolume: finalVol,
    dilution: dil,
    abv,
    sugar,
    acid,
    balance,
    style,
    kcal,
    color,
    opaque: opaqueW / vol > 0.25,
    profile: prof,
    tip,
  };
}
