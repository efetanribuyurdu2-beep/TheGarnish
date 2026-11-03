/**
 * Recipe sharing: a link that carries the recipe and the world it was poured in.
 *
 *   /r/negroni.maison-bordeaux.tr     a site cocktail, seen in Maison (Bordeaux), Turkish
 *   /r/negroni.jazz.en.0              the same, alcohol-free, in the Jazz Bar, English
 *   /r/~eyJ2IjoxLC4uLn0               a visitor's own creation: the whole recipe, base64url JSON
 *
 * Creations live only in the visitor's browser, so their link holds the recipe itself.
 * Everything here runs on the server (social previews, card images) and in the browser.
 */
import { COCKTAILS, GARNISHES } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import { worldById, WORLDS } from "@/data/worlds";
import type { Cocktail, Glass, Ice, Lang, Method, PaletteId, Part, Root, WorldId } from "./types";

export interface Shared {
  cocktail: Cocktail;
  world: WorldId;
  palette: PaletteId;
  lang: Lang;
  zero: boolean;
  by?: string; // the sharer's passport name, for creations
  creation: boolean;
}

const PALETTES: PaletteId[] = ["noir", "midnight", "bordeaux"];
const GLASSES: Glass[] = ["coupe", "martini", "rocks", "highball", "flute", "nicknora", "mug", "tiki", "wine", "fincan", "istikan", "raki", "ochoko", "masu", "teacup", "orb", "beaker", "flask", "coconut", "pineapple", "ryumka", "kuksa", "iceglass", "kylix", "terracotta"];
const METHODS: Method[] = ["shake", "dryshake", "stir", "build", "blend", "swizzle"];
const ICES: Ice[] = ["none", "cube", "sphere", "crushed", "collins"];
const ROOTS: Root[] = ["oldfashioned", "martini", "daiquiri", "sidecar", "highball", "flip"];
const isWorld = (w: unknown): w is WorldId => WORLDS.some((x) => x.id === w);

// ── base64url of UTF-8, the same in Node and the browser
function toB64(s: string) {
  let bin = "";
  new TextEncoder().encode(s).forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (ch) => ch.charCodeAt(0)));
}

/** Compact form of a creation: only what the Atelier lets you choose. */
interface Packed {
  v: 1;
  w: WorldId;
  p?: PaletteId;
  l: Lang;
  z?: 1;
  by?: string;
  n: string | [string, string];
  r: Root;
  g: Glass;
  i: Ice;
  m: Method;
  ga: string;
  pa?: string;
  x: [string, number, 1?][];
}

export function shareCode(c: Cocktail, o: { world: WorldId; palette: PaletteId; lang: Lang; zero: boolean; by?: string }): string {
  const w = o.world === "maison" && o.palette !== "noir" ? `maison-${o.palette}` : o.world;
  if (!c.author) return `${c.id}.${w}.${o.lang}${o.zero ? ".0" : ""}`;
  const packed: Packed = {
    v: 1,
    w: o.world,
    ...(o.world === "maison" && o.palette !== "noir" ? { p: o.palette } : {}),
    l: o.lang,
    ...(o.zero ? { z: 1 as const } : {}),
    ...(o.by ? { by: o.by.slice(0, 40) } : {}),
    n: c.name.tr === c.name.en ? c.name.tr : [c.name.tr, c.name.en],
    r: c.root,
    g: c.glass,
    i: c.ice,
    m: c.method,
    ga: c.garnish,
    ...(c.parent ? { pa: c.parent } : {}),
    x: c.parts.map((p) => (p.top ? [p.id, p.ml, 1] : [p.id, p.ml])),
  };
  return "~" + toB64(JSON.stringify(packed));
}

export const sharePath = (code: string) => `/r/${code}`;

/** Reads a share code back; anything malformed or unknown gives undefined. */
export function readShare(code: string): Shared | undefined {
  try {
    code = decodeURIComponent(code);
    if (code.startsWith("~")) return unpack(JSON.parse(fromB64(code.slice(1))) as Packed, code);
    const [id, w, l, z] = code.split(".");
    const cocktail = COCKTAILS.find((c) => c.id === id);
    const [world, pal] = (w ?? "").split("-") as [string, string | undefined];
    if (!cocktail || !isWorld(world)) return undefined;
    return {
      cocktail,
      world,
      palette: PALETTES.includes(pal as PaletteId) ? (pal as PaletteId) : "noir",
      lang: l === "en" ? "en" : "tr",
      zero: z === "0",
      creation: false,
    };
  } catch {
    return undefined;
  }
}

function unpack(p: Packed, code: string): Shared | undefined {
  if (p?.v !== 1 || !isWorld(p.w) || !GLASSES.includes(p.g) || !METHODS.includes(p.m) || !ICES.includes(p.i) || !ROOTS.includes(p.r)) return undefined;
  if (!Array.isArray(p.x) || !p.x.length || p.x.length > 16) return undefined;
  const parts: Part[] = [];
  for (const [id, ml, top] of p.x) {
    if (!ingredientById(id) || typeof ml !== "number" || ml < 0 || ml > 400) return undefined;
    parts.push(top ? { id, ml, top: true } : { id, ml });
  }
  const [tr, en] = (Array.isArray(p.n) ? p.n : [p.n, p.n]).map((s) => String(s ?? "").slice(0, 60).trim());
  const bar = worldById(p.w).bar;
  const by = typeof p.by === "string" ? p.by.slice(0, 40).trim() : "";
  const cocktail: Cocktail = {
    id: `shared-${hash(code)}`,
    name: { tr: tr || "İsimsiz İmza", en: en || "Untitled Signature" },
    world: p.w,
    root: p.r,
    parent: p.pa && COCKTAILS.some((c) => c.id === p.pa) ? p.pa : undefined,
    origin: bar,
    glass: p.g,
    ice: p.i,
    method: p.m,
    garnish: GARNISHES[p.ga] ? p.ga : "none",
    parts,
    story: by
      ? { tr: `${by}, bu tarifi ${bar.tr} tezgâhında yarattı.`, en: `${by} created this at the counter of ${bar.en}.` }
      : { tr: `${bar.tr} tezgâhında, bir dostun elleriyle yaratıldı.`, en: `Created by a friend's hand at the counter of ${bar.en}.` },
    moods: [],
    author: "shared",
  };
  return {
    cocktail,
    world: p.w,
    palette: PALETTES.includes(p.p as PaletteId) ? (p.p as PaletteId) : "noir",
    lang: p.l === "en" ? "en" : "tr",
    zero: p.z === 1,
    by: by || undefined,
    creation: true,
  };
}

function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
