/**
 * Getting Web Audio to actually sound, on every device.
 *
 *  - iPhone/iPad: Web Audio follows the ring/silent switch ("ambient" session) and
 *    stays mute when the phone is on silent. `navigator.audioSession.type = "playback"`
 *    (Safari 16.4+) makes it a media sound like a video; on older iOS a silent HTML
 *    <audio> element played from the tap does the same.
 *  - A context can be "suspended" (no gesture yet) or, on iOS, "interrupted" (a call,
 *    the screen locked): both need resume() from a tap.
 */

type Session = { type?: string };

let silent: HTMLAudioElement | null = null;
const contexts = new Set<AudioContext>();

// 0.1 s of silence, 8 kHz mono WAV
function silentWav() {
  const n = 800;
  const b = new Uint8Array(44 + n);
  const v = new DataView(b.buffer);
  const s = (o: number, t: string) => [...t].forEach((ch, i) => (b[o + i] = ch.charCodeAt(0)));
  s(0, "RIFF"); v.setUint32(4, 36 + n, true); s(8, "WAVE"); s(12, "fmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true);
  s(36, "data"); v.setUint32(40, n, true); b.fill(128, 44);
  let bin = "";
  b.forEach((x) => (bin += String.fromCharCode(x)));
  return `data:audio/wav;base64,${btoa(bin)}`;
}

/** Call from a click/tap, before or after creating the context. Never throws. */
export function unlockAudio(ctx?: AudioContext | null) {
  try {
    const nav = navigator as Navigator & { audioSession?: Session };
    if (nav.audioSession && nav.audioSession.type !== "playback") nav.audioSession.type = "playback";
    else if (!nav.audioSession && /iP(hone|ad|od)|Macintosh/.test(navigator.userAgent) && "ontouchend" in document && !silent) {
      silent = new Audio(silentWav());
      silent.setAttribute("playsinline", "");
      void silent.play().catch(() => {});
    }
  } catch {
    /* no session API */
  }
  if (ctx) contexts.add(ctx);
  for (const c of contexts) if (c.state !== "running" && c.state !== "closed") void c.resume().catch(() => {});
}

// any later tap revives a context the system suspended or interrupted
if (typeof window !== "undefined") {
  const wake = () => {
    for (const c of contexts) if (c.state !== "running" && c.state !== "closed") void c.resume().catch(() => {});
  };
  for (const ev of ["pointerdown", "touchend", "keydown"]) window.addEventListener(ev, wake, { capture: true, passive: true });
  document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && wake());
}
