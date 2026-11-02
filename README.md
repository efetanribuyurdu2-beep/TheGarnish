# GARNISH · Cocktail Worlds

Lüks temalı, iki dilli (TR / EN) bir kokteyl atlası. Ziyaretçi girişte bir **dünya** seçer; sitenin
renkleri, yazı tipleri, motifleri, animasyonları ve özel kokteylleri o dünyaya göre değişir.

## Dünyalar

| Dünya | Atmosfer | Özel koleksiyon |
| --- | --- | --- |
| **Maison** | Klasik lüks, Art Deco. 3 renk seçeneği: Noir & Or, Midnight, Bordeaux | Bar Efsaneleri |
| **Anatolia** | Çini deseni, nazar boncuğu, lale; lacivert, turkuaz, nar kırmızısı | Anadolu Rezervi |
| **Cosmos** | Yıldız alanı, nebula, gezegen | Takımyıldızlar |
| **Jazz Bar** | 1920'ler speakeasy; girişte parola sorulur (ipucu kapıda) | Yasak Dönem |
| **Sakura** | Düşen kiraz çiçekleri, enso | Hanami Koleksiyonu |
| **Alchemist** | Simya sembolleri, dönen dönüşüm çemberi | İksirler |
| **Tiki** | Palmiye yaprakları, meşale ışığı | Lagün Koleksiyonu |

Dünya, dil ve renk seçimleri tarayıcıda (localStorage) hatırlanır. Dünya üst menüden her an değiştirilebilir.

## Bölümler

- **Kokteyller**: 18 klasik her dünyada, ayrıca her dünyanın imza kokteylleri (toplam 55 tarif). Arama, aile ve ortam filtreleri.
- **The Cellar**: 61 malzeme. Tadım notları (burunda / damakta / bitiş), köken, hikâye, tat radarı, yerine kullanılabilecekler, premium öneri.
- **The Atelier**: Tarif oluşturucu. Canlı **denge terazisi**: son alkol oranı, buz suyu (Dave Arnold'un sulanma formülleri), kalori, renk ve "biraz tatlı kaçtı, X ml limon ekle" gibi öneriler.
- **The Lineage**: Kokteyllerin 6 ana aileye göre soy ağacı. Kullanıcının kendi tarifleri de dal olarak eklenir.
- **Concierge**: Ortam ve damak tercihine göre kişisel öneri.
- **Barım**: Evdeki şişeleri işaretle; yapabileceklerin ve "tek malzeme eksik" olanlar listelenir.
- **Glass & Ice**: Bardak, buz ve garnitür rehberi.
- **Koleksiyonum**: Kaydedilenler ve imza tarifler; menü olarak yazdırılabilir veya PDF'e aktarılabilir.

## Geliştirme

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi
npm run lint    # TypeScript tip kontrolü
```

Teknoloji: Next.js (App Router) + TypeScript, harici UI kütüphanesi yok. Tüm görseller (logo, bardaklar,
dünya motifleri) kod içinde SVG olarak çizilir.

### Yapı

```
src/
  app/            sayfalar (cocktails, cellar, atelier, lineage, concierge, bar, glass-ice, collection)
  components/     Logo, GlassArt, FlavorRadar, WorldBackdrop, WorldGate, Shell, CocktailCard
  data/           worlds.ts, ingredients.ts, cocktails.ts
  lib/            balance.ts (denge hesapları), prefs.tsx (tercihler), ui.ts (çeviriler)
```

### Yeni bir dünya eklemek

1. `src/lib/types.ts` içindeki `WorldId` listesine ekleyin.
2. `src/data/worlds.ts` içine adını, sloganını ve renklerini yazın.
3. `src/app/globals.css` içine `[data-world="yeni"]` renk ve yazı tipi değişkenlerini ekleyin.
4. `src/components/WorldBackdrop.tsx` içine arka plan motifini çizin.
5. `src/data/cocktails.ts` içinde `world: "yeni"` olan imza kokteylleri ekleyin.

> Lütfen sorumlu için. Bu site 18 yaş ve üzeri içindir.
