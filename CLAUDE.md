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
Fonts load from Google Fonts in `src/app/layout.tsx`. Every display font must have the **latin-ext** subset (ğ ş ı İ); check before adding one.

```
npm install · npm run dev · npm run build · npm run lint (tsc)
```

## Map of the code
| Path | What |
| --- | --- |
| `src/lib/types.ts` | All shared types: `WorldId`, `Ingredient`, `Cocktail`, `Glass`, `Method`, `Ice`, `Root`, `Mood`, `BottleShape` |
| `src/data/worlds.ts` | 9 worlds: name, tagline, intro, collection name, bar name, bartender greeting, Jazz password |
| `src/data/ingredients.ts` | 61 base ingredients (full prose) + merge with `ingredientsMore.ts` (150 compact rows, incl. 18 `zero-*` alcohol-free stand-ins) = **211** |
| `src/data/cocktails.ts` | 87 cocktails (21 classics `world:"all"`, 3 of them alcohol-free, + signatures per world incl. 2 alcohol-free each), garnishes, 6 families (ROOTS), moods |
| `src/lib/balance.ts` | Drink maths: dilution (Dave Arnold formulas), final ABV, sugar/acid balance, kcal, colour mixing, tips |
| `src/lib/catalog.ts` | `visibleCocktails(world, creations)` (classics + world signatures + own creations), `findCocktail`, `childrenOf` |
| `src/lib/scripts.ts` | Script echoes (runes, Old Turkic, Greek) used by `<Echo>` |
| `src/lib/themeKit.ts` | Per-world SVG motifs → CSS vars (`--band --bandV --track --thumb --c-tl.. --emblem --counter --wall`) |
| `src/lib/music.ts` | Generative Web Audio music per world (no files). Toggled by `MusicButton` (world instrument icon) |
| `src/lib/ui.ts` | UI translations, method steps, glass/ice labels, `WORLD_VESSELS`, `SPECIAL_VESSELS` |
| `src/lib/prefs.tsx` | Prefs context: `t()`, `pick()`, `openGate()`, `zero` (alcohol-free mode) |
| `src/lib/zero.ts` | Alcohol-free: `MAP` of every alcoholic ingredient → zero-proof stand-in(s), `toZero()`, `pour(c, zero)`, `isZeroCocktail()` |
| `src/components/Shell.tsx` | Header, nav `LINKS` (11), globe pill to `/worlds`, Maison palette, 0% pill, footer |
| `src/components/CocktailCard.tsx` | Cocktail card + `formatAmount()` (ml, dashes, "a handful", "top") |
| `src/components/Logo.tsx`, `Ornament.tsx`, `FlavorRadar.tsx`, `Echo.tsx` | Logo, dividers, 6-axis taste radar, script echo |
| `src/components/MusicButton.tsx` | World instrument icon that toggles `music.ts` |
| `src/components/PassportStamp.tsx`, `StampToast.tsx` | Passport stamp art (`INK` per world) and the "new stamp" toast |
| `src/components/GlassArt.tsx` | Realistic glassware + world vessels; world-specific glass craft |
| `src/components/Bottle.tsx` | 13 bottle silhouettes (by ingredient `shape`) × world label/cap styling |
| `src/components/BalanceGauge.tsx` | Balance dial, a different design per world |
| `src/components/WorldBackdrop.tsx` | Animated world backgrounds |
| `src/components/WorldTransition.tsx` | Themed cover/reveal animation per world, played by `travel()` |
| `src/components/WorldGate.tsx` | Entry: age check, world choice, Maison palette, Jazz speakeasy password |
| `src/components/games/*` | One mini game per world; `common.tsx` has `GameFrame`, `useBest` (best score + master stamp), `shuffle` |
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
| Boreal (Scandinavia + Russia) | aurora, snow, pine ridge, Selbu star, Gzhel blue, birch bark; fonts Ruslan Display + Jost | Aurora Hall | frosted ryumka, birch kuksa, glass of ice | frosted compass | kantele | Frozen Lake (ice-slide, BFS-checked levels) |
| Riviera (French cellars, Italian/Greek gardens) | meander, vine & grapes, lemons, majolica, cellar brick vault, wax-sealed bottles; fonts Aboreto + Lora | La Cave Riviera | wine glass, kylix, terracotta cup | sundial | mandolin | Majolica (sliding tile 3×3 / 4×4) |

## World UI kit
`globals.css` → "WORLD UI KIT" (end of file): buttons (`.btn`, `.btn.ghost`), `.chip`, `.input`, nav underline, eyebrow glyph, scrollbar, focus ring and selection are drawn differently per world (Maison gilded double rule, Anatolia madder red with gold thread and kilim nav band, Cosmos neon pill, Jazz brass marquee and ticket-stub chips, Sakura vermilion hanko and brush stroke, Alchemist riveted brass and apothecary-label chips, Tiki bamboo with rope underline, Boreal frosted ice with aurora line, Riviera majolica tile with cobalt). Shared hooks: `--ui-thumb --ui-nav --ui-nav-h --ui-eyebrow --ui-field-focus`. New controls should use these classes so they follow the world.

