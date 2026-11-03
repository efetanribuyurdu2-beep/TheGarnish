"use client";

import Link from "next/link";
import { analyse } from "@/lib/balance";
import { usePrefs } from "@/lib/prefs";
import { isZeroCocktail, pour } from "@/lib/zero";
import type { Cocktail } from "@/lib/types";
import { ingredientById } from "@/data/ingredients";
import { GlassArt } from "./GlassArt";
import { nameLang } from "@/lib/ui";

export function CocktailCard({ c: original, note }: { c: Cocktail; note?: React.ReactNode }) {
  const { pick, favourites, toggleFav, t, zero } = usePrefs();
  const native = isZeroCocktail(original);
  const { c, swapped } = pour(original, zero);
  const a = analyse(c.parts, c.method);
  const fav = favourites.includes(c.id);
  return (
    <article className={`card cocktail-card ${c.world !== "all" ? "signature" : ""}`}>
      <button className={`fav ${fav ? "on" : ""}`} onClick={() => toggleFav(c.id)} aria-pressed={fav} aria-label={fav ? t("saved") : t("save")}>
        {fav ? "♥" : "♡"}
      </button>
      <Link href={`/cocktails/${c.id}`} className="card-link">
        <div className="card-glass">
          <GlassArt glass={c.glass} color={a.color} opaque={a.opaque} ice={c.ice} method={c.method} garnish={c.garnish} size={84} animate={false} />
        </div>
        {c.world !== "all" && <span className="badge">{c.author ? t("creations") : t("signature")}</span>}
        {(native || swapped) && <span className="badge zero" title={native ? t("zeroNative") : t("zeroVersion")}>0%</span>}
        <h3 lang={nameLang(c.name)}>{pick(c.name)}</h3>
        <p className="card-ings">
          {c.parts
            .filter((p) => p.ml > 0 && p.ml >= 5)
            .map((p) => {
              const ing = ingredientById(p.id);
              return ing ? pick(ing.name) : p.id;
            })
            .join(" · ")}
        </p>
        <p className="card-meta">
          {(a.abv * 100).toFixed(0)}% · {Math.round(a.finalVolume)} ml
        </p>
        {note}
      </Link>
    </article>
  );
}

export { formatAmount } from "@/lib/ui";
