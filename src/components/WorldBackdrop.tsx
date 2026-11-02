"use client";

import type { WorldId } from "@/lib/types";

// deterministic pseudo-random so server and client render the same
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function Nazar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-22 -22 44 44" aria-hidden>
      <circle r="21" fill="#1d4aa6" />
      <circle r="21" fill="none" stroke="#5f8fe0" strokeWidth="1" />
      <circle r="13.5" fill="#f7f7f2" />
      <circle r="9" fill="#58b4ea" />
      <circle r="4.6" fill="#0d0d12" />
      <ellipse cx="-8" cy="-11" rx="5" ry="2.4" fill="#fff" opacity=".45" transform="rotate(-35 -8 -11)" />
    </svg>
  );
}

function Tulip({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="-20 -30 40 64" aria-hidden>
      <path d="M0 -26 C6 -16 14 -14 14 -2 C14 8 6 12 0 12 C-6 12 -14 8 -14 -2 C-14 -14 -6 -16 0 -26Z" fill="#c8323c" />
      <path d="M0 -20 C3 -10 4 0 0 12 C-4 0 -3 -10 0 -20Z" fill="#e35d5d" />
      <path d="M0 12 C0 20 0 26 0 32 M0 24 C-8 18 -12 20 -14 16 M0 20 C8 14 12 16 14 12" stroke="#2fb7b0" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Anatolia() {
  return (
    <>
      <svg className="bd-pattern" aria-hidden>
        <defs>
          <pattern id="cini" width="80" height="80" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="var(--accent)" strokeWidth="1">
              <path d="M40 8 L48 32 L72 40 L48 48 L40 72 L32 48 L8 40 L32 32 Z" />
              <rect x="28" y="28" width="24" height="24" transform="rotate(45 40 40)" />
              <circle cx="40" cy="40" r="5" />
              <circle cx="0" cy="0" r="10" /><circle cx="80" cy="0" r="10" /><circle cx="0" cy="80" r="10" /><circle cx="80" cy="80" r="10" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cini)" />
      </svg>
      <div className="bd-float" style={{ top: "18%", left: "4%" }}><Nazar size={46} /></div>
      <div className="bd-float slow" style={{ top: "62%", right: "5%" }}><Nazar size={34} /></div>
      <div className="bd-float" style={{ bottom: "6%", left: "8%", animationDelay: "-3s" }}><Tulip size={26} /></div>
      <div className="bd-float slow" style={{ top: "30%", right: "12%", animationDelay: "-5s" }}><Tulip size={20} /></div>
    </>
  );
}

function Cosmos() {
  const r = rand(42);
  const stars = Array.from({ length: 140 }, () => ({ x: r() * 100, y: r() * 100, s: r() * 1.6 + 0.3, d: r() * 6 }));
  return (
    <>
      <div className="bd-nebula" />
      <svg className="bd-pattern" aria-hidden>
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.s} fill="#fff" className="twinkle" style={{ animationDelay: `${s.d}s` }} />
        ))}
      </svg>
      <svg className="bd-const" viewBox="0 0 400 300" aria-hidden>
        <g stroke="var(--accent)" strokeOpacity=".5" strokeWidth=".8" fill="none">
          <path d="M40 60 L90 40 L140 70 L180 50 L230 90" />
          <path d="M140 70 L150 130 L210 160" />
          <path d="M280 200 L320 170 L360 210 L330 250 L280 200" />
        </g>
        {[[40, 60], [90, 40], [140, 70], [180, 50], [230, 90], [150, 130], [210, 160], [280, 200], [320, 170], [360, 210], [330, 250]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.6} fill="#fff" className="twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </svg>
      <svg className="bd-planet" viewBox="-60 -60 120 120" aria-hidden>
        <defs>
          <radialGradient id="pl" cx=".35" cy=".35">
            <stop offset="0" stopColor="#c9b6ff" />
            <stop offset="1" stopColor="#3b2a7a" />
          </radialGradient>
        </defs>
        <circle r="30" fill="url(#pl)" />
        <ellipse rx="54" ry="12" fill="none" stroke="#ff7ac8" strokeOpacity=".6" strokeWidth="2" transform="rotate(-18)" />
      </svg>
    </>
  );
}