## Typography
The owner found the first fonts generic ("AI-looking"). Each world now has a characterful display font (`--font-display`) and a readable `--font-prose` for long italic text (story, greeting, tips):
| World | Display | Prose |
| --- | --- | --- |
| Maison | Bodoni Moda | (display) |
| Anatolia | Aref Ruqaa (Ottoman ruqʿa calligraphy) | (display) |
| Cosmos | Syncopate | Exo 2 |
| Jazz | Limelight | Poiret One |
| Sakura | Zen Antique | (display) |
| Alchemist | Grenze Gotisch | (display) |
| Tiki | Kavoon | Karla |
| Boreal | Ruslan Display (Old Russian) | Forum |
| Riviera | Aboreto (caps only) | Lora |
The logo wordmark and nav brand use a fixed `--font-brand` (Cormorant Garamond) so the owner's logo never changes.
**Script echoes** (`src/lib/scripts.ts`, `<Echo>`): page titles are repeated letter by letter in Elder Futhark runes (Boreal), Old Turkic / Orkhon, right to left (Anatolia) and Greek capitals (Riviera).

## Worlds & transitions
- `/worlds` is the world switcher: one "portal" card per world (its wall, band, emblem, font). Maison asks for the palette and Jazz for the password inside the card; once the password is right `prefs.jazzKey` remembers it. `/worlds#id` opens a card (used by the passport and cocktail pages). The globe pill in the header links here at every screen size.
- Always change worlds with `travel(id, patch)` from prefs, never `set({ world })`: it plays `WorldTransition` (cover 750 ms → world swaps → reveal 1050 ms). Boreal blizzard, Sakura petal storm, Anatolia kilim curtains + nazar, Jazz velvet curtains, Riviera shutters, Cosmos light-speed, Maison golden fan, Alchemist smoke + glyphs, Tiki palm fronds. Skipped under `prefers-reduced-motion`.
- **Transition sounds** (`src/lib/sfx.ts`): one Web Audio cue per world, timed to the cover (0–0.75 s) and reveal. Maison glass arpeggio + champagne chord, Anatolia cloth + darbuka, Cosmos warp, Jazz velvet + Dm9 piano, Sakura wind + fūrin + koto, Alchemist bubbles + gong, Tiki rustle + log drum + ukulele, Boreal blizzard + ice chimes, Riviera shutter clacks + mandolin. Played from `travel()` when `prefs.sfx` (default on), independent of the music; `SfxToggle` on `/worlds` and the gate. `LEVEL` trims each cue to the same loudness (measured with an OfflineAudioContext; keep RMS ≈ 0.014 when changing a cue).
- Keep transitions light: no CSS `filter: blur` on many animated layers (it froze the Alchemist smoke).

## Cocktail Passport (`/passport`)
- 3 stamps per world in `prefs.stamps` (`"world:kind"` → date): **arrival** (entering the world), **tasting** (saving one of its signatures), **master** (finishing its game via `useBest().submit`, or saving a creation in its Atelier).
- `prefs.stamp()` sets `fresh`, shown by `StampToast`. Stamp art: `PassportStamp.tsx` (ink, outline and motif per world).
- Book: cover, identity page (name, MRZ lines), 9 visa pages, golden "Dünya Gezgini" seal page when all 27 are collected.

## Alcohol-free (0%)
- Header pill **0% Alkolsüz** toggles `prefs.zero`: cards, the bar page and "start from a classic" in the Atelier switch to zero-proof versions; zero-proof originals sort first on /cocktails.
- Cocktail detail has an **Orijinal / Alkolsüz** switch; swapped lines say "X yerine".
- Atelier and Cellar have an "Alkolsüz 0%" shelf/filter (`ingredient.zero`). Adding an alcoholic ingredient? Add it to `MAP` in `zero.ts` (category fallbacks exist).

## Pages
`/` home · `/cocktails` + `/cocktails/[id]` · `/cellar` + `/cellar/[id]` · `/atelier` (the world's bar: 3D bottle shelves, counter, vessel & garnish pickers, gauge, save signature) · `/lineage` (family tree) · `/concierge` · `/bar` (what can I make) · `/glass-ice` · `/games` · `/passport` · `/worlds` · `/collection` (printable menu).

## How to add things
- **Ingredient**: add a row to `ingredientsMore.ts` (look string: `"tint[,o][,shape][,glassTint][,capColor]"`, profile = 6 digits sweet/sour/bitter/strong/fresh/aromatic).
- **Cocktail**: `c(...)` in `cocktails.ts`; `world` = `"all"` or a world id; `parent` links the Lineage tree.
- **World**: `WorldId` in `types.ts` → `worlds.ts` → tokens in `globals.css` → kit in `themeKit.ts` → backdrop, vessels, gauge, bottle style, music band, game.

## Decisions & gotchas
- Logo: owner's design, fine-line martini with olive; wordmark **GARNISH** / COCKTAIL WORLDS (`Logo.tsx`).
- Turkish `text-transform: uppercase` turns i into İ: set `lang="en"` on English names (world names `.wc-name` already have it, else RİVİERA).
- SVG arcs over 180° need the large-arc flag (see `BalanceGauge`).
- Grid children with horizontal scrollers need `min-width: 0`, or the page widens.
- Nav collapses to the burger menu under 1720px (11 links).
- Owner did not want: the old scale, flat bottles and glasses, the busy bright çini wall, the turquoise band on Anatolia glasses. (Same reason Riviera's counter is travertine with only a thin majolica edge.)
- Backdrops are `position: fixed`; full-page screenshots only show them in the first viewport. That is expected.

## Ideas parked for later
Haftanın Gizli Malzemesi (weekly challenge), party planner (batch maths, shopping list), user accounts and sharing (would need a backend, e.g. Supabase), photo-real assets.
