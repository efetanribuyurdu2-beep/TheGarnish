import type { L, PaletteId, WorldId } from "@/lib/types";

export interface World {
  id: WorldId;
  name: L;
  tagline: L;
  intro: L;
  collection: L; // name of the exclusive collection
  bar: L; // the bar the Atelier becomes in this world
  greeting: L; // the bartender's welcome
  swatch: [string, string, string]; // bg, accent, accent2 for previews
  password?: { answer: string; hint: L };
}

export const WORLDS: World[] = [
  {
    id: "maison",
    name: { tr: "Maison", en: "Maison" },
    tagline: { tr: "Klasik lüks. Art Deco, kristal ve altın.", en: "Classic luxury. Art Deco, crystal and gold." },
    intro: {
      tr: "Büyük otel barlarının sessiz ihtişamına hoş geldiniz. Burada her kokteyl bir efsane, her bardak bir hikâye.",
      en: "Welcome to the quiet grandeur of the great hotel bars. Here every cocktail is a legend, every glass a story.",
    },
    collection: { tr: "Bar Efsaneleri", en: "Legends of the Bar" },
    bar: { tr: "Le Grand Bar", en: "Le Grand Bar" },
    greeting: { tr: "İyi akşamlar. Mermer tezgâh sizin; hangi şişeyle başlayalım?", en: "Good evening. The marble is yours; which bottle shall we begin with?" },
    swatch: ["#0b0b0b", "#c9a961", "#efe6d2"],
  },
  {
    id: "anatolia",
    name: { tr: "Anatolia", en: "Anatolia" },
    tagline: { tr: "Çini mavisi, nar kırmızısı, nazar ve lale.", en: "Tile blue, pomegranate red, the evil eye and the tulip." },
    intro: {
      tr: "Binlerce yıllık bir mutfağın meyveleri, baharatları ve ritüelleri bardağa dökülüyor. Nar, sakız, fıstık, gül.",
      en: "The fruits, spices and rituals of a thousand-year-old kitchen, poured into a glass. Pomegranate, mastic, pistachio, rose.",
    },
    collection: { tr: "Anadolu Rezervi", en: "Anatolian Reserve" },
    bar: { tr: "Garnish Meyhanesi", en: "Garnish Meyhane" },
    greeting: { tr: "Hoş geldin, safa geldin! Kilimin üstüne buyur, raftan ne istersen alalım.", en: "Hoş geldin! Have a seat on the kilim; take anything you like from the shelf." },
    swatch: ["#0b1f3a", "#2fb7b0", "#c8323c"],
  },
  {
    id: "cosmos",
    name: { tr: "Cosmos", en: "Cosmos" },
    tagline: { tr: "Nebulalar, yıldız haritaları, renk değiştiren iksirler.", en: "Nebulae, star charts, colour-shifting potions." },
    intro: {
      tr: "Yer çekimi burada biraz daha hafif. Kokteyl aileleri gezegen, tarifler takımyıldız.",
      en: "Gravity is a little lighter here. Cocktail families are planets, recipes are constellations.",
    },
    collection: { tr: "Takımyıldızlar", en: "Constellations" },
    bar: { tr: "Orbital Lounge", en: "Orbital Lounge" },
    greeting: { tr: "Yörüngeye hoş geldin. Şişeler yer çekimsiz; dikkatli dök.", en: "Welcome to orbit. The bottles are weightless; pour with care." },
    swatch: ["#05060f", "#9b7bff", "#ff7ac8"],
  },
  {
    id: "jazz",
    name: { tr: "Jazz Bar", en: "Jazz Bar" },
    tagline: { tr: "1920'ler, speakeasy, saksafon ve şampanya.", en: "The 1920s, speakeasies, saxophones and champagne." },
    intro: {
      tr: "Kapı aralandı, parola doğruydu. İçki Yasağı'nın gizli barlarında caz çalıyor, bardaklar kristal.",
      en: "The door creaks open, the password was right. Jazz plays in the hidden bars of Prohibition, the glasses are crystal.",
    },
    collection: { tr: "Yasak Dönem", en: "The Prohibition Era" },
    bar: { tr: "The Blind Tiger", en: "The Blind Tiger" },
    greeting: { tr: "Parola doğruydu, dostum. Sesini alçak tut ve ne içeceğini söyle.", en: "Password checks out, pal. Keep it down and name your poison." },
    swatch: ["#0d0d0d", "#d9b25f", "#1f6f63"],
    password: {
      answer: "BEES KNEES",
      hint: {
        tr: "İpucu: 1920'lerin argosunda \"harika\" demekti. Arıların dizleri…",
        en: "Hint: in 1920s slang it meant \"excellent\". The knees of a bee…",
      },
    },
  },
  {
    id: "sakura",
    name: { tr: "Sakura", en: "Sakura" },
    tagline: { tr: "Kiraz çiçekleri, yuzu, matcha ve kusursuz buz.", en: "Cherry blossoms, yuzu, matcha and flawless ice." },
    intro: {
      tr: "Japon barlarında bir kokteyl bir tören gibidir. Buz elde yontulur, her hareket ölçülüdür. Hanami zamanı.",
      en: "In Japanese bars a cocktail is a ceremony. Ice is carved by hand, every motion measured. It is hanami season.",
    },
    collection: { tr: "Hanami Koleksiyonu", en: "Hanami Collection" },
    bar: { tr: "Bar Hanami 花見", en: "Bar Hanami 花見" },
    greeting: { tr: "いらっしゃいませ. Buz az önce elde yontuldu; ölçüleri birlikte seçelim.", en: "Irasshaimase. The ice was just hand-carved; let us choose the measures together." },
    swatch: ["#1a1216", "#f2a7bb", "#c8102e"],
  },
  {
    id: "alchemist",
    name: { tr: "Alchemist", en: "Alchemist" },
    tagline: { tr: "İksirler, bitter'lar, tentürler ve eski el yazmaları.", en: "Elixirs, bitters, tinctures and old manuscripts." },
    intro: {
      tr: "Kokteylin atası eczacının şişesidir. Bu laboratuvarda otlar, kökler ve gizli formüller var.",
      en: "The cocktail's ancestor is the apothecary's bottle. This laboratory holds herbs, roots and secret formulas.",
    },
    collection: { tr: "İksirler", en: "Elixirs" },
    bar: { tr: "The Apothecary", en: "The Apothecary" },
    greeting: { tr: "Laboratuvara hoş geldin. Her şişe bir element; formülünü yaz.", en: "Welcome to the laboratory. Every bottle is an element; write your formula." },
    swatch: ["#14110c", "#b8863b", "#4f7d5c"],
  },
  {
    id: "tiki",
    name: { tr: "Tiki", en: "Tiki" },
    tagline: { tr: "Rom, egzotik meyveler, palmiye ve tropik geceler.", en: "Rum, exotic fruit, palm fronds and tropical nights." },
    intro: {
      tr: "Bambu bar, meşaleler, okyanus sesi. Burada romun on çeşidi var ve hepsi bir arada çok mutlu.",
      en: "A bamboo bar, torches, the sound of the ocean. Here rum comes in ten styles, and they all get along beautifully.",
    },
    collection: { tr: "Lagün Koleksiyonu", en: "Lagoon Collection" },
    bar: { tr: "The Lagoon Hut", en: "The Lagoon Hut" },
    greeting: { tr: "Aloha! Bambu tezgâha geç, meşaleler yanıyor, rom bol.", en: "Aloha! Pull up to the bamboo bar; the torches are lit and the rum is plenty." },
    swatch: ["#0c1a14", "#f0a04b", "#e2574c"],
  },
  {
    id: "boreal",
    name: { tr: "Boreal", en: "Boreal" },
    tagline: { tr: "Kuzey ışıkları, buz kristalleri ve huş ormanı.", en: "Northern lights, ice crystals and birch forest." },
    intro: {
      tr: "Kuzeyin sessizliğinde, karın üstünde yeşil bir ışık dans ediyor. Huş ağacından kupalar, buzdan bardaklar; İskandinav sadeliği ile Rus ihtişamı aynı sofrada.",
      en: "In the silence of the north, a green light dances over the snow. Cups of birch, glasses of ice; Scandinavian restraint and Russian grandeur at the same table.",
    },
    collection: { tr: "Kutup Gecesi", en: "Polar Night" },
    bar: { tr: "Aurora Hall", en: "Aurora Hall" },
    greeting: { tr: "Kapıyı çabuk kapat, ayaz içeri dolmasın. Soba yanıyor, votka buz gibi; neyle ısınalım?", en: "Shut the door quick, the frost gets in. The stove is lit and the vodka ice-cold; what shall warm you?" },
    swatch: ["#07121f", "#7fe3c4", "#dfeaf2"],
  },
  {
    id: "riviera",
    name: { tr: "Riviera", en: "Riviera" },
    tagline: { tr: "Bağlar, mahzenler, limon ağaçları ve Akdeniz güneşi.", en: "Vineyards, cellars, lemon trees and Mediterranean sun." },
    intro: {
      tr: "Provence'ın lavantası, Toskana'nın bağları, Ege'nin zeytinlikleri. Gün mahzenin serinliğinde başlar, akşam limon ağaçlarının altında bir spritz ile biter.",
      en: "The lavender of Provence, the vineyards of Tuscany, the olive groves of the Aegean. The day begins in the cool of the cellar and ends with a spritz beneath the lemon trees.",
    },
    collection: { tr: "Bağ Bozumu", en: "The Harvest" },
    bar: { tr: "La Cave Riviera", en: "La Cave Riviera" },
    greeting: { tr: "Benvenuti! Mahzen serin, bahçe güneşli. Önce bir spritz mi, yoksa fıçıdan bir şey mi?", en: "Benvenuti! The cellar is cool and the garden sunny. A spritz first, or something from the barrel?" },
    swatch: ["#17110d", "#e3b341", "#7d8f3a"],
  },
];

export const PALETTES: { id: PaletteId; name: L; swatch: [string, string] }[] = [
  { id: "noir", name: { tr: "Noir & Or", en: "Noir & Or" }, swatch: ["#0b0b0b", "#c9a961"] },
  { id: "midnight", name: { tr: "Midnight", en: "Midnight" }, swatch: ["#0a1226", "#d4b56a"] },
  { id: "bordeaux", name: { tr: "Bordeaux", en: "Bordeaux" }, swatch: ["#2a0a12", "#e3c48e"] },
];

export const worldById = (id: WorldId) => WORLDS.find((w) => w.id === id)!;
