/**
 * Generative background music, synthesised live with the Web Audio API.
 * No audio files and no licensing: every world has its own little band.
 */
import type { WorldId } from "./types";

type Ctx = AudioContext;
const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12);
const rnd = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const chance = (p: number) => Math.random() < p;

class Voice {
  constructor(public ctx: Ctx, public out: AudioNode) {}

  env(g: GainNode, t: number, a: number, peak: number, d: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  osc(type: OscillatorType, f: number, t: number, a: number, peak: number, d: number, filter?: number, dest: AudioNode = this.out) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    let node: AudioNode = o;
    if (filter) {
      const lp = this.ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(filter, t);
      lp.frequency.exponentialRampToValueAtTime(Math.max(200, filter / 6), t + a + d);
      o.connect(lp);
      node = lp;
    }
    node.connect(g).connect(dest);
    this.env(g, t, a, peak, d);
    o.start(t);
    o.stop(t + a + d + 0.05);
    return o;
  }

  noise(t: number, dur: number, peak: number, type: BiquadFilterType, freq: number, q = 1, dest: AudioNode = this.out) {
    const len = Math.ceil(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    src.connect(f).connect(g).connect(dest);
    this.env(g, t, 0.002, peak, dur);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  // instruments
  pluck(m: number, t: number, v = 0.25, bright = 3000, decay = 1.2) {
    this.osc("sawtooth", mtof(m), t, 0.004, v * 0.6, decay, bright);
    this.osc("triangle", mtof(m), t, 0.004, v, decay * 0.8);
  }
  bell(m: number, t: number, v = 0.12, decay = 3) {
    this.osc("sine", mtof(m), t, 0.003, v, decay);
    this.osc("sine", mtof(m) * 2.76, t, 0.003, v * 0.35, decay * 0.4);
    this.osc("sine", mtof(m) * 5.4, t, 0.003, v * 0.12, decay * 0.2);
  }
  keys(m: number, t: number, v = 0.12, decay = 1.6) {
    this.osc("triangle", mtof(m), t, 0.006, v, decay, 2400);
    this.osc("sine", mtof(m) * 2, t, 0.006, v * 0.25, decay * 0.5);
  }
  pad(ms: number[], t: number, dur: number, v = 0.05, cutoff = 1200) {
    for (const m of ms)
      for (const det of [-6, 6]) {
        const o = this.osc("sawtooth", mtof(m), t, dur * 0.4, v, dur * 0.7, cutoff);
        o.detune.value = det;
      }
  }
  bass(m: number, t: number, v = 0.3, d = 0.5) {
    this.osc("triangle", mtof(m), t, 0.01, v, d, 900);
    this.osc("sine", mtof(m), t, 0.01, v * 0.8, d);
  }
  /** breathy reed (ney / shakuhachi) with vibrato */
  reed(m: number, t: number, dur: number, v = 0.09) {
    const o = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lg = this.ctx.createGain();
    const g = this.ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(mtof(m) * 0.985, t);
    o.frequency.linearRampToValueAtTime(mtof(m), t + 0.15);
    lfo.frequency.value = 5.2;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(mtof(m) * 0.012, t + dur * 0.5);
    lfo.connect(lg).connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.25);
    g.gain.setValueAtTime(v, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.out);
    o.start(t);
    lfo.start(t);
    o.stop(t + dur + 0.05);
    lfo.stop(t + dur + 0.05);
    this.noise(t, Math.min(dur, 0.6), v * 0.25, "bandpass", mtof(m) * 2, 3);
  }
  // percussion
  doum(t: number, v = 0.5) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.25);
    o.connect(g).connect(this.out);
    this.env(g, t, 0.003, v, 0.35);
    o.start(t);
    o.stop(t + 0.4);
  }
  tek(t: number, v = 0.25) {
    this.noise(t, 0.06, v, "bandpass", 3200, 2);
    this.osc("sine", 820, t, 0.001, v * 0.4, 0.05);
  }
  hat(t: number, v = 0.06, open = false) {
    this.noise(t, open ? 0.3 : 0.05, v, "highpass", 7000);
  }
  ride(t: number, v = 0.05) {
    this.noise(t, 0.5, v, "highpass", 5000);
    this.osc("square", 3100, t, 0.001, v * 0.08, 0.4, 8000);
  }
  shaker(t: number, v = 0.05) {
    this.noise(t, 0.07, v, "bandpass", 6000, 1.5);
  }
}

interface Band {
  bpm: number;
  swing?: number; // 0..0.33 delay on off-8ths
  steps: number; // steps per bar (16ths)
  setup?: (v: Voice, ctx: Ctx, out: AudioNode) => (() => void) | void;
  play: (v: Voice, step: number, bar: number, t: number, sd: number) => void;
}

