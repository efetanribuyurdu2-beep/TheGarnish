/**
 * Theme kit: hand-drawn SVG motifs for each world, turned into CSS custom
 * properties (data URIs). Every world gets:
 *   band    – tileable ornamental strip (dividers, borders)
 *   bandV   – the same strip turned vertical (page edge borders)
 *   track   – slider track tile
 *   thumb   – slider handle
 *   corner  – frame corner (rotated for all four corners)
 *   emblem  – small centre emblem
 *   counter – bar counter surface tile
 *   wall    – back-bar wall tile
 */
import type { WorldId } from "./types";

interface Art {
  w: number;
  h: number;
  body: string;
}
interface Kit {
  band: Art;
  track: Art;
  thumb: Art;
  corner: Art; // drawn as top-left, 40×40
  emblem: Art;
  counter: Art;
  wall: Art;
}

const svg = (a: Art, wrap = (b: string) => b) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${a.w}" height="${a.h}" viewBox="0 0 ${a.w} ${a.h}">${wrap(a.body)}</svg>`;
const uri = (s: string) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;

// ───────────────────────────────────────────── Anatolia (kilim · çini · nazar)
const K = { red: "#a3231c", indigo: "#1b2a5e", mustard: "#d9a521", cream: "#f1e4c8", tq: "#2fb7b0", cobalt: "#1d3f8f" };
const stepDiamond = (cx: number, cy: number, s: number, fill: string) =>
  `<path transform="translate(${cx} ${cy}) scale(${s})" d="M-3 -8 H3 V-5 H6 V-2 H9 V2 H6 V5 H3 V8 H-3 V5 H-6 V2 H-9 V-2 H-6 V-5 H-3 Z" fill="${fill}"/>`;
const eye = (cx: number, cy: number, s = 1) =>
  `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M0 -5 L5 0 L0 5 L-5 0Z" fill="${K.cream}"/><path d="M0 -2.4 L2.4 0 L0 2.4 L-2.4 0Z" fill="${K.indigo}"/></g>`;
