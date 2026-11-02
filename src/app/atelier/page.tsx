"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FlavorRadar } from "@/components/FlavorRadar";
import { GlassArt } from "@/components/GlassArt";
import { formatAmount } from "@/components/CocktailCard";
import { COCKTAILS, GARNISHES, ROOTS } from "@/data/cocktails";
import { CATEGORY_LABEL, INGREDIENTS, ingredientById } from "@/data/ingredients";
import { analyse } from "@/lib/balance";
import { usePrefs } from "@/lib/prefs";
import type { Cocktail, Glass, Ice, IngredientCategory, Method, Part, Root } from "@/lib/types";
import { GLASS_LABEL, ICE_LABEL } from "@/lib/ui";

const METHODS: Method[] = ["shake", "dryshake", "stir", "build", "swizzle", "blend"];
const METHOD_LABEL: Record<Method, { tr: string; en: string }> = {
  shake: { tr: "Çalkala", en: "Shake" },
  dryshake: { tr: "Dry shake (köpük)", en: "Dry shake (foam)" },
  stir: { tr: "Karıştır", en: "Stir" },
  build: { tr: "Bardakta hazırla", en: "Build" },
  swizzle: { tr: "Swizzle", en: "Swizzle" },
  blend: { tr: "Blender", en: "Blend" },
};

