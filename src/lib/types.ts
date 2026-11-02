export type Lang = "tr" | "en";
export type L = { tr: string; en: string };

export type WorldId =
  | "maison"
  | "anatolia"
  | "cosmos"
  | "jazz"
  | "sakura"
  | "alchemist"
  | "tiki"
  | "boreal"
  | "riviera";

export type PaletteId = "noir" | "midnight" | "bordeaux";

export type Flavor = "sweet" | "sour" | "bitter" | "strong" | "fresh" | "aromatic";
export type Profile = Record<Flavor, number>; // 0..5

export type IngredientCategory =
  | "spirit"
  | "liqueur"
  | "wine"
  | "citrus"
  | "syrup"
  | "mixer"
  | "bitters"
  | "other";

export type BottleShape =
  | "tall"
  | "square"
  | "decanter"
  | "squat"
  | "tapered"
  | "round"
  | "wine"
  | "sparkling"
  | "syrup"
  | "bitters"
  | "carafe"
  | "soda"
  | "jar";

export interface Ingredient {
  id: string;
  name: L;
  category: IngredientCategory;
  abv: number; // fraction 0..1
  sugar: number; // g per 100 ml
  acid: number; // % (citric equivalent)
  color: string; // hex
  tint?: number; // how strongly it colours a drink (default 1)
  opaque?: boolean;
  profile: Profile;
  origin: L;
  notes: { nose: L; palate: L; finish: L };
  story: L;
  swaps?: string[]; // ingredient ids
  premium?: string; // a premium bottle to try
  world?: WorldId; // highlighted in this world
  kcal?: number; // per 100 ml, non-alcohol, non-sugar extra (cream etc.)
  shape?: BottleShape; // back-bar bottle silhouette (defaults by category)
  glass?: string; // bottle glass tint, e.g. green or amber glass
  cap?: string; // cap / foil colour
  zero?: boolean; // a zero-proof (alcohol-free) alternative
}

export type Glass =
  | "coupe"
  | "martini"
  | "rocks"
  | "highball"
  | "flute"
  | "nicknora"
  | "mug"
  | "tiki"
  | "wine"
  // world vessels
  | "fincan"
  | "istikan"
  | "raki"
  | "ochoko"
  | "masu"
  | "teacup"
  | "orb"
  | "beaker"
  | "flask"
  | "coconut"
  | "pineapple"
  | "ryumka"
  | "kuksa"
  | "iceglass"
  | "kylix"
  | "terracotta";

export type Method = "shake" | "dryshake" | "stir" | "build" | "blend" | "swizzle";
export type Ice = "none" | "cube" | "sphere" | "crushed" | "collins";
export type Root = "oldfashioned" | "martini" | "daiquiri" | "sidecar" | "highball" | "flip";
export type Mood =
  | "celebrate"
  | "romantic"
  | "sunset"
  | "fireside"
  | "nightcap"
  | "brunch"
  | "party"
  | "tropical";

export interface Part {
  id: string;
  ml: number; // dashes: 1 dash ≈ 1 ml
  top?: boolean; // "top with"
}

export interface Cocktail {
  id: string;
  name: L;
  world: WorldId | "all";
  root: Root;
  parent?: string; // cocktail id it descends from
  year?: string;
  origin: L;
  glass: Glass;
  ice: Ice;
  method: Method;
  garnish: string; // garnish key
  parts: Part[];
  story: L;
  moods: Mood[];
  note?: L; // extra step / tip
  author?: string; // user creations
}