function Jazz() {
  return (
    <>
      <svg className="bd-pattern" aria-hidden>
        <defs>
          <pattern id="deco" width="120" height="60" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="var(--accent)" strokeWidth="1">
              <path d="M0 60 A60 60 0 0 1 120 60" />
              <path d="M15 60 A45 45 0 0 1 105 60" />
              <path d="M30 60 A30 30 0 0 1 90 60" />
              <path d="M60 60 L60 0 M60 60 L18 18 M60 60 L102 18" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#deco)" />
      </svg>
      <div className="bd-spot" />
      <svg className="bd-vinyl" viewBox="-50 -50 100 100" aria-hidden>
        <circle r="48" fill="#0a0908" stroke="var(--accent)" strokeOpacity=".4" />
        {[44, 40, 36, 32, 28, 24, 20].map((r) => (
          <circle key={r} r={r} fill="none" stroke="#2a2620" strokeWidth=".6" />
        ))}
        <circle r="14" fill="var(--accent2)" />
        <circle r="13" fill="none" stroke="var(--accent)" strokeWidth=".6" />
        <circle r="1.6" fill="#0a0908" />
        <path d="M-30 -30 A42 42 0 0 1 -6 -42" stroke="#fff" strokeOpacity=".15" fill="none" />
      </svg>
      <div className="bd-notes" aria-hidden>
        {["♪", "♫", "♩", "♬"].map((n, i) => (
          <span key={i} style={{ left: `${10 + i * 24}%`, animationDelay: `${i * 2.5}s` }}>{n}</span>
        ))}
      </div>
    </>
  );
}

function Sakura() {
  const r = rand(7);
  const petals = Array.from({ length: 18 }, () => ({ x: r() * 100, d: r() * 14, t: 12 + r() * 10, s: 0.6 + r() * 0.8 }));
  return (
    <>
      <svg className="bd-branch" viewBox="0 0 300 200" aria-hidden>
        <path d="M300 10 C230 20 190 50 140 60 C110 66 80 90 40 96 M190 46 C180 80 160 100 150 130 M230 26 C240 60 250 80 240 110" stroke="var(--ink)" strokeOpacity=".5" strokeWidth="3" fill="none" strokeLinecap="round" />
        {[[140, 60], [40, 96], [150, 130], [240, 110], [190, 46], [100, 78], [230, 26], [70, 90], [165, 95]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${0.8 + (i % 3) * 0.2})`} fill="var(--accent)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-5" rx="3.4" ry="5" transform={`rotate(${a})`} />
            ))}
            <circle r="1.6" fill="#f3d36b" />
          </g>
        ))}
      </svg>
      <svg className="bd-enso" viewBox="0 0 200 200" aria-hidden>
        <path d="M150 40 C190 80 180 160 110 175 C40 190 10 120 30 75 C45 40 90 22 130 30" fill="none" stroke="var(--accent2)" strokeWidth="9" strokeLinecap="round" opacity=".5" />
      </svg>
      <div className="bd-tategaki left" lang="ja">一期一会</div>
      <div className="bd-tategaki right" lang="ja">花見酒</div>
      <svg className="bd-karesansui" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M0 ${30 + i * 14} C200 ${22 + i * 14} 400 ${38 + i * 14} 600 ${30 + i * 14} S1000 ${22 + i * 14} 1200 ${30 + i * 14}`} stroke="var(--ink)" strokeOpacity=".12" fill="none" />
        ))}
        {[[260, 90, 46], [880, 110, 34], [960, 96, 18]].map(([x, y, r], i) => (
          <g key={i}>
            {[1.9, 1.55, 1.25].map((k) => (
              <ellipse key={k} cx={x} cy={y} rx={r * k} ry={r * k * 0.35} fill="none" stroke="var(--ink)" strokeOpacity=".14" />
            ))}
            <ellipse cx={x} cy={y - r * 0.15} rx={r} ry={r * 0.55} fill="#3a2f33" />
            <ellipse cx={x - r * 0.3} cy={y - r * 0.35} rx={r * 0.35} ry={r * 0.15} fill="#fff" opacity=".08" />
          </g>
        ))}
      </svg>
      <div className="bd-petals" aria-hidden>
        {petals.map((p, i) => (
          <span key={i} style={{ left: `${p.x}%`, animationDelay: `-${p.d}s`, animationDuration: `${p.t}s`, transform: `scale(${p.s})` }} />
        ))}
      </div>
    </>
  );
}

