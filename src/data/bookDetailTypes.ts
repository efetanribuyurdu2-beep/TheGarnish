import type { L } from "@/lib/types";

export interface BookDetail {
  history: L[]; // paragraphs
  steps: L[]; // the method, in order
  why: L; // why it works
  variations: { name: string; note: L }[];
  tip: L; // the bartender's note
}

export const l = (tr: string, en: string): L => ({ tr, en });
export const v = (name: string, tr: string, en: string) => ({ name, note: l(tr, en) });
