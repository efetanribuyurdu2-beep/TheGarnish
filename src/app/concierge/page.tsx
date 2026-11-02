"use client";

import { useState } from "react";
import { CocktailCard } from "@/components/CocktailCard";
import { MOODS } from "@/data/cocktails";
import { analyse } from "@/lib/balance";
import { visibleCocktails } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import type { Flavor, Mood } from "@/lib/types";
import { Ornament } from "@/components/Ornament";
import { Echo } from "@/components/Echo";

const FLAVORS: Flavor[] = ["fresh", "sweet", "sour", "bitter", "strong", "aromatic"];

export default function ConciergePage() {
  const { world, creations, pick, t } = usePrefs();
  const [mood, setMood] = useState<Mood | null>(null);
  const [likes, setLikes] = useState<Flavor[]>([]);
  const [shown, setShown] = useState(false);

  const results = visibleCocktails(world, creations)
    .map((c) => {
      const p = analyse(c.parts, c.method).profile;
      let score = 0;
      if (mood && c.moods.includes(mood)) score += 6;
      for (const f of likes) score += p[f];
      if (c.world === world) score += 1.5;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{t("nav_concierge")}</h1>
        <Echo text={t("nav_concierge")} />
        <p>{t("conciergeSub")}</p>
      </header>
      <div className="filters">
        <span className="eyebrow">{t("setting")}</span>
        <div className="chips">
          {MOODS.map((m) => (
            <button key={m.id} className={`chip ${mood === m.id ? "on" : ""}`} onClick={() => { setMood(m.id); setShown(false); }}>
              {m.icon} {pick(m.name)}
            </button>
          ))}
        </div>
        <span className="eyebrow" style={{ marginTop: 10 }}>{t("palateQ")}</span>
        <div className="chips">
          {FLAVORS.map((f) => (
            <button
              key={f}
              className={`chip ${likes.includes(f) ? "on" : ""}`}
              onClick={() => { setLikes(likes.includes(f) ? likes.filter((x) => x !== f) : [...likes, f]); setShown(false); }}
            >
              {t(`f_${f}` as const)}
            </button>
          ))}
        </div>
        <button className="btn" style={{ marginTop: 16 }} disabled={!mood && !likes.length} onClick={() => setShown(true)}>
          {t("pour")}
        </button>
      </div>
      {shown && (
        <section className="section">
          <h2 style={{ textAlign: "center" }}>{t("recommendations")}</h2>
          <div className="grid">
            {results.map(({ c }) => (
              <CocktailCard key={c.id} c={c} note={<p className="muted" style={{ marginTop: 8 }}>{pick(c.story)}</p>} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
