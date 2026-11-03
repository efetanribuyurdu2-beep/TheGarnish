# GARNISH · Cocktail Worlds

Lüks temalı, iki dilli (TR / EN) bir kokteyl atlası. Ziyaretçi girişte bir **dünya** seçer; sitenin
renkleri, yazı tipleri, motifleri, animasyonları ve özel kokteylleri o dünyaya göre değişir.

## Dünyalar

| Dünya | Atmosfer | Özel koleksiyon |
| --- | --- | --- |
| **Maison** | Klasik lüks, Art Deco. 3 renk seçeneği: Noir & Or, Midnight, Bordeaux | Bar Efsaneleri |
| **Anatolia** | Kilim dokusu, çini, nazar boncuğu, lale; derin kök boya kırmızısı | Anadolu Rezervi |
| **Cosmos** | Yıldız alanı, nebula, gezegen | Takımyıldızlar |
| **Jazz Bar** | 1920'ler speakeasy; girişte parola sorulur (ipucu kapıda) | Yasak Dönem |
| **Sakura** | Düşen kiraz çiçekleri, enso | Hanami Koleksiyonu |
| **Alchemist** | Simya sembolleri, dönen dönüşüm çemberi | İksirler |
| **Tiki** | Palmiye yaprakları, meşale ışığı | Lagün Koleksiyonu |
| **Boreal** | Kuzey ışıkları, kar, Selbu yıldızı, Gzhel mavisi, huş kabuğu | Kutup Gecesi |
| **Riviera** | Fransız mahzenleri, İtalyan/Yunan bahçeleri, majolika, limon | Bağ Bozumu |

Dünya, dil ve renk seçimleri tarayıcıda (localStorage) hatırlanır. Dünya her an **Dünyalar** sayfasından değiştirilebilir; her dünyaya kendine özgü animasyonlu bir geçişle girilir (kilim perdeler, kadife perde, tipi, yaprak fırtınası, ışık hızı…).

## Bölümler

- **Kokteyller**: 21 klasik her dünyada, ayrıca her dünyanın imza kokteylleri (toplam 87 tarif, alkolsüzler dahil). Arama, aile ve ortam filtreleri.
- **The Cellar**: 211 malzeme (18 alkolsüz muadil dahil). Tadım notları (burunda / damakta / bitiş), köken, hikâye, tat radarı, yerine kullanılabilecekler, premium öneri.
- **The Atelier**: Tarif oluşturucu. Canlı **denge terazisi**: son alkol oranı, buz suyu (Dave Arnold'un sulanma formülleri), kalori, renk ve "biraz tatlı kaçtı, X ml limon ekle" gibi öneriler.
- **The Lineage**: Kokteyllerin 6 ana aileye göre soy ağacı. Kullanıcının kendi tarifleri de dal olarak eklenir.
- **Concierge**: Ortam ve damak tercihine göre kişisel öneri.
- **Barım**: Evdeki şişeleri işaretle; yapabileceklerin ve "tek malzeme eksik" olanlar listelenir.
- **Glass & Ice**: Bardak, buz ve garnitür rehberi.
- **Oyunlar**: Her dünyanın kendi mini oyunu.
- **Kokteyl Pasaportu**: Her dünyada 3 damga (varış, tadım, ustalık); 27'si toplanınca "Dünya Gezgini" mührü.
- **0% Alkolsüz mod**: Üst menüdeki düğmeyle tüm tarifler alkolsüz muadillerine geçer.
- **Koleksiyonum**: Kaydedilenler ve imza tarifler; menü olarak yazdırılabilir veya PDF'e aktarılabilir.

## Geliştirme

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi
npm run lint    # TypeScript tip kontrolü
```

Teknoloji: Next.js 16 (App Router) + React 19 + TypeScript, harici UI kütüphanesi yok. Tüm görseller (logo, bardaklar,
dünya motifleri) kod içinde SVG olarak çizilir.

### Yapı

```
src/
  app/            sayfalar (worlds, cocktails, cellar, atelier, lineage, concierge, bar, glass-ice, games, passport, collection)
  components/     Shell, WorldTransition, GlassArt, Bottle, BalanceGauge, WorldBackdrop, WorldGate, PassportStamp, games/ …
  data/           worlds.ts, ingredients.ts + ingredientsMore.ts, cocktails.ts
  lib/            balance.ts (denge), prefs.tsx (tercihler), ui.ts (çeviriler), themeKit.ts, music.ts, zero.ts
```

### Yeni bir dünya eklemek

1. `src/lib/types.ts` içindeki `WorldId` listesine ekleyin.
2. `src/data/worlds.ts` içine adını, sloganını ve renklerini yazın.
3. `src/app/globals.css` içine `[data-world="yeni"]` renk ve yazı tipi değişkenlerini ekleyin.
4. `src/lib/themeKit.ts` içine dünyanın SVG motif setini ekleyin.
5. `src/components/WorldBackdrop.tsx` içine arka plan motifini çizin.
6. Bardak (`GlassArt`, `WORLD_VESSELS`), denge göstergesi (`BalanceGauge`), şişe stili (`Bottle`), müzik (`music.ts`), oyun (`games/`) ve pasaport damgası (`PassportStamp`) ekleyin.
7. `src/data/cocktails.ts` içinde `world: "yeni"` olan imza kokteylleri ekleyin (2'si alkolsüz).

Ayrıntılı geliştirici notları için `CLAUDE.md` dosyasına bakın.

> Lütfen sorumlu için. Bu site 18 yaş ve üzeri içindir.
