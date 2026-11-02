"use client";

import { useEffect, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import type { L } from "@/lib/types";

/** Best score kept in the visitor's browser. `lowerIsBetter` for move counters. */
export function useBest(game: string, lowerIsBetter = false) {
  const key = `garnish:best:${game}`;
  const [best, setBest] = useState<number | null>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem(key);
      if (v) setBest(Number(v));
    } catch {
      /* storage unavailable */
    }
  }, [key]);
  const submit = (score: number) => {
    setBest((b) => {
      const better = b === null || (lowerIsBetter ? score < b : score > b);
      if (!better) return b;
      try {
        localStorage.setItem(key, String(score));
      } catch {
        /* ignore */
      }
      return score;
    });
  };
  return { best, submit };
}

export function GameFrame({
  title,
  rules,
  stats,
  onRestart,
  children,
  done,
}: {
  title: L;
  rules: L;
  stats: { label: L; value: React.ReactNode }[];
  onRestart: () => void;
  children: React.ReactNode;
  done?: React.ReactNode;
}) {
  const { pick, lang } = usePrefs();
  return (
    <section className="game">
      <header className="game-head">
        <h2>{pick(title)}</h2>
        <p className="muted">{pick(rules)}</p>
      </header>
      <div className="game-stats">
        {stats.map((s) => (
          <div key={s.label.en} className="stat">
            <b>{s.value}</b>
            <small>{pick(s.label)}</small>
          </div>
        ))}
        <button className="btn ghost small" onClick={onRestart}>
          {lang === "tr" ? "Yeniden başla" : "Restart"}
        </button>
      </div>
      <div className="game-board">{children}</div>
      {done && <div className="game-done">{done}</div>}
    </section>
  );
}

export const shuffle = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

export const BEST: L = { tr: "En iyi", en: "Best" };
