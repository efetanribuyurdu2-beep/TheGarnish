/**
 * The printable menu (/collection → "PDF menü indir") as a real PDF, dressed in
 * the visitor's world: the card frame at A4, the logo, the bar's name, then the
 * saved drinks one under the other. Works everywhere a download does, including
 * phones and in-app browsers where window.print() does nothing.
 */
import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/Logo";
import { ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { brand, frameSvg, loadFont, MAISON_PALETTE, THEMES, upper, type Font, type Theme } from "./card";
import { decodePng, imagesToPdf } from "./pdf";
import { svgDataUri, svgString } from "./svgString";
import { KITS } from "./themeKit";
import type { Cocktail, Lang, PaletteId, WorldId } from "./types";
import { formatAmount } from "./ui";
import { pour } from "./zero";

const W = 1240;
const H = 1754; // A4 at 150 dpi
const FIRST = 6; // drinks on the first page (under the header)
const PER = 8; // on the following pages

export async function renderMenuPdf(o: { world: WorldId; palette: PaletteId; lang: Lang; zero: boolean; by?: string; drinks: Cocktail[] }) {
  const { world, lang } = o;
  const t: Theme = { ...THEMES[world], ...(world === "maison" ? MAISON_PALETTE[o.palette] : {}) };
  const w = worldById(world);
  const items = o.drinks.map((c0) => {
    const { c, parts } = pour(c0, o.zero);
    const name = world === "riviera" ? upper(c.name, lang) : c.name[lang];
    const line = parts
      .map((p) => {
        const i = ingredientById(p.id);
        return i ? `${i.name[lang]} ${p.ml > 0 ? formatAmount(p.ml, lang, false, i.category) : ""}`.trim() : "";
      })
      .filter(Boolean)
      .join("  ·  ");
    return { name, line };
  });
  const pages: (typeof items)[] = [items.slice(0, FIRST)];
  for (let i = FIRST; i < items.length; i += PER) pages.push(items.slice(i, i + PER));

  const eyebrow = `${upper(w.name, lang)}  ·  ${lang === "tr" ? "MENÜ" : "MENU"}${o.zero ? "  ·  0%" : ""}`;
  const bar = w.bar[lang];
  const sign = o.by ? (lang === "tr" ? `Ev sahibi: ${o.by}` : `Your host: ${o.by}`) : w.greeting[lang].split(/(?<=[.!?;])\s/)[0];
  const digits = "0123456789/ ";
  const wanted: [Font, string][] = [
    [t.display, bar + items.map((i) => i.name).join("")],
    [t.body, eyebrow + items.map((i) => i.line).join("") + digits],
    [t.prose, sign],
    [brand, "GARNISHCOCKTAILWORLDS"],
  ];
  const loaded = await Promise.all(wanted.map(([f, text]) => loadFont(f, text)));
  const roles = ["display", "body", "prose", "brand"];
  const fonts = loaded.flatMap((data, i) => (data ? [{ name: roles[i], data, weight: 400 as const, style: "normal" as const }] : []));

  const frame = svgDataUri(frameSvg(world, t, W, H));
  const logo = svgDataUri(svgString(<LogoMark size={120} />).replace(/currentColor/g, t.accent).replace(/var\(--bg\)/g, t.bg));
  const emblem = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 ${KITS[world].emblem.w} ${KITS[world].emblem.h}">${KITS[world].emblem.body}</svg>`);
  const rule = (width: number, size: number) => (
    <div style={{ display: "flex", alignItems: "center", width, margin: "6px 0" }}>
      <div style={{ flex: 1, height: 1, background: t.accent, opacity: 0.55 }} />
      <img src={emblem} width={size} height={size} style={{ margin: "0 16px" }} />
      <div style={{ flex: 1, height: 1, background: t.accent, opacity: 0.55 }} />
    </div>
  );

  const rasters = [];
  for (let n = 0; n < pages.length; n++) {
    const first = n === 0;
    const page = (
      <div style={{ display: "flex", position: "relative", width: W, height: H, background: t.bg }}>
        <img src={frame} width={W} height={H} style={{ position: "absolute", top: 0, left: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: W, height: H, padding: "120px 130px 100px" }}>
          {first && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 30 }}>
              <img src={logo} width={120} height={120} />
              <span style={{ fontFamily: "brand", fontSize: 46, letterSpacing: 16, color: t.ink, marginTop: 14 }}>GARNISH</span>
              <span style={{ fontFamily: "brand", fontSize: 17, letterSpacing: 7, color: t.muted }}>COCKTAIL WORLDS</span>
              <span style={{ fontFamily: "body", fontSize: 22, letterSpacing: 5, color: t.accent, marginTop: 40 }}>{eyebrow}</span>
              <span style={{ fontFamily: "display", fontSize: 76, color: t.ink, marginTop: 8, textAlign: "center" }}>{bar}</span>
              <span style={{ fontFamily: "prose", fontSize: 27, color: t.muted, marginTop: 10, textAlign: "center", maxWidth: 860 }}>{sign}</span>
              {rule(640, 34)}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, justifyContent: first ? "flex-start" : "center", width: "100%" }}>
            {pages[n].map((it, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: i ? 34 : 8 }}>
                <span style={{ fontFamily: "display", fontSize: it.name.length > 22 ? 40 : 50, color: t.ink, textAlign: "center", lineHeight: 1.1 }}>{it.name}</span>
                <span style={{ fontFamily: "body", fontSize: 23, color: t.muted, textAlign: "center", maxWidth: 900, marginTop: 10, lineHeight: 1.4 }}>{it.line}</span>
                <div style={{ display: "flex", width: 90, height: 1, background: t.accent, opacity: 0.45, marginTop: 22 }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%", marginTop: 20 }}>
            <span style={{ fontFamily: "brand", fontSize: 20, letterSpacing: 6, color: t.muted }}>GARNISH</span>
            <span style={{ marginLeft: "auto", fontFamily: "body", fontSize: 20, color: t.muted }}>{`${n + 1} / ${pages.length}`}</span>
          </div>
        </div>
      </div>
    );
    const png = Buffer.from(await new ImageResponse(page, { width: W, height: H, fonts }).arrayBuffer());
    rasters.push(decodePng(png));
  }
  return imagesToPdf(rasters, `Garnish · ${bar}`);
}
