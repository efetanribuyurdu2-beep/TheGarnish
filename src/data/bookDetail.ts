/**
 * The Cocktail Book in depth: for every drink in /book, its history (researched;
 * contested origins are told as such), a step-by-step method, why it works,
 * classic variations and a bartender's note. Rendered by CocktailBook.tsx under
 * each spread ("the leaf"). Entries live in bookDetail*.ts by chapter.
 */
import { CANON } from "./bookDetailCanon";
import { GOLDEN } from "./bookDetailGolden";
import { ISLANDS } from "./bookDetailIslands";
import { EXTRAS } from "./bookDetailExtras";
import type { BookDetail } from "./bookDetailTypes";

export type { BookDetail };
export const BOOK_DETAIL: Record<string, BookDetail> = { ...CANON, ...GOLDEN, ...ISLANDS, ...EXTRAS };
