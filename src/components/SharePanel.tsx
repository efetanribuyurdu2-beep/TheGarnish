"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { shareCode, sharePath } from "@/lib/share";
import type { Cocktail } from "@/lib/types";
import { nameLang } from "@/lib/ui";

type Format = "wide" | "tall";

/** "Share" sheet: the world-styled card, a link to copy or send, and the card as PNG. */
export function SharePanel({ cocktail, zero, onClose }: { cocktail: Cocktail; zero: boolean; onClose: () => void }) {
  const { t, pick, world, palette, lang, traveller } = usePrefs();
  const [format, setFormat] = useState<Format>("wide");
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState<string>("");
  const panel = useRef<HTMLDivElement>(null);

  const code = useMemo(
    () => shareCode(cocktail, { world: world ?? "maison", palette, lang, zero, by: cocktail.author ? traveller.trim() || undefined : undefined }),
    [cocktail, world, palette, lang, zero, traveller],
  );
  const url = typeof window === "undefined" ? sharePath(code) : new URL(sharePath(code), window.location.origin).toString();
  const img = `/api/card?c=${encodeURIComponent(code)}&f=${format}`;
  const name = pick(cocktail.name);
  const text = t("shareText", { name });
  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("sheet-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("sheet-open");
      prev?.focus();
    };
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt(t("copyLink"), url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const fileName = `garnish-${cocktail.id.replace(/^(my|shared)-/, "")}-${world ?? "maison"}.png`;
  const cardFile = async () => {
    const blob = await fetch(img).then((r) => r.blob());
    return new File([blob], fileName, { type: "image/png" });
  };

  const download = async () => {
    setBusy(true);
    try {
      const file = await cardFile();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } finally {
      setBusy(false);
    }
  };

  const shareNative = async () => {
    setBusy(true);
    try {
      const file = await cardFile().catch(() => null);
      const data: ShareData = file && navigator.canShare?.({ files: [file] }) ? { title: name, text, url, files: [file] } : { title: name, text, url };
      await navigator.share(data);
    } catch {
      /* the visitor closed the share sheet */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="share-sheet" role="dialog" aria-modal="true" aria-label={t("shareTitle")} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="share-panel" ref={panel}>
        <button className="share-close" onClick={onClose} aria-label={t("close")}>×</button>
        <span className="eyebrow">{t("shareTitle")}</span>
        <h2 lang={nameLang(cocktail.name)}>{name}</h2>
        <p className="muted share-sub">{t("shareSub")}</p>

        <div className={`share-preview ${format}`}>
          {/* the same image the social preview and the download use */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={img} src={img} alt={t("shareCardAlt", { name })} onLoad={() => setLoaded(img)} className={loaded === img ? "on" : ""} />
          {loaded !== img && <span className="share-loading" aria-hidden />}
        </div>

        <div className="version-toggle share-format" role="group" aria-label={t("cardFormat")}>
          <button className={format === "wide" ? "on" : ""} aria-pressed={format === "wide"} onClick={() => setFormat("wide")}>{t("cardWide")}</button>
          <button className={format === "tall" ? "on" : ""} aria-pressed={format === "tall"} onClick={() => setFormat("tall")}>{t("cardTall")}</button>
        </div>

        <div className="share-link">
          <input className="input" readOnly value={url} onFocus={(e) => e.currentTarget.select()} aria-label={t("shareLink")} />
          <button className="btn" onClick={copy}>{copied ? "✓ " + t("copied") : t("copyLink")}</button>
        </div>

        <div className="share-actions">
          {canShare && (
            <button className="btn" onClick={shareNative} disabled={busy}>{t("shareVia")}</button>
          )}
          <button className="btn ghost" onClick={download} disabled={busy}>{t("downloadCard")}</button>
          <a className="btn ghost" href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="btn ghost" href={`https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">X</a>
        </div>
        {cocktail.author && <p className="hint share-note">{t("shareCreationNote")}</p>}
      </div>
    </div>
  );
}
