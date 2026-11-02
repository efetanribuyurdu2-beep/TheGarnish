import type { Lang } from "./types";

const dict = {
  brand: { tr: "GARNISH", en: "GARNISH" },
  brandSub: { tr: "COCKTAIL WORLDS", en: "COCKTAIL WORLDS" },
  chooseWorld: { tr: "Dünyanı seç", en: "Choose your world" },
  chooseWorldSub: {
    tr: "Her dünyanın kendi renkleri, motifleri ve özel kokteylleri var. İstediğin an değiştirebilirsin.",
    en: "Every world has its own colours, motifs and exclusive cocktails. You can switch at any time.",
  },
  enter: { tr: "Gir", en: "Enter" },
  changeWorld: { tr: "Dünya değiştir", en: "Change world" },
  palette: { tr: "Renk", en: "Palette" },
  password: { tr: "Parola?", en: "Password?" },
  passwordWrong: { tr: "Kapı kapalı kaldı. Tekrar dene.", en: "The door stays shut. Try again." },
  knock: { tr: "Kapıyı çal", en: "Knock" },
  back: { tr: "Geri", en: "Back" },
  // nav
  nav_home: { tr: "Giriş", en: "Home" },
  nav_cocktails: { tr: "Kokteyller", en: "Cocktails" },
  nav_cellar: { tr: "The Cellar", en: "The Cellar" },
  nav_atelier: { tr: "The Atelier", en: "The Atelier" },
  nav_lineage: { tr: "The Lineage", en: "The Lineage" },
  nav_concierge: { tr: "Concierge", en: "Concierge" },
  nav_bar: { tr: "Barım", en: "My Bar" },
  nav_glass: { tr: "Glass & Ice", en: "Glass & Ice" },
  nav_games: { tr: "Oyunlar", en: "Games" },
  gamesSub: { tr: "Her dünyanın kendi oyunu var: bilmeceler, bulmacalar ve bir parça eğlence.", en: "Every world has its own game: riddles, puzzles and a little play." },
  nav_collection: { tr: "Koleksiyonum", en: "My Collection" },
  menu: { tr: "Menü", en: "Menu" },
  // sections
  cellarSub: { tr: "Malzemeler, bir şarap mahzeni gibi: tadım notları, kökenler ve hikâyeler.", en: "Ingredients, like a wine cellar: tasting notes, origins and stories." },
  cocktailsSub: { tr: "Klasikler her dünyada; imzalar yalnızca kendi dünyasında.", en: "Classics in every world; signatures only in their own." },
  atelierSub: { tr: "Kendi imza kokteylini tasarla. Altın terazi dengeyi anlık ölçer.", en: "Design your own signature cocktail. The golden scale measures balance live." },
  lineageSub: { tr: "Her kokteyl altı ana aileden birine aittir. Kökleri, dalları ve senin eklediklerini keşfet.", en: "Every cocktail belongs to one of six families. Explore the roots, branches and your own additions." },
  conciergeSub: { tr: "Ortamı ve damak zevkini söyle, sana özel bir kadeh önerelim.", en: "Tell us the setting and your palate; we'll pour something just for you." },
  barSub: { tr: "Evindeki şişeleri işaretle; neler yapabileceğini gösterelim.", en: "Tick the bottles you own; we'll show you what you can make." },
  glassSub: { tr: "Lüks barları evden ayıran detaylar: kristal, buz ve garnitür sanatı.", en: "The details that separate great bars from home: crystal, ice and the art of the garnish." },
  collectionSub: { tr: "Kaydettiğin ve yarattığın kokteyller, kişisel menün olarak.", en: "The cocktails you saved and created, as your personal menu." },
  all: { tr: "Tümü", en: "All" },
  classics: { tr: "Klasikler", en: "Classics" },
  search: { tr: "Ara…", en: "Search…" },
  explore: { tr: "Keşfet", en: "Explore" },
  // cocktail detail
  ingredients: { tr: "Malzemeler", en: "Ingredients" },
  method: { tr: "Hazırlanışı", en: "Method" },
  glass: { tr: "Bardak", en: "Glass" },
  ice: { tr: "Buz", en: "Ice" },
  garnish: { tr: "Garnitür", en: "Garnish" },
  origin: { tr: "Köken", en: "Origin" },
  family: { tr: "Aile", en: "Family" },
  descendsFrom: { tr: "Atası", en: "Descends from" },
  children: { tr: "Torunları", en: "Descendants" },
  save: { tr: "Koleksiyona ekle", en: "Save to collection" },
  saved: { tr: "Koleksiyonda", en: "Saved" },
  topWith: { tr: "üzerine", en: "top" },
  handful: { tr: "bir avuç", en: "a handful" },
  dash: { tr: "dash", en: "dash" },
  dashes: { tr: "dash", en: "dashes" },
  // cellar
  nose: { tr: "Burunda", en: "Nose" },
  palate: { tr: "Damakta", en: "Palate" },
  finish: { tr: "Bitiş", en: "Finish" },
  abv: { tr: "Alkol", en: "ABV" },
  swaps: { tr: "Yerine kullanılabilir", en: "Substitutes" },
  premium: { tr: "Premium öneri", en: "Premium pick" },
  usedIn: { tr: "Bu malzemeyle", en: "Made with this" },
  // flavour
  f_sweet: { tr: "Tatlı", en: "Sweet" },
  f_sour: { tr: "Ekşi", en: "Sour" },
  f_bitter: { tr: "Acı", en: "Bitter" },
  f_strong: { tr: "Güçlü", en: "Strong" },
  f_fresh: { tr: "Ferah", en: "Fresh" },
  f_aromatic: { tr: "Aromatik", en: "Aromatic" },
  // atelier
  name: { tr: "Kokteylin adı", en: "Cocktail name" },
  addIngredient: { tr: "Malzeme ekle", en: "Add ingredient" },
  balance: { tr: "Denge", en: "Balance" },
  tooSour: { tr: "Ekşi", en: "Tart" },
  tooSweet: { tr: "Tatlı", en: "Sweet" },
  balanced: { tr: "Dengeli", en: "Balanced" },
  finalAbv: { tr: "Son alkol oranı", en: "Final ABV" },
  volume: { tr: "Hacim", en: "Volume" },
  calories: { tr: "Kalori", en: "Calories" },
  dilution: { tr: "Buz suyu", en: "Dilution" },
  tipAcid: { tr: "Biraz tatlı kaçtı. Yaklaşık {ml} ml limon ekle.", en: "A touch sweet. Add about {ml} ml of lemon." },
  tipSugar: { tr: "Biraz ekşi kaçtı. Yaklaşık {ml} ml şurup ekle.", en: "A touch tart. Add about {ml} ml of syrup." },
  tipOk: { tr: "Kusursuz denge. Bir barmen gibi.", en: "Perfect balance. Like a pro." },
  tipStrong: { tr: "Çok güçlü. Biraz vermut ya da şurupla yumuşat.", en: "Very strong. Soften it with vermouth or syrup." },
  tipWeak: { tr: "Çok hafif. Ana içkiyi biraz artır.", en: "Very light. Add a little more of the base spirit." },
  styleSour: { tr: "Ekşi stil", en: "Sour style" },
  styleSpirit: { tr: "Sert stil", en: "Spirit-forward" },
  styleLong: { tr: "Uzun içim", en: "Long drink" },
  saveCreation: { tr: "İmzamı kaydet", en: "Save my signature" },
  createdSaved: { tr: "Koleksiyonuna eklendi.", en: "Added to your collection." },
  parentFamily: { tr: "Hangi aileden?", en: "Which family?" },
  emptyAtelier: { tr: "Başlamak için bir malzeme ekle ya da bir klasikten ilham al.", en: "Add an ingredient to begin, or start from a classic." },
  startFrom: { tr: "Bir klasikten başla", en: "Start from a classic" },
  remove: { tr: "Kaldır", en: "Remove" },
  // concierge
  setting: { tr: "Ortam", en: "Setting" },
  palateQ: { tr: "Damak", en: "Palate" },
  pour: { tr: "Kadehimi doldur", en: "Pour for me" },
  recommendations: { tr: "Sizin için seçtiklerimiz", en: "Our selection for you" },
  // bar
  canMake: { tr: "Şu an yapabileceklerin", en: "You can make now" },
  oneMissing: { tr: "Sadece bir malzeme eksik", en: "Just one ingredient away" },
  missing: { tr: "Eksik", en: "Missing" },
  nothingYet: { tr: "Henüz bir şey yok. Şişelerini işaretle.", en: "Nothing yet. Tick your bottles." },
  clear: { tr: "Temizle", en: "Clear" },
  // collection
  favourites: { tr: "Kaydedilenler", en: "Saved" },
  creations: { tr: "İmzalarım", en: "My Signatures" },
  printMenu: { tr: "Menü olarak yazdır / PDF", en: "Print as menu / PDF" },
  emptyCollection: { tr: "Koleksiyonun henüz boş. Bir kokteyldeki ♡ işaretine dokun.", en: "Your collection is empty. Tap ♡ on any cocktail." },
  otherFamily: { tr: "başka aileye geçen torun", en: "descendant in another family" },
  yourBranches: { tr: "Senin dalların", en: "Your branches" },
  signature: { tr: "İmza", en: "Signature" },
  featured: { tr: "Bu akşamın önerisi", en: "Tonight's pour" },
  enterWorld: { tr: "Koleksiyonu keşfet", en: "Explore the collection" },
  footer: { tr: "Lütfen sorumlu için. 18 yaş ve üzeri içindir.", en: "Please drink responsibly. For adults of legal drinking age." },
  age: { tr: "18 yaşından büyük olduğumu onaylıyorum", en: "I confirm I am of legal drinking age" },
} as const;

