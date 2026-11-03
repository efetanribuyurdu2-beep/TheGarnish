/**
 * "Şansına" in the Atelier: a random cocktail that still balances.
 * It picks a family frame (sour, daisy, martini, old fashioned, highball, flip),
 * fills it from the cellar (leaning on this world's own bottles and on the
 * visitor's bar), corrects sugar/acid once with the balance maths, then names it.
 */
import { INGREDIENTS } from "@/data/ingredients";
import { analyse } from "./balance";
import type { Glass, Ice, Ingredient, IngredientCategory, L, Method, Part, Root, WorldId } from "./types";
import { WORLD_VESSELS } from "./ui";
import { toZero } from "./zero";

export interface Draw {
  parts: Part[];
  method: Method;
  glass: Glass;
  ice: Ice;
  garnish: string;
  root: Root;
  name: L;
}

const pickOne = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const between = (lo: number, hi: number, step = 2.5) => Math.round((lo + Math.random() * (hi - lo)) / step) * step;

const SOUR = ["lemon", "lime", "yuzu"];
const NOT_IN_DRAW = new Set(["egg-white", "aquafaba", "cream", "coconut-milk", "espresso", "turkish-coffee", "cold-brew", "mint", "basil", "olive-brine"]);

/** Prefer this world's bottles and the visitor's bar, but keep everything possible. */
function choose(list: Ingredient[], world: WorldId, bar: Set<string>): Ingredient {
  const weighted = list.flatMap((i) => Array(1 + (i.world === world ? 3 : 0) + (bar.has(i.id) ? 2 : 0)).fill(i));
  return pickOne(weighted);
}

function pool(cat: IngredientCategory, test: (i: Ingredient) => boolean = () => true) {
  return INGREDIENTS.filter((i) => i.category === cat && !i.zero && !NOT_IN_DRAW.has(i.id) && test(i));
}

const WORDS: Record<WorldId, L[]> = {
  maison: [{ tr: "Altın Saat", en: "Golden Hour" }, { tr: "Kristal", en: "Crystal" }, { tr: "Gece Yarısı", en: "Midnight" }, { tr: "Le Salon", en: "Le Salon" }, { tr: "Mermer", en: "Marble" }],
  anatolia: [{ tr: "Lale", en: "Tulip" }, { tr: "Nazar", en: "Nazar" }, { tr: "Kilim", en: "Kilim" }, { tr: "Mehtap", en: "Moonlight" }, { tr: "Çini", en: "Çini" }],
  cosmos: [{ tr: "Nebula", en: "Nebula" }, { tr: "Yörünge", en: "Orbit" }, { tr: "Kuyrukluyıldız", en: "Comet" }, { tr: "Kara Delik", en: "Black Hole" }, { tr: "Pulsar", en: "Pulsar" }],
  jazz: [{ tr: "Gece Seti", en: "Late Set" }, { tr: "Kornet", en: "Cornet" }, { tr: "Kadife", en: "Velvet" }, { tr: "Parola", en: "Password" }, { tr: "Plak", en: "Vinyl" }],
  sakura: [{ tr: "Hanami", en: "Hanami" }, { tr: "Yozakura", en: "Yozakura" }, { tr: "Kintsugi", en: "Kintsugi" }, { tr: "Fener", en: "Lantern" }, { tr: "Çiy", en: "Dew" }],
  alchemist: [{ tr: "İksir", en: "Elixir" }, { tr: "Simya", en: "Alchemy" }, { tr: "Merkür", en: "Mercury" }, { tr: "Damıtık", en: "Distillate" }, { tr: "Altın Taş", en: "Philosopher's" }],
  tiki: [{ tr: "Lagün", en: "Lagoon" }, { tr: "Meşale", en: "Torch" }, { tr: "Mercan", en: "Coral" }, { tr: "Volkan", en: "Volcano" }, { tr: "Aloha", en: "Aloha" }],
  boreal: [{ tr: "Aurora", en: "Aurora" }, { tr: "Kar Tanesi", en: "Snowflake" }, { tr: "Huş", en: "Birch" }, { tr: "Kutup", en: "Polar" }, { tr: "Taiga", en: "Taiga" }],
  riviera: [{ tr: "Bağ", en: "Vineyard" }, { tr: "Limon Bahçesi", en: "Lemon Grove" }, { tr: "Mahzen", en: "Cellar" }, { tr: "Gün Batımı", en: "Sunset" }, { tr: "Zeytin", en: "Olive" }],
};
const STYLE: Record<Root, string> = { daiquiri: "Sour", sidecar: "Daisy", martini: "Martini", oldfashioned: "Old Fashioned", highball: "Highball", flip: "Flip" };

