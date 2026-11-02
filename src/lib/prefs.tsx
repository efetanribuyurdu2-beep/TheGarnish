"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Cocktail, L, Lang, PaletteId, WorldId } from "./types";
import { tr as translate, type UIKey } from "./ui";

interface Prefs {
  world: WorldId | null;
  palette: PaletteId;
  lang: Lang;
  favourites: string[];
  bar: string[];
  creations: Cocktail[];
}

const DEFAULTS: Prefs = { world: null, palette: "noir", lang: "tr", favourites: [], bar: [], creations: [] };
const KEY = "garnish:prefs:v1";

interface Ctx extends Prefs {
  ready: boolean;
  gate: boolean;
  openGate: (open: boolean) => void;
  set: (patch: Partial<Prefs>) => void;
  toggleFav: (id: string) => void;
  toggleBar: (id: string) => void;
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
  pick: (l: L) => string;
}

const PrefsContext = createContext<Ctx | null>(null);

function load(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const lang: Lang = navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en";
      return { ...DEFAULTS, lang };
    }
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [gate, openGate] = useState(false);

  useEffect(() => {
    setPrefs(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* storage unavailable: preferences live for this visit only */
    }
    const html = document.documentElement;
    html.dataset.world = prefs.world ?? "maison";
    html.dataset.palette = prefs.palette;
    html.lang = prefs.lang;
  }, [prefs, ready]);

  const set = useCallback((patch: Partial<Prefs>) => setPrefs((p) => ({ ...p, ...patch })), []);
  const toggle = (key: "favourites" | "bar") => (id: string) =>
    setPrefs((p) => ({ ...p, [key]: p[key].includes(id) ? p[key].filter((x) => x !== id) : [...p[key], id] }));

  const value = useMemo<Ctx>(
    () => ({
      ...prefs,
      ready,
      gate,
      openGate,
      set,
      toggleFav: toggle("favourites"),
      toggleBar: toggle("bar"),
      t: (key, vars) => translate(prefs.lang, key, vars),
      pick: (l) => l[prefs.lang],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefs, ready, gate, set],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}