export type UIKey = keyof typeof dict;
export const tr = (lang: Lang, key: UIKey, vars?: Record<string, string | number>) => {
  let s: string = dict[key][lang];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
};

export const METHOD_STEPS: Record<string, { tr: string[]; en: string[] }> = {
  shake: {
    tr: ["Malzemeleri shaker'a koy.", "Buzla doldur ve 12 saniye sert çalkala.", "İnce süzgeçten geçirerek soğutulmuş bardağa süz."],
    en: ["Add the ingredients to a shaker.", "Fill with ice and shake hard for 12 seconds.", "Double-strain into a chilled glass."],
  },
  dryshake: {
    tr: ["Malzemeleri buzsuz shaker'a koy ve 10 saniye çalkala (dry shake).", "Buz ekle ve 12 saniye daha sert çalkala.", "İnce süzgeçten geçirerek bardağa süz; köpüğün oturmasını bekle."],
    en: ["Add the ingredients to a shaker without ice and shake for 10 seconds (dry shake).", "Add ice and shake hard for 12 more seconds.", "Double-strain into the glass and let the foam settle."],
  },
  stir: {
    tr: ["Malzemeleri karıştırma bardağına koy.", "Buzla doldur ve bar kaşığıyla 30 saniye karıştır.", "Soğutulmuş bardağa süz."],
    en: ["Add the ingredients to a mixing glass.", "Fill with ice and stir with a bar spoon for 30 seconds.", "Strain into a chilled glass."],
  },
  build: {
    tr: ["Bardağı buzla doldur.", "Malzemeleri sırayla doğrudan bardağa ekle, köpüklüleri en son.", "Bar kaşığıyla nazikçe bir kez karıştır."],
    en: ["Fill the glass with ice.", "Add the ingredients directly to the glass, sparkling ones last.", "Give one gentle stir with a bar spoon."],
  },
  blend: {
    tr: ["Malzemeleri bir avuç buzla blender'a koy.", "Pürüzsüz olana kadar 15 saniye çek.", "Bardağa dök."],
    en: ["Add the ingredients to a blender with a scoop of ice.", "Blend for 15 seconds until smooth.", "Pour into the glass."],
  },
  swizzle: {
    tr: ["Malzemeleri bardağa koy ve kırık buzla doldur.", "Swizzle çubuğunu avuçlarının arasında hızla döndürerek bardak buğulanana kadar karıştır.", "Üzerine biraz daha kırık buz ekle."],
    en: ["Add the ingredients to the glass and fill with crushed ice.", "Spin a swizzle stick between your palms until the glass frosts.", "Top with more crushed ice."],
  },
};

