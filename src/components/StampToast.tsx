"use client";

import Link from "next/link";
import { useEffect } from "react";
import { worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import { PassportStamp } from "./PassportStamp";
import { SecretSeal } from "./SecretSeal";
import { ingredientById } from "@/data/ingredients";

/** "Your passport has been stamped": a stamp slams down in the corner for a few seconds. */
export function StampToast() {
  const { fresh, clearFresh, t, pick, lang, stamps, freshSecret, secrets, world } = usePrefs();

  useEffect(() => {
    if (!fresh && !freshSecret) return;
    const timer = setTimeout(clearFresh, 4200);
    return () => clearTimeout(timer);
  }, [fresh, freshSecret, clearFresh]);

  if (freshSecret) {
    const ing = ingredientById(secrets[freshSecret]?.ing ?? "");
    return (
      <Link href="/passport#seals" className="stamp-toast" onClick={clearFresh} key={freshSecret}>
        <span className="stamp-toast-art">
          <SecretSeal week={freshSecret} world={world ?? "maison"} size={78} uid="toast" />
        </span>
        <span>
          <b>{t("secretSealed")}</b>
          <small>{freshSecret.replace("-W", " · ")}{ing ? ` · ${pick(ing.name)}` : ""}</small>
        </span>
      </Link>
    );
  }

  if (!fresh) return null;
  return (
    <Link href="/passport" className="stamp-toast" onClick={clearFresh} key={`${fresh.world}:${fresh.kind}`}>
      <span className="stamp-toast-art">
        <PassportStamp world={fresh.world} kind={fresh.kind} date={stamps[`${fresh.world}:${fresh.kind}`]} lang={lang} size={78} />
      </span>
      <span>
        <b>{t("stampEarned")}</b>
        <small>
          {pick(worldById(fresh.world).name)} · {t(`stamp_${fresh.kind}`)}
        </small>
      </span>
    </Link>
  );
}
