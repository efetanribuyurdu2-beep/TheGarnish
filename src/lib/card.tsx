/**
 * Share card: the cocktail as an image, dressed in the world it was poured in.
 * One renderer for the social preview (1200×630), the downloadable card and the
 * tall story format (1080×1350). Runs on the server through next/og (satori);
 * the glass is the same hand-drawn SVG as on the site.
 */
import { ImageResponse } from "next/og";
import { GlassSvg } from "@/components/glassSvg";
import { LogoMark } from "@/components/Logo";
import { GARNISHES } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { analyse } from "./balance";
import type { Shared } from "./share";
import { KITS } from "./themeKit";
import type { L, Lang, PaletteId, WorldId } from "./types";
import { formatAmount, GLASS_LABEL, tr } from "./ui";
import { svgDataUri, svgString } from "./svgString";
import { pour } from "./zero";

export type CardFormat = "wide" | "tall";
export const CARD_SIZE: Record<CardFormat, [number, number]> = { wide: [1200, 630], tall: [1080, 1350] };

export interface Font {
  family: string;
  weight?: number;
}
export interface Theme {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  display: Font;
  body: Font;
  prose: Font;
  wall: number; // opacity of the world's wall pattern
}

export const brand: Font = { family: "Cormorant Garamond", weight: 500 };
export const THEMES: Record<WorldId, Theme> = {
  maison: { bg: "#0b0b0b", ink: "#efe6d2", muted: "#a69d8a", accent: "#c9a961", display: { family: "Bodoni Moda", weight: 500 }, body: { family: "Jost", weight: 400 }, prose: { family: "Bodoni Moda", weight: 400 }, wall: 0.22 },
  anatolia: { bg: "#0a1c36", ink: "#f5ecd9", muted: "#a9b9cf", accent: "#d4a94a", display: { family: "Aref Ruqaa", weight: 700 }, body: { family: "Jost", weight: 400 }, prose: { family: "Aref Ruqaa", weight: 400 }, wall: 0.2 },
  cosmos: { bg: "#05060f", ink: "#e8ecff", muted: "#9aa3d6", accent: "#9b7bff", display: { family: "Syncopate", weight: 700 }, body: { family: "Exo 2", weight: 400 }, prose: { family: "Exo 2", weight: 300 }, wall: 0.5 },
  jazz: { bg: "#0b0a08", ink: "#f3e7c9", muted: "#b5a581", accent: "#d9b25f", display: { family: "Limelight" }, body: { family: "Josefin Sans", weight: 400 }, prose: { family: "Poiret One" }, wall: 0.3 },
  sakura: { bg: "#170f13", ink: "#f7eef0", muted: "#c3aab3", accent: "#f2a7bb", display: { family: "Zen Antique" }, body: { family: "Zen Kaku Gothic New", weight: 400 }, prose: { family: "Zen Antique" }, wall: 0.18 },
  alchemist: { bg: "#12100b", ink: "#e6d9bd", muted: "#a8987a", accent: "#c39245", display: { family: "Grenze Gotisch", weight: 500 }, body: { family: "Cormorant Garamond", weight: 500 }, prose: { family: "Cormorant Garamond", weight: 400 }, wall: 0.25 },
  tiki: { bg: "#0b1912", ink: "#f4ead2", muted: "#b8b394", accent: "#f0a04b", display: { family: "Kavoon" }, body: { family: "Karla", weight: 400 }, prose: { family: "Karla", weight: 300 }, wall: 0.28 },
  boreal: { bg: "#07121f", ink: "#e8f1f6", muted: "#9db3c4", accent: "#7fe3c4", display: { family: "Ruslan Display" }, body: { family: "Jost", weight: 400 }, prose: { family: "Forum" }, wall: 0.25 },
  riviera: { bg: "#17110d", ink: "#f4ead6", muted: "#c2ad8e", accent: "#e3b341", display: { family: "Aboreto" }, body: { family: "Lora", weight: 400 }, prose: { family: "Lora", weight: 400 }, wall: 0.3 },
};
export const MAISON_PALETTE: Record<PaletteId, Partial<Theme>> = {
  noir: {},
  midnight: { bg: "#0a1226", accent: "#d4b56a" },
  bordeaux: { bg: "#26080f", ink: "#f1e3c6", muted: "#c3a98d", accent: "#e3c48e" },
};

