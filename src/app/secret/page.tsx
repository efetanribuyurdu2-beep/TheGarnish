"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Bottle } from "@/components/Bottle";
import { CocktailCard } from "@/components/CocktailCard";
import { Echo } from "@/components/Echo";
import { Ornament } from "@/components/Ornament";
import { SecretSeal } from "@/components/SecretSeal";
import { CATEGORY_LABEL, ingredientById } from "@/data/ingredients";
import { worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import { cluesFor, cocktailsWith, daysLeft, secretFor, weekId } from "@/lib/secret";
import { nameLang } from "@/lib/ui";

const OPENED = "garnish:secret-open";

export default function SecretPage() {
  const { t, pick, world, secrets } = usePrefs();
  const uid = useId().replace(/:/g, "");
  const week = weekId();
  const ing = secretFor(week);
  const w = worldById(world ?? "maison");
  const sealed = secrets?.[week];
  const [open, setOpen] = useState(false);
  const [breaking, setBreaking] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(OPENED) === week || sealed) setOpen(true);
    } catch {
      /* private mode: the envelope simply starts closed */
    }
  }, [week, sealed]);

  const breakSeal = () => {
    setBreaking(true);
    try {
      localStorage.setItem(OPENED, week);
    } catch {
      /* ignore */
    }
    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => setOpen(true), still ? 0 : 1100);
  };

  const drinks = cocktailsWith(ing.id).filter((c) => c.world === "all" || c.world === world);
  const days = daysLeft();
  const past = Object.entries(secrets ?? {}).filter(([k]) => k !== week).sort().reverse();

  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{t("secretTitle")}</h1>
        <Echo text={t("secretTitle")} />
        <p>{t("secretSub")}</p>
        <p className="muted secret-week">
          {week.replace("-W", " · ")} · {t(days === 1 ? "secretLastDay" : "secretDays", { n: days })}
        </p>
      </header>

      {!open ? (
        <section className={`envelope ${breaking ? "breaking" : ""}`} aria-label={t("secretTitle")}>
          <div className="env-back" aria-hidden />
          <div className="env-card">
            <span className="eyebrow">{t("secretClues")}</span>
            <ol className="env-clues">
              {cluesFor(ing).map((c, i) => (
                <li key={i}>{pick(c)}</li>
              ))}
            </ol>
          </div>
          <div className="env-front" aria-hidden />
          <div className="env-flap" aria-hidden />
          <button className="env-seal" onClick={breakSeal} disabled={breaking} aria-label={t("secretBreak")}>
            <SecretSeal week={week} world={w.id} size={112} uid={uid} broken={breaking} />
          </button>
          <p className="env-hint">{t("secretBreak")}</p>
        </section>
      ) : (
        <section className="secret-reveal">
          <div className="secret-bottle">
            <Bottle ing={ing} size={120} />
          </div>
          <div className="secret-text">
            <span className="eyebrow">{pick(CATEGORY_LABEL[ing.category])} · {pick(ing.origin)}</span>
            <h2 lang={nameLang(ing.name)}>{pick(ing.name)}</h2>
            <p className="secret-story">{pick(ing.story)}</p>
            <dl className="secret-notes">
              <div><dt>{t("nose")}</dt><dd>{pick(ing.notes.nose)}</dd></div>
              <div><dt>{t("palate")}</dt><dd>{pick(ing.notes.palate)}</dd></div>
              <div><dt>{t("finish")}</dt><dd>{pick(ing.notes.finish)}</dd></div>
            </dl>
            <Link className="link" href={`/cellar/${ing.id}`}>{t("nav_cellar")} →</Link>
          </div>

          <div className={`secret-challenge family ${sealed ? "done" : ""}`}>
            <SecretSeal week={week} world={w.id} size={96} uid={`c${uid}`} />
            <div>
              <span className="eyebrow">{t("secretChallenge")}</span>
              {sealed ? (
                <p>{t("secretDone")}</p>
              ) : (
                <>
                  <p>{t("secretTask", { name: pick(ing.name), bar: pick(w.bar) })}</p>
                  <Link className="btn" href="/atelier?secret=1">{t("secretGo")} →</Link>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {open && drinks.length > 0 && (
        <section className="section">
          <h2>{t("secretDrinks")}</h2>
          <div className="grid">{drinks.map((c) => <CocktailCard key={c.id} c={c} />)}</div>
        </section>
      )}

      {past.length > 0 && (
        <section className="section">
          <h2>{t("secretPast")}</h2>
          <div className="secret-past">
            {past.map(([k, v]) => {
              const i = ingredientById(v.ing) ?? secretFor(k);
              return (
                <Link key={k} href={`/cellar/${i.id}`} className="secret-past-item">
                  <SecretSeal week={k} world={w.id} size={64} uid={`p${k}${uid}`} />
                  <span>
                    <b lang={nameLang(i.name)}>{pick(i.name)}</b>
                    <small className="muted">{k.replace("-W", " · ")}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
