/**
 * Party planner maths: how many drinks, how to batch each one, what to buy.
 *
 *  - Drinks: the bartender's rule, two in the first hour and one an hour after that.
 *  - Batching by method (as bars do it):
 *      stir    everything in one bottle with the melt water added now (pre-dilution),
 *              kept in the freezer and poured straight into the glass
 *      shake   spirits, liqueurs and syrups ahead; citrus squeezed the same day and added
 *              within a few hours; egg white / cream go in each shaker; shaken to order
 *      build   the base batched and kept cold; topped with the bubbles in the glass
 *      blend   the base batched; blended with ice a few rounds at a time
 *      swizzle the whole batch poured over crushed ice
 *  - Shopping: totals with a 10% margin, in bottles, fruit and packs.
 */
import { GARNISHES } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import { analyse } from "./balance";
import type { Cocktail, Ice, Ingredient, L, Method } from "./types";
import { pour } from "./zero";

export interface PartyPlan {
  guests: number;
  hours: number;
  drinks: { id: string; n?: number }[]; // n: servings chosen by hand
}
export const DEFAULT_PARTY: PartyPlan = { guests: 8, hours: 3, drinks: [] };
export const MAX_DRINKS = 6;

export const drinksFor = (guests: number, hours: number) => guests * (2 + Math.max(0, hours - 1));

/** Splits the total evenly over drinks without a hand-set count. */
export function servingsFor(plan: PartyPlan): number[] {
  const total = drinksFor(plan.guests, plan.hours);
  const fixed = plan.drinks.reduce((s, d) => s + (d.n ?? 0), 0);
  const free = plan.drinks.filter((d) => d.n === undefined).length;
  const each = free ? Math.max(1, Math.round(Math.max(0, total - fixed) / free)) : 0;
  return plan.drinks.map((d) => d.n ?? each);
}

const PER_SERVE = new Set(["egg-white", "aquafaba", "cream", "coconut-milk", "mint", "basil", "espresso"]);
const SPARKLING = new Set(["soda", "tonic", "champagne", "prosecco", "ginger-beer", "ginger-ale", "zero-sparkling"]);

export type Role = "batch" | "fresh" | "serve" | "top";
export interface BatchLine {
  ing: Ingredient;
  perGlass: number; // ml (0 = "a handful")
  total: number; // ml for all servings
  role: Role;
}
export interface Batch {
  c: Cocktail; // the version poured (zero-proof when asked)
  servings: number;
  method: Method;
  lines: BatchLine[];
  water: number; // ml of pre-dilution water (stirred drinks)
  bottle: number; // ml in the batch bottle(s): batch + fresh + water
  pourMl: number; // ml of batch per glass
  bottles: number; // 1 l bottles to hold it
}

function roleOf(id: string, ing: Ingredient, top: boolean | undefined, method: Method): Role {
  if (top || (SPARKLING.has(id) && method !== "shake")) return "top";
  if (PER_SERVE.has(id)) return "serve";
  if (ing.category === "citrus") return "fresh";
  return "batch";
}

export function batchFor(original: Cocktail, servings: number, zero: boolean): Batch {
  const { c } = pour(original, zero);
  const lines: BatchLine[] = c.parts.flatMap((p) => {
    const ing = ingredientById(p.id);
    if (!ing) return [];
    return [{ ing, perGlass: p.ml, total: p.ml * servings, role: roleOf(p.id, ing, p.top, c.method) }];
  });
  const inBottle = lines.filter((l) => l.role === "batch" || l.role === "fresh").reduce((s, l) => s + l.perGlass, 0);
  // stirred drinks get their melt water now, so the bottle pours a finished drink
  const water = c.method === "stir" ? Math.round(analyse(c.parts, c.method).dilution * inBottle) : 0;
  const pourMl = inBottle + water;
  const bottle = pourMl * servings;
  return { c, servings, method: c.method, lines, water: water * servings, bottle, pourMl, bottles: Math.max(1, Math.ceil(bottle / 1000)) };
}

// ── shopping
const FRUIT: Record<string, { ml: number; name: L }> = {
  lemon: { ml: 35, name: { tr: "limon", en: "lemons" } },
  lime: { ml: 25, name: { tr: "misket limonu", en: "limes" } },
  yuzu: { ml: 20, name: { tr: "yuzu", en: "yuzu" } },
  grapefruit: { ml: 150, name: { tr: "greyfurt", en: "grapefruits" } },
  orange: { ml: 80, name: { tr: "portakal", en: "oranges" } },
};

