"use client";

import { CocktailCard } from "@/components/CocktailCard";
import { CATEGORY_LABEL, INGREDIENTS, ingredientById } from "@/data/ingredients";
import { visibleCocktails } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import type { IngredientCategory } from "@/lib/types";

export default function BarPage() {
  const { bar, toggleBar, set, world, creations, pick, t } = usePrefs();
  const owned = new Set(bar);
  const rows = visibleCocktails(world, creations).map((c) => ({
    c,
    missing: [...new Set(c.parts.map((p) => p.id))].filter((id) => !owned.has(id)),
  }));
  const ready = rows.filter((r) => r.missing.length === 0);
  const almost = rows.filter((r) => r.missing.length === 1);
  const cats = Object.keys(CATEGORY_LABEL) as IngredientCategory[];

  return (
    <>
      <header className="page-head">
        <div className="ornament">◈</div>
        <h1>{t("nav_bar")}</h1>
        <p>{t("barSub")}</p>
      </header>
      <div className="bar-groups">
        {cats.map((cat) => (
          <div key={cat} className="family">
            <span className="eyebrow">{pick(CATEGORY_LABEL[cat])}</span>
            {INGREDIENTS.filter((i) => i.category === cat).map((i) => (
              <label key={i.id} className="bottle">
                <input type="checkbox" checked={owned.has(i.id)} onChange={() => toggleBar(i.id)} />
                <i style={{ background: i.color }} />
                {pick(i.name)}
              </label>
            ))}
          </div>
        ))}
      </div>
      {bar.length > 0 && (
        <div className="row-gap">
          <button className="link" onClick={() => set({ bar: [] })}>{t("clear")}</button>
        </div>
      )}

      <section className="section">
        <h2>{t("canMake")} · {ready.length}</h2>
        {ready.length === 0 ? (
          <p className="muted">{t("nothingYet")}</p>
        ) : (
          <div className="grid">{ready.map(({ c }) => <CocktailCard key={c.id} c={c} />)}</div>
        )}
      </section>
      {almost.length > 0 && (
        <section className="section">
          <h2>{t("oneMissing")} · {almost.length}</h2>
          <div className="grid">
            {almost.map(({ c, missing }) => (
              <CocktailCard
                key={c.id}
                c={c}
                note={<p className="hint warn" style={{ margin: "6px 0 0" }}>{t("missing")}: {pick(ingredientById(missing[0])!.name)}</p>}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
