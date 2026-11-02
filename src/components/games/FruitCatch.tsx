"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { BEST, GameFrame, useBest } from "./common";

const W = 360;
const H = 460;
type Kind = "pineapple" | "lime" | "cherry" | "orange" | "coconut";
interface Drop {
  x: number;
  y: number;
  v: number;
  kind: Kind;
  spin: number;
}
const FRUIT: Kind[] = ["pineapple", "lime", "cherry", "orange"];

function drawFruit(c: CanvasRenderingContext2D, d: Drop) {
  c.save();
  c.translate(d.x, d.y);
  c.rotate(d.spin);
  switch (d.kind) {
    case "pineapple":
      c.fillStyle = "#f4c542";
      c.beginPath();
      c.ellipse(0, 4, 11, 15, 0, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = "#b8862a";
      c.lineWidth = 1;
      for (let i = -12; i < 18; i += 6) {
        c.beginPath();
        c.moveTo(-11, i);
        c.lineTo(11, i + 8);
        c.stroke();
      }
      c.fillStyle = "#3f8f3a";
      [-6, 0, 6].forEach((dx) => {
        c.beginPath();
        c.moveTo(dx, -10);
        c.lineTo(dx * 1.6, -24);
        c.lineTo(dx + 3, -10);
        c.fill();
      });
      break;
    case "lime":
    case "orange":
      c.fillStyle = d.kind === "lime" ? "#9cc94a" : "#f39b2b";
      c.beginPath();
      c.arc(0, 0, 12, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = "rgba(255,255,255,.7)";
      for (let a = 0; a < 6; a++) {
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(Math.cos(a) * 10, Math.sin(a) * 10);
        c.stroke();
      }
      break;
    case "cherry":
      c.strokeStyle = "#5b3a1a";
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(0, -4);
      c.quadraticCurveTo(4, -16, 10, -18);
      c.stroke();
      c.fillStyle = "#b3122e";
      c.beginPath();
      c.arc(0, 2, 8, 0, Math.PI * 2);
      c.fill();
      break;
    case "coconut":
      c.fillStyle = "#5a3a1e";
      c.beginPath();
      c.arc(0, 0, 14, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#2a1a0e";
      [[-4, -3], [4, -3], [0, 4]].forEach(([x, y]) => {
        c.beginPath();
        c.arc(x, y, 2, 0, Math.PI * 2);
        c.fill();
      });
      break;
  }
  c.restore();
}

function drawMug(c: CanvasRenderingContext2D, x: number) {
  const y = H - 70;
  c.fillStyle = "#8a5a2b";
  c.beginPath();
  c.moveTo(x - 34, y);
  c.lineTo(x + 34, y);
  c.lineTo(x + 30, y + 60);
  c.lineTo(x - 30, y + 60);
  c.closePath();
  c.fill();
  c.strokeStyle = "#3a2210";
  c.lineWidth = 3;
  c.beginPath();
  c.moveTo(x - 20, y + 18);
  c.lineTo(x - 8, y + 18);
  c.moveTo(x + 8, y + 18);
  c.lineTo(x + 20, y + 18);
  c.moveTo(x - 14, y + 44);
  c.quadraticCurveTo(x, y + 54, x + 14, y + 44);
  c.lineTo(x - 14, y + 44);
  c.moveTo(x, y + 24);
  c.lineTo(x - 4, y + 36);
  c.lineTo(x + 4, y + 36);
  c.stroke();
  c.fillStyle = "#f0a04b";
  c.beginPath();
  c.ellipse(x, y + 2, 33, 5, 0, 0, Math.PI * 2);
  c.fill();
}

/** Tiki: catch the falling fruit in your tiki mug, dodge the coconuts. */
export function FruitCatch() {
  const { lang } = usePrefs();
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({ x: W / 2, drops: [] as Drop[], score: 0, lives: 3, t: 0, keys: { l: false, r: false }, running: false });
  const [hud, setHud] = useState({ score: 0, lives: 3 });
  const [phase, setPhase] = useState<"idle" | "run" | "over">("idle");
  const { best, submit } = useBest("fruit-catch");

  const start = useCallback(() => {
    state.current = { ...state.current, x: W / 2, drops: [], score: 0, lives: 3, t: 0, running: true };
    setHud({ score: 0, lives: 3 });
    setPhase("run");
  }, []);

  useEffect(() => {
    const cv = canvas.current!;
    const c = cv.getContext("2d")!;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(40, now - last) / 16.7;
      last = now;
      const s = state.current;
      // backdrop
      const g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0f2a2e");
      g.addColorStop(0.7, "#123a2a");
      g.addColorStop(1, "#c9a25a");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
      c.fillStyle = "rgba(240,160,75,.18)";
      c.beginPath();
      c.arc(W - 60, 70, 34, 0, Math.PI * 2);
      c.fill();
      if (s.running) {
        s.t += dt;
        const speed = 1 + s.t / 900;
        if (s.keys.l) s.x -= 7 * dt;
        if (s.keys.r) s.x += 7 * dt;
        s.x = Math.max(36, Math.min(W - 36, s.x));
        if (Math.random() < 0.028 * dt * speed) {
          const kind: Kind = Math.random() < 0.22 + Math.min(0.15, s.t / 6000) ? "coconut" : FRUIT[Math.floor(Math.random() * 4)];
          s.drops.push({ x: 20 + Math.random() * (W - 40), y: -20, v: (2 + Math.random() * 1.5) * speed, kind, spin: 0 });
        }
        for (const d of s.drops) {
          d.y += d.v * dt;
          d.spin += 0.05 * dt;
        }
        const mugY = H - 70;
        s.drops = s.drops.filter((d) => {
          if (d.y > mugY - 6 && d.y < mugY + 14 && Math.abs(d.x - s.x) < 36) {
            if (d.kind === "coconut") s.lives--;
            else s.score += d.kind === "pineapple" ? 3 : 1;
            setHud({ score: s.score, lives: s.lives });
            return false;
          }
          return d.y < H + 20;
        });
        if (s.lives <= 0) {
          s.running = false;
          submit(s.score);
          setPhase("over");
        }
      }
      for (const d of s.drops) drawFruit(c, d);
      drawMug(c, s.x);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const kd = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") state.current.keys.l = e.type === "keydown";
      if (e.key === "ArrowRight") state.current.keys.r = e.type === "keydown";
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", kd);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", kd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    state.current.x = ((e.clientX - r.left) / r.width) * W;
  };

  return (
    <GameFrame
      title={{ tr: "Meyve Yağmuru", en: "Fruit Rain" }}
      rules={{
        tr: "Tiki kupanı fareyle, parmağınla ya da ok tuşlarıyla kaydır. Meyveleri yakala (ananas 3 puan), hindistan cevizlerinden kaç: 3 canın var.",
        en: "Slide your tiki mug with the mouse, your finger or the arrow keys. Catch the fruit (pineapple scores 3) and dodge the coconuts: you have 3 lives.",
      }}
      stats={[
        { label: { tr: "Puan", en: "Score" }, value: hud.score },
        { label: { tr: "Can", en: "Lives" }, value: "❀".repeat(Math.max(0, hud.lives)) || "—" },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={start}
      done={phase === "over" && <p>{lang === "tr" ? `Aloha! ${hud.score} puan topladın.` : `Aloha! You scored ${hud.score}.`}</p>}
    >
      <div className="fruit-wrap">
        <canvas ref={canvas} width={W} height={H} className="fruit-canvas" onPointerMove={move} onPointerDown={move} />
        {phase !== "run" && (
          <button className="btn fruit-start" onClick={start}>
            {phase === "idle" ? (lang === "tr" ? "Başla" : "Start") : lang === "tr" ? "Tekrar" : "Again"}
          </button>
        )}
      </div>
    </GameFrame>
  );
}