export const GLASS_LABEL: Record<string, { tr: string; en: string }> = {
  coupe: { tr: "Coupe", en: "Coupe" },
  martini: { tr: "Martini bardağı", en: "Martini glass" },
  rocks: { tr: "Rocks (Old Fashioned)", en: "Rocks (Old Fashioned)" },
  highball: { tr: "Highball", en: "Highball" },
  flute: { tr: "Flüt", en: "Flute" },
  nicknora: { tr: "Nick & Nora", en: "Nick & Nora" },
  mug: { tr: "Bakır kupa", en: "Copper mug" },
  tiki: { tr: "Tiki kupası", en: "Tiki mug" },
  wine: { tr: "Şarap kadehi", en: "Wine glass" },
  fincan: { tr: "Zarflı kahve fincanı", en: "Turkish coffee cup" },
  istikan: { tr: "İnce belli çay bardağı", en: "Tulip tea glass" },
  raki: { tr: "Rakı kadehi", en: "Rakı glass" },
  ochoko: { tr: "Ochoko sake kâsesi", en: "Ochoko sake cup" },
  masu: { tr: "Hinoki masu", en: "Hinoki masu box" },
  teacup: { tr: "Porselen fincan", en: "Porcelain teacup" },
  orb: { tr: "Küre kadeh", en: "Orb glass" },
  beaker: { tr: "Beher", en: "Beaker" },
  flask: { tr: "Balon joje", en: "Round-bottom flask" },
  coconut: { tr: "Hindistan cevizi", en: "Coconut shell" },
  pineapple: { tr: "Ananas", en: "Hollowed pineapple" },
};

/** Vessels that belong to a world: shown first in that world's bar. */
export const WORLD_VESSELS: Record<string, string[]> = {
  maison: ["coupe", "nicknora", "flute"],
  anatolia: ["fincan", "istikan", "raki"],
  sakura: ["ochoko", "masu"],
  jazz: ["teacup", "coupe"],
  cosmos: ["orb"],
  alchemist: ["beaker", "flask"],
  tiki: ["coconut", "pineapple", "tiki"],
};
export const SPECIAL_VESSELS = ["fincan", "istikan", "raki", "ochoko", "masu", "teacup", "orb", "beaker", "flask", "coconut", "pineapple"];

export const ICE_LABEL: Record<string, { tr: string; en: string }> = {
  none: { tr: "Buzsuz (soğutulmuş bardak)", en: "Up (chilled glass)" },
  cube: { tr: "Küp buz", en: "Ice cubes" },
  sphere: { tr: "Kristal buz küresi", en: "Clear ice sphere" },
  crushed: { tr: "Kırık buz", en: "Crushed ice" },
  collins: { tr: "Uzun buz sütunu", en: "Collins spear" },
};
