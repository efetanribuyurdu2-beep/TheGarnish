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

export function WorldBackdrop({ world }: { world: WorldId }) {
  return (
    <div className={`backdrop bd-${world}`} aria-hidden>
      {world === "maison" && <Maison />}
      {world === "anatolia" && <Anatolia />}
      {world === "cosmos" && <Cosmos />}
      {world === "jazz" && <Jazz />}
      {world === "sakura" && <Sakura />}
      {world === "alchemist" && <Alchemist />}
      {world === "tiki" && <Tiki />}
    </div>
  );
}
