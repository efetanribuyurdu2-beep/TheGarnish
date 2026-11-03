"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PALETTES, worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { UIKey } from "@/lib/ui";
import { nameLang } from "@/lib/ui";
import { LogoMark } from "./Logo";
import { MusicButton } from "./MusicButton";
import { StampToast } from "./StampToast";
import { WorldTransition } from "./WorldTransition";
import { WorldBackdrop } from "./WorldBackdrop";
import { LangToggle, WorldGate } from "./WorldGate";

const LINKS: [string, UIKey][] = [
  ["/worlds", "nav_worlds"],
  ["/cocktails", "nav_cocktails"],
  ["/book", "nav_book"],
  ["/cellar", "nav_cellar"],
  ["/atelier", "nav_atelier"],
  ["/lineage", "nav_lineage"],
  ["/concierge", "nav_concierge"],
  ["/bar", "nav_bar"],
  ["/glass-ice", "nav_glass"],
  ["/games", "nav_games"],
  ["/passport", "nav_passport"],
  ["/collection", "nav_collection"],
];

export function Shell({ children }: { children: React.ReactNode }) {
  const { ready, world, gate, t, pick, palette, set, zero } = usePrefs();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);

  if (!ready) return <div className="boot" />;
  const showGate = world === null || gate;
  const w = world ?? "maison";

  return (
    <>
      <WorldBackdrop world={w} />
      <WorldTransition />
      {showGate ? (
        <WorldGate />
      ) : (
        <>
          <header className="nav">
            <Link href="/" className="brand" aria-label="Garnish">
              <LogoMark size={38} />
              <span className="brand-text">
                <b>GARNISH</b>
                <small lang={nameLang(worldById(w).name)}>{pick(worldById(w).name)}</small>
              </span>
            </Link>
            <nav className={`nav-links ${menu ? "open" : ""}`} aria-label="Main">
              {LINKS.map(([href, key]) => (
                <Link key={href} href={href} className={path.startsWith(href) ? "active" : ""}>
                  {t(key)}
                </Link>
              ))}
            </nav>
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
              <button className="burger" aria-label={t("menu")} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
                <span />
                <span />
                <span />
              </button>
            </div>
          </header>
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