const teeth = (w: number, c: string) => {
  let d = "M0 0";
  for (let x = 0; x <= w; x += 4) d += ` L${x} ${x % 8 === 0 ? 0 : 3.5}`;
  return `<path d="${d} L${w} 0Z" fill="${c}"/>`;
};
const nazar = (cx: number, cy: number, r: number) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1d4aa6"/><circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="#f7f7f2"/><circle cx="${cx}" cy="${cy}" r="${r * 0.44}" fill="#58b4ea"/><circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="#0d0d12"/><ellipse cx="${cx - r * 0.38}" cy="${cy - r * 0.5}" rx="${r * 0.25}" ry="${r * 0.12}" fill="#fff" opacity=".5" transform="rotate(-35 ${cx - r * 0.38} ${cy - r * 0.5})"/>`;
const tulip = (x: number, y: number, s: number, rot = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 -26 C6 -16 14 -14 14 -2 C14 8 6 12 0 12 C-6 12 -14 8 -14 -2 C-14 -14 -6 -16 0 -26Z" fill="${K.red}"/><path d="M0 -20 C3 -10 4 0 0 12 C-4 0 -3 -10 0 -20Z" fill="#e35d5d"/><path d="M0 12 V30 M0 24 C-8 18 -12 20 -14 16 M0 20 C8 14 12 16 14 12" stroke="${K.tq}" stroke-width="2.4" fill="none"/></g>`;

const anatolia: Kit = {
  band: {
    w: 48,
    h: 24,
    body: `<rect width="48" height="24" fill="${K.red}"/>${teeth(48, K.cream)}<g transform="translate(0 24) scale(1 -1)">${teeth(48, K.cream)}</g>${stepDiamond(24, 12, 1, K.indigo)}${stepDiamond(24, 12, 0.45, K.mustard)}<rect x="23" y="11" width="2" height="2" fill="${K.cream}"/>${eye(0, 12)}${eye(48, 12)}`,
  },
  track: { w: 16, h: 12, body: `<rect width="16" height="12" fill="${K.indigo}"/><path d="M0 9 L4 3 L8 9 L12 3 L16 9" stroke="${K.mustard}" stroke-width="2" fill="none"/><rect y="0" width="16" height="1.5" fill="${K.red}"/><rect y="10.5" width="16" height="1.5" fill="${K.red}"/>` },
  thumb: { w: 34, h: 34, body: nazar(17, 17, 15.5) },
  corner: {
    w: 40,
    h: 40,
    body: `<path d="M2 38 V2 H38" stroke="${K.mustard}" stroke-width="1.6" fill="none"/><path d="M6 30 V6 H30" stroke="${K.tq}" stroke-width=".8" fill="none"/>${tulip(15, 15, 0.32, -45)}<circle cx="27" cy="10" r="1.6" fill="${K.mustard}"/><circle cx="31" cy="10" r="1.6" fill="${K.mustard}"/><circle cx="29" cy="13.2" r="1.6" fill="${K.mustard}"/>`,
  },
  emblem: { w: 40, h: 40, body: nazar(20, 20, 17) },
  counter: {
    w: 80,
    h: 80,
    body: `<rect width="80" height="80" fill="${K.red}"/>${stepDiamond(40, 40, 3, K.indigo)}${stepDiamond(40, 40, 2, K.red)}${stepDiamond(40, 40, 1.1, K.mustard)}${eye(40, 40, 1.2)}${eye(0, 0, 1.4)}${eye(80, 0, 1.4)}${eye(0, 80, 1.4)}${eye(80, 80, 1.4)}<path d="M12 40 h6 M62 40 h6 M40 12 v6 M40 62 v6" stroke="${K.cream}" stroke-width="2"/>`,
  },
  wall: {
    w: 60,
    h: 60,
    body: `<rect width="60" height="60" fill="#eef0f2"/><path d="M30 6 L36 24 L54 30 L36 36 L30 54 L24 36 L6 30 L24 24Z" fill="${K.cobalt}"/><path d="M30 16 L33 27 L44 30 L33 33 L30 44 L27 33 L16 30 L27 27Z" fill="${K.tq}"/><circle cx="30" cy="30" r="3" fill="#fff"/><circle cx="0" cy="0" r="7" fill="${K.red}"/><circle cx="60" cy="0" r="7" fill="${K.red}"/><circle cx="0" cy="60" r="7" fill="${K.red}"/><circle cx="60" cy="60" r="7" fill="${K.red}"/><rect width="60" height="60" fill="none" stroke="#c9d3df" stroke-width="1"/>`,
  },
};

// ───────────────────────────────────────────── Sakura (seigaiha · kumiko · kintsugi)
const S = { pink: "#f2a7bb", ver: "#c8102e", ink: "#170f13", gold: "#d4af37", wood: "#c9a27a", bamboo: "#7d9a4a" };
const scale = (cx: number, cy: number) =>
  [19, 14, 9, 4].map((r, i) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${S.ink}" stroke="${i % 2 ? S.pink : "#8fa3c8"}" stroke-opacity=".7" stroke-width="1.1"/>`).join("");
const blossom = (cx: number, cy: number, r: number) =>
  [0, 72, 144, 216, 288]
    .map((a) => `<path transform="translate(${cx} ${cy}) rotate(${a}) scale(${r / 10})" d="M0 0 C-5 -3 -6 -9 -2.5 -11 L0 -9 L2.5 -11 C6 -9 5 -3 0 0Z" fill="${S.pink}"/>`)
    .join("") + `<circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="${S.ver}"/>`;

const sakura: Kit = {
  band: { w: 40, h: 20, body: `<rect width="40" height="20" fill="${S.ink}"/>${scale(0, 10)}${scale(40, 10)}${scale(20, 20)}` },
  track: { w: 40, h: 12, body: `<rect width="40" height="12" rx="2" fill="${S.bamboo}"/><rect width="40" height="4" fill="#9bb764" opacity=".7"/><rect x="36" width="3" height="12" fill="#4f6a2b"/><rect x="35" y="0" width="1" height="12" fill="#b6cf7f"/>` },
  thumb: { w: 34, h: 34, body: `<rect x="3" y="3" width="28" height="28" rx="5" fill="${S.ver}"/>${blossom(17, 17, 11)}` },
  corner: {
    w: 40,
    h: 40,
    body: `<path d="M3 37 V3 H37" stroke="${S.wood}" stroke-width="3" fill="none"/><path d="M9 37 V9 H37" stroke="${S.wood}" stroke-width="1" fill="none"/><path d="M3 9 L9 3 M3 15 L15 3" stroke="${S.wood}" stroke-width="1"/><path d="M9 20 L15 18 L17 24 L24 22 L27 29 L34 28" stroke="${S.gold}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
  },
  emblem: { w: 40, h: 40, body: `<rect x="5" y="5" width="30" height="30" rx="6" fill="${S.ver}"/><rect x="8" y="8" width="24" height="24" rx="4" fill="none" stroke="#f7eef0" stroke-width="1"/>${blossom(20, 20, 9)}` },
  counter: {
    w: 160,
    h: 40,
    body: `<rect width="160" height="40" fill="#d9b88f"/><path d="M0 8 C40 5 80 11 160 7 M0 17 C50 20 100 14 160 18 M0 27 C30 25 90 31 160 26 M0 35 C60 37 110 33 160 36" stroke="#b8925f" stroke-width="1" fill="none" opacity=".7"/><ellipse cx="110" cy="20" rx="7" ry="3" fill="none" stroke="#a9804f" stroke-width=".8"/>`,
  },
  wall: {
    w: 60,
    h: 80,
    body: `<rect width="60" height="80" fill="#f4ecdc"/><path d="M0 0 H60 V80 H0Z M30 0 V80 M0 26 H60 M0 53 H60" stroke="#5b3d24" stroke-width="2.4" fill="none"/><path d="M30 26 L36 32 M30 26 L24 32" stroke="#5b3d24" stroke-width="1"/>`,
  },
};

// ───────────────────────────────────────────── Cosmos
const C = { violet: "#9b7bff", pink: "#ff7ac8", ice: "#7fe6ff" };
const cosmos: Kit = {
  band: {
    w: 120,
    h: 20,
    body: `<path d="M4 14 L24 6 L46 12 L62 4 L86 14 L104 8 L120 12" stroke="${C.violet}" stroke-width=".8" fill="none" opacity=".8"/>${[
      [4, 14], [24, 6], [46, 12], [62, 4], [86, 14], [104, 8],
    ].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 3 ? 2.4 : 1.4}" fill="#fff"/>`).join("")}<circle cx="62" cy="4" r="5" fill="${C.ice}" opacity=".25"/>`,
  },
  track: { w: 16, h: 10, body: `<rect width="16" height="10" rx="5" fill="#141238"/><path d="M0 5 H9" stroke="${C.violet}" stroke-width="1.4" stroke-dasharray="3 2"/><circle cx="13" cy="5" r="1" fill="#fff"/>` },
  thumb: {
    w: 36,
    h: 36,
    body: `<defs><radialGradient id="p" cx=".35" cy=".35"><stop offset="0" stop-color="#e6dcff"/><stop offset="1" stop-color="#4b33a8"/></radialGradient></defs><circle cx="18" cy="18" r="10" fill="url(#p)"/><ellipse cx="18" cy="18" rx="17" ry="5" fill="none" stroke="${C.pink}" stroke-width="1.6" transform="rotate(-20 18 18)"/>`,
  },
  corner: { w: 40, h: 40, body: `<path d="M2 24 V2 H24" stroke="${C.ice}" stroke-width="1.6" fill="none"/><path d="M2 8 H7 M8 2 V7 M2 14 H5 M14 2 V5" stroke="${C.ice}" stroke-width="1"/><circle cx="10" cy="10" r="1.6" fill="${C.pink}"/>` },
  emblem: {
    w: 40,
    h: 40,
    body: `<circle cx="20" cy="20" r="9" fill="${C.violet}"/><ellipse cx="20" cy="20" rx="18" ry="5" fill="none" stroke="${C.pink}" stroke-width="1.6" transform="rotate(-20 20 20)"/><circle cx="34" cy="8" r="1.3" fill="#fff"/><circle cx="6" cy="32" r="1" fill="#fff"/>`,
  },
  counter: { w: 24, h: 24, body: `<rect width="24" height="24" fill="#0c0b26"/><path d="M0 0 H24 M0 0 V24" stroke="${C.violet}" stroke-opacity=".3"/>` },
  wall: {
    w: 120,
    h: 120,
    body: `<rect width="120" height="120" fill="#06061a"/>${Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 47) % 120}" cy="${(i * 71) % 120}" r="${(i % 4) * 0.35 + 0.4}" fill="#fff" opacity="${0.4 + (i % 3) * 0.2}"/>`).join("")}`,
  },
};

// ───────────────────────────────────────────── Jazz (piano · vinyl · mahogany & brass)
const J = { gold: "#d9b25f", ivory: "#f3e7c9", ink: "#0b0a08" };
const jazz: Kit = {
  band: {
    w: 49,
    h: 20,
    body: `<rect width="49" height="20" fill="${J.ink}"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${i * 7 + 0.5}" y="1" width="6" height="18" rx="1" fill="${J.ivory}"/>`).join("")}${[1, 2, 4, 5, 6].map((i) => `<rect x="${i * 7 - 2}" y="1" width="4" height="11" fill="${J.ink}"/>`).join("")}<rect width="49" height="1" fill="${J.gold}"/><rect y="19" width="49" height="1" fill="${J.gold}"/>`,
  },
  track: { w: 10, h: 10, body: `<rect width="10" height="10" rx="5" fill="#7a5a22"/><rect y="2" width="10" height="3" fill="${J.gold}"/><rect y="2" width="10" height="1" fill="#fff3c9" opacity=".7"/>` },
  thumb: {
    w: 36,
    h: 36,
    body: `<circle cx="18" cy="18" r="16" fill="#111"/>${[13, 11, 9].map((r) => `<circle cx="18" cy="18" r="${r}" fill="none" stroke="#2c2c2c" stroke-width=".8"/>`).join("")}<circle cx="18" cy="18" r="5.5" fill="${J.gold}"/><circle cx="18" cy="18" r="1.2" fill="#111"/><path d="M8 10 A13 13 0 0 1 16 5" stroke="#fff" stroke-opacity=".3" fill="none"/>`,
  },
  corner: {
    w: 40,
    h: 40,
    body: `<path d="M2 38 V16 H8 V8 H16 V2 H38" stroke="${J.gold}" stroke-width="1.6" fill="none"/><path d="M7 38 V21 H13 V13 H21 V7 H38" stroke="${J.gold}" stroke-width=".7" fill="none"/><path d="M2 2 L12 12 M2 7 L9 12 M7 2 L12 9" stroke="${J.gold}" stroke-width=".7"/>`,
  },
  emblem: { w: 40, h: 40, body: `<circle cx="20" cy="20" r="17" fill="#111" stroke="${J.gold}"/>${[14, 11].map((r) => `<circle cx="20" cy="20" r="${r}" fill="none" stroke="#333"/>`).join("")}<circle cx="20" cy="20" r="6" fill="${J.gold}"/><circle cx="20" cy="20" r="1.3" fill="#111"/>` },
  counter: {
    w: 160,
    h: 40,
    body: `<rect width="160" height="40" fill="#4a2316"/><path d="M0 9 C50 6 100 12 160 8 M0 20 C40 23 120 17 160 21 M0 31 C60 29 100 34 160 30" stroke="#2b130b" stroke-width="1.4" fill="none" opacity=".8"/><path d="M0 14 C70 16 90 12 160 15" stroke="#6b3420" fill="none"/>`,
  },
  wall: {
    w: 80,
    h: 40,
    body: `<rect width="80" height="40" fill="#120d08"/><g fill="none" stroke="${J.gold}" stroke-opacity=".35"><path d="M0 40 A40 40 0 0 1 80 40"/><path d="M12 40 A28 28 0 0 1 68 40"/><path d="M24 40 A16 16 0 0 1 56 40"/><path d="M40 40 V0 M40 40 L12 12 M40 40 L68 12"/></g>`,
  },
};

