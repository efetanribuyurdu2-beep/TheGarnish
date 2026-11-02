"use client";

import { GlassArt } from "@/components/GlassArt";
import { usePrefs } from "@/lib/prefs";
import type { Glass, L } from "@/lib/types";
import { GLASS_LABEL } from "@/lib/ui";

const GLASSES: { g: Glass; color: string; text: L }[] = [
  { g: "coupe", color: "#e8c87a", text: { tr: "Şampanya için doğdu, artık buzsuz servis edilen sour'ların ve shaken kokteyllerin zarif evi.", en: "Born for champagne; now the elegant home of sours and drinks served up." } },
  { g: "martini", color: "#eef0e6", text: { tr: "Geniş ağız aromaları açar; sap, elin ısısının içkiye geçmesini engeller.", en: "The wide mouth opens aromas; the stem keeps your hand's warmth away." } },
  { g: "nicknora", color: "#f2d57a", text: { tr: "Daha küçük, daha az dökülen; modern barların favori kadehi.", en: "Smaller and spill-proof; the modern bartender's favourite." } },
  { g: "rocks", color: "#c8812e", text: { tr: "Kalın tabanlı ağır kristal. Old Fashioned ve büyük buz küresi için.", en: "Heavy crystal with a thick base. For the Old Fashioned and a big ice sphere." } },
  { g: "highball", color: "#f4f1d0", text: { tr: "Uzun ve dar: köpüğü daha uzun süre korur.", en: "Tall and narrow: keeps the fizz alive longer." } },
  { g: "flute", color: "#f3e7b5", text: { tr: "Dar gövde kabarcıkların yükselişini bir gösteriye dönüştürür.", en: "The narrow bowl turns rising bubbles into a show." } },
  { g: "wine", color: "#f05a1a", text: { tr: "Spritz'ler ve aromatik uzun içimler için geniş hazne.", en: "A generous bowl for spritzes and aromatic long drinks." } },
  { g: "mug", color: "#efe2b0", text: { tr: "Bakır soğuğu en iyi ileten metal: Moscow Mule buz gibi kalır.", en: "Copper conducts cold best: the Moscow Mule stays icy." } },
  { g: "tiki", color: "#f4d35e", text: { tr: "Polinezya tanrılarından ilham alan seramik kupalar; her bar kendi kupasını yaptırır.", en: "Ceramic mugs inspired by Polynesian gods; every bar commissions its own." } },
];

const ICE: { name: L; text: L }[] = [
  { name: { tr: "Kristal berrak buz", en: "Crystal-clear ice" }, text: { tr: "Yönlü dondurma: suyu yalıtılmış bir kapta dondurun, böylece hava kabarcıkları alta itilir. Berrak üst kısmı kesip kullanın.", en: "Directional freezing: freeze water in an insulated cooler so air is pushed down. Cut and use the clear top." } },
  { name: { tr: "Buz küresi", en: "Ice sphere" }, text: { tr: "Az yüzey alanı, yavaş erime. Sert içkiler için idealdir.", en: "Low surface area, slow melt. Ideal for spirit-forward drinks." } },
  { name: { tr: "Kırık buz", en: "Crushed ice" }, text: { tr: "Hızlı soğutur ve sulandırır. Tiki, julep ve swizzle'lar için.", en: "Chills and dilutes fast. For tiki, juleps and swizzles." } },
  { name: { tr: "Collins sütunu", en: "Collins spear" }, text: { tr: "Highball bardağının boyunda tek parça buz: Japon highball'larının sırrı.", en: "A single glass-length spear: the secret of the Japanese highball." } },
];

const GARNISH: { name: L; text: L }[] = [
  { name: { tr: "Kabuk bükme (twist)", en: "The twist" }, text: { tr: "Kabuğu bardağın üzerinde sıkın; yağları içkinin yüzeyine püskürür. Sonra kenara sürtün.", en: "Express the peel over the glass so its oils mist the surface, then rub the rim." } },
  { name: { tr: "Tuz ve şeker kenar", en: "Salt & sugar rim" }, text: { tr: "Kenarın sadece yarısını kaplayın, misafir tercih etsin.", en: "Rim only half the glass so the guest can choose." } },
  { name: { tr: "Alevli portakal", en: "Flamed orange" }, text: { tr: "Kabuğu bir kibrit alevinin üzerinden sıkın: yağlar karamelize olur, küçük bir gösteri doğar.", en: "Squeeze the peel through a match flame: the oils caramelise in a small spectacle." } },
  { name: { tr: "Nane şaplatma", en: "Spanking mint" }, text: { tr: "Nane dalını avucunuzda bir kez şaplatın: aroması uyanır, yaprak ezilmez.", en: "Clap the mint between your palms once: it wakes the aroma without bruising." } },
];

export default function GlassIcePage() {
  const { pick, t } = usePrefs();
  return (
    <>
      <header className="page-head">
        <div className="ornament">◇</div>
        <h1>{t("nav_glass")}</h1>
        <p>{t("glassSub")}</p>
      </header>
      <section className="section">
        <h2>{t("glass")}</h2>
        <div className="guide-grid">
          {GLASSES.map(({ g, color, text }) => (
            <div key={g} className="card">
              <GlassArt glass={g} color={color} size={90} animate={false} />
              <h3>{pick(GLASS_LABEL[g])}</h3>
              <p>{pick(text)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>{t("ice")}</h2>
        <div className="grid wide">
          {ICE.map((i) => (
            <div key={i.name.en} className="card">
              <h3>{pick(i.name)}</h3>
              <p className="muted">{pick(i.text)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>{t("garnish")}</h2>
        <div className="grid wide">
          {GARNISH.map((i) => (
            <div key={i.name.en} className="card">
              <h3>{pick(i.name)}</h3>
              <p className="muted">{pick(i.text)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
