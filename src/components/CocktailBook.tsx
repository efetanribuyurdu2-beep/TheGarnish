"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BOOK_EXTRAS, BOOK_FROM_SITE, type BookExtra } from "@/data/book";
import { BOOK_PHOTOS } from "@/data/bookPhotos";
import { BOOK_DETAIL, type BookDetail } from "@/data/bookDetail";
import { COCKTAILS, GARNISHES, ROOTS } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { analyse } from "@/lib/balance";
import { usePrefs } from "@/lib/prefs";
import type { Glass, Ice, L, Method, WorldId } from "@/lib/types";
import { GLASS_LABEL } from "@/lib/ui";
import { formatAmount } from "./CocktailCard";
import { GlassArt } from "./GlassArt";

/**
 * The Cocktail Book. Each drink is a two-page spread: its photograph on the left,
 * faded and desaturated until the spread comes into view (or is hovered), then
 * bright; its story and recipe on the right. The binding, paper and cover change
 * with the world (see "COCKTAIL BOOK" in globals.css).
 */

interface Page {
  id: string;
  name: L;
  year?: string;
  origin: L;
  story: L;
  family: L;
  recipe: L[];
  method?: L;
  glass: Glass;
  ice: Ice;
  garnish: string;
  color: string;
  opaque?: boolean;
  drawMethod: Method;
  onSite?: { world: WorldId | "all" };
}

const sameLang = (x: L) => (x.tr === x.en ? "en" : undefined);
const METHOD_WORD: Record<Method, L> = {
  shake: { tr: "Buzla çalkala, süz.", en: "Shake with ice, strain." },
  dryshake: { tr: "Önce buzsuz, sonra buzla çalkala, süz.", en: "Dry shake, then shake with ice and strain." },
  stir: { tr: "Buzla karıştır, süz.", en: "Stir with ice, strain." },
  build: { tr: "Doğrudan bardakta, buzun üstüne hazırla.", en: "Build in the glass over ice." },
  blend: { tr: "Kırık buzla blenderdan geçir.", en: "Blend with crushed ice." },
  swizzle: { tr: "Kırık buzla swizzle çubuğuyla çevir.", en: "Swizzle with crushed ice." },
};

function pagesFor(lang: "tr" | "en"): Page[] {
  const fromSite: Page[] = BOOK_FROM_SITE.flatMap((id) => {
    const c = COCKTAILS.find((x) => x.id === id);
    if (!c) return [];
    const a = analyse(c.parts, c.method);
    const root = ROOTS.find((r) => r.id === c.root);
    return [
      {
        id: c.id,
        name: c.name,
        year: c.year,
        origin: c.origin,
        story: c.story,
        family: root?.name ?? { tr: "", en: "" },
        recipe: c.parts.map((p) => {
          const ing = ingredientById(p.id);
          const line = (lg: "tr" | "en") => `${p.ml > 0 ? formatAmount(p.ml, lg, p.top, ing?.category) + " " : ""}${ing ? ing.name[lg] : p.id}`.trim();
          return { tr: line("tr"), en: line("en") };
        }),
        method: METHOD_WORD[c.method],
        glass: c.glass,
        ice: c.ice,
        garnish: c.garnish,
        color: a.color,
        opaque: a.opaque,
        drawMethod: c.method,
        onSite: { world: c.world },
      },
    ];
  });
  const extras: Page[] = BOOK_EXTRAS.map((x: BookExtra) => ({
    id: x.id,
    name: x.name,
    year: x.year,
    origin: x.origin,
    story: x.story,
    family: x.family,
    recipe: x.recipe,
    method: x.method,
    glass: x.glass,
    ice: x.ice,
    garnish: x.garnish,
    color: x.color,
    opaque: x.opaque,
    drawMethod: "shake",
  }));
  // canon first, then the rest in alphabetical order
  const canon = fromSite.slice(0, 18);
  const rest = [...fromSite.slice(18), ...extras].sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang));
  return [...canon, ...rest];
}

const COVER: Record<WorldId, L> = {
  maison: { tr: "Le Livre des Cocktails", en: "Le Livre des Cocktails" },
  anatolia: { tr: "Kadeh Mecmuası", en: "Kadeh Mecmuası · An Anthology of the Glass" },
  cosmos: { tr: "Kokteyllerin Yıldız Atlası", en: "A Star Atlas of Cocktails" },
  jazz: { tr: "The Speakeasy Ledger", en: "The Speakeasy Ledger" },
  sakura: { tr: "カクテル帖 · Kokteyl Defteri", en: "カクテル帖 · The Cocktail Notebook" },
  alchemist: { tr: "Codex Potionum", en: "Codex Potionum" },
  tiki: { tr: "The Grog Scrapbook", en: "The Grog Scrapbook" },
  boreal: { tr: "Книга коктейлей · Cocktailboka", en: "Книга коктейлей · Cocktailboka" },
  riviera: { tr: "Le Carnet de la Cave", en: "Le Carnet de la Cave" },
};

/** Marks spreads that are in view as lit, so their photographs come up to full colour. */
function useLit() {
  const [lit, setLit] = useState<Set<string>>(new Set());
  const io = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    io.current = new IntersectionObserver(
      (entries) =>
        setLit((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            const id = (e.target as HTMLElement).dataset.page!;
            if (e.isIntersecting) next.add(id);
            else next.delete(id);
          }
          return next;
        }),
      { threshold: 0.45 },
    );
    document.querySelectorAll<HTMLElement>("[data-page]").forEach((el) => io.current!.observe(el));
    return () => io.current?.disconnect();
  }, []);
  return lit;
}

