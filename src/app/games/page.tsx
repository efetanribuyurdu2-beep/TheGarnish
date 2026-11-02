"use client";

import { useEffect, useState } from "react";
import { BartenderRiddle } from "@/components/games/BartenderRiddle";
import { Constellation } from "@/components/games/Constellation";
import { FruitCatch } from "@/components/games/FruitCatch";
import { Kintsugi } from "@/components/games/Kintsugi";
import { NazarMemory } from "@/components/games/NazarMemory";
import { PianoMemory } from "@/components/games/PianoMemory";
import { SecretElixir } from "@/components/games/SecretElixir";
import { Ornament } from "@/components/Ornament";
import { WORLDS } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import type { L, WorldId } from "@/lib/types";

const GAMES: Record<WorldId, { name: L; Comp: () => React.ReactElement }> = {
  maison: { name: { tr: "Barmenin Bilmecesi", en: "Bartender's Riddles" }, Comp: BartenderRiddle },
  anatolia: { name: { tr: "Nazar Hafızası", en: "Evil-Eye Memory" }, Comp: NazarMemory },
  cosmos: { name: { tr: "Takımyıldız", en: "Constellation" }, Comp: Constellation },
  jazz: { name: { tr: "Piyano Hafızası", en: "Pianist's Riddle" }, Comp: PianoMemory },
  sakura: { name: { tr: "Kintsugi", en: "Kintsugi" }, Comp: Kintsugi },
  alchemist: { name: { tr: "Gizli İksir", en: "Secret Elixir" }, Comp: SecretElixir },
  tiki: { name: { tr: "Meyve Yağmuru", en: "Fruit Rain" }, Comp: FruitCatch },
};

export default function GamesPage() {
  const { world, pick, t, lang } = usePrefs();
  const [game, setGame] = useState<WorldId>(world ?? "maison");
  useEffect(() => setGame(world ?? "maison"), [world]);
  const G = GAMES[game];

  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{t("nav_games")}</h1>
        <p>{t("gamesSub")}</p>
      </header>
      <div className="chips game-tabs">
        {WORLDS.map((w) => (
          <button key={w.id} className={`chip ${game === w.id ? "on" : ""}`} onClick={() => setGame(w.id)}>
            {pick(GAMES[w.id].name)}
            <small> · {pick(w.name)}</small>
          </button>
        ))}
      </div>
      {game !== world && (
        <p className="hint" style={{ textAlign: "center" }}>
          {lang === "tr" ? "Bu oyun başka bir dünyaya ait; kendi dünyasında daha da güzel." : "This game belongs to another world; it shines brightest at home."}
        </p>
      )}
      <G.Comp key={game} />
    </>
  );
}
