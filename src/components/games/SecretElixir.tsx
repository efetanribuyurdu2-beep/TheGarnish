"use client";

import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { BEST, GameFrame, shuffle, useBest } from "./common";

const ELEMENTS = [
  { g: "☉", tr: "Altın", en: "Gold" },
  { g: "☽", tr: "Gümüş", en: "Silver" },
  { g: "☿", tr: "Cıva", en: "Mercury" },
  { g: "♀", tr: "Bakır", en: "Copper" },
  { g: "♂", tr: "Demir", en: "Iron" },
  { g: "♄", tr: "Kurşun", en: "Lead" },
];
const LEN = 4;
const TRIES = 8;
const newSecret = () => shuffle([0, 1, 2, 3, 4, 5]).slice(0, LEN);

function score(secret: number[], guess: number[]) {
  let exact = 0;
  let near = 0;
  guess.forEach((g, i) => {
    if (secret[i] === g) exact++;
    else if (secret.includes(g)) near++;
  });
  return { exact, near };
}

/** Alchemist: deduce the secret four-element formula. */
export function SecretElixir() {
  const { lang } = usePrefs();
  const [secret, setSecret] = useState(newSecret);
  const [rows, setRows] = useState<{ guess: number[]; exact: number; near: number }[]>([]);
  const [cur, setCur] = useState<number[]>([]);
  const { best, submit } = useBest("secret-elixir", true);
  const won = rows.some((r) => r.exact === LEN);
  const lost = !won && rows.length >= TRIES;

  const add = (e: number) => {
    if (won || lost || cur.length >= LEN || cur.includes(e)) return;
    setCur([...cur, e]);
  };
  const brew = () => {
    if (cur.length !== LEN) return;
    const r = { guess: cur, ...score(secret, cur) };
    const next = [...rows, r];
    setRows(next);
    setCur([]);
    if (r.exact === LEN) submit(next.length);
  };

  return (
    <GameFrame
      title={{ tr: "Gizli İksir", en: "The Secret Elixir" }}
      rules={{
        tr: "Simyacının formülü dört farklı elementten oluşur. Her denemeden sonra ● doğru element doğru yerde, ○ doğru element yanlış yerde demektir. 8 denemen var.",
        en: "The alchemist's formula has four different elements. After each brew, ● means right element in the right place, ○ right element in the wrong place. You have 8 tries.",
      }}
      stats={[
        { label: { tr: "Deneme", en: "Brews" }, value: `${rows.length}/${TRIES}` },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={() => {
        setSecret(newSecret());
        setRows([]);
        setCur([]);
      }}
      done={
        (won || lost) && (
          <p>
            {won
              ? lang === "tr" ? `Altın elde edildi! ${rows.length} denemede buldun.` : `Gold achieved! Solved in ${rows.length} brews.`
              : lang === "tr" ? "Kazan patladı… Formül şuydu: " : "The cauldron exploded… The formula was: "}
            {lost && <span className="glyphs">{secret.map((s) => ELEMENTS[s].g).join(" ")}</span>}
          </p>
        )
      }
    >
      <div className="elixir">
        <ol className="brews">
          {rows.map((r, i) => (
            <li key={i}>
              <span className="glyphs">{r.guess.map((g) => ELEMENTS[g].g).join(" ")}</span>
              <span className="pegs">
                {"●".repeat(r.exact)}
                {"○".repeat(r.near)}
                {"·".repeat(LEN - r.exact - r.near)}
              </span>
            </li>
          ))}
          {!won && !lost && (
            <li className="current">
              <span className="glyphs">
                {Array.from({ length: LEN }, (_, i) => (cur[i] !== undefined ? ELEMENTS[cur[i]].g : "＿")).join(" ")}
              </span>
              <span>
                <button className="link" onClick={() => setCur(cur.slice(0, -1))} disabled={!cur.length}>⌫</button>
                <button className="btn small" onClick={brew} disabled={cur.length !== LEN}>{lang === "tr" ? "Damıt" : "Brew"}</button>
              </span>
            </li>
          )}
        </ol>
        <div className="elements">
          {ELEMENTS.map((e, i) => (
            <button key={e.g} className={`element ${cur.includes(i) ? "used" : ""}`} onClick={() => add(i)} disabled={won || lost}>
              <b>{e.g}</b>
              <small>{lang === "tr" ? e.tr : e.en}</small>
            </button>
          ))}
        </div>
      </div>
    </GameFrame>
  );
}
