"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PALETTES, worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import { nameLang } from "@/lib/ui";
import { GarnishMenu } from "./GarnishMenu";
import { LogoMark } from "./Logo";
import { MusicButton } from "./MusicButton";
import { StampToast } from "./StampToast";
import { WorldTransition } from "./WorldTransition";
import { WorldBackdrop } from "./WorldBackdrop";
import { LangToggle, WorldGate } from "./WorldGate";
import { usePhase } from "@/lib/useDaytime";

export function Shell({ children }: { children: React.ReactNode }) {
  const { ready, world, gate, t, pick, palette, set, zero } = usePrefs();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);
  const closeMenu = useCallback(() => setMenu(false), []);
  usePhase(); // keeps <html data-time> in step with the clock

  if (!ready) return <div className="boot" />;
  const showGate = world === null || gate;
  const w = world ?? "maison";

  return (
    <>
      <WorldBackdrop world={w} />
      {/* the light of the hour over the world (see "TIME OF DAY" in globals.css) */}
      <div className="daylight" aria-hidden />
      <WorldTransition />
      {showGate ? (
        <WorldGate />
      ) : (
        <>
          <header className="nav">
            {/* the logo opens the menu: every page lives in one place, not in a row of tabs */}
            <button className="brand" aria-haspopup="dialog" aria-expanded={menu} onClick={() => setMenu(true)} title={t("menu")}>
              <LogoMark size={38} />
              <span className="brand-text">
                <b>GARNISH</b>
                <small lang={nameLang(worldById(w).name)}>{pick(worldById(w).name)}</small>
              </span>
              <span className="brand-caret" aria-hidden />
            </button>
            <div className="nav-tools">
              {w === "maison" && (
                <div className="palette-mini" role="group" aria-label={t("palette")}>
                  {PALETTES.map((p) => (
                    <button
                      key={p.id}
                      title={pick(p.name)}
                      aria-label={pick(p.name)}
                      className={palette === p.id ? "on" : ""}
                      onClick={() => set({ palette: p.id })}
                      style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 50%, ${p.swatch[1]} 50%)` }}
                    />
                  ))}
                </div>
              )}
              <button className={`zero-toggle ${zero ? "on" : ""}`} onClick={() => set({ zero: !zero })} aria-pressed={zero} title={t("zeroToggle")}>
                <b>0%</b>
                <span>{t("zeroMode")}</span>
              </button>
              <MusicButton />
              <LangToggle />
              <Link href="/worlds" className={`world-btn ${path.startsWith("/worlds") ? "on" : ""}`} title={t("changeWorld")} aria-label={t("changeWorld")}>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <ellipse cx="12" cy="12" rx="4.2" ry="9.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M2.5 12 H21.5 M4.5 6.5 H19.5 M4.5 17.5 H19.5" stroke="currentColor" strokeWidth="1.1" />
                </svg>
                <span>{t("nav_worlds")}</span>
              </Link>
              <button className="burger" aria-label={t("menu")} aria-haspopup="dialog" aria-expanded={menu} onClick={() => setMenu(true)}>
                <span />
                <span />
                <span />
              </button>
            </div>
          </header>
          <GarnishMenu open={menu} onClose={closeMenu} />
          <main className="main">{children}</main>
          <StampToast />
          <footer className="footer">
            <LogoMark size={28} />
            <p>{t("footer")}</p>
          </footer>
        </>
      )}
    </>
  );
}
