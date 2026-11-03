"use client";

import { useEffect, useMemo, useState } from "react";
import { CocktailCard } from "@/components/CocktailCard";
import { MOODS, ROOTS } from "@/data/cocktails";
import { ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { visibleCocktails } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import type { Mood, Root } from "@/lib/types";
import { Ornament } from "@/components/Ornament";
import { isZeroCocktail } from "@/lib/zero";
import { Echo } from "@/components/Echo";
import { WorldMenu } from "@/components/WorldMenu";

export default function CocktailsPage() {
  const { world, creations, pick, t, zero, set } = usePrefs();
  const w = worldById(world ?? "maison");
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<"all" | "classics" | "signature">("all");
  const [root, setRoot] = useState<Root | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  // the world's menu comes first; "#all" opens the full list with search and filters
  const [view, setView] = useState<"menu" | "all">("menu");
  useEffect(() => {
    const sync = () => setView(window.location.hash === "#all" ? "all" : "menu");
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  const show = (v: "menu" | "all") => {
    window.history.pushState(null, "", v === "all" ? "#all" : window.location.pathname);
    setView(v);
    window.scrollTo({ top: 0 });
  };

  const list = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase();
    return visibleCocktails(world, creations).filter((c) => {
      if (scope === "classics" && c.world !== "all") return false;
      if (scope === "signature" && c.world === "all") return false;
      if (root && c.root !== root) return false;
      if (mood && !c.moods.includes(mood)) return false;
      if (!needle) return true;
      const hay = [c.name.tr, c.name.en, ...c.parts.flatMap((p) => { const i = ingredientById(p.id); return i ? [i.name.tr, i.name.en] : []; })]
        .join(" ")
        .toLocaleLowerCase();
      return hay.includes(needle);
    }).sort((a, b) => (zero ? Number(isZeroCocktail(b)) - Number(isZeroCocktail(a)) : 0));
  }, [world, creations, q, scope, root, mood, zero]);

  if (view === "menu") return <WorldMenu list={visibleCocktails(world, creations)} onShowAll={() => show("all")} />;

  return (
    <>
      <div className="back-to-menu">
        <button className="link" onClick={() => show("menu")}>
          ← {t("backToMenu")}
        </button>
      </div>
      <header className="page-head">
        <Ornament />
        <h1>{t("nav_cocktails")}</h1>
        <Echo text={t("nav_cocktails")} />
        <p>{t("cocktailsSub")}</p>
      </header>
      <div className="filters">
        <input className="input" placeholder={t("search")} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("search")} />
        <div className="chips">
          <button className={`chip ${scope === "all" ? "on" : ""}`} onClick={() => setScope("all")}>{t("all")}</button>
          <button className={`chip ${scope === "classics" ? "on" : ""}`} onClick={() => setScope("classics")}>{t("classics")}</button>
          <button className={`chip ${scope === "signature" ? "on" : ""}`} onClick={() => setScope("signature")}>{pick(w.collection)}</button>
          <button className={`chip ${zero ? "on" : ""}`} onClick={() => set({ zero: !zero })} aria-pressed={zero}>0% · {t("zeroMode")}</button>
        </div>
        {zero && <p className="zero-banner">{t("zeroModeOn")}</p>}
        <div className="chips">
          {ROOTS.map((r) => (
            <button key={r.id} className={`chip ${root === r.id ? "on" : ""}`} onClick={() => setRoot(root === r.id ? null : r.id)}>
              {pick(r.name)}
            </button>
          ))}
        </div>
        <div className="chips">
          {MOODS.map((m) => (
            <button key={m.id} className={`chip ${mood === m.id ? "on" : ""}`} onClick={() => setMood(mood === m.id ? null : m.id)}>
              {m.icon} {pick(m.name)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid">
        {list.map((c) => (
          <CocktailCard key={c.id} c={c} />
        ))}
      </div>
    </>
  );
}
