/*
 * Bitropix service worker.
 * Keeps static data in the visitor's browser so repeat visits and reloads are instant:
 *   - /_next/static/*  (content-hashed JS/CSS/fonts)  -> cache-first, immutable
 *   - images & fonts                                   -> stale-while-revalidate
 *   - page navigations                                 -> network-first (fresh content),
 *                                                         falls back to cache when slow/offline
 * Never touches /api/*, cross-origin requests, or non-GET requests.
 */
const VERSION = 'bx-v2'; // bump whenever cached assets change (v2: new WebP image set)
const STATIC_CACHE = `${VERSION}-static`;
const ASSET_CACHE = `${VERSION}-assets`;
const PAGE_CACHE = `${VERSION}-pages`;
const PRECACHE = ['/', '/images/logo.png'];
const MAX_ASSETS = 120;
const MAX_PAGES = 40;
const NAV_TIMEOUT_MS = 3500;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

function isCacheable(response) {
  return response && response.ok && response.type === 'basic';
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (isCacheable(res)) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(event, request) {
  const cache = await caches.open(ASSET_CACHE);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (isCacheable(res)) {
        cache.put(request, res.clone()).then(() => trim(ASSET_CACHE, MAX_ASSETS));
      }
      return res;
    })
    .catch(() => hit);
  if (hit) {
    event.waitUntil(network);
    return hit;
  }
  return network;
}

async function networkFirst(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const res = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), NAV_TIMEOUT_MS)),
    ]);
    if (isCacheable(res)) {
      cache.put(request, res.clone()).then(() => trim(PAGE_CACHE, MAX_PAGES));
    }
    return res;
  } catch {
    const hit = (await cache.match(request)) || (await cache.match('/'));
    if (hit) return hit;
    return fetch(request);
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;
  // React Server Component payloads are build-specific; let Next's router handle them.
  if (request.headers.get('RSC') || url.searchParams.has('_rsc')) return;

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    url.pathname.startsWith('/_next/image') ||
    /\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|otf)$/i.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(event, request));
  }
});
