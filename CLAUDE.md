# GARNISH · Cocktail Worlds: project notes

Read this first. It is the hand-off for any new session.

## Owner & working style
- The owner writes in **Turkish**. Reply in Turkish, keep the site bilingual (TR/EN).
- Taste: **luxury**, immersive, crafted. Avoid anything that looks cheap or flat; every world must *feel* like a real place.
- Workflow: develop on a branch, push, open a PR; the owner merges on GitHub and **Vercel** auto-deploys `main`.
- Always verify visually: `npm run build`, `npx next start -p 3100`, then `npm run smoke` (every page × every world × phone and desktop: console errors, overflow, dotted İ in names, transition fps; `-- --quick` for a short pass) and Playwright screenshots (Chromium is preinstalled).

## Stack
Next.js 16 (App Router) + React 19 + TypeScript. No UI library, no image files: **every visual is hand-written inline SVG**.
Preferences (world, palette, lang, favourites, bar, creations) live in `localStorage` (`garnish:prefs:v1`).
Fonts load from Google Fonts in `src/app/layout.tsx`. Every display font must have the **latin-ext** subset (ğ ş ı İ); check before adding one.

```
npm install · npm run dev · npm run build · npm run lint (tsc) · npm run smoke (needs a server on :3100)
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
| `src/lib/audio.ts` | `unlockAudio(ctx)`: makes Web Audio sound on iPhone (silent switch → `navigator.audioSession.type = "playback"`, silent `<audio>` on older iOS) and resumes "suspended"/"interrupted" contexts on any tap. Every AudioContext (music, sfx) goes through it |
| `src/lib/menuPdf.tsx`, `pdf.ts`, `/api/menu` | "PDF menü indir" on `/collection`: the saved drinks as a world-styled A4 PDF made on the server (next/og pages → tiny PNG→PDF writer). `window.print()` stays as "Yazdır" but does nothing in phone in-app browsers |
| `src/lib/ui.ts` | UI translations, method steps, glass/ice labels, `WORLD_VESSELS`, `SPECIAL_VESSELS` |
| `src/lib/prefs.tsx` | Prefs context: `t()`, `pick()`, `openGate()`, `zero` (alcohol-free mode) |
| `src/lib/zero.ts` | Alcohol-free: `MAP` of every alcoholic ingredient → zero-proof stand-in(s), `toZero()`, `pour(c, zero)`, `isZeroCocktail()` |
| `src/components/Shell.tsx` | Header: GARNISH logo (opens the menu), 0% pill, music, TR/EN, globe pill to `/worlds`, menu button, footer |
| `src/components/GarnishMenu.tsx` | Every page in one panel, opened from the logo or the menu button (the owner did not want a row of tabs). Three groups (Bar, Keşif, Yolculuk), headed by the world's bar and greeting, world band down the edge; on phones it also holds TR/EN and Maison's palette |
| `src/components/CocktailCard.tsx` | Cocktail card + `formatAmount()` (ml, dashes, "a handful", "top") |
| `src/components/Logo.tsx`, `Ornament.tsx`, `FlavorRadar.tsx`, `Echo.tsx` | Logo, dividers, 6-axis taste radar, script echo |
| `src/components/MusicButton.tsx` | World instrument icon that toggles `music.ts` |
| `src/components/PassportStamp.tsx`, `StampToast.tsx` | Passport stamp art (`INK` per world) and the "new stamp" toast |
| `src/components/GlassArt.tsx`, `glassSvg.tsx` | Realistic glassware + world vessels; world-specific glass craft. The drawing (`GlassSvg`) is hook-free in `glassSvg.tsx` so the server can render it into share cards; `GlassArt` is the client wrapper |
| `src/lib/share.ts`, `card.tsx`, `svgString.ts` | Recipe sharing: share codes (`shareCode`/`readShare`), the world-styled card image (next/og), React SVG → string |
| `src/components/SharePanel.tsx` | "Paylaş" sheet on the cocktail page: card preview, landscape/portrait, copy link, native share, download PNG, WhatsApp, X |
| `src/lib/party.ts`, `src/app/party/page.tsx` | Party planner: drinks per guest/hour, batch per method (stir pre-diluted, shake citrus same day, egg/cream/mint per glass, bubbles at serving), shopping list in bottles/fruit/packs with a 10% margin (owned items from `prefs.bar` last), ice, garnishes, timeline. Plan saved in `prefs.party` |
| `src/lib/secret.ts`, `src/app/secret/page.tsx`, `SecretSeal.tsx` | Haftanın Gizli Malzemesi: one ingredient per ISO week from `POOL` (same for everyone), three clues in a wax-sealed envelope ("Mührü kır"), then the bottle, notes, drinks with it and the task: save an Atelier signature containing it → `sealSecret(week, id)` stores `prefs.secrets[week]` (separate from the 27 passport stamps; shown on the passport's "Gizli malzeme mühürleri" page, `#seals`). The Atelier marks the bottle on its shelf; the home page has a teaser |
| `src/lib/daytime.ts`, `useDaytime.ts` | Time-of-day worlds: local hour → `dawn/day/dusk/night` on `<html data-time>` (boot script before paint, then `usePhase()` every 5 min). One still `.daylight` layer over the backdrop lights each world for the hour ("TIME OF DAY" in globals.css: no animation, no filter). Home greets with `GREETING` + `HOUR_LINE[world][phase]` |
| `src/lib/why.ts` | "Neden işe yarıyor?" on cocktail pages: each ingredient's role (base, modifier, sour, sweet, texture, accent, lengthener) as a proportion bar, then the family frame, sugar/acid ratio, dilution by method, final volume/ABV, bitters and peel oils, all from `analyse()` |
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
- Keep transitions light: no CSS `filter` (blur, drop-shadow) on large or many animated layers (it froze the Alchemist smoke and halved Tiki's frame rate); bake shadows into the SVG instead.

## Cocktail Passport (`/passport`)
- 3 stamps per world in `prefs.stamps` (`"world:kind"` → date): **arrival** (entering the world), **tasting** (saving one of its signatures), **master** (finishing its game via `useBest().submit`, or saving a creation in its Atelier).
- `prefs.stamp()` sets `fresh`, shown by `StampToast`. Stamp art: `PassportStamp.tsx` (ink, outline and motif per world).
- Book: cover, identity page (name, MRZ lines), 9 visa pages, golden "Dünya Gezgini" seal page when all 27 are collected.

## Alcohol-free (0%)
- Header pill **0% Alkolsüz** toggles `prefs.zero`: cards, the bar page and "start from a classic" in the Atelier switch to zero-proof versions; zero-proof originals sort first on /cocktails.
- Cocktail detail has an **Orijinal / Alkolsüz** switch; swapped lines say "X yerine".
- Atelier and Cellar have an "Alkolsüz 0%" shelf/filter (`ingredient.zero`). Adding an alcoholic ingredient? Add it to `MAP` in `zero.ts` (category fallbacks exist).

## World menus (`/cocktails`)
`/cocktails` opens on the world's printed menu (`WorldMenu.tsx`); "Tüm tarifler" (`#all`) shows the old grid with search and filters, and the back button returns to the menu. Per world: Maison Art Deco carte (No. I, II…), Anatolia meyhane list under a mihrab arch (Arabic-Indic numerals, kilim rules), Cosmos flight manifest (star coordinates), Jazz speakeasy card (prices in cents by strength), Sakura vertical oshinagaki (kanji numerals, hanko seal), Alchemist formulary on parchment (planet sign per family, wax seal), Tiki grog log in a bamboo frame (mana dots = strength), Boreal birch-bark scroll (❄ degrees = ABV), Riviera bistro chalkboard (vintage year). Marks live in `MARK`, kicker and footer lines in `HEAD`; skins in `globals.css` → "WORLD MENUS".

## Pages
`/` home · `/cocktails` + `/cocktails/[id]` · `/cellar` + `/cellar/[id]` · `/atelier` (the world's bar: 3D bottle shelves, counter, vessel & garnish pickers, gauge, save signature) · `/lineage` (family tree) · `/concierge` · `/bar` (what can I make) · `/party` (party planner) · `/secret` (weekly secret ingredient) · `/glass-ice` · `/games` · `/passport` · `/worlds` · `/book` (Cocktail Book) · `/collection` (printable menu) · `/r/[code]` (shared recipe) · `/api/card` (card image).

## How to add things
- **Ingredient**: add a row to `ingredientsMore.ts` (look string: `"tint[,o][,shape][,glassTint][,capColor]"`, profile = 6 digits sweet/sour/bitter/strong/fresh/aromatic).
- **Cocktail**: `c(...)` in `cocktails.ts`; `world` = `"all"` or a world id; `parent` links the Lineage tree.
- **World**: `WorldId` in `types.ts` → `worlds.ts` → tokens in `globals.css` → kit in `themeKit.ts` → backdrop, vessels, gauge, bottle style, music band, game.

## Decisions & gotchas
- Logo: owner's design, fine-line martini with olive; wordmark **GARNISH** / COCKTAIL WORLDS (`Logo.tsx`).
- Turkish `text-transform: uppercase` turns i into İ: set `lang={nameLang(x.name)}` (`src/lib/ui.ts`: "en" when the name is the same in TR and EN) wherever a name is rendered, else MARTİNİ / RİVİERA. `npm run smoke` catches misses.
- SVG arcs over 180° need the large-arc flag (see `BalanceGauge`).
- Grid children with horizontal scrollers need `min-width: 0`, or the page widens.
- No tabs in the header: all pages are in `GarnishMenu`. On phones (≤600px) the header keeps only signs (0%, music, globe, menu); add a new header control only if it still fits at 390px (`npm run smoke` checks).
- Home hero ends with an invitation to open the world's menu (`INVITE` in `src/app/page.tsx`), one line per world in the host's voice.
- Owner did not want: the old scale, flat bottles and glasses, the busy bright çini wall, the turquoise band on Anatolia glasses. (Same reason Riviera's counter is travertine with only a thin majolica edge.)
- Backdrops are `position: fixed`; full-page screenshots only show them in the first viewport. That is expected.

## Recipe sharing
- "Paylaş" on every cocktail page opens `SharePanel`. The link is `/r/<code>`: `negroni.jazz.en` (site cocktail · world, `maison-bordeaux` for a palette · lang · `.0` alcohol-free) or `~<base64url JSON>` for the visitor's own creation (it only lives in their browser, so the link carries the recipe; validated on read, the sharer's passport name rides along as `by`).
- `/r/[code]` (dynamic) shows a banner (who shared it, which world; "Bu dünyaya git", Jazz still asks for its password; "İmzalarıma ekle" for creations) above the normal `CocktailDetail`.
- `/api/card?c=<code>&f=wide|tall` renders the card (1200×630 or 1080×1350) with `next/og`: world wall + band + corners from `themeKit`, the same `GlassSvg`, world fonts fetched from Google Fonts subset to the card's text (the `ImageResponse` needs truetype). It is the og:image for `/r/…` and `/cocktails/[id]`, the panel's preview and the download. Satori rules: every multi-child div `display:flex`, borders only solid/dashed. `metadataBase` comes from `VERCEL_PROJECT_PRODUCTION_URL`.
- Locally, Node's fetch ignores the proxy: start the server with `NODE_USE_ENV_PROXY=1` or the card falls back to the default font.

## Cocktail Book (`/book`)
- `src/data/book.ts`: `BOOK_FROM_SITE` (41 site cocktails: the canon, golden-age, tiki, spritz, alcohol-free classics) + `BOOK_EXTRAS` (12 famous drinks written only for the book: Cosmopolitan, Caipirinha, Bloody Mary, Pisco Sour, Mint Julep, White Russian, Bellini, Clover Club, Penicillin, Paper Plane, Dark 'n' Stormy, Brandy Alexander) = 53 pages. `CocktailBook.tsx` renders cover, contents and one two-page spread per drink.
- Effect: the photo (or, until there is one, the glass drawn large) sits faded and grey; when the spread is in view (`IntersectionObserver` → `.lit`) or hovered it comes up to full colour, and the text page brightens with it.
- Book form per world ("COCKTAIL BOOK" in `globals.css`): Maison black morocco with gilt fillets, Anatolia illuminated manuscript (gold and lapis tezhip, arch), Cosmos holographic star atlas, Jazz black ledger with brass corners, Sakura stitched orihon with hanko, Alchemist oxblood grimoire with brass clasp, Tiki bamboo-bound scrapbook with tape, Boreal birch-bark boards, Riviera linen cellar notebook. Cover titles in `COVER`.
- **Photos: still to do.** `src/data/bookPhotos.ts` is empty; a page uses its photo as soon as an entry exists. Unsplash only (Pexels blocks automated access). Use the official API with `UNSPLASH_ACCESS_KEY` from the environment (`Authorization: Client-ID …`); never scrape, never spoof a browser. Hotlink `urls.raw` (the page adds size params), call the photo's `links.download_location` once when you choose it, and keep the credit (photographer + Unsplash, with links; the page renders it). Check every photo by eye: the right drink, no logos, no faces. This is the only exception to "no image files".

## Next up
Offline/PWA. One PR each.

## Ideas parked for later
User accounts (would need a backend, e.g. Supabase), photo-real assets.
