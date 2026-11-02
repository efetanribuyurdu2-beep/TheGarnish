"use client";

import Link from "next/link";
import { useState } from "react";
import { formatAmount } from "@/components/CocktailCard";
import { FlavorRadar } from "@/components/FlavorRadar";
import { GlassArt } from "@/components/GlassArt";
import { GARNISHES, ROOTS } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { analyse } from "@/lib/balance";
import { childrenOf, findCocktail, visibleCocktails } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import { GLASS_LABEL, ICE_LABEL, METHOD_STEPS } from "@/lib/ui";
import { isZeroCocktail, pour } from "@/lib/zero";
import { Echo } from "@/components/Echo";

export function CocktailDetail({ id }: { id: string }) {
  const { pick, t, lang, creations, favourites, toggleFav, world, openGate, zero } = usePrefs();
  const [choice, setChoice] = useState<boolean | null>(null);
  const original = findCocktail(id, creations);
  if (!original) {
    return (
      <div className="page-head">
        <h1>404</h1>
        <Link href="/cocktails" className="btn">{t("nav_cocktails")}</Link>
      </div>
    );
  }
  const native = isZeroCocktail(original);
  const wantZero = choice ?? zero;
  const { c, parts, swapped } = pour(original, wantZero);
  const a = analyse(c.parts, c.method);
  const fav = favourites.includes(c.id);
  const parent = c.parent ? findCocktail(c.parent, creations) : undefined;
  const kids = childrenOf(c.id, visibleCocktails(world, creations));
  const root = ROOTS.find((r) => r.id === c.root)!;
  const otherWorld = c.world !== "all" && c.world !== world && !c.author;

  return (
    <article className="detail">
      <aside className="detail-art">
        <GlassArt glass={c.glass} color={a.color} opaque={a.opaque} ice={c.ice} method={c.method} garnish={c.garnish} size={200} />
        <FlavorRadar profile={a.profile} size={230} />
        <button className={`btn ${fav ? "" : "ghost"}`} onClick={() => toggleFav(c.id)}>
          {fav ? "♥ " + t("saved") : "♡ " + t("save")}
        </button>
      </aside>
      <div>
        <span className="eyebrow">
          {c.author ? t("creations") : c.world === "all" ? t("classics") : pick(worldById(c.world).collection)}
        </span>
        <h1>{pick(c.name)}</h1>
        <Echo text={pick(c.name)} />
        {native ? (
          <p><span className="badge zero">0% · {t("zeroNative")}</span></p>
        ) : (
          <div className="version-toggle" role="group" aria-label={t("zeroToggle")}>
            <button className={!wantZero ? "on" : ""} aria-pressed={!wantZero} onClick={() => setChoice(false)}>{t("original")}</button>
            <button className={wantZero ? "on" : ""} aria-pressed={wantZero} onClick={() => setChoice(true)}>0% · {t("zeroVersion")}</button>
          </div>
        )}
        {otherWorld && (
          <p className="hint">
            {pick(worldById(c.world as never).name)} ·{" "}
            <button className="link" onClick={() => openGate(true)}>{t("changeWorld")} →</button>
          </p>
        )}
        <p className="story">{pick(c.story)}</p>

        <dl className="facts">
          <div><dt>{t("origin")}</dt><dd>{pick(c.origin)}</dd></div>
          <div><dt>{t("glass")}</dt><dd>{pick(GLASS_LABEL[c.glass])}</dd></div>
          <div><dt>{t("ice")}</dt><dd>{pick(ICE_LABEL[c.ice])}</dd></div>
          <div><dt>{t("garnish")}</dt><dd>{pick(GARNISHES[c.garnish] ?? GARNISHES.none)}</dd></div>
          <div><dt>{t("finalAbv")}</dt><dd>{(a.abv * 100).toFixed(1)}%</dd></div>
          <div><dt>{t("calories")}</dt><dd>≈ {Math.round(a.kcal)} kcal</dd></div>
        </dl>

        <h2>{t("ingredients")}</h2>
        {swapped && <p className="zero-note">{t("zeroNote")}</p>}
        <ul className="recipe">
          {parts.map((p) => {
            const ing = ingredientById(p.id);
            if (!ing) return null;
            const from = "from" in p && p.from ? p.from.map((f) => pick(ingredientById(f)!.name)).join(", ") : null;
            return (
              <li key={p.id + (p.top ? "-top" : "")}>
                <span>
                  <Link href={`/cellar/${ing.id}`}>{pick(ing.name)}</Link>
                  {from && <small className="instead">{t("insteadOf", { name: from })}</small>}
                </span>
                <span>{formatAmount(p.ml, lang, p.top, ing.category)}</span>
              </li>
            );
          })}
        </ul>

        <h2>{t("method")}</h2>
        <ol className="steps">
          {METHOD_STEPS[c.method][lang].map((s) => (
            <li key={s}>{s}</li>
          ))}
          {c.note && <li>{pick(c.note)}</li>}
          <li>
            {t("garnish")}: {pick(GARNISHES[c.garnish] ?? GARNISHES.none)}.
          </li>
        </ol>

        <h2 style={{ marginTop: 32 }}>{t("nav_lineage")}</h2>
        <p>
          <span className="eyebrow">{t("family")}</span>
          <Link href="/lineage" className="link" style={{ padding: 0, color: "var(--ink)" }}>
            {pick(root.name)} — <span className="muted">{pick(root.formula)}</span>
          </Link>
        </p>
        {parent && (
          <p>
            <span className="eyebrow">{t("descendsFrom")}</span>
            <Link href={`/cocktails/${parent.id}`}>{pick(parent.name)} →</Link>
          </p>
        )}
        {kids.length > 0 && (
          <p>
            <span className="eyebrow">{t("children")}</span>
            {kids.map((k, i) => (
              <span key={k.id}>
                {i > 0 && " · "}
                <Link href={`/cocktails/${k.id}`}>{pick(k.name)}</Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
