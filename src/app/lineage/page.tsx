"use client";

import Link from "next/link";
import { ROOTS } from "@/data/cocktails";
import { visibleCocktails } from "@/lib/catalog";
import { usePrefs } from "@/lib/prefs";
import type { Cocktail } from "@/lib/types";
import { Ornament } from "@/components/Ornament";

function Branch({ nodes, all, depth, family }: { nodes: Cocktail[]; all: Cocktail[]; depth: number; family: string }) {
  const { pick } = usePrefs();
  if (!nodes.length || depth > 6) return null;
  return (
    <ul className="tree">
      {nodes.map((c) => (
        <li key={c.id}>
          <Link href={`/cocktails/${c.id}`} className={c.root !== family ? "cross" : c.author ? "mine" : c.world !== "all" ? "sig" : ""}>
            {c.root !== family ? "↗ " : c.author ? "✎ " : c.world !== "all" ? "✦ " : ""}
            {pick(c.name)}
          </Link>
          {c.root === family && <Branch nodes={all.filter((x) => x.parent === c.id)} all={all} depth={depth + 1} family={family} />}
        </li>
      ))}
    </ul>
  );
}

export default function LineagePage() {
  const { world, creations, pick, t } = usePrefs();
  const all = visibleCocktails(world, creations);
  const ids = new Set(all.map((c) => c.id));

  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{t("nav_lineage")}</h1>
        <p>{t("lineageSub")}</p>
      </header>
      <div className="lineage">
        {ROOTS.map((r) => {
          // roots of this family: members whose parent is missing or belongs to another family
          const members = all.filter((c) => c.root === r.id);
          const tops = members.filter((c) => !c.parent || !ids.has(c.parent) || all.find((x) => x.id === c.parent)!.root !== r.id);
          return (
            <section key={r.id} className="family">
              <span className="eyebrow">
                <span className="planet-dot" />
                {pick(r.formula)}
              </span>
              <h3>{pick(r.name)}</h3>
              <Branch nodes={tops} all={members.concat(all.filter((c) => c.root !== r.id && members.some((m) => m.id === c.parent)))} depth={0} family={r.id} />
            </section>
          );
        })}
      </div>
      <p className="muted" style={{ textAlign: "center", marginTop: 30 }}>
        ✦ {t("signature")} · ✎ {t("yourBranches")} · ↗ {t("otherFamily")}
      </p>
    </>
  );
}
