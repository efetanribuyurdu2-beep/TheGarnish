import { COCKTAILS } from "@/data/cocktails";
import type { Cocktail, WorldId } from "./types";

/** Classics + this world's signatures + the visitor's own creations. */
export function visibleCocktails(world: WorldId | null, creations: Cocktail[] = []): Cocktail[] {
  return [...COCKTAILS.filter((c) => c.world === "all" || c.world === world), ...creations];
}

export function findCocktail(id: string, creations: Cocktail[] = []): Cocktail | undefined {
  return COCKTAILS.find((c) => c.id === id) ?? creations.find((c) => c.id === id);
}

export function childrenOf(id: string, list: Cocktail[]): Cocktail[] {
  return list.filter((c) => c.parent === id);
}
