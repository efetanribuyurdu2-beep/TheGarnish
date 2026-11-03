import { renderCard, type CardFormat } from "@/lib/card";
import { readShare } from "@/lib/share";

/** GET /api/card?c=<share code>&f=wide|tall → the world-styled recipe card as PNG. */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const shared = readShare(q.get("c") ?? "");
  if (!shared) return new Response("Unknown recipe", { status: 404 });
  const format: CardFormat = q.get("f") === "tall" ? "tall" : "wide";
  return renderCard(shared, format);
}
