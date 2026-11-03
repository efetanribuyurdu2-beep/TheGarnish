/** The Cocktail Book in depth: the famous drinks written only for the book. */
import { l, v, type BookDetail } from "./bookDetailTypes";

export const EXTRAS: Record<string, BookDetail> = {
  cosmopolitan: {
    history: [
      l("1985'te Miami South Beach'te barmen Cheryl Cook, Martini kadehinde servis edilecek, göze güzel gelen pembe bir içki aradı: limonlu votka, triple sec, misket limonu ve bir dokunuş kızılcık. 1988'de New York'taki Odeon'da Toby Cecchini tarifi Absolut Citron, Cointreau, taze misket limonu ve kızılcık suyuyla yeniden kurdu; bugünkü standart onun hâlidir.",
        "In 1985 in Miami's South Beach, bartender Cheryl Cook wanted a pretty pink drink to serve in a Martini glass: citrus vodka, triple sec, lime and a splash of cranberry. In 1988 at the Odeon in New York, Toby Cecchini rebuilt it with Absolut Citron, Cointreau, fresh lime and cranberry juice; his version is today's standard."),
      l("Doksanlarda Madonna'nın elinde fotoğraflandı, 1998'den sonra 'Sex and the City' dizisinin dört kahramanıyla bir döneme adını verdi. Yapısı ise eskidir: Sidecar ailesinin votkalı, kızılcıklı bir torunu.",
        "In the nineties it was photographed in Madonna's hand, and after 1998 the four heroines of 'Sex and the City' made it the name of an era. Its structure, though, is old: a vodka-and-cranberry grandchild of the Sidecar family."),
    ],
    steps: [
      l("Martini kadehini soğut.", "Chill the Martini glass."),
      l("Shaker'a limonlu votka, Cointreau, misket limonu ve kızılcık suyunu koy.", "Put citrus vodka, Cointreau, lime and cranberry juice in the shaker."),
      l("Buzla 12 saniye sert çalkala.", "Shake hard with ice for 12 seconds."),
      l("Çift süz; portakal kabuğunu alevle (kibrit üstünde sıkarak) yakıp yağını püskürt.", "Double-strain; flame an orange peel (squeeze it over a match) to spray its oils."),
    ],
    why: l("Sidecar şablonu: içki, ekşi, portakal likörü. Kızılcık renk ve hafif tanenli bir ekşilik getirir, tatlılığı artırmaz; bu yüzden doğru yapılmış Cosmo şekerli değil, kuru ve meyvelidir. Alevlenmiş portakal kabuğu karamelli bir koku ekler.",
      "The Sidecar template: spirit, sour, orange liqueur. Cranberry brings colour and a lightly tannic tartness without adding sweetness, so a properly made Cosmo is not sugary but dry and fruity. A flamed orange peel adds a caramelised scent."),
    variations: [
      v("White Cosmo", "Kırmızı yerine beyaz kızılcık suyu: renksiz, daha hafif.", "White cranberry instead of red: clear and lighter."),
      v("Cheryl Cook hâli", "Rose's misket limonu kordiyaliyle, daha tatlı.", "With Rose's lime cordial, sweeter."),
    ],
    tip: l("Kızılcık suyunu sadece renk için kullan; 30 ml'yi geçerse içki meyve suyu gibi olur.", "Use cranberry only for colour; past 30 ml the drink tastes like juice."),
  },

  caipirinha: {
    history: [
      l("En yaygın anlatıya göre 1918'de São Paulo eyaletinde İspanyol gribine karşı içilen bir ev ilacından doğdu: cachaça, misket limonu, sarımsak ve bal. Sarımsak ve bal zamanla çıktı, şeker ve buz girdi. Adı 'caipira'nın, yani taşralı köylünün küçültmesidir: 'küçük köylü kız'.",
        "In the commonest account it was born in São Paulo state in 1918 from a home remedy against Spanish flu: cachaça, lime, garlic and honey. The garlic and honey dropped out over time, sugar and ice came in. Its name is a diminutive of 'caipira', a country person: 'little country girl'."),
      l("Brezilya'nın ulusal kokteylidir; 2003'te bir hükümet kararnamesi tarifin cachaça, misket limonu, şeker ve buzla yapılmasını tanımladı. Cachaça, şeker kamışı suyundan (melastan değil) damıtılır; romdan farkı buradadır.",
        "It is Brazil's national cocktail; a 2003 government decree defined it as cachaça, lime, sugar and ice. Cachaça is distilled from fresh sugar-cane juice (not molasses), which is what sets it apart from rum."),
    ],
    steps: [
      l("Yarım misket limonunun beyaz orta kısmını kes (acıdır), kalanı dört dilime böl.", "Cut the white pith out of half a lime (it is bitter) and cut the rest into four wedges."),
      l("Limonları ve şekeri rocks bardağına koyup bir ezici (muddler) ile sıkarak ez: kabuk yağları da çıksın.", "Put lime and sugar in a rocks glass and press with a muddler to release juice and peel oils."),
      l("Bardağı kırık buzla doldur, cachaça'yı ekle.", "Fill the glass with crushed ice and add the cachaça."),
      l("İyice karıştır; süzme, limon dilimleri bardakta kalır.", "Stir well; do not strain, the lime wedges stay in the glass."),
    ],
    why: l("Daiquiri ailesinden ama sıvı limon suyu yerine ezilmiş kabukla: kabuk yağları acımsı, yeşil bir koku ekler; şeker kristalleri limonu ezerken kabuğu çizip yağı serbest bırakır. Cachaça'nın taze kamış ve hafif toprak notaları da tadın bir parçasıdır.",
      "Daiquiri family, but with muddled peel instead of only juice: peel oils add a bitter-green aroma, and the sugar crystals scratch the peel as you press, releasing its oil. Cachaça's fresh cane and faintly earthy notes are part of the taste."),
    variations: [
      v("Caipiroska", "Votkayla.", "With vodka."),
      v("Caipifruta", "Mevsim meyveleriyle: çarkıfelek, çilek, kivi.", "With seasonal fruit: passion fruit, strawberry, kiwi."),
      v("Caipirissima", "Romla.", "With rum."),
    ],
    tip: l("Şurup yerine ince toz şeker kullan; şurup kabuğu çizemez, yağ çıkmaz.", "Use fine granulated sugar rather than syrup; syrup cannot scratch the peel, so no oil comes out."),
  },

  "bloody-mary": {
    history: [
      l("1921'de Paris'teki Harry's New York Bar'da Fernand 'Pete' Petiot'nun, şehre yeni gelen Rus göçmenlerin votkasını domates suyu konservesiyle karıştırarak yaptığı anlatılır. Petiot 1934'te New York'taki St. Regis Oteli'nin King Cole Bar'ına geçti ve tarifi baharatlandırdı: tuz, karabiber, limon, Worcestershire, acı sos.",
        "It is said that in 1921 at Harry's New York Bar in Paris, Fernand 'Pete' Petiot mixed vodka, newly brought by Russian émigrés, with canned tomato juice. In 1934 Petiot moved to the King Cole Bar at New York's St. Regis and spiced it up: salt, pepper, lemon, Worcestershire and hot sauce."),
      l("St. Regis adının kaba bulunması üzerine içkiyi bir süre 'Red Snapper' diye sattı. Komedyen George Jessel de 1939'da onu kendisinin icat ettiğini söylemiştir; belki de Petiot'nun ilk hâlini Amerika'da ilk tanıtan oydu.",
        "The St. Regis found the name coarse, so for a while he sold it as the 'Red Snapper'. The comedian George Jessel also claimed in 1939 to have invented it; perhaps he was the first to make Petiot's early version known in America."),
    ],
    steps: [
      l("Uzun bardağın kenarını kereviz tuzu ve karabiberle kapla.", "Rim a tall glass with celery salt and black pepper."),
      l("Shaker'a votka, domates suyu, limon, Worcestershire, acı sos, tuz ve taze çekilmiş karabiberi koy.", "Put vodka, tomato juice, lemon, Worcestershire, hot sauce, salt and freshly ground pepper in a shaker."),
      l("Buzla çalkalama; iki shaker arasında 5–6 kez yukarıdan aktararak karıştır (rolling): domates köpüklenmez.", "Do not shake; 'roll' it between two tins 5–6 times from a height: tomato should not froth."),
      l("Buzlu bardağa dök, kereviz sapı ve limon dilimiyle süsle.", "Pour over ice and garnish with a celery stalk and lemon wedge."),
    ],
    why: l("Bir kokteylden çok sıvı bir yemektir: domatesin umamisi, Worcestershire'ın hamsisi ve tuz damakta tuzlu-tatlı derinlik yaratır; limon ve acı sos onu canlandırır. Votka nötr olduğu için baharata yer bırakır. Aktararak karıştırmak, sert çalkalamanın yapacağı sulu köpüğü önler.",
      "It is more a liquid meal than a cocktail: tomato's umami, Worcestershire's anchovy and salt build savoury depth, and lemon and hot sauce enliven it. Vodka is neutral and leaves room for the spice. Rolling avoids the watery foam a hard shake would make."),
    variations: [
      v("Red Snapper", "Votka yerine cin.", "Gin instead of vodka."),
      v("Bloody Maria", "Tekila.", "Tequila."),
      v("Caesar", "Domates-istiridye suyu (Clamato): Kanada'nın ulusal içkisi, Calgary 1969.", "Tomato and clam juice (Clamato): Canada's national drink, Calgary 1969."),
    ],
    tip: l("Baharat karışımını bir gün önce hazırla; bekledikçe tatlar birleşir.", "Make the spice mix a day ahead; the flavours marry as they rest."),
  },

  "pisco-sour": {
    history: [
      l("Lima'da Morris' Bar'ı işleten Amerikalı Victor Vaughen Morris, 1920'lerde Whiskey Sour'u yerel üzüm brendisi pisco ile yapmaya başladı. Barmenlerinden Perulu Mario Bruiget tarife yumurta akını ve Angostura damlalarını ekledi; bugünkü Pisco Sour böyle doğdu.",
        "Victor Vaughen Morris, an American who ran Morris' Bar in Lima, began making the Whiskey Sour with the local grape brandy pisco in the 1920s. His bartender, the Peruvian Mario Bruiget, added egg white and drops of Angostura; today's Pisco Sour was born."),
      l("Peru ve Şili hem pisco'yu hem kokteyli sahiplenir; iki ülkenin tarifleri de farklıdır (Şili'deki daha çok limonlu ve yumurtasız olabilir). Peru'da şubatın ilk cumartesi 'Ulusal Pisco Sour Günü'dür.",
        "Peru and Chile both claim pisco and the cocktail, and their recipes differ (the Chilean one can be more lemony and without egg). In Peru, the first Saturday of February is 'National Pisco Sour Day'."),
    ],
    steps: [
      l("Shaker'a pisco, misket limonu, şeker şurubu ve yumurta akını koy.", "Put pisco, lime, syrup and egg white in the shaker."),
      l("Buzsuz 10 saniye çalkala, sonra buzla 12 saniye daha.", "Dry shake 10 seconds, then 12 more with ice."),
      l("Soğuk kadehe ince süzgeçten süz; köpüğün kalınlaşmasını bekle.", "Fine-strain into a cold glass and wait for the foam to thicken."),
      l("Köpüğün üstüne üç damla Angostura bırak; istersen kürdanla desen çiz.", "Place three drops of Angostura on the foam; draw a pattern with a toothpick if you like."),
    ],
    why: l("Pisco üzümden damıtılır ve fıçıda dinlendirilmez: çiçeksi, misket üzümü kokulu ve temizdir. Bu aroma misket limonunun asidiyle parlar, yumurta akı ise ipeksi bir köpük kurar. Angostura damlaları köpüğün üstünde koku ve bitişte hafif bir baharat bırakır.",
      "Pisco is distilled from grapes and never aged in wood: floral, muscat-scented and clean. That aroma shines with the lime's acid, while the egg white builds a silken foam. The Angostura drops leave scent on the foam and a little spice at the finish."),
    variations: [
      v("Chilcano", "Pisco, misket limonu ve zencefilli gazoz: Peru'nun highball'u.", "Pisco, lime and ginger ale: Peru's highball."),
      v("Şili usulü", "Pica limonu, yumurtasız.", "Pica lime, no egg."),
      v("Maracuyá Sour", "Çarkıfelek ile.", "With passion fruit."),
    ],
    tip: l("Perulu barmenler limonu yavaşça, kabuğu sıkmadan sıkar; kabuk yağı bu içkide acılık verir.", "Peruvian bartenders squeeze limes gently without pressing the peel; peel oil makes this drink bitter."),
  },

  "mint-julep": {
    history: [
      l("Julep kelimesi Farsça 'gülâb'dan (gül suyu) gelir; Arapça ve Latince üzerinden Avrupa'ya şekerli ilaçların adı olarak geçti. 1803'te bir İngiliz gezgin, Virginialıların sabahları 'içinde nane olan bir yudum alkollü içki' içtiğini yazdı: Mint Julep Amerika'nın en eski kokteyllerinden biridir.",
        "The word julep comes from the Persian 'golâb' (rose water), passing through Arabic and Latin into Europe as the name of sweetened medicines. In 1803 an English traveller wrote that Virginians drank 'a dram of spirituous liquor that has mint in it' in the mornings: the Mint Julep is one of America's oldest cocktails."),
      l("Başlangıçta konyakla ya da şeftali brendisiyle yapılıyordu; bourbon ancak sonra standart oldu. 1938'den beri Kentucky Derby'nin resmî içkisidir; yarış haftasında Churchill Downs'ta 120.000'e yakın julep içilir. Gümüş julep kupası buğulanarak içkiyi buz gibi tutar.",
        "It was first made with cognac or peach brandy; bourbon became the standard only later. It has been the official drink of the Kentucky Derby since 1938; nearly 120,000 juleps are drunk at Churchill Downs during Derby weekend. The silver julep cup frosts over and keeps the drink ice-cold."),
    ],
    steps: [
      l("Julep kupasına (ya da rocks bardağına) nane yapraklarını ve şurubu koy, yaprakları parçalamadan hafifçe bastır.", "Put mint leaves and syrup in a julep cup (or rocks glass) and press gently without tearing the leaves."),
      l("Bourbonu ekle ve kupayı ince kırık buzla yarıya kadar doldur.", "Add the bourbon and half-fill the cup with fine crushed ice."),
      l("Kupa buğulanana kadar bar kaşığıyla karıştır.", "Stir with a bar spoon until the cup frosts."),
      l("Üstünü bir buz tepesiyle tamamla; bol bir nane demetini kısa pipetin hemen yanına koy.", "Top with a dome of ice and set a big mint bouquet right beside a short straw."),
    ],
    why: l("Buz burada malzemedir: ince kırık buz bourbonu hızla soğutur ve seyreltir, güçlü bir içkiyi yaz öğleden sonrası içilebilir hâle getirir. Kokunun çoğu süs nanesinden gelir; pipet onun yanında olduğu için her yudumda burun naneye gömülür.",
      "Ice is an ingredient here: fine crushed ice chills and dilutes the bourbon fast, making a strong drink fit for a summer afternoon. Most of the aroma comes from the mint garnish; with the straw beside it, the nose dives into mint with every sip."),
    variations: [
      v("Brandy Julep", "Konyakla: on dokuzuncu yüzyıl hâli.", "With cognac: the nineteenth-century version."),
      v("Georgia Julep", "Konyak ve şeftali likörü.", "Cognac and peach liqueur."),
      v("Champagne Julep", "Üstü şampanya.", "Topped with Champagne."),
    ],
    tip: l("Nane demetini avucunda bir kez şaplat; yağlar uyanır ama yapraklar zarar görmez.", "Slap the mint bouquet once in your palm; the oils wake up without bruising the leaves."),
  },

  "white-russian": {
    history: [
      l("Önce Black Russian vardı: 1949'da Brüksel'deki Hotel Metropole'de barmen Gustave Tops, ABD'nin Lüksemburg büyükelçisi Perle Mesta için votka ve kahve likörünü karıştırdı. 'Rus' adı yalnızca votkadan gelir; içki ne Rus'tur ne de Rusya'da içilir.",
        "First came the Black Russian: in 1949 at the Hotel Metropole in Brussels, bartender Gustave Tops mixed vodka and coffee liqueur for Perle Mesta, the US ambassador to Luxembourg. The 'Russian' comes only from the vodka; the drink is not Russian and is not drunk in Russia."),
      l("Kremalı hâli 1960'larda Amerikan gazetelerinde Kahlúa reklamlarıyla yayıldı. 1998'de Coen kardeşlerin 'The Big Lebowski' filminde Dude onu 'Caucasian' diye sipariş edip film boyunca içince bir kült oldu.",
        "The creamy version spread through Kahlúa adverts in American newspapers in the 1960s. When the Dude ordered it as a 'Caucasian' and drank it all through the Coen brothers' 1998 film 'The Big Lebowski', it became a cult."),
    ],
    steps: [
      l("Rocks bardağını buzla doldur.", "Fill a rocks glass with ice."),
      l("Votka ve kahve likörünü ekle, karıştır.", "Add vodka and coffee liqueur and stir."),
      l("Kremayı hafifçe çırpıp (biraz kıvam alsın) bar kaşığının sırtından yavaşça üstüne yüzdür.", "Lightly whip the cream (just to thicken) and float it slowly over the back of a bar spoon."),
      l("Misafir dilerse karıştırsın; katmanlar güzelce karışırken iç.", "Let the guest stir if they wish; drink as the layers swirl together."),
    ],
    why: l("Kahve likörünün tatlılığı ve kavrulmuş acılığı kremanın yağıyla yuvarlanır; votka gövdeye alkol ekler ama tadı değiştirmez. Hafif çırpılmış krema yüzeyde kalır ve her yudumda önce yumuşak, sonra kahveli bir tat verir.",
      "Coffee liqueur's sweetness and roasted bitterness are rounded by the fat of the cream, and vodka adds alcohol without changing the taste. Lightly whipped cream stays on top, so each sip is soft first, then coffee."),
    variations: [
      v("Black Russian", "Kremasız.", "Without the cream."),
      v("Colorado Bulldog", "Üstüne kola.", "Topped with cola."),
      v("Espresso White Russian", "Bir shot espressoyla.", "With a shot of espresso."),
    ],
    tip: l("Krema çok sıvı olursa dibe çöker: 20 saniye çırpmak katmanı ayakta tutar.", "If the cream is too thin it sinks: 20 seconds of whisking keeps the layer afloat."),
  },

  bellini: {
    history: [
      l("1948'de Venedik'teki Harry's Bar'ın kurucusu Giuseppe Cipriani tarafından yaratıldı. Şeftali püresinin pembe-beyaz rengi ona Rönesans ressamı Giovanni Bellini'nin bir tablosundaki azizin cüppesini hatırlattı ve içkiye ressamın adını verdi.",
        "It was created in 1948 by Giuseppe Cipriani, founder of Harry's Bar in Venice. The pinkish-white colour of the peach purée reminded him of a saint's robe in a painting by the Renaissance painter Giovanni Bellini, and he named the drink after him."),
      l("Başlangıçta yalnızca beyaz şeftalinin olduğu yaz aylarında yapılıyordu. Harry's Bar'ın müdavimleri arasında Hemingway, Orson Welles ve Truman Capote vardı; Bellini onlar sayesinde dünyaya yayıldı.",
        "At first it was made only in summer, when white peaches were in season. Harry's Bar's regulars included Hemingway, Orson Welles and Truman Capote, and through them the Bellini went round the world."),
    ],
    steps: [
      l("Olgun beyaz şeftalileri kabuğuyla rendele ya da püre yap, ince süzgeçten geçir; birkaç damla limon renk kararmasın diye.", "Grate or purée ripe white peaches with their skin and pass through a fine sieve; a few drops of lemon keep the colour from browning."),
      l("Püreyi ve kadehi buzdolabında soğut.", "Chill the purée and the glass."),
      l("Kadehe püreyi koy, prosecco'yu yavaşça ekle ve hafifçe bir kez karıştır.", "Put the purée in the glass, add prosecco slowly and stir once, gently."),
    ],
    why: l("Beyaz şeftalinin yumuşak, çiçeksi tatlılığı prosecco'nun meyvesi ve hafif asidiyle aynı dili konuşur. Püre ağır olduğu için önce kadehe konur; köpüklü yavaşça eklenirse kabarcıklar onu kendiliğinden karıştırır, sert karıştırma köpüğü öldürür.",
      "White peach's soft, floral sweetness speaks the same language as prosecco's fruit and gentle acidity. The purée is heavy, so it goes in first; added slowly, the sparkling wine mixes it with its bubbles, while hard stirring would kill the fizz."),
    variations: [
      v("Rossini", "Çilek püresiyle.", "With strawberry purée."),
      v("Tintoretto", "Nar suyuyla.", "With pomegranate juice."),
      v("Puccini", "Mandalina suyuyla.", "With mandarin juice."),
    ],
    tip: l("Beyaz şeftali bulamıyorsan sarı şeftaliyi bir parça ahududu ile renklendir; Harry's Bar da kışın bunu yapar.", "If you cannot find white peaches, tint yellow ones with a little raspberry; Harry's Bar does the same in winter."),
  },

  "clover-club": {
    history: [
      l("Adını 1882'den 1910'lara kadar Philadelphia'daki Bellevue-Stratford Oteli'nde toplanan yazar, avukat ve gazetecilerin centilmenler kulübü Clover Club'dan alır. Kulübün yemekleri uzun ve nüktedan konuşmalarla ünlüydü; içki o masaların klasiği oldu.",
        "It takes its name from the Clover Club, a gentlemen's club of writers, lawyers and journalists who met at Philadelphia's Bellevue-Stratford Hotel from 1882 into the 1910s. Its dinners were famous for long, witty speeches, and the drink became a classic of those tables."),
      l("Yasak'tan sonra 'pembe kadın içkisi' diye küçümsenip unutuldu. 2008'de barmen Julie Reiner Brooklyn'deki barına bu adı verip tarifi canlandırınca modern klasiklerin arasına geri döndü.",
        "After Prohibition it was belittled as a 'pink ladies' drink' and forgotten. When the bartender Julie Reiner named her Brooklyn bar after it in 2008 and revived the recipe, it returned to the modern classics."),
    ],
    steps: [
      l("Shaker'a cin, ahududu şurubu, limon ve yumurta akını koy.", "Put gin, raspberry syrup, lemon and egg white in the shaker."),
      l("Buzsuz 10 saniye çalkala, buzla 12 saniye daha.", "Dry shake 10 seconds, then 12 more with ice."),
      l("Soğuk coupe'a çift süz.", "Double-strain into a cold coupe."),
      l("Bir ahududu ile süsle.", "Garnish with a raspberry."),
    ],
    why: l("Cinli bir ekşinin ahududuyla tatlandırılmış hâli: ahududunun hafif asidi ve çiçeksi kokusu cinin ardıcına yakışır. Yumurta akı pembe, kadifemsi bir köpük kurar; tat şekerli değil, meyveli ve kurudur.",
      "A gin sour sweetened with raspberry: raspberry's mild acidity and floral scent suit gin's juniper. The egg white builds a pink, velvety foam; the taste is fruity and dry, not sugary."),
    variations: [
      v("Julie Reiner hâli", "Biraz kuru vermut eklenmiş: daha derin.", "With a little dry vermouth: deeper."),
      v("Pink Lady", "Grenadin ve applejack: kardeşi.", "Grenadine and applejack: the sister."),
    ],
    tip: l("Ahududu şurubunu taze meyve ve şekerle yap; yapay ahududu aroması bu içkide hemen belli olur.", "Make the raspberry syrup from fresh fruit and sugar; artificial raspberry flavour shows at once in this drink."),
  },

  penicillin: {
    history: [
      l("2005'te New York'taki Milk & Honey'de Avustralyalı barmen Sam Ross, Compass Box viskileriyle denemeler yaparken yarattı: harman İskoç viskisi, limon, bal-zencefil şurubu ve üstüne bir parça isli Islay viskisi. Adı, içkinin şifalı, boğaz yumuşatan bir ilaç gibi tadından gelir.",
        "It was created in 2005 at New York's Milk & Honey by the Australian bartender Sam Ross, experimenting with Compass Box whiskies: blended Scotch, lemon, honey-ginger syrup and a float of smoky Islay whisky. The name comes from its taste of a healing, throat-soothing remedy."),
      l("Yirmi birinci yüzyılın en çok kopyalanan 'modern klasiği' oldu; dünyanın her yerindeki barlarda menüde 'Penicillin' adıyla bulunabilir. Ross'un aynı dönemin diğer klasiği Paper Plane'dir.",
        "It became the most copied 'modern classic' of this century; bars all over the world list it as the 'Penicillin'. Ross's other classic of the same period is the Paper Plane."),
    ],
    steps: [
      l("Bal-zencefil şurubu: eşit bal ve sıcak su, içine taze rendelenmiş zencefil; süz ve soğut.", "Honey-ginger syrup: equal honey and hot water with freshly grated ginger; strain and cool."),
      l("Shaker'a harman İskoç viskisi, limon ve şurubu koy, buzla çalkala.", "Shake blended Scotch, lemon and syrup with ice."),
      l("Büyük buzlu rocks bardağına süz.", "Strain into a rocks glass over a big cube."),
      l("Islay viskisini bar kaşığının sırtından yavaşça üste yüzdür; karıştırma.", "Float the Islay whisky gently over the back of a bar spoon; do not stir."),
      l("Şekerlenmiş zencefil ile süsle.", "Garnish with candied ginger."),
    ],
    why: l("Bir viski ekşisi, ama iki katlı: altta bal ve zencefilin sıcaklığı, limonun ferahlığı; üstte isli Islay viskisinin turba kokusu. Duman yüzeyde kaldığı için önce burna gelir, damakta ise yumuşak bir harman viski vardır: koku ve tat ayrı katmanlarda yaşanır.",
      "A whisky sour on two floors: below, the warmth of honey and ginger and the freshness of lemon; above, the peat smoke of Islay whisky. Because the smoke stays on the surface it reaches the nose first, while the palate finds a soft blended whisky: aroma and taste live on separate layers."),
    variations: [
      v("Gold Rush", "Bourbon, bal ve limon: zencefilsiz ve dumansız atası.", "Bourbon, honey and lemon: the ancestor without ginger or smoke."),
      v("Mezcal Penicillin", "Islay yerine mezcal: agave dumanı.", "Mezcal instead of Islay: agave smoke."),
    ],
    tip: l("Zencefili taze rendele ve sıkarak suyunu al; zencefil tozu bu içkiyi bulanık ve tatsız yapar.", "Grate fresh ginger and press out its juice; ground ginger makes this drink muddy and dull."),
  },

  "paper-plane": {
    history: [
      l("Sam Ross'un 2007–2008'de Chicago'daki The Violet Hour'ın yaz menüsü için yarattığı içkidir; adını o yaz durmadan dinlediği M.I.A.'nın 'Paper Planes' şarkısından alır. İlk tarifte Aperol yerine Campari vardı; Ross daha sonra Aperol'e geçti ve içki hafifledi.",
        "Sam Ross created it in 2007–2008 for the summer menu of The Violet Hour in Chicago, naming it after M.I.A.'s 'Paper Planes', which he played on repeat that summer. The first version used Campari instead of Aperol; Ross later switched to Aperol and the drink grew lighter."),
      l("Last Word'ün 'dört eşit parça' formülünün modern bir yorumudur ve on yılda dünya barlarının yeni klasikleri arasına girdi.",
        "It is a modern reading of the Last Word's 'four equal parts' formula, and within a decade it joined the new classics of the world's bars."),
    ],
    steps: [
      l("Shaker'a dört malzemeyi eşit ölçüyle koy: bourbon, Aperol, Amaro Nonino, limon.", "Put all four ingredients in equal measure in the shaker: bourbon, Aperol, Amaro Nonino, lemon."),
      l("Buzla 12 saniye çalkala.", "Shake with ice for 12 seconds."),
      l("Soğuk coupe'a çift süz.", "Double-strain into a cold coupe."),
      l("İstersen kenara küçük bir kâğıt uçak tak.", "Clip a little paper plane to the rim if you like."),
    ],
    why: l("Aperol'ün portakallı acısı ve Amaro Nonino'nun karamel ve otlu tatlılığı birbirini tamamlar; bourbon vanilyalı bir omurga verir, limon her şeyi aydınlatır. Eşit oranlar sayesinde hiçbir ses baskın değildir: tatlı, acı, ekşi ve sıcak aynı anda.",
      "Aperol's orange bitterness and Amaro Nonino's caramel-herbal sweetness complete each other; bourbon gives a vanilla backbone and lemon lights everything up. With equal parts no voice dominates: sweet, bitter, sour and warm all at once."),
    variations: [
      v("İlk hâli", "Campari ile: daha acı ve koyu.", "With Campari: more bitter and darker."),
      v("Naked & Famous", "Mezcal ve sarı Chartreuse: Paper Plane'in dumanlı kuzeni.", "Mezcal and yellow Chartreuse: the Paper Plane's smoky cousin."),
    ],
    tip: l("Amaro Nonino bulamazsan Averna ya da Montenegro kullan; içki biraz değişir ama yapısı ayakta kalır.", "If you cannot find Amaro Nonino, use Averna or Montenegro; the drink changes a little but its structure holds."),
  },

  "dark-n-stormy": {
    history: [
      l("Birinci Dünya Savaşı'ndan sonra Bermuda'da İngiliz Kraliyet Donanması subaylarının kendi zencefil birasını Gosling's Black Seal romuyla karıştırmasından doğduğu anlatılır. Adını bir denizcinin şu sözünden aldığı söylenir: 'Bu, ancak bir delinin ya da ölünün altında yelken açacağı bir bulutun rengi.'",
        "It is said to have been born in Bermuda after the First World War, when Royal Navy officers mixed their own ginger beer with Gosling's Black Seal rum. Its name supposedly comes from a sailor's remark: 'the colour of a cloud only a fool or a dead man would sail under.'"),
      l("Gosling's 'Dark 'n Stormy' adının ticari markasına sahiptir; resmî tarif yalnızca Gosling's romu ve zencefil birasıyla yapılabilir. Bermuda'nın ulusal içkisidir ve yelken yarışlarının vazgeçilmezidir.",
        "Gosling's owns the trademark 'Dark 'n Stormy'; the official recipe may only be made with Gosling's rum and ginger beer. It is Bermuda's national drink and a fixture of sailing regattas."),
    ],
    steps: [
      l("Uzun bardağı buzla doldur.", "Fill a tall glass with ice."),
      l("Zencefil birasını ve misket limonunu ekle.", "Add ginger beer and lime."),
      l("Koyu romu en son, bar kaşığının sırtından yüzdür: üstte koyu bir 'fırtına bulutu' oluşsun.", "Float the dark rum last, over the back of a bar spoon, so a dark 'storm cloud' forms on top."),
      l("Misket limonu dilimiyle servis et; karıştırmak misafire kalsın.", "Serve with a lime wedge and leave the stirring to the guest."),
    ],
    why: l("Koyu romun pekmez, muz ve karamel notaları, zencefil birasının acısıyla buluşur; misket limonu ikisini birbirine bağlar. Rom ağır olmadığı ve en son eklendiği için üstte kalır: hem görüntüyü hem ilk yudumun yoğunluğunu verir.",
      "Dark rum's molasses, banana and caramel meet the heat of the ginger beer, and lime ties them together. Floated last, the rum stays on top: it makes both the look and the intensity of the first sip."),
    variations: [
      v("Moscow Mule", "Votkayla, bakır kupada.", "With vodka, in a copper mug."),
      v("Safe Harbour", "Koyu rom yerine baharatlı rom.", "Spiced rum instead of dark rum."),
    ],
    tip: l("Zencefil birasını sert ve az şekerli seç; tatlı bir ginger ale içkiyi düzleştirir.", "Choose a fiery, low-sugar ginger beer; a sweet ginger ale flattens the drink."),
  },

  "brandy-alexander": {
    history: [
      l("Atası Alexander'dır: 1915 civarında New York'taki Rector's restoranında barmen Troy Alexander'ın, demiryolu şirketi reklamlarının bembeyaz giyinen kahramanı 'Phoebe Snow' anısına yaptığı, cin, kakao likörü ve kremadan oluşan beyaz içki.",
        "Its ancestor is the Alexander: a white drink of gin, crème de cacao and cream that bartender Troy Alexander made around 1915 at Rector's in New York, in honour of 'Phoebe Snow', the all-white heroine of a railroad's advertising."),
      l("Cin yerine konyak kullanılan hâli 1920'lerde Londra'da popüler oldu; Prenses Mary'nin 1922'deki düğünü için yapıldığı da anlatılır. Yüzyılın ortasında bir akşam yemeği sonrası 'tatlı içki'si olarak klasikleşti; John Lennon'un bir dönem en sevdiği içkiydi.",
        "The version with cognac instead of gin grew popular in London in the 1920s; it is also said to have been made for Princess Mary's wedding in 1922. By mid-century it was the classic after-dinner 'dessert drink'; it was for a time John Lennon's favourite."),
    ],
    steps: [
      l("Coupe'u soğut.", "Chill the coupe."),
      l("Shaker'a konyak, koyu kakao likörü ve kremayı eşit koy.", "Put cognac, dark crème de cacao and cream in equal parts in the shaker."),
      l("Buzla 15 saniye sert çalkala: krema havalanır.", "Shake hard with ice for 15 seconds so the cream aerates."),
      l("Çift süz, üstüne taze muskat rendele.", "Double-strain and grate fresh nutmeg on top."),
    ],
    why: l("Kremanın yağı konyağın alkolünü yumuşatır, kakao likörü tatlılığı ve çikolata kokusunu taşır. Sert çalkalama kremayı köpüklü ve hafif yapar; muskat sıcak bir koku katarak tatlılığı dengeler. Bir tatlı ile bir içki arasında durur.",
      "The fat in the cream softens the cognac's alcohol, and crème de cacao carries sweetness and chocolate aroma. A hard shake makes the cream frothy and light, and nutmeg adds a warm scent that balances the sweetness. It sits between a dessert and a drink."),
    variations: [
      v("Alexander", "Cinle: orijinali.", "With gin: the original."),
      v("Grasshopper", "Nane likörü ve beyaz kakao likörü: yeşil kuzeni, New Orleans.", "Crème de menthe and white crème de cacao: the green cousin, New Orleans."),
      v("Brandy Alexander Frappé", "Dondurmayla blenderdan.", "Blended with ice cream."),
    ],
    tip: l("Kremayı yoğun (en az %30 yağlı) seç; hafif krema çalkalanınca sulanır.", "Choose heavy cream (at least 30% fat); light cream turns watery when shaken."),
  },
};
