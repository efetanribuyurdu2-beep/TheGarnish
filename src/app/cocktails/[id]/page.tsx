import { COCKTAILS } from "@/data/cocktails";
import { CocktailDetail } from "./CocktailDetail";

export function generateStaticParams() {
  return COCKTAILS.map((c) => ({ id: c.id }));
}

// user creations live in the browser, so unknown ids are rendered client-side too
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CocktailDetail id={id} />;
}