export function drawCocktail(world: WorldId, bar: string[], zero: boolean): Draw {
  const owned = new Set(bar);
  const roots: Root[] = ["daiquiri", "daiquiri", "sidecar", "sidecar", "martini", "oldfashioned", "highball", "highball", "flip"];
  const root = pickOne(roots);
  const base = choose(pool("spirit", (i) => i.abv >= 0.3), world, owned);
  const sour = choose(INGREDIENTS.filter((i) => SOUR.includes(i.id)), world, owned);
  const syrup = choose(pool("syrup"), world, owned);
  const liqueur = choose(pool("liqueur"), world, owned);
  const bitters = choose(pool("bitters"), world, owned);
  const own = (WORLD_VESSELS[world] ?? []) as Glass[];
  let parts: Part[] = [];
  let method: Method = "shake";
  let glass: Glass = own[0] ?? "coupe";
  let ice: Ice = "none";
  let garnish = sour.id === "lemon" ? "lemon-twist" : "lime-wheel";

  switch (root) {
    case "daiquiri": {
      parts = [{ id: base.id, ml: between(45, 60) }, { id: sour.id, ml: between(20, 25) }, { id: syrup.id, ml: between(15, 22.5) }];
      if (Math.random() < 0.3) {
        parts.push({ id: "egg-white", ml: 20 });
        method = "dryshake";
      }
      glass = pickOne([...own, "coupe", "rocks"] as Glass[]);
      ice = glass === "rocks" ? "cube" : "none";
      break;
    }
    case "sidecar":
      parts = [{ id: base.id, ml: between(40, 50) }, { id: liqueur.id, ml: between(15, 25) }, { id: sour.id, ml: between(17.5, 22.5) }];
      glass = pickOne([...own, "coupe", "nicknora"] as Glass[]);
      garnish = pickOne(["orange-twist", "lemon-twist", garnish]);
      break;
    case "martini": {
      const wine = choose(pool("wine", (i) => i.abv > 0.1 && i.abv < 0.25), world, owned);
      parts = [{ id: base.id, ml: between(45, 60) }, { id: wine.id, ml: between(15, 30) }, { id: bitters.id, ml: 1 }];
      if (Math.random() < 0.4) parts.splice(2, 0, { id: liqueur.id, ml: 7.5 });
      method = "stir";
      glass = pickOne([...own, "martini", "nicknora", "coupe"] as Glass[]);
      garnish = pickOne(["lemon-twist", "orange-twist", "olive", "cherry"]);
      break;
    }
    case "oldfashioned":
      parts = [{ id: base.id, ml: 60 }, { id: syrup.id, ml: 7.5 }, { id: bitters.id, ml: 2 }];
      method = "stir";
      glass = "rocks";
      ice = "sphere";
      garnish = pickOne(["orange-twist", "lemon-twist"]);
      break;
    case "highball": {
      const mixer = choose(pool("mixer"), world, owned);
      parts = [{ id: base.id, ml: between(40, 50) }, { id: sour.id, ml: 10 }, { id: mixer.id, ml: between(100, 140, 10), top: true }];
      if (Math.random() < 0.5) parts.splice(2, 0, { id: Math.random() < 0.5 ? syrup.id : liqueur.id, ml: 10 });
      method = "build";
      glass = pickOne([...own.filter((g) => g !== "ochoko" && g !== "fincan"), "highball"] as Glass[]);
      ice = "collins";
      garnish = pickOne([garnish, "mint", "lemon-wheel", "orange-slice"]);
      break;
    }
    case "flip":
      parts = [{ id: base.id, ml: 40 }, { id: liqueur.id, ml: 20 }, { id: pickOne(["cream", "espresso", "coconut"]), ml: 30 }];
      glass = pickOne([...own, "coupe", "martini"] as Glass[]);
      garnish = pickOne(["nutmeg", "coffee-beans", "orange-twist"]);
      break;
  }
  parts = parts.filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i);

  // one correction with the balance maths, as a bartender would taste and adjust
  const a = analyse(parts, method);
  if (a.tip?.ml && (a.tip.kind === "add-acid" || a.tip.kind === "add-sugar")) {
    const want = a.tip.kind === "add-acid" ? parts.find((p) => SOUR.includes(p.id)) : parts.find((p) => p.id === syrup.id);
    if (want) want.ml = Math.min(want.ml + Math.min(a.tip.ml, 15), 40);
  }
  if (zero) parts = toZero(parts).map(({ id, ml, top }) => (top ? { id, ml, top } : { id, ml }));

  const word = pickOne(WORDS[world]);
  return {
    parts, method, glass, ice, garnish, root,
    name: { tr: `${word.tr} ${STYLE[root]}`, en: `${word.en} ${STYLE[root]}` },
  };
}
