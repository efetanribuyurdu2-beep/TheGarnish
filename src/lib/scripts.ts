/**
 * Historic scripts as ornament. Headings in three worlds are echoed in an old
 * alphabet: Elder Futhark runes (Boreal), Old Turkic / Orkhon (Anatolia) and
 * Greek capitals (Riviera). Letter-by-letter, decorative, not a translation.
 */
import type { WorldId } from "./types";

const RUNES: Record<string, string> = {
  a: "ᚨ", b: "ᛒ", c: "ᚲ", ç: "ᚲ", d: "ᛞ", e: "ᛖ", f: "ᚠ", g: "ᚷ", ğ: "ᚷ", h: "ᚺ", ı: "ᛁ", i: "ᛁ", j: "ᛃ", k: "ᚲ", l: "ᛚ", m: "ᛗ",
  n: "ᚾ", o: "ᛟ", ö: "ᛟ", p: "ᛈ", q: "ᚲ", r: "ᚱ", s: "ᛋ", ş: "ᛋ", t: "ᛏ", u: "ᚢ", ü: "ᚢ", v: "ᚹ", w: "ᚹ", x: "ᚲᛋ", y: "ᛃ", z: "ᛉ",
};

// Orkhon letters (one variant per sound); the script runs right to left.
const cp = (n: number) => String.fromCodePoint(n);
const ORKHON: Record<string, string> = {
  a: cp(0x10c00), e: cp(0x10c00), ı: cp(0x10c03), i: cp(0x10c03), o: cp(0x10c06), u: cp(0x10c06), ö: cp(0x10c07), ü: cp(0x10c07),
  b: cp(0x10c09), v: cp(0x10c09), f: cp(0x10c09), w: cp(0x10c09), p: cp(0x10c2f), c: cp(0x10c32), ç: cp(0x10c32), d: cp(0x10c11),
  g: cp(0x10c0d), ğ: cp(0x10c0d), h: cp(0x10c34), q: cp(0x10c34), k: cp(0x10c1a), x: cp(0x10c1a), l: cp(0x10c1e), m: cp(0x10c22),
  n: cp(0x10c23), r: cp(0x10c3a), s: cp(0x10c3d), ş: cp(0x10c3f), t: cp(0x10c43), y: cp(0x10c16), j: cp(0x10c16), z: cp(0x10c14),
};

const GREEK: Record<string, string> = {
  a: "Α", b: "Β", c: "Κ", ç: "ΤΣ", d: "Δ", e: "Ε", f: "Φ", g: "Γ", ğ: "Γ", h: "Χ", ı: "Ι", i: "Ι", j: "Ζ", k: "Κ", l: "Λ", m: "Μ",
  n: "Ν", o: "Ο", ö: "Ο", p: "Π", q: "Κ", r: "Ρ", s: "Σ", ş: "Σ", t: "Τ", u: "Υ", ü: "Υ", v: "Β", w: "Ω", x: "Ξ", y: "Υ", z: "Ζ",
};

const SCRIPTS: Partial<Record<WorldId, { map: Record<string, string>; space: string; rtl?: boolean }>> = {
  boreal: { map: RUNES, space: " ᛫ " },
  anatolia: { map: ORKHON, space: " : ", rtl: true },
  riviera: { map: GREEK, space: " · " },
};

export const hasEcho = (world: WorldId) => world in SCRIPTS;

export function echo(world: WorldId, text: string): { text: string; rtl: boolean } | null {
  const s = SCRIPTS[world];
  if (!s) return null;
  const words = text
    .toLocaleLowerCase("tr")
    .replace(/[^a-zçğıöşü\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => [...w].map((ch) => s.map[ch] ?? "").join(""));
  return { text: words.join(s.space), rtl: !!s.rtl };
}