// ───────────────────────────────────────────── Alchemist
const A = { brass: "#c39245", verd: "#5f9470", parch: "#e6d9bd" };
const alchemist: Kit = {
  band: {
    w: 96,
    h: 20,
    body: `<path d="M0 10 H96" stroke="${A.brass}" stroke-width=".8"/><g fill="#12100b" stroke="${A.brass}" stroke-width="1.2"><circle cx="12" cy="10" r="6"/><path d="M36 4 A6 6 0 1 0 36 16 A4.5 4.5 0 1 1 36 4Z"/><path d="M60 4 L66 15 L54 15Z"/><path d="M84 16 L90 5 L78 5Z M80 9 H88"/></g><circle cx="12" cy="10" r="1.4" fill="${A.brass}"/>`,
  },
  track: { w: 10, h: 12, body: `<rect width="10" height="12" fill="#2a2418"/><path d="M0.5 0 V8 M5.5 0 V4" stroke="${A.brass}" stroke-width="1"/>` },
  thumb: {
    w: 34,
    h: 36,
    body: `<path d="M13 2 H21 V12 C29 15 31 20 31 24 C31 31 25 34 17 34 C9 34 3 31 3 24 C3 20 5 15 13 12Z" fill="#e8e2cf" fill-opacity=".25" stroke="${A.brass}" stroke-width="1.6"/><path d="M4 24 C4 30 10 33 17 33 C24 33 30 30 30 24Z" fill="${A.verd}"/><circle cx="12" cy="27" r="1.5" fill="#fff" opacity=".6"/><circle cx="20" cy="29" r="1" fill="#fff" opacity=".6"/>`,
  },
  corner: {
    w: 40,
    h: 40,
    body: `<path d="M2 38 C2 18 18 2 38 2" stroke="${A.brass}" stroke-width="1.4" fill="none"/><path d="M8 38 C8 22 22 8 38 8" stroke="${A.brass}" stroke-width=".6" fill="none"/><path d="M12 12 c6 -1 7 6 1 6 c-4 0 -4 -4 -1 -4" stroke="${A.brass}" fill="none"/><circle cx="4" cy="4" r="2" fill="${A.brass}"/>`,
  },
  emblem: {
    w: 40,
    h: 40,
    body: `<g fill="none" stroke="${A.brass}" stroke-width="1.6"><circle cx="20" cy="18" r="6"/><path d="M14 8 A6 6 0 0 0 26 8"/><path d="M20 24 V36 M15 31 H25"/></g>`,
  },
  counter: { w: 160, h: 40, body: `<rect width="160" height="40" fill="#5a3d1f"/><path d="M0 10 C40 8 120 13 160 10 M0 22 C60 24 90 19 160 23 M0 33 C40 31 110 36 160 32" stroke="#3b2612" stroke-width="1.2" fill="none"/>` },
  wall: { w: 80, h: 40, body: `<rect width="80" height="40" fill="#1d1710"/><path d="M0 39 H80" stroke="#3b2c19" stroke-width="2"/><path d="M40 0 V40" stroke="#2a2016" stroke-width="1"/>` },
};

