/** The Cocktail Book in depth: tiki, wine and highball, alcohol-free classics. */
import { l, v, type BookDetail } from "./bookDetailTypes";

export const ISLANDS: Record<string, BookDetail> = {
  "mai-tai": {
    history: [
      l("1944'te Oakland'daki restoranında Victor 'Trader Vic' Bergeron, Tahitili dostları için 17 yıllık bir Jamaika romu (J. Wray & Nephew), misket limonu, portakal curaçaosu, orgeat ve şeker kamışı şurubunu karıştırdı. Biri tadınca Tahitice 'Maita'i roa ae!', 'Dünya dışı, en iyisi!' diye bağırdı.",
        "In 1944 at his Oakland restaurant, Victor 'Trader Vic' Bergeron mixed a 17-year-old Jamaican rum (J. Wray & Nephew), lime, orange curaçao, orgeat and rock candy syrup for Tahitian friends. One of them tasted it and cried in Tahitian 'Maita'i roa ae!', 'Out of this world, the best!'"),
      l("Rakibi Don the Beachcomber, 1933'teki Q.B. Cooler'ın asıl Mai Tai olduğunu iddia etti; tarifler çok farklı olduğu için tarihçiler çoğunlukla Vic'i haklı bulur. 1950'lerde Hawaii otelleri onu ananas suyu ve kırmızı şurupla tatlı bir turist içkisine çevirdi; gerçek Mai Tai'de meyve suyu yoktur.",
        "His rival Don the Beachcomber claimed his 1933 Q.B. Cooler was the real Mai Tai; the recipes differ so much that historians mostly side with Vic. In the 1950s Hawaiian hotels turned it into a sweet tourist drink with pineapple juice and red syrup; a true Mai Tai has no fruit juice besides lime."),
    ],
    steps: [
      l("Shaker'a aged rom, misket limonu, portakal likörü, orgeat ve biraz şurup koy.", "Put aged rum, lime, orange liqueur, orgeat and a little syrup in the shaker."),
      l("Kırık buzla kısaca çalkala.", "Shake briefly with crushed ice."),
      l("Süzmeden, buzuyla birlikte rocks bardağına boşalt; üste biraz daha kırık buz koy.", "Dump it unstrained, ice and all, into a rocks glass and top with more crushed ice."),
      l("Sıkılmış misket limonu kabuğunun yarısını 'ada' gibi yüzdür, yanına bir nane demeti 'palmiye' koy.", "Float half a spent lime shell like an 'island' and set a mint sprig beside it as a 'palm'."),
    ],
    why: l("Bir rom Sidecar'ıdır: rom, ekşi ve portakal likörü; orgeat ise badem ve portakal çiçeğiyle kadifemsi bir doku ve 'tropik' kokuyu getirir. Yaşlı romun melası ve meşesi, misket limonunun asidine karşı ağırlık yapar; nane her yudumda buruna gelir.",
      "It is a rum Sidecar: rum, sour and orange liqueur; orgeat brings almond and orange blossom, a velvet texture and the 'tropical' scent. Aged rum's molasses and oak give weight against the lime's acid, and the mint meets the nose with every sip."),
    variations: [
      v("1944 hâli", "Tek bir yaşlı Jamaika romu; bugün çoğu bar Jamaika ve Martinik romunu karıştırır.", "A single aged Jamaican rum; today most bars blend Jamaican and Martinique rum."),
      v("Royal Hawaiian Mai Tai", "Ananas ve portakal suyuyla: 1953'ün otel hâli.", "With pineapple and orange juice: the 1953 hotel version."),
    ],
    tip: l("Orgeat'ı iyi seç: gerçek bademden yapılmış, portakal çiçeği suyuyla kokulandırılmış olmalı; yapay badem aroması Mai Tai'yi bozar.", "Choose your orgeat well: it should be made from real almonds and scented with orange-flower water; artificial almond flavour ruins a Mai Tai."),
  },

  "pina-colada": {
    history: [
      l("Porto Riko'nun ulusal içkisidir (1978'den beri). 1954'te Ramón López Irizarry'nin hindistan cevizi kreması Coco López'i piyasaya sürmesi her şeyi mümkün kıldı. Aynı yıl San Juan'daki Caribe Hilton'un Beachcomber Bar'ında Ramón 'Monchito' Marrero'nun bugünkü tarifi yarattığı anlatılır.",
        "It has been Puerto Rico's national drink since 1978. Everything became possible in 1954, when Ramón López Irizarry launched Coco López, a cream of coconut. The same year, at the Caribe Hilton's Beachcomber Bar in San Juan, Ramón 'Monchito' Marrero is said to have created today's recipe."),
      l("Eski San Juan'daki Barrachina restoranı ise 1963'te barmenleri Ramón Portas Mingot'un icat ettiğini söyler. 'Piña colada' İspanyolca 'süzülmüş ananas' demektir; daha önceleri sadece süzülmüş ananas suyunun adıydı.",
        "The Barrachina restaurant in Old San Juan says its bartender Ramón Portas Mingot invented it in 1963. 'Piña colada' is Spanish for 'strained pineapple'; earlier it was simply the name of strained pineapple juice."),
    ],
    steps: [
      l("Blender'a beyaz rom, hindistan cevizi kreması, ananas suyu ve biraz misket limonu koy.", "Put white rum, cream of coconut, pineapple juice and a little lime in the blender."),
      l("Bir avuç kırık buz ekleyip pürüzsüz olana kadar 15 saniye çek.", "Add a scoop of crushed ice and blend for 15 seconds until smooth."),
      l("Hindistan cevizi kabuğuna ya da büyük bir kadehe dök.", "Pour into a coconut shell or a large glass."),
      l("Ananas yaprağı ve dilimiyle süsle.", "Garnish with a pineapple leaf and wedge."),
    ],
    why: l("Hindistan cevizi kremasının yağı ve şekeri, ananasın asidiyle birleşip dondurma gibi kremsi bir doku verir; misket limonu tatlılığı keser ve tadı aydınlatır. Blender çok su kattığı için tarif güçlü ve tatlı kurulur; buz eridikçe dengelenir.",
      "The fat and sugar of cream of coconut join pineapple's acid in a texture creamy as ice cream; lime cuts the sweetness and brightens the taste. The blender adds a lot of water, so the recipe is built strong and sweet and balances as the ice melts."),
    variations: [
      v("Çalkalanmış hâli", "Blendersız, kırık buzla çalkala: daha yoğun.", "Shaken with crushed ice instead of blended: more intense."),
      v("Painkiller", "Koyu rom, portakal ve muskat: Virjin Adaları'nın kuzeni.", "Dark rum, orange and nutmeg: the Virgin Islands cousin."),
      v("Virgin Colada", "Romsuz.", "Without rum."),
    ],
    tip: l("Hindistan cevizi sütü değil, şekerli hindistan cevizi kreması (cream of coconut) kullan; süt içkiyi sulu ve tatsız bırakır.", "Use sweetened cream of coconut, not coconut milk; milk leaves the drink thin and flat."),
  },

  zombie: {
    history: [
      l("1934'te Hollywood'daki Don the Beachcomber barında Donn Beach (Ernest Gantt), sabaha karşı ağır bir iş toplantısına gidecek olan akşamdan kalma bir müşteri için yaptı. Adam birkaç gün sonra döndüğünde, içkinin onu 'bir zombi gibi' yaptığını söyledi.",
        "In 1934, at Don the Beachcomber's bar in Hollywood, Donn Beach (Ernest Gantt) made it for a hungover customer facing an important business meeting. When the man came back a few days later, he said the drink had turned him into 'a zombie'."),
      l("Don, kişi başı iki Zombie kuralı koydu. Tarifini kodlarla saklıyordu ('Don's Mix' gibi); tiki tarihçisi Jeff 'Beachbum' Berry 2007'de barmen defterlerinden 1934 tarifini çözdü: üç rom, misket limonu, greyfurtla tarçın şurubu, falernum, grenadin, Pernod ve bitter.",
        "Don set a limit of two Zombies per customer. He kept his recipes in code ('Don's Mix' and the like); in 2007 the tiki historian Jeff 'Beachbum' Berry decoded the 1934 recipe from a bartender's notebook: three rums, lime, grapefruit with cinnamon syrup, falernum, grenadine, Pernod and bitters."),
    ],
    steps: [
      l("Shaker'a romları, misket limonu, greyfurt, falernum, grenadin ve bir damla absenti koy.", "Put the rums, lime, grapefruit, falernum, grenadine and a drop of absinthe in the shaker."),
      l("Bir avuç kırık buzla 5 saniye çalkala (ya da blenderda kısa çek).", "Shake for 5 seconds with a scoop of crushed ice (or flash-blend)."),
      l("Kırık buzla dolu tiki kupasına boşalt.", "Pour into a tiki mug full of crushed ice."),
      l("Bol nane ile süsle; kişi başı iki kadehi geçme.", "Garnish with lots of mint; do not go beyond two per person."),
    ],
    why: l("Tiki'nin özü: birden fazla romu katmanlamak. Hafif rom ferahlık, koyu rom pekmez ve muz, güçlü rom ateş getirir. Falernum'un karanfil-zencefili, greyfurtun acısı ve anasonun birkaç damlası bu ağırlığı aydınlatır; tadı tatlı olduğu için gücü gizlenir, işte tehlikesi bu.",
      "The essence of tiki: layering several rums. Light rum brings freshness, dark rum molasses and banana, overproof the fire. Falernum's clove and ginger, grapefruit's bitterness and a few drops of anise brighten the weight; it tastes sweet, so its strength is hidden, and that is its danger."),
    variations: [
      v("1934 hâli", "Jamaika, Porto Riko ve 151 proof Demerara romu.", "Jamaican, Puerto Rican and 151-proof Demerara rum."),
      v("1950 hâli", "Don'un daha sonra sadeleştirdiği tarif.", "The recipe Don later simplified."),
    ],
    tip: l("Overproof romla yapıyorsan ölçüyü aşma; kırık buz içkiyi tatlı ve masum gösterir.", "If you use overproof rum, do not exceed the measure; crushed ice makes it taste sweet and innocent."),
  },

  "jungle-bird": {
    history: [
      l("1973'te Kuala Lumpur Hilton'un Aviary Bar'ında, otelin karşılama içkisi olarak doğdu. İçecek müdürü Jeffrey Ong'a (Ong Swee Teik) atfedilir; adını, barın camından görülen, havuz kenarındaki filelerle çevrili kuşlardan alır.",
        "It was born in 1973 at the Aviary Bar of the Kuala Lumpur Hilton as the hotel's welcome drink. It is credited to the beverage manager Jeffrey Ong (Ong Swee Teik) and named after the netted birds by the pool, visible through the bar's glass."),
      l("1989'da John Poister'in 'The New American Bartender's Guide' kitabına girdi ve unutuldu; 2000'lerde New York'ta Giuseppe González gibi barmenler onu koyu Jamaika romuyla yeniden kurunca tiki'nin en sevilen 'acı' içkisi oldu. 2024'te IBA'nın resmî kokteyller listesine girdi.",
        "It entered John Poister's 'The New American Bartender's Guide' in 1989 and was forgotten; when New York bartenders like Giuseppe González rebuilt it with dark Jamaican rum in the 2000s, it became tiki's favourite 'bitter' drink. In 2024 it joined the IBA's official cocktail list."),
    ],
    steps: [
      l("Shaker'a koyu rom, Campari, ananas suyu, misket limonu ve demerara şurubunu koy.", "Put dark rum, Campari, pineapple juice, lime and demerara syrup in the shaker."),
      l("Buzla 12 saniye çalkala; ananas köpürsün.", "Shake with ice for 12 seconds so the pineapple foams."),
      l("Taze buzlu rocks bardağına süz.", "Strain into a rocks glass over fresh ice."),
      l("Ananas yaprağı ya da dilimiyle süsle.", "Garnish with a pineapple leaf or wedge."),
    ],
    why: l("Campari tiki'ye nadiren girer, ama burada ananasın tatlılığını keser ve koyu romun pekmezine bitter bir zarafet katar. Ananas köpüğü acıyı yumuşatır; sonuç tatlı-acı, meyveli ve şaşırtıcı biçimde yetişkin bir tiki içkisidir.",
      "Campari rarely enters tiki, but here it cuts pineapple's sweetness and adds a bitter elegance to the molasses of dark rum. Pineapple foam softens the bitterness; the result is bittersweet, fruity and surprisingly grown-up for tiki."),
    variations: [
      v("1973 hâli", "Daha fazla ananas, daha az Campari: hafif bir karşılama içkisi.", "More pineapple, less Campari: a light welcome drink."),
      v("Jungle Bird (González)", "Blackstrap rom: daha koyu ve acı.", "Blackstrap rum: darker and more bitter."),
    ],
    tip: l("Blackstrap ya da koyu Jamaika romu kullan; hafif rom Campari'nin altında kaybolur.", "Use blackstrap or dark Jamaican rum; light rum disappears under the Campari."),
  },

  painkiller: {
    history: [
      l("1970'lerde Britanya Virjin Adaları'ndaki Jost Van Dyke adasında, iskelesi olmayan, müşterilerin yüzerek ulaştığı Soggy Dollar Bar'da Daphne Henderson tarafından yaratıldı. Adı, ıslak dolarlarla ödeme yapan yüzücülerden gelir.",
        "It was created in the 1970s by Daphne Henderson at the Soggy Dollar Bar on Jost Van Dyke in the British Virgin Islands, a bar with no dock that customers reached by swimming. The name comes from swimmers paying with wet dollars."),
      l("Pusser's romunun sahibi Charles Tobias tarifi öğrenip 1980'lerde içkinin adını tescil ettirdi; tarifi o zamandan beri Pusser's'la anılır. İngiliz Donanması'nın 1970'e kadar tayfaya verdiği romun mirasçısı olan Pusser's'ın koyu, pekmezli tadı içkinin temelidir.",
        "Charles Tobias, owner of Pusser's rum, learned the recipe and trademarked the drink's name in the 1980s; it has been tied to Pusser's ever since. The dark, molasses-rich taste of Pusser's, heir to the rum the Royal Navy issued to sailors until 1970, is the drink's foundation."),
    ],
    steps: [
      l("Shaker'a koyu rom, ananas suyu, portakal suyu ve hindistan cevizi kremasını koy.", "Put dark rum, pineapple juice, orange juice and cream of coconut in the shaker."),
      l("Buzla 12 saniye çalkala.", "Shake with ice for 12 seconds."),
      l("Kırık buzla dolu bardağa (ya da ananasa) süz.", "Strain into a glass (or a pineapple) full of crushed ice."),
      l("Üstüne bolca taze rendelenmiş muskat serp.", "Grate plenty of fresh nutmeg on top."),
    ],
    why: l("Piña Colada'nın kuzenidir ama koyu rom ve portakal onu daha derin ve az tatlı yapar. Taze muskat yalnızca süs değildir: sıcak, odunsu kokusu hindistan cevizinin kremasını dengeler ve her yudumda ilk kokuyu verir.",
      "It is cousin to the Piña Colada, but dark rum and orange make it deeper and less sweet. Fresh nutmeg is not just garnish: its warm, woody scent balances the coconut cream and gives the first aroma of every sip."),
    variations: [
      v("Painkiller No. 2, 3, 4", "Pusser's barlarında romun gücüne göre numaralanır: ne kadar rom, o kadar numara.", "At Pusser's bars it is numbered by the amount of rum: the more rum, the higher the number."),
      v("Virgin Painkiller", "Romsuz.", "Without rum."),
    ],
    tip: l("Muskatı bütün alıp rendeleyerek kullan; hazır toz muskatın kokusu çabuk kaybolur.", "Buy whole nutmeg and grate it; pre-ground nutmeg loses its scent quickly."),
  },

  "kir-royal": {
    history: [
      l("Kir, Dijon'un İkinci Dünya Savaşı sonrası belediye başkanı rahip Félix Kir'in adını taşır. Burgonya'nın beyaz Aligoté şarabını bölgenin kuşüzümü likörü crème de cassis ile karıştıran 'blanc-cassis' geleneğini resmî davetlerde sunarak iki yerel ürünü birden tanıttı.",
        "The Kir is named after Canon Félix Kir, the priest who was mayor of Dijon after the Second World War. By serving 'blanc-cassis', Burgundy's white Aligoté wine with the region's blackcurrant liqueur, at official receptions, he promoted two local products at once."),
      l("Aligoté yerine şampanya konunca 'Royal' oldu. Félix Kir'in adını kullanma hakkını 1951'de bir cassis üreticisine verdiği anlatılır; bu yüzden Fransa'da hâlâ bir içki adı olmanın ötesinde bir markadır.",
        "With Champagne instead of Aligoté it became 'Royal'. Félix Kir is said to have granted the use of his name to a cassis producer in 1951, which is why in France it is still more than just the name of a drink."),
    ],
    steps: [
      l("Flütü ve şampanyayı soğut.", "Chill the flute and Champagne."),
      l("Flüte crème de cassis dök.", "Pour the crème de cassis into the flute."),
      l("Şampanyayla yavaşça tamamla; renk alttan yukarı yakut kırmızısı yükselir.", "Top slowly with Champagne; the ruby colour rises from below."),
      l("Karıştırma.", "Do not stir."),
    ],
    why: l("Kuşüzümünün koyu, ekşi-tatlı meyvesi kuru şampanyanın asidini yumuşatır; az miktar likör yeter. Kabarcıklar likörü kendiliğinden karıştırır, bu yüzden kaşığa gerek yoktur.",
      "Blackcurrant's dark, sweet-tart fruit softens dry Champagne's acidity; a small amount of liqueur is enough. The bubbles mix the liqueur on their own, so no spoon is needed."),
    variations: [
      v("Kir", "Beyaz Aligoté ile: orijinali.", "With white Aligoté: the original."),
      v("Kir Impérial", "Cassis yerine ahududu likörü.", "Raspberry liqueur instead of cassis."),
      v("Cardinal", "Kırmızı şarapla.", "With red wine."),
    ],
    tip: l("Oran 1'e 9 olmalı; fazla cassis kadehi şurup gibi yapar.", "The ratio should be 1 to 9; too much cassis makes it syrupy."),
  },

  hugo: {
    history: [
      l("2005'te Güney Tirol'deki Naturns kasabasında, San Zeno Bar'ın barmeni Roland Gruber, Spritz'e daha az acı, daha çiçeksi bir alternatif aradı. İlk tarifte melisa (oğulotu) şurubu vardı; melisa zor bulunduğu için kısa sürede yerini mürver çiçeği şurubu aldı.",
        "In 2005, in the South Tyrolean town of Naturns, Roland Gruber, bartender at San Zeno Bar, looked for a less bitter, more floral alternative to the Spritz. The first recipe used lemon balm syrup; because lemon balm was hard to find, elderflower syrup soon took its place."),
      l("Gruber önce adını 'Otto' koymayı düşündü, sonra 'Hugo'nun kulağa daha iyi geldiğine karar verdi. Birkaç yıl içinde Alplerin her kayak kulübesinden Almanya'nın bütün yaz bahçelerine yayıldı.",
        "Gruber first thought of calling it 'Otto', then decided 'Hugo' sounded better. Within a few years it spread from every Alpine ski hut to all of Germany's summer beer gardens."),
    ],
    steps: [
      l("Büyük şarap kadehine birkaç nane yaprağı koy, hafifçe bastır.", "Put a few mint leaves in a large wine glass and press them lightly."),
      l("Mürver çiçeği şurubu ya da likörünü ekle, kadehi buzla doldur.", "Add elderflower syrup or liqueur and fill the glass with ice."),
      l("Prosecco ve bir parça sodayla tamamla.", "Top with prosecco and a splash of soda."),
      l("Bir kez karıştır, misket limonu dilimi ve nane dalıyla süsle.", "Stir once and garnish with a lime wheel and mint sprig."),
    ],
    why: l("Mürver çiçeğinin bal ve armut kokusu prosecco'nun meyvesiyle akrabadır; nane ve misket limonu tatlılığı keser. Aperol Spritz'in acısı yoktur, yerinde çiçek ve ferahlık vardır: daha hafif, yazın öğle saatlerine uygun.",
      "Elderflower's honey-and-pear scent is kin to prosecco's fruit, and mint and lime cut the sweetness. Where an Aperol Spritz has bitterness, the Hugo has flowers and freshness: lighter, made for summer noons."),
    variations: [
      v("Melisalı Hugo", "Orijinal: oğulotu şurubuyla.", "The original: with lemon balm syrup."),
      v("Hugo Zero", "Prosecco yerine alkolsüz köpüklü.", "Alcohol-free sparkling wine instead of prosecco."),
    ],
    tip: l("Mürver çiçeği likörü (St-Germain tarzı) şuruptan daha az tatlı ve daha kokuludur; şurup kullanıyorsan miktarı azalt.", "Elderflower liqueur (St-Germain style) is less sweet and more fragrant than syrup; if using syrup, use less."),
  },

  "japanese-highball": {
    history: [
      l("Viski ve soda, Japonya'da 'haibōru' olarak 1950'lerde Suntory'nin Torys barlarıyla yaygınlaştı: işten çıkan memurların ucuz, hafif ve yemekle giden içkisi. 1990'larda Japon viskisinin satışları düşünce Suntory 2008'de Kakubin viskisiyle 'Kaku-hai' kampanyasını başlattı ve highball tekrar ülkenin en sevilen içkisi oldu.",
        "Whisky and soda spread in Japan as the 'haibōru' through Suntory's Torys bars in the 1950s: the cheap, light, food-friendly drink of office workers after hours. When Japanese whisky sales fell in the 1990s, Suntory launched its 'Kaku-hai' campaign with Kakubin whisky in 2008, and the highball became the nation's favourite drink again."),
      l("Japon barlarında highball bir törendir: buzun bardağa yerleştirilişi, sodanın buza değmeden dökülüşü, karıştırmanın tam olarak kaç tur olduğu. Bazı barlar özel highball makineleri kullanır.",
        "In Japanese bars the highball is a ritual: how the ice is set in the glass, how the soda is poured without touching the ice, exactly how many turns of the spoon. Some bars use dedicated highball machines."),
    ],
    steps: [
      l("Uzun bardağı berrak, büyük buz parçalarıyla doldur ve bar kaşığıyla buzu çevirerek bardağı soğut; eriyen suyu dök.", "Fill a tall glass with large, clear ice and turn it with a bar spoon to chill the glass; pour off the melt water."),
      l("Viskiyi ekle ve on üç buçuk tur karıştır.", "Add the whisky and stir thirteen and a half turns."),
      l("Çok soğuk sodayı buza değdirmeden bar kaşığı boyunca yavaşça dök (1'e 3 ya da 1'e 4).", "Pour very cold soda slowly down the bar spoon without touching the ice (1 to 3 or 1 to 4)."),
      l("Yalnızca bir kez, dikey olarak buzu kaldırıp bırak; limon kabuğunun yağını püskürt.", "Lift the ice once, vertically, and let it fall; express a lemon peel."),
    ],
    why: l("Sadeliğin kendisi: viski ve su. Yüksek karbonasyon viskinin kokusunu kabarcıklarla yukarı taşır, damakta kuru ve ferah kalır. Her şey sıcaklık ve kabarcık içindir: soğuk bardak, soğuk soda, az karıştırma.",
      "Simplicity itself: whisky and water. High carbonation lifts the whisky's aroma with its bubbles, staying dry and fresh on the palate. Everything is about temperature and bubbles: cold glass, cold soda, little stirring."),
    variations: [
      v("Mizuwari", "Soda yerine kaynak suyu: yemekle içilir.", "Spring water instead of soda: drunk with food."),
      v("Toki highball", "Hafif, harman bir viskiyle; makineden.", "With a light blended whisky; from the machine."),
      v("Shiso highball", "Bir shiso yaprağıyla.", "With a shiso leaf."),
    ],
    tip: l("Sodayı bardağa değil buzun yanına dök; buza çarpan soda kabarcığını kaybeder.", "Pour the soda beside the ice, not onto it; soda that hits ice loses its fizz."),
  },

  "shirley-temple": {
    history: [
      l("1930'larda çocuk yıldız Shirley Temple için icat edildi; nerede olduğu tartışmalıdır: Beverly Hills'teki Chasen's restoranı da, Honolulu'daki Royal Hawaiian Hotel de bunu kendine mal eder. Hollywood partilerinde büyüklere kokteyl verilirken çocuk yıldızın da kendine ait bir 'kokteyli' olması istendi.",
        "It was invented in the 1930s for the child star Shirley Temple; where is disputed: both Chasen's in Beverly Hills and the Royal Hawaiian Hotel in Honolulu claim it. While adults drank cocktails at Hollywood parties, the child star was meant to have a 'cocktail' of her own."),
      l("Shirley Temple'ın kendisi yetişkinliğinde içkiyi 'çok tatlı' bulduğunu söylemiş ve adının izinsiz kullanılmasından hoşlanmamıştır. Yine de dünyanın en tanınmış alkolsüz kokteyli olarak kaldı.",
        "Shirley Temple herself, as an adult, said she found the drink 'too sweet' and disliked her name being used without permission. It nevertheless remains the world's best-known alcohol-free cocktail."),
    ],
    steps: [
      l("Uzun bardağı buzla doldur.", "Fill a tall glass with ice."),
      l("Misket limonu suyu ve grenadini ekle.", "Add lime juice and grenadine."),
      l("Zencefilli gazozla tamamla; grenadin dipte kırmızı bir katman bırakır.", "Top with ginger ale; the grenadine leaves a red layer at the bottom."),
      l("Bir kiraz ile süsle, karıştırmak misafire kalsın.", "Garnish with a cherry and let the guest do the stirring."),
    ],
    why: l("Zencefilli gazozun hafif baharatı ve kabarcığı, grenadinin nar tatlılığıyla buluşur; taze misket limonu eklemek klasik tarifin şeker yükünü dengeleyip içkiyi bir 'çocuk içkisi'nden gerçek bir kokteyle yaklaştırır.",
      "Ginger ale's light spice and fizz meet grenadine's pomegranate sweetness; adding fresh lime balances the classic recipe's sugar load and brings the drink from a 'kids' drink' closer to a real cocktail."),
    variations: [
      v("Dirty Shirley", "Bir ölçü votkayla: yetişkin hâli.", "With a shot of vodka: the grown-up version."),
      v("Roy Rogers", "Zencefilli gazoz yerine kola: erkek çocukların karşılığı.", "Cola instead of ginger ale: the boys' counterpart."),
    ],
    tip: l("Grenadini gerçek nar suyundan yap (nar suyu ve şeker, eşit, kısık ateşte): hazır kırmızı şurupların çoğunda nar yoktur.", "Make grenadine from real pomegranate (equal juice and sugar over low heat): most ready-made red syrups contain no pomegranate."),
  },

  pussyfoot: {
    history: [
      l("1920'de Londra'daki Embassy Club'ın barmeni Robert Vermeire tarafından yaratıldı ve 1922'deki 'Cocktails: How to Mix Them' kitabında yayımlandı. Adını, Amerika'daki içki yasağının ateşli savunucusu William E. 'Pussyfoot' Johnson'dan alır.",
        "It was created in 1920 by Robert Vermeire, bartender at London's Embassy Club, and published in his 1922 'Cocktails: How to Mix Them'. It takes its name from William E. 'Pussyfoot' Johnson, a fiery campaigner for Prohibition in America."),
      l("Johnson'a 'Pussyfoot' (kedi adımlı) lakabı, bir şerif yardımcısıyken kaçak içkicilerin peşine sessizce düşmesinden takılmıştı. Ona alkolsüz bir kokteylle gönderme yapmak, Avrupa barlarının Yasak'a ince bir alayıydı.",
        "Johnson earned the nickname 'Pussyfoot' as a lawman who crept up silently on bootleggers. Toasting him with an alcohol-free cocktail was European bars' gentle mockery of Prohibition."),
    ],
    steps: [
      l("Shaker'a portakal, limon ve misket limonu suyunu, grenadini, şurubu ve yumurta akını koy.", "Put the orange, lemon and lime juice, grenadine, syrup and egg white in the shaker."),
      l("Buzsuz 10 saniye çalkala.", "Dry shake for 10 seconds."),
      l("Buzla 12 saniye daha çalkala.", "Shake 12 more seconds with ice."),
      l("Soğuk coupe'a çift süz, portakal kabuğu yağıyla bitir.", "Double-strain into a cold coupe and finish with orange peel oil."),
    ],
    why: l("Üç narenciye, tek bir meyve suyunun yapamayacağı bir derinlik verir: portakal gövdeyi ve tatlılığı, limon ve misket asidi ve kokuyu taşır. Yumurta akı alkolün vereceği ağırlığın yerini dokuyla doldurur; ağızda bir kokteyl gibi oturur.",
      "Three citruses give a depth no single juice can: orange carries body and sweetness, lemon and lime the acid and aroma. The egg white fills the weight that alcohol would give with texture, so it sits in the mouth like a cocktail."),
    variations: [
      v("Vermeire hâli", "Yumurta sarısıyla: daha kremsi, flip gibi.", "With egg yolk: creamier, like a flip."),
      v("Aquafaba ile", "Yumurtasız, aynı köpük.", "No egg, the same foam."),
    ],
    tip: l("Portakalı servis anında sık; portakal suyunun tadı birkaç saatte düzleşir.", "Squeeze the orange at the moment of serving; orange juice goes flat in a few hours."),
  },

  "lime-rickey": {
    history: [
      l("Rickey, 1880'lerde Washington'da Shoomaker's barının müdavimi, Demokrat lobici 'Albay' Joe Rickey'nin adını taşır. Barmen George Williamson, Rickey'nin sabah içtiği burbon ve sodasına yarım misket limonu sıktı; şekersiz, kuru ve çok ferah bir highball doğdu. Kısa sürede cinli hâli (Gin Rickey) daha ünlü oldu.",
        "The Rickey is named after 'Colonel' Joe Rickey, a Democratic lobbyist and regular at Shoomaker's bar in 1880s Washington. The bartender George Williamson squeezed half a lime into Rickey's morning bourbon and soda; a dry, sugarless and very refreshing highball was born. Soon its gin version, the Gin Rickey, grew more famous."),
      l("Alkolsüz Lime Rickey, Yasak döneminde Amerika'nın soda çeşmelerinde ve eczanelerinde sevildi; özellikle New England'da bugün hâlâ bir yaz klasiğidir.",
        "The alcohol-free Lime Rickey was loved at America's soda fountains and drugstores during Prohibition; in New England especially it is still a summer classic."),
    ],
    steps: [
      l("Uzun bardağı buzla doldur.", "Fill a tall glass with ice."),
      l("Taze misket limonu suyunu ve şurubu ekle; sıktığın limon kabuğunu da bardağa at.", "Add fresh lime juice and syrup; drop the squeezed lime shell into the glass."),
      l("Soğuk sodayla tamamla ve bir kez karıştır.", "Top with cold soda and stir once."),
    ],
    why: l("Misket limonu kabuğu bardakta kaldığı için yağları yavaşça soduya karışır: her yudum ilkinden biraz daha kokulu. Az şeker ve bol soda, onu bir limonatadan daha kuru ve ferah yapar.",
      "Because the lime shell stays in the glass, its oils slowly seep into the soda: each sip is a little more fragrant than the last. Little sugar and plenty of soda make it drier and fresher than a lemonade."),
    variations: [
      v("Gin Rickey", "Bir ölçü cinle, şekersiz.", "With a measure of gin, no sugar."),
      v("Raspberry Lime Rickey", "Ahududu şurubuyla: Boston'un pembe hâli.", "With raspberry syrup: Boston's pink version."),
      v("Original Rickey", "Bourbonla: Joe Rickey'nin kendi içkisi.", "With bourbon: Joe Rickey's own drink."),
    ],
    tip: l("Klasik Rickey şekersizdir; alkolsüz hâlde biraz şurup gerekir ama tadı ekşi kalmalı.", "The classic Rickey has no sugar; the alcohol-free version needs a little syrup, but it should still taste tart."),
  },
};
