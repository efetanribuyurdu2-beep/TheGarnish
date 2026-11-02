"use client";

import { useEffect, useState } from "react";
import { Bottle } from "@/components/Bottle";
import { ingredientById } from "@/data/ingredients";
import { usePrefs } from "@/lib/prefs";
import { BEST, GameFrame, shuffle, useBest } from "./common";

const PAIRS = ["raki", "pomegranate", "sumac", "pistachio-liqueur", "mastic", "turkish-coffee", "rose", "salgam"];
const deal = () => shuffle([...PAIRS, ...PAIRS]).map((id, i) => ({ key: i, id }));

/** Anatolia: match the Anatolian ingredients hidden under kilim cards. */
export function NazarMemory() {
  const { pick, lang } = usePrefs();
  const [cards, setCards] = useState(deal);
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const { best, submit } = useBest("nazar-memory", true);
  const won = found.length === PAIRS.length;

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open.map((k) => cards[k]);
    const timer = setTimeout(() => {
      if (a.id === b.id) setFound((f) => [...f, a.id]);
      setOpen([]);
    }, a.id === b.id ? 350 : 850);
    return () => clearTimeout(timer);
  }, [open, cards]);

  useEffect(() => {
    if (won) submit(moves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const flip = (k: number) => {
    if (open.length === 2 || open.includes(k) || found.includes(cards[k].id)) return;
    if (open.length === 1) setMoves((m) => m + 1);
    setOpen([...open, k]);
  };
  const restart = () => {
    setCards(deal());
    setOpen([]);
    setFound([]);
    setMoves(0);
  };

  return (
    <GameFrame
      title={{ tr: "Nazar Hafızası", en: "Evil-Eye Memory" }}
      rules={{
        tr: "Kilim kartların altında Anadolu'nun sekiz malzemesi saklı. Çiftleri en az hamlede bul; nazar değmesin!",
        en: "Eight Anatolian ingredients hide beneath the kilim cards. Find the pairs in as few moves as you can.",
      }}
      stats={[
        { label: { tr: "Hamle", en: "Moves" }, value: moves },
        { label: { tr: "Çift", en: "Pairs" }, value: `${found.length}/8` },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={restart}
      done={won && <p>{lang === "tr" ? `Maşallah! ${moves} hamlede bitirdin.` : `Maşallah! Done in ${moves} moves.`}</p>}
    >
      <div className="memory-grid">
        {cards.map((c) => {
          const ing = ingredientById(c.id)!;
          const up = open.includes(c.key) || found.includes(c.id);
          return (
            <button key={c.key} className={`mem-card ${up ? "up" : ""} ${found.includes(c.id) ? "found" : ""}`} onClick={() => flip(c.key)} aria-label={up ? pick(ing.name) : "?"}>
              <span className="mem-inner">
                <span className="mem-back" />
                <span className="mem-face">
                  <Bottle ing={ing} size={34} />
                  <small>{pick(ing.name)}</small>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </GameFrame>
  );
}
