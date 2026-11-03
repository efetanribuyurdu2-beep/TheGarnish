"use client";

import Link from "next/link";
import { CocktailCard } from "@/components/CocktailCard";
import { LogoFull } from "@/components/Logo";
import { COCKTAILS } from "@/data/cocktails";
import { worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { L, WorldId } from "@/lib/types";
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

/** The first thing a visitor hears on arriving: the host inviting them to open the menu. */
const INVITE: Record<WorldId, L> = {
  maison: { tr: "Masanız hazır. Le Grand Bar'ın menüsünü getirmemi ister misiniz?", en: "Your table is ready. Shall I bring you Le Grand Bar's menu?" },
  anatolia: { tr: "Hoş geldiniz, buyurun oturun. Meyhanenin listesi masanızda; bir göz atmaz mısınız?", en: "Welcome, please sit. The meyhane's list is on your table; won't you take a look?" },
  cosmos: { tr: "Kalkışa hazırız. Uçuş manifestosu açılmayı bekliyor, kaptan.", en: "Ready for launch. The flight manifest is waiting to be opened, captain." },
  jazz: { tr: "Parola doğru. Kapı arkanızda kapandı; menü yalnızca üyeler için. Bir bakın.", en: "The password is right. The door has closed behind you; the menu is for members only. Take a look." },
  sakura: { tr: "İrasshaimase. Oshinagaki'miz sizi bekliyor; bu akşamın mevsimini seçin.", en: "Irasshaimase. Our oshinagaki awaits; choose tonight's season." },
  alchemist: { tr: "Formül kitabı açık, kazan ısınıyor. Hangi iksirin tarifini istersiniz?", en: "The formulary is open and the cauldron warming. Which elixir shall it be?" },
  tiki: { tr: "Aloha! Grog defterimiz bambu tezgâhta; bir sayfa çevirin.", en: "Aloha! Our grog log is on the bamboo bar; turn a page." },
  boreal: { tr: "Ateş yanıyor, kar dışarıda kaldı. Huş kabuğu menümüzü açın.", en: "The fire is lit and the snow left outside. Open our birch-bark menu." },
  riviera: { tr: "Benvenuti. Kara tahtada bu akşamın spritzleri ve şarapları yazılı.", en: "Benvenuti. Tonight's spritzes and wines are on the chalkboard." },
};

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
          <div className="hero-invite">
            <p className="hero-invite-line">{pick(INVITE[w.id])}</p>
            <div className="row-gap hero-cta">
              <Link href="/cocktails" className="btn hero-menu-btn">
                {t("openMenu")} →
              </Link>
              <Link href="/book" className="btn ghost">
                {t("nav_book")}
              </Link>
            </div>
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
