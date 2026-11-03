/**
 * "Neden işe yarıyor?": why a recipe works, read from its own numbers.
 * Each ingredient gets a role (base, modifier, sweet, sour, accent, length),
 * then the balance, dilution and texture are explained in plain words.
 */
import { ingredientById } from "@/data/ingredients";
import { ROOTS } from "@/data/cocktails";
import type { Analysis } from "./balance";
import type { Cocktail, Ingredient, L } from "./types";

export type RoleId = "base" | "modifier" | "sweet" | "sour" | "accent" | "length" | "texture";

export const ROLE_LABEL: Record<RoleId, L> = {
  base: { tr: "Temel", en: "Base" },
  modifier: { tr: "Değiştirici", en: "Modifier" },
  sweet: { tr: "Tatlı", en: "Sweet" },
  sour: { tr: "Ekşi", en: "Sour" },
  accent: { tr: "Aksan", en: "Accent" },
  length: { tr: "Uzatıcı", en: "Lengthener" },
  texture: { tr: "Doku", en: "Texture" },
};

const TEXTURE = new Set(["egg-white", "aquafaba", "cream", "coconut-milk", "coconut", "espresso", "cold-brew"]);

export function roleOf(ing: Ingredient, top?: boolean): RoleId {
  if (top || ing.category === "mixer") return "length";
  if (TEXTURE.has(ing.id)) return "texture";
  if (ing.category === "bitters" || ing.category === "other") return "accent";
  if (ing.category === "citrus") return ing.acid >= 2 ? "sour" : "length";
  if (ing.category === "syrup") return "sweet";
  if (ing.category === "spirit" && ing.abv >= 0.3) return "base";
  return "modifier"; // liqueurs, vermouths, wines, low-proof spirits
}

export interface WhySegment {
  role: RoleId;
  ml: number;
  names: string[];
}

const l = (tr: string, en: string): L => ({ tr, en });
const pct = (x: number) => Math.round(x * 100);

