"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { formatAmount } from "@/components/CocktailCard";
import { FlavorRadar } from "@/components/FlavorRadar";
import { GlassArt } from "@/components/GlassArt";
import { GARNISHES, ROOTS } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { analyse } from "@/lib/balance";
import { childrenOf, findCocktail, visibleCocktails } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import { GLASS_LABEL, ICE_LABEL, METHOD_STEPS, nameLang } from "@/lib/ui";
import { isZeroCocktail, pour } from "@/lib/zero";
import { Echo } from "@/components/Echo";
import { SharePanel } from "@/components/SharePanel";
import type { Cocktail } from "@/lib/types";
import { explain, ROLE_LABEL } from "@/lib/why";

/** `shared`: a recipe that arrived by link (see /r/[code]); `initialZero`: the version it was shared in. */
export function CocktailDetail({ id, shared, initialZero }: { id: string; shared?: Cocktail; initialZero?: boolean }) {
  const { pick, t, lang, creations, favourites, toggleFav, world, zero } = usePrefs();
  const [choice, setChoice] = useState<boolean | null>(initialZero ?? null);
  const [sharing, setSharing] = useState(false);
  const closeShare = useCallback(() => setSharing(false), []);
  const original = shared ?? findCocktail(id, creations);
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
        <div className="detail-actions">
          {!shared?.author && (
            <button className={`btn ${fav ? "" : "ghost"}`} onClick={() => toggleFav(c.id)}>
              {fav ? "♥ " + t("saved") : "♡ " + t("save")}
            </button>
          )}
          <button className="btn ghost share-btn" onClick={() => setSharing(true)} aria-haspopup="dialog">
            <ShareIcon /> {t("share")}
          </button>
        </div>
      </aside>
      {sharing && <SharePanel cocktail={original} zero={wantZero && !native} onClose={closeShare} />}
      <div>
        <span className="eyebrow">
          {c.author === "shared" ? t("signature") : c.author ? t("creations") : c.world === "all" ? t("classics") : pick(worldById(c.world).collection)}
        </span>
        <h1 lang={nameLang(c.name)}>{pick(c.name)}</h1>
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
            <Link className="link" href={`/worlds#${c.world}`}>{t("changeWorld")} →</Link>
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
                  <Link href={`/cellar/${ing.id}`} lang={nameLang(ing.name)}>{pick(ing.name)}</Link>
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

        <WhyItWorks c={c} a={a} />

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
            <Link href={`/cocktails/${parent.id}`} lang={nameLang(parent.name)}>{pick(parent.name)} →</Link>
          </p>
        )}
        {kids.length > 0 && (
          <p>
            <span className="eyebrow">{t("children")}</span>
            {kids.map((k, i) => (
              <span key={k.id}>
                {i > 0 && " · "}
                <Link href={`/cocktails/${k.id}`} lang={nameLang(k.name)}>{pick(k.name)}</Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="share-icon">
      <path d="M12 3 V15 M7 8 L12 3 L17 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12 V19 A2 2 0 0 0 7 21 H17 A2 2 0 0 0 19 19 V12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** "Neden işe yarıyor?": the recipe's roles as a proportion bar, then why it balances. */
function WhyItWorks({ c, a }: { c: Cocktail; a: ReturnType<typeof analyse> }) {
  const { pick, t } = usePrefs();
  const { segments, points } = explain(c, a);
  const total = segments.reduce((s, x) => s + x.ml, 0) || 1;
  return (
    <section className="why">
      <h2>{t("whyTitle")}</h2>
      <div className="why-bar" role="img" aria-label={segments.map((s) => `${pick(ROLE_LABEL[s.role])} ${Math.round((s.ml / total) * 100)}%`).join(", ")}>
        {segments.map((s) => (
          <span key={s.role} className={`why-seg r-${s.role}`} style={{ flexGrow: s.ml }} title={s.names.map((id) => pick(ingredientById(id)!.name)).join(", ")}>
            <b>{pick(ROLE_LABEL[s.role])}</b>
            <small>{s.names.map((id) => pick(ingredientById(id)!.name)).join(" · ")}</small>
          </span>
        ))}
      </div>
      <ul className="why-points">
        {points.map((p, i) => (
          <li key={i}>{pick(p)}</li>
        ))}
      </ul>
    </section>
  );
}