// ───────────────────────────────────────────── Tiki
const T = { tapa: "#e9d8b4", bark: "#3a2210", hib: "#e2574c", tan: "#c9a25a", leaf: "#2a6b45" };
const hibiscus = (cx: number, cy: number, r: number) =>
  [0, 72, 144, 216, 288].map((a) => `<ellipse cx="${cx}" cy="${cy - r * 0.55}" rx="${r * 0.42}" ry="${r * 0.55}" fill="${T.hib}" transform="rotate(${a} ${cx} ${cy})"/>`).join("") +
  `<circle cx="${cx}" cy="${cy}" r="${r * 0.25}" fill="#9b1b30"/><path d="M${cx} ${cy} L${cx + r * 0.7} ${cy - r * 0.7}" stroke="#f3d36b" stroke-width="${r * 0.12}" stroke-linecap="round"/>`;
const tiki: Kit = {
  band: {
    w: 32,
    h: 20,
    body: `<rect width="32" height="20" fill="${T.tapa}"/><path d="M0 0 L8 7 L16 0Z M16 0 L24 7 L32 0Z" fill="${T.bark}"/><path d="M0 20 L8 13 L16 20Z M16 20 L24 13 L32 20Z" fill="${T.bark}"/><circle cx="8" cy="10" r="1.5" fill="${T.bark}"/><circle cx="24" cy="10" r="1.5" fill="${T.bark}"/><path d="M14 10 H18" stroke="${T.hib}" stroke-width="2"/>`,
  },
  track: { w: 30, h: 12, body: `<rect width="30" height="12" rx="3" fill="${T.tan}"/><rect width="30" height="3" fill="#e3c17d"/><rect x="26" width="2.5" height="12" fill="#8a6a2f"/><path d="M10 0 L14 12 M13 0 L17 12" stroke="${T.bark}" stroke-width=".8"/>` },
  thumb: { w: 36, h: 36, body: hibiscus(18, 18, 15) },
  corner: {
    w: 40,
    h: 40,
    body: `<rect x="2" y="2" width="6" height="36" rx="3" fill="${T.tan}"/><rect x="2" y="2" width="36" height="6" rx="3" fill="${T.tan}"/><path d="M2 20 H8 M20 2 V8" stroke="#8a6a2f" stroke-width="1.4"/><path d="M1 1 L9 9 M9 1 L1 9" stroke="${T.bark}" stroke-width="1.6"/>`,
  },
  emblem: { w: 40, h: 40, body: hibiscus(20, 20, 16) },
  counter: {
    w: 24,
    h: 60,
    body: `<rect width="24" height="60" fill="#7a5a2a"/><rect x="1" width="10" height="60" rx="5" fill="${T.tan}"/><rect x="13" width="10" height="60" rx="5" fill="#b8914c"/><path d="M1 22 H11 M13 40 H23" stroke="#6b4a1f" stroke-width="2"/><rect x="3" width="2" height="60" fill="#e3c17d" opacity=".6"/>`,
  },
  wall: {
    w: 60,
    h: 60,
    body: `<rect width="60" height="60" fill="#0f2318"/><path d="M0 60 C10 40 25 30 60 25 C35 38 20 48 0 60Z" fill="${T.leaf}" opacity=".6"/><path d="M0 60 C14 46 30 34 60 25" stroke="#0c1a14" fill="none"/>`,
  },
};

