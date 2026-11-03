/**
 * The Cocktail Book (/book): the classics everyone knows, in one volume.
 * Pages that already exist on the site point at their cocktail (recipe, glass and
 * story come from cocktails.ts); the rest are famous drinks written here.
 * Photos live in bookPhotos.ts (Unsplash, credited); a page without one shows
 * its glass drawn large.
 */
import type { Glass, L } from "@/lib/types";

const l = (tr: string, en: string): L => ({ tr, en });

/** Site cocktails that belong in the book, in reading order. */
export const BOOK_FROM_SITE: string[] = [
  // the core canon
  "martini", "negroni", "old-fashioned", "manhattan", "daiquiri", "margarita", "whiskey-sour", "sidecar",
  "mojito", "gimlet", "french-75", "tom-collins", "americano", "boulevardier", "moscow-mule", "paloma",
  "aperol-spritz", "espresso-martini",
  // golden-age and prohibition
  "sazerac", "bees-knees", "aviation", "mary-pickford", "southside", "hanky-panky", "white-lady", "bijou",
  "last-word", "corpse-reviver", "death-afternoon", "vesper",
  // tiki
  "mai-tai", "pina-colada", "zombie", "jungle-bird", "painkiller",
  // wine, spritz and highball
  "kir-royal", "hugo", "japanese-highball",
  // alcohol-free classics
  "shirley-temple", "pussyfoot", "lime-rickey",
];

export interface BookExtra {
  id: string;
  name: L;
  year: string;
  origin: L;
  story: L;
  glass: Glass;
  color: string; // the drink's colour for the glass drawing
  opaque?: boolean;
  ice: "none" | "cube" | "crushed" | "collins" | "sphere";
  garnish: string; // GARNISHES key or "none"
  recipe: L[];
  method: L;
  family: L;
}

