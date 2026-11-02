"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { BEST, GameFrame, useBest } from "./common";

/**
 * Boreal: slide the sled across the frozen lake. On ice it keeps gliding until a
 * rock (or the shore) stops it; the cabin catches it. Reach the cabin in as few
 * pushes as you can. Levels are generated from a seed and checked with a BFS,
 * so every lake is solvable and has a known par.
 */
const N = 8;
type Dir = [number, number];
const DIRS: Record<string, Dir> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };

function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Lake {
  rocks: boolean[];
  start: number;
  goal: number;
  par: number;
}

const at = (x: number, y: number) => y * N + x;

function slide(rocks: boolean[], goal: number, from: number, [dx, dy]: Dir): number {
  let x = from % N;
  let y = Math.floor(from / N);
  for (;;) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= N || ny >= N || rocks[at(nx, ny)]) return at(x, y);
    x = nx;
    y = ny;
    if (at(x, y) === goal) return goal;
  }
}

function solve(rocks: boolean[], start: number, goal: number): number {
  const dist = new Map<number, number>([[start, 0]]);
  const queue = [start];
  while (queue.length) {
    const c = queue.shift()!;
    if (c === goal) return dist.get(c)!;
    for (const d of Object.values(DIRS)) {
      const n = slide(rocks, goal, c, d);
      if (!dist.has(n)) {
        dist.set(n, dist.get(c)! + 1);
        queue.push(n);
      }
    }
  }
  return -1;
}

function makeLake(level: number): Lake {
  const r = rng(7919 * (level + 3));
  const want = Math.min(3 + level, 10);
  let fallback: Lake | null = null;
  for (let tries = 0; tries < 4000; tries++) {
    const rocks = Array.from({ length: N * N }, () => r() < 0.17);
    const start = Math.floor(r() * N * N);
    const goal = Math.floor(r() * N * N);
    if (start === goal || rocks[start] || rocks[goal]) continue;
    const par = solve(rocks, start, goal);
    if (par < 2) continue;
    const lake = { rocks, start, goal, par };
    if (par >= want) return lake;
    if (!fallback || par > fallback.par) fallback = lake;
  }
  return fallback!;
}