function Photo({ p, world }: { p: Page; world: WorldId }) {
  const { pick, t } = usePrefs();
  const ph = BOOK_PHOTOS[p.id];
  if (ph) {
    const src = `${ph.url}${ph.url.includes("?") ? "&" : "?"}auto=format&fit=crop&w=900&h=1200&q=80`;
    return (
      <figure className="cb-photo" style={{ background: ph.color }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={pick(ph.alt)} loading="lazy" decoding="async" />
        <figcaption className="cb-credit">
          {t("photoBy")}{" "}
          <a href={`${ph.authorUrl}?utm_source=garnish&utm_medium=referral`} target="_blank" rel="noreferrer">
            {ph.author}
          </a>{" "}
          /{" "}
          <a href={`${ph.photoUrl}?utm_source=garnish&utm_medium=referral`} target="_blank" rel="noreferrer">
            Unsplash
          </a>
        </figcaption>
      </figure>
    );
  }
  // no photograph yet: the glass, drawn large, on a softly lit plate
  return (
    <figure className="cb-photo cb-drawn" style={{ "--drink": p.color } as React.CSSProperties}>
      <span className="cb-drawn-glass">
        <GlassArt glass={p.glass} color={p.color} opaque={p.opaque} ice={p.ice} method={p.drawMethod} garnish={p.garnish} size={260} animate={false} world={world} />
      </span>
    </figure>
  );
}

export function CocktailBook() {
  const { world, lang, pick, t } = usePrefs();
  const id = world ?? "maison";
  const pages = pagesFor(lang);
  const lit = useLit();

  return (
    <div className={`cbook cbook-${id}`}>
      <section className="cb-cover" aria-label={t("nav_book")}>
        <span className="cb-clasp" aria-hidden />
        <span className="cb-emblem" aria-hidden />
        <p className="cb-kicker">{t("nav_book")}</p>
        <h1 className="cb-title" lang={sameLang(COVER[id])}>
          {pick(COVER[id])}
        </h1>
        <p className="cb-sub">{t("bookSub", { n: pages.length })}</p>
        <a href="#contents" className="btn ghost">
          {t("openBook")} ↓
        </a>
      </section>

      <section className="cb-sheet cb-contents" id="contents">
        <h2 className="cb-contents-title">{t("contents")}</h2>
        <ol>
          {pages.map((p, i) => (
            <li key={p.id}>
              <a href={`#page-${p.id}`}>
                <span lang={sameLang(p.name)}>{pick(p.name)}</span>
                <i aria-hidden />
                <b>{i + 1}</b>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {pages.map((p, i) => {
        const glassName = GLASS_LABEL[p.glass] ? pick(GLASS_LABEL[p.glass]) : p.glass;
        const garnish = p.garnish !== "none" && GARNISHES[p.garnish] ? pick(GARNISHES[p.garnish]) : null;
        const w = p.onSite && p.onSite.world !== "all" ? worldById(p.onSite.world) : null;
        const d = BOOK_DETAIL[p.id];
        return (
          <div key={p.id} className="cb-entry">
          <article id={`page-${p.id}`} data-page={p.id} className={`cb-spread ${lit.has(p.id) ? "lit" : ""}`}>
            <div className="cb-left">
              <Photo p={p} world={id} />
            </div>
            <div className="cb-right">
              <span className="cb-folio">{i + 1}</span>
              <p className="cb-meta">
                {p.year && !pick(p.origin).includes(p.year.replace(/^c\. /, "")) && <span>{p.year}</span>}
                <span>{pick(p.origin)}</span>
              </p>
              <h2 className="cb-name" lang={sameLang(p.name)}>
                {pick(p.name)}
              </h2>
              <p className="cb-family">
                {pick(p.family)}
                {w && (
                  <>
                    {" · "}
                    <span lang={sameLang(w.name)}>{pick(w.name)}</span>
                  </>
                )}
              </p>
              <p className="cb-story">{pick(p.story)}</p>
              <ul className="cb-recipe">
                {p.recipe.map((r, k) => (
                  <li key={k}>{pick(r)}</li>
                ))}
              </ul>
              {p.method && <p className="cb-method">{pick(p.method)}</p>}
              <p className="cb-serve">
                {glassName}
                {garnish && ` · ${garnish}`}
              </p>
              {p.onSite && (
                <Link className="cb-more" href={`/cocktails/${p.id}`}>
                  {t("fullRecipe")} →
                </Link>
              )}
            </div>
          </article>
          {d && <Leaf d={d} p={p} />}
          </div>
        );
      })}
    </div>
  );
}

/** The leaf under each spread: the full story, the method step by step, why it works, variations, a note. */
function Leaf({ d, p }: { d: BookDetail; p: Page }) {
  const { pick, t } = usePrefs();
  return (
    <section className="cb-leaf" aria-label={`${pick(p.name)} · ${t("bookStory")}`}>
      <div className="cb-leaf-story">
        <h3>{t("bookStory")}</h3>
        {d.history.map((x, i) => (
          <p key={i} className={i === 0 ? "cb-lead" : undefined}>{pick(x)}</p>
        ))}
      </div>
      <div className="cb-leaf-craft">
        <h3>{t("bookMethod")}</h3>
        <ol className="cb-steps">
          {d.steps.map((x, i) => (
            <li key={i}>{pick(x)}</li>
          ))}
        </ol>
        <h3>{t("whyTitle")}</h3>
        <p>{pick(d.why)}</p>
        <h3>{t("bookVariations")}</h3>
        <dl className="cb-vars">
          {d.variations.map((x) => (
            <div key={x.name}>
              <dt lang="en">{x.name}</dt>
              <dd>{pick(x.note)}</dd>
            </div>
          ))}
        </dl>
        <aside className="cb-tip">
          <span>{t("bookTip")}</span>
          <p>{pick(d.tip)}</p>
        </aside>
      </div>
    </section>
  );
}
