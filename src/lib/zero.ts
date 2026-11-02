/**
 * Alcohol-free mode. Every alcoholic ingredient has a zero-proof stand-in
 * (a 0.0–0.5% "spirit", a syrup, a juice or a blend of them), so any recipe,
 * classic or user-made, can be poured without alcohol.
 */
import { ingredientById } from "@/data/ingredients";
import type { Cocktail, Part } from "./types";

type Sub = [id: string, factor: number][]; // factor 0 = "a handful" (herbs)

const ONE = (id: string): Sub => [[id, 1]];

const MAP: Record<string, Sub> = {
  // gin & white spirits
  gin: ONE("zero-gin"), "pink-gin": [["zero-gin", 0.85], ["raspberry-syrup", 0.15]], "old-tom": ONE("zero-gin"), "navy-gin": ONE("zero-gin"),
  "japanese-gin": ONE("zero-gin"), vodka: ONE("zero-gin"), "bison-grass-vodka": ONE("zero-gin"), aquavit: ONE("zero-gin"), shochu: ONE("zero-gin"),
  // rum
  "white-rum": ONE("zero-rum"), "aged-rum": ONE("zero-rum"), "dark-rum": ONE("zero-rum"), "spiced-rum": ONE("zero-rum"), "overproof-rum": ONE("zero-rum"),
  "coconut-rum": [["zero-rum", 0.5], ["coconut-syrup", 0.5]],
  // whiskey
  bourbon: ONE("zero-whisky"), rye: ONE("zero-whisky"), scotch: ONE("zero-whisky"), "japanese-whisky": ONE("zero-whisky"), "irish-whiskey": ONE("zero-whisky"), islay: ONE("zero-whisky"),
  // agave
  tequila: ONE("zero-agave"), reposado: ONE("zero-agave"), mezcal: ONE("zero-agave"),
  // brandy
  cognac: ONE("zero-brandy"), armagnac: ONE("zero-brandy"), calvados: [["zero-brandy", 0.7], ["apple", 0.3]], pisco: ONE("zero-brandy"), grappa: ONE("zero-brandy"),
  // anise
  raki: ONE("zero-anise"), "mastika-raki": ONE("zero-anise"), absinthe: ONE("zero-anise"), pastis: ONE("zero-anise"), ouzo: ONE("zero-anise"),
  // aperitifs & amari
  campari: ONE("zero-aperitivo"), aperol: ONE("zero-aperitivo"), suze: ONE("zero-amaro"), fernet: ONE("zero-amaro"), cynar: ONE("zero-amaro"),
  montenegro: ONE("zero-amaro"), jagermeister: ONE("zero-amaro"), pimms: ONE("zero-rosso"),
  // liqueurs
  cointreau: ONE("zero-orange"), "blue-curacao": [["zero-orange", 0.8], ["butterfly-pea", 0.2]], maraschino: ONE("cherry"), "cherry-heering": ONE("cherry"),
  violette: ONE("lavender-syrup"), chartreuse: ONE("zero-herbal"), "yellow-chartreuse": ONE("zero-herbal"), benedictine: ONE("zero-herbal"),
  strega: ONE("zero-herbal"), genepi: ONE("zero-herbal"), galliano: [["zero-herbal", 0.6], ["vanilla-syrup", 0.4]], mastic: ONE("zero-herbal"),
  drambuie: [["zero-whisky", 0.5], ["honey", 0.5]], "coffee-liqueur": ONE("zero-coffee"), "kahve-likoru-turk": ONE("zero-coffee"),
  elderflower: ONE("elder-cordial"), "pistachio-liqueur": ONE("pistachio-syrup"), umeshu: [["white-grape", 0.6], ["verjus", 0.4]],
  falernum: [["orgeat", 0.6], ["ginger-syrup", 0.4]], "sloe-gin": [["zero-gin", 0.5], ["cherry", 0.5]], "creme-de-menthe": [["simple", 0.8], ["mint", 0]],
  "creme-de-cassis": ONE("blueberry-syrup"), chambord: ONE("raspberry-syrup"), midori: ONE("watermelon-syrup"), limoncello: [["simple", 0.6], ["lemon", 0.4]],
  baileys: [["cream", 0.6], ["caramel-syrup", 0.2], ["zero-whisky", 0.2]], amaretto: ONE("zero-amaretto"), frangelico: ONE("hazelnut-syrup"),
  "cacao-blanc": ONE("chocolate-syrup"), "cacao-dark": ONE("chocolate-syrup"), "apricot-liqueur": [["peach-puree", 0.5], ["simple", 0.5]],
  "peach-schnapps": [["peach-puree", 0.6], ["simple", 0.4]], "yuzu-liqueur": [["yuzu", 0.4], ["simple", 0.6]], "sakura-liqueur": ONE("sakura"),
  "matcha-liqueur": [["matcha", 0.5], ["simple", 0.5]], "allspice-dram": ONE("cinnamon-syrup"), "cloudberry-liqueur": [["sea-buckthorn", 0.4], ["honey", 0.6]],
  // wine & aromatised wine
  sake: ONE("zero-white"), "sweet-vermouth": ONE("zero-rosso"), "dry-vermouth": ONE("zero-dry"), lillet: ONE("zero-dry"), "lillet-rose": ONE("zero-dry"), fino: ONE("zero-dry"),
  champagne: ONE("zero-sparkling"), prosecco: ONE("zero-sparkling"), "sparkling-rose": ONE("zero-sparkling"), "rose-wine": ONE("zero-white"),
  "white-wine": ONE("zero-white"), "red-wine": ONE("zero-red"), port: [["zero-red", 0.8], ["demerara", 0.2]], "px-sherry": [["zero-red", 0.5], ["demerara", 0.5]],
};

