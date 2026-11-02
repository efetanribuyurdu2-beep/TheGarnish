"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { BEST, GameFrame, useBest } from "./common";

const KEYS = [60, 62, 64, 65, 67, 69, 71]; // C D E F G A B
const NAMES = ["C", "D", "E", "F", "G", "A", "B"];
const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12);

/** Jazz Bar: the pianist plays a phrase, you play it back. One note longer each round. */
export function PianoMemory() {
  const { lang } = usePrefs();
  const ctx = useRef<AudioContext | null>(null);
  const [seq, setSeq] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "listen" | "play" | "over">("idle");
  const { best, submit } = useBest("piano-memory");
  const round = Math.max(0, seq.length - (phase === "over" ? 1 : 0));

  const note = (k: number, dur = 0.45) => {
    const c = (ctx.current ??= new AudioContext());
    const t = c.currentTime;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 2.4);
    g.connect(c.destination);
    for (const [type, mult, vol] of [["triangle", 1, 1], ["sine", 2, 0.3]] as const) {
      const o = c.createOscillator();
      const og = c.createGain();
      o.type = type;
      o.frequency.value = mtof(KEYS[k]) * mult;
      og.gain.value = vol;
      o.connect(og).connect(g);
      o.start(t);
      o.stop(t + dur * 2.5);
    }
    setLit(k);
    setTimeout(() => setLit((l) => (l === k ? null : l)), dur * 700);
  };

  const playback = (s: number[]) => {
    setPhase("listen");
    s.forEach((k, i) => setTimeout(() => note(k), 650 * i + 500));
    setTimeout(() => {
      setPhase("play");
      setPos(0);
    }, 650 * s.length + 500);
  };

  const start = () => {
    const s = [Math.floor(Math.random() * 7)];
    setSeq(s);
    playback(s);
  };

  useEffect(() => () => void ctx.current?.close(), []);

  const press = (k: number) => {
    if (phase !== "play") {
      note(k);
      return;
    }
    note(k);
    if (seq[pos] !== k) {
      setPhase("over");
      submit(seq.length - 1);
      return;
    }
    if (pos + 1 === seq.length) {
      const next = [...seq, Math.floor(Math.random() * 7)];
      setSeq(next);
      setTimeout(() => playback(next), 700);
    } else setPos(pos + 1);
  };

  const status =
    phase === "idle" ? (lang === "tr" ? "Hazır olduğunda başla." : "Start when you're ready.")
    : phase === "listen" ? (lang === "tr" ? "Dinle…" : "Listen…")
    : phase === "play" ? (lang === "tr" ? "Şimdi sen çal." : "Your turn.")
    : lang === "tr" ? `Yanlış nota! ${round} tur dayandın.` : `Wrong note! You lasted ${round} rounds.`;

  return (
    <GameFrame
      title={{ tr: "Piyano Hafızası", en: "The Pianist's Riddle" }}
      rules={{
        tr: "Speakeasy'nin piyanisti bir melodi çalar, sen aynısını tekrar edersin. Her turda melodi bir nota uzar.",
        en: "The speakeasy pianist plays a phrase; you play it back. Each round the phrase grows by one note.",
      }}
      stats={[
        { label: { tr: "Tur", en: "Round" }, value: round },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={start}
    >
      <p className="game-status">{status}</p>
      <div className="piano">
        {KEYS.map((_, k) => (
          <button key={k} className={`pkey ${lit === k ? "lit" : ""}`} onPointerDown={() => press(k)} aria-label={NAMES[k]}>
            <span>{NAMES[k]}</span>
          </button>
        ))}
        {[0, 1, 3, 4, 5].map((k) => (
          <i key={k} className="pblack" style={{ left: `calc(${((k + 1) / 7) * 100}% - 4.5%)` }} />
        ))}
      </div>
      {(phase === "idle" || phase === "over") && (
        <div className="row-gap">
          <button className="btn" onClick={start}>
            {phase === "idle" ? (lang === "tr" ? "Başla" : "Start") : lang === "tr" ? "Tekrar" : "Again"}
          </button>
        </div>
      )}
    </GameFrame>
  );
}
