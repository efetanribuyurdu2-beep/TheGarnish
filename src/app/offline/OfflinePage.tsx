"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Ornament } from "@/components/Ornament";
import { COCKTAILS } from "@/data/cocktails";
import { usePrefs } from "@/lib/prefs";
import { nameLang } from "@/lib/ui";

/** Shown by the service worker when a page was never opened and there is no network. */
export function OfflinePage() {
  const { t, pick } = usePrefs();
  const [kept, setKept] = useState<string[]>([]);
  useEffect(() => {
    caches
      ?.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.endsWith("-pages")).map((k) => caches.open(k).then((c) => c.keys()))))
      .then((lists) => setKept([...new Set(lists.flat().map((r) => new URL(r.url).pathname))]))
      .catch(() => {});
  }, []);
  const drinks = COCKTAILS.filter((c) => kept.includes(`/cocktails/${c.id}`));
  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{t("offlineTitle")}</h1>
        <p>{t("offlineSub")}</p>
      </header>
      <div className="row-gap">
        <Link className="btn" href="/">{t("nav_home")}</Link>
        <Link className="btn ghost" href="/book">{t("nav_book")}</Link>
        <Link className="btn ghost" href="/atelier">{t("nav_atelier")}</Link>
      </div>
      {drinks.length > 0 && (
        <section className="section">
          <h2>{t("offlineKept")}</h2>
          <div className="chips left">
            {drinks.map((c) => (
              <Link key={c.id} className="chip" href={`/cocktails/${c.id}`} lang={nameLang(c.name)}>{pick(c.name)}</Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