export function FrozenLake() {
  const { lang } = usePrefs();
  const [level, setLevel] = useState(1);
  const lake = useMemo(() => makeLake(level), [level]);
  const [pos, setPos] = useState(lake.start);
  const [moves, setMoves] = useState(0);
  const [dur, setDur] = useState(0);
  const { best, submit } = useBest("frozen-lake");
  const won = pos === lake.goal;
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setPos(lake.start);
    setMoves(0);
  }, [lake]);

  useEffect(() => {
    if (won) submit(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const push = useCallback(
    (d: Dir) => {
      if (won) return;
      const next = slide(lake.rocks, lake.goal, pos, d);
      if (next === pos) return;
      const cells = Math.abs((next % N) - (pos % N)) + Math.abs(Math.floor(next / N) - Math.floor(pos / N));
      setDur(0.09 * cells + 0.08);
      setPos(next);
      setMoves((m) => m + 1);
    },
    [lake, pos, won],
  );

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const d = DIRS[e.key];
      if (!d || (e.target as HTMLElement)?.closest?.("input, textarea, select")) return;
      e.preventDefault();
      push(d);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [push]);

  const onUp = (e: React.PointerEvent) => {
    if (!touch.current) return;
    const dx = e.clientX - touch.current.x;
    const dy = e.clientY - touch.current.y;
    touch.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    push(Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx), 0] : [0, Math.sign(dy)]);
  };

  const px = pos % N;
  const py = Math.floor(pos / N);
  const gx = lake.goal % N;
  const gy = Math.floor(lake.goal / N);

  return (
    <GameFrame
      title={{ tr: "Buz Gölü", en: "Frozen Lake" }}
      rules={{
        tr: "Kızağı donmuş gölde kaydır: bir yöne ittiğinde kayaya ya da kıyıya çarpana kadar durmaz. Kulübe onu yakalar. Glögg'ü kulübeye en az hamlede ulaştır. Ok tuşları, kaydırma ya da düğmeler.",
        en: "Push the sled across the frozen lake: it glides until a rock or the shore stops it, and the cabin catches it. Deliver the glögg to the cabin in as few pushes as you can. Arrow keys, swipes or the buttons.",
      }}
      stats={[
        { label: { tr: "Göl", en: "Lake" }, value: level },
        { label: { tr: "Hamle", en: "Pushes" }, value: moves },
        { label: { tr: "Hedef", en: "Par" }, value: lake.par },
        { label: BEST, value: best ? (lang === "tr" ? `${best}. göl` : `lake ${best}`) : "—" },
      ]}
      onRestart={() => {
        setPos(lake.start);
        setMoves(0);
      }}
      done={
        won && (
          <div>
            <p>
              {moves <= lake.par
                ? lang === "tr" ? `Kusursuz! ${moves} hamle, tam hedefte.` : `Flawless! ${moves} pushes, right on par.`
                : lang === "tr" ? `Kulübeye vardın: ${moves} hamle (hedef ${lake.par}).` : `You reached the cabin: ${moves} pushes (par ${lake.par}).`}
            </p>
            <button className="btn" onClick={() => setLevel((l) => l + 1)}>{lang === "tr" ? "Sonraki göl →" : "Next lake →"}</button>
          </div>
        )
      }
    >
      <div
        className="lake"
        onPointerDown={(e) => (touch.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={onUp}
        onPointerCancel={() => (touch.current = null)}
      >
        <svg viewBox={`0 0 ${N * 10} ${N * 10}`} role="img" aria-label={lang === "tr" ? "Donmuş göl" : "Frozen lake"}>
          <defs>
            <linearGradient id="lakeIce" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e9f4fb" />
              <stop offset=".5" stopColor="#bcd9ec" />
              <stop offset="1" stopColor="#8fb8d6" />
            </linearGradient>
            <radialGradient id="lakeGlow" cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#ffd98a" stopOpacity=".9" />
              <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={N * 10} height={N * 10} rx="3" fill="url(#lakeIce)" />
          <g stroke="#fff" strokeOpacity=".55" strokeWidth=".3" fill="none">
            <path d="M3 12 L14 18 L12 27 M44 5 L50 14 L62 15 M70 40 L60 48 L64 60 M10 62 L22 58 L28 70" />
          </g>
          <g stroke="#7aa2c0" strokeOpacity=".25" strokeWidth=".2">
            {Array.from({ length: N - 1 }, (_, i) => (
              <path key={i} d={`M${(i + 1) * 10} 0 V${N * 10} M0 ${(i + 1) * 10} H${N * 10}`} />
            ))}
          </g>
          {lake.rocks.map((rock, i) =>
            rock ? (
              <g key={i} transform={`translate(${(i % N) * 10 + 5} ${Math.floor(i / N) * 10 + 5})`}>
                <ellipse cy="2.6" rx="4.6" ry="1.4" fill="#1d2f40" opacity=".3" />
                <path d="M-4.4 2 C-4.8 -1.6 -2 -4.2 0.4 -4 C3 -3.8 4.8 -1.4 4.4 2 Z" fill="#59626b" />
                <path d="M-3.8 -1 C-2.6 -3.6 1.6 -4.6 3.6 -1.6 C2 -2.4 -1.6 -2.2 -3.8 -1Z" fill="#fff" />
              </g>
            ) : null,
          )}
          {/* the cabin */}
          <g transform={`translate(${gx * 10 + 5} ${gy * 10 + 5})`}>
            <circle r="7" fill="url(#lakeGlow)" />
            <path d="M-4 0 L0 -4 L4 0 V4 H-4 Z" fill="#7a4a22" />
            <path d="M-5 0.4 L0 -4.6 L5 0.4" stroke="#f4f8fb" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <rect x="-1.2" y="0.6" width="2.4" height="2.2" fill="#ffd98a" />
          </g>
          {/* the sled with a bottle of glögg */}
          <g style={{ transform: `translate(${px * 10 + 5}px, ${py * 10 + 5}px)`, transition: `transform ${dur}s cubic-bezier(.2,.7,.3,1)` }}>
            <ellipse cy="3.4" rx="4" ry="1" fill="#1d2f40" opacity=".3" />
            <path d="M-4 2.4 H4 C5 2.4 5.2 1.4 4.6 1" stroke="#c8323c" strokeWidth=".8" fill="none" strokeLinecap="round" />
            <rect x="-3.6" y="-0.4" width="7" height="2.2" rx=".8" fill="#b8824a" />
            <path d="M-0.8 -0.4 V-3.4 H0.8 V-0.4 Z M-0.4 -3.4 V-4.6 H0.4 V-3.4" fill="#5a0f1e" />
            <rect x="-0.8" y="-2.4" width="1.6" height="1" fill="#efe6d2" />
          </g>
        </svg>
      </div>
      <div className="lake-pad" aria-label={lang === "tr" ? "Yön düğmeleri" : "Direction buttons"}>
        <button className="btn ghost small" onClick={() => push([0, -1])} aria-label="↑">↑</button>
        <div>
          <button className="btn ghost small" onClick={() => push([-1, 0])} aria-label="←">←</button>
          <button className="btn ghost small" onClick={() => push([0, 1])} aria-label="↓">↓</button>
          <button className="btn ghost small" onClick={() => push([1, 0])} aria-label="→">→</button>
        </div>
      </div>
    </GameFrame>
  );
}