const FALLBACK: Record<string, Sub> = {
  spirit: ONE("zero-gin"),
  liqueur: ONE("simple"),
  wine: ONE("zero-white"),
  bitters: ONE("zero-bitters"),
};

export const isAlcoholic = (id: string) => (ingredientById(id)?.abv ?? 0) > 0.005;

/** The zero-proof stand-in for one ingredient (itself when it is already alcohol-free). */
export function zeroSwap(id: string): Sub {
  if (!isAlcoholic(id)) return ONE(id);
  const ing = ingredientById(id)!;
  return MAP[id] ?? FALLBACK[ing.category] ?? ONE(id);
}

export interface ZeroPart extends Part {
  from?: string[]; // ingredient ids this part replaces
}

export function toZero(parts: Part[]): ZeroPart[] {
  const out: ZeroPart[] = [];
  for (const p of parts) {
    for (const [id, f] of zeroSwap(p.id)) {
      const ml = f === 0 ? 0 : Math.round(p.ml * f * 2) / 2;
      const from = id === p.id ? undefined : p.id;
      const same = out.find((o) => o.id === id && !!o.top === !!p.top);
      if (same) {
        same.ml += ml;
        if (from) same.from = [...(same.from ?? []), from];
      } else {
        out.push({ id, ml, ...(p.top ? { top: true } : {}), ...(from ? { from: [from] } : {}) });
      }
    }
  }
  return out;
}

/** True when a recipe has no alcohol at all (a zero-proof original). */
export const isZeroCocktail = (c: Cocktail) => c.parts.every((p) => !isAlcoholic(p.id));

/** The recipe as poured: unchanged, or with zero-proof stand-ins when `zero` is on. */
export function pour(c: Cocktail, zero: boolean): { c: Cocktail; parts: ZeroPart[]; swapped: boolean } {
  if (!zero || isZeroCocktail(c)) return { c, parts: c.parts, swapped: false };
  const parts = toZero(c.parts);
  return { c: { ...c, parts }, parts, swapped: true };
}
