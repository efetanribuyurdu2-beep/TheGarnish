"use client";

import { useEffect, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { BEST, GameFrame, useBest } from "./common";

/**
 * Riviera: an Amalfi majolica tile has been broken into pieces. Slide the pieces
 * into the empty space until the tile is whole again. Shuffled with random legal
 * moves, so every board is solvable.
 */
const S = 300;

function MajolicaArt() {
  const lemon = (x: number, y: number, r: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={`M${r * 0.4} ${-r * 0.7} C${r * 1.3} ${-r * 1.5} ${r * 2.2} ${-r * 1.1} ${r * 2.2} ${-r * 1.1} C${r * 1.6} ${-r * 0.4} ${r} ${-r * 0.4} ${r * 0.4} ${-r * 0.7}Z`} fill="#5e7a2e" />
      <ellipse rx={r} ry={r * 0.74} fill="#f2c94c" />
      <ellipse cx={-r * 1.02} rx={r * 0.18} ry={r * 0.14} fill="#e0b030" />
      <ellipse cx={r * 1.02} rx={r * 0.18} ry={r * 0.14} fill="#e0b030" />
      <ellipse cx={-r * 0.3} cy={-r * 0.28} rx={r * 0.42} ry={r * 0.2} fill="#fff" opacity=".4" />
    </g>
  );
  const grapes = (x: number, y: number) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -26 C4 -36 12 -38 18 -36" stroke="#5a3a1e" strokeWidth="2.4" fill="none" />
      <path d="M2 -28 C10 -46 30 -40 28 -28 C20 -22 10 -24 2 -28Z" fill="#5e7a2e" />
      {[[0, -18], [-9, -18], [9, -18], [-14, -9], [-4.5, -9], [4.5, -9], [14, -9], [-9, 0], [0, 0], [9, 0], [-4.5, 9], [4.5, 9], [0, 18]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5.6" fill="#5a2a5f" />
          <circle cx={cx - 1.8} cy={cy - 1.8} r="1.6" fill="#fff" opacity=".4" />
        </g>
      ))}
    </g>
  );
  const olive = (x: number, y: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M-34 0 H34" stroke="#5a3a1e" strokeWidth="2" />
      {[-26, -12, 2, 16].map((dx, i) => (
        <g key={dx}>
          <path transform={`translate(${dx} 0) rotate(${i % 2 ? 30 : -30})`} d="M0 0 C4 -6 12 -8 18 -8 C12 -2 6 0 0 0Z" fill="#7d8f3a" />
          <path transform={`translate(${dx + 6} 0) rotate(${i % 2 ? -150 : 150})`} d="M0 0 C4 -6 12 -8 18 -8 C12 -2 6 0 0 0Z" fill="#9aab5a" />
        </g>
      ))}
      <ellipse cx="-4" cy="9" rx="5" ry="3.6" fill="#3a4a1a" />
      <ellipse cx="22" cy="-8" rx="5" ry="3.6" fill="#3a4a1a" />
    </g>
  );
  const wheel = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#e0b030" />
      <circle r={r * 0.86} fill="#fbf3d0" />
      <circle r={r * 0.78} fill="#f6dc6a" />
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <line key={a} x1={-r * 0.74} x2={r * 0.74} transform={`rotate(${a})`} stroke="#fbf3d0" strokeWidth="2" />
      ))}
    </g>
  );
  return (
    <g>
      <rect width={S} height={S} fill="#f4ead2" />
      {/* faint glaze crackle */}
      <g stroke="#d8c8a4" strokeWidth=".6" fill="none" opacity=".8">
        <path d="M20 120 L60 110 L80 140 M200 30 L230 60 L270 52 M120 260 L150 240 L190 270 M240 180 L270 200" />
      </g>
      {/* border: cobalt double line and a gold band */}
      <rect x="6" y="6" width={S - 12} height={S - 12} fill="none" stroke="#2a4f8a" strokeWidth="5" />
      <rect x="16" y="16" width={S - 32} height={S - 32} fill="none" stroke="#e3b341" strokeWidth="3" />
      <rect x="22" y="22" width={S - 44} height={S - 44} fill="none" stroke="#2a4f8a" strokeWidth="1.4" />
      {/* meander on top and bottom edges */}
      {[34, S - 46].map((y) => (
        <path
          key={y}
          d={Array.from({ length: 11 }, (_, u) => {
            const x = 40 + u * 20;
            return `M${x} ${y + 12} H${x + 16} V${y} H${x + 6} V${y + 8} H${x + 11} V${y + 4}`;
          }).join(" ")}
          stroke="#2a4f8a"
          strokeWidth="2"
          fill="none"
        />
      ))}
      {/* vine scrolls on the sides */}
      {[44, S - 44].map((x, i) => (
        <path key={x} d={`M${x} 80 C${x + (i ? -22 : 22)} 110 ${x + (i ? 18 : -18)} 140 ${x} 150 C${x + (i ? -22 : 22)} 170 ${x + (i ? 18 : -18)} 200 ${x} 220`} stroke="#5e7a2e" strokeWidth="3" fill="none" />
      ))}
      {/* the central rosette */}
      <circle cx="150" cy="150" r="66" fill="#2a4f8a" />
      <circle cx="150" cy="150" r="60" fill="#f4ead2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a} transform={`translate(150 150) rotate(${a})`} d="M0 -10 C-14 -24 -10 -46 0 -56 C10 -46 14 -24 0 -10Z" fill={a % 90 ? "#7d8f3a" : "#2a4f8a"} />
      ))}
      <circle cx="150" cy="150" r="14" fill="#e3b341" />
      <circle cx="150" cy="150" r="6" fill="#b8603a" />
      {/* the four corners */}
      {lemon(80, 82, 22, -30)}
      {lemon(108, 104, 14, 20)}
      {grapes(226, 92)}
      {olive(84, 226, -35)}
      {wheel(222, 222, 30)}
    </g>
  );
}

