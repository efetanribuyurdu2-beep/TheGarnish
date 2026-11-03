/**
 * Transition sound effects, synthesised live with the Web Audio API (no files).
 * Each cue follows its world's transition: the cover (0 → 0.75 s), the swap,
 * then the reveal (0.75 → 1.8 s). Independent of the background music; the
 * visitor can switch them off on their own (prefs.sfx).
 */
import { unlockAudio } from "./audio";
import type { WorldId } from "./types";

const COVER = 0.75; // seconds, same as TRANSIT_IN

let ctx: AudioContext | null = null;
let out: GainNode | null = null;
let room: GainNode | null = null;
/** Where the notes of the cue being scheduled go (a per-cue level, see LEVEL). */
let bus: AudioNode | null = null;

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0.55;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 4;
  // small generated room so the cues sit in a space
  const conv = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 1.8);
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  conv.buffer = ir;
  const wet = ctx.createGain();
  wet.gain.value = 0.3;
  out = ctx.createGain();
  room = ctx.createGain();
  out.connect(comp);
  room.connect(conv).connect(wet).connect(comp);
  room.connect(comp);
  comp.connect(master).connect(ctx.destination);
  return ctx;
}

const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12);
const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** A pitched note with an attack/decay envelope; `glide` bends the pitch to that frequency. */
function tone(type: OscillatorType, f: number, t: number, a: number, peak: number, d: number, o: { glide?: number; lp?: number; dest?: AudioNode; detune?: number } = {}) {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(f, t);
  if (o.glide) osc.frequency.exponentialRampToValueAtTime(o.glide, t + a + d);
  if (o.detune) osc.detune.value = o.detune;
  let node: AudioNode = osc;
  if (o.lp) {
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(o.lp, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(150, o.lp / 5), t + a + d);
    osc.connect(lp);
    node = lp;
  }
  node.connect(g).connect(o.dest ?? bus ?? room!);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  osc.start(t);
  osc.stop(t + a + d + 0.05);
}

let noiseBuf: AudioBuffer | null = null;
/** Filtered noise: wind, cloth, rustle, hiss. `to` sweeps the filter frequency. */
function noise(t: number, a: number, peak: number, d: number, type: BiquadFilterType, f: number, o: { to?: number; q?: number; dest?: AudioNode; pan?: number } = {}) {
  const c = ctx!;
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const ch = noiseBuf.getChannelData(0);
    for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
  }
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;
  const flt = c.createBiquadFilter();
  flt.type = type;
  flt.frequency.setValueAtTime(f, t);
  if (o.to) flt.frequency.exponentialRampToValueAtTime(o.to, t + a + d);
  flt.Q.value = o.q ?? 1;
  const g = c.createGain();
  let node: AudioNode = src.connect(flt).connect(g);
  if (o.pan !== undefined && c.createStereoPanner) {
    const p = c.createStereoPanner();
    p.pan.setValueAtTime(o.pan, t);
    p.pan.linearRampToValueAtTime(-o.pan, t + a + d);
    node = node.connect(p);
  }
  node.connect(o.dest ?? bus ?? room!);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  src.start(t, Math.random());
  src.stop(t + a + d + 0.05);
}

/** A struck bell / glass: a few inharmonic partials that ring out. */
function bell(f: number, t: number, peak: number, d = 1.6) {
  [1, 2.76, 5.4].forEach((r, i) => tone("sine", f * r, t, 0.004, peak / (i + 1.5), d / (i + 1)));
}

/** Plucked string (koto, ukulele, mandolin): bright attack, quick filter close. */
function pluck(f: number, t: number, peak: number, d = 0.9) {
  tone("triangle", f, t, 0.004, peak, d, { lp: 5200 });
  tone("sawtooth", f, t, 0.003, peak * 0.25, d * 0.35, { lp: 3000 });
}

