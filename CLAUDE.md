# GARNISH · Cocktail Worlds: project notes

Read this first. It is the hand-off for any new session.

## Owner & working style
- The owner writes in **Turkish**. Reply in Turkish, keep the site bilingual (TR/EN).
- Taste: **luxury**, immersive, crafted. Avoid anything that looks cheap or flat; every world must *feel* like a real place.
- Workflow: develop on a branch, push, open a PR; the owner merges on GitHub and **Vercel** auto-deploys `main`.
- Always verify visually: `npm run build`, `npx next start`, Playwright screenshots (Chromium is preinstalled).

## Stack
Next.js 16 (App Router) + React 19 + TypeScript. No UI library, no image files: **every visual is hand-written inline SVG**.
Preferences (world, palette, lang, favourites, bar, creations) live in `localStorage` (`garnish:prefs:v1`).
Fonts load from Google Fonts in `src/app/layout.tsx`.

```
npm install · npm run dev · npm run build · npm run lint (tsc)
```

## Map of the code
| Path | What |
| --- | --- |
| `src/data/worlds.ts` | 7 worlds: name, tagline, intro, collection name, bar name, bartender greeting, Jazz password |
| `src/data/ingredients.ts` | 61 base ingredients (full prose) + merge with `ingredientsMore.ts` (116 compact rows) = **177** |
| `src/data/cocktails.ts` | 55 cocktails (18 classics `world:"all"` + signatures per world), garnishes, 6 families (ROOTS), moods |
| `src/lib/balance.ts` | Drink maths: dilution (Dave Arnold formulas), final ABV, sugar/acid balance, kcal, colour mixing, tips |
| `src/lib/themeKit.ts` | Per-world SVG motifs → CSS vars (`--band --bandV --track --thumb --c-tl.. --emblem --counter --wall`) |
| `src/lib/music.ts` | Generative Web Audio music per world (no files). Toggled by `MusicButton` (world instrument icon) |
| `src/lib/ui.ts` | UI translations, method steps, glass/ice labels, `WORLD_VESSELS`, `SPECIAL_VESSELS` |
| `src/lib/prefs.tsx` | Prefs context: `t()`, `pick()`, `openGate()` |
| `src/components/GlassArt.tsx` | Realistic glassware + world vessels; world-specific glass craft |
| `src/components/Bottle.tsx` | 13 bottle silhouettes (by ingredient `shape`) × world label/cap styling |
| `src/components/BalanceGauge.tsx` | Balance dial, a different design per world |
| `src/components/WorldBackdrop.tsx` | Animated world backgrounds |
| `src/components/WorldGate.tsx` | Entry: age check, world choice, Maison palette, Jazz speakeasy password |
| `src/components/games/*` | One mini game per world |
| `src/app/globals.css` | World tokens `[data-world]`, all styling (theme-kit section, shelves, gauges, games at the end) |

## Worlds (each restyles everything)
| World | Look | Bar (Atelier) | Vessels | Gauge | Music icon | Game |
| --- | --- | --- | --- | --- | --- | --- |
| Maison (3 palettes: noir, midnight, bordeaux) | Art Deco, black marble, gold | Le Grand Bar | coupe, Nick&Nora, flute | Deco sunburst | mini piano | Bartender's Riddles |
| Anatolia | kilim (deep madder red, woven), çini, nazar, tulip (Les Benjamins mood) | Garnish Meyhanesi | zarflı fincan, istikan, rakı glass | çini plate | darbuka | Nazar Memory |
| Cosmos | stars, nebula, constellations | Orbital Lounge | orb glass | radar | satellite dish | Constellation (one-stroke) |
| Jazz Bar | 1920s speakeasy, piano keys, vinyl, mahogany & brass. Password **BEES KNEES** | The Blind Tiger | teacup | VU meter | vinyl | Piano memory |
| Sakura | seigaiha, kumiko, kintsugi, shoji, hinoki, tategaki, karesansui | Bar Hanami 花見 | ochoko, masu | sensu fan | fūrin | Kintsugi |
| Alchemist | alchemy glyphs, parchment, brass | The Apothecary | beaker, flask | astrolabe | music box | Secret Elixir (mastermind) |
| Tiki | tapa, bamboo, palm leaves, torches | The Lagoon Hut | coconut, pineapple, tiki mug | rope dial | ukulele | Fruit Rain |

## Pages
`/` home · `/cocktails` + `/cocktails/[id]` · `/cellar` + `/cellar/[id]` · `/atelier` (the world's bar: 3D bottle shelves, counter, vessel & garnish pickers, gauge, save signature) · `/lineage` (family tree) · `/concierge` · `/bar` (what can I make) · `/glass-ice` · `/games` · `/collection` (printable menu).

## How to add things
- **Ingredient**: add a row to `ingredientsMore.ts` (look string: `"tint[,o][,shape][,glassTint][,capColor]"`, profile = 6 digits sweet/sour/bitter/strong/fresh/aromatic).
- **Cocktail**: `c(...)` in `cocktails.ts`; `world` = `"all"` or a world id; `parent` links the Lineage tree.
- **World**: `WorldId` in `types.ts` → `worlds.ts` → tokens in `globals.css` → kit in `themeKit.ts` → backdrop, vessels, gauge, bottle style, music band, game.

## Decisions & gotchas
- Logo: owner's design, fine-line martini with olive; wordmark **GARNISH** / COCKTAIL WORLDS (`Logo.tsx`).
- Turkish `text-transform: uppercase` turns i into İ: set `lang="en"` on English names.
- SVG arcs over 180° need the large-arc flag (see `BalanceGauge`).
- Grid children with horizontal scrollers need `min-width: 0`, or the page widens.
- Nav collapses to the burger menu under 1320px (9 links).
- Owner did not want: the old scale, flat bottles and glasses, the busy bright çini wall, the turquoise band on Anatolia glasses.

## Ideas parked for later
Haftanın Gizli Malzemesi (weekly challenge), Kokteyl Pasaportu (world map stamps), alcohol-free toggle on every recipe, party planner (batch maths, shopping list), user accounts and sharing (would need a backend, e.g. Supabase), photo-real assets.