// ─────────────────────────────────────────── the bands
const HICAZ = [62, 63, 66, 67, 69, 70, 72, 74, 75, 78]; // D hicaz
const IN = [62, 63, 67, 69, 70, 74, 75, 79, 81]; // D in-scale (miyako-bushi)

let walk = 4;
const stepWalk = (scale: number[], span = 2) => {
  walk = Math.max(0, Math.min(scale.length - 1, walk + Math.floor(Math.random() * (span * 2 + 1)) - span));
  return scale[walk];
};

const drone = (v: Voice, ctx: Ctx, out: AudioNode, notes: number[], gain: number, type: OscillatorType = "sawtooth", cutoff = 500) => {
  const g = ctx.createGain();
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 3);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = cutoff;
  lp.connect(g).connect(out);
  const oscs = notes.map((m, i) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = mtof(m);
    o.detune.value = i * 4 - 3;
    o.connect(lp);
    o.start();
    return o;
  });
  return () => {
    g.gain.cancelScheduledValues(ctx.currentTime);
    g.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    oscs.forEach((o) => o.stop(ctx.currentTime + 1.5));
  };
};

const ambience = (ctx: Ctx, out: AudioNode, freq: number, type: BiquadFilterType, gain: number, lfoRate: number) => {
  const len = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; // brown-ish
    d[i] = last * 3.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.value = gain;
  const lfo = ctx.createOscillator();
  const lg = ctx.createGain();
  lfo.frequency.value = lfoRate;
  lg.gain.value = gain * 0.8;
  lfo.connect(lg).connect(g.gain);
  src.connect(f).connect(g).connect(out);
  src.start();
  lfo.start();
  return () => {
    g.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    src.stop(ctx.currentTime + 1.5);
    lfo.stop(ctx.currentTime + 1.5);
  };
};