// ───────────────────────────────────────────── Maison (black marble · gold · deco)
const M = { gold: "#c9a961" };
const maison: Kit = {
  band: {
    w: 40,
    h: 20,
    body: `<g fill="none" stroke="${M.gold}" stroke-width=".9"><path d="M0 20 A20 20 0 0 1 40 20"/><path d="M6 20 A14 14 0 0 1 34 20"/><path d="M12 20 A8 8 0 0 1 28 20"/><path d="M20 20 V0 M20 20 L6 6 M20 20 L34 6"/></g>`,
  },
  track: { w: 10, h: 8, body: `<rect width="10" height="8" fill="#141312"/><path d="M0 2.5 H10 M0 5.5 H10" stroke="${M.gold}" stroke-width=".9"/>` },
  thumb: {
    w: 30,
    h: 34,
    body: `<path d="M15 1 L29 17 L15 33 L1 17Z" fill="${M.gold}"/><path d="M15 1 L22 17 L15 33 L8 17Z" fill="#f3e3b3" opacity=".55"/><path d="M1 17 H29" stroke="#8a6a2f" stroke-width=".8"/>`,
  },
  corner: {
    w: 40,
    h: 40,
    body: `<path d="M2 38 V12 H12 V2 H38" stroke="${M.gold}" stroke-width="1.3" fill="none"/><path d="M6 38 V16 H16 V6 H38" stroke="${M.gold}" stroke-width=".6" fill="none"/><path d="M2 2 L8 2 L2 8Z" fill="${M.gold}"/>`,
  },
  emblem: { w: 40, h: 40, body: `<circle cx="20" cy="20" r="17" fill="none" stroke="${M.gold}"/><path d="M20 7 L30 20 L20 33 L10 20Z" fill="${M.gold}"/><path d="M20 7 L24 20 L20 33 L16 20Z" fill="#f3e3b3" opacity=".5"/>` },
  counter: {
    w: 220,
    h: 60,
    body: `<rect width="220" height="60" fill="#151413"/><path d="M0 14 C40 8 70 30 120 22 C160 16 190 34 220 28" stroke="${M.gold}" stroke-opacity=".45" stroke-width="1" fill="none"/><path d="M0 44 C30 50 80 36 130 46 C170 54 200 40 220 46" stroke="#8a857c" stroke-opacity=".5" stroke-width=".8" fill="none"/><path d="M60 0 C70 18 64 34 80 60" stroke="#8a857c" stroke-opacity=".3" stroke-width=".6" fill="none"/>`,
  },
  wall: {
    w: 80,
    h: 80,
    body: `<rect width="80" height="80" fill="#0e0d0c"/><g fill="none" stroke="${M.gold}" stroke-opacity=".3"><path d="M10 80 V30 A30 30 0 0 1 70 30 V80"/><path d="M18 80 V32 A22 22 0 0 1 62 32 V80"/></g>`,
  },
};

