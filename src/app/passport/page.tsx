"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Echo } from "@/components/Echo";
import { LogoMark } from "@/components/Logo";
import { Ornament } from "@/components/Ornament";
import { INK, PassportStamp } from "@/components/PassportStamp";
import { WORLDS } from "@/data/worlds";
import { STAMP_KINDS, usePrefs } from "@/lib/prefs";

const ascii = (s: string) =>
  s
    .toLocaleUpperCase("en")
    .replace(/[ÇĞİIÖŞÜ]/g, (c) => ({ Ç: "C", Ğ: "G", İ: "I", I: "I", Ö: "O", Ş: "S", Ü: "U" })[c] ?? c)
    .replace(/[^A-Z]+/g, "<");

export default function PassportPage() {
  const { t, pick, lang, stamps, traveller, set, world } = usePrefs();
  const book = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const total = WORLDS.length * STAMP_KINDS.length;
  const earned = Object.keys(stamps ?? {}).length;
  const visited = WORLDS.filter((w) => stamps?.[`${w.id}:arrival`]).length;
  const dates = Object.values(stamps ?? {}).sort();
  const first = dates[0] ? new Date(dates[0]) : null;
  const fmt = (d: Date | null) => (d ? d.toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—");
  const number = `GRN${String((first?.getTime() ?? 0) % 1000000).padStart(6, "0")}`;
  const complete = earned >= total;
  const pages = 2 + WORLDS.length + 1;

  const go = (i: number) => {
    const el = book.current;
    if (!el) return;
    const target = el.children[Math.max(0, Math.min(pages - 1, i))] as HTMLElement;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft - 8, behavior: "smooth" });
  };

  useEffect(() => {
    const el = book.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.children[0] as HTMLElement).offsetWidth + 18;
      setPage(Math.round(el.scrollLeft / w));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // open on the current world's visa page
  useEffect(() => {
    const i = WORLDS.findIndex((w) => w.id === world);
    if (i >= 0) setTimeout(() => go(2 + i), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.("input")) return;
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{t("passportTitle")}</h1>
        <Echo text={t("passportTitle")} />
        <p>{t("passportSub")}</p>
      </header>

      <div className="pp-stats">
        <div className="stat"><b>{visited}/{WORLDS.length}</b><small>{t("worldsVisited")}</small></div>
        <div className="stat"><b>{earned}/{total}</b><small>{t("stampsCount")}</small></div>
      </div>

      <div className="pp-nav">
        <button className="btn ghost small" onClick={() => go(page - 1)} disabled={page <= 0} aria-label={t("prevPage")}>←</button>
        <div className="pp-dots" role="tablist">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} className={i === page ? "on" : ""} onClick={() => go(i)} aria-label={`${i + 1}`} />
          ))}
        </div>
        <button className="btn ghost small" onClick={() => go(page + 1)} disabled={page >= pages - 1} aria-label={t("nextPage")}>→</button>
      </div>

      <div className="pp-book" ref={book}>
        {/* cover */}
        <section className="pp-page pp-cover">
          <span className="pp-cover-line">GARNISH</span>
          <div className="pp-cover-logo"><LogoMark size={120} /></div>
          <h2>{t("passportTitle")}</h2>
          <span className="pp-cover-sub">{lang === "tr" ? "COCKTAIL PASSPORT" : "KOKTEYL PASAPORTU"}</span>
          <svg className="pp-chip" viewBox="0 0 40 26" aria-hidden>
            <rect x="1" y="1" width="38" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="20" cy="13" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 13 H14 M26 13 H39" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </section>

        {/* identity */}
        <section className="pp-page pp-id">
          <header className="pp-head"><span>{t("passportTitle")}</span><span>P · GRN</span></header>
          <div className="pp-id-grid">
            <div className="pp-photo"><LogoMark size={74} /></div>
            <dl>
              <div>
                <dt>{t("holder")}</dt>
                <dd>
                  <input className="pp-name" value={traveller ?? ""} placeholder={t("namePlaceholder")} maxLength={28} onChange={(e) => set({ traveller: e.target.value })} aria-label={t("holder")} />
                </dd>
              </div>
              <div><dt>{t("nationality")}</dt><dd>{t("nationalityValue")}</dd></div>
              <div><dt>{t("issued")}</dt><dd>{fmt(first)}</dd></div>
              <div><dt>{t("passportNo")}</dt><dd>{number}</dd></div>
            </dl>
          </div>
          <div className="pp-tally">
            <span>{t("worldsVisited")}: <b>{visited}/{WORLDS.length}</b></span>
            <span>{t("stampsCount")}: <b>{earned}/{total}</b></span>
          </div>
          <pre className="pp-mrz" aria-hidden>
            {`P<GRN${(ascii(traveller || "GUEST") + "<<GARNISH").padEnd(39, "<").slice(0, 39)}\n${(number + "<" + String(earned).padStart(2, "0") + "GRN" + String(visited) + "<<<<<<<<<<<<<<<<<<<<<<<<<<<").slice(0, 44)}`}
          </pre>
          <footer className="pp-folio">1</footer>
        </section>

        {/* one visa page per world */}
        {WORLDS.map((w, i) => (
          <section key={w.id} className={`pp-page pp-visa wc-${w.id}`}>
            <header className="pp-head">
              <span>{t("visa")} · {String(i + 1).padStart(2, "0")}</span>
              <span>{pick(w.bar)}</span>
            </header>
            <i className="pp-band" aria-hidden />
            <h3 className="wc-name" lang="en" style={{ color: INK[w.id] }}>{pick(w.name)}</h3>
            <p className="pp-tag">{pick(w.tagline)}</p>
            <div className="pp-slots">
              {STAMP_KINDS.map((k) => {
                const date = stamps?.[`${w.id}:${k}`];
                return (
                  <div key={k} className={`pp-slot ${date ? "got" : ""}`}>
                    {date ? (
                      <PassportStamp world={w.id} kind={k} date={date} lang={lang} size={108} />
                    ) : (
                      <div className="pp-empty">
                        <b>{t(`stamp_${k}`)}</b>
                        <small>{t(`hint_${k}`)}</small>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {w.id !== world && (
              <Link className="link pp-go" href={`/worlds#${w.id}`}>{t("goWorld")} →</Link>
            )}
            <footer className="pp-folio">{i + 2}</footer>
          </section>
        ))}

        {/* the golden seal */}
        <section className={`pp-page pp-seal ${complete ? "done" : ""}`}>
          <header className="pp-head"><span>{t("sealTitle")}</span><span>{earned}/{total}</span></header>
          <svg className="pp-seal-art" viewBox="0 0 200 220" aria-hidden>
            <defs>
              <linearGradient id="sealGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6e3a1" />
                <stop offset=".45" stopColor="#c9a24a" />
                <stop offset="1" stopColor="#7a5a1e" />
              </linearGradient>
            </defs>
            <path d="M70 140 L50 214 L74 200 L86 220 L100 150Z M130 140 L150 214 L126 200 L114 220 L100 150Z" fill="#7a1a26" />
            {Array.from({ length: 24 }, (_, k) => (
              <path key={k} d="M100 12 L108 34 L92 34Z" fill="url(#sealGold)" transform={`rotate(${k * 15} 100 100)`} />
            ))}
            <circle cx="100" cy="100" r="72" fill="url(#sealGold)" />
            <circle cx="100" cy="100" r="62" fill="none" stroke="#7a5a1e" strokeWidth="1.4" />
            <circle cx="100" cy="100" r="56" fill="none" stroke="#fff3c9" strokeWidth=".8" strokeDasharray="2 3" />
            <g transform="translate(64 56) scale(.36)" color="#5a3a12"><LogoMark size={200} /></g>
            <text x="100" y="150" textAnchor="middle" fontSize="11" letterSpacing="2.4" fill="#5a3a12" style={{ fontFamily: "var(--font-brand)", fontWeight: 600 }}>
              {t("sealTitle").toLocaleUpperCase(lang === "tr" ? "tr" : "en")}
            </text>
          </svg>
          <p className="pp-seal-text">{complete ? t("sealDone") : t("sealLocked")}</p>
          <div className="pp-progress"><i style={{ width: `${(earned / total) * 100}%` }} /></div>
          <footer className="pp-folio">{WORLDS.length + 2}</footer>
        </section>
      </div>
    </>
  );
}
