/**
 * Haftanın Gizli Malzemesi: one ingredient a week, the same for every visitor.
 * It arrives sealed, with three clues; broken open it shows the ingredient and a
 * challenge: make a signature with it at the Atelier and earn that week's wax seal
 * (prefs.secrets, shown in the passport).
 */
import { COCKTAILS } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import type { Cocktail, Ingredient, IngredientCategory, L } from "./types";

// a year of characterful bottles (only ids that exist are used)
const POOL = [
  "mastic", "sumac", "yuzu", "chartreuse", "falernum", "cloudberry-liqueur", "orgeat", "pistachio-liqueur", "matcha", "maraschino",
  "sea-buckthorn", "violette", "salgam", "umeshu", "absinthe", "spruce-syrup", "fig-syrup", "elderflower", "rose", "aquavit",
  "kizilcik", "sakura", "fernet", "lingonberry-syrup", "chinotto", "mezcal", "turkish-coffee", "butterfly-pea", "birch-sap", "verjus",
  "lavender-syrup", "pastis", "hibiscus-syrup", "passion-syrup", "grappa", "cinnamon-syrup", "creme-de-cassis", "bison-grass-vodka",
  "limoncello", "sloe-gin", "calvados", "islay", "pisco", "shochu", "old-tom", "navy-gin", "overproof-rum", "armagnac", "honey",
  "pomegranate", "spiced-rum", "rosemary-syrup",
];

/** ISO week, e.g. "2026-W45" (weeks start on Monday). */
export function weekId(d = new Date()): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const year = t.getUTCFullYear();
  const week = Math.ceil(((t.getTime() - Date.UTC(year, 0, 1)) / 86_400_000 + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

/** Days until next Monday (1..7). */
export function daysLeft(d = new Date()): number {
  const day = d.getDay() || 7;
  return 8 - day;
}

const pool = () => POOL.map((id) => ingredientById(id)).filter((i): i is Ingredient => !!i);

export function secretFor(week: string): Ingredient {
  const [y, w] = week.split("-W").map(Number);
  const list = pool();
  // a fixed shuffle per year, so neighbouring weeks are never alike
  const order = list.map((_, i) => i).sort((a, b) => ((a * 7919 + y * 31) % 101) - ((b * 7919 + y * 31) % 101));
  return list[order[(w - 1) % list.length]];
}

const KIND: Record<IngredientCategory, L> = {
  spirit: { tr: "Damıtılmış bir içki", en: "A distilled spirit" },
  liqueur: { tr: "Bir likör", en: "A liqueur" },
  wine: { tr: "Üzümden ya da şaraptan gelen bir şişe", en: "A bottle from the grape or the vine" },
  citrus: { tr: "Bir meyve suyu", en: "A fruit juice" },
  syrup: { tr: "Bir şurup", en: "A syrup" },
  mixer: { tr: "Bir tamamlayıcı", en: "A mixer" },
  bitters: { tr: "Birkaç damlası yeten bir bitter", en: "A bitters, a few drops are enough" },
  other: { tr: "Şişede durmayan bir malzeme", en: "An ingredient that does not live in a bottle" },
};

/** Three clues, from the vaguest to the nearest. */
export function cluesFor(i: Ingredient): L[] {
  return [
    KIND[i.category],
    { tr: `Burnunda: ${i.notes.nose.tr}`, en: `On the nose: ${i.notes.nose.en}` },
    { tr: `Geldiği yer: ${i.origin.tr}`, en: `It comes from: ${i.origin.en}` },
  ];
}

export const cocktailsWith = (id: string): Cocktail[] => COCKTAILS.filter((c) => c.parts.some((p) => p.id === id));