export const KITS: Record<WorldId, Kit> = { maison, anatolia, cosmos, jazz, sakura, alchemist, tiki };

function kitVars(k: Kit) {
  const rot = (deg: number) => (b: string) => `<g transform="rotate(${deg} 20 20)">${b}</g>`;
  const bandV: Art = { w: k.band.h, h: k.band.w, body: `<g transform="translate(${k.band.h} 0) rotate(90)">${k.band.body}</g>` };
  return [
    `--band:${uri(svg(k.band))}`,
    `--band-w:${k.band.w}px`,
    `--band-h:${k.band.h}px`,
    `--bandV:${uri(svg(bandV))}`,
    `--track:${uri(svg(k.track))}`,
    `--track-h:${k.track.h}px`,
    `--thumb:${uri(svg(k.thumb))}`,
    `--thumb-w:${k.thumb.w}px`,
    `--thumb-h:${k.thumb.h}px`,
    `--c-tl:${uri(svg(k.corner))}`,
    `--c-tr:${uri(svg(k.corner, rot(90)))}`,
    `--c-br:${uri(svg(k.corner, rot(180)))}`,
    `--c-bl:${uri(svg(k.corner, rot(270)))}`,
    `--emblem:${uri(svg(k.emblem))}`,
    `--counter:${uri(svg(k.counter))}`,
    `--wall:${uri(svg(k.wall))}`,
  ].join(";");
}

/** CSS that attaches every world's kit to [data-world] and to the gate cards. */
export function themeCSS(): string {
  return (Object.keys(KITS) as WorldId[])
    .map((id) => `[data-world="${id}"],.wc-${id}{${kitVars(KITS[id])}}`)
    .join("\n");
}
