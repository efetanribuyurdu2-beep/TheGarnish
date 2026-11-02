"use client";

import Link from "next/link";
import { CocktailCard } from "@/components/CocktailCard";
import { FlavorRadar } from "@/components/FlavorRadar";
import { Bottle } from "@/components/Bottle";
import { CATEGORY_LABEL, ingredientById } from "@/data/ingredients";
import { visibleCocktails } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import { Echo } from "@/components/Echo";

export function IngredientDetail({ id }: { id: string }) {
  const { pick, t, world, creations } = usePrefs();
  const ing = ingredientById(id);
  if (!ing) return <div className="page-head"><h1>404</h1></div>;
  const used = visibleCocktails(world, creations).filter((c) => c.parts.some((p) => p.id === ing.id));

  return (
    <>
      <article className="detail">
        <aside className="detail-art">
          <Bottle ing={ing} size={130} />
          <FlavorRadar profile={ing.profile} size={230} />
        </aside>
        <div>
          <span className="eyebrow">{pick(CATEGORY_LABEL[ing.category])}</span>
          <h1>{pick(ing.name)}</h1>
          <Echo text={pick(ing.name)} />
          <p className="story">{pick(ing.story)}</p>
          <div className="tasting">
            <div><span className="eyebrow">{t("nose")}</span>{pick(ing.notes.nose)}</div>
            <div><span className="eyebrow">{t("palate")}</span>{pick(ing.notes.palate)}</div>
            <div><span className="eyebrow">{t("finish")}</span>{pick(ing.notes.finish)}</div>
          </div>
          <dl className="facts">
            <div><dt>{t("origin")}</dt><dd>{pick(ing.origin)}</dd></div>
            <div><dt>{t("abv")}</dt><dd>{Math.round(ing.abv * 100)}%</dd></div>
            {ing.premium && <div><dt>{t("premium")}</dt><dd>{ing.premium}</dd></div>}
          </dl>
          {ing.swaps && ing.swaps.length > 0 && (
            <p>
              <span className="eyebrow">{t("swaps")}</span>
              {ing.swaps.map((s, i) => {
                const o = ingredientById(s);
                return o ? (
                  <span key={s}>
                    {i > 0 && " · "}
                    <Link href={`/cellar/${o.id}`}>{pick(o.name)}</Link>
                  </span>
                ) : null;
              })}
            </p>
          )}
        </div>
      </article>
      {used.length > 0 && (
        <section className="section">
          <h2>{t("usedIn")}</h2>
          <div className="grid">
            {used.map((c) => (
              <CocktailCard key={c.id} c={c} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
