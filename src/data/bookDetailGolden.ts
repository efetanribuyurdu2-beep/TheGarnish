/** The Cocktail Book in depth: the golden age and Prohibition. */
import { l, v, type BookDetail } from "./bookDetailTypes";

export const GOLDEN: Record<string, BookDetail> = {
  sazerac: {
    history: [
      l("New Orleans'ın resmî kokteylidir (2008'den beri yasayla). Hikâye 1830'larda Fransız Mahallesi'nde eczane işleten Haitili Antoine Peychaud ile başlar: kendi yaptığı anasonlu kırmızı bitteri konyağa katıp müşterilerine sunardı. İçki, Sazerac-de-Forge konyağını satan Sazerac Coffee House'ta adını ve ününü buldu.",
        "It is New Orleans's official cocktail (by law since 2008). The story begins in the 1830s with Antoine Peychaud, a Haitian-born apothecary in the French Quarter who served his own red, anise-scented bitters in cognac. The drink found its name and fame at the Sazerac Coffee House, which sold Sazerac-de-Forge cognac."),
      l("1870'lerde filoksera Fransız bağlarını yok edince konyak kıtlaştı ve yerini Amerikan çavdar viskisi aldı. Kadehi çalkalayan absent 1912'deki yasakla raflardan inince New Orleans'ta yapılan Herbsaint onun yerine geçti.",
        "When phylloxera destroyed French vineyards in the 1870s, cognac grew scarce and American rye took its place. When the absinthe that rinses the glass was banned in 1912, Herbsaint, made in New Orleans, stood in for it."),
    ],
    steps: [
      l("Servis bardağını buzla doldurup soğumaya bırak.", "Fill the serving glass with ice and leave it to chill."),
      l("Karıştırma bardağına çavdar viskisi, şeker şurubu ve Peychaud's bitteri (ya da Angostura) koy, buzla 30 saniye karıştır.", "In a mixing glass, stir rye, syrup and Peychaud's bitters (or Angostura) with ice for 30 seconds."),
      l("Servis bardağındaki buzu boşalt, birkaç damla absent dök, bardağı döndürerek iç yüzeyi kapla ve fazlasını at.", "Empty the serving glass, add a few drops of absinthe, swirl to coat the inside and discard the excess."),
      l("Viskiyi buzsuz bardağa süz.", "Strain the whisky into the ice-free glass."),
      l("Limon kabuğunun yağını üstüne püskürt ve kabuğu at; bardağa girmez.", "Express a lemon peel over the top and discard it; it does not go in the glass."),
    ],
    why: l("Bir Old Fashioned'ın Creole akrabasıdır, ama absent hiç içilmeden yalnızca koku olarak oradadır: her yudumda burna anason ve otlar gelir, damakta ise çavdarın baharatı. Buzsuz servis içkiyi yoğun ve ısınınca açılan bir hâlde tutar.",
      "It is a Creole relative of the Old Fashioned, but the absinthe is there only as a scent: anise and herbs reach the nose with each sip while the palate tastes rye spice. Served without ice it stays concentrated and opens as it warms."),
    variations: [
      v("Konyaklı Sazerac", "Orijinal 1850'ler hâli.", "The original 1850s version."),
      v("Yarı yarıya", "Çavdar ve konyak birlikte: bugün New Orleans'ta çok sevilir.", "Rye and cognac together: much loved in New Orleans today."),
      v("Vieux Carré", "Çavdar, konyak, tatlı vermut, Bénédictine: Hotel Monteleone, 1938.", "Rye, cognac, sweet vermouth, Bénédictine: Hotel Monteleone, 1938."),
    ],
    tip: l("Kabuğu içkiye bırakma: Sazerac'ta limon sadece yağıyla vardır, kabuk bırakılırsa acılaşır.", "Do not drop the peel in: in a Sazerac the lemon is there only as oil, and a peel left in turns it bitter."),
  },

  "bees-knees": {
    history: [
      l("'The bee's knees', 1920'lerin Amerikan argosunda 'harika, en iyisi' demekti. Kokteylin kim tarafından yapıldığı tartışmalıdır: 1929 tarihli 'Cocktails de Paris' onu Paris'teki Ritz'in baş barmeni Frank Meier'e atfeder, Meier de 1936'daki kitabında kendi tariflerinden biri olarak işaretler. Aynı yıl bir gazete makalesi ise onu Titanik'ten kurtulan Margaret 'Molly' Brown'a bağlar.",
        "'The bee's knees' was 1920s American slang for 'the very best'. Who made the cocktail is disputed: the 1929 'Cocktails de Paris' credits Frank Meier, head bartender at the Ritz in Paris, and Meier marked it as one of his own in his 1936 book. A newspaper article of the same year links it to Margaret 'Molly' Brown, the Titanic survivor."),
      l("Yaygın bir açıklama, balın ve limonun Yasak döneminin kötü 'küvet cinini' örtmek için kullanıldığıdır; bu kısmen doğru olsa da Bee's Knees'in ilk kayıtları Paris'tedir. Belki de Meier onu Ritz'in müdavimi olan Brown için yaptı.",
        "A common explanation is that honey and lemon masked Prohibition's rough 'bathtub gin'; that may be partly true, but the earliest records of the Bee's Knees are in Paris. Perhaps Meier made it for Brown, a regular at the Ritz."),
    ],
    steps: [
      l("Balı aynı miktar ılık suyla karıştırarak bal şurubu yap; katı bal soğuk cinde çözülmez.", "Make honey syrup by mixing honey with an equal amount of warm water; thick honey will not dissolve in cold gin."),
      l("Shaker'a cin, limon ve bal şurubunu koy.", "Put gin, lemon and honey syrup in the shaker."),
      l("Buzla 12 saniye sert çalkala.", "Shake hard with ice for 12 seconds."),
      l("Soğuk kadehe (Jazz Bar'da fincana) çift süz; limon kabuğunun yağını püskürt.", "Double-strain into a cold glass (a teacup in the Jazz Bar) and express a lemon peel."),
    ],
    why: l("Bal, şekerden daha karmaşık bir tatlılıktır: çiçek, mum ve hafif tuzlu bir derinlik taşır. Cinin ardıcı ve limonun keskinliğiyle buluşunca şeker şuruplu bir ekşiden daha yuvarlak ve kokulu bir kadeh çıkar.",
      "Honey is a more complex sweetness than sugar, carrying flowers, wax and a faintly saline depth. With gin's juniper and lemon's sharpness it makes a rounder, more fragrant glass than a sour with sugar syrup."),
    variations: [
      v("Gold Rush", "Cin yerine bourbon: T.J. Siegal, Milk & Honey, 2000'ler.", "Bourbon instead of gin: T.J. Siegal, Milk & Honey, 2000s."),
      v("Brown Derby", "Bourbon, greyfurt ve bal.", "Bourbon, grapefruit and honey."),
      v("Lavanta Bee's Knees", "Bal şurubuna lavanta demlenmiş.", "Honey syrup infused with lavender."),
    ],
    tip: l("Çiçek balı kullan; kestane ya da çam balı çok baskın olup cini örter.", "Use a flower honey; chestnut or pine honey is too strong and buries the gin."),
  },

  aviation: {
    history: [
      l("New York'taki Hotel Wallick'in barmeni Hugo Ensslin, 1916'daki 'Recipes for Mixed Drinks' kitabında yazdı: cin, maraschino, menekşe likörü (crème de violette) ve limon. Kadehin soluk lila-mavi rengi gökyüzünü, adı da o yılların büyüsü olan havacılığı anıyordu.",
        "Hugo Ensslin, bartender at New York's Hotel Wallick, printed it in his 1916 'Recipes for Mixed Drinks': gin, maraschino, crème de violette and lemon. The pale lilac-blue of the glass recalled the sky, and its name the great fascination of those years, flight."),
      l("1930'da Savoy Kitabı menekşeyi tariften düşürdü ve Aviation onlarca yıl gri-beyaz bir ekşi olarak kaldı. Menekşe likörü Amerika'da bulunmaz oldu; 2007'de Rothman & Winter yeniden ithal edince gökyüzü rengi barlara geri döndü.",
        "In 1930 the Savoy Book dropped the violette, and for decades the Aviation stayed a grey-white sour. Crème de violette vanished from America; when Rothman & Winter imported it again in 2007, the sky colour returned to bars."),
    ],
    steps: [
      l("Coupe'u soğut.", "Chill the coupe."),
      l("Shaker'a cin, maraschino, menekşe likörü ve limonu koy.", "Put gin, maraschino, crème de violette and lemon in the shaker."),
      l("Buzla 12 saniye çalkala.", "Shake with ice for 12 seconds."),
      l("Çift süz; kadehin dibine bir maraschino kirazı bırak.", "Double-strain and sink a maraschino cherry in the glass."),
    ],
    why: l("Sidecar ailesine yakındır: içki, ekşi ve likör, ama burada iki likör var. Maraschino'nun bademli, vişneli kuruluğu tatlılığı taşır; menekşe yalnızca renk ve çiçek kokusu verir. Az kullanılmalıdır: fazlası sabun gibi kokar.",
      "It sits near the Sidecar family: spirit, sour and liqueur, but here with two liqueurs. Maraschino's almond-cherry dryness carries the sweetness; the violette adds only colour and a floral scent. Use it sparingly: too much smells like soap."),
    variations: [
      v("Savoy hâli", "Menekşesiz: cin, maraschino, limon.", "Without violette: gin, maraschino, lemon."),
      v("Blue Moon", "Cin, menekşe ve limon; maraschinosuz.", "Gin, violette and lemon; no maraschino."),
      v("Moonlight", "Biraz yumurta akıyla köpüklü.", "Frothy with a little egg white."),
    ],
    tip: l("Menekşe likörünü yarım barspoon'dan başlat; renk soluk lila olmalı, mor değil.", "Start the violette at half a bar spoon; the colour should be pale lilac, not purple."),
  },

  "mary-pickford": {
    history: [
      l("Yasak yıllarında Amerikalılar içmek için Havana'ya akın ediyordu; Hollywood'un 'Amerika'nın Sevgilisi' Mary Pickford'un adını taşıyan bu kokteyl o dönemin Havana barlarından çıktı. 1928'de Basil Woon'un 'When It's Cocktail Time in Cuba' kitabı onu Sevilla Oteli'nin baş barmeni İngiliz Fred Kaufman'a atfeder; 1950'lerden beri anılan diğer aday, Jockey Bar'ın New Yorklu barmeni Eddie Woelke'dir.",
        "During Prohibition, Americans flocked to Havana to drink, and this cocktail, named for Hollywood's 'America's Sweetheart' Mary Pickford, came out of the bars of that era. Basil Woon's 1928 'When It's Cocktail Time in Cuba' credits Fred Kaufman, the English head bartender of the Sevilla Hotel; the other candidate, named since the 1950s, is Eddie Woelke, the New Yorker who ran the Jockey Bar."),
      l("Pickford'un Douglas Fairbanks ve Charlie Chaplin'le Küba'da film çekerken içtiği hikâyesi çok anlatılır; ama araştırmalar böyle bir yolculuğun olmadığını gösteriyor. 1928'deki ilk tarif üçte iki ananas, üçte bir Bacardi ve bir damla grenadindir; maraschino sonradan eklendi.",
        "The story of Pickford drinking it while filming in Cuba with Douglas Fairbanks and Charlie Chaplin is often told, but research shows no such trip took place. The 1928 recipe is two-thirds pineapple, one-third Bacardí and a dash of grenadine; maraschino came later."),
    ],
    steps: [
      l("Shaker'a beyaz rom, taze ananas suyu, maraschino ve grenadini koy.", "Put white rum, fresh pineapple juice, maraschino and grenadine in the shaker."),
      l("Buzla 15 saniye sert çalkala: ananas köpürür.", "Shake hard with ice for 15 seconds: pineapple foams."),
      l("Soğuk coupe'a çift süz.", "Double-strain into a cold coupe."),
      l("Kirazla süsle.", "Garnish with a cherry."),
    ],
    why: l("Ananas hem tatlı hem asitlidir ve doğal proteinleri sayesinde çalkalanınca ince bir köpük verir. Bu yüzden ayrıca şurup ya da limon gerekmez; grenadin pembe renk ve nar tatlılığı, maraschino ise kuru bir badem notası ekler.",
      "Pineapple is both sweet and acidic and, thanks to its natural proteins, gives a fine foam when shaken. So no extra syrup or citrus is needed; grenadine adds the pink colour and pomegranate sweetness, maraschino a dry almond note."),
    variations: [
      v("1928 hâli", "Maraschinosuz, üçte iki ananas.", "No maraschino, two-thirds pineapple."),
      v("El Presidente", "Rom, Fransız vermutu, curaçao ve grenadin: aynı yılların Havana klasiği.", "Rum, French vermouth, curaçao and grenadine: a Havana classic of the same years."),
      v("Hotel Nacional Special", "Rom, ananas, kayısı likörü, misket limonu.", "Rum, pineapple, apricot liqueur and lime."),
    ],
    tip: l("Kutu ananas suyu değil, taze sıkılmış ya da soğuk preslenmiş ananas kullan; köpük ve canlılık oradan gelir.", "Use fresh-pressed pineapple, not canned juice; the foam and liveliness come from it."),
  },

  southside: {
    history: [
      l("En bilinen hikâyeye göre Yasak döneminde Chicago'nun Güney Yakası'nda Al Capone'un çetesi kötü cini limon, şeker ve naneyle içilir hâle getiriyordu. Ama bilinen en eski tarif 1917'de, Hugo Ensslin'in kitabındadır; yani Yasak'tan önce.",
        "In the best-known story, Al Capone's gang on Chicago's South Side made bad Prohibition gin drinkable with lemon, sugar and mint. But the oldest known recipe is in Hugo Ensslin's 1917 book, before Prohibition."),
      l("Bir başka güçlü aday, 1886'da kurulan Long Island'daki Southside Sportsmen's Club'dır: 1941'de Town & Country dergisi, kulübün 'naneli bir Tom Collins' olan Southside'ını anlatır. New York'taki 21 Club onu en çok ünlendiren yerdir.",
        "Another strong candidate is the Southside Sportsmen's Club on Long Island, founded in 1886: in 1941 Town & Country described the club's Southside, 'a mint-flavoured Tom Collins'. New York's 21 Club did most to make it famous."),
    ],
    steps: [
      l("Shaker'a 6–8 nane yaprağını koy, üstüne cin, misket limonu ve şurubu ekle.", "Put 6–8 mint leaves in the shaker and add gin, lime and syrup."),
      l("Naneyi ezme; buzla birlikte 12 saniye çalkala, nane çalkalanırken kendiliğinden açılır.", "Do not muddle; shake with ice for 12 seconds, and the mint opens as it is shaken."),
      l("İnce süzgeçten soğuk coupe'a çift süz, nane parçası kalmasın.", "Fine-strain into a cold coupe so no mint bits remain."),
      l("Bir nane yaprağını yüzeye yatır.", "Float a single mint leaf on top."),
    ],
    why: l("Cinli bir Daiquiri'ye nane eklenmiş hâlidir. Cinin ardıcı ve kişnişi naneyle akraba bitkilerdir, bu yüzden nane yabancı durmaz, cinin içinden çıkıyormuş gibi gelir. Çalkalamak nane yağlarını ezmeden serbest bırakır.",
      "It is a gin Daiquiri with mint. Gin's juniper and coriander are kin to mint, so the mint does not feel foreign but seems to rise from inside the gin. Shaking releases the mint oils without crushing the leaves."),
    variations: [
      v("Southside Fizz", "Uzun bardakta sodayla.", "Long, with soda."),
      v("Eastside", "Salatalık dilimleriyle: George Delgado.", "With cucumber slices: George Delgado."),
      v("Southside Royale", "Üstü şampanya.", "Topped with Champagne."),
    ],
    tip: l("21 Club limonla yapar, diğerleri misket limonuyla; ikisini de dene, limon daha yumuşak, misket daha yeşil.", "The 21 Club makes it with lemon, others with lime; try both: lemon is softer, lime greener."),
  },

  "hanky-panky": {
    history: [
      l("Londra'daki Savoy Oteli'nin American Bar'ında 1903–1926 arası baş barmenlik yapan Ada 'Coley' Coleman, dönemin tek kadın baş barmenlerinden biriydi. Ünlü oyuncu Sir Charles Hawtrey yorgun bir akşam ondan 'biraz sertçe' bir şey istedi; Coley ona cin, tatlı vermut ve birkaç damla Fernet-Branca karıştırdı.",
        "Ada 'Coley' Coleman, head bartender of the American Bar at London's Savoy from 1903 to 1926, was one of the few women ever to hold such a post. The actor Sir Charles Hawtrey, tired one evening, asked her for something 'with a bit of punch in it'; Coley mixed him gin, sweet vermouth and a few dashes of Fernet-Branca."),
      l("Hawtrey bir yudum alıp 'Vay canına! Bu gerçek bir hanky-panky!' (tam bir hokus pokus) dedi. Tarif 1930'da Coley'nin halefi Harry Craddock'un Savoy Kitabı'na girdi.",
        "Hawtrey sipped and said: 'By Jove! That is the real hanky-panky!' The recipe entered the Savoy Book of 1930, written by Coley's successor Harry Craddock."),
    ],
    steps: [
      l("Karıştırma bardağına cin, tatlı vermut ve Fernet-Branca'yı koy.", "Pour gin, sweet vermouth and Fernet-Branca into a mixing glass."),
      l("Buzla 30 saniye karıştır.", "Stir with ice for 30 seconds."),
      l("Soğuk coupe'a süz.", "Strain into a cold coupe."),
      l("Portakal kabuğunun yağını püskürt.", "Express an orange peel."),
    ],
    why: l("Eşit cin ve vermutla yapılan tatlı bir Martini'dir; Fernet'in mentolü, safran ve acı otları, birkaç damlada bütün kadehi değiştirir. Acılık tatlılığı keser, mentol ferahlık verir: az malzemeyle çok katmanlı bir içki.",
      "It is a sweet Martini of equal gin and vermouth; Fernet's menthol, saffron and bitter herbs change the whole glass in a few dashes. Bitterness cuts the sweetness and menthol adds freshness: many layers from few ingredients."),
    variations: [
      v("Martinez", "Fernet yerine maraschino: tatlı, yuvarlak.", "Maraschino instead of Fernet: sweet and round."),
      v("Fanciulli", "Viski, tatlı vermut ve Fernet.", "Whiskey, sweet vermouth and Fernet."),
    ],
    tip: l("Fernet'i ölçerek ekle; 7,5 ml'yi geçerse içkiyi tamamen ele geçirir.", "Measure the Fernet; past 7.5 ml it takes over the drink."),
  },

  "white-lady": {
    history: [
      l("Harry MacElhone 1919'da Londra'daki Ciro's Club'da ilk White Lady'yi yaptı, ama içinde cin değil nane likörü vardı. 1929'da Paris'teki kendi barında tarifi değiştirip cinle yaptı ve bugünkü hâli doğdu.",
        "Harry MacElhone made the first White Lady at Ciro's Club in London in 1919, but with crème de menthe, not gin. In 1929, at his own bar in Paris, he remade it with gin, and today's drink was born."),
      l("Savoy'un Harry Craddock'u da kendi versiyonunu sundu ve iki Harry arasında kimin ilk olduğu tartışması uzun sürdü. Craddock'un 1920'lerin sonunda Savoy'un bir duvarına gömdüğü ve bir gün bulunacak olan shaker'ın içinde bir White Lady olduğu söylenir.",
        "The Savoy's Harry Craddock offered his own version, and the dispute between the two Harrys over who came first ran long. It is said that the cocktail shaker Craddock sealed into a wall of the Savoy in the late 1920s holds a White Lady."),
    ],
    steps: [
      l("Shaker'a cin, portakal likörü, limon ve yumurta akını koy.", "Put gin, orange liqueur, lemon and egg white in the shaker."),
      l("Buzsuz 10 saniye çalkala.", "Dry shake for 10 seconds."),
      l("Buz ekleyip 12 saniye daha çalkala.", "Add ice and shake 12 more seconds."),
      l("Soğuk coupe'a ince süzgeçten çift süz.", "Double-strain into a cold coupe."),
    ],
    why: l("Cinli bir Sidecar'dır; yumurta akı ona beyaz, ipeksi bir elbise giydirir ve adını verir. Portakal likörü hem şeker hem kabuk aroması getirdiği için içki kuru ama meyvelidir.",
      "It is a gin Sidecar; the egg white dresses it in a white silk gown and gives it its name. The orange liqueur brings both sugar and peel aroma, so the drink is dry yet fruity."),
    variations: [
      v("1919 White Lady", "Cin yerine nane likörü.", "Crème de menthe instead of gin."),
      v("Lady yumurtasız", "Savoy Kitabı'ndaki hâli: daha kuru, berrak.", "The Savoy Book version: drier and clear."),
      v("Delilah", "Aynı tarifin başka bir adı.", "Another name for the same recipe."),
    ],
    tip: l("Yumurta akını taze ve soğuk kullan; köpük oda sıcaklığında daha iyi kurulur ama içki soğuk kalmalı, bu yüzden dry shake'i kısa tut.", "Use a fresh, cold egg white; foam builds better warm, but the drink must be cold, so keep the dry shake short."),
  },

  bijou: {
    history: [
      l("'Bijou' Fransızca mücevher demektir; tarifi 1900 baskısında yayımlayan Harry Johnson'a göre üç malzeme üç taşı temsil eder: cin elmas, tatlı vermut yakut, yeşil Chartreuse zümrüt. Johnson, Amerikan barmenliğinin ilk büyük ustalarından biriydi.",
        "'Bijou' is French for jewel; according to Harry Johnson, who published it in the 1900 edition of his manual, the three ingredients stand for three stones: gin for diamond, sweet vermouth for ruby, green Chartreuse for emerald. Johnson was one of the first great masters of American bartending."),
      l("Chartreuse, Kartuziyen rahiplerin 1737'den beri 130 bitkiyle yaptığı, tarifini yalnızca iki keşişin bildiği likördür. Bijou bu yüzden kısa ama çok yoğun bir kadehtir; 2000'lerde Chartreuse'ün yeniden keşfiyle barlara döndü.",
        "Chartreuse is the liqueur Carthusian monks have made with 130 plants since 1737, its recipe known to only two monks. That is why the Bijou is short but very intense; it came back to bars when Chartreuse was rediscovered in the 2000s."),
    ],
    steps: [
      l("Karıştırma bardağına cin, tatlı vermut, yeşil Chartreuse ve portakal bitterini koy.", "Pour gin, sweet vermouth, green Chartreuse and orange bitters into a mixing glass."),
      l("Buzla 30 saniye karıştır.", "Stir with ice for 30 seconds."),
      l("Soğuk coupe'a süz.", "Strain into a cold coupe."),
      l("Bir kiraz ve limon kabuğu yağıyla bitir.", "Finish with a cherry and lemon peel oil."),
    ],
    why: l("Eşit üç parça, üç farklı gücün dengesidir: Chartreuse'ün %55'lik bitkisel ateşi, vermutun tatlı şarabıyla yumuşar, cin ikisini kuru bir omurgaya bağlar. Karıştırmak bu yoğunluğu sulandırıp ipeksi hâle getirir.",
      "Three equal parts balance three different strengths: Chartreuse's 55% herbal fire is softened by vermouth's sweet wine, and gin ties both to a dry backbone. Stirring tempers this intensity into silk."),
    variations: [
      v("Modern Bijou", "Cini artır (2:1:1): daha kuru, daha az tatlı.", "More gin (2:1:1): drier, less sweet."),
      v("Tipperary", "İrlanda viskisiyle.", "With Irish whiskey."),
    ],
    tip: l("Yeşil Chartreuse çok güçlüdür; çok tatlı geliyorsa sarı Chartreuse'le değiştirmek yerine cin oranını artır.", "Green Chartreuse is very strong; if it seems too sweet, raise the gin rather than swapping to yellow."),
  },

  "last-word": {
    history: [
      l("Detroit Athletic Club'ın arşivleri Last Word'ü 1916 tarihli bir menüde gösteriyor: kulübün en pahalı kokteyli, 35 sent. Mucidi bilinmiyor. 1951'de Ted Saucier'in 'Bottoms Up!' kitabı, onu New York'a getiren vodvil sanatçısı 'Dublinli Ozan' Frank Fogarty'yi anar; birçok yazar bu yüzden Fogarty'yi mucit sandı.",
        "The Detroit Athletic Club's archives show the Last Word on a 1916 menu: the club's most expensive cocktail, 35 cents. Its inventor is unknown. In 1951 Ted Saucier's 'Bottoms Up!' named Frank Fogarty, the vaudevillian 'Dublin Minstrel' who brought it to New York, which led many to believe Fogarty invented it."),
      l("Yarım asır unutuldu; 2003–2004 civarında Seattle'daki Zig Zag Café'de efsanevi barmen Murray Stenson Saucier'in kitabında buldu. Oradan New York'a, San Francisco'ya ve Londra'ya yayıldı ve modern kokteyl rönesansının simgelerinden oldu.",
        "Forgotten for half a century, it was found in Saucier's book around 2003–2004 by the legendary bartender Murray Stenson at Seattle's Zig Zag Café. From there it spread to New York, San Francisco and London and became a symbol of the modern cocktail revival."),
    ],
    steps: [
      l("Shaker'a dört malzemeyi eşit ölçüyle koy: cin, yeşil Chartreuse, maraschino, misket limonu.", "Put all four ingredients in equal measure in the shaker: gin, green Chartreuse, maraschino, lime."),
      l("Buzla 12 saniye sert çalkala.", "Shake hard with ice for 12 seconds."),
      l("Soğuk coupe'a çift süz.", "Double-strain into a cold coupe."),
      l("İstersen bir kirazla süsle; çoğu barda süssüz servis edilir.", "Garnish with a cherry if you like; most bars serve it bare."),
    ],
    why: l("Dört güçlü sesin eşit olduğu nadir bir tarif. Chartreuse ve maraschino'nun tatlılığı ve yoğunluğu, misket limonunun asidiyle tam karşılanır; cin aradaki boşluğu kuru bir ardıçla doldurur. Ortaya bitkisel, ekşi ve şaşırtıcı biçimde dengeli bir kadeh çıkar.",
      "A rare recipe where four strong voices are equal. The sweetness and intensity of Chartreuse and maraschino are exactly met by the lime's acid, and gin fills the space between with dry juniper. The result is herbal, tart and astonishingly balanced."),
    variations: [
      v("Final Ward", "Cin yerine çavdar, misket yerine limon: Phil Ward, 2007.", "Rye instead of gin, lemon instead of lime: Phil Ward, 2007."),
      v("Paper Plane", "Eşit dört parça formülünün bourbonlu torunu (bu kitapta ayrı sayfası var).", "A bourbon grandchild of the equal-parts formula (it has its own page in this book)."),
      v("Naked & Famous", "Mezcal, sarı Chartreuse, Aperol, misket limonu: Joaquín Simó.", "Mezcal, yellow Chartreuse, Aperol, lime: Joaquín Simó."),
    ],
    tip: l("Eşit ölçüleri jigger'la tam tut; bu tarifte 5 ml fark bile dengeyi bozar.", "Measure the equal parts precisely with a jigger; even 5 ml off upsets the balance."),
  },

  "corpse-reviver": {
    history: [
      l("'Ölü dirilten' içkiler on dokuzuncu yüzyılda sabah içilen, akşamdan kalmalığa iyi geldiği düşünülen bir aileydi. En ünlüsü, 1930'da Harry Craddock'un Savoy Kitabı'nda yazdığı No. 2'dir: cin, Cointreau, Kina Lillet, limon ve bir damla absent.",
        "'Corpse revivers' were a nineteenth-century family of morning drinks thought to cure a hangover. The most famous is No. 2, written by Harry Craddock in the 1930 Savoy Book: gin, Cointreau, Kina Lillet, lemon and a drop of absinthe."),
      l("Craddock tarifin altına unutulmaz bir not düştü: 'Bunlardan dördü art arda içilirse cesedi yeniden öldürür.' Lillet 1986'da kininini azaltınca bazı barlar bugün Cocchi Americano'yla daha acı, eski hâline yaklaşıyor.",
        "Under the recipe Craddock wrote an unforgettable note: 'Four of these taken in swift succession will unrevive the corpse again.' Since Lillet reduced its quinine in 1986, some bars use Cocchi Americano to come closer to the older, more bitter taste."),
    ],
    steps: [
      l("Kadehi buzla soğut, buzu boşaltıp birkaç damla absentle çalkala ve fazlasını dök.", "Chill the glass with ice, empty it, rinse with a few drops of absinthe and discard the excess."),
      l("Shaker'a cin, Cointreau, Lillet Blanc ve limonu eşit koy.", "Put gin, Cointreau, Lillet Blanc and lemon in equal parts in the shaker."),
      l("Buzla 12 saniye çalkala.", "Shake with ice for 12 seconds."),
      l("Absentli kadehe çift süz; portakal kabuğu yağıyla bitir.", "Double-strain into the absinthe-rinsed glass and finish with orange peel oil."),
    ],
    why: l("Eşit dört parça: cinin kuruluğu, Cointreau'nun portakallı tatlılığı, Lillet'nin şarap ve kinin acısı, limonun asidi. Absent içkinin içinde değil kadehin duvarındadır; anason kokusu her şeyi ferahlatır ve aşırı tatlılığı bastırır.",
      "Four equal parts: gin's dryness, Cointreau's orange sweetness, Lillet's wine and quinine bitterness, lemon's acid. The absinthe is on the glass, not in the drink; its anise scent freshens everything and holds back the sweetness."),
    variations: [
      v("Corpse Reviver No. 1", "Konyak, kalvados ve tatlı vermut: karıştırılan, ağır bir akşam içkisi.", "Cognac, calvados and sweet vermouth: a stirred, heavy evening drink."),
      v("Cocchi hâli", "Lillet yerine Cocchi Americano: daha acı.", "Cocchi Americano instead of Lillet: more bitter."),
      v("Corpse Reviver Blue", "Cointreau yerine mavi curaçao.", "Blue curaçao instead of Cointreau."),
    ],
    tip: l("Absenti doğrudan içkiye ekleme; tek damla bile fazla gelir, kadehe sürmek yeter.", "Do not add the absinthe straight to the drink; even one drop is too much, a rinse is enough."),
  },

  "death-afternoon": {
    history: [
      l("Ernest Hemingway'in adını kendi boğa güreşi kitabından (1932) aldığı içkisidir. 1935'te ünlülerin tariflerinden oluşan 'So Red the Nose' kitabına şu tarifi verdi: 'Bir şampanya kadehine bir ölçü absent dök. Buzlu şampanyayı, uygun opal sütlü renge ulaşana kadar ekle. Bunlardan üç ila beşini yavaşça iç.'",
        "It is Ernest Hemingway's drink, named after his own book on bullfighting (1932). In 1935 he gave this recipe to 'So Red the Nose', a book of celebrities' recipes: 'Pour one jigger absinthe into a Champagne glass. Add iced Champagne until it attains the proper opalescent milkiness. Drink three to five of these slowly.'"),
      l("Hemingway onu Paris'teki yıllarında keşfettiğini söyler. Absentin 'louche', yani suyla ya da şampanyayla karşılaşınca bulutlanması, içkinin bütün gösterisidir.",
        "Hemingway said he discovered it during his Paris years. Absinthe's 'louche', the clouding when it meets water or Champagne, is the drink's whole show."),
    ],
    steps: [
      l("Flütü ve şampanyayı iyice soğut.", "Chill the flute and Champagne well."),
      l("Flüte absenti dök.", "Pour the absinthe into the flute."),
      l("Buz gibi şampanyayı çok yavaşça ekle ve opal bulutun oluşmasını izle.", "Add the ice-cold Champagne very slowly and watch the opal cloud form."),
      l("Karıştırma; süs gerekmez.", "Do not stir; no garnish is needed."),
    ],
    why: l("Absentteki anason yağı alkolde çözülür ama suda çözülmez; şampanya alkolü seyreltince yağ damlacıkları ayrışıp ışığı kırar ve içki opal renge döner. Kuru şampanya anasonun yoğunluğunu kabarcıklarla hafifletir; tatlandırıcı yok, sadece iki malzeme.",
      "Anise oil in absinthe dissolves in alcohol but not in water; as Champagne dilutes the alcohol, the oil drops out into tiny droplets that scatter light, turning the drink opal. Dry Champagne lightens the anise with its bubbles: no sweetener, just two ingredients."),
    variations: [
      v("Hafif hâli", "20 ml absent yerine 10 ml: anason fısıltısı.", "10 ml of absinthe instead of 20: a whisper of anise."),
      v("Pastis ile", "Absent yerine pastis: daha yumuşak, meyankökü.", "Pastis instead of absinthe: softer, with liquorice."),
    ],
    tip: l("Hemingway'in tarifindeki bir ölçü (jigger) yaklaşık 45 ml'dir: kitabın 'üç ila beş' önerisini ciddiye alma.", "Hemingway's jigger is about 45 ml: do not take the book's 'three to five' to heart."),
  },

  vesper: {
    history: [
      l("Ian Fleming'in 1953'teki ilk James Bond romanı Casino Royale'de Bond barmene tarifi kendisi verir: 'Üç ölçü Gordon's, bir ölçü votka, yarım ölçü Kina Lillet. Buz gibi olana kadar çalkala, sonra büyük ince bir limon kabuğu ekle.' Adını romandaki çift ajan Vesper Lynd'den alır.",
        "In Casino Royale, Ian Fleming's first James Bond novel of 1953, Bond gives the bartender the recipe himself: 'Three measures of Gordon's, one of vodka, half a measure of Kina Lillet. Shake it very well until it's ice-cold, then add a large thin slice of lemon peel.' It takes its name from the double agent Vesper Lynd."),
      l("Fleming tarifi arkadaşı Ivar Bryce'ın yaptığı bir içkiden aldığını söyler. Kina Lillet artık üretilmiyor; bugünkü Lillet Blanc daha az acı olduğu için bazı barmenler Cocchi Americano ya da birkaç damla kinin bitteri ekler.",
        "Fleming said he took it from a drink made by his friend Ivar Bryce. Kina Lillet is no longer made; today's Lillet Blanc is less bitter, so some bartenders use Cocchi Americano or add a few dashes of quinine bitters."),
    ],
    steps: [
      l("Derin Martini kadehini (Fleming'e göre şampanya kadehi) dondurucuda soğut.", "Chill a deep Martini glass (Fleming specified a deep Champagne goblet) in the freezer."),
      l("Shaker'a cin, votka ve Lillet Blanc koy.", "Put gin, vodka and Lillet Blanc in the shaker."),
      l("Bond'un istediği gibi buzla sert çalkala (bir Martini karıştırılır; Vesper istisnadır).", "Shake hard with ice, as Bond asks (Martinis are stirred; the Vesper is the exception)."),
      l("Soğuk kadehe süz, uzun ince limon kabuğunun yağını püskürtüp kadehe bırak.", "Strain into the cold glass, express a long thin lemon peel and drop it in."),
    ],
    why: l("Votka cinin ardıcını yumuşatıp gövdeyi kalınlaştırır, Lillet ise vermut yerine meyveli, hafif acı bir şarap getirir. Çalkalamak bir Martini'den daha fazla su ve hava katar: içki biraz bulutlu, ama daha soğuk ve daha az sert olur.",
      "Vodka softens gin's juniper and thickens the body, and Lillet brings a fruity, lightly bitter wine instead of vermouth. Shaking adds more water and air than a stirred Martini: the drink is slightly cloudy, but colder and less harsh."),
    variations: [
      v("Kina hâli", "Lillet yerine Cocchi Americano.", "Cocchi Americano instead of Lillet."),
      v("Karıştırılmış Vesper", "Berrak ve daha ipeksi; Bond'a söyleme.", "Clear and silkier; do not tell Bond."),
    ],
    tip: l("Bugünkü Lillet, Fleming'in Kina Lillet'sinden daha az acıdır; bir damla kinin ya da Angostura bitteri eklersen kitabın tadına yaklaşırsın.", "Today's Lillet is less bitter than Fleming's Kina Lillet; a dash of quinine or Angostura bitters brings you closer to the book's taste."),
  },
};