// ── fonts: Google Fonts, subset to the card's own text (truetype for satori)
const fontCache = new Map<string, Promise<ArrayBuffer | null>>();
export function loadFont(f: Font, text: string): Promise<ArrayBuffer | null> {
  const chars = [...new Set(text)].sort().join("");
  const key = `${f.family}:${f.weight ?? 400}:${chars}`;
  if (!fontCache.has(key)) {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f.family)}${f.weight ? `:wght@${f.weight}` : ""}&text=${encodeURIComponent(chars)}`;
    fontCache.set(
      key,
      fetch(url)
        .then((r) => r.text())
        .then((css) => {
          const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
          return src ? fetch(src).then((r) => r.arrayBuffer()) : null;
        })
        .catch(() => null),
    );
    if (fontCache.size > 400) fontCache.delete(fontCache.keys().next().value!);
  }
  return fontCache.get(key)!;
}

export const upper = (l: L, lang: Lang) => (l.tr === l.en ? l[lang].toUpperCase() : l[lang].toLocaleUpperCase(lang));
const repeat = (id: string, w: number, h: number, body: string) =>
  `<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse">${body}</pattern>`;

/** The frame: world wall, band strips, gilt rule and the kit's four corners, in one SVG. */
export function frameSvg(world: WorldId, t: Theme, W: number, H: number) {
  const k = KITS[world];
  const inset = 26;
  const corner = (x: number, y: number, rot: number) =>
    `<g transform="translate(${x} ${y}) scale(1.5) rotate(${rot} 20 20)">${k.corner.body}</g>`;
  const bh = k.band.h;
  const bandScale = Math.min(1, 22 / bh);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
${repeat("wall", k.wall.w, k.wall.h, k.wall.body)}
${repeat("band", k.band.w, k.band.h, k.band.body)}
<radialGradient id="spot" cx="${W > H ? 0.27 : 0.5}" cy="${W > H ? 0.5 : 0.3}" r="${W > H ? 0.55 : 0.6}">
<stop offset="0" stop-color="${t.accent}" stop-opacity=".22"/><stop offset=".6" stop-color="${t.bg}" stop-opacity=".2"/><stop offset="1" stop-color="${t.bg}" stop-opacity=".9"/>
</radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<rect width="${W}" height="${H}" fill="url(#wall)" opacity="${t.wall}"/>
<rect width="${W}" height="${H}" fill="url(#spot)"/>
<g transform="scale(1 ${bandScale})"><rect width="${W}" height="${bh}" fill="url(#band)"/></g>
<g transform="translate(0 ${H - bh * bandScale}) scale(1 ${bandScale})"><rect width="${W}" height="${bh}" fill="url(#band)"/></g>
<rect x="${inset + 8}" y="${inset + 8 + bh * bandScale}" width="${W - 2 * inset - 16}" height="${H - 2 * inset - 16 - 2 * bh * bandScale}" fill="none" stroke="${t.accent}" stroke-opacity=".55" stroke-width="1.5"/>
<rect x="${inset + 15}" y="${inset + 15 + bh * bandScale}" width="${W - 2 * inset - 30}" height="${H - 2 * inset - 30 - 2 * bh * bandScale}" fill="none" stroke="${t.accent}" stroke-opacity=".25" stroke-width="1"/>
${corner(inset, inset + bh * bandScale, 0)}${corner(W - inset - 60, inset + bh * bandScale, 90)}${corner(W - inset - 60, H - inset - 60 - bh * bandScale, 180)}${corner(inset, H - inset - 60 - bh * bandScale, 270)}
</svg>`;
}

export async function renderCard(s: Shared, format: CardFormat) {
  const { world, lang } = s;
  const t: Theme = { ...THEMES[world], ...(world === "maison" ? MAISON_PALETTE[s.palette] : {}) };
  const w = worldById(world);
  const { c, parts, swapped } = pour(s.cocktail, s.zero);
  const a = analyse(c.parts, c.method);
  const [W, H] = CARD_SIZE[format];
  const wide = format === "wide";
  const pick = (l: L) => l[lang];

  // Aboreto draws only capitals: uppercase it ourselves so Turkish i becomes İ
  const name = world === "riviera" ? upper(c.name, lang) : pick(c.name);
  const eyebrow = [upper(w.name, lang), s.creation ? (lang === "tr" ? "İMZA KOKTEYL" : "SIGNATURE") : c.world === "all" ? (lang === "tr" ? "KLASİK" : "CLASSIC") : upper(w.collection, lang)].join("  ·  ");
  const maxRows = wide ? 6 : 7;
  const rows = parts.map((p) => {
    const ing = ingredientById(p.id)!;
    return { name: pick(ing.name), amount: formatAmount(p.ml, lang, p.top, ing.category) };
  });
  const shown = rows.slice(0, rows.length > maxRows ? maxRows - 1 : maxRows);
  const more = rows.length - shown.length;
  const garnish = pick(GARNISHES[c.garnish] ?? GARNISHES.none);
  const facts = [pick(GLASS_LABEL[c.glass]), `${(a.abv * 100).toFixed(1)}%`, garnish].join("  ·  ");
  const byLine = s.by ? (lang === "tr" ? `İmza: ${s.by}` : `Signed by ${s.by}`) : pick(w.bar);
  const story = (() => {
    const first = pick(c.story).split(/(?<=[.!?])\s/)[0];
    return first.length > 130 ? first.slice(0, 127).trimEnd() + "…" : first;
  })();
  const zeroTag = swapped || s.zero ? `0% · ${tr(lang, "zeroVersion")}` : "";

  // name size by length, so long names still sit on two lines
  const base = wide ? 78 : 96;
  const nameSize = Math.round(base * (name.length > 22 ? 0.62 : name.length > 15 ? 0.76 : name.length > 10 ? 0.88 : 1) * (world === "cosmos" || world === "riviera" ? 0.78 : 1));

  const glassW = wide ? 330 : 420;
  const tallScale = shown.length > 5 ? 0.62 : shown.length > 3 ? 0.76 : 0.9;
  const glass = svgDataUri(svgString(<GlassSvg glass={c.glass} color={a.color} opaque={a.opaque} ice={c.ice} method={c.method} garnish={c.garnish} size={glassW} animate={false} world={world} uid="card" />));
  const logo = svgDataUri(svgString(<LogoMark size={64} />).replace(/currentColor/g, t.accent).replace(/var\(--bg\)/g, t.bg));
  const emblem = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 ${KITS[world].emblem.w} ${KITS[world].emblem.h}">${KITS[world].emblem.body}</svg>`);
  const frame = svgDataUri(frameSvg(world, t, W, H));

  const fontsWanted: [Font, string][] = [
    [t.display, name],
    [t.body, eyebrow + rows.map((r) => r.name + r.amount).join("") + facts + byLine + zeroTag + "+0123456789" + (lang === "tr" ? "malzeme daha" : "more"), ],
    [t.prose, story],
    [brand, "GARNISHCOCKTAILWORLDS"],
  ];
  const loaded = await Promise.all(fontsWanted.map(([f, text]) => loadFont(f, text)));
  const roles = ["display", "body", "prose", "brand"];
  const fonts = loaded.flatMap((data, i) => (data ? [{ name: roles[i], data, weight: 400 as const, style: "normal" as const }] : []));

  const rule = (
    <div style={{ display: "flex", alignItems: "center", width: wide ? 520 : 760, margin: wide ? "14px 0 18px" : "22px 0 26px" }}>
      <div style={{ flex: 1, height: 1, background: t.accent, opacity: 0.6 }} />
      <img src={emblem} width={30} height={30} style={{ margin: "0 14px" }} />
      <div style={{ flex: 1, height: 1, background: t.accent, opacity: 0.6 }} />
    </div>
  );

  const recipe = (
    <div style={{ display: "flex", flexDirection: "column", width: wide ? 520 : 760 }}>
      {shown.map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-end", fontFamily: "body", fontSize: wide ? 24 : 32, color: t.ink, marginBottom: wide ? 7 : 12 }}>
          <span style={{ maxWidth: wide ? 360 : 520 }}>{r.name}</span>
          <div style={{ flex: 1, borderBottom: `2px dashed ${t.accent}`, opacity: 0.5, margin: "0 12px 7px" }} />
          <span style={{ color: t.accent }}>{r.amount}</span>
        </div>
      ))}
      {more > 0 && <div style={{ display: "flex", fontFamily: "body", fontSize: wide ? 20 : 26, color: t.muted }}>{`+${more} ${lang === "tr" ? "malzeme daha" : "more"}`}</div>}
    </div>
  );

  const footer = (
    <div style={{ display: "flex", alignItems: "center", marginTop: "auto", width: "100%" }}>
      <img src={logo} width={wide ? 46 : 60} height={wide ? 46 : 60} />
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 14 }}>
        <span style={{ fontFamily: "brand", fontSize: wide ? 28 : 36, letterSpacing: 8, color: t.ink }}>GARNISH</span>
        <span style={{ fontFamily: "brand", fontSize: wide ? 12 : 15, letterSpacing: 5, color: t.muted }}>COCKTAIL WORLDS</span>
      </div>
      <span style={{ marginLeft: "auto", fontFamily: "body", fontSize: wide ? 20 : 26, color: t.muted }}>{byLine}</span>
    </div>
  );

  const title = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: wide ? "flex-start" : "center" }}>
      <span style={{ fontFamily: "body", fontSize: wide ? 18 : 24, letterSpacing: 4, color: t.accent }}>{eyebrow}</span>
      <span style={{ fontFamily: "display", fontSize: nameSize, lineHeight: 1.05, color: t.ink, marginTop: wide ? 10 : 16, textAlign: wide ? "left" : "center", maxWidth: wide ? 560 : 860 }}>{name}</span>
      {zeroTag && <span style={{ fontFamily: "body", fontSize: wide ? 18 : 24, color: t.bg, background: t.accent, padding: "4px 12px", marginTop: 12 }}>{zeroTag}</span>}
    </div>
  );

  const body = wide ? (
    <div style={{ display: "flex", width: W, height: H, padding: "64px 84px 60px 70px" }}>
      <div style={{ display: "flex", width: 380, alignItems: "center", justifyContent: "center" }}>
        <img src={glass} width={glassW} height={(glassW * 160) / 120} style={{ marginTop: 10 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, marginLeft: 40 }}>
        {title}
        {rule}
        {recipe}
        <span style={{ fontFamily: "body", fontSize: 18, color: t.muted, marginTop: 8 }}>{facts}</span>
        {rows.length <= 4 && <span style={{ fontFamily: "prose", fontSize: 21, color: t.muted, marginTop: 16, maxWidth: 520, lineHeight: 1.35 }}>{story}</span>}
        {footer}
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: W, height: H, padding: "90px 100px 80px" }}>
      <img src={glass} width={glassW * tallScale} height={(glassW * tallScale * 160) / 120} />
      <div style={{ display: "flex", marginTop: 16 }}>{title}</div>
      {rule}
      {recipe}
      {shown.length <= 5 && <span style={{ fontFamily: "prose", fontSize: 28, color: t.muted, marginTop: 18, textAlign: "center", maxWidth: 820 }}>{story}</span>}
      <span style={{ fontFamily: "body", fontSize: 24, color: t.muted, marginTop: 14 }}>{facts}</span>
      <div style={{ display: "flex", width: 860, marginTop: "auto" }}>{footer}</div>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: W, height: H, background: t.bg }}>
        <img src={frame} width={W} height={H} style={{ position: "absolute", top: 0, left: 0 }} />
        {body}
      </div>
    ),
    { width: W, height: H, fonts, headers: { "cache-control": "public, max-age=86400, s-maxage=31536000, immutable" } },
  );
}