/** Drum: a pitched thump falling in pitch, plus an optional slap of noise. */
function drum(f: number, t: number, peak: number, slap = 0) {
  tone("sine", f * 1.8, t, 0.003, peak, 0.28, { glide: f });
  if (slap) noise(t, 0.002, slap, 0.07, "bandpass", 2400, { q: 0.8 });
}

const CUES: Record<WorldId, (t: number) => void> = {
  // golden Art Deco fan opening: a rising glass arpeggio, a shimmer, then a champagne chord
  maison(t) {
    [72, 76, 79, 83, 86, 91].forEach((m, i) => bell(mtof(m), t + i * 0.09, 0.05, 1.2));
    noise(t, 0.5, 0.03, 0.6, "highpass", 7000);
    [60, 64, 67, 71, 74].forEach((m) => tone("sine", mtof(m), t + COVER, 0.02, 0.05, 1.6));
    bell(mtof(96), t + COVER + 0.05, 0.06, 1.8);
  },
  // kilim curtains drawn (heavy cloth), a darbuka "düm tek-tek düm", a little finger cymbal
  anatolia(t) {
    noise(t, 0.35, 0.18, 0.45, "bandpass", 500, { to: 1400, q: 0.7, pan: -0.6 });
    noise(t + 0.08, 0.35, 0.14, 0.45, "bandpass", 600, { to: 1600, q: 0.7, pan: 0.6 });
    const b = t + COVER - 0.05;
    drum(80, b, 0.5);
    drum(300, b + 0.22, 0.12, 0.12);
    drum(300, b + 0.34, 0.1, 0.1);
    drum(80, b + 0.5, 0.45);
    bell(mtof(100), b + 0.5, 0.03, 0.9);
  },
  // the jump to light speed: a rising whoosh, then the drop out of warp and a starry glitter
  cosmos(t) {
    tone("sawtooth", 60, t, 0.6, 0.08, 0.2, { glide: 900, lp: 2400 });
    tone("sine", 120, t, 0.6, 0.1, 0.25, { glide: 1800 });
    noise(t, 0.6, 0.12, 0.3, "bandpass", 400, { to: 6000, q: 1.5 });
    tone("sine", 900, t + COVER, 0.005, 0.12, 0.5, { glide: 70 });
    for (let i = 0; i < 8; i++) tone("sine", mtof(84 + Math.floor(rand(0, 14))), t + COVER + 0.12 + i * 0.08, 0.005, 0.03, 0.6);
  },
  // velvet stage curtains part, then the house pianist plays a warm Dm9 voicing
  jazz(t) {
    noise(t, 0.4, 0.14, 0.4, "lowpass", 900, { to: 400, pan: -0.5 });
    noise(t + 0.05, 0.4, 0.12, 0.4, "lowpass", 900, { to: 400, pan: 0.5 });
    const r = t + COVER;
    [50, 57, 60, 64, 65, 69].forEach((m, i) => {
      tone("triangle", mtof(m), r + i * 0.025, 0.006, 0.07, 1.8, { lp: 2600 });
      tone("sine", mtof(m + 12), r + i * 0.025, 0.006, 0.02, 1.2);
    });
    noise(r, 0.01, 0.04, 0.5, "highpass", 5000); // brush on the snare
  },
  // a gust of spring wind, wind-chime glass (fūrin) and a koto phrase as the petals clear
  sakura(t) {
    noise(t, 0.5, 0.1, 0.8, "bandpass", 700, { to: 1800, q: 0.6, pan: -0.4 });
    [88, 93, 91, 96].forEach((m, i) => bell(mtof(m), t + 0.15 + i * rand(0.1, 0.16), 0.025, 1.4));
    [62, 64, 69, 71, 74].forEach((m, i) => pluck(mtof(m), t + COVER + 0.05 + i * 0.13, 0.08, 1.1));
  },
  // a bubbling flask, a hiss of smoke, then a low brass gong as the glyphs fade
  alchemist(t) {
    for (let i = 0; i < 10; i++) {
      const f = rand(300, 900);
      tone("sine", f, t + i * 0.06 + rand(0, 0.03), 0.004, 0.05, 0.07, { glide: f * 1.8 });
    }
    noise(t + 0.2, 0.4, 0.06, 0.6, "highpass", 3000, { to: 1200 });
    const g = t + COVER;
    [55, 110.3, 166.1, 247.2].forEach((f, i) => tone("sine", f, g, 0.01, 0.12 / (i + 1), 2.2));
  },
  // palm fronds rustling in, a log-drum pattern and a ukulele strum
  tiki(t) {
    for (let i = 0; i < 6; i++) noise(t + i * 0.1, 0.02, 0.08, 0.14, "highpass", 2500, { pan: i % 2 ? 0.6 : -0.6 });
    const b = t + COVER - 0.1;
    [0, 0.14, 0.28, 0.5].forEach((d, i) => drum(i === 3 ? 140 : 220, b + d, 0.25, 0.04));
    [67, 60, 64, 69].forEach((m, i) => pluck(mtof(m), t + COVER + 0.3 + i * 0.03, 0.08, 0.9));
  },
  // a blizzard howl sweeping across, ice crystals chiming, a cold low drone
  boreal(t) {
    noise(t, 0.45, 0.16, 0.7, "bandpass", 500, { to: 2200, q: 3, pan: -0.8 });
    noise(t + 0.1, 0.45, 0.1, 0.6, "bandpass", 800, { to: 3000, q: 4, pan: 0.8 });
    tone("sine", 55, t, 0.4, 0.08, 1.4);
    [95, 100, 98, 103, 107].forEach((m, i) => bell(mtof(m), t + COVER + i * 0.09, 0.025, 1.2));
  },
  // wooden shutters clacking open slat by slat, then a mandolin tremolo in the sun
  riviera(t) {
    for (let i = 0; i < 7; i++) noise(t + i * 0.08, 0.002, 0.14, 0.05, "bandpass", 1500 - i * 60, { q: 3 });
    noise(t + 0.6, 0.002, 0.18, 0.08, "bandpass", 900, { q: 2 });
    const r = t + COVER + 0.05;
    for (let i = 0; i < 10; i++) {
      pluck(mtof(i < 5 ? 76 : 79), r + i * 0.07, 0.05, 0.25);
      pluck(mtof(i < 5 ? 69 : 72), r + i * 0.07 + 0.01, 0.035, 0.25);
    }
  },
};

