"use client";

import { useEffect, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { BEST, GameFrame, useBest } from "./common";

const N = 3;
const scramble = () => {
  const r: number[] = Array.from({ length: N * N }, () => Math.floor(Math.random() * 4));
  if (!r.some((x) => x !== 0)) r[4] = 2;
  return r;
};

/** The picture: a tea bowl beneath a cherry branch and a red sun. Deliberately asymmetric. */
function Scene() {
  return (
    <g>
      <rect width="300" height="300" fill="#f4ecdc" />
      <circle cx="210" cy="92" r="52" fill="#c8102e" />
      <path d="M0 40 C60 50 110 70 150 110 C175 135 210 145 260 150" stroke="#3a2a22" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M70 58 C80 30 95 22 110 18 M150 110 C150 80 160 66 175 58" stroke="#3a2a22" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {[[40, 46], [110, 18], [92, 72], [150, 110], [175, 58], [200, 140], [255, 150], [128, 92]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} fill="#f2a7bb">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-7" rx="5" ry="7" transform={`rotate(${a})`} />
          ))}
          <circle r="2.6" fill="#c8102e" />
        </g>
      ))}
      <path d="M30 270 H270" stroke="#a9804f" strokeWidth="3" />
      <path d="M62 190 C62 250 100 268 150 268 C200 268 238 250 238 190 Z" fill="#2b3a55" />
      <path d="M62 190 C62 202 238 202 238 190" fill="#3d5175" />
      <path d="M80 216 C110 226 190 226 220 216" stroke="#8fa3c8" strokeWidth="2" fill="none" />
      <ellipse cx="150" cy="190" rx="88" ry="10" fill="none" stroke="#1b2438" strokeWidth="2" />
      <text x="24" y="250" fontSize="34" fill="#c8102e" fontFamily="'Shippori Mincho', serif">
        金継
      </text>
    </g>
  );
}

/** Sakura: rotate the broken pieces of the tea bowl back into place. */
export function Kintsugi() {
  const { lang } = usePrefs();
  const [rot, setRot] = useState(scramble);
  const [moves, setMoves] = useState(0);
  const { best, submit } = useBest("kintsugi", true);
  const won = rot.every((r) => r === 0);

  useEffect(() => {
    if (won && moves > 0) submit(moves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const turn = (i: number) => {
    if (won) return;
    setRot(rot.map((r, j) => (j === i ? (r + 1) % 4 : r)));
    setMoves((m) => m + 1);
  };
  const s = 300 / N;

  return (
    <GameFrame
      title={{ tr: "Kintsugi", en: "Kintsugi" }}
      rules={{
        tr: "Kâse kırıldı. Parçalara dokunarak döndür ve resmi tamamla. Japon ustalar kırığı saklamaz, altınla onarır.",
        en: "The bowl has broken. Tap the pieces to rotate them and restore the picture. Japanese masters never hide a break: they mend it with gold.",
      }}
      stats={[
        { label: { tr: "Hamle", en: "Moves" }, value: moves },
        { label: BEST, value: best ?? "—" },
      ]}
      onRestart={() => {
        setRot(scramble());
        setMoves(0);
      }}
      done={won && moves > 0 && <p>{lang === "tr" ? "Kırık olan, altınla daha da güzel." : "What was broken is now more beautiful, mended in gold."}</p>}
    >
      <div className={`kintsugi ${won ? "won" : ""}`}>
        {rot.map((r, i) => {
          const x = (i % N) * s;
          const y = Math.floor(i / N) * s;
          return (
            <button key={i} className="kin-tile" onClick={() => turn(i)} aria-label={`${i + 1}`}>
              <svg viewBox={`${x} ${y} ${s} ${s}`} style={{ transform: `rotate(${r * 90}deg)` }}>
                <Scene />
              </svg>
            </button>
          );
        })}
        <svg className="kin-gold" viewBox="0 0 300 300" aria-hidden>
          <path d="M100 0 L104 40 L96 70 L102 100 L98 140 L103 175 L99 200 L102 240 L97 270 L100 300 M200 0 L196 30 L204 70 L199 100 L203 130 L197 170 L201 200 L196 235 L204 270 L200 300 M0 100 L35 104 L70 96 L100 100 L130 105 L165 97 L200 100 L240 104 L270 96 L300 100 M0 200 L30 196 L66 204 L100 200 L136 195 L170 203 L200 200 L236 196 L268 204 L300 200" />
        </svg>
      </div>
    </GameFrame>
  );
}