/** Famous cocktails that are not yet on the site's menus. */
export const BOOK_EXTRAS: BookExtra[] = [
  {
    id: "cosmopolitan", name: l("Cosmopolitan", "Cosmopolitan"), year: "1980'ler / 1980s",
    origin: l("Miami ve New York", "Miami and New York"),
    story: l("Limonlu votka, kızılcık ve portakal likörü: doksanların New York'unun pembe kadehi. Bir dizinin dört kahramanıyla dünyaya yayıldı.", "Citrus vodka, cranberry and orange liqueur: the pink glass of nineties New York, carried around the world by four friends on television."),
    glass: "martini", color: "#e0566f", ice: "none", garnish: "orange-twist",
    recipe: [l("40 ml limonlu votka", "40 ml citrus vodka"), l("15 ml portakal likörü", "15 ml orange liqueur"), l("15 ml misket limonu suyu", "15 ml lime juice"), l("30 ml kızılcık suyu", "30 ml cranberry juice")],
    method: l("Buzla çalkala, soğutulmuş kadehe süz.", "Shake with ice, strain into a chilled glass."), family: l("Sidecar ailesi", "Sidecar family"),
  },
  {
    id: "caipirinha", name: l("Caipirinha", "Caipirinha"), year: "1918",
    origin: l("São Paulo, Brezilya", "São Paulo, Brazil"),
    story: l("Brezilya'nın ulusal içkisi: şeker kamışından cachaça, ezilmiş misket limonu ve şeker. Adı 'küçük köylü kız' demek.", "Brazil's national drink: sugar-cane cachaça, muddled lime and sugar. Its name means 'little country girl'."),
    glass: "rocks", color: "#d9e6a8", ice: "crushed", garnish: "lime-wheel",
    recipe: [l("60 ml cachaça", "60 ml cachaça"), l("½ misket limonu, dilimlenmiş", "½ lime, cut in wedges"), l("2 çay kaşığı şeker", "2 teaspoons sugar")],
    method: l("Limonu şekerle bardakta ez, kırık buz ve cachaça ekle, karıştır.", "Muddle lime with sugar in the glass, add crushed ice and cachaça, stir."), family: l("Daiquiri ailesi", "Daiquiri family"),
  },
  {
    id: "bloody-mary", name: l("Bloody Mary", "Bloody Mary"), year: "1921",
    origin: l("Harry's New York Bar, Paris", "Harry's New York Bar, Paris"),
    story: l("Paris'te doğup New York'ta baharatlanan, pazar kahvaltılarının kralı. Domates, votka ve bolca keskin baharat.", "Born in Paris and spiced up in New York, the king of the Sunday brunch: tomato, vodka and a fistful of heat."),
    glass: "highball", color: "#b8322a", opaque: true, ice: "cube", garnish: "lemon-wheel",
    recipe: [l("45 ml votka", "45 ml vodka"), l("90 ml domates suyu", "90 ml tomato juice"), l("15 ml limon suyu", "15 ml lemon juice"), l("Worcestershire, acı sos, tuz, karabiber", "Worcestershire, hot sauce, salt, pepper")],
    method: l("İki bardak arasında yavaşça aktararak karıştır.", "Roll gently between two glasses to mix."), family: l("Highball ailesi", "Highball family"),
  },
  {
    id: "pisco-sour", name: l("Pisco Sour", "Pisco Sour"), year: "1920'ler / 1920s",
    origin: l("Lima, Peru", "Lima, Peru"),
    story: l("Peru ve Şili'nin paylaşamadığı içki. Üzüm brendisi pisco, limon ve ipeksi yumurta akı köpüğünün üstünde üç damla bitter.", "The drink Peru and Chile both claim: grape brandy, lime and a silky egg-white foam crowned with three drops of bitters."),
    glass: "coupe", color: "#efe7c9", opaque: true, ice: "none", garnish: "none",
    recipe: [l("60 ml pisco", "60 ml pisco"), l("30 ml misket limonu suyu", "30 ml lime juice"), l("20 ml şeker şurubu", "20 ml simple syrup"), l("1 yumurta akı, 3 damla Angostura", "1 egg white, 3 drops Angostura")],
    method: l("Önce buzsuz, sonra buzla çalkala. Köpüğe bitter damlat.", "Dry shake, then shake with ice. Drop bitters on the foam."), family: l("Daiquiri (Sour) ailesi", "Daiquiri (Sour) family"),
  },
  {
    id: "mint-julep", name: l("Mint Julep", "Mint Julep"), year: "1803",
    origin: l("Virginia ve Kentucky", "Virginia and Kentucky"),
    story: l("Kentucky Derbisi'nin resmî içkisi. Gümüş bir kupada bourbon, nane ve dağ gibi kırık buz; kupanın dışı buğulanır.", "The official drink of the Kentucky Derby: bourbon, mint and a mountain of crushed ice in a silver cup that frosts on the outside."),
    glass: "mug", color: "#d8a85a", ice: "crushed", garnish: "mint",
    recipe: [l("60 ml bourbon", "60 ml bourbon"), l("10 ml şeker şurubu", "10 ml simple syrup"), l("8–10 nane yaprağı", "8–10 mint leaves")],
    method: l("Naneyi şurupla hafifçe bastır, bourbon ve kırık buz ekle, kupa buğulanana dek karıştır.", "Press the mint gently in the syrup, add bourbon and crushed ice, stir until the cup frosts."), family: l("Old Fashioned ailesi", "Old Fashioned family"),
  },
  {
    id: "white-russian", name: l("White Russian", "White Russian"), year: "1965",
    origin: l("Brüksel'den doğan Black Russian'ın kremalı hâli", "The creamy turn of the Black Russian, born in Brussels"),
    story: l("Votka ve kahve likörünün üstüne süzülen krema. Bir film kahramanının elinden düşmeyince yeniden efsane oldu.", "Vodka and coffee liqueur under a float of cream; it became a legend again in the hand of a film's laid-back hero."),
    glass: "rocks", color: "#c9a07a", opaque: true, ice: "cube", garnish: "none",
    recipe: [l("50 ml votka", "50 ml vodka"), l("20 ml kahve likörü", "20 ml coffee liqueur"), l("30 ml krema", "30 ml cream")],
    method: l("Votka ve likörü buzun üstüne dök, kremayı kaşığın sırtından yavaşça ekle.", "Pour vodka and liqueur over ice, float the cream over the back of a spoon."), family: l("Flip ailesi", "Flip family"),
  },
  {
    id: "bellini", name: l("Bellini", "Bellini"), year: "1948",
    origin: l("Harry's Bar, Venedik", "Harry's Bar, Venice"),
    story: l("Giuseppe Cipriani, beyaz şeftali püresini Prosecco'yla buluşturdu; rengi ona ressam Bellini'nin bir tablosunu hatırlattı.", "Giuseppe Cipriani met white peach purée with Prosecco; the colour reminded him of a painting by Bellini."),
    glass: "flute", color: "#f3c9a4", opaque: true, ice: "none", garnish: "none",
    recipe: [l("50 ml beyaz şeftali püresi", "50 ml white peach purée"), l("100 ml Prosecco", "100 ml Prosecco")],
    method: l("Püreyi kadehe koy, soğuk Prosecco'yu yavaşça ekleyip bir kez karıştır.", "Put the purée in the glass, top slowly with cold Prosecco, stir once."), family: l("Highball ailesi", "Highball family"),
  },
  {
    id: "clover-club", name: l("Clover Club", "Clover Club"), year: "1896",
    origin: l("Bellevue-Stratford Oteli, Philadelphia", "Bellevue-Stratford Hotel, Philadelphia"),
    story: l("Philadelphia'lı yazar ve avukatların kulübünden kalma: ahududu, cin ve pembe bir köpük. Yüz yıl unutulup yeniden doğdu.", "From a club of Philadelphia writers and lawyers: raspberry, gin and a pink foam, forgotten for a century and born again."),
    glass: "coupe", color: "#e98aa0", opaque: true, ice: "none", garnish: "none",
    recipe: [l("45 ml London Dry cin", "45 ml London dry gin"), l("15 ml ahududu şurubu", "15 ml raspberry syrup"), l("15 ml limon suyu", "15 ml lemon juice"), l("1 yumurta akı", "1 egg white")],
    method: l("Önce buzsuz, sonra buzla çalkala, süz.", "Dry shake, then shake with ice and strain."), family: l("Daiquiri (Sour) ailesi", "Daiquiri (Sour) family"),
  },
  {
    id: "penicillin", name: l("Penicillin", "Penicillin"), year: "2005",
    origin: l("Milk & Honey, New York", "Milk & Honey, New York"),
    story: l("Sam Ross'un modern klasiği: harman viski, bal, zencefil ve limon; üstüne bir kaşık isli Islay viskisi.", "Sam Ross's modern classic: blended Scotch, honey, ginger and lemon, with a spoon of smoky Islay whisky on top."),
    glass: "rocks", color: "#e2b25c", ice: "sphere", garnish: "none",
    recipe: [l("50 ml harman İskoç viskisi", "50 ml blended Scotch"), l("20 ml bal-zencefil şurubu", "20 ml honey-ginger syrup"), l("20 ml limon suyu", "20 ml lemon juice"), l("7 ml isli Islay viskisi (üstüne)", "7 ml smoky Islay whisky (float)")],
    method: l("Çalkala, buzun üstüne süz, isli viskiyi kaşıkla üstüne yay.", "Shake, strain over ice, float the smoky whisky with a spoon."), family: l("Daiquiri (Sour) ailesi", "Daiquiri (Sour) family"),
  },
  {
    id: "paper-plane", name: l("Paper Plane", "Paper Plane"), year: "2008",
    origin: l("Chicago", "Chicago"),
    story: l("Dört eşit parça: bourbon, Aperol, Amaro Nonino ve limon. Adını bir şarkıdan alan, Last Word'ün modern torunu.", "Four equal parts: bourbon, Aperol, Amaro Nonino and lemon; named after a song, the Last Word's modern grandchild."),
    glass: "coupe", color: "#e69a4a", ice: "none", garnish: "none",
    recipe: [l("22 ml bourbon", "22 ml bourbon"), l("22 ml Aperol", "22 ml Aperol"), l("22 ml Amaro Nonino", "22 ml Amaro Nonino"), l("22 ml limon suyu", "22 ml lemon juice")],
    method: l("Buzla çalkala, soğutulmuş kadehe süz.", "Shake with ice, strain into a chilled glass."), family: l("Sidecar ailesi", "Sidecar family"),
  },
  {
    id: "dark-n-stormy", name: l("Dark 'n' Stormy", "Dark 'n' Stormy"), year: "1920'ler / 1920s",
    origin: l("Bermuda", "Bermuda"),
    story: l("Bermuda denizcilerinin içkisi: zencefil birasının üstünde fırtına bulutu gibi süzülen koyu rom.", "The Bermudan sailors' drink: dark rum hanging like a storm cloud over ginger beer."),
    glass: "highball", color: "#8a5a2c", ice: "cube", garnish: "lime-wheel",
    recipe: [l("60 ml koyu rom", "60 ml dark rum"), l("100 ml zencefil birası", "100 ml ginger beer"), l("10 ml misket limonu suyu", "10 ml lime juice")],
    method: l("Zencefil birasını buzun üstüne dök, romu en üste yavaşça ekle.", "Pour ginger beer over ice, float the rum on top."), family: l("Highball ailesi", "Highball family"),
  },
  {
    id: "brandy-alexander", name: l("Brandy Alexander", "Brandy Alexander"), year: "1922",
    origin: l("Londra", "London"),
    story: l("Bir kraliyet düğününe yazıldığı söylenen tatlı veda: konyak, kakao likörü ve krema, üstüne muskat.", "A sweet farewell said to have been written for a royal wedding: cognac, cacao liqueur and cream under grated nutmeg."),
    glass: "coupe", color: "#d9b894", opaque: true, ice: "none", garnish: "nutmeg",
    recipe: [l("30 ml konyak", "30 ml cognac"), l("30 ml koyu kakao likörü", "30 ml dark crème de cacao"), l("30 ml krema", "30 ml cream")],
    method: l("Buzla sertçe çalkala, süz, üstüne muskat rendele.", "Shake hard with ice, strain, grate nutmeg on top."), family: l("Flip ailesi", "Flip family"),
  },
];
