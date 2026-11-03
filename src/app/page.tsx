"use client";

import Link from "next/link";
import { CocktailCard } from "@/components/CocktailCard";
import { LogoFull } from "@/components/Logo";
import { COCKTAILS } from "@/data/cocktails";
import { worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { UIKey } from "@/lib/ui";
import { nameLang } from "@/lib/ui";
import { Ornament } from "@/components/Ornament";
import { Echo } from "@/components/Echo";

const FEATURES: [string, UIKey, UIKey, string][] = [
  ["/cellar", "nav_cellar", "cellarSub", "❦"],
  ["/atelier", "nav_atelier", "atelierSub", "⚖"],
  ["/lineage", "nav_lineage", "lineageSub", "⚘"],
  ["/concierge", "nav_concierge", "conciergeSub", "✧"],
  ["/bar", "nav_bar", "barSub", "◈"],
  ["/glass-ice", "nav_glass", "glassSub", "◇"],
  ["/games", "nav_games", "gamesSub", "♠"],
  ["/passport", "nav_passport", "passportSub", "✈"],
];

export default function Home() {
  const { world, pick, t } = usePrefs();
  const w = worldById(world ?? "maison");
  const signatures = COCKTAILS.filter((c) => c.world === w.id);
  const pool = [...signatures, ...COCKTAILS.filter((c) => c.world === "all")];
  const day = Math.floor(Date.now() / 86_400_000);
  const featured = pool[day % pool.length];

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow" lang={nameLang(w.name)}>{pick(w.name)}</span>
          <h1>{pick(w.tagline)}</h1>
          <Echo text={pick(w.tagline)} />
          <p>{pick(w.intro)}</p>
          <div className="row-gap hero-cta">
            <Link href="/cocktails" className="btn">
              {t("enterWorld")}
            </Link>
            <Link href="/atelier" className="btn ghost">
              {t("nav_atelier")}
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <LogoFull />
        </div>
      </section>

      <section className="section">
        <div className="page-head" style={{ marginBottom: 24 }}>
          <Ornament />
          <h2>{pick(w.collection)}</h2>
        </div>
        <div className="grid">
          {signatures.map((c) => (
            <CocktailCard key={c.id} c={c} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid wide">
          <div>
            <span className="eyebrow">{t("featured")}</span>
            <CocktailCard c={featured} note={<p className="muted" style={{ marginTop: 8 }}>{pick(featured.story)}</p>} />
          </div>
          {FEATURES.slice(0, 2).map(([href, title, sub, icon]) => (
            <Feature key={href} href={href} title={t(title)} sub={t(sub)} icon={icon} />
          ))}
        </div>
        <div className="grid wide" style={{ marginTop: 18 }}>
          {FEATURES.slice(2).map(([href, title, sub, icon]) => (
            <Feature key={href} href={href} title={t(title)} sub={t(sub)} icon={icon} />
          ))}
        </div>
      </section>
    </>
  );
}

function Feature({ href, title, sub, icon }: { href: string; title: string; sub: string; icon: string }) {
  return (
    <Link href={href} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
      <span style={{ fontSize: "2rem", color: "var(--accent)" }}>{icon}</span>
      <h3>{title}</h3>
      <p className="muted" style={{ margin: 0 }}>{sub}</p>
    </Link>
  );
}
