"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { CocktailDetail } from "@/app/cocktails/[id]/CocktailDetail";
import { worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import { readShare } from "@/lib/share";

/** A recipe that arrived by link: who sent it, where it was poured, and the recipe itself. */
export function SharedRecipe({ code }: { code: string }) {
  const { t, pick, world, palette, travel, creations, set, jazzKey } = usePrefs();
  const router = useRouter();
  const s = useMemo(() => readShare(code), [code]);
  if (!s) {
    return (
      <div className="page-head">
        <h1>404</h1>
        <p className="muted">{t("sharedMissing")}</p>
        <Link href="/cocktails" className="btn">{t("nav_cocktails")}</Link>
      </div>
    );
  }
  const w = worldById(s.world);
  const elsewhere = s.world !== world || (s.world === "maison" && s.palette !== palette);
  const add = () => {
    const id = `my-${Date.now().toString(36)}`;
    set({ creations: [...creations, { ...s.cocktail, id, author: s.by ?? "friend" }] });
    router.push(`/cocktails/${id}`);
  };

  return (
    <>
      <aside className="shared-banner" aria-live="polite">
        <span className="shared-seal" aria-hidden />
        <div>
          <b>{s.by ? t("sharedBy", { name: s.by }) : t("sharedFriend")}</b>
          <span className="muted">{t("sharedFrom", { world: pick(w.name) })}</span>
        </div>
        <div className="shared-actions">
          {elsewhere && s.world === "jazz" && !jazzKey ? (
            // the speakeasy still wants its password
            <Link className="btn ghost" href="/worlds#jazz">
              {t("goWorld")} · <span lang="en">{pick(w.name)}</span>
            </Link>
          ) : elsewhere && (
            <button className="btn ghost" onClick={() => travel(s.world, s.world === "maison" ? { palette: s.palette } : {})}>
              {t("goWorld")} · <span lang="en">{pick(w.name)}</span>
            </button>
          )}
          {s.creation && <button className="btn" onClick={add}>{t("addToMine")}</button>}
        </div>
      </aside>
      <CocktailDetail id={s.cocktail.id} shared={s.creation ? s.cocktail : undefined} initialZero={s.zero} />
    </>
  );
}
