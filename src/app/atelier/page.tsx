"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Bottle } from "@/components/Bottle";
import { formatAmount } from "@/components/CocktailCard";
import { FlavorRadar } from "@/components/FlavorRadar";
import { GarnishIcon, GlassArt } from "@/components/GlassArt";
import { Ornament } from "@/components/Ornament";
import { COCKTAILS, GARNISHES, ROOTS } from "@/data/cocktails";
import { CATEGORY_LABEL, INGREDIENTS, ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { analyse } from "@/lib/balance";
import { usePrefs } from "@/lib/prefs";
import type { Cocktail, Glass, Ice, IngredientCategory, Method, Part, Root } from "@/lib/types";
import { GLASS_LABEL, ICE_LABEL } from "@/lib/ui";

const METHODS: Method[] = ["shake", "dryshake", "stir", "build", "swizzle", "blend"];
const METHOD_LABEL: Record<Method, { tr: string; en: string }> = {
  shake: { tr: "Çalkala", en: "Shake" },
  dryshake: { tr: "Dry shake (köpük)", en: "Dry shake (foam)" },
  stir: { tr: "Karıştır", en: "Stir" },
  build: { tr: "Bardakta", en: "Build" },
  swizzle: { tr: "Swizzle", en: "Swizzle" },
  blend: { tr: "Blender", en: "Blend" },
};
const GLASSES = Object.keys(GLASS_LABEL) as Glass[];
const CATS = Object.keys(CATEGORY_LABEL) as IngredientCategory[];
const GARNISH_KEYS = Object.keys(GARNISHES).filter((g) => g !== "none");

export default function AtelierPage() {
  const { pick, t, lang, world, set, creations } = usePrefs();
  const w = worldById(world ?? "maison");
  const router = useRouter();
  const [name, setName] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [method, setMethod] = useState<Method>("shake");
  const [glass, setGlass] = useState<Glass>("coupe");
  const [ice, setIce] = useState<Ice>("none");
  const [garnish, setGarnish] = useState("lemon-twist");
  const [root, setRoot] = useState<Root>("daiquiri");
  const [parent, setParent] = useState<string | undefined>();
  const [shelf, setShelf] = useState<IngredientCategory>("spirit");

  const a = useMemo(() => analyse(parts, method), [parts, method]);
  const inRecipe = new Set(parts.map((p) => p.id));

  const toggleBottle = (id: string) => {
    if (inRecipe.has(id)) {
      setParts(parts.filter((p) => p.id !== id));
      return;
    }
    const ing = ingredientById(id)!;
    const ml = ing.category === "bitters" ? 2 : ing.category === "spirit" ? 45 : ing.category === "mixer" ? 60 : 20;
    setParts([...parts, { id, ml }]);
  };

  const startFrom = (id: string) => {
    const c = COCKTAILS.find((x) => x.id === id);
    if (!c) return;
    setParts(c.parts.map((p) => ({ ...p })));
    setMethod(c.method);
    setGlass(c.glass);
    setIce(c.ice);
    setGarnish(c.garnish);
    setRoot(c.root);
    setParent(c.id);
    setName(lang === "tr" ? `${pick(c.name)} · benim yorumum` : `${pick(c.name)} · my twist`);
  };

  const save = () => {
    if (!parts.length) return;
    const c: Cocktail = {
      id: `my-${Date.now().toString(36)}`,
      name: { tr: name || "İsimsiz İmza", en: name || "Untitled Signature" },
      world: w.id,
      root,
      parent,
      origin: w.bar,
      glass,
      ice,
      method,
      garnish,
      parts,
      story: { tr: `Senin ellerinle, ${w.bar.tr} tezgâhında yaratıldı.`, en: `Created by your hand at the counter of ${w.bar.en}.` },
      moods: [],
      author: "me",
    };
    set({ creations: [...creations, c] });
    router.push(`/cocktails/${c.id}`);
  };

  const tipText =
    a.tip?.kind === "add-acid" ? t("tipAcid", { ml: a.tip.ml ?? 0 })
    : a.tip?.kind === "add-sugar" ? t("tipSugar", { ml: a.tip.ml ?? 0 })
    : a.tip?.kind === "strong" ? t("tipStrong")
    : a.tip?.kind === "weak" ? t("tipWeak")
    : t("tipOk");
  const tilt = parts.length ? a.balance * 14 : 0;

  return (
    <>
      {/* ───── bar sign + bartender */}
      <header className="bar-sign">
        <div className="sign-board">
          <span className="sign-bulbs" aria-hidden />
          <span className="eyebrow">{t("nav_atelier")}</span>
          <h1 lang={w.id === "anatolia" ? "tr" : "en"}>{pick(w.bar)}</h1>
        </div>
        <p className="greeting">“{pick(w.greeting)}”</p>
      </header>

      {/* ───── back bar with the bottle shelf, counter with the glass and the scale */}
      <section className="bar-scene">
        <div className="backbar">
          <div className="shelf-tabs chips">
            {CATS.map((c) => (
              <button key={c} className={`chip ${shelf === c ? "on" : ""}`} onClick={() => setShelf(c)}>
                {pick(CATEGORY_LABEL[c])}
              </button>
            ))}
          </div>
          <div className="shelf">
            {INGREDIENTS.filter((i) => i.category === shelf).map((i) => (
              <button
                key={i.id}
                className={`bottle-btn ${inRecipe.has(i.id) ? "in" : ""} ${i.world === w.id ? "local" : ""}`}
                onClick={() => toggleBottle(i.id)}
                aria-pressed={inRecipe.has(i.id)}
                title={pick(i.name)}
              >
                <Bottle ing={i} size={46} />
                <span>{pick(i.name)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="counter">
          <div className="counter-glass">
            <GlassArt key={glass + parts.length} glass={glass} color={parts.length ? a.color : "transparent"} opaque={a.opaque} ice={ice} method={method} garnish={garnish} size={170} />
          </div>
          <svg className="scale" viewBox="0 0 300 124" aria-label={t("balance")}>
            <path d="M150 40 L150 104 M118 108 L182 108" stroke="currentColor" strokeWidth="2" />
            <path d="M140 108 L150 92 L160 108" fill="currentColor" />
            <g className="beam" style={{ transform: `rotate(${tilt}deg)` }}>
              <line x1="40" y1="40" x2="260" y2="40" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="150" cy="40" r="5" fill="currentColor" />
              {[40, 260].map((x) => (
                <g key={x} transform={`translate(${x} 40)`}>
                  <path d="M0 0 L-18 36 M0 0 L18 36" stroke="currentColor" />
                  <path d="M-24 36 Q0 50 24 36 Z" fill="currentColor" fillOpacity=".25" stroke="currentColor" />
                </g>
              ))}
            </g>
            <text x="40" y="118" textAnchor="middle" fontSize="11" fill="currentColor">{t("tooSour")}</text>
            <text x="260" y="118" textAnchor="middle" fontSize="11" fill="currentColor">{t("tooSweet")}</text>
          </svg>
        </div>
      </section>

      <div className="atelier">
        <div className="builder">
          <div className="option-row">
            <label>
              {t("name")}
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="…" />
            </label>
            <label>
              {t("startFrom")}
              <select className="input" value="" onChange={(e) => startFrom(e.target.value)}>
                <option value="">—</option>
                {COCKTAILS.filter((c) => c.world === "all" || c.world === w.id).map((c) => (
                  <option key={c.id} value={c.id}>{pick(c.name)}</option>
                ))}
              </select>
            </label>
          </div>

          {parts.length === 0 && <p className="muted empty-pour">{t("emptyAtelier")}</p>}
          {parts.map((p, idx) => {
            const ing = ingredientById(p.id)!;
            const bit = ing.category === "bitters";
            const max = bit ? 8 : 150;
            const min = bit ? 1 : 0;
            return (
              <div key={p.id} className="pour-row">
                <Bottle ing={ing} size={26} />
                <div className="pour-main">
                  <div className="pour-head">
                    <span>{pick(ing.name)}</span>
                    <span className="part-ml">{formatAmount(p.ml, lang, p.top, ing.category)}</span>
                  </div>
                  <input
                    type="range"
                    className="themed"
                    min={min}
                    max={max}
                    step={bit ? 1 : 2.5}
                    value={p.ml}
                    style={{ "--pct": `${((p.ml - min) / (max - min)) * 100}%` } as React.CSSProperties}
                    onChange={(e) => setParts(parts.map((x, i) => (i === idx ? { ...x, ml: Number(e.target.value) } : x)))}
                    aria-label={pick(ing.name)}
                  />
                </div>
                <button className="x" onClick={() => setParts(parts.filter((_, i) => i !== idx))} aria-label={t("remove")}>×</button>
              </div>
            );
          })}

          <Ornament />
          <span className="eyebrow">{t("glass")}</span>
          <div className="glass-picker">
            {GLASSES.map((g) => (
              <button key={g} className={`pick ${glass === g ? "on" : ""}`} onClick={() => setGlass(g)} aria-pressed={glass === g}>
                <GlassArt glass={g} color={parts.length ? a.color : "transparent"} size={44} animate={false} />
                <span>{pick(GLASS_LABEL[g])}</span>
              </button>
            ))}
          </div>

          <span className="eyebrow">{t("garnish")}</span>
          <div className="glass-picker">
            {GARNISH_KEYS.map((g) => (
              <button key={g} className={`pick small ${garnish === g ? "on" : ""}`} onClick={() => setGarnish(g)} aria-pressed={garnish === g} title={pick(GARNISHES[g])}>
                <svg width="34" height="34" viewBox="-20 -26 40 40" aria-hidden>
                  <GarnishIcon kind={g} x={0} y={0} />
                </svg>
                <span>{pick(GARNISHES[g])}</span>
              </button>
            ))}
          </div>

          <div className="option-row">
            <div>
              <span className="eyebrow">{t("method")}</span>
              <div className="chips left">
                {METHODS.map((m) => (
                  <button key={m} className={`chip ${method === m ? "on" : ""}`} onClick={() => setMethod(m)}>{pick(METHOD_LABEL[m])}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow">{t("ice")}</span>
              <div className="chips left">
                {(Object.keys(ICE_LABEL) as Ice[]).map((i) => (
                  <button key={i} className={`chip ${ice === i ? "on" : ""}`} onClick={() => setIce(i)}>{pick(ICE_LABEL[i])}</button>
                ))}
              </div>
            </div>
          </div>
          <label className="option-row single">
            <span className="eyebrow">{t("parentFamily")}</span>
            <select className="input" value={root} onChange={(e) => setRoot(e.target.value as Root)}>
              {ROOTS.map((r) => <option key={r.id} value={r.id}>{pick(r.name)}</option>)}
            </select>
          </label>
        </div>

        <aside className="scale-panel">
          {parts.length === 0 ? (
            <p className="tip">{t("emptyAtelier")}</p>
          ) : (
            <>
              <span className="badge">
                {a.style === "sour" ? t("styleSour") : a.style === "spirit" ? t("styleSpirit") : t("styleLong")}
              </span>
              <p className="tip">{tipText}</p>
              <div className="stats">
                <div className="stat"><b>{(a.abv * 100).toFixed(1)}%</b><small>{t("finalAbv")}</small></div>
                <div className="stat"><b>{Math.round(a.finalVolume)} ml</b><small>{t("volume")}</small></div>
                <div className="stat"><b>{Math.round(a.dilution * 100)}%</b><small>{t("dilution")}</small></div>
                <div className="stat"><b>{Math.round(a.kcal)}</b><small>{t("calories")}</small></div>
              </div>
              <FlavorRadar profile={a.profile} size={210} />
              <div className="menu-card">
                <span className="eyebrow">{pick(w.bar)}</span>
                <h3 lang="en" style={{ margin: "4px 0" }}>{name || "—"}</h3>
                <p className="muted" style={{ fontSize: ".82rem", margin: 0 }}>
                  {parts.map((p) => pick(ingredientById(p.id)!.name)).join(" · ")}
                </p>
              </div>
              <button className="btn" onClick={save}>{t("saveCreation")}</button>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
