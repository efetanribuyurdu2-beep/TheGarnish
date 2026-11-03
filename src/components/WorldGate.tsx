"use client";

import { useState } from "react";
import { PALETTES, WORLDS, type World } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { PaletteId } from "@/lib/types";
import { LogoFull } from "./Logo";
import { Nazar } from "./WorldBackdrop";

const ICON: Record<string, string> = {
  maison: "◆",
  anatolia: "",
  cosmos: "✦",
  jazz: "♫",
  sakura: "❀",
  alchemist: "☿",
  tiki: "☀",
  boreal: "❄",
  riviera: "❦",
};

export function LangToggle() {
  const { lang, set } = usePrefs();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      {(["tr", "en"] as const).map((l) => (
        <button key={l} className={lang === l ? "on" : ""} onClick={() => set({ lang: l })} aria-pressed={lang === l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function WorldGate() {
  const { t, pick, world, palette, openGate, travel, jazzKey } = usePrefs();
  const firstVisit = world === null;
  const [adult, setAdult] = useState(!firstVisit);
  const [step, setStep] = useState<{ kind: "list" } | { kind: "palette"; w: World } | { kind: "door"; w: World }>({ kind: "list" });
  const [pw, setPw] = useState("");
  const [wrong, setWrong] = useState(false);
  const [chosenPalette, setChosenPalette] = useState<PaletteId>(palette);

  const enter = (w: World, p?: PaletteId) => travel(w.id, { ...(p ? { palette: p } : {}), ...(w.password ? { jazzKey: true } : {}) });

  const choose = (w: World) => {
    if (!adult) return;
    if (w.id === "maison") setStep({ kind: "palette", w });
    else if (w.password && world !== "jazz" && !jazzKey) setStep({ kind: "door", w });
    else enter(w);
  };

  const tryPassword = (w: World) => {
    const norm = pw.toUpperCase().replace(/[^A-Z ]/g, "").replace(/\s+/g, " ").trim();
    if (norm === w.password!.answer || norm.replace(/ /g, "") === w.password!.answer.replace(/ /g, "")) enter(w);
    else {
      setWrong(true);
      setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-label={t("chooseWorld")}>
      <div className="gate-top">
        {!firstVisit && (
          <button className="link" onClick={() => openGate(false)}>
            ← {t("back")}
          </button>
        )}
        <LangToggle />
      </div>
      <div className="gate-inner">
        <div className="gate-logo">
          <LogoFull width={220} />
        </div>

        {step.kind === "list" && (
          <>
            <h1 className="gate-title">{t("chooseWorld")}</h1>
            <p className="gate-sub">{t("chooseWorldSub")}</p>
            {firstVisit && (
              <label className="age">
                <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} />
                <span>{t("age")}</span>
              </label>
            )}
            <div className={`world-grid ${adult ? "" : "locked"}`}>
              {WORLDS.map((w) => (
                <button
                  key={w.id}
                  className={`world-card wc-${w.id} ${world === w.id ? "current" : ""}`}
                  onClick={() => choose(w)}
                  disabled={!adult}
                  style={{ "--c0": w.swatch[0], "--c1": w.swatch[1], "--c2": w.swatch[2] } as React.CSSProperties}
                >
                  <span className="wc-icon">{w.id === "anatolia" ? <Nazar size={30} /> : ICON[w.id]}</span>
                  <span className="wc-name" lang="en">{pick(w.name)}</span>
                  <span className="wc-tag">{pick(w.tagline)}</span>
                  <span className="wc-swatch">
                    {w.swatch.map((c) => (
                      <i key={c} style={{ background: c }} />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {step.kind === "palette" && (
          <div className="gate-step">
            <h2 className="gate-title">{pick(step.w.name)}</h2>
            <p className="gate-sub">{t("palette")}</p>
            <div className="palette-row">
              {PALETTES.map((p) => (
                <button key={p.id} className={`palette-chip ${chosenPalette === p.id ? "on" : ""}`} onClick={() => setChosenPalette(p.id)}>
                  <span className="pc-dot" style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 50%, ${p.swatch[1]} 50%)` }} />
                  {pick(p.name)}
                </button>
              ))}
            </div>
            <div className="row-gap">
              <button className="link" onClick={() => setStep({ kind: "list" })}>← {t("back")}</button>
              <button className="btn" onClick={() => enter(step.w, chosenPalette)}>{t("enter")}</button>
            </div>
          </div>
        )}

        {step.kind === "door" && (
          <div className="gate-step door">
            <div className={`peephole ${wrong ? "shake" : ""}`}>
              <span>{t("password")}</span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                tryPassword(step.w);
              }}
            >
              <input className="input center" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="• • • • •" autoFocus aria-label={t("password")} />
              <p className="hint">{pick(step.w.password!.hint)}</p>
              {wrong && <p className="hint warn">{t("passwordWrong")}</p>}
              <div className="row-gap">
                <button type="button" className="link" onClick={() => setStep({ kind: "list" })}>← {t("back")}</button>
                <button className="btn">{t("knock")}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