export default function AtelierPage() {
  const { pick, t, lang, world, set, creations } = usePrefs();
  const router = useRouter();
  const [name, setName] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [method, setMethod] = useState<Method>("shake");
  const [glass, setGlass] = useState<Glass>("coupe");
  const [ice, setIce] = useState<Ice>("none");
  const [garnish, setGarnish] = useState("lemon-twist");
  const [root, setRoot] = useState<Root>("daiquiri");
  const [parent, setParent] = useState<string | undefined>();

  const a = useMemo(() => analyse(parts, method), [parts, method]);

  const add = (id: string) => {
    if (!id || parts.some((p) => p.id === id)) return;
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
      world: world ?? "maison",
      root,
      parent,
      origin: { tr: "The Atelier", en: "The Atelier" },
      glass,
      ice,
      method,
      garnish,
      parts,
      story: { tr: "Senin ellerinle, The Atelier'de yaratıldı.", en: "Created by your hand, in The Atelier." },
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
  const tilt = a.balance * 14; // degrees

  const cats = Object.keys(CATEGORY_LABEL) as IngredientCategory[];

  return (
    <>
      <header className="page-head">
        <div className="ornament">⚖</div>
        <h1>{t("nav_atelier")}</h1>
        <p>{t("atelierSub")}</p>
      </header>
      <div className="atelier">
        <div className="builder">
          <input className="input" placeholder={t("name")} value={name} onChange={(e) => setName(e.target.value)} aria-label={t("name")} />
          <div className="option-row">
            <label>
              {t("startFrom")}
              <select className="input" value="" onChange={(e) => startFrom(e.target.value)}>
                <option value="">—</option>
                {COCKTAILS.map((c) => (
                  <option key={c.id} value={c.id}>{pick(c.name)}</option>
                ))}
              </select>
            </label>
            <label>
              {t("addIngredient")}
              <select className="input" value="" onChange={(e) => add(e.target.value)}>
                <option value="">+</option>
                {cats.map((cat) => (
                  <optgroup key={cat} label={pick(CATEGORY_LABEL[cat])}>
                    {INGREDIENTS.filter((i) => i.category === cat).map((i) => (
                      <option key={i.id} value={i.id} disabled={parts.some((p) => p.id === i.id)}>{pick(i.name)}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          </div>

          {parts.length === 0 && <p className="muted" style={{ textAlign: "center", padding: 30 }}>{t("emptyAtelier")}</p>}
          {parts.map((p, idx) => {
            const ing = ingredientById(p.id)!;
            const bit = ing.category === "bitters";
            return (
              <div key={p.id} className="part-row">
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="ing-swatch" style={{ background: ing.color, width: 14, height: 18, borderRadius: 3 }} />
                    {pick(ing.name)}
                  </div>
                  <input
                    type="range"
                    min={bit ? 1 : 0}
                    max={bit ? 8 : 150}
                    step={bit ? 1 : 2.5}
                    value={p.ml}
                    onChange={(e) => setParts(parts.map((x, i) => (i === idx ? { ...x, ml: Number(e.target.value) } : x)))}
                    aria-label={pick(ing.name)}
                  />
                </div>
                <span className="part-ml">{formatAmount(p.ml, lang, p.top, ing.category)}</span>
                <button className="x" onClick={() => setParts(parts.filter((_, i) => i !== idx))} aria-label={t("remove")}>×</button>
              </div>
            );
          })}

          <div className="option-row">
            <label>
              {t("method")}
              <select className="input" value={method} onChange={(e) => setMethod(e.target.value as Method)}>
                {METHODS.map((m) => <option key={m} value={m}>{pick(METHOD_LABEL[m])}</option>)}
              </select>
            </label>
            <label>
              {t("glass")}
              <select className="input" value={glass} onChange={(e) => setGlass(e.target.value as Glass)}>
                {Object.keys(GLASS_LABEL).map((g) => <option key={g} value={g}>{pick(GLASS_LABEL[g])}</option>)}
              </select>
            </label>
            <label>
              {t("ice")}
              <select className="input" value={ice} onChange={(e) => setIce(e.target.value as Ice)}>
                {Object.keys(ICE_LABEL).map((g) => <option key={g} value={g}>{pick(ICE_LABEL[g])}</option>)}
              </select>
            </label>
            <label>
              {t("garnish")}
              <select className="input" value={garnish} onChange={(e) => setGarnish(e.target.value)}>
                {Object.keys(GARNISHES).map((g) => <option key={g} value={g}>{pick(GARNISHES[g])}</option>)}
              </select>
            </label>
            <label>
              {t("parentFamily")}
              <select className="input" value={root} onChange={(e) => setRoot(e.target.value as Root)}>
                {ROOTS.map((r) => <option key={r.id} value={r.id}>{pick(r.name)}</option>)}
              </select>
            </label>
          </div>
        </div>

        <aside className="scale-panel">
          <GlassArt key={glass + parts.length} glass={glass} color={parts.length ? a.color : "transparent"} opaque={a.opaque} ice={ice} method={method} garnish={garnish} size={150} />
          <svg className="scale" viewBox="0 0 300 124" aria-label={t("balance")}>
            <path d="M150 40 L150 104 M118 108 L182 108" stroke="currentColor" strokeWidth="2" />
            <path d="M140 108 L150 92 L160 108" fill="currentColor" />
            <g className="beam" style={{ transform: `rotate(${tilt}deg)` }}>
              <line x1="40" y1="40" x2="260" y2="40" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="150" cy="40" r="5" fill="currentColor" />
              <g transform="translate(40 40)">
                <path d="M0 0 L-18 36 M0 0 L18 36" stroke="currentColor" />
                <path d="M-24 36 Q0 50 24 36 Z" fill="currentColor" fillOpacity=".25" stroke="currentColor" />
              </g>
              <g transform="translate(260 40)">
                <path d="M0 0 L-18 36 M0 0 L18 36" stroke="currentColor" />
                <path d="M-24 36 Q0 50 24 36 Z" fill="currentColor" fillOpacity=".25" stroke="currentColor" />
              </g>
            </g>
            <text x="40" y="116" textAnchor="middle" fontSize="11" fill="currentColor">{t("tooSour")}</text>
            <text x="260" y="116" textAnchor="middle" fontSize="11" fill="currentColor">{t("tooSweet")}</text>
          </svg>
          {parts.length > 0 && (
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
                <span className="eyebrow">{t("signature")}</span>
                <h3 style={{ margin: "4px 0" }}>{name || "—"}</h3>
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
