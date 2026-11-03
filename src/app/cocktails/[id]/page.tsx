import { COCKTAILS } from "@/data/cocktails";
import type { Metadata } from "next";
import { CocktailDetail } from "./CocktailDetail";

export function generateStaticParams() {
  return COCKTAILS.map((c) => ({ id: c.id }));
}

// user creations live in the browser, so unknown ids are rendered client-side too
export const dynamicParams = true;

/** Social preview for a plain cocktail link: its card in its own world (classics in Maison). */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = COCKTAILS.find((x) => x.id === id);
  if (!c) return {};
  const title = `${c.name.tr} · Garnish`;
  const description = c.story.tr.split(/(?<=[.!?])\s/)[0];
  const image = { url: `/api/card?c=${c.id}.${c.world === "all" ? "maison" : c.world}.tr`, width: 1200, height: 630, alt: c.name.tr };
  return { title, description, openGraph: { title, description, images: [image] }, twitter: { card: "summary_large_image", images: [image.url] } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CocktailDetail id={id} />;
}
