/* VocabHub service worker — v2.73
   - Precaches the app shell so the app opens instantly and works offline.
   - Pages: network-first (new versions arrive automatically), cache fallback offline.
   - Static files: stale-while-revalidate.
   - vocabulary.json: network-first with cache fallback (script.js also embeds an offline copy).
   - Google Fonts: runtime cached. */
const VERSION = 'v2.73';
const SHELL_CACHE = 'vocabhub-shell-' + VERSION;
const RUNTIME_CACHE = 'vocabhub-runtime-' + VERSION;

const SHELL = [
  './',
  'index.html',
  'style.css?v=2.72',
  'script.js?v=2.72',
  'iba-data.js',
  'hsc-data.js',
  'ckruet-data.js',
  'du-abcd-data.js',
  'bcs-data.js',
  'pwa.js',
  'manifest.webmanifest',
  'assets/logo.png',
  'assets/hub-logo.png',
  'assets/icons/favicon.png',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/maskable-192.png',
  'assets/icons/maskable-512.png',
  'assets/icons/profile-placeholder.svg',
  'assets/institutions/du.jpg',
  'assets/institutions/iba.jpg',
  'assets/institutions/ckruet.jpg',
  'assets/institutions/medical.jpg',
  'assets/photos/araf.jpg',
  'assets/photos/shahed.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    // add one by one so a single missing file never blocks installation
    await Promise.all(SHELL.map(async url => {
      try { await cache.add(new Request(url, { cache: 'reload' })); } catch (e) { /* ignore */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keep = [SHELL_CACHE, RUNTIME_CACHE];
    const names = await caches.keys();
    await Promise.all(names.filter(n => n.startsWith('vocabhub-') && !keep.includes(n)).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const hit = (await cache.match(request, { ignoreSearch: true })) ||
                (await caches.match(request, { ignoreSearch: true })) ||
                (fallbackUrl ? await caches.match(fallbackUrl) : undefined);
    if (hit) return hit;
    throw err;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = (await cache.match(request)) || (await caches.match(request, { ignoreSearch: true }));
  const refresh = fetch(request).then(res => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
    return res;
  }).catch(() => undefined);
  return cached || (await refresh) || Response.error();
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // page navigations → network first, fall back to cached shell
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req, SHELL_CACHE, 'index.html'));
    return;
  }

  // large vocabulary data → network first, cached fallback
  if (url.pathname.endsWith('/vocabulary.json') || url.pathname.includes('/data/')) {
    event.respondWith(networkFirst(req, RUNTIME_CACHE));
    return;
  }

  // everything else (css, js, images, icons)
  event.respondWith(staleWhileRevalidate(req, SHELL_CACHE));
});