/** Loudness trim per world, measured offline so every cue lands at about the same RMS. */
const LEVEL: Record<WorldId, number> = { maison: 1, anatolia: 0.65, cosmos: 1.25, jazz: 0.95, sakura: 1.1, alchemist: 0.9, tiki: 0.7, boreal: 1.6, riviera: 1.8 };

/** Play the sound of travelling into `to`. Must be called from a click (browsers need a gesture). */
export function playTransitionSfx(to: WorldId) {
  try {
    const c = ensure();
    if (!c) return;
    unlockAudio(c);
    const g = c.createGain();
    g.gain.value = LEVEL[to];
    g.connect(room!);
    bus = g;
    CUES[to](c.currentTime + 0.02);
    bus = null;
  } catch {
    /* audio unavailable: the transition simply plays in silence */
  }
}

/** A short confirmation chime when the sounds are switched on, so the visitor hears the level. */
export function playSfxPreview(world: WorldId) {
  try {
    const c = ensure();
    if (!c) return;
    unlockAudio(c);
    const t = c.currentTime + 0.02;
    const base = world === "cosmos" || world === "boreal" ? 88 : world === "jazz" || world === "anatolia" ? 74 : 81;
    bell(mtof(base), t, 0.05, 0.9);
    bell(mtof(base + 7), t + 0.1, 0.04, 0.9);
  } catch {
    /* no audio */
  }
}
