"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Echo } from "@/components/Echo";
import { GlassArt } from "@/components/GlassArt";
import { Ornament } from "@/components/Ornament";
import { worldById } from "@/data/worlds";
import { analyse } from "@/lib/balance";
import { findCocktail, visibleCocktails } from "@/lib/catalog";
import { batchFor, DEFAULT_PARTY, drinksFor, garnishesFor, iceFor, MAX_DRINKS, servingsFor, shoppingList, type Batch, type PartyPlan, type Role } from "@/lib/party";
import { usePrefs } from "@/lib/prefs";
import type { L, Lang, WorldId } from "@/lib/types";
import { formatAmount, GLASS_LABEL, nameLang } from "@/lib/ui";

const l = (tr: string, en: string): L => ({ tr, en });

/** The host's word, one per world. */
const HOST: Record<WorldId, L> = {
  maison: l("Le Grand Bar bu gece sizin. Misafir listesini verin; şişeleri, buzu ve saati biz hesaplayalım.", "Le Grand Bar is yours tonight. Give us the guest list; we will reckon the bottles, the ice and the hours."),
  anatolia: l("Sofra kuruluyor! Kaç kişi geliyor, kaç saat oturulacak; meyhanenin hesabı bizde.", "The table is being laid! How many are coming, how long will they stay; the meyhane keeps the tally."),
  cosmos: l("Mürettebat sayısını ve uçuş süresini girin; yakıt, buz ve rota hesaplansın.", "Enter the crew and the flight time; fuel, ice and course will be computed."),
  jazz: l("Kapıdan kaç kişi girecek, gece kaç set sürecek? Söyleyin, tezgâhın altını hazırlayalım.", "How many through the door, how many sets tonight? Say the word and we'll stock under the counter."),
  sakura: l("Hanami için kaç misafir, kaç saat? Her şey önceden, sakin ve eksiksiz hazırlansın.", "How many guests for hanami, how many hours? Let everything be ready beforehand, calm and complete."),
  alchemist: l("Toplantıya kaç çırak katılacak? Oranları büyütelim, iksirleri önceden damıtalım.", "How many apprentices at the gathering? We scale the proportions and distil the elixirs ahead."),
  tiki: l("Lagünde kaç kişi var, şenlik kaç saat? Grog fıçıları ve buz dağları buradan hesaplanır.", "How many on the lagoon, how long is the luau? Grog barrels and mountains of ice are reckoned here."),
  boreal: l("Uzun bir gece için kaç misafir? Şişeler karın içinde, kadehler buz gibi beklesin.", "How many guests for a long night? Let the bottles wait in the snow and the glasses ice-cold."),
  riviera: l("Bahçeye kaç sandalye? Söyleyin, mahzenden ne kadar ineceğini ve kaç limon toplanacağını yazalım.", "How many chairs in the garden? Tell us, and we'll write down what comes up from the cellar and how many lemons to pick."),
};

const T = {
  title: l("Parti Planlayıcı", "Party Planner"),
  guests: l("Misafir", "Guests"),
  hours: l("Saat", "Hours"),
  total: l("≈ {n} kadeh", "≈ {n} drinks"),
  rule: l("İlk saat kişi başı iki, sonra saatte bir kadeh: barmenlerin kuralı.", "Two a head in the first hour, then one an hour: the bartender's rule."),
  menu: l("Gecenin menüsü", "Tonight's menu"),
  menuSub: l("En fazla altı içki. Adetler kendiliğinden bölünür; elle de değiştirebilirsin.", "Up to six drinks. The count splits itself; you can change it by hand."),
  add: l("İçki ekle", "Add a drink"),
  search: l("Ara: Negroni, cin, nane…", "Search: Negroni, gin, mint…"),
  favs: l("Kaydettiklerin", "Your saved drinks"),
  here: l("Bu dünyadan", "From this world"),
  classics: l("Klasikler", "Classics"),
  mine: l("İmzaların", "Your signatures"),
  empty: l("Menü boş. Aşağıdan bir içki seç.", "The menu is empty. Pick a drink below."),
  remove: l("Çıkar", "Remove"),
  auto: l("otomatik", "auto"),
  servings: l("kadeh", "drinks"),
  batches: l("Toplu tarifler", "Batches"),
  batchSub: l("Her içki, barların yaptığı gibi önceden hazırlanır.", "Each drink is prepared ahead, the way bars do it."),
  inBottle: l("Şişeye", "Into the bottle"),
  water: l("Su (ön sulandırma)", "Water (pre-dilution)"),
  sameDay: l("aynı gün", "same day"),
  perServe: l("Her kadehe ayrıca", "Add to each glass"),
  atServe: l("Serviste üstüne", "Top at serving"),
  pour: l("Her kadehe {ml} ml karışım", "{ml} ml of the batch per glass"),
  litres: l("toplam {l} l · {b} × 1 l şişe", "{l} l in all · {b} × 1 l bottles"),
  shop: l("Alışveriş listesi", "Shopping list"),
  shopSub: l("%10 payla. Barında işaretli olanlar en altta.", "With a 10% margin. What your bar already holds is at the bottom."),
  have: l("Barında var", "In your bar"),
  ice: l("Buz", "Ice"),
  iceLine: l("{kg} kg buz ({bags} torba × 2 kg)", "{kg} kg of ice ({bags} bags × 2 kg)"),
  spheres: l("{n} küre buz (bir gün önce dondur)", "{n} ice spheres (freeze a day ahead)"),
  garnish: l("Garnitür", "Garnish"),
  copy: l("Listeyi kopyala", "Copy the list"),
  copied: l("Kopyalandı", "Copied"),
  send: l("Gönder…", "Send…"),
  flow: l("Akış", "Timeline"),
  reset: l("Planı sıfırla", "Reset the plan"),
  zeroOn: l("0% açık: tarifler alkolsüz sürümleriyle hesaplandı.", "0% is on: the recipes are worked out in their alcohol-free versions."),
};

