"use client";

import { useState } from "react";
import { GlassArt } from "@/components/GlassArt";
import { COCKTAILS, cocktailById } from "@/data/cocktails";
import { analyse } from "@/lib/balance";
import { usePrefs } from "@/lib/prefs";
import type { L } from "@/lib/types";
import { BEST, GameFrame, shuffle, useBest } from "./common";
import { nameLang } from "@/lib/ui";

const RIDDLES: { id: string; q: L }[] = [
  { id: "martini", q: { tr: "Ne kadar kuru olacağım her barda tartışılır. Tacım tek bir zeytindir.", en: "Every bar argues over how dry I should be. My crown is a single olive." } },
  { id: "negroni", q: { tr: "Bir kont sodayı istemedi, yerine cin istedi. Üç eşit parçayım ve kırmızıyım.", en: "A count refused the soda and asked for gin. I am three equal parts, and red." } },
  { id: "old-fashioned", q: { tr: "'Kokteyl' kelimesinin ilk tanımı benim: içki, şeker, su ve bitter.", en: "I am the first definition of the word 'cocktail': spirit, sugar, water and bitters." } },
  { id: "french-75", q: { tr: "Adımı bir savaş topundan aldım. Şampanyayla vururum.", en: "I took my name from a field gun. I hit you with champagne." } },
  { id: "espresso-martini", q: { tr: "Bir süpermodel 'beni uyandır' dedi. Üç çekirdekle süslenirim.", en: "A supermodel said 'wake me up'. I am crowned with three beans." } },
  { id: "sidecar", q: { tr: "Bir yüzbaşı Paris'e sepetli motosikletiyle geldi. Konyak ve portakalım.", en: "A captain rode into Paris by motorcycle sidecar. I am cognac and orange." } },
  { id: "mojito", q: { tr: "Hemingway'in Havana'sında nane ve limonla serinlerim, sodayla uzarım.", en: "In Hemingway's Havana I cool down with mint and lime, then stretch out with soda." } },
  { id: "vesper", q: { tr: "Bond beni çalkalanmış istedi ve bana bir çift ajanın adını verdi.", en: "Bond wanted me shaken and named me after a double agent." } },
  { id: "moscow-mule", q: { tr: "Bakır bir kupada gelirim. Ateşim zencefilden.", en: "I arrive in a copper mug. My fire comes from ginger." } },
  { id: "aviation", q: { tr: "Gökyüzü rengindeyim. Uçmamı menekşe likörü sağlar.", en: "I am the colour of the sky. Violet liqueur lets me fly." } },
  { id: "margarita", q: { tr: "Kenarım tuzludur. Tekila ve misket limonu taşırım.", en: "My rim is salted. I carry tequila and lime." } },
  { id: "pina-colada", q: { tr: "Porto Riko'nun resmî içkisiyim: hindistan cevizi ve ananas.", en: "I am Puerto Rico's official drink: coconut and pineapple." } },
  { id: "mai-tai", q: { tr: "İlk yudumda Tahitili dostlar 'Bu dünyanın dışında!' dedi.", en: "At the first sip, Tahitian friends cried 'Out of this world!'" } },
  { id: "death-afternoon", q: { tr: "Hemingway'in tarifiyim: absinthe'e opal bir süt rengi alana dek şampanya.", en: "Hemingway's recipe: champagne poured on absinthe until it turns opalescent." } },
];
const ROUNDS = 8;
const pool = COCKTAILS.filter((c) => c.world === "all" || c.world === "maison" || RIDDLES.some((r) => r.id === c.id));

const deal = () =>
  shuffle(RIDDLES)
    .slice(0, ROUNDS)
    .map((r) => ({ ...r, options: shuffle([r.id, ...shuffle(pool.filter((c) => c.id !== r.id)).slice(0, 3).map((c) => c.id)]) }));

/** Maison: the head bartender's riddles. Name the cocktail. */
export function BartenderRiddle() {
  const { pick, lang } = usePrefs();
  const [qs, setQs] = useState(deal);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const { best, submit } = useBest("bartender-riddle");
  const over = i >= qs.length;
  const q = qs[Math.min(i, qs.length - 1)];

  const answer = (id: string) => {
    if (chosen) return;
    setChosen(id);
    const ok = id === q.id;
    if (ok) setScore((s) => s + 1);
    setTimeout(() => {
      setChosen(null);
      if (i + 1 >= qs.length) submit(score + (ok ? 1 : 0));
      setI(i + 1);
    }, 1100);
  };

  return (
    <GameFrame
      title={{ tr: "Barmenin Bilmecesi", en: "The Head Bartender's Riddles" }}
      rules={{
        tr: "Şef barmen bir bilmece fısıldar. Hangi kokteyli anlattığını bul.",
        en: "The head bartender whispers a riddle. Name the cocktail it describes.",
      }}
      stats={[
        { label: { tr: "Soru", en: "Question" }, value: `${Math.min(i + 1, qs.length)}/${qs.length}` },
        { label: { tr: "Puan", en: "Score" }, value: score },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={() => {
        setQs(deal());
        setI(0);
        setScore(0);
        setChosen(null);
      }}
      done={over && <p>{lang === "tr" ? `${qs.length} bilmeceden ${score} tanesini bildin.` : `You solved ${score} of ${qs.length} riddles.`}</p>}
    >
      {!over && (
        <>
          <blockquote className="riddle">“{pick(q.q)}”</blockquote>
          <div className="riddle-options">
            {q.options.map((id) => {
              const c = cocktailById(id)!;
              const a = analyse(c.parts, c.method);
              const state = chosen ? (id === q.id ? "right" : id === chosen ? "wrong" : "") : "";
              return (
                <button key={id} className={`pick riddle-opt ${state}`} onClick={() => answer(id)}>
                  <GlassArt glass={c.glass} color={a.color} opaque={a.opaque} ice={c.ice} method={c.method} garnish={c.garnish} size={54} animate={false} />
                  <span lang={nameLang(c.name)}>{pick(c.name)}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </GameFrame>
  );
}