const BANDS: Record<WorldId, Band> = {
  // Anatolia: maqsum on darbuka, ney improvising in Hicaz, drone on D
  anatolia: {
    bpm: 92,
    steps: 16,
    setup: (v, ctx, out) => drone(v, ctx, out, [38, 45, 50], 0.05),
    play: (v, s, bar, t, sd) => {
      // maqsum: D T . T D . T .  (8ths)
      const pat = ["D", "", "T", "", "", "", "T", "", "D", "", "", "", "T", "", "", ""];
      if (pat[s] === "D") v.doum(t, 0.45);
      if (pat[s] === "T") v.tek(t, 0.2);
      if (s % 2 === 1 && chance(0.25)) v.tek(t, 0.07);
      if (s % 4 === 0 && chance(bar % 4 === 3 ? 0.2 : 0.55)) v.reed(stepWalk(HICAZ), t, sd * rnd([4, 6, 8]), 0.08);
      if (s === 0 && bar % 2 === 0) v.pluck(50, t, 0.12, 1500, 1.6); // oud-like root
    },
  },
  // Sakura: sparse koto in the in-scale, shakuhachi breaths, wind
  sakura: {
    bpm: 66,
    steps: 16,
    setup: (_v, ctx, out) => ambience(ctx, out, 900, "bandpass", 0.05, 0.07),
    play: (v, s, bar, t, sd) => {
      if (s % 2 === 0 && chance(s === 0 ? 0.9 : 0.28)) {
        const m = stepWalk(IN);
        v.pluck(m, t, 0.18, 4200, 1.8);
        if (chance(0.25)) v.pluck(m + 12, t + sd * 0.5, 0.08, 5000, 1.2);
      }
      if (s === 0 && bar % 4 === 0) v.reed(rnd([62, 67, 69]), t, sd * 14, 0.06);
      if (s === 0 && bar % 2 === 1) v.pluck(50, t, 0.12, 1200, 2.5);
      if (s === 8 && chance(0.2)) v.bell(rnd([86, 91, 93]), t, 0.03, 4);
    },
  },
  // Jazz: swing ii-V-I-VI in F with walking bass, ride and piano comping
  jazz: {
    bpm: 128,
    swing: 0.3,
    steps: 16,
    play: (v, s, bar, t) => {
      const chords = [
        { root: 43, tones: [55, 58, 62, 65] }, // Gm7
        { root: 36, tones: [52, 55, 58, 62] }, // C7
        { root: 41, tones: [57, 60, 64, 65] }, // Fmaj7
        { root: 38, tones: [54, 57, 60, 62] }, // D7
      ];
      const c = chords[bar % 4];
      if (s % 4 === 0) {
        const beat = s / 4;
        const line = [c.root, c.root + rnd([3, 4]), c.root + 7, c.root + rnd([9, 10, 11])];
        v.bass(line[beat], t, 0.32, 0.45);
      }
      if (s === 0 || s === 4 || s === 8 || s === 12 || s === 6 || s === 14) v.ride(t, s % 4 === 0 ? 0.04 : 0.025);
      if (s === 4 || s === 12) v.hat(t, 0.05);
      if ((s === 6 || s === 10 || s === 14 || s === 2) && chance(0.35)) c.tones.forEach((m) => v.keys(m, t, 0.05, 0.5));
      if (s % 2 === 0 && chance(0.12)) v.keys(rnd(c.tones) + 12, t, 0.06, 0.4);
    },
  },
  // Cosmos: slow pads and twinkling arpeggios
  cosmos: {
    bpm: 72,
    steps: 16,
    play: (v, s, bar, t, sd) => {
      const prog = [
        [57, 64, 67, 71, 74], // Am9
        [53, 60, 64, 69], // Fmaj7
        [48, 55, 59, 64], // Cmaj7
        [55, 62, 64, 71], // G6
      ];
      const ch = prog[Math.floor(bar / 2) % 4];
      if (s === 0 && bar % 2 === 0) v.pad(ch, t, sd * 32, 0.022, 1400);
      if (s === 0 && bar % 2 === 0) v.bass(ch[0] - 24, t, 0.18, sd * 30);
      if (chance(0.5)) v.bell(rnd(ch) + 12 + (chance(0.3) ? 12 : 0), t, 0.035, 2.5);
    },
  },
  // Alchemist: dark drone, tolling bells, a music box tune
  alchemist: {
    bpm: 64,
    steps: 16,
    setup: (v, ctx, out) => drone(v, ctx, out, [26, 33, 38], 0.06, "sawtooth", 380),
    play: (v, s, bar, t, sd) => {
      const phryg = [74, 75, 77, 79, 81, 82, 84, 86];
      if (s === 0 && bar % 2 === 0) v.bell(rnd([50, 53, 57]), t, 0.1, 6);
      if (s % 2 === 0 && chance(bar % 4 < 2 ? 0.45 : 0.15)) v.bell(stepWalk(phryg, 1) + 12, t, 0.035, 1.2);
      if (s === 8 && bar % 4 === 2) v.pad([50, 53, 57], t, sd * 30, 0.025, 700);
    },
  },
  // Tiki: ukulele strums, steel drum, shaker and the ocean
  tiki: {
    bpm: 104,
    steps: 16,
    setup: (_v, ctx, out) => ambience(ctx, out, 500, "lowpass", 0.09, 0.12),
    play: (v, s, bar, t, sd) => {
      const chords = [
        [67, 72, 76, 79], // C
        [69, 72, 76, 81], // Am
        [69, 72, 77, 81], // F
        [67, 71, 74, 79], // G
      ];
      const ch = chords[bar % 4];
      const strum = [0, 6, 8, 10, 14]; // D . . D U D U
      if (strum.includes(s)) ch.forEach((m, i) => v.pluck(m, t + i * 0.012, 0.07, 3500, 0.5));
      if (s % 2 === 0) v.shaker(t, s % 4 === 0 ? 0.05 : 0.03);
      if (s % 2 === 0 && chance(0.3)) {
        const m = rnd([72, 74, 76, 79, 81, 84]);
        v.osc("sine", mtof(m), t, 0.004, 0.09, 0.7);
        v.osc("sine", mtof(m) * 2.02, t, 0.004, 0.04, 0.4);
      }
      if (s === 0 || s === 8) v.bass(ch[0] - 24, t, 0.22, sd * 6);
    },
  },
  // Boreal: kantele in D minor pentatonic over a polar wind, a deep bell and a slow pad
  boreal: {
    bpm: 68,
    steps: 16,
    setup: (v, ctx, out) => {
      const wind = ambience(ctx, out, 1400, "bandpass", 0.05, 0.05);
      const dr = drone(v, ctx, out, [38, 45], 0.035, "sine", 600);
      return () => {
        wind();
        dr();
      };
    },
    play: (v, s, bar, t, sd) => {
      const pent = [62, 65, 67, 69, 72, 74, 77, 79, 81];
      const pads = [
        [50, 57, 62, 65], // Dm
        [46, 53, 58, 62], // Bb
        [48, 55, 60, 64], // C
        [45, 52, 57, 60], // Am
      ];
      if (s === 0 && bar % 2 === 0) v.pad(pads[(bar / 2) % 4], t, sd * 32, 0.014, 900);
      if (s === 0 && bar % 4 === 0) v.bell(50, t, 0.06, 6);
      if (s % 2 === 0 && chance(s === 0 ? 0.85 : 0.32)) {
        const m = stepWalk(pent);
        v.pluck(m, t, 0.13, 5200, 2.4);
        if (chance(0.3)) v.pluck(m - 5, t + sd * 0.5, 0.06, 4000, 1.8);
      }
      if (bar % 4 >= 2 && s % 4 === 2 && chance(0.4)) v.shaker(t, 0.025); // distant sleigh bells
    },
  },
  // Riviera: a mandolin tremolo over an "oom-pah-pah" waltz, cicadas in the heat
  riviera: {
    bpm: 112,
    steps: 12,
    setup: (_v, ctx, out) => ambience(ctx, out, 5200, "highpass", 0.018, 5),
    play: (v, s, bar, t, sd) => {
      const chords = [
        [57, 60, 64], // Am
        [62, 65, 69], // Dm
        [52, 56, 59, 62], // E7
        [57, 60, 64], // Am
        [53, 57, 60], // F
        [48, 52, 55], // C
        [52, 56, 59, 62], // E7
        [57, 60, 64], // Am
      ];
      const ch = chords[bar % 8];
      if (s === 0) v.bass(ch[0] - 12, t, 0.28, sd * 3);
      if (s === 4 || s === 8) ch.forEach((m, i) => v.pluck(m, t + i * 0.01, 0.045, 2200, 0.35));
      if (s % 4 === 0 && chance(s === 0 ? 0.7 : 0.45)) {
        const scale = [69, 71, 72, 74, 76, 77, 80, 81, 83];
        const m = chance(0.5) ? stepWalk(scale, 1) : rnd(ch) + 12;
        const n = rnd([4, 6, 8]);
        for (let k = 0; k < n; k++) v.pluck(m, t + k * sd * 0.5, 0.05, 4800, 0.18);
      }
    },
  },
  // Maison: late-night lounge piano with a soft string bed
  maison: {
    bpm: 76,
    steps: 16,
    play: (v, s, bar, t, sd) => {
      const prog = [
        [49, 60, 63, 65, 68], // Dbmaj9
        [46, 56, 60, 61, 65], // Bbm9
        [51, 61, 65, 66, 70], // Ebm9
        [44, 60, 63, 65, 66], // Ab13
      ];
      const ch = prog[bar % 4];
      if (s === 0) {
        v.bass(ch[0] - 12, t, 0.22, sd * 14);
        v.pad(ch.slice(1), t, sd * 16, 0.012, 900);
      }
      if (s === 0 || s === 6 || s === 10) ch.slice(1).forEach((m, i) => v.keys(m, t + i * 0.02, 0.05, 1.8));
      if (s % 2 === 0 && chance(0.18)) v.keys(rnd(ch.slice(1)) + 12, t, 0.07, 1.2);
    },
  },
};

