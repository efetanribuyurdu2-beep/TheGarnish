/**
 * Spotify playlists per world, played through Spotify's official Embed (iFrame API).
 * No API key: Spotify streams and licenses the music; listeners signed in to Spotify
 * hear full tracks, others hear previews. Nothing is downloaded or mixed by the site.
 */
import type { WorldId } from "./types";

export const PLAYLISTS: Record<WorldId, string> = {
  maison: "3DtXF2xTfuxabsOyTnDzSs",
  cosmos: "7ytpMgzItAJCdSdkeachDg",
  anatolia: "3lKKzx4iV96Q5ON3uW5DSI",
  jazz: "3OgvHJYIHNLHHbVApl2qBC",
  sakura: "4Fd4iY28BnhaFgq0bGg4qs",
  alchemist: "52AAX0zJgbFnEllERVpviG",
  tiki: "6tQmqqGQ1ZiGB7yiShhQUT",
  boreal: "0DevNTeyaBTKo0TJDiuFZt",
  riviera: "59CvHN2KAnA47zHj3Y5clt",
};

export const playlistUri = (w: WorldId) => `spotify:playlist:${PLAYLISTS[w]}`;
export const playlistUrl = (w: WorldId) => `https://open.spotify.com/playlist/${PLAYLISTS[w]}`;

export interface SpotifyController {
  loadUri: (uri: string) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  destroy: () => void;
  addListener: (ev: "ready" | "playback_update", cb: (e: { data: { isPaused: boolean; isBuffering: boolean; position: number; duration: number } }) => void) => void;
}
export interface SpotifyIFrameAPI {
  createController: (el: HTMLElement, opts: { uri: string; width?: string | number; height?: string | number }, cb: (c: SpotifyController) => void) => void;
}

let api: Promise<SpotifyIFrameAPI> | null = null;

/** Loads Spotify's iFrame API once; rejects after a timeout (offline, blocked). */
export function loadSpotify(timeoutMs = 8000): Promise<SpotifyIFrameAPI> {
  if (api) return api;
  api = new Promise<SpotifyIFrameAPI>((resolve, reject) => {
    const w = window as unknown as { onSpotifyIframeApiReady?: (a: SpotifyIFrameAPI) => void };
    const timer = setTimeout(() => reject(new Error("spotify timeout")), timeoutMs);
    w.onSpotifyIframeApiReady = (a) => {
      clearTimeout(timer);
      resolve(a);
    };
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    s.onerror = () => {
      clearTimeout(timer);
      reject(new Error("spotify blocked"));
    };
    document.body.appendChild(s);
  });
  api.catch(() => (api = null));
  return api;
}
