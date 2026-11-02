"use client";

import { useMemo, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import type { L } from "@/lib/types";
import { BEST, GameFrame, useBest } from "./common";

interface Level {
  name: L;
  stars: [number, number][];
  edges: [number, number][];
}

// Each figure can be drawn in one stroke (an Euler path), but only if you pick the right start.
const LEVELS: Level[] = [
  {
    name: { tr: "Martini Takımyıldızı", en: "The Martini" },
    stars: [[70, 70], [230, 70], [150, 170], [150, 250], [105, 262], [195, 262], [215, 30]],
    edges: [[0, 1], [0, 2], [1, 2], [2, 3], [3, 4], [3, 5], [4, 5], [6, 2]],
  },
  {
    name: { tr: "Coupe Takımyıldızı", en: "The Coupe" },
    stars: [[50, 90], [250, 90], [85, 145], [150, 165], [215, 145], [150, 240], [105, 258], [195, 258]],
    edges: [[0, 1], [0, 2], [2, 3], [3, 4], [4, 1], [3, 5], [5, 6], [5, 7], [6, 7]],
  },
  {
    name: { tr: "Kutup Yıldızı", en: "The Pole Star" },
    stars: [[150, 30], [258, 110], [217, 240], [83, 240], [42, 110]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [2, 4], [4, 1], [1, 3], [3, 0]],
  },
];
const DUST = Array.from({ length: 40 }, (_, i) => [(i * 73) % 300, (i * 131) % 300, (i % 3) * 0.4 + 0.4]);
const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

/** Cosmos: connect the stars into a cocktail glass without lifting your pen. */
export function Constellation() {
  const { pick, lang } = usePrefs();
  const [lvl, setLvl] = useState(0);
  const [path, setPath] = useState<number[]>([]);
  const [fails, setFails] = useState(0);
  const { best, submit } = useBest("constellation");
  const L = LEVELS[lvl];
  const drawn = useMemo(() => {
    const s = new Set<string>();
    for (let i = 1; i < path.length; i++) s.add(key(path[i - 1], path[i]));
    return s;
  }, [path]);
  const complete = drawn.size === L.edges.length;
  const edgeSet = useMemo(() => new Set(L.edges.map(([a, b]) => key(a, b))), [L]);
  const cur = path[path.length - 1];
  const stuck = path.length > 0 && !complete && !L.edges.some(([a, b]) => (a === cur || b === cur) && !drawn.has(key(a, b)));

  const click = (i: number) => {
    if (complete) return;
    if (path.length === 0) return setPath([i]);
    const k = key(cur, i);
    if (edgeSet.has(k) && !drawn.has(k)) {
      const next = [...path, i];
      setPath(next);
      if (drawn.size + 1 === L.edges.length) submit(lvl + 1);
    }
  };
  const reset = () => {
    if (path.length > 1) setFails((f) => f + 1);
    setPath([]);
  };

  return (
    <GameFrame
      title={{ tr: "Takımyıldız", en: "Constellation" }}
      rules={{
        tr: "Kalemini kaldırmadan tüm çizgileri bir kez çiz. Doğru yıldızdan başlamak her şeydir. Takılırsan yeniden dene.",
        en: "Trace every line exactly once without lifting your pen. Choosing the right starting star is everything.",
      }}
      stats={[
        { label: { tr: "Seviye", en: "Level" }, value: `${lvl + 1}/${LEVELS.length}` },
        { label: { tr: "Deneme", en: "Retries" }, value: fails },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={() => {
        setLvl(0);
        setPath([]);
        setFails(0);
      }}
      done={
        complete && (
          <div className="row-gap">
            <p>{lang === "tr" ? `${pick(L.name)} gökyüzünde parlıyor!` : `${pick(L.name)} now shines in the sky!`}</p>
            {lvl < LEVELS.length - 1 && (
              <button className="btn" onClick={() => { setLvl(lvl + 1); setPath([]); }}>
                {lang === "tr" ? "Sonraki takımyıldız" : "Next constellation"}
              </button>
            )}
          </div>
        )
      }
    >
      <p className="game-status">
        {pick(L.name)} · {stuck ? (lang === "tr" ? "Çıkmaz! Yeniden dene." : "Dead end! Try again.") : `${drawn.size}/${L.edges.length}`}
        {path.length > 1 && !complete && (
          <button className="link" onClick={reset}>↺</button>
        )}
      </p>
      <svg className="sky" viewBox="0 0 300 300">
        {DUST.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity=".35" className="twinkle" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        {L.edges.map(([a, b]) => (
          <line key={key(a, b)} x1={L.stars[a][0]} y1={L.stars[a][1]} x2={L.stars[b][0]} y2={L.stars[b][1]} stroke="#9b7bff" strokeOpacity=".25" strokeDasharray="3 5" />
        ))}
        {path.slice(1).map((s, i) => (
          <line key={i} x1={L.stars[path[i]][0]} y1={L.stars[path[i]][1]} x2={L.stars[s][0]} y2={L.stars[s][1]} stroke={complete ? "#ff7ac8" : "#7fe6ff"} strokeWidth="2.4" strokeLinecap="round" className="ray" />
        ))}
        {L.stars.map(([x, y], i) => (
          <g key={i} onClick={() => click(i)} className={`star ${i === cur ? "cur" : ""}`}>
            <circle cx={x} cy={y} r="16" fill="transparent" />
            <circle cx={x} cy={y} r={i === cur ? 7 : 5} fill="#fff" />
            <circle cx={x} cy={y} r="11" fill="#9b7bff" opacity=".25" />
          </g>
        ))}
      </svg>
    </GameFrame>
  );
}
