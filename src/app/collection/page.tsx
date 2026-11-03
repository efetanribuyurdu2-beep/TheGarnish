"use client";

import Link from "next/link";
import { useState } from "react";
import { shareCode } from "@/lib/share";
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
  const { favourites, creations, pick, t, lang, set, world, palette, zero, traveller } = usePrefs();
  const [pdf, setPdf] = useState<"idle" | "busy" | "error">("idle");
  const saved = favourites.map((id) => findCocktail(id, creations)).filter(Boolean) as Cocktail[];
  const menu = [...creations, ...saved.filter((s) => !s.author)];

  // a real PDF, made on the server: window.print() does nothing in phone in-app browsers
  const downloadPdf = async () => {
    setPdf("busy");
    try {
      const o = { world: world ?? "maison", palette, lang, zero };
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ codes: menu.map((c) => shareCode(c, o)), by: traveller.trim() || undefined }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const file = new File([await res.blob()], `garnish-menu-${o.world}.pdf`, { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60000);
      setPdf("idle");
    } catch {
      setPdf("error");
    }
  };

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
            <button className="btn" onClick={downloadPdf} disabled={pdf === "busy"} aria-busy={pdf === "busy"}>
              {pdf === "busy" ? t("pdfBusy") : t("downloadPdf")}
            </button>
            <button className="btn ghost" onClick={() => window.print()}>{t("printMenu")}</button>
            {pdf === "error" && <p className="hint" role="alert">{t("pdfError")}</p>}
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
