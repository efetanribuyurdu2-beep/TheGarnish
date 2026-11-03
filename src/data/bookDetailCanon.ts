/** The Cocktail Book in depth: the core canon. */
import { l, v, type BookDetail } from "./bookDetailTypes";

export const CANON: Record<string, BookDetail> = {
  martini: {
    history: [
      l("Martini'nin atası, Jerry Thomas'ın 1887 baskısında görünen Martinez'dir: tatlı Old Tom cini, tatlı vermut, maraschino ve bitter. Yüzyıl dönümünde kuru London Dry cin ile Fransız kuru vermutu buluşunca kadeh hem kurudu hem berraklaştı. New York'taki Knickerbocker Oteli'nde Martini di Arma di Taggia adlı bir barmenin 1911'de bugünkü kuru tarifi ilk kez yaptığı anlatılır, ama bu bir rivayettir; tarif birkaç barda aynı yıllarda olgunlaştı.",
        "The Martini's ancestor is the Martinez, printed in the 1887 edition of Jerry Thomas: sweet Old Tom gin, sweet vermouth, maraschino and bitters. When dry London gin met French dry vermouth around the turn of the century, the glass grew both drier and clearer. A bartender named Martini di Arma di Taggia is said to have made today's dry version at New York's Knickerbocker Hotel in 1911, but that is legend; the recipe ripened in several bars in the same years."),
      l("Yirminci yüzyıl boyunca vermut azaldıkça Martini bir statü göstergesine dönüştü: Churchill'in vermut şişesine yalnızca bakarak yaptığı, Hemingway'in 15'e 1'lik 'Montgomery'si. Bugün iyi barlar dengeye geri döndü: 5'e 1 ile 3'e 1 arası, birkaç damla portakal bitteri ve buz gibi bir kadeh.",
        "Through the twentieth century, as the vermouth shrank, the Martini became a status symbol: Churchill's made by glancing at the vermouth bottle, Hemingway's 15-to-1 'Montgomery'. Good bars today have returned to balance: between 5 to 1 and 3 to 1, a dash or two of orange bitters and an ice-cold glass."),
    ],
    steps: [
      l("Kadehi en az 15 dakika dondurucuda tut; Martini'nin yarısı sıcaklıktır.", "Keep the glass in the freezer for at least 15 minutes; half of a Martini is temperature."),
      l("Karıştırma bardağına önce vermutu ve bitteri, sonra cini koy.", "Put the vermouth and bitters in the mixing glass first, then the gin."),
      l("Bardağı sert, kuru buzla tepeye kadar doldur.", "Fill the glass to the top with hard, dry ice."),
      l("Bar kaşığıyla 30–40 saniye, buz sessizce dönecek şekilde karıştır.", "Stir with a bar spoon for 30–40 seconds, so the ice turns silently."),
      l("Soğuk kadehe süz; zeytini kürdana tak ya da limon kabuğunu üstünde sıkıp kenara sür.", "Strain into the cold glass; spear the olive, or express a lemon peel over the top and rub the rim."),
    ],
    why: l("Cin ve vermut ikisi de bitkisel; vermutun şarap asidi ve hafif tatlılığı cinin ardıcını yumuşatır, köşelerini törpüler. Karıştırma hava katmadan %20–25 su ekler: içki ipeksi ve berrak kalır, 60 ml cinin keskinliği 'soğuk bir ağırlığa' dönüşür.",
      "Gin and vermouth are both botanical; the wine acidity and faint sweetness of vermouth soften the juniper and file down its corners. Stirring adds 20–25% water without air, so the drink stays silky and clear and the bite of 60 ml of gin becomes a 'cold weight'."),
    variations: [
      v("Martinez", "Old Tom cin, tatlı vermut, maraschino: atanın tatlı, yuvarlak hâli.", "Old Tom gin, sweet vermouth, maraschino: the ancestor, sweet and round."),
      v("Dirty Martini", "Bir kaşık zeytin salamurası: tuzlu, umami.", "A spoon of olive brine: salty and savoury."),
      v("Gibson", "Zeytin yerine turşu inci soğan.", "A pickled pearl onion instead of the olive."),
      v("50/50", "Eşit cin ve kuru vermut: hafif, aperatif.", "Equal gin and dry vermouth: light, an aperitif."),
    ],
    tip: l("Vermut bir şaraptır: açtıktan sonra buzdolabında tut, bir ayda bitir. Çoğu 'kötü Martini'nin sebebi bayat vermuttur.", "Vermouth is wine: keep it in the fridge once opened and finish it within a month. Most 'bad Martinis' are stale vermouth."),
  },

  negroni: {
    history: [
      l("En sevilen hikâyeye göre 1919'da Floransa'daki Caffè Casoni'de Kont Camillo Negroni, barmen Fosco Scarselli'den Americano'sunu daha sert yapmasını istedi: soda yerine cin. Barmen kadeh ayrılsın diye limon yerine portakal dilimi koydu. Kontun varlığı belgelerle tartışılsa da Negroni ailesi 1919'da Negroni Distillerie'yi kurup hazır içkiyi şişeledi.",
        "In the favourite story, in 1919 at Florence's Caffè Casoni, Count Camillo Negroni asked the bartender Fosco Scarselli to make his Americano stronger: gin instead of soda. The bartender set an orange slice in place of lemon to mark the glass. The count's existence has been argued over, but the Negroni family founded a distillery in 1919 to bottle the drink ready-made."),
      l("Eşit üç parça, ezberlemesi en kolay tariftir; Orson Welles 1947'de Roma'dan 'bitter karaciğerine iyi gelir, cin kötü; birbirlerini dengeliyorlar' diye yazmıştı. Yirmi birinci yüzyılda Negroni Haftası ve sayısız türeviyle tekrar dünya barlarının merkezine yerleşti.",
        "Three equal parts make it the easiest recipe to remember; from Rome in 1947 Orson Welles wrote that 'the bitters are excellent for your liver, the gin is bad for you; they balance each other'. In this century, with Negroni Week and its countless children, it sits at the centre of the world's bars again."),
    ],
    steps: [
      l("Karıştırma bardağına cin, Campari ve tatlı vermutu eşit ölçüyle koy.", "Pour gin, Campari and sweet vermouth in equal measure into a mixing glass."),
      l("Buzla doldurup 20–25 saniye karıştır; Negroni biraz sulandıkça açılır.", "Fill with ice and stir 20–25 seconds; a Negroni opens as it dilutes."),
      l("Büyük tek bir buz küpü ya da küre koyduğun rocks bardağına süz.", "Strain into a rocks glass over one large cube or sphere."),
      l("Portakal kabuğunu yüzeyde sıkarak yağını püskürt, kenara sür ve bırak.", "Express an orange peel over the surface, rub the rim and drop it in."),
    ],
    why: l("Üç ses birbirini tamamlar: Campari'nin acısı ve portakalı, vermutun tatlı-baharatlı şarabı, cinin kuru omurgası. Hiçbiri diğerini bastırmaz çünkü tatlılık ve acılık neredeyse eşit; büyük buz yavaş eridiği için kadeh ilk yudumdan son yuduma kadar sertten yumuşağa doğru güzelce değişir.",
      "Three voices complete one another: Campari's bitterness and orange, vermouth's sweet spiced wine, gin's dry backbone. None drowns the others because sweetness and bitterness are almost equal; a big cube melts slowly, so the glass moves gracefully from bold to soft between the first sip and the last."),
    variations: [
      v("Negroni Sbagliato", "Cin yerine köpüklü şarap: Milano'daki Bar Basso'da bir 'hata'dan doğdu.", "Sparkling wine instead of gin: born of a 'mistake' at Bar Basso in Milan."),
      v("Boulevardier", "Cin yerine bourbon: daha sıcak, sonbahar hâli.", "Bourbon instead of gin: warmer, an autumn version."),
      v("White Negroni", "Suze ve Lillet Blanc: altın renkli, kuru ve çiçeksi.", "Suze and Lillet Blanc: golden, dry and floral."),
    ],
    tip: l("Tatlı vermut seçimi Negroni'yi belirler: vanilyalı, zengin bir vermut (Carpano Antica tarzı) yuvarlar; daha kuru bir vermut acıyı öne çıkarır.", "The sweet vermouth decides the Negroni: a rich, vanilla one (Carpano Antica style) rounds it; a drier one pushes the bitterness forward."),
  },

  "old-fashioned": {
    history: [
      l("1806'da bir New York gazetesi 'cock-tail'i ilk kez tanımladı: içki, şeker, su ve bitter. Old Fashioned işte o ilk kokteyldir. Yüzyıl sonunda barmenler likör, absent ve meyve eklemeye başlayınca müşteriler 'eski usul' (old-fashioned) viskili kokteyl istemeye başladı; isim buradan gelir.",
        "In 1806 a New York newspaper first defined the 'cock-tail': spirit, sugar, water and bitters. The Old Fashioned is that first cocktail. Late in the century, when bartenders began adding liqueurs, absinthe and fruit, guests started asking for a whiskey cocktail made 'the old-fashioned way'; the name comes from there."),
      l("Louisville'deki Pendennis Club 1880'lerde tarifi kendisinin bulduğunu söyler; daha doğrusu adını ve ünlü hâlini orada aldığıdır. Yasak döneminden sonra kadeh ezilmiş meyve ve sodayla doldu; 2000'lerde barmenler ve Mad Men dizisi onu yeniden sade hâline döndürdü.",
        "Louisville's Pendennis Club claims to have invented it in the 1880s; more truly, it gave the drink its name and fame. After Prohibition the glass filled up with muddled fruit and soda; in the 2000s bartenders, and Mad Men, brought it back to its plain form."),
    ],
    steps: [
      l("Rocks bardağına demerara şurubunu ve Angostura'yı koy (şeker küpü kullanıyorsan birkaç damla suyla erit).", "Put the demerara syrup and Angostura in the rocks glass (with a sugar cube, melt it with a few drops of water)."),
      l("Viskinin yarısını ve birkaç buzu ekleyip karıştır.", "Add half the whiskey and a few cubes and stir."),
      l("Kalan viskiyi ekle, büyük buzu koy ve 20 saniye daha karıştır.", "Add the rest of the whiskey and the big cube; stir 20 more seconds."),
      l("Portakal kabuğunu yüzeyde sıkıp kenara sür ve bardağa bırak.", "Express an orange peel over the top, rub the rim and drop it in."),
    ],
    why: l("Kokteylin en sade formülü: bir parça şeker viskinin yakıcılığını yuvarlar, bitter tuz gibi tatları birbirine bağlar, buzdan gelen su alkolü açarak meşe ve vanilyayı ortaya çıkarır. Fazlası yok; bu yüzden viskinin kalitesi her şeydir.",
      "The plainest formula of all: a little sugar rounds the whiskey's burn, bitters tie the flavours together like salt, and melt water opens the alcohol to release oak and vanilla. There is nothing else, so the whiskey is everything."),
    variations: [
      v("Rye Old Fashioned", "Çavdar viskisi: daha baharatlı, kuru.", "Rye whiskey: spicier and drier."),
      v("Oaxaca Old Fashioned", "Reposado tekila ve mezcal, agave şurubu: Phil Ward, 2007.", "Reposado tequila and mezcal, agave syrup: Phil Ward, 2007."),
      v("Wisconsin Old Fashioned", "Brendi, ezilmiş portakal ve kiraz, üstüne gazoz: Ortabatı'nın tatlı hâli.", "Brandy, muddled orange and cherry, topped with soda: the Midwest's sweet version."),
    ],
    tip: l("Tek büyük buz küpü kullan; küçük buzlar çabuk erir ve kadehi beş dakikada sulandırır.", "Use one big cube; small ice melts fast and waters the glass down in five minutes."),
  },

  manhattan: {
    history: [
      l("1870'lerde New York'taki Manhattan Club'da doğduğu kabul edilir. Winston Churchill'in annesi Jennie Jerome'un bir ziyafetinde icat edildiği hikâyesi çok sevilir ama o tarihte Jennie İngiltere'deydi. Barmen William Mulhall'ın anılarına göre tarifi kulübün barmeni 'Black' adlı biri yaptı.",
        "It is held to have been born at New York's Manhattan Club in the 1870s. The story of its invention at a banquet thrown by Jennie Jerome, Winston Churchill's mother, is much loved, but Jennie was in England at the time. By the memoir of bartender William Mulhall, it was made by a man called 'Black' who kept the club's bar."),
      l("Martini'den önce gelen büyük 'karıştırılan' klasiktir: Amerikan çavdar viskisi ile İtalyan tatlı vermutu. Yasak yıllarında Kanada viskisiyle, sonra bourbonla yapıldı; bugün çavdarlı orijinali yeniden kuraldır.",
        "It is the great stirred classic that came before the Martini: American rye with Italian sweet vermouth. During Prohibition it was made with Canadian whisky, later with bourbon; today the rye original is the rule again."),
    ],
    steps: [
      l("Coupe kadehini soğut.", "Chill the coupe."),
      l("Karıştırma bardağına çavdar viskisi, tatlı vermut ve Angostura'yı koy.", "Pour rye, sweet vermouth and Angostura into a mixing glass."),
      l("Buzla 30 saniye karıştır.", "Stir with ice for 30 seconds."),
      l("Soğuk kadehe süz, bir maraschino kirazı ekle; istersen portakal kabuğunun yağını püskürt.", "Strain into the cold glass and add a maraschino cherry; express an orange peel if you like."),
    ],
    why: l("2'ye 1 oranı, çavdarın baharatını vermutun tatlı şarabı ve otlarıyla sarar; bitter ikisini aynı cümlede birleştirir. Sour'lardaki asit yerine burada denge vermutun şarap asidinden ve şekerinden gelir, bu yüzden içki daha ağır ve kadifemsi.",
      "The 2-to-1 ratio wraps the rye's spice in vermouth's sweet wine and herbs, and the bitters join them in a single sentence. Instead of a sour's citrus, the balance here comes from vermouth's wine acidity and sugar, which is why the drink feels heavier and velvety."),
    variations: [
      v("Perfect Manhattan", "Vermutun yarısı tatlı, yarısı kuru.", "Half sweet and half dry vermouth."),
      v("Rob Roy", "Viski olarak İskoç viskisi.", "Scotch as the whisky."),
      v("Brooklyn", "Kuru vermut, maraschino ve Amer Picon: komşu semtin kuzeni.", "Dry vermouth, maraschino and Amer Picon: the cousin from the next borough."),
    ],
    tip: l("Kırmızı boyalı şekerli kiraz yerine likörde bekletilmiş koyu Amarena ya da Luxardo kirazı kullan; fark kadehin tamamına yansır.", "Use dark Amarena or Luxardo cherries soaked in syrup rather than bright red ones; the difference shows in the whole glass."),
  },

  daiquiri: {
    history: [
      l("1898 civarında Küba'nın doğusundaki Daiquirí madenlerinde çalışan Amerikalı mühendis Jennings Cox'a atfedilir: yerel rom, misket limonu ve şeker, bolca buz. Aslında Kübalılar bu üçlüyü çok daha önce içiyordu; Cox ona sadece bir isim verdi. 1909'da Amiral Lucius Johnson tarifi Washington'daki Army and Navy Club'a götürdü.",
        "Credited to Jennings Cox, an American engineer at the Daiquirí iron mines in eastern Cuba around 1898: local rum, lime and sugar over lots of ice. Cubans had drunk this trio long before; Cox only gave it a name. In 1909 Admiral Lucius Johnson carried it to the Army and Navy Club in Washington."),
      l("Havana'daki El Floridita'da Constantino Ribalaigua onu sanata dönüştürdü; Hemingway'in şekersiz, çift romlu 'Papa Doble'sı oradan çıktı. Sonraki on yıllarda dondurma makinelerinde çilekli bir tatlıya döndü; bugün barmenlerin 'ellerinin ısınması' için yaptığı ilk içki yine sade, çalkalanmış hâlidir.",
        "At Havana's El Floridita, Constantino Ribalaigua turned it into an art; Hemingway's sugarless double 'Papa Doble' came from there. In later decades it became a strawberry dessert from slush machines; today, the first drink bartenders make to 'warm up their hands' is once more the simple shaken one."),
    ],
    steps: [
      l("Coupe'u soğut. Misket limonunu yeni sık.", "Chill the coupe. Squeeze the lime fresh."),
      l("Shaker'a rom, limon ve şeker şurubunu koy.", "Put rum, lime juice and syrup in the shaker."),
      l("Buzla doldur ve 12–15 saniye çok sert çalkala.", "Fill with ice and shake very hard for 12–15 seconds."),
      l("İnce süzgeçten soğuk kadehe çift süz; buz kırığı kalmasın.", "Double-strain into the cold glass so no ice shards remain."),
    ],
    why: l("Kusursuz bir ekşi: 60 ml romun gövdesi, misket limonunun keskin asidi ve eşit ölçüde şeker. Sert çalkalama küçük hava kabarcıkları ve yaklaşık %50 su katar; içki hafif, köpüksü ve buz gibi olur. Az malzeme olduğu için her hata görünür; bu yüzden barmenlerin sınav kadehidir.",
      "A perfect sour: the body of 60 ml of rum, lime's sharp acid and an equal measure of sugar. A hard shake adds fine air bubbles and about half as much water again; the drink turns light, frothy and ice-cold. With so few ingredients every mistake shows, which is why it is the bartender's test glass."),
    variations: [
      v("Hemingway Daiquiri", "Maraschino ve greyfurt, şekersiz: El Floridita.", "Maraschino and grapefruit, no sugar: El Floridita."),
      v("Frozen Daiquiri", "Kırık buzla blenderdan: Ribalaigua'nın elektrikli blender'ı.", "Blended with crushed ice: Ribalaigua's electric blender."),
      v("Daiquiri No. 3", "Hemingway'inkine yakın, biraz şekerle yumuşatılmış.", "Close to Hemingway's, softened with a little sugar."),
    ],
    tip: l("Limonu servis anında sık; misket limonu suyu bir saat içinde acılaşmaya başlar.", "Squeeze the lime at the last moment; lime juice starts turning bitter within an hour."),
  },

  margarita: {
    history: [
      l("Margarita'nın en az beş 'mucidi' var: 1938'de Tijuana yakınında tekilaya alerjisi olduğunu söyleyen Marjorie King için içki yapan Carlos 'Danny' Herrera; 1948'de Acapulco'daki partisinde Dallaslı sosyete hanımı Margarita Sames; daha birçok barmen. En sağlam açıklama dildedir: 'margarita' İspanyolca papatya demektir ve 'Daisy' (papatya), 1930'larda Amerika'da çok sevilen içki, ekşi ve likör ailesinin adıydı.",
        "The Margarita has at least five 'inventors': Carlos 'Danny' Herrera, who made a drink near Tijuana in 1938 for Marjorie King, who said she was allergic to everything but tequila; the Dallas socialite Margarita Sames at her Acapulco party in 1948; and many more bartenders. The soundest explanation is in the language: 'margarita' is Spanish for daisy, and the 'Daisy', loved in 1930s America, was the name of the spirit, sour and liqueur family."),
      l("Yani Margarita, bir Tequila Daisy'dir: Sidecar ailesinin Meksika şubesi. 1971'de Dallas'ta Mariano Martinez'in icat ettiği donmuş Margarita makinesi onu Amerika'nın en çok içilen kokteyli yaptı.",
        "So the Margarita is a Tequila Daisy: the Mexican branch of the Sidecar family. The frozen-Margarita machine Mariano Martinez invented in Dallas in 1971 made it America's most-drunk cocktail."),
    ],
    steps: [
      l("Kadehin dış kenarının yarısını misket limonuyla ıslat ve tuza batır (içine tuz düşmesin).", "Wet half the outer rim with lime and dip it in salt (keep it off the inside)."),
      l("Shaker'a tekila, portakal likörü, misket limonu ve biraz şurup koy.", "Put tequila, orange liqueur, lime and a little syrup in the shaker."),
      l("Buzla 12 saniye sert çalkala.", "Shake hard with ice for 12 seconds."),
      l("Coupe'a ya da taze buzlu rocks bardağına süz.", "Strain into a coupe or a rocks glass over fresh ice."),
    ],
    why: l("Tekilanın otsu, biberli agavesini portakal likörünün tatlılığı ve kabuk yağı yuvarlar; misket limonu canlılık katar. Yarım kenardaki tuz, acıyı bastırıp tatlıyı ve meyveyi büyütür, böylece her yudumda tadı biraz değiştirebilirsin.",
      "Tequila's grassy, peppery agave is rounded by the orange liqueur's sweetness and peel oil, and the lime adds life. Salt on half the rim suppresses bitterness and amplifies fruit and sweetness, so each sip can be adjusted a little."),
    variations: [
      v("Tommy's Margarita", "Portakal likörü yerine agave şurubu: Julio Bermejo, San Francisco, 1990'lar.", "Agave syrup instead of orange liqueur: Julio Bermejo, San Francisco, 1990s."),
      v("Mezcal Margarita", "Tekilanın yarısı mezcal: dumanlı.", "Half the tequila as mezcal: smoky."),
      v("Frozen Margarita", "Kırık buzla blenderdan.", "Blended with crushed ice."),
    ],
    tip: l("Etiketinde '%100 agave' yazan tekila seç; 'mixto' tekilaların yarısı şeker kamışıdır ve sert, tatlımsı bir iz bırakır.", "Choose a tequila labelled '100% agave'; 'mixto' tequilas are half cane sugar and leave a harsh, sweetish trail."),
  },

  "whiskey-sour": {
    history: [
      l("Ekşiler, denizcilerin iskorbüte karşı içtiği limonlu romdan ve on sekizinci yüzyıl punch'larından doğdu. Viski Sour ilk kez 1862'de Jerry Thomas'ın kitabında yazıldı, ama tarihî bir kayıt olarak 1870'te Wisconsin'de bir gazetede de geçer. Amerikan barlarının bir asır boyunca en temel siparişlerinden biriydi.",
        "Sours were born of the lime-and-rum sailors drank against scurvy and of eighteenth-century punches. The Whiskey Sour was first printed in Jerry Thomas's book in 1862, and a Wisconsin newspaper mentions it in 1870. For a century it was one of the most basic orders in American bars."),
      l("Yumurta akı isteğe bağlıdır: onunla yapılana eskiden 'Boston Sour' denirdi. Yetmişlerde hazır ekşi karışımlarla itibarını kaybetti; taze limon ve yumurta akıyla yapılan hâli bugün yeniden en çok sipariş edilen klasiklerden.",
        "The egg white is optional: with it, it used to be called a 'Boston Sour'. In the seventies it lost face to ready-made sour mix; made with fresh lemon and egg white it is again one of the most-ordered classics."),
    ],
    steps: [
      l("Shaker'a bourbon, limon, şeker şurubu ve yumurta akını koy.", "Put bourbon, lemon, syrup and egg white in the shaker."),
      l("Buzsuz 10 saniye sert çalkala (dry shake): protein açılır, köpük kurulur.", "Shake hard without ice for 10 seconds (dry shake): the proteins unfold and the foam builds."),
      l("Buzu ekle ve 12 saniye daha çalkala.", "Add ice and shake 12 more seconds."),
      l("Taze buzlu rocks bardağına ince süzgeçten süz; köpüğün oturmasını bekle.", "Fine-strain into a rocks glass over fresh ice and let the foam settle."),
      l("Köpüğün üstüne birkaç damla Angostura damlat, kirazla süsle.", "Drop a few dashes of Angostura on the foam and garnish with a cherry."),
    ],
    why: l("Bourbonun vanilyası ve karamel meşesi, limonun asidiyle tam dengelenir. Yumurta akı tat vermez ama doku verir: asidi yumuşatır, damakta ipek gibi kayar ve üstte kalıcı bir köpük bırakır. Bitter, köpüğün üstünde hem kokuyu hem görüntüyü taşır.",
      "Bourbon's vanilla and caramel oak meet the lemon's acid in exact balance. The egg white adds no flavour but texture: it softens the acid, glides like silk and leaves a lasting foam. Bitters on the foam carry both aroma and looks."),
    variations: [
      v("New York Sour", "Üstüne kırmızı şarap katmanı: renk ve tanen.", "A float of red wine: colour and tannin."),
      v("Amaretto Sour", "Amaretto ve biraz bourbon: Jeffrey Morgenthaler'ın düzelttiği hâli.", "Amaretto with a little bourbon: Jeffrey Morgenthaler's fixed version."),
      v("Pisco Sour", "Güney Amerika kuzeni (bu kitapta ayrı sayfası var).", "The South American cousin (it has its own page in this book)."),
    ],
    tip: l("Yumurta istemiyorsan 20 ml nohut suyu (aquafaba) aynı köpüğü verir; tadı fark edilmez.", "If you'd rather skip egg, 20 ml of chickpea water (aquafaba) gives the same foam, and you won't taste it."),
  },

  sidecar: {
    history: [
      l("Birinci Dünya Savaşı'nın hemen ardından Paris'te ortaya çıktı; 1922'de iki kitapta birden yazıldı: Harry MacElhone'un 'ABC of Mixing Cocktails'ı ve Robert Vermeire'nin kitabı. Vermeire onu Paris'e, MacElhone ise Londra'daki Buck's Club'da McGarry adlı bir barmene bağlar. İsmin, bir askerin motosikletin yan sepetinde (sidecar) bara getirilmesinden geldiği anlatılır.",
        "It appeared in Paris just after the First World War and was printed in two books in 1922: Harry MacElhone's 'ABC of Mixing Cocktails' and Robert Vermeire's book. Vermeire places it in Paris; MacElhone credits a bartender named McGarry at Buck's Club in London. The name is said to come from an officer driven to the bar in a motorcycle sidecar."),
      l("Brandy Crusta'nın torunudur: konyak, portakal likörü, limon. İlk tarifler eşit üçlüydü (1:1:1); 1930'da Savoy Kitabı 2:1:1'e çekti ve daha kuru bu hâl bugün standarttır. Şekerli kenar daha sonraki bir moda.",
        "It is the grandchild of the Brandy Crusta: cognac, orange liqueur and lemon. The first recipes were equal parts (1:1:1); the Savoy Book of 1930 moved it to 2:1:1, and that drier version is the standard today. The sugared rim came later as a fashion."),
    ],
    steps: [
      l("İstersen kadehin dış kenarına ince şeker sür (yalnızca yarısına).", "If you like, coat half the outer rim with fine sugar."),
      l("Shaker'a konyak, portakal likörü ve limon suyunu koy.", "Put cognac, orange liqueur and lemon juice in the shaker."),
      l("Buzla 12 saniye çalkala.", "Shake with ice for 12 seconds."),
      l("Soğuk coupe'a çift süz; portakal kabuğunun yağını püskürt.", "Double-strain into a cold coupe and express an orange peel."),
    ],
    why: l("Sidecar ailesinin şablonudur: içki + ekşi + likör. Portakal likörü hem şeker hem aroma olduğu için ayrıca şurup gerekmez. Konyağın kuru üzüm ve meşe notaları, limonun keskinliğiyle hafifler; sonuç zarif, kuru ve meyveli bir kadehtir.",
      "It is the template of its family: spirit + sour + liqueur. The orange liqueur is both sugar and aroma, so no extra syrup is needed. Cognac's raisin and oak notes are lifted by the lemon; the result is elegant, dry and fruity."),
    variations: [
      v("Brandy Crusta", "Atası: maraschino, bitter, tüm kenarı saran limon kabuğu; New Orleans, 1850'ler.", "The ancestor: maraschino, bitters, a whole lemon peel lining the rim; New Orleans, 1850s."),
      v("Between the Sheets", "Konyak ve beyaz rom yarı yarıya.", "Cognac and white rum half and half."),
      v("Chelsea Sidecar", "Konyak yerine cin.", "Gin instead of cognac."),
    ],
    tip: l("VS yerine VSOP konyak kullan; Sidecar'da konyak gizlenmez, ne verirsen onu alırsın.", "Use a VSOP rather than a VS cognac; it cannot hide in a Sidecar."),
  },

  mojito: {
    history: [
      l("Kökü on altıncı yüzyıla, Francis Drake'in Havana açıklarında tayfasına verdiği iddia edilen 'El Draque'ye uzanır: aguardiente, nane, misket limonu ve şeker, hastalığa karşı. Bacardi'nin hafif beyaz romu on dokuzuncu yüzyılda bu ilkel içkiyi zarif bir highball'a dönüştürdü.",
        "Its roots reach back to the sixteenth century and 'El Draque', said to have been given by Francis Drake to his crew off Havana: aguardiente, mint, lime and sugar, against disease. Bacardí's light white rum in the nineteenth century turned this rough drink into an elegant highball."),
      l("Havana'daki La Bodeguita del Medio onu ünlü yaptı; duvardaki 'Mojito'm Bodeguita'da, Daiquiri'm Floridita'da' yazısı Hemingway'e atfedilir ama büyük olasılıkla bir reklam buluşudur. 2000'lerin başında bir James Bond filmiyle dünyanın en çok sipariş edilen kokteyllerinden biri oldu.",
        "Havana's La Bodeguita del Medio made it famous; the line on its wall, 'My Mojito in La Bodeguita, my Daiquiri in El Floridita', is credited to Hemingway but is most likely an advertising invention. In the early 2000s a James Bond film made it one of the world's most-ordered cocktails."),
    ],
    steps: [
      l("Highball bardağına nane yapraklarını ve şeker şurubunu koy.", "Put the mint leaves and syrup in a highball glass."),
      l("Naneyi ezmeden, yalnızca bastırarak hafifçe sık; yaprak parçalanırsa acılaşır.", "Press the mint gently without tearing it; shredded leaves turn bitter."),
      l("Misket limonu suyunu ve romu ekle, kırık buzla doldur.", "Add lime juice and rum and fill with crushed ice."),
      l("Bar kaşığıyla alttan yukarı karıştır, sodayla tamamla ve üste biraz daha buz koy.", "Churn from the bottom with a bar spoon, top with soda and crown with more ice."),
      l("Nane dalını avucunda bir kez şaplatıp kokusunu uyandır ve pipetin yanına yerleştir.", "Slap a mint sprig once in your palm to wake it and set it by the straw."),
    ],
    why: l("Bir Daiquiri'nin uzun, köpüklü hâlidir: rom, ekşi ve şeker; nane ferahlığı, soda hafifliği getirir. Kırık buz içkiyi çok soğuk tutar ve yavaşça seyreltir; nane yağları kabarcıklarla yükselip burna gelir, bu yüzden ilk koku her şeydir.",
      "It is a Daiquiri made long and sparkling: rum, sour and sugar, with mint for freshness and soda for lightness. Crushed ice keeps it very cold and dilutes it gently; the mint oils rise with the bubbles to the nose, so the first aroma is everything."),
    variations: [
      v("Royal Mojito", "Soda yerine şampanya.", "Champagne instead of soda."),
      v("Old Cuban", "Aged rom, nane, Angostura, üstü şampanya: Audrey Saunders, 2001.", "Aged rum, mint, Angostura, topped with Champagne: Audrey Saunders, 2001."),
      v("Virgin Mojito", "Romsuz; sodayı artır.", "Without rum; add more soda."),
    ],
    tip: l("Nane saplarını değil yaprakları kullan; saplar otsu ve acıdır.", "Use the leaves, not the stems; stems are grassy and bitter."),
  },

  gimlet: {
    history: [
      l("Gimlet'in hikâyesi İngiliz Donanması'nın iskorbütle savaşıdır. Gemilerde misket limonu suyu tayın olarak dağıtılıyordu; 1867'de İskoç Lauchlin Rose meyve suyunu alkolsüz, şekerle korumanın yolunu bulup patentini aldı. Subaylar bu Rose's Lime Cordial'ı cinlerine kattı.",
        "The Gimlet's story is the Royal Navy's fight against scurvy. Lime juice was issued as a ration aboard ships; in 1867 the Scot Lauchlin Rose patented a way to preserve it with sugar instead of alcohol. Officers mixed this Rose's Lime Cordial into their gin."),
      l("İsmin, tayfaya bu karışımı içiren donanma cerrahı Sir Thomas Gimlette'ten geldiği söylenir; ama Rose's ilk kez gemilere girdiğinde Gimlette on yaşındaydı. Belki de adı, fıçı açmakta kullanılan burgu (gimlet) aletinden gelir. İlk basılı tarif 1923'te Harry MacElhone'un kitabındadır: yarı cin, yarı Rose's.",
        "The name is said to come from the naval surgeon Sir Thomas Gimlette, who had the crew drink it; but Gimlette was about ten when Rose's first went aboard. It may instead come from the gimlet, the tool used to tap barrels. The first printed recipe is in Harry MacElhone's 1923 book: half gin, half Rose's."),
    ],
    steps: [
      l("Coupe'u soğut.", "Chill the coupe."),
      l("Shaker'a cin, taze misket limonu ve şeker şurubunu koy (ya da cin ve misket limonu kordiyali).", "Put gin, fresh lime and syrup in the shaker (or gin and lime cordial)."),
      l("Buzla 12 saniye çalkala.", "Shake with ice for 12 seconds."),
      l("Çift süz ve ince bir misket limonu dilimiyle servis et.", "Double-strain and serve with a thin lime wheel."),
    ],
    why: l("Bir cin ekşisidir, ama misket limonunun kabuk yağları sayesinde limonlu Daiquiri'den daha yeşil ve keskindir. Kordiyal ile yapılırsa şeker ve asit önceden birleştiği için içki daha yuvarlak, neredeyse şekerlemeli olur; taze limonla daha parlak.",
      "It is a gin sour, but the lime peel oils make it greener and sharper than a lemon sour. Made with cordial, sugar and acid are already married, so the drink is rounder, almost candied; with fresh lime it is brighter."),
    variations: [
      v("Navy Gimlet", "Navy Strength cin: donanmanın gücü.", "Navy strength gin: the navy's own strength."),
      v("Vodka Gimlet", "Elli ve altmışların Amerika'sının hâli.", "The version of fifties and sixties America."),
      v("Ev yapımı kordiyal", "Misket limonu kabuğu, şeker ve sitrik asit: bir gecede hazır.", "Lime peel, sugar and citric acid: ready overnight."),
    ],
    tip: l("Chandler'ın Philip Marlowe'u 'Gimlet yarı cin, yarı Rose's'tır, başka bir şey değil' der; tatlı seviyorsan bu klasik oranı bir kez dene.", "Chandler's Philip Marlowe says 'a real gimlet is half gin and half Rose's lime juice and nothing else'; if you like it sweet, try that classic ratio once."),
  },

  "french-75": {
    history: [
      l("Adını Birinci Dünya Savaşı'nın hızlı ateş eden Fransız 75 mm sahra topundan alır: 'tepeye vuran' bir içki. 1915 civarında Paris'teki New York Bar'da (sonraki adıyla Harry's) Harry MacElhone'un 'Soixante-Quinze' adlı cinli, kalvadoslu bir karışımından doğduğu anlatılır.",
        "It takes its name from the rapid-firing French 75 mm field gun of the First World War: a drink that 'hits like a shell'. It is said to have grown out of Harry MacElhone's 'Soixante-Quinze', a gin and calvados mix, at the New York Bar in Paris (later Harry's) around 1915."),
      l("Bugünkü hâli, cin, limon, şeker ve şampanya, 1927'de 'Here's How' kitabında ve 1930'da Savoy Kitabı'nda yazıldı. New Orleans'taki Arnaud's bunu konyakla yapar; iki ekol hâlâ tartışır.",
        "Today's form, gin, lemon, sugar and Champagne, was printed in 'Here's How' in 1927 and in the Savoy Book in 1930. Arnaud's in New Orleans makes it with cognac; the two schools still argue."),
    ],
    steps: [
      l("Flütü soğut, şampanyayı buz gibi tut.", "Chill the flute and keep the Champagne ice-cold."),
      l("Shaker'a cin, limon ve şeker şurubunu koy, buzla kısa çalkala.", "Shake gin, lemon and syrup briefly with ice."),
      l("Flüte süz.", "Strain into the flute."),
      l("Şampanyayı yavaşça, kadehi hafif eğerek ekle; karıştırma.", "Top slowly with Champagne, tilting the glass; do not stir."),
      l("Limon kabuğunun yağını püskürt ve bırak.", "Express a lemon peel and drop it in."),
    ],
    why: l("Tom Collins'in sodası yerine şampanya: aynı cinli ekşi, ama kabarcıklar daha ince ve şarabın brioche, elma notaları limonla buluşur. Şampanya içkiyi hem hafifletir hem güçlendirir; bu yüzden zararsız görünen ama 'top gibi vuran' bir kadehtir.",
      "Champagne instead of the Tom Collins's soda: the same gin sour, but finer bubbles, and the wine's brioche and apple notes meet the lemon. Champagne both lightens and strengthens the drink, which is why it looks harmless but 'fires like a gun'."),
    variations: [
      v("French 125", "Cin yerine konyak (Arnaud's usulü).", "Cognac instead of gin (the Arnaud's way)."),
      v("French 76", "Cin yerine votka.", "Vodka instead of gin."),
      v("Seventy Five, 1922", "Cin, kalvados, grenadin, absent: MacElhone'un ilk hâli.", "Gin, calvados, grenadine, absinthe: MacElhone's first version."),
    ],
    tip: l("Şampanya yerine iyi bir crémant ya da kuru cava da çok iyi çalışır; önemli olan kuru (brut) ve soğuk olması.", "A good crémant or dry cava works beautifully instead of Champagne; what matters is that it is brut and cold."),
  },

  "tom-collins": {
    history: [
      l("Londra'daki Limmer's Oteli'nin baş garsonu John Collin'in on dokuzuncu yüzyıl başında yaptığı cinli punch'tan geldiği düşünülür; tatlı Old Tom cini kullanılınca 'Tom Collins'e dönüştü. 1874'te New York'ta büyük bir şaka yaşandı: insanlar arkadaşlarına 'Tom Collins diye biri senin hakkında konuşuyor, köşedeki barda' diyor, kurban da barda Tom Collins'i arıyordu.",
        "It is thought to come from the gin punch of John Collin, head waiter at Limmer's Hotel in London in the early nineteenth century; made with sweet Old Tom gin it became the 'Tom Collins'. In 1874 New York had a great hoax: people told friends 'a Tom Collins is talking about you at the bar round the corner', and the victim went looking for Tom Collins in the bar."),
      l("Barmenler bu şakadan yararlanıp aynı adı taşıyan içkiyi hazırladı; Jerry Thomas 1876'da yazdı. Uzun, ince 'Collins' bardağı adını bu içkiden alır.",
        "Bartenders cashed in on the hoax with a drink of the same name; Jerry Thomas printed it in 1876. The tall, narrow 'Collins' glass is named after it."),
    ],
    steps: [
      l("Shaker'a cin, limon ve şeker şurubunu koy, buzla kısa çalkala.", "Shake gin, lemon and syrup briefly with ice."),
      l("Uzun buz bloğu ya da küplerle dolu Collins bardağına süz.", "Strain into a Collins glass filled with a long ice spear or cubes."),
      l("Soğuk sodayla tamamla, bir kez nazikçe karıştır.", "Top with cold soda and give one gentle stir."),
      l("Limon dilimi ve kirazla süsle.", "Garnish with a lemon wheel and a cherry."),
    ],
    why: l("Bir cinli ekşinin sodayla uzatılmış hâlidir; soda alkolü ve şekeri aynı oranda seyrelttiği için denge bozulmaz, yalnızca hafifler. Uzun buz bloğu yüzeyi az olduğu için yavaş erir ve kabarcıkları korur.",
      "It is a gin sour lengthened with soda; because soda dilutes alcohol and sugar equally, the balance holds and only lightens. A long ice spear has little surface, so it melts slowly and keeps the bubbles."),
    variations: [
      v("John Collins", "Hollanda cini (genever) ya da bourbon.", "Dutch genever or bourbon."),
      v("Vodka Collins", "Cin yerine votka.", "Vodka instead of gin."),
      v("Gin Fizz", "Aynı malzemeler, buzsuz ve daha az soda, kısa bardakta; hızlı içilir.", "The same ingredients, no ice and less soda, in a short glass; drunk fast."),
    ],
    tip: l("Sodayı yeni açılmış, çok soğuk şişeden ekle; ılık soda kabarcığını hemen kaybeder.", "Add soda from a freshly opened, very cold bottle; warm soda loses its fizz at once."),
  },

  americano: {
    history: [
      l("1860'larda Gaspare Campari'nin Milano'daki barında ortaya çıktı: Milano'nun Campari'si ve Torino'nun vermutu, adıyla 'Milano-Torino'. Soda eklenince yazın içilen bir aperatife dönüştü. 'Americano' adının, Yasak yıllarında İtalya'ya akın eden ve bu hafif içkiyi seven Amerikalı turistlerden geldiği söylenir.",
        "It appeared in the 1860s at Gaspare Campari's bar in Milan: Campari from Milan and vermouth from Turin, hence 'Milano-Torino'. With soda it became a summer aperitif. The name 'Americano' is said to come from the American tourists who flocked to Italy during Prohibition and loved this light drink."),
      l("Negroni onun cinli torunudur. Ian Fleming, 1953'teki ilk romanı Casino Royale'de James Bond'a ilk içkisi olarak Americano'yu sipariş ettirir.",
        "The Negroni is its gin-laced grandchild. In Casino Royale, his first novel in 1953, Ian Fleming has James Bond order an Americano as his very first drink."),
    ],
    steps: [
      l("Highball bardağını buzla doldur.", "Fill a highball glass with ice."),
      l("Campari ve tatlı vermutu ekle, kısaca karıştır.", "Add Campari and sweet vermouth and stir briefly."),
      l("Soğuk sodayla tamamla.", "Top with cold soda."),
      l("Portakal dilimi (ya da limon kabuğu) ile süsle.", "Garnish with an orange slice (or a lemon peel)."),
    ],
    why: l("Acı ve tatlının eşit dengesi, sodayla uzatılınca neredeyse bir limonata kadar hafifler: yaklaşık %7–8 alkol. Acılık iştah açar; bu yüzden İtalyan aperitivo'sunun kalbidir.",
      "The equal balance of bitter and sweet, lengthened with soda, becomes almost as light as a lemonade: around 7–8% ABV. Bitterness opens the appetite, which is why it sits at the heart of the Italian aperitivo."),
    variations: [
      v("Milano-Torino", "Sodasız, buzlu: orijinal.", "Without soda, on ice: the original."),
      v("Negroni", "Soda yerine cin.", "Gin instead of soda."),
      v("Garibaldi", "Campari ve taze sıkılmış, köpürtülmüş portakal suyu.", "Campari with fresh, fluffy orange juice."),
    ],
    tip: l("Bardağı sodayla değil, buzla doldurmaya başla; ne kadar çok buz, o kadar yavaş erime.", "Start by filling the glass with ice, not soda; the more ice, the slower the melt."),
  },

  boulevardier: {
    history: [
      l("Paris'te yaşayan Amerikalı yazar ve yayıncı Erskine Gwynne'in içkisidir; 'Boulevardier' onun çıkardığı aylık derginin adıydı. Tarif 1927'de Harry MacElhone'un 'Barflies and Cocktails' kitabında, Harry's New York Bar'ın müdavimlerine ayrılmış bölümde yer aldı.",
        "It was the drink of Erskine Gwynne, an American writer and publisher living in Paris; 'The Boulevardier' was the name of his monthly magazine. The recipe appeared in Harry MacElhone's 1927 'Barflies and Cocktails', in the section about the regulars of Harry's New York Bar."),
      l("Uzun süre unutuldu; 2000'lerde Negroni yeniden popüler olunca onun bourbonlu, sonbahar kuzeni olarak barlara geri döndü.",
        "It was long forgotten; when the Negroni became popular again in the 2000s, it returned to bars as its bourbon-laced autumn cousin."),
    ],
    steps: [
      l("Karıştırma bardağına bourbon, Campari ve tatlı vermutu koy.", "Pour bourbon, Campari and sweet vermouth into a mixing glass."),
      l("Buzla 25 saniye karıştır.", "Stir with ice for 25 seconds."),
      l("Büyük buzlu rocks bardağına ya da soğuk coupe'a süz.", "Strain into a rocks glass with a big cube or into a cold coupe."),
      l("Portakal kabuğunun yağını püskürt.", "Express an orange peel."),
    ],
    why: l("Bourbonun vanilyası ve karameli, Campari'nin acısını cinden daha sıcak bir şekilde sarar. Viski biraz fazla (4:3:3) tutulursa omurga güçlenir ve içki Negroni'den daha az tatlı, daha derin olur.",
      "Bourbon's vanilla and caramel wrap Campari's bitterness more warmly than gin. With a little more whiskey (4:3:3) the backbone strengthens, and the drink is less sweet and deeper than a Negroni."),
    variations: [
      v("Old Pal", "Çavdar viskisi ve kuru vermut: daha kuru kardeşi.", "Rye and dry vermouth: the drier sibling."),
      v("Rye Boulevardier", "Bourbon yerine çavdar: baharatlı.", "Rye instead of bourbon: spicier."),
    ],
    tip: l("Kışın bir damla Angostura ya da kakao bitteri ekle; içki şömine başına yakışır.", "In winter add a dash of Angostura or chocolate bitters; it suits a fireside."),
  },

  "moscow-mule": {
    history: [
      l("1941'de Los Angeles'taki Cock 'n' Bull barında doğdu. Üç satamadığı ürünü olan üç adam buluştu: Smirnoff'un haklarını almış ama Amerikalılara votka satamayan John G. Martin, kendi zencefil birasını satamayan bar sahibi Jack Morgan ve (anlatıldığına göre) bakır kupalarla dolu bir depoyla gelen Sophie Berezinski.",
        "It was born in 1941 at the Cock 'n' Bull in Los Angeles. Three people met, each with something they could not sell: John G. Martin, who had bought Smirnoff but could not sell vodka to Americans; the bar owner Jack Morgan, with his own ginger beer; and (so the story goes) Sophie Berezinski, with a warehouse full of copper mugs."),
      l("Martin yeni çıkan Polaroid fotoğraf makinesiyle barmenleri kupayı tutarken çekip bir sonraki bara götürdü: ilk viral pazarlama kampanyalarından biri. Moscow Mule Amerika'yı votkaya alıştırdı.",
        "Martin photographed bartenders holding the mug with the new Polaroid camera and showed the pictures at the next bar: one of the first viral marketing campaigns. The Moscow Mule taught America to drink vodka."),
    ],
    steps: [
      l("Bakır kupayı buzla doldur.", "Fill the copper mug with ice."),
      l("Votka ve misket limonu suyunu ekle.", "Add vodka and lime juice."),
      l("Sert, acılı bir zencefil birasıyla tamamla.", "Top with a fiery ginger beer."),
      l("Bir kez karıştır, misket limonu dilimi ekle.", "Stir once and add a lime wheel."),
    ],
    why: l("Votka nötrdür; tadı zencefil birasının acısı ve misket limonunun asidi taşır. Bakır kupa ısıyı hızla iletir: elinde buz gibi hissedilir ve içkinin soğuk olduğu algısını güçlendirir.",
      "Vodka is neutral; the flavour is carried by the ginger beer's heat and the lime's acid. The copper mug conducts heat quickly: it feels ice-cold in the hand and heightens the sense of a cold drink."),
    variations: [
      v("Kentucky Mule", "Bourbon.", "Bourbon."),
      v("Mexican Mule", "Tekila.", "Tequila."),
      v("Dark 'n' Stormy", "Koyu rom: Bermuda kuzeni (bu kitapta ayrı sayfası var).", "Dark rum: the Bermudan cousin (it has its own page in this book)."),
    ],
    tip: l("Zencefil birası (ginger beer) ile zencefilli gazoz (ginger ale) aynı şey değildir: Mule'ün acısı biradan gelir.", "Ginger beer and ginger ale are not the same: the Mule's bite comes from the beer."),
  },

  paloma: {
    history: [
      l("Meksika'da en çok içilen tekila kokteyli Margarita değil, Paloma'dır; ama kökeni sisler içindedir. Sık anlatılan hikâye onu Tequila kasabasındaki La Capilla barının sahibi Don Javier Delgado Corona'ya bağlar; oysa Don Javier'in kendisi bunu kabul etmemiştir. 1953 tarihli bir 'Rio Grande kokteylleri' broşürü de ilk kaynak diye anılır, ama bu broşürün hiçbir kütüphanede izine rastlanmamıştır.",
        "Mexico's most-drunk tequila cocktail is not the Margarita but the Paloma, yet its origin is lost in fog. The common story links it to Don Javier Delgado Corona of La Capilla in the town of Tequila, but Don Javier himself denied it. A 1953 'Rio Grande cocktails' pamphlet is often cited as the first source, though no trace of it has been found in any collection."),
      l("Kesin olan şu: 1938'de Meksika'ya gelen Squirt greyfurt gazozu sayesinde halkın içkisi oldu. Adı 'güvercin' demek; belki de on dokuzuncu yüzyılın ünlü 'La Paloma' şarkısından.",
        "What is certain is that it became the people's drink thanks to Squirt grapefruit soda, which arrived in Mexico in 1938. Its name means 'dove', perhaps after the famous nineteenth-century song 'La Paloma'."),
    ],
    steps: [
      l("Highball bardağının kenarını misket limonuyla ıslatıp tuza batır.", "Wet the rim of a highball glass with lime and dip it in salt."),
      l("Bardağı buzla doldur; tekila, misket limonu, greyfurt suyu ve şurubu ekle.", "Fill with ice; add tequila, lime, grapefruit juice and syrup."),
      l("Sodayla tamamla ve bir kez karıştır.", "Top with soda and stir once."),
      l("Greyfurt ya da misket limonu dilimiyle süsle.", "Garnish with a grapefruit or lime wedge."),
    ],
    why: l("Greyfurtun hafif acılığı tekilanın otsu agavesiyle akrabadır; tuz o acıyı yumuşatıp meyveyi öne çıkarır. Uzun, gazlı ve az şekerli olduğu için sıcak bir öğleden sonra en çok içilebilen tekila içkisidir.",
      "Grapefruit's gentle bitterness is kin to tequila's grassy agave; salt softens that bitterness and lifts the fruit. Long, fizzy and low in sugar, it is the most drinkable tequila drink on a hot afternoon."),
    variations: [
      v("Klasik Meksika usulü", "Tekila, bir tutam tuz, misket limonu ve greyfurtlu gazoz.", "Tequila, a pinch of salt, lime and grapefruit soda."),
      v("Mezcal Paloma", "Dumanlı.", "Smoky."),
      v("Batanga", "Greyfurt yerine kola: Don Javier'in kendi icadı.", "Cola instead of grapefruit: Don Javier's own invention."),
    ],
    tip: l("Pembe greyfurt daha tatlı, beyaz greyfurt daha acıdır; şurubu buna göre ayarla.", "Pink grapefruit is sweeter and white grapefruit more bitter; adjust the syrup accordingly."),
  },

  "aperol-spritz": {
    history: [
      l("Spritz on dokuzuncu yüzyılda Veneto'yu yöneten Avusturyalı askerlerden kalmadır: yerel şaraplar onlara ağır geldiği için 'spritzen', yani su püskürterek hafifletirlerdi. Aperol ise 1919'da Padova'da Barbieri kardeşler tarafından hafif (%11) bir aperatif olarak yaratıldı.",
        "The spritz is a legacy of the Austrian soldiers who ruled the Veneto in the nineteenth century: finding local wines too strong, they lightened them by 'spritzen', spraying in water. Aperol was created in Padua in 1919 by the Barbieri brothers as a light (11%) aperitif."),
      l("1950'lerde reklamlar '3-2-1' formülünü yaydı: üç ölçü prosecco, iki Aperol, bir soda. 2003'te markayı alan Campari Grubu'nun kampanyalarıyla 2000'lerde turuncu kadeh dünyanın her terasına ulaştı.",
        "In the 1950s advertising spread the '3-2-1' formula: three parts prosecco, two Aperol, one soda. After the Campari Group bought the brand in 2003, its campaigns carried the orange glass to every terrace in the world in the 2000s."),
    ],
    steps: [
      l("Büyük şarap kadehini buzla doldur.", "Fill a large wine glass with ice."),
      l("Önce prosecco'yu dök (Aperol dibe çökmesin diye).", "Pour the prosecco first (so the Aperol does not sink to the bottom)."),
      l("Aperol'ü ekle, üstünü bir parça sodayla tamamla.", "Add the Aperol and top with a splash of soda."),
      l("Bir kez karıştır, portakal dilimiyle süsle.", "Stir once and garnish with an orange slice."),
    ],
    why: l("Aperol'ün portakal ve ravent acısı, prosecco'nun meyveli tatlılığıyla buluşur; soda ikisini hafifletir. Toplam alkol %8–9 civarındadır: uzun bir öğleden sonra boyunca içilebilir, acılığı da iştah açar.",
      "Aperol's orange and rhubarb bitterness meets prosecco's fruity sweetness, and soda lightens both. The whole is around 8–9% ABV: drinkable through a long afternoon, its bitterness opening the appetite."),
    variations: [
      v("Spritz Veneziano", "Aperol yerine Select (Venedik'in kendi kırmızı aperatifi), zeytinle.", "Select (Venice's own red aperitif) instead of Aperol, with an olive."),
      v("Campari Spritz", "Daha acı ve koyu.", "More bitter and darker."),
      v("Hugo", "Mürver çiçeği ve nane: Güney Tirol'ün cevabı (bu kitapta ayrı sayfası var).", "Elderflower and mint: South Tyrol's answer (it has its own page in this book)."),
    ],
    tip: l("Kadehi buzla ağzına kadar doldur; az buz hızla erir ve spritz sulu kalır.", "Fill the glass to the brim with ice; too little ice melts fast and leaves a watery spritz."),
  },

  "espresso-martini": {
    history: [
      l("1983 civarında Londra'nın Soho Brasserie'sinde Dick Bradsell'in barına bir model geldi ve 'beni uyandıracak, sonra da kendimden geçirecek' bir içki istedi. Barın kahve makinesi tam yanındaydı: votka, taze espresso, kahve likörü ve şeker. Bradsell'in barmenliği bir kuşağı etkiledi.",
        "Around 1983 at London's Soho Brasserie, a model walked up to Dick Bradsell's bar and asked for a drink that would 'wake me up, and then mess me up'. The coffee machine sat right beside him: vodka, fresh espresso, coffee liqueur and sugar. Bradsell's bartending shaped a generation."),
      l("İlk adı 'Vodka Espresso'ydu, sonra 'Pharmaceutical Stimulant' oldu; Martini kadehinde servis edilince bugünkü adını aldı. 2020'lerde sosyal medyayla yeniden dünyanın en çok sipariş edilen kokteylleri arasına girdi.",
        "It was first called the 'Vodka Espresso', then the 'Pharmaceutical Stimulant'; served in a Martini glass, it took its current name. In the 2020s social media put it back among the world's most-ordered cocktails."),
    ],
    steps: [
      l("Espressoyu taze çek ve birkaç dakika soğumaya bırak.", "Pull the espresso fresh and let it cool for a few minutes."),
      l("Shaker'a votka, espresso, kahve likörü ve biraz şurup koy.", "Put vodka, espresso, coffee liqueur and a little syrup in the shaker."),
      l("Bol buzla 15 saniye çok sert çalkala: köpük buradan gelir.", "Shake very hard with plenty of ice for 15 seconds: the foam comes from this."),
      l("Soğuk kadehe çift süz, köpüğün üstüne üç kahve çekirdeği koy.", "Double-strain into a cold glass and set three coffee beans on the foam."),
    ],
    why: l("Taze espressonun yağları ve doğal köpüğü, sert çalkalamayla birleşip kremamsı bir başlık oluşturur; yumurta ya da krema gerekmez. Kahvenin acılığını kahve likörünün tatlılığı dengeler, votka ise gövde verip tadı örtmez.",
      "The oils and natural crema of fresh espresso, whipped by a hard shake, form a creamy head; no egg or cream is needed. Coffee liqueur's sweetness balances the coffee's bitterness, and vodka gives body without masking the flavour."),
    variations: [
      v("Tequila Espresso", "Reposado tekila: karamelli.", "Reposado tequila: caramel notes."),
      v("Espresso Martini Rum", "Aged rom.", "Aged rum."),
      v("Cold brew", "Espresso yerine soğuk demleme: daha yumuşak, daha az köpük.", "Cold brew instead of espresso: smoother, less foam."),
    ],
    tip: l("Üç kahve çekirdeği geleneksel olarak sağlık, mutluluk ve zenginlik demektir; İtalya'daki 'con la mosca' sambuca geleneğinden gelir.", "The three coffee beans traditionally stand for health, happiness and wealth, borrowed from Italy's sambuca 'con la mosca'."),
  },
};
