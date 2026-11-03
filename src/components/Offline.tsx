"use client";

import { useEffect, useState } from "react";
import { COCKTAILS } from "@/data/cocktails";
import { INGREDIENTS } from "@/data/ingredients";
import { usePrefs } from "@/lib/prefs";

const READY = "garnish:offline-ready";
const PAGES = ["/", "/cocktails", "/book", "/cellar", "/atelier", "/lineage", "/concierge", "/bar", "/party", "/secret", "/glass-ice", "/games", "/passport", "/worlds", "/collection", "/offline"];

/** Registers the service worker (production only) and reports whether the network is there. */
export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const set = () => setOnline(navigator.onLine);
    set();
    window.addEventListener("online", set);
    window.addEventListener("offline", set);
    return () => {
      window.removeEventListener("online", set);
      window.removeEventListener("offline", set);
    };
  }, []);
  return online;
}

/** "Make it work offline": the service worker fetches every page once. */
export function OfflineKit() {
  const { t } = usePrefs();
  const [state, setState] = useState<{ done: number; total: number } | null>(null);
  const [ready, setReady] = useState<string | null>(null);
  const supported = typeof navigator !== "undefined" && "serviceWorker" in navigator;

  useEffect(() => {
    try {
      setReady(localStorage.getItem(READY));
    } catch {
      /* ignore */
    }
  }, []);

  if (!supported) return null;
  const start = async () => {
    const reg = await navigator.serviceWorker.ready;
    if (!reg.active) return;
    const urls = [...PAGES, ...COCKTAILS.map((c) => `/cocktails/${c.id}`), ...INGREDIENTS.map((i) => `/cellar/${i.id}`)];
    const ch = new MessageChannel();
    setState({ done: 0, total: urls.length });
    ch.port1.onmessage = (e) => {
      setState({ done: e.data.done, total: e.data.total });
      if (e.data.finished) {
        const d = new Date().toISOString();
        try {
          localStorage.setItem(READY, d);
        } catch {
          /* ignore */
        }
        setReady(d);
        setState(null);
      }
    };
    reg.active.postMessage({ type: "precache", urls }, [ch.port2]);
  };

  return (
    <div className="offline-kit">
      {state ? (
        <>
          <span>{t("offlineSaving", { done: state.done, total: state.total })}</span>
          <i className="offline-bar"><b style={{ width: `${(state.done / state.total) * 100}%` }} /></i>
        </>
      ) : (
        <button className="link" onClick={start}>
          {ready ? "✓ " + t("offlineReady") : t("offlineMake")}
        </button>
      )}
    </div>
  );
}