function Alchemist() {
  const glyphs = ["☉", "☽", "☿", "♀", "♂", "♃", "♄", "△", "▽", "🜍"];
  const r = rand(99);
  return (
    <>
      <div className="bd-parchment" />
      <svg className="bd-circle" viewBox="-100 -100 200 200" aria-hidden>
        <g fill="none" stroke="var(--accent)" strokeWidth=".6">
          <circle r="96" />
          <circle r="88" />
          <rect x="-62" y="-62" width="124" height="124" />
          <path d="M0 -88 L76 44 L-76 44 Z" />
          <circle r="44" />
          <circle r="20" />
        </g>
      </svg>
      <div className="bd-glyphs" aria-hidden>
        {glyphs.map((g, i) => (
          <span key={i} style={{ left: `${r() * 92}%`, top: `${r() * 90}%`, fontSize: `${18 + r() * 26}px` }}>{g}</span>
        ))}
      </div>
    </>
  );
}

function Tiki() {
  const leaf = "M0 0 C30 -20 80 -20 120 0 C80 20 30 20 0 0Z";
  return (
    <>
      <svg className="bd-leaves left" viewBox="0 0 200 300" aria-hidden>
        {[-30, 0, 30, 60].map((a, i) => (
          <g key={a} transform={`translate(-10 ${120 + i * 30}) rotate(${a - 40})`}>
            <path d={leaf} fill="#1f5a3a" />
            <path d="M0 0 L120 0" stroke="#0c1a14" strokeWidth="1.5" />
            {Array.from({ length: 7 }).map((_, j) => (
              <path key={j} d={`M${15 + j * 14} 0 L${25 + j * 14} ${j % 2 ? 10 : -10}`} stroke="#0c1a14" strokeWidth="1.2" />
            ))}
          </g>
        ))}
      </svg>
      <svg className="bd-leaves right" viewBox="0 0 200 300" aria-hidden>
        {[-30, 0, 30].map((a, i) => (
          <g key={a} transform={`translate(-10 ${80 + i * 40}) rotate(${a - 30})`}>
            <path d={leaf} fill="#2a6b45" />
            <path d="M0 0 L120 0" stroke="#0c1a14" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <div className="bd-torch" />
    </>
  );
}

function Maison() {
  return (
    <svg className="bd-pattern" aria-hidden>
      <defs>
        <pattern id="fan" width="160" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="var(--accent)" strokeWidth=".8">
            <path d="M0 80 A80 80 0 0 1 160 80" />
            <path d="M20 80 A60 60 0 0 1 140 80" />
            <path d="M40 80 A40 40 0 0 1 120 80" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fan)" />
    </svg>
  );
}

function Boreal() {
  const r = rand(23);
  const pine = (x: number, h: number) => {
    const w = h * 0.42;
    return `M${x} ${300 - h} L${x - w * 0.45} ${300 - h * 0.62} H${x - w * 0.25} L${x - w * 0.7} ${300 - h * 0.3} H${x - w * 0.4} L${x - w} ${300 - 6} H${x + w} L${x + w * 0.4} ${300 - h * 0.3} H${x + w * 0.7} L${x + w * 0.25} ${300 - h * 0.62} H${x + w * 0.45} Z`;
  };
  const trees = Array.from({ length: 34 }, (_, i) => [i * 31 + r() * 18, 60 + r() * 110] as const);
  return (
    <>
      <div className="bd-aurora">
        <i />
        <i />
        <i />
      </div>
      <svg className="bd-pattern" aria-hidden>
        {Array.from({ length: 70 }).map((_, i) => (
          <circle key={i} cx={`${r() * 100}%`} cy={`${r() * 55}%`} r={r() * 1.2 + 0.3} fill="#fff" className={i % 4 ? "" : "twinkle"} style={{ animationDelay: `${-r() * 4}s` }} />
        ))}
      </svg>
      <div className="bd-snow">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} style={{ left: `${r() * 100}%`, animationDuration: `${12 + r() * 14}s`, animationDelay: `${-r() * 20}s`, width: 2 + r() * 4, height: 2 + r() * 4 }} />
        ))}
      </div>
      <svg className="bd-forest" viewBox="0 0 1060 300" preserveAspectRatio="xMidYMax slice" aria-hidden>
        <path d="M0 250 C200 230 400 262 620 244 C800 230 960 250 1060 240 V300 H0Z" fill="#0b1826" />
        {trees.map(([x, h], i) => (
          <path key={i} d={pine(x, h)} fill={i % 3 ? "#08131f" : "#0a1a2a"} />
        ))}
        <path d="M0 282 C240 270 520 290 760 278 C900 272 1000 284 1060 280 V300 H0Z" fill="#dfeaf2" opacity=".12" />
      </svg>
    </>
  );
}