const METHOD_NOTE: Record<string, L> = {
  stir: l("Hepsi tek şişede, eriyen buzun suyu şimdiden eklendi. Dondurucuda sakla, buzsuz ve doğrudan soğuk bardağa dök.", "All in one bottle, with the melt water already added. Keep it in the freezer and pour straight into a cold glass, no ice."),
  shake: l("Alkollüleri ve şurupları önceden karıştır; narenciyeyi aynı gün sık ve ekle. Her kadehi buzla ayrı çalkala.", "Mix spirits and syrups ahead; squeeze the citrus on the day and add it. Shake each drink with ice to order."),
  dryshake: l("Karışımı önceden hazırla; köpük için her shaker'a yumurta akını serviste koy, önce buzsuz çalkala.", "Batch ahead; for the foam add the egg white to each shaker at serving and dry-shake first."),
  build: l("Tabanı önceden karıştır, soğuk tut. Bardağı buzla doldur, karışımı dök, köpüklüyü en son ekle.", "Mix the base ahead and keep it cold. Fill the glass with ice, pour the base, add the bubbles last."),
  blend: l("Tabanı önceden karıştır; blender'da dörder kadehlik turlarla buzla çek.", "Mix the base ahead; blend with ice four glasses at a time."),
  swizzle: l("Hepsini önceden karıştır; kırık buzla dolu bardağa dök ve swizzle çubuğuyla buğulanana kadar çevir.", "Batch everything; pour over crushed ice and swizzle until the glass frosts."),
};

function stepper(value: number, set: (n: number) => void, min: number, max: number, label: string) {
  return (
    <div className="pt-stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => set(Math.max(min, value - 1))} disabled={value <= min} aria-label="−">−</button>
      <input
        className="input"
        inputMode="numeric"
        value={value}
        aria-label={label}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
          if (!Number.isNaN(n)) set(Math.min(max, Math.max(min, n)));
        }}
      />
      <button type="button" onClick={() => set(Math.min(max, value + 1))} disabled={value >= max} aria-label="+">+</button>
    </div>
  );
}

const litres = (ml: number) => (Math.round(ml / 100) / 10).toLocaleString("tr-TR");