export interface ShopLine {
  ing: Ingredient;
  ml: number; // with the margin
  amount: L; // how to buy it
}

const MARGIN = 1.1;

function buyAs(ing: Ingredient, ml: number, handfuls: number): L {
  const n = (x: number) => Math.max(1, Math.ceil(x));
  const fruit = FRUIT[ing.id];
  if (fruit) return { tr: `${n(ml / fruit.ml)} ${fruit.name.tr} (≈ ${Math.round(ml)} ml su)`, en: `${n(ml / fruit.ml)} ${fruit.name.en} (≈ ${Math.round(ml)} ml juice)` };
  if (ing.id === "egg-white") return { tr: `${n(ml / 30)} yumurta`, en: `${n(ml / 30)} eggs` };
  if (ing.id === "aquafaba") return { tr: `${n(ml / 120)} kutu nohut (suyu)`, en: `${n(ml / 120)} tins of chickpeas (the water)` };
  if (ml === 0) return { tr: `${n(handfuls / 8)} demet`, en: `${n(handfuls / 8)} bunch${handfuls > 8 ? "es" : ""}` };
  if (ing.id === "espresso") return { tr: `${n(ml / 30)} shot espresso`, en: `${n(ml / 30)} espresso shots` };
  if (ing.id === "cream" || ing.id === "coconut-milk") return { tr: `${n(ml / 200)} × 200 ml`, en: `${n(ml / 200)} × 200 ml` };
  if (ing.category === "bitters") return { tr: `1 şişe (${Math.round(ml)} ml yeter)`, en: `1 bottle (${Math.round(ml)} ml is plenty)` };
  if (ing.category === "mixer" || ing.category === "citrus") {
    const l = n(ml / 1000);
    return { tr: `${l} × 1 l`, en: `${l} × 1 l` };
  }
  const size = ing.category === "wine" ? 750 : 700;
  const b = n(ml / size);
  return { tr: `${b} şişe (${size / 10} cl) · ${Math.round(ml)} ml`, en: `${b} bottle${b > 1 ? "s" : ""} (${size / 10} cl) · ${Math.round(ml)} ml` };
}

export function shoppingList(batches: Batch[]): ShopLine[] {
  const acc = new Map<string, { ing: Ingredient; ml: number; handfuls: number }>();
  for (const b of batches)
    for (const l of b.lines) {
      const e = acc.get(l.ing.id) ?? { ing: l.ing, ml: 0, handfuls: 0 };
      e.ml += l.total * MARGIN;
      if (l.perGlass === 0) e.handfuls += b.servings;
      acc.set(l.ing.id, e);
    }
  const order = ["spirit", "liqueur", "wine", "bitters", "syrup", "citrus", "mixer", "other"];
  return [...acc.values()]
    .sort((a, b) => order.indexOf(a.ing.category) - order.indexOf(b.ing.category) || b.ml - a.ml)
    .map((e) => ({ ing: e.ing, ml: e.ml, amount: buyAs(e.ing, e.ml, e.handfuls) }));
}

// grams of ice in each glass, plus the ice that is shaken or blended and thrown away
const GLASS_ICE: Record<Ice, number> = { none: 0, cube: 120, sphere: 0, crushed: 200, collins: 150 };
const WORK_ICE: Partial<Record<Method, number>> = { shake: 150, dryshake: 150, blend: 120 };

export function iceFor(batches: Batch[], guests: number) {
  let grams = 0;
  let spheres = 0;
  for (const b of batches) {
    grams += (GLASS_ICE[b.c.ice] + (WORK_ICE[b.method] ?? 0)) * b.servings;
    if (b.c.ice === "sphere") spheres += b.servings;
  }
  grams += guests * 150; // the ice bucket for bottles and spares
  const kg = Math.ceil((grams * 1.2) / 1000);
  return { kg, bags: Math.ceil(kg / 2), spheres };
}

export function garnishesFor(batches: Batch[]): { name: L; count: number }[] {
  const acc = new Map<string, number>();
  for (const b of batches) if (b.c.garnish && b.c.garnish !== "none") acc.set(b.c.garnish, (acc.get(b.c.garnish) ?? 0) + b.servings);
  return [...acc].map(([k, count]) => ({ name: GARNISHES[k] ?? GARNISHES.none, count }));
}
