"use client";

import Link from "next/link";
import { ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { analyse } from "@/lib/balance";
import { usePrefs } from "@/lib/prefs";
import type { Cocktail, L, Root, WorldId } from "@/lib/types";
import { isZeroCocktail, pour } from "@/lib/zero";

/**
 * The world's own printed menu: the first thing a visitor sees on /cocktails.
 * Every world sets its menu in its own way: an Art Deco carte, a meyhane list
 * under an arch, a flight manifest, a speakeasy card with prices in cents, a
 * vertical oshinagaki, an apothecary's formulary, a bamboo grog log, a birch
 * bark scroll and a bistro chalkboard.
 */

type Mark = (c: Cocktail, i: number, abv: number) => string;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX"];
const KANJI = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const kanji = (n: number) => (n <= 10 ? KANJI[n - 1] : n < 20 ? `十${KANJI[n - 11]}` : `${KANJI[Math.floor(n / 10) - 1]}十${n % 10 ? KANJI[(n % 10) - 1] : ""}`);
const arabic = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
/** classical planet signs for the six families (present in ordinary fonts, unlike the alchemical block) */
const PLANET: Record<Root, string> = { oldfashioned: "♄", martini: "☿", daiquiri: "☽", sidecar: "☉", highball: "♃", flip: "♀" };

const MARK: Record<WorldId, Mark> = {
  maison: (_c, i) => `No. ${ROMAN[i] ?? i + 1}`,
  anatolia: (_c, i) => arabic(i + 1),
  cosmos: (c) => {
    const h = hash(c.id);
    return `${String(h % 24).padStart(2, "0")}h ${String((h >> 5) % 60).padStart(2, "0")}m · ${(h >> 11) % 2 ? "+" : "−"}${(h >> 12) % 89}°`;
  },
  jazz: (_c, _i, abv) => `${abv > 0.24 ? 50 : abv > 0.14 ? 35 : abv > 0.01 ? 25 : 15}¢`,
  sakura: (_c, i) => kanji(i + 1),
  alchemist: (c) => PLANET[c.root],
  tiki: (_c, _i, abv) => "●".repeat(abv > 0.24 ? 3 : abv > 0.13 ? 2 : abv > 0.01 ? 1 : 0).padEnd(3, "○"),
  boreal: (_c, _i, abv) => `❄ ${Math.round(abv * 100)}°`,
  riviera: (c, i) => c.year ?? `N° ${i + 1}`,
};

const HEAD: Record<WorldId, { kicker: L; foot: L }> = {
  maison: { kicker: { tr: "Carte des Cocktails", en: "Carte des Cocktails" }, foot: { tr: "Her kokteyl siparişle, kristal kadehte hazırlanır.", en: "Every cocktail is mixed to order and served in crystal." } },
  anatolia: { kicker: { tr: "Fasıl · Kadeh · Meze", en: "Fasıl · Glass · Meze" }, foot: { tr: "Şerefe! Masanıza bir tabak leblebi ve kavun ikramımızdır.", en: "Şerefe! A plate of roasted chickpeas and melon comes with every table." } },
  cosmos: { kicker: { tr: "Uçuş Manifestosu · Sektör 9", en: "Flight Manifest · Sector 9" }, foot: { tr: "Koordinatlar yaklaşıktır. Yer çekimi bu katta isteğe bağlıdır.", en: "Coordinates approximate. Gravity on this deck is optional." } },
  jazz: { kicker: { tr: "Yalnızca üyeler · Est. 1923", en: "Members only · Est. 1923" }, foot: { tr: "Kapıdaki adama parolayı fısılda. Kimseye söyleme.", en: "Whisper the password to the man at the door. Tell no one." } },
  sakura: { kicker: { tr: "お品書き · Oshinagaki", en: "お品書き · Oshinagaki" }, foot: { tr: "Buz elde yontulur. Bir yudum, bir mevsim.", en: "Ice is carved by hand. One sip, one season." } },
  alchemist: { kicker: { tr: "Liber Potionum · Formüller ve İksirler", en: "Liber Potionum · Formulae & Elixirs" }, foot: { tr: "Her işaret bir aileyi gösterir: ♄ ağır, ☿ berrak, ☽ ekşi, ☉ altın, ♃ ferah, ♀ kadifemsi.", en: "Each sign marks a family: ♄ weighty, ☿ clear, ☽ sour, ☉ golden, ♃ airy, ♀ velvety." } },
  tiki: { kicker: { tr: "Grog Defteri · Lagün Barı", en: "Grog Log · Lagoon Bar" }, foot: { tr: "● Mana gücü: ne kadar dolu, o kadar sert. Mahalo!", en: "● Mana strength: the fuller, the stronger. Mahalo!" } },
  boreal: { kicker: { tr: "Меню · Meny · Menü", en: "Меню · Meny · Menu" }, foot: { tr: "❄ Derece, alkol oranıdır. Skål! На здоровье!", en: "❄ Degrees mean strength. Skål! На здоровье!" } },
  riviera: { kicker: { tr: "La Carte · Il Menù · Το Μενού", en: "La Carte · Il Menù · Το Μενού" }, foot: { tr: "Yıllar, kokteylin doğduğu bağ bozumudur. Santé · Salute · Γειά μας!", en: "Years are each cocktail's vintage. Santé · Salute · Γειά μας!" } },
};

const nameLang = (l: L) => (l.tr === l.en ? "en" : undefined);

function Item({ c, i, world }: { c: Cocktail; i: number; world: WorldId }) {
  const { pick, zero } = usePrefs();
  const shown = pour(c, zero).c;
  const a = analyse(shown.parts, shown.method);
  const ings = shown.parts
    .filter((p) => p.ml >= 5)
    .slice(0, 4)
    .map((p) => {
      const ing = ingredientById(p.id);
      return ing ? pick(ing.name) : p.id;
    })
    .join(" · ");
  return (
    <li className="wm-item">
      <Link href={`/cocktails/${c.id}`}>
        <span className="wm-name" lang={nameLang(c.name)}>
          {pick(c.name)}
          {(isZeroCocktail(c) || zero) && <small className="wm-zero">0%</small>}
        </span>
        <span className="wm-leader" aria-hidden />
        <span className="wm-mark">{MARK[world](c, i, a.abv)}</span>
        <span className="wm-ings">{ings}</span>
      </Link>
    </li>
  );
}

function Section({ title, list, world, offset = 0 }: { title: string; list: Cocktail[]; world: WorldId; offset?: number }) {
  if (!list.length) return null;
  return (
    <section className="wm-section">
      <h2 className="wm-section-title">
        <span>{title}</span>
      </h2>
      <ol className="wm-list">
        {list.map((c, i) => (
          <Item key={c.id} c={c} i={i + offset} world={world} />
        ))}
      </ol>
    </section>
  );
}

export function WorldMenu({ list, onShowAll }: { list: Cocktail[]; onShowAll: () => void }) {
  const { world, pick, t } = usePrefs();
  const id = world ?? "maison";
  const w = worldById(id);
  const head = HEAD[id];
  const signatures = list.filter((c) => c.world === id && !c.author);
  const own = list.filter((c) => c.author);
  const classics = list.filter((c) => c.world === "all");

  return (
    <div className={`wmenu wmenu-${id}`}>
      <article className="wm-card" aria-label={`${pick(w.bar)} · ${head.kicker.en}`}>
        <span className="wm-corner tl" aria-hidden />
        <span className="wm-corner tr" aria-hidden />
        <span className="wm-corner bl" aria-hidden />
        <span className="wm-corner br" aria-hidden />
        <header className="wm-head">
          <span className="wm-emblem" aria-hidden />
          <p className="wm-kicker" lang={nameLang(head.kicker)}>
            {pick(head.kicker)}
          </p>
          <h1 className="wm-title" lang={nameLang(w.bar)}>
            {pick(w.bar)}
          </h1>
          <p className="wm-greeting">{pick(w.greeting)}</p>
        </header>
        <div className="wm-body">
          <Section title={pick(w.collection)} list={signatures} world={id} />
          {own.length > 0 && <Section title={t("creations")} list={own} world={id} offset={signatures.length} />}
          <Section title={t("classics")} list={classics} world={id} offset={signatures.length + own.length} />
        </div>
        <footer className="wm-foot">
          {id === "sakura" && (
            <span className="wm-hanko" aria-hidden>
              花見
            </span>
          )}
          <p>{pick(head.foot)}</p>
        </footer>
      </article>
      <div className="row-gap">
        <button className="btn ghost" onClick={onShowAll}>
          {t("allRecipes")} →
        </button>
      </div>
    </div>
  );
}