export default function PartyPage() {
  const { pick, lang, world, creations, favourites, bar, zero, set, party: saved } = usePrefs();
  const plan: PartyPlan = saved ?? DEFAULT_PARTY;
  const p = (x: L, vars?: Record<string, string | number>) => {
    let s = x[lang];
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    return s;
  };
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState(false);
  const w = worldById(world ?? "maison");
  const update = (patch: Partial<PartyPlan>) => set({ party: { ...plan, ...patch } });

  const all = useMemo(() => visibleCocktails(world, creations), [world, creations]);
  const chosen = plan.drinks.map((d) => findCocktail(d.id, creations)).filter((c) => !!c);
  const servings = servingsFor({ ...plan, drinks: plan.drinks.filter((d) => findCocktail(d.id, creations)) });
  const batches: Batch[] = chosen.map((c, i) => batchFor(c, servings[i], zero));
  const shop = shoppingList(batches);
  const owned = new Set(bar);
  const toBuy = [...shop.filter((s) => !owned.has(s.ing.id)), ...shop.filter((s) => owned.has(s.ing.id))];
  const ice = iceFor(batches, plan.guests);
  const garnishes = garnishesFor(batches);
  const total = drinksFor(plan.guests, plan.hours);

  const inPlan = new Set(plan.drinks.map((d) => d.id));
  const match = (name: L, ids: string[]) => {
    const s = q.trim().toLocaleLowerCase(lang);
    return !s || name.tr.toLocaleLowerCase("tr").includes(s) || name.en.toLowerCase().includes(s) || ids.some((id) => id.includes(s));
  };
  const pickable = all.filter((c) => !inPlan.has(c.id) && match(c.name, c.parts.map((x) => x.id)));
  const groups: [L, typeof pickable][] = [
    [T.mine, pickable.filter((c) => c.author)],
    [T.favs, pickable.filter((c) => !c.author && favourites.includes(c.id))],
    [T.here, pickable.filter((c) => !c.author && !favourites.includes(c.id) && c.world === world)],
    [T.classics, pickable.filter((c) => !c.author && !favourites.includes(c.id) && c.world === "all")],
  ];
  const full = plan.drinks.length >= MAX_DRINKS;

  const listText = () =>
    [
      `${p(T.title)} · ${plan.guests} ${p(T.guests).toLocaleLowerCase(lang)} · ${plan.hours} ${p(T.hours).toLocaleLowerCase(lang)}`,
      chosen.map((c, i) => `${pick(c.name)} × ${servings[i]}`).join(", "),
      "",
      ...toBuy.map((s) => `${owned.has(s.ing.id) ? "✓" : "□"} ${pick(s.ing.name)}: ${pick(s.amount)}`),
      `□ ${p(T.ice)}: ${p(T.iceLine, ice)}`,
      ...garnishes.map((g) => `□ ${p(T.garnish)}: ${pick(g.name)} × ${g.count}`),
    ].join("\n");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(listText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(p(T.copy), listText());
    }
  };
  const send = () => navigator.share?.({ title: p(T.shop), text: listText() }).catch(() => {});

  const flow = timeline(batches, ice.spheres > 0, lang);

  return (
    <>
      <header className="page-head">
        <Ornament />
        <h1>{p(T.title)}</h1>
        <Echo text={p(T.title)} />
        <p className="pt-host">{pick(HOST[w.id])}</p>
      </header>

      <section className="pt-guests family">
        <div>
          <span className="eyebrow">{p(T.guests)}</span>
          {stepper(plan.guests, (n) => update({ guests: n }), 2, 200, p(T.guests))}
        </div>
        <div>
          <span className="eyebrow">{p(T.hours)}</span>
          {stepper(plan.hours, (n) => update({ hours: n }), 1, 10, p(T.hours))}
        </div>
        <div className="pt-total">
          <b>{p(T.total, { n: total })}</b>
          <small className="muted">{p(T.rule)}</small>
        </div>
      </section>
      {zero && <p className="hint pt-zero">{p(T.zeroOn)}</p>}

      <section className="section">
        <h2>{p(T.menu)}</h2>
        <p className="muted">{p(T.menuSub)}</p>
        {chosen.length === 0 ? (
          <p className="muted pt-empty">{p(T.empty)}</p>
        ) : (
          <ul className="pt-menu">
            {chosen.map((c, i) => {
              const d = plan.drinks.find((x) => x.id === c.id)!;
              const a = analyse(batches[i].c.parts, c.method);
              return (
                <li key={c.id} className="family">
                  <GlassArt glass={c.glass} color={a.color} opaque={a.opaque} ice={c.ice} method={c.method} garnish={c.garnish} size={54} animate={false} />
                  <div className="pt-menu-name">
                    <Link href={`/cocktails/${c.id}`} lang={nameLang(c.name)}>{pick(c.name)}</Link>
                    <small className="muted">{pick(GLASS_LABEL[c.glass])}{d.n === undefined ? ` · ${p(T.auto)}` : ""}</small>
                  </div>
                  {stepper(servings[i], (n) => update({ drinks: plan.drinks.map((x) => (x.id === c.id ? { ...x, n } : x)) }), 1, 400, `${pick(c.name)} · ${p(T.servings)}`)}
                  <button className="link pt-remove" onClick={() => update({ drinks: plan.drinks.filter((x) => x.id !== c.id) })} aria-label={`${p(T.remove)} ${pick(c.name)}`}>×</button>
                </li>
              );
            })}
          </ul>
        )}

        {!full && (
          <details className="pt-picker" open={chosen.length === 0}>
            <summary className="btn ghost">+ {p(T.add)}</summary>
            <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={p(T.search)} aria-label={p(T.search)} />
            {groups.map(([title, list]) =>
              list.length ? (
                <div key={title.en} className="pt-group">
                  <span className="eyebrow">{pick(title)}</span>
                  <div className="chips left">
                    {list.map((c) => (
                      <button key={c.id} className="chip" lang={nameLang(c.name)} onClick={() => update({ drinks: [...plan.drinks, { id: c.id }] })}>
                        {pick(c.name)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </details>
        )}
      </section>

      {batches.length > 0 && (
        <>
          <section className="section">
            <h2>{p(T.batches)}</h2>
            <p className="muted">{p(T.batchSub)}</p>
            <div className="pt-batches">
              {batches.map((b) => (
                <BatchCard key={b.c.id} b={b} lang={lang} p={p} />
              ))}
            </div>
          </section>

          <section className="section pt-shop-wrap">
            <h2>{p(T.shop)}</h2>
            <p className="muted">{p(T.shopSub)}</p>
            <div className="family pt-shop">
              <ul>
                {toBuy.map((s) => {
                  const have = owned.has(s.ing.id);
                  return (
                    <li key={s.ing.id} className={have ? "have" : ""}>
                      <span className="pt-box" aria-hidden>{have ? "✓" : ""}</span>
                      <Link href={`/cellar/${s.ing.id}`} lang={nameLang(s.ing.name)}>{pick(s.ing.name)}</Link>
                      <span className="pt-dots" aria-hidden />
                      <span className="pt-amt">{pick(s.amount)}</span>
                      {have && <small className="muted pt-have">{p(T.have)}</small>}
                    </li>
                  );
                })}
                <li>
                  <span className="pt-box" aria-hidden />
                  <b>{p(T.ice)}</b>
                  <span className="pt-dots" aria-hidden />
                  <span className="pt-amt">{p(T.iceLine, ice)}{ice.spheres ? ` · ${p(T.spheres, { n: ice.spheres })}` : ""}</span>
                </li>
                {garnishes.map((g) => (
                  <li key={g.name.en}>
                    <span className="pt-box" aria-hidden />
                    <span>{p(T.garnish)}: {pick(g.name)}</span>
                    <span className="pt-dots" aria-hidden />
                    <span className="pt-amt">× {g.count}</span>
                  </li>
                ))}
              </ul>
              <div className="row-gap">
                <button className="btn" onClick={copy}>{copied ? "✓ " + p(T.copied) : p(T.copy)}</button>
                {typeof navigator !== "undefined" && "share" in navigator && <button className="btn ghost" onClick={send}>{p(T.send)}</button>}
              </div>
            </div>
          </section>

          <section className="section">
            <h2>{p(T.flow)}</h2>
            <ol className="pt-flow">
              {flow.map(([when, what]) => (
                <li key={when.en}>
                  <span className="eyebrow">{pick(when)}</span>
                  <ul>{what.map((x) => <li key={x.en}>{pick(x)}</li>)}</ul>
                </li>
              ))}
            </ol>
            <div className="row-gap">
              <button className="link" onClick={() => set({ party: DEFAULT_PARTY })}>{p(T.reset)}</button>
            </div>
          </section>
        </>
      )}
    </>
  );
}

const ROLE_ORDER: Role[] = ["batch", "fresh", "serve", "top"];

function BatchCard({ b, lang, p }: { b: Batch; lang: Lang; p: (x: L, v?: Record<string, string | number>) => string }) {
  const name = b.c.name[lang];
  const amount = (ml: number, cat: string) => formatAmount(Math.round(ml * 2) / 2, lang, false, cat);
  const rows = (role: Role) => b.lines.filter((x) => x.role === role);
  return (
    <article className="family pt-batch">
      <header>
        <h3 lang={nameLang(b.c.name)}>{name}</h3>
        <span className="pt-count">× {b.servings}</span>
      </header>
      <p className="muted pt-note">{p(METHOD_NOTE[b.method])}</p>
      {ROLE_ORDER.map((role) => {
        const list = rows(role);
        if (!list.length && !(role === "batch" && b.water)) return null;
        const head = role === "serve" ? p(T.perServe) : role === "top" ? p(T.atServe) : role === "batch" ? p(T.inBottle) : null;
        return (
          <div key={role} className={`pt-rows ${role}`}>
            {head && <span className="eyebrow">{head}</span>}
            <ul>
              {list.map((x) => (
                <li key={x.ing.id}>
                  <span lang={nameLang(x.ing.name)}>{x.ing.name[lang]}{role === "fresh" ? <small className="muted"> · {p(T.sameDay)}</small> : null}</span>
                  <span className="pt-dots" aria-hidden />
                  <span className="pt-amt">{role === "serve" || role === "top" ? `${amount(x.perGlass, x.ing.category)} / ${lang === "tr" ? "kadeh" : "glass"}` : amount(x.total, x.ing.category)}</span>
                </li>
              ))}
              {role === "batch" && b.water > 0 && (
                <li className="water">
                  <span>{p(T.water)}</span>
                  <span className="pt-dots" aria-hidden />
                  <span className="pt-amt">{Math.round(b.water)} ml</span>
                </li>
              )}
            </ul>
          </div>
        );
      })}
      <footer>
        <b>{p(T.pour, { ml: Math.round(b.pourMl) })}</b>
        <small className="muted">{p(T.litres, { l: litres(b.bottle), b: b.bottles })}</small>
      </footer>
    </article>
  );
}

/** What to do when, from what is on the menu. */
function timeline(batches: Batch[], spheres: boolean, lang: Lang): [L, L[]][] {
  const has = (m: string[]) => batches.some((b) => m.includes(b.method));
  const names = (m: string[]) => batches.filter((b) => m.includes(b.method)).map((b) => b.c.name[lang]).join(", ");
  const anyFresh = batches.some((b) => b.lines.some((x) => x.role === "fresh"));
  const anyTop = batches.some((b) => b.lines.some((x) => x.role === "top"));
  const anyServe = batches.some((b) => b.lines.some((x) => x.role === "serve"));
  const day: L[] = [];
  if (has(["stir"])) day.push(l(`${names(["stir"])}: şişeyi doldur, etiketle ve dondurucuya koy.`, `${names(["stir"])}: fill the bottle, label it and put it in the freezer.`));
  if (has(["shake", "dryshake", "build", "blend", "swizzle"])) day.push(l("Diğer karışımların alkollü kısmını şişele, buzdolabına koy.", "Bottle the spirit part of the other batches and refrigerate."));
  if (spheres) day.push(l("Küre buz kalıplarını doldur, dondur.", "Fill the ice-sphere moulds and freeze."));
  day.push(l("Alışveriş listesini tamamla; şurupları evde yapacaksan şimdi kaynat.", "Finish the shopping list; if you make the syrups at home, cook them now."));
  const before: L[] = [l("Buzu al ya da teslim al; kovaları doldur.", "Buy or collect the ice; fill the buckets.")];
  if (anyFresh) before.push(l("Narenciyeyi sık (en fazla 4 saat önce), süz ve karışımlara ekle.", "Squeeze the citrus (no more than 4 hours ahead), strain and add to the batches."));
  before.push(l("Garnitürleri kes, nemli bezle örtüp soğukta tut.", "Cut the garnishes, cover with a damp cloth and keep cold."));
  const hour: L[] = [l("Bardakları dondurucuya ya da buzlu suya koy.", "Put the glasses in the freezer or in iced water.")];
  if (anyTop) hour.push(l("Köpüklüleri buzdolabının en soğuk rafına al.", "Move the sparkling bottles to the coldest shelf."));
  const serve: L[] = [];
  if (has(["stir"])) serve.push(l("Karıştırılanlar: dondurucudan doğrudan bardağa.", "Stirred: straight from the freezer into the glass."));
  if (has(["shake", "dryshake"])) serve.push(l("Çalkalananlar: ölçülü karışım + buz, 12 saniye.", "Shaken: measured batch + ice, 12 seconds."));
  if (anyServe) serve.push(l("Yumurta akı, krema ya da naneyi her kadehte ayrıca ekle.", "Add egg white, cream or mint to each glass separately."));
  if (anyTop) serve.push(l("Köpüklüyü en son, bardağın kenarından dök.", "Pour the bubbles last, down the side of the glass."));
  return [
    [l("Bir gün önce", "The day before"), day],
    [l("Üç saat önce", "Three hours before"), before],
    [l("Bir saat önce", "An hour before"), hour],
    [l("Servis", "Service"), serve],
  ];
}
