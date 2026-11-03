/**
 * Time-of-day worlds: the visitor's local hour gives a phase, written to
 * <html data-time> (before first paint, then every few minutes). globals.css
 * ("TIME OF DAY") lights each world for it, and the host greets accordingly.
 */
import type { L, WorldId } from "./types";

export type Phase = "dawn" | "day" | "dusk" | "night";

export function phaseOf(hour: number): Phase {
  if (hour >= 5 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "dusk";
  return "night";
}

/** Inline in the boot script (layout.tsx): same thresholds as phaseOf. */
export const PHASE_BOOT = `var hr=new Date().getHours();h.dataset.time=hr>=5&&hr<9?"dawn":hr>=9&&hr<17?"day":hr>=17&&hr<21?"dusk":"night";`;

const l = (tr: string, en: string): L => ({ tr, en });

export const GREETING: Record<Phase, L> = {
  dawn: l("Günaydın", "Good morning"),
  day: l("İyi günler", "Good afternoon"),
  dusk: l("İyi akşamlar", "Good evening"),
  night: l("İyi geceler", "Good night"),
};

/** What the hour looks like in each world, in a line. */
export const HOUR_LINE: Record<WorldId, Record<Phase, L>> = {
  maison: {
    dawn: l("Lobide ilk kahveler, kristal avizeler henüz uykulu.", "The first coffees in the lobby; the chandeliers still sleepy."),
    day: l("Öğle ışığı mermere vuruyor; bir aperatif saati.", "Noon light on the marble: an hour for an aperitif."),
    dusk: l("Lambalar yandı, piyano ilk akorunu bastı.", "The lamps are lit and the piano strikes its first chord."),
    night: l("Gece yarısı barı: alçak sesler, derin koltuklar.", "The midnight bar: low voices, deep armchairs."),
  },
  anatolia: {
    dawn: l("Ezan sesi ve simit kokusu; çay demleniyor.", "The call to prayer and the smell of simit; tea is brewing."),
    day: l("Avluda nar ağacının gölgesi, kilimler güneşte.", "The pomegranate tree's shade in the courtyard, kilims in the sun."),
    dusk: l("Meyhane masaları kuruluyor, ilk kadehler kalkıyor.", "The meyhane tables are being laid; the first glasses rise."),
    night: l("Fasıl başladı; mehtap Boğaz'ın üstünde.", "The fasıl has begun; moonlight over the Bosphorus."),
  },
  cosmos: {
    dawn: l("Gezegen ufkunda ilk güneş, panellerde şafak.", "First sunrise over the planet's rim, dawn on the panels."),
    day: l("Yörüngenin aydınlık yüzündeyiz; göz kamaştırıcı.", "We are on the bright side of the orbit; dazzling."),
    dusk: l("Terminatör hattını geçiyoruz, gökyüzü mora dönüyor.", "Crossing the terminator; the sky turns violet."),
    night: l("Karanlık yüz: yıldızlar en parlak hâlinde.", "The dark side: the stars at their brightest."),
  },
  jazz: {
    dawn: l("Son set bitti; sandalyeler masaların üstünde.", "The last set is over; chairs up on the tables."),
    day: l("Kapı kapalı, perdeler çekili; içeride prova var.", "The door is shut, curtains drawn; a rehearsal inside."),
    dusk: l("Parola fısıldanıyor, kapı aralanıyor.", "The password is whispered; the door opens a crack."),
    night: l("Gece en sıcak saatinde: kornet, duman, pirinç.", "The night at its hottest: cornet, smoke and brass."),
  },
  sakura: {
    dawn: l("Sabah sisi bahçede, çiçekler çiyle ağır.", "Morning mist in the garden, the blossoms heavy with dew."),
    day: l("Shoji'den süzülen yumuşak ışık; hanami zamanı.", "Soft light through the shoji: time for hanami."),
    dusk: l("Fenerler yanıyor, yapraklar akşam rüzgârında.", "The lanterns are lit, petals on the evening wind."),
    night: l("Yozakura: ay ışığında kiraz çiçekleri.", "Yozakura: cherry blossoms by moonlight."),
  },
  alchemist: {
    dawn: l("Gece boyu kaynayan imbik soğumaya başladı.", "The alembic that boiled all night begins to cool."),
    day: l("Tozlu pencereden tek bir ışık huzmesi düşüyor.", "A single beam falls through the dusty window."),
    dusk: l("Mumlar yakıldı, formüller yeniden açıldı.", "The candles are lit and the formulae opened again."),
    night: l("Gece yarısı: dönüşüm saati.", "Midnight: the hour of transmutation."),
  },
  tiki: {
    dawn: l("Lagün sakin, ilk balıkçılar denizde.", "The lagoon is calm, the first fishermen out."),
    day: l("Güneş tepede, hindistan cevizleri soğuyor.", "The sun overhead, the coconuts chilling."),
    dusk: l("Gün batımı lagünü pembeye boyuyor; meşaleler yanıyor.", "Sunset turns the lagoon pink; the torches are lit."),
    night: l("Ateşin etrafında ukulele ve davul.", "Ukulele and drums around the fire."),
  },
  boreal: {
    dawn: l("Mavi saat: kar maviye kesmiş, çam ormanı sessiz.", "The blue hour: the snow gone blue, the pines silent."),
    day: l("Kısa ve beyaz bir gün; kar ışığı gözleri kamaştırıyor.", "A short white day; the snowlight dazzles."),
    dusk: l("Gökyüzü mora döndü, ilk yıldızlar çıktı.", "The sky has turned violet; the first stars are out."),
    night: l("Aurora gökte dans ediyor; ateşin başına gel.", "The aurora dances overhead; come to the fire."),
  },
  riviera: {
    dawn: l("Limon bahçelerinde sabah serinliği.", "Morning cool in the lemon groves."),
    day: l("Akdeniz güneşi, panjurların arasından altın çizgiler.", "Mediterranean sun, gold lines between the shutters."),
    dusk: l("Aperitivo saati: gökyüzü rosé renginde.", "Aperitivo hour: the sky the colour of rosé."),
    night: l("Mahzende mum ışığı, taş duvarlar serin.", "Candlelight in the cellar, the stone walls cool."),
  },
};