export function explain(c: Cocktail, a: Analysis): { segments: WhySegment[]; points: L[] } {
  const seg = new Map<RoleId, WhySegment>();
  const roles = new Set<RoleId>();
  for (const p of c.parts) {
    const ing = ingredientById(p.id);
    if (!ing) continue;
    const r = roleOf(ing, p.top);
    roles.add(r);
    const s = seg.get(r) ?? { role: r, ml: 0, names: [] };
    s.ml += Math.max(p.ml, r === "accent" || r === "texture" ? 3 : 0);
    s.names.push(ing.id);
    seg.set(r, s);
  }
  const order: RoleId[] = ["base", "modifier", "sour", "sweet", "texture", "accent", "length"];
  const segments = order.flatMap((r) => (seg.get(r) ? [seg.get(r)!] : []));

  const points: L[] = [];
  const root = ROOTS.find((r) => r.id === c.root);
  if (root) points.push(l(`Yapısı ${root.name.tr.replace(/ Ailesi$| Aile$/, "")} ailesinden: ${root.formula.tr.toLocaleLowerCase("tr")}. Bu iskelet yüz yılı aşkın süredir dengesini kanıtladı.`, `It is built on the ${root.name.en.replace(/^The /, "").replace(/ Family$/, "")} frame: ${root.formula.en.toLowerCase()}. A skeleton that has proved its balance for over a century.`));

  // balance
  if (a.style === "sour") {
    const ratio = a.sugar / Math.max(a.acid, 0.01);
    const r = ratio.toFixed(1);
    if (ratio > 14) points.push(l(`Şeker asidin ${r} katı: klasik ekşilerin (≈10) üstünde, yani yuvarlak ve tatlıya yakın. Limonu biraz artırırsan daha canlı olur.`, `Sugar sits at ${r}× the acid, above the classic sours (≈10): round, leaning sweet. A touch more citrus makes it livelier.`));
    else if (ratio < 7) points.push(l(`Şeker asidin yalnızca ${r} katı: keskin ve ferah, ekşi tarafta duruyor. Tatlı seviyorsan şurubu biraz artır.`, `Sugar is only ${r}× the acid: sharp and bright, on the tart side. If you like it sweeter, add a little syrup.`));
    else points.push(l(`Şeker/asit oranı ${r}: klasik ekşilerin altın çizgisinde (≈10). Tatlı ve ekşi birbirini tam yokluyor; ikisi de öne çıkmıyor.`, `Sugar to acid is ${r}: right on the golden line of the classic sours (≈10). Sweet and sour cancel just so; neither steps forward.`));
  } else if (a.style === "spirit") {
    points.push(
      a.sugar < 3
        ? l(`Neredeyse şekersiz (100 ml'de ${a.sugar.toFixed(1)} g): içkiyi örtmüyor, sadece kenarlarını yumuşatıyor. Kuru, ciddi bir kadeh.`, `Almost no sugar (${a.sugar.toFixed(1)} g per 100 ml): it does not mask the spirit, only softens its edges. A dry, serious glass.`)
        : l(`100 ml'de ${a.sugar.toFixed(1)} g şeker, alkolün yakıcılığını yuvarlıyor; içki öne çıkıyor ama ısırmıyor.`, `${a.sugar.toFixed(1)} g of sugar per 100 ml rounds off the burn of the alcohol: the spirit leads, but does not bite.`),
    );
  } else if (a.style === "long") {
    points.push(l(`Uzun ve hafif: son alkol %${(a.abv * 100).toFixed(1)}. Köpük ve hacim tadı taşır; ilk yudumdan sonuncuya kadar ferah kalır.`, `Long and light: ${(a.abv * 100).toFixed(1)}% in the glass. Bubbles and volume carry the flavour, fresh from first sip to last.`));
  }

  // dilution and temperature
  const d = pct(a.dilution);
  const how: Record<string, L> = {
    shake: l(`Çalkalamak buzdan yaklaşık %${d} su katar, içkiyi −6 °C civarına kadar soğutur ve havalandırır: narenciyeli tarifler bu yüzden çalkalanır.`, `Shaking adds about ${d}% water from the ice, chills the drink to around −6 °C and aerates it: that is why citrus drinks are shaken.`),
    dryshake: l(`Önce buzsuz çalkalamak yumurta akının proteinlerini açar; buzla ikinci tur yaklaşık %${d} su katıp soğutur. Sonuç: ipeksi, kalıcı bir köpük.`, `A dry shake first unfolds the egg-white proteins; the second round with ice adds about ${d}% water and chills it. The result: a silky, lasting foam.`),
    stir: l(`Karıştırmak yaklaşık %${d} su katar ama hava katmaz: içki berrak, ağır ve ipeksi kalır. Sadece içki ve şaraptan oluşan tarifler bu yüzden karıştırılır.`, `Stirring adds about ${d}% water but no air, so the drink stays clear, weighty and silky. Recipes of only spirits and wines are stirred for that reason.`),
    build: l(`Bardakta hazırlanır, buz yavaş erir (≈%${d}). Köpüklüyü en son eklemek kabarcıkları korur.`, `Built in the glass, the ice melts slowly (≈${d}%). Adding the bubbles last keeps them alive.`),
    blend: l(`Blender buzu dondurulmuş bir dokuya çevirir; su payı yüksektir (≈%${d}), bu yüzden tarif güçlü ve tatlı kurulur.`, `The blender turns ice into a frozen texture; dilution is high (≈${d}%), so the recipe is built strong and sweet.`),
    swizzle: l(`Kırık buz ve swizzle çubuğu bardağı buğulandırır, yaklaşık %${d} su katar; içki giderek açılır.`, `Crushed ice and the swizzle stick frost the glass and add about ${d}% water; the drink opens up as it goes.`),
  };
  points.push(how[c.method] ?? how.build);
  points.push(l(`Son hâli: ≈${Math.round(a.finalVolume)} ml, %${(a.abv * 100).toFixed(1)} alkol.`, `In the glass: ≈${Math.round(a.finalVolume)} ml at ${(a.abv * 100).toFixed(1)}% ABV.`));

  if (roles.has("accent") && c.parts.some((p) => ingredientById(p.id)?.category === "bitters"))
    points.push(l("Birkaç damla bitter yemekteki tuz gibi çalışır: kendini belli etmez ama tatları birbirine bağlar ve bitişi uzatır.", "A few dashes of bitters work like salt in cooking: you barely notice them, but they tie the flavours together and lengthen the finish."));
  if (roles.has("modifier") && roles.has("base"))
    points.push(l("Likör ya da aromatik şarap temel içkiye ikinci bir ses verir: tatlılığı, acılığı ya da bitkiselliği onun yerine taşır.", "The liqueur or aromatised wine gives the base a second voice, carrying sweetness, bitterness or herbs for it."));
  if (/twist/.test(c.garnish))
    points.push(l("Kabuk bardağın üstünde sıkılınca yağları yüzeye yayılır; ilk koku oradan gelir, tadın yarısı burundadır.", "Squeezed over the glass, the peel sprays its oils on the surface: the first aroma comes from there, and half of taste is smell."));
  return { segments, points };
}
