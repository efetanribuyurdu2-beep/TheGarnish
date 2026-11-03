"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { PALETTES, worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { L } from "@/lib/types";
import { nameLang, type UIKey } from "@/lib/ui";
import { LogoMark } from "./Logo";
import { LangToggle } from "./WorldGate";

/**
 * Every page of the site in one place, opened from the GARNISH logo (or the menu
 * button) instead of a row of tabs. The panel is drawn in the world's hand: its
 * pattern runs down the edge, its corners and section glyphs come from the theme
 * kit, and it is headed by the world's bar.
 */

type Item = [href: string, key: UIKey, sub: L];
const l = (tr: string, en: string): L => ({ tr, en });

const GROUPS: { title: L; items: Item[] }[] = [
  {
    title: l("Bar", "The bar"),
    items: [
      ["/cocktails", "nav_cocktails", l("Bu dünyanın menüsü", "This world's menu")],
      ["/book", "nav_book", l("Herkesin bildiği klasikler", "The classics everyone knows")],
      ["/atelier", "nav_atelier", l("Kendi kokteylini yap", "Make your own cocktail")],
      ["/bar", "nav_bar", l("Evdeki şişelerle ne yapılır", "What your bottles can make")],
    ],
  },
  {
    title: l("Keşif", "Discover"),
    items: [
      ["/cellar", "nav_cellar", l("211 malzeme, tadım notlarıyla", "211 ingredients, with tasting notes")],
      ["/lineage", "nav_lineage", l("Kokteyllerin soy ağacı", "The family tree of cocktails")],
      ["/glass-ice", "nav_glass", l("Kadeh, buz ve garnitür", "Glass, ice and garnish")],
      ["/concierge", "nav_concierge", l("Ruh haline göre öneri", "A suggestion for your mood")],
    ],
  },
  {
    title: l("Yolculuk", "The journey"),
    items: [
      ["/worlds", "nav_worlds", l("Başka bir dünyaya geç", "Travel to another world")],
      ["/passport", "nav_passport", l("Damgaların ve vizelerin", "Your stamps and visas")],
      ["/games", "nav_games", l("Her dünyanın oyunu", "A game in every world")],
      ["/collection", "nav_collection", l("Kaydettiklerin, basılı menü", "Your saved drinks, a printable menu")],
    ],
  },
];

export function GarnishMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { world, pick, t, palette, set } = usePrefs();
  const path = usePathname();
  const w = worldById(world ?? "maison");
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={`gm gm-${w.id} ${open ? "open" : ""}`} aria-hidden={!open} inert={!open}>
      <button className="gm-scrim" aria-label={t("close")} tabIndex={-1} onClick={onClose} />
      <div className="gm-panel" ref={panel} role="dialog" aria-modal="true" aria-label={t("menu")}>
        <span className="gm-edge" aria-hidden />
        <span className="wm-corner tr" aria-hidden />
        <span className="wm-corner br" aria-hidden />
        <header className="gm-head">
          <Link href="/" className="gm-home" onClick={onClose}>
            <LogoMark size={42} />
            <span>
              <b>GARNISH</b>
              <small lang={nameLang(w.bar)}>{pick(w.bar)}</small>
            </span>
          </Link>
          <button className="gm-close" onClick={onClose} aria-label={t("close")}>
            ✕
          </button>
        </header>
        <p className="gm-greeting">{pick(w.greeting)}</p>
        <div className="gm-lang">
          <LangToggle />
        </div>
        {w.id === "maison" && (
          <div className="gm-palette palette-mini" role="group" aria-label={t("palette")}>
            <span>{t("palette")}</span>
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
        <nav className="gm-groups" aria-label="Main">
          {GROUPS.map((g) => (
            <section key={g.title.en} className="gm-group">
              <h2 className="gm-group-title">{pick(g.title)}</h2>
              <ul>
                {g.items.map(([href, key, sub]) => (
                  <li key={href}>
                    <Link href={href} onClick={onClose} className={path.startsWith(href) ? "on" : ""} aria-current={path.startsWith(href) ? "page" : undefined}>
                      <span className="gm-name">{t(key)}</span>
                      <span className="gm-sub">{pick(sub)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
    </div>
  );
}
