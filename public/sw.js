/* Garnish service worker: the site keeps working without a connection.
 *
 *  pages (HTML and RSC)  network first (3 s), then the copy kept from the last visit,
 *                        then /offline
 *  /_next/static, icons  cache first (file names are hashed, they never change)
 *  Google Fonts          cache first once fetched
 *  /api/*                network only (cards and PDFs are made on the server)
 *
 * The page can ask for everything up front: postMessage({ type: "precache", urls }).
 */
const VERSION = "garnish-v1";
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;
const FONTS = `${VERSION}-fonts`;
const CORE = ["/", "/cocktails", "/book", "/offline", "/icon.svg", "/manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(PAGES)
      .then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));

async function networkFirst(req, cacheKey) {
  const cache = await caches.open(PAGES);
  try {
    const res = await Promise.race([fetch(req), timeout(3000)]);
    if (res.ok) cache.put(cacheKey, res.clone());
    return res;
  } catch {
    const hit = (await cache.match(cacheKey)) || (await cache.match(cacheKey, { ignoreSearch: true }));
    if (hit) return hit;
    if (req.mode === "navigate") return (await cache.match("/offline")) || Response.error();
    return Response.error();
  }
}

async function cacheFirst(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === "opaque") cache.put(req, res.clone());
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(cacheFirst(req, FONTS));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/pwa-icon/") || url.pathname === "/icon.svg") {
    e.respondWith(cacheFirst(req, ASSETS));
    return;
  }
  // client-side navigations fetch the RSC payload; keep one copy per page
  if (req.headers.get("RSC") === "1") {
    const key = new URL(url.pathname, url.origin).toString() + "#rsc";
    e.respondWith(networkFirst(req, key));
    return;
  }
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    e.respondWith(networkFirst(req, new URL(url.pathname, url.origin).toString()));
  }
});

// "make everything available offline": fetch every page once, report progress
self.addEventListener("message", (e) => {
  if (e.data?.type !== "precache" || !Array.isArray(e.data.urls)) return;
  const port = e.ports[0];
  e.waitUntil(
    (async () => {
      const cache = await caches.open(PAGES);
      let done = 0;
      const urls = e.data.urls;
      const queue = [...urls];
      const worker = async () => {
        while (queue.length) {
          const u = queue.shift();
          try {
            const res = await fetch(u, { credentials: "same-origin" });
            if (res.ok) {
              await cache.put(new URL(u, self.location.origin).toString(), res.clone());
              // the page's scripts and styles, so it can start without a network
              const html = await res.text();
              const assets = [...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g)].map((m) => m[1]);
              const a = await caches.open(ASSETS);
              await Promise.all(assets.map((x) => a.match(x).then((hit) => hit || a.add(x).catch(() => {}))));
            }
          } catch {
            /* skip this one */
          }
          done++;
          port?.postMessage({ done, total: urls.length });
        }
      };
      await Promise.all([worker(), worker(), worker(), worker()]);
      port?.postMessage({ done: urls.length, total: urls.length, finished: true });
    })(),
  );
});
