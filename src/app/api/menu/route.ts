import { renderMenuPdf } from "@/lib/menuPdf";
import { readShare } from "@/lib/share";

/** POST { codes: share codes (lib/share), by? } → the collection as a world-styled A4 PDF. */
export async function POST(req: Request) {
  let body: { codes?: unknown; by?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const codes = Array.isArray(body.codes) ? body.codes.filter((x): x is string => typeof x === "string").slice(0, 40) : [];
  const shared = codes.map(readShare).filter((s) => !!s);
  if (!shared.length) return new Response("Empty menu", { status: 400 });
  const { world, palette, lang, zero } = shared[0];
  const by = typeof body.by === "string" ? body.by.slice(0, 40).trim() || undefined : undefined;
  const pdf = await renderMenuPdf({ world, palette, lang, zero, by, drinks: shared.map((s) => s.cocktail) });
  return new Response(new Uint8Array(pdf), {
    headers: { "content-type": "application/pdf", "content-disposition": `attachment; filename="garnish-menu-${world}.pdf"`, "cache-control": "no-store" },
  });
}
