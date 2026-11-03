import type { Metadata } from "next";
import { readShare } from "@/lib/share";
import { SharedRecipe } from "./SharedRecipe";

type Props = { params: Promise<{ code: string }> };

/** Social preview: the world-styled card as og:image, the recipe's first line as description. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const s = readShare(code);
  if (!s) return { title: "Garnish — Cocktail Worlds" };
  const name = s.cocktail.name[s.lang];
  const title = `${name} · Garnish`;
  const description = s.cocktail.story[s.lang].split(/(?<=[.!?])\s/)[0];
  const image = { url: `/api/card?c=${encodeURIComponent(code)}`, width: 1200, height: 630, alt: name };
  return {
    title,
    description,
    openGraph: { title, description, images: [image], type: "article", siteName: "Garnish — Cocktail Worlds", locale: s.lang === "tr" ? "tr_TR" : "en_GB" },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function Page({ params }: Props) {
  const { code } = await params;
  return <SharedRecipe code={code} />;
}