// ─────────────────────────────────────────── player
export class MusicPlayer {
  private ctx: Ctx | null = null;
  private master: GainNode | null = null;
  private bus: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private teardown: (() => void) | void = undefined;
  private world: WorldId | null = null;
  private next = 0;
  private step = 0;
  private bar = 0;
  volume = 0.6;

  private ensure() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = this.volume;
    const comp = ctx.createDynamicsCompressor();
    // simple generated reverb
    const conv = ctx.createConvolver();
    const len = ctx.sampleRate * 2.6;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.5;
    }
    conv.buffer = ir;
    const wet = ctx.createGain();
    wet.gain.value = 0.32;
    const bus = ctx.createGain();
    bus.connect(comp);
    bus.connect(conv).connect(wet).connect(comp);
    comp.connect(master).connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
    this.bus = bus;
    return ctx;
  }

  get playing() {
    return this.timer !== null;
  }

  async play(world: WorldId) {
    const ctx = this.ensure();
    if (ctx.state === "suspended") await ctx.resume();
    this.stopBand();
    this.world = world;
    const band = BANDS[world];
    const v = new Voice(ctx, this.bus!);
    this.teardown = band.setup?.(v, ctx, this.bus!);
    this.master!.gain.cancelScheduledValues(ctx.currentTime);
    this.master!.gain.setTargetAtTime(this.volume, ctx.currentTime, 0.4);
    this.next = ctx.currentTime + 0.1;
    this.step = 0;
    this.bar = 0;
    walk = 4;
    const sd = 60 / band.bpm / 4;
    this.timer = setInterval(() => {
      while (this.next < ctx.currentTime + 0.25) {
        const swung = band.swing && this.step % 2 === 1 ? sd * band.swing : 0;
        band.play(v, this.step, this.bar, this.next + swung, sd);
        this.next += sd;
        this.step++;
        if (this.step >= band.steps) {
          this.step = 0;
          this.bar++;
        }
      }
    }, 60);
  }

  private stopBand() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.teardown?.();
    this.teardown = undefined;
  }

  stop() {
    this.stopBand();
    if (this.ctx && this.master) this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    this.world = null;
  }

  setVolume(v: number) {
    this.volume = v;
    if (this.ctx && this.master && this.playing) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.1);
  }

  get current() {
    return this.world;
  }
}

let player: MusicPlayer | null = null;
export const getPlayer = () => (player ??= new MusicPlayer());
