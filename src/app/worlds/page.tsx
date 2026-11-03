"use client";

import { useEffect, useState } from "react";
import { Echo } from "@/components/Echo";
import { Ornament } from "@/components/Ornament";
import { Nazar } from "@/components/WorldBackdrop";
import { PALETTES, WORLDS, type World } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { PaletteId, WorldId } from "@/lib/types";

const ICON: Record<WorldId, string> = {
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

/** The world switcher: one portal per world, each dressed in its own wall, band, emblem and type. */
export default function WorldsPage() {
  const { t, pick, world, palette, travel, jazzKey, stamps } = usePrefs();
  const [open, setOpen] = useState<WorldId | null>(null);
  const [chosen, setChosen] = useState<PaletteId>(palette);
  const [pw, setPw] = useState("");
  const [wrong, setWrong] = useState(false);

  // /worlds#jazz opens that portal (links from the passport and other pages)
  useEffect(() => {
    const id = window.location.hash.slice(1) as WorldId;
    if (WORLDS.some((w) => w.id === id)) {
      setOpen(id);
      setTimeout(() => document.getElementById(`portal-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
    }
  }, []);

  const choose = (w: World) => {
    if (w.id === "maison" || (w.password && !jazzKey && world !== "jazz")) {
      setOpen(open === w.id ? null : w.id);
      setPw("");
      return;
    }
    if (w.id !== world) travel(w.id);
  };

  const tryPassword = (w: World) => {
    const norm = pw.toUpperCase().replace(/[^A-Z ]/g, "").replace(/\s+/g, " ").trim();
    if (norm.replace(/ /g, "") === w.password!.answer.replace(/ /g, "")) travel(w.id, { jazzKey: true });
    else {
      setWrong(true);
      setTimeout(() => setWrong(false), 700);
    }
  };

  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{t("nav_worlds")}</h1>
        <Echo text={t("nav_worlds")} />
        <p>{t("chooseWorldSub")}</p>
      </header>

      <div className="portals">
        {WORLDS.map((w) => {
          const here = w.id === world;
          const got = ["arrival", "tasting", "master"].filter((k) => stamps?.[`${w.id}:${k}`]).length;
          const isOpen = open === w.id;
          return (
            <article key={w.id} id={`portal-${w.id}`} className={`portal wc-${w.id} ${here ? "here" : ""} ${isOpen ? "open" : ""}`} style={{ "--c0": w.swatch[0], "--c1": w.swatch[1], "--c2": w.swatch[2] } as React.CSSProperties}>
              <button className="portal-face" onClick={() => choose(w)} aria-expanded={isOpen} aria-label={`${pick(w.name)}: ${pick(w.tagline)}`}>
                <i className="portal-band" aria-hidden />
                <span className="portal-icon" aria-hidden>{w.id === "anatolia" ? <Nazar size={34} /> : ICON[w.id]}</span>
                <span className="wc-name" lang="en">{pick(w.name)}</span>
                <span className="portal-tag">{pick(w.tagline)}</span>
                <span className="portal-bar">{pick(w.bar)}</span>
                <span className="portal-foot">
                  <span className="wc-swatch" aria-hidden>
                    {w.swatch.map((c) => <i key={c} style={{ background: c }} />)}
                  </span>
                  <span className="portal-stamps" title={t("stampsCount")}>{"●".repeat(got)}{"○".repeat(3 - got)}</span>
                </span>
                <span className="portal-cta">{here ? t("youAreHere") : `${t("travelTo")} →`}</span>
              </button>

              {isOpen && w.id === "maison" && (
                <div className="portal-step">
                  <span className="eyebrow">{t("palette")}</span>
                  <div className="palette-row">
                    {PALETTES.map((p) => (
                      <button key={p.id} className={`palette-chip ${chosen === p.id ? "on" : ""}`} onClick={() => setChosen(p.id)}>
                        <span className="pc-dot" style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 50%, ${p.swatch[1]} 50%)` }} />
                        {pick(p.name)}
                      </button>
                    ))}
                  </div>
                  <button className="btn" onClick={() => travel("maison", { palette: chosen })}>{t("enter")}</button>
                </div>
              )}
              {isOpen && w.password && (
                <form
                  className={`portal-step door ${wrong ? "shake" : ""}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    tryPassword(w);
                  }}
                >
                  <span className="eyebrow">{t("password")}</span>
                  <input className="input center" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="• • • • •" autoFocus aria-label={t("password")} />
                  <p className="hint">{pick(w.password.hint)}</p>
                  {wrong && <p className="hint warn">{t("passwordWrong")}</p>}
                  <button className="btn">{t("knock")}</button>
                </form>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
