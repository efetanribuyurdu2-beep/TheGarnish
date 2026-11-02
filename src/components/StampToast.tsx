"use client";

import Link from "next/link";
import { useEffect } from "react";
import { worldById } from "@/data/worlds";
import { usePrefs } from "@/lib/prefs";
import { PassportStamp } from "./PassportStamp";

/** "Your passport has been stamped": a stamp slams down in the corner for a few seconds. */
export function StampToast() {
  const { fresh, clearFresh, t, pick, lang, stamps } = usePrefs();

  useEffect(() => {
    if (!fresh) return;
    const timer = setTimeout(clearFresh, 4200);
    return () => clearTimeout(timer);
  }, [fresh, clearFresh]);

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