function Riviera() {
  const leaf = "M0 10 C-4 8 -12 8 -13 1 C-10 0 -12 -5 -8 -7 C-7 -10 -3 -10 0 -13 C3 -10 7 -10 8 -7 C12 -5 10 0 13 1 C12 8 4 8 0 10Z";
  const bunch = (x: number, y: number, k: number) =>
    [[0, 0], [-6, 0], [6, 0], [-3, 6], [3, 6], [0, 12], [-9, -6], [-3, -6], [3, -6], [9, -6]].map(([dx, dy], i) => (
      <circle key={`${k}-${i}`} cx={x + dx} cy={y + dy} r="4" fill="#4a1f4f" />
    ));
  return (
    <>
      <div className="bd-sun" />
      <svg className="bd-vine" viewBox="0 0 420 260" aria-hidden>
        <path d="M0 18 C80 10 150 40 230 26 C300 14 360 30 420 20" stroke="#4a3220" strokeWidth="6" fill="none" />
        <path d="M60 18 C70 40 60 70 72 96 M190 30 C200 60 186 90 198 120 M320 22 C326 46 318 66 330 84" stroke="#4a3220" strokeWidth="2.4" fill="none" />
        {[[40, 30, 20], [96, 22, -30], [140, 40, 10], [230, 36, 40], [270, 24, -20], [360, 34, 15], [86, 70, -10], [214, 82, 30], [340, 70, -25]].map(([x, y, a], i) => (
          <path key={i} d={leaf} transform={`translate(${x} ${y}) rotate(${a}) scale(1.6)`} fill={i % 2 ? "#4f6a26" : "#5e7a2e"} />
        ))}
        {bunch(72, 108, 1)}
        {bunch(198, 132, 2)}
        {bunch(330, 96, 3)}
        <path d="M110 30 c8 -10 18 -4 12 4 c-4 4 -8 0 -5 -3" stroke="#5e7a2e" strokeWidth="1.4" fill="none" />
      </svg>
      <svg className="bd-lemons" viewBox="0 0 260 260" aria-hidden>
        <path d="M260 40 C200 60 160 110 120 200" stroke="#4a3220" strokeWidth="5" fill="none" />
        {[[220, 54, -30], [184, 84, 40], [160, 120, -50], [138, 160, 30], [200, 110, 70], [126, 198, -20]].map(([x, y, a], i) => (
          <path key={i} d="M0 0 C10 -10 30 -12 44 -6 C30 4 12 6 0 0Z" transform={`translate(${x} ${y}) rotate(${a})`} fill={i % 2 ? "#4f6a26" : "#5e7a2e"} />
        ))}
        {[[176, 128, -20], [146, 182, 10], [214, 96, 30]].map(([x, y, a], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
            <ellipse rx="20" ry="15" fill="#f2c94c" />
            <ellipse cx="-20" rx="3.4" ry="2.8" fill="#e0b030" />
            <ellipse cx="-6" cy="-5" rx="8" ry="3.6" fill="#fff" opacity=".35" />
          </g>
        ))}
      </svg>
    </>
  );
}

export function WorldBackdrop({ world }: { world: WorldId }) {
  return (
    <div className={`backdrop bd-${world}`} aria-hidden>
      {(world === "anatolia" || world === "tiki" || world === "maison" || world === "jazz" || world === "boreal" || world === "riviera") && (
        <>
          <i className="bd-edge left" />
          <i className="bd-edge right" />
        </>
      )}
      {world === "maison" && <Maison />}
      {world === "anatolia" && <Anatolia />}
      {world === "cosmos" && <Cosmos />}
      {world === "jazz" && <Jazz />}
      {world === "sakura" && <Sakura />}
      {world === "alchemist" && <Alchemist />}
      {world === "tiki" && <Tiki />}
      {world === "boreal" && <Boreal />}
      {world === "riviera" && <Riviera />}
    </div>
  );
}
