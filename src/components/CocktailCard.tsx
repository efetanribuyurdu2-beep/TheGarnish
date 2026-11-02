"use client";

import Link from "next/link";
import { analyse } from "@/lib/balance";
import { usePrefs } from "@/lib/prefs";
import type { Cocktail } from "@/lib/types";
import { ingredientById } from "@/data/ingredients";
import { GlassArt } from "./GlassArt";

export function CocktailCard({ c, note }: { c: Cocktail; note?: React.ReactNode }) {
  const { pick, favourites, toggleFav, t } = usePrefs();
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
        <h3>{pick(c.name)}</h3>
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

export function formatAmount(ml: number, lang: "tr" | "en", top?: boolean, ingCategory?: string) {
  if (ml === 0) return lang === "tr" ? "bir avuç" : "a handful";
  if (ingCategory === "bitters" || (ml <= 3 && ingCategory !== "citrus")) {
    const d = Math.round(ml);
    return lang === "tr" ? `${d} dash` : `${d} dash${d > 1 ? "es" : ""}`;
  }
  const s = `${Number.isInteger(ml) ? ml : ml.toFixed(1)} ml`;
  return top ? (lang === "tr" ? `${s} (üzerine)` : `top ${s}`) : s;
}