const solved = (n: number) => Array.from({ length: n * n }, (_, i) => i);

function scramble(n: number): number[] {
  const t = solved(n);
  let blank = n * n - 1;
  let prev = -1;
  for (let k = 0; k < n * n * 40; k++) {
    const x = blank % n;
    const y = Math.floor(blank / n);
    const options = [
      x > 0 ? blank - 1 : -1,
      x < n - 1 ? blank + 1 : -1,
      y > 0 ? blank - n : -1,
      y < n - 1 ? blank + n : -1,
    ].filter((c) => c >= 0 && c !== prev);
    const c = options[Math.floor(Math.random() * options.length)];
    [t[blank], t[c]] = [t[c], t[blank]];
    prev = blank;
    blank = c;
  }
  return t.every((v, i) => v === i) ? scramble(n) : t;
}

export function Majolica() {
  const { lang } = usePrefs();
  const [n, setN] = useState(3);
  const [tiles, setTiles] = useState(() => solved(3));
  const [moves, setMoves] = useState(0);
  const { best, submit } = useBest(`majolica-${n}`, true);
  const won = moves > 0 && tiles.every((v, i) => v === i);

  useEffect(() => {
    setTiles(scramble(n));
    setMoves(0);
  }, [n]);

  useEffect(() => {
    if (won) submit(moves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const blank = tiles.indexOf(n * n - 1);
  const tap = (i: number) => {
    if (won) return;
    const near = Math.abs((i % n) - (blank % n)) + Math.abs(Math.floor(i / n) - Math.floor(blank / n)) === 1;
    if (!near) return;
    const t = [...tiles];
    [t[i], t[blank]] = [t[blank], t[i]];
    setTiles(t);
    setMoves((m) => m + 1);
  };
  const w = S / n;

  return (
    <GameFrame
      title={{ tr: "Majolika", en: "Majolica" }}
      rules={{
        tr: "Amalfi'den gelen el boyaması bir majolika çini kırılmış. Parçaları boşluğa kaydırarak çiniyi yeniden bütünle: limon, üzüm, zeytin ve ortadaki rozet yerli yerine otursun.",
        en: "A hand-painted majolica tile from Amalfi has broken. Slide the pieces into the gap until it is whole again: lemon, grapes, olive and the rosette, each in its place.",
      }}
      stats={[
        { label: { tr: "Hamle", en: "Moves" }, value: moves },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={() => {
        setTiles(scramble(n));
        setMoves(0);
      }}
      done={won && <p>{lang === "tr" ? `Bellissimo! Çini ${moves} hamlede bütün.` : `Bellissimo! The tile is whole in ${moves} moves.`}</p>}
    >
      <div className="chips" style={{ marginBottom: 12 }}>
        {[3, 4].map((k) => (
          <button key={k} className={`chip ${n === k ? "on" : ""}`} onClick={() => setN(k)}>
            {k}×{k} · {k === 3 ? (lang === "tr" ? "Kolay" : "Easy") : lang === "tr" ? "Usta" : "Master"}
          </button>
        ))}
      </div>
      <div className={`majolica ${won ? "whole" : ""}`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {tiles.map((v, i) =>
          v === n * n - 1 && !won ? (
            <span key={v} className="maj-gap" />
          ) : (
            <button key={v} className="maj-tile" onClick={() => tap(i)} aria-label={`${v + 1}`}>
              <svg viewBox={`${(v % n) * w} ${Math.floor(v / n) * w} ${w} ${w}`} aria-hidden>
                <MajolicaArt />
              </svg>
            </button>
          ),
        )}
      </div>
    </GameFrame>
  );
}
