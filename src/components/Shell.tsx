"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PALETTES, worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { UIKey } from "@/lib/ui";
import { LogoMark } from "./Logo";
import { MusicButton } from "./MusicButton";
import { WorldBackdrop } from "./WorldBackdrop";
import { LangToggle, WorldGate } from "./WorldGate";

const LINKS: [string, UIKey][] = [
  ["/cocktails", "nav_cocktails"],
  ["/cellar", "nav_cellar"],
  ["/atelier", "nav_atelier"],
  ["/lineage", "nav_lineage"],
  ["/concierge", "nav_concierge"],
  ["/bar", "nav_bar"],
  ["/glass-ice", "nav_glass"],
  ["/games", "nav_games"],
  ["/collection", "nav_collection"],
];

export function Shell({ children }: { children: React.ReactNode }) {
  const { ready, world, gate, openGate, t, pick, palette, set } = usePrefs();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);

  if (!ready) return <div className="boot" />;
  const showGate = world === null || gate;
  const w = world ?? "maison";

  return (
    <>
      <WorldBackdrop world={w} />
      {showGate ? (
        <WorldGate />
      ) : (
        <>
          <header className="nav">
            <Link href="/" className="brand" aria-label="Garnish">
              <LogoMark size={38} />
              <span className="brand-text">
                <b>GARNISH</b>
                <small>{pick(worldById(w).name)}</small>
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
              <MusicButton />
              <LangToggle />
              <button className="btn ghost small" onClick={() => openGate(true)}>
                {t("changeWorld")}
              </button>
              <button className="burger" aria-label={t("menu")} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
                <span />
                <span />
                <span />
              </button>
            </div>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            <LogoMark size={28} />
            <p>{t("footer")}</p>
          </footer>
        </>
      )}
    </>
  );
}
