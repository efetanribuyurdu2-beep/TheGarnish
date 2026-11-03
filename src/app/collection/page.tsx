"use client";

import Link from "next/link";
import { formatAmount } from "@/components/CocktailCard";
import { CocktailCard } from "@/components/CocktailCard";
import { LogoFull } from "@/components/Logo";
import { ingredientById } from "@/data/ingredients";
import { findCocktail } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import type { Cocktail } from "@/lib/types";
import { Ornament } from "@/components/Ornament";
import { Echo } from "@/components/Echo";
import { nameLang } from "@/lib/ui";

export default function CollectionPage() {
  const { favourites, creations, pick, t, lang, set } = usePrefs();
  const saved = favourites.map((id) => findCocktail(id, creations)).filter(Boolean) as Cocktail[];
  const menu = [...creations, ...saved.filter((s) => !s.author)];

  return (
    <>
      <header className="page-head no-print">
        <Ornament />
        <h1>{t("nav_collection")}</h1>
        <Echo text={t("nav_collection")} />
        <p>{t("collectionSub")}</p>
      </header>

      {menu.length === 0 ? (
        <p className="muted" style={{ textAlign: "center" }}>
          {t("emptyCollection")} <Link href="/cocktails" className="btn ghost small">{t("nav_cocktails")}</Link>
        </p>
      ) : (
        <>
          <div className="row-gap no-print">
            <button className="btn" onClick={() => window.print()}>{t("printMenu")}</button>
          </div>

          {creations.length > 0 && (
            <section className="section no-print">
              <h2>{t("creations")}</h2>
              <div className="grid">
                {creations.map((c) => (
                  <div key={c.id}>
                    <CocktailCard c={c} />
                    <button className="link" onClick={() => set({ creations: creations.filter((x) => x.id !== c.id), favourites: favourites.filter((f) => f !== c.id) })}>
                      × {t("remove")}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          {saved.length > 0 && (
            <section className="section no-print">
              <h2>{t("favourites")}</h2>
              <div className="grid">{saved.map((c) => <CocktailCard key={c.id} c={c} />)}</div>
            </section>
          )}

          {/* printable menu (also visible on screen as a preview) */}
          <section className="section print-menu" style={{ textAlign: "center" }}>
            <div style={{ color: "var(--accent)" }}>
              <LogoFull width={180} />
            </div>
            <div className="grid wide" style={{ marginTop: 20 }}>
              {menu.map((c) => (
                <div key={c.id} className="card" style={{ textAlign: "center" }}>
                  <h3 lang={nameLang(c.name)}>{pick(c.name)}</h3>
                  <p className="muted" style={{ fontSize: ".85rem" }}>
                    {c.parts
                      .map((p) => {
                        const i = ingredientById(p.id);
                        return i ? `${pick(i.name)} ${p.ml > 0 ? formatAmount(p.ml, lang, false, i.category) : ""}`.trim() : "";
                      })
                      .join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
