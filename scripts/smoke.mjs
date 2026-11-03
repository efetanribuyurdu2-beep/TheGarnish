// Smoke test: visits every page in every world and reports
//  - console errors and uncaught exceptions
//  - horizontal overflow (page wider than the viewport) at phone and desktop width
//  - dotted capital İ inside English names (Turkish uppercase on a name without lang="en")
//  - how smoothly each world transition runs (frames per second, worst frame)
//
// Usage: npm run build && npx next start -p 3100   (in another terminal)
//        npm run smoke                              (BASE=http://localhost:3100 by default)
//        npm run smoke -- --quick                   (desktop only, fewer pages)
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const BASE = process.env.BASE || "http://localhost:3100";
const QUICK = process.argv.includes("--quick");
const WORLDS = ["maison", "anatolia", "cosmos", "jazz", "sakura", "alchemist", "tiki", "boreal", "riviera"];
const PAGES = QUICK
  ? ["/", "/worlds", "/cocktails", "/cocktails/martini", "/atelier", "/passport"]
  : ["/", "/worlds", "/cocktails", "/cocktails/martini", "/cellar", "/cellar/gin", "/atelier", "/lineage", "/concierge", "/bar", "/glass-ice", "/games", "/passport", "/collection"];
const VIEWPORTS = QUICK ? [{ width: 1440, height: 900 }] : [{ width: 390, height: 844 }, { width: 1440, height: 900 }];

// English names that must never show a dotted İ: world names and cocktail names written with n("…")
const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const NAMES = [
  ...[...read("src/data/worlds.ts").matchAll(/name: \{ tr: "([^"]+)", en: "\1" \}/g)].map((m) => m[1]),
  ...[...read("src/data/cocktails.ts").matchAll(/\bn\("([^"]+)"\)/g)].map((m) => m[1]),
].filter((s) => /i/.test(s));

const prefs = (world) => ({ world, palette: "noir", lang: "tr", favourites: [], bar: [], creations: [], zero: false, stamps: {}, traveller: "", jazzKey: true });

const problems = [];
const report = (world, page, vp, kind, detail) => problems.push({ world, page, vp, kind, detail });

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: vp });
  const p = await ctx.newPage();
  let errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(BASE + "/");
  for (const world of WORLDS) {
    await p.evaluate((v) => localStorage.setItem("garnish:prefs:v1", JSON.stringify(v)), prefs(world));
    for (const page of PAGES) {
      errs = [];
      const res = await p.goto(BASE + page, { waitUntil: "networkidle" });
      if (!res || res.status() >= 400) report(world, page, vp.width, "http", res ? res.status() : "no response");
      await p.waitForTimeout(250);
      const out = await p.evaluate((names) => {
        const wide = document.documentElement.scrollWidth - window.innerWidth;
        const dotted = [];
        for (const el of document.querySelectorAll("body *")) {
          if (el.children.length) continue;
          const text = el.textContent?.trim();
          if (!text || !names.includes(text)) continue;
          const lang = el.closest("[lang]")?.getAttribute("lang");
          if (lang === "tr" && getComputedStyle(el).textTransform === "uppercase") dotted.push(text);
        }
        return { wide, dotted: [...new Set(dotted)] };
      }, NAMES);
      if (out.wide > 1) report(world, page, vp.width, "overflow", `${out.wide}px wider than the screen`);
      if (out.dotted.length) report(world, page, vp.width, "dotted-İ", out.dotted.join(", "));
      for (const e of errs) report(world, page, vp.width, "console", e.slice(0, 200));
    }
  }
  await ctx.close();
}

// World transitions, played from /worlds the way a visitor would
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(BASE + "/");
await p.evaluate((v) => localStorage.setItem("garnish:prefs:v1", JSON.stringify(v)), prefs("riviera"));
await p.goto(BASE + "/worlds", { waitUntil: "networkidle" });
const fps = [];
for (const world of WORLDS) {
  await p.evaluate(() => window.scrollTo(0, 0));
  const measure = p.evaluate(
    () =>
      new Promise((done) => {
        let n = 0, worst = 0;
        const t0 = performance.now();
        let last = t0;
        const tick = (t) => {
          n++;
          worst = Math.max(worst, t - last);
          last = t;
          if (t - t0 < 1800) requestAnimationFrame(tick);
          else done({ fps: Math.round(n / ((t - t0) / 1000)), worst: Math.round(worst) });
        };
        requestAnimationFrame(tick);
      }),
  );
  await p.locator(`#portal-${world} .portal-face`).click();
  if (world === "maison") await p.locator("#portal-maison .portal-step .btn").last().click();
  const m = await measure;
  await p.waitForTimeout(600);
  const now = await p.evaluate(() => JSON.parse(localStorage.getItem("garnish:prefs:v1")).world);
  if (now !== world) report(world, "/worlds", 1440, "transition", `ended in ${now}`);
  fps.push({ world, ...m });
}
await browser.close();

console.log("\nTransitions (headless, no GPU: compare worlds with each other, not with a real phone)");
for (const f of fps) console.log(`  ${f.world.padEnd(10)} ${String(f.fps).padStart(3)} fps   worst frame ${f.worst} ms`);
console.log(`\nChecked ${WORLDS.length} worlds × ${PAGES.length} pages × ${VIEWPORTS.length} screen sizes.`);
if (!problems.length) console.log("No problems found.");
else {
  console.log(`${problems.length} problem(s):`);
  for (const x of problems) console.log(`  [${x.kind}] ${x.world} ${x.page} @${x.vp}px: ${x.detail}`);
  process.exitCode = 1;
}
