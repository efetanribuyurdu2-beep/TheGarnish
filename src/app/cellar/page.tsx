"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORY_LABEL, INGREDIENTS } from "@/data/ingredients";
import { usePrefs } from "@/lib/prefs";
import type { IngredientCategory } from "@/lib/types";

const ORDER = Object.keys(CATEGORY_LABEL) as IngredientCategory[];

export default function CellarPage() {
  const { pick, t, world } = usePrefs();
  const [cat, setCat] = useState<IngredientCategory | null>(null);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase();
    return INGREDIENTS.filter((i) => (!cat || i.category === cat) && (!needle || `${i.name.tr} ${i.name.en}`.toLocaleLowerCase().includes(needle)))
      // this world's highlighted ingredients first
      .sort((a, b) => Number(b.world === world) - Number(a.world === world));
  }, [cat, q, world]);

  return (
    <>
      <header className="page-head">
        <div className="ornament">❦</div>
        <h1>{t("nav_cellar")}</h1>
        <p>{t("cellarSub")}</p>
      </header>
      <div className="filters">
        <input className="input" placeholder={t("search")} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("search")} />
        <div className="chips">
          <button className={`chip ${!cat ? "on" : ""}`} onClick={() => setCat(null)}>{t("all")}</button>
          {ORDER.map((c) => (
            <button key={c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(cat === c ? null : c)}>
              {pick(CATEGORY_LABEL[c])}
            </button>
          ))}
        </div>
      </div>
      <div className="grid wide">
        {list.map((i) => (
          <Link key={i.id} href={`/cellar/${i.id}`} className="card ing-card">
            <span className="ing-swatch" style={{ background: i.color }} />
            <span>
              {i.world === world && <span className="badge" style={{ marginBottom: 6 }}>✦</span>}
              <h3>{pick(i.name)}</h3>
              <p>
                {pick(i.origin)} · {i.abv > 0 ? `${Math.round(i.abv * 100)}%` : "0%"}
              </p>
              <p style={{ marginTop: 6 }}>{pick(i.notes.nose)}</p>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
