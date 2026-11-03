"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { playTransitionSfx } from "./sfx";
import { COCKTAILS } from "@/data/cocktails";
import type { Cocktail, L, Lang, PaletteId, WorldId } from "./types";
import { DEFAULT_PARTY, type PartyPlan } from "./party";
import { tr as translate, type UIKey } from "./ui";

interface Prefs {
  world: WorldId | null;
  palette: PaletteId;
  lang: Lang;
  favourites: string[];
  bar: string[];
  creations: Cocktail[];
  zero: boolean; // alcohol-free mode: every recipe shown with zero-proof alternatives
  stamps: Record<string, string>; // cocktail passport: "world:kind" -> ISO date earned
  traveller: string; // name written in the passport
  jazzKey: boolean; // the speakeasy password was given once
  sfx: boolean; // transition sound effects (independent of the music)
  party: PartyPlan; // the party planner's guest list and drinks
  secrets: Record<string, { ing: string; date: string }>; // weekly secret ingredient seals: "2026-W45" -> earned
}

export type StampKind = "arrival" | "tasting" | "master";
export const STAMP_KINDS: StampKind[] = ["arrival", "tasting", "master"];

const DEFAULTS: Prefs = { world: null, palette: "noir", lang: "tr", favourites: [], bar: [], creations: [], zero: false, stamps: {}, traveller: "", jazzKey: false, sfx: true, party: DEFAULT_PARTY, secrets: {} };
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
  stamp: (world: WorldId, kind: StampKind) => void;
  fresh: { world: WorldId; kind: StampKind } | null; // the stamp just earned (for the toast)
  clearFresh: () => void;
  /** Press this week's wax seal (the secret ingredient challenge). */
  sealSecret: (week: string, ing: string) => void;
  freshSecret: string | null; // the week just sealed (for the toast)
  /** Travel to a world with its themed transition (the world swaps while the screen is covered). */
  travel: (to: WorldId, patch?: Partial<Prefs>) => void;
  transit: { to: WorldId; from: WorldId | null; phase: "in" | "out" } | null;
}

/** Cover and reveal durations of the world transition (ms). */
export const TRANSIT_IN = 750;
export const TRANSIT_OUT = 1050;

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
  const [fresh, setFresh] = useState<Ctx["fresh"]>(null);
  const [transit, setTransit] = useState<Ctx["transit"]>(null);
  const sfxOn = useRef(DEFAULTS.sfx);
  useEffect(() => {
    sfxOn.current = prefs.sfx;
  }, [prefs.sfx]);

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

  const stamp = useCallback((world: WorldId, kind: StampKind) => {
    const key = `${world}:${kind}`;
    setPrefs((p) => {
      if (p.stamps?.[key]) return p;
      setTimeout(() => setFresh({ world, kind }), 0);
      return { ...p, stamps: { ...p.stamps, [key]: new Date().toISOString() } };
    });
  }, []);

  const [freshSecret, setFreshSecret] = useState<string | null>(null);
  const sealSecret = useCallback((week: string, ing: string) => {
    setPrefs((p) => {
      if (p.secrets?.[week]) return p;
      setTimeout(() => setFreshSecret(week), 0);
      return { ...p, secrets: { ...p.secrets, [week]: { ing, date: new Date().toISOString() } } };
    });
  }, []);

  // arriving in a world stamps the passport
  useEffect(() => {
    if (ready && prefs.world) stamp(prefs.world, "arrival");
  }, [ready, prefs.world, stamp]);

  const travel = useCallback((to: WorldId, patch: Partial<Prefs> = {}) => {
    const arrive = () => {
      setPrefs((p) => ({ ...p, ...patch, world: to }));
      openGate(false);
      window.scrollTo({ top: 0 });
    };
    // the sound plays even when motion is reduced (iPhones with "Reduce Motion" on still hear it)
    if (sfxOn.current) playTransitionSfx(to);
    const still = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (still) return arrive();
    setPrefs((p) => {
      setTransit({ to, from: p.world, phase: "in" });
      return p;
    });
    setTimeout(() => {
      arrive();
      setTransit((t) => (t ? { ...t, phase: "out" } : t));
    }, TRANSIT_IN);
    setTimeout(() => setTransit(null), TRANSIT_IN + TRANSIT_OUT);
  }, []);

  const toggleFav = (id: string) => {
    const adding = !prefs.favourites.includes(id);
    toggle("favourites")(id);
    const c = COCKTAILS.find((x) => x.id === id);
    if (adding && c && c.world !== "all") stamp(c.world, "tasting");
  };

  const value = useMemo<Ctx>(
    () => ({
      ...prefs,
      ready,
      gate,
      openGate,
      set,
      toggleFav,
      toggleBar: toggle("bar"),
      t: (key, vars) => translate(prefs.lang, key, vars),
      pick: (l) => l[prefs.lang],
      stamp,
      fresh,
      clearFresh: () => {
        setFresh(null);
        setFreshSecret(null);
      },
      sealSecret,
      freshSecret,
      travel,
      transit,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefs, ready, gate, set, fresh, stamp, travel, transit, sealSecret, freshSecret],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}
