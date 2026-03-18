// ============================================================
// SERVICE WORKER — Kashif Dawar Portfolio + Admin PWA
// Version: 14.0.0
//
// ── Strategies ──
//   Static assets  (CSS/JS/fonts/images) → Cache First
//   HTML pages     (navigation)          → Network First
//   External CDN   (Fonts/EmailJS)       → Stale While Revalidate
//   APIs/Firebase  (dynamic data)        → Network Only (never cache)
//
// ── v14 changes over v13 ──
//   + admin.html added to static assets (Cache First)
//   + admin-manifest.json added to static assets
//   + admin offline fallback → admin.html (not index.html)
//   + Push notification listener for admin new-message alerts
//   + notificationclick handler — focuses/opens admin tab
//   + CDN: emailjs cdn added to stale-while-revalidate list
// ============================================================

const VERSION        = 'v14';
const CACHE_STATIC   = `kashif-static-${VERSION}`;   // CSS, JS, images, HTML
const CACHE_PAGES    = `kashif-pages-${VERSION}`;     // HTML navigation
const CACHE_EXTERNAL = `kashif-external-${VERSION}`;  // CDN fonts/icons
const ALL_CACHES     = [CACHE_STATIC, CACHE_PAGES, CACHE_EXTERNAL];


// ── Max items per cache to prevent storage bloat ──
const MAX_STATIC_ITEMS   = 60;
const MAX_EXTERNAL_ITEMS = 20;


// ── Static assets — cache first (your own files) ──
const STATIC_ASSETS = [
  "index.html",
  "admin.html",            /* v14: admin panel */
  "certificate.html",
  "manifest.json",
  "admin-manifest.json",   /* v14: admin PWA manifest */
  "style.css",
  "script.js",
  "dashboard.js",
  "Kashifdawar.jpg",
  "Basic calculator.png",
  "1000081919.jpg",
  "cert-vse.png",
  "cert-aws.png",
  "cert-ebi.png",
  "cert-defi.png",
  "cert-dapps.png",
  "cert-crypto.png",
  "cert-nft.png",
  "cert-injective.png",
  "cert-regulatory.png",
  "cert-sustainability.png",
  "cert-trading.png",
  "cert-blockchain-deep.png",
  "Kashif_Dawar_CV.pdf"
];


// ── External CDN — stale while revalidate ──
const EXTERNAL_ASSETS = [
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"  /* v14: emailjs */
];


// ── Never cache these — always network ──
const NEVER_CACHE_PATTERNS = [
  "firebasedatabase.app",
  "firebaseapp.com",
  "gstatic.com/firebasejs",
  "ipwho.is",
  "ipinfo.io",
  "ipapi.co",
  "coingecko.com",
  "emailjs.com",           /* EmailJS API calls — never cache */
  "flagcdn.com",
  "googleapis.com/gtag",
  "api.github.com",
  "googletagmanager.com"
];


function shouldNeverCache(url) {
  return NEVER_CACHE_PATTERNS.some(p => url.includes(p));
}


function isExternalCDN(url) {
  return EXTERNAL_ASSETS.some(asset => url.startsWith(asset.split('?')[0].substring(0, 40)));
}


function isStaticAsset(url) {
  return /\.(css|js|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|pdf|ico)(\?|$)/i.test(url);
}


function isNavigationRequest(request) {
  return request.mode === 'navigate';
}


// v14: detect if navigation is to admin.html
function isAdminNavigation(url) {
  return url.includes('admin.html');
}


// ── Trim cache to max items ──
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys  = await cache.keys();
  if (keys.length > maxItems) {
    const deleteCount = keys.length - maxItems;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
  }
}


// ============================================================
// INSTALL — Pre-cache static assets
// ============================================================
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      // Cache portfolio + admin static assets
      const staticCache = await caches.open(CACHE_STATIC);
      await staticCache.addAll(STATIC_ASSETS).catch(err => {
        console.warn("[SW v14] Some static assets failed to cache:", err);
      });

      // Cache external CDN assets individually (don't fail install if CDN is down)
      const externalCache = await caches.open(CACHE_EXTERNAL);
      for (const url of EXTERNAL_ASSETS) {
        try {
          await externalCache.add(url);
        } catch(e) {
          console.warn("[SW v14] External asset failed:", url);
        }
      }

      // Take control immediately — don't wait for old SW to die
      await self.skipWaiting();
    })()
  );
});


// ============================================================
// ACTIVATE — Delete old caches, enable navigation preload
// ============================================================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Delete all caches from previous versions (v13 and earlier)
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => !ALL_CACHES.includes(name))
          .map(name => caches.delete(name))
      );

      // Enable navigation preload for faster navigation
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      // Take control of all clients immediately
      await self.clients.claim();
    })()
  );
});


// ============================================================
// MESSAGE — Handle skipWaiting from UI prompt
// ============================================================
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


// ============================================================
// FETCH — Multi-strategy routing
// ============================================================
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  const url = event.request.url;

  // ── Strategy 0: Never cache — go straight to network ──
  if (shouldNeverCache(url)) return;

  // ── Strategy 1: Navigation (HTML pages) — Network First ──
  if (isNavigationRequest(event.request)) {
    event.respondWith(networkFirstHTML(event));
    return;
  }

  // ── Strategy 2: External CDN — Stale While Revalidate ──
  if (isExternalCDN(url)) {
    event.respondWith(staleWhileRevalidate(event.request, CACHE_EXTERNAL));
    return;
  }

  // ── Strategy 3: Static assets — Cache First ──
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request, CACHE_STATIC));
    return;
  }

  // ── Strategy 4: Everything else — Network First ──
  event.respondWith(networkFirst(event.request, CACHE_PAGES));
});


// ============================================================
// STRATEGY: Network First for HTML (with navigation preload)
// v14: admin.html falls back to cached admin.html, not index.html
// ============================================================
async function networkFirstHTML(event) {
  const url = event.request.url;

  try {
    // Use navigation preload response if available (faster!)
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      const cache = await caches.open(CACHE_PAGES);
      cache.put(event.request, preloadResponse.clone());
      return preloadResponse;
    }

    // Fall back to normal fetch
    const networkResponse = await fetch(event.request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_PAGES);
      cache.put(event.request, networkResponse.clone());
    }
    return networkResponse;

  } catch (err) {
    // Network failed — try cache first
    const cached = await caches.match(event.request);
    if (cached) return cached;

    // v14: admin navigation falls back to cached admin.html
    if (isAdminNavigation(url)) {
      const adminCached = await caches.match("admin.html");
      if (adminCached) return adminCached;
    }

    // Portfolio navigation falls back to index.html
    return caches.match("index.html");
  }
}


// ============================================================
// STRATEGY: Cache First (static assets)
// ============================================================
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  // Not in cache — fetch and store
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      trimCache(cacheName, MAX_STATIC_ITEMS);
    }
    return networkResponse;
  } catch (err) {
    return new Response('Asset unavailable offline', { status: 503 });
  }
}


// ============================================================
// STRATEGY: Network First (general)
// ============================================================
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match("index.html");
  }
}


// ============================================================
// STRATEGY: Stale While Revalidate (CDN fonts/icons/emailjs)
// ============================================================
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  // Fetch fresh in background regardless
  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      trimCache(cacheName, MAX_EXTERNAL_ITEMS);
    }
    return networkResponse;
  }).catch(() => null);

  // Return cached immediately, or wait for network if nothing cached
  return cached || fetchPromise;
}


// ============================================================
// v14: PUSH NOTIFICATIONS — for admin new message alerts
// Fires when a push event arrives (requires FCM setup to use,
// but handler is ready for when you upgrade)
// ============================================================
self.addEventListener("push", (event) => {
  const data = event.data
    ? event.data.json()
    : { title: '📩 New Message', body: 'Someone sent you a message.' };

  event.waitUntil(
    self.registration.showNotification(data.title || '📩 New Message', {
      body:    data.body    || 'Open Command Center to view.',
      icon:    'Kashifdawar.jpg',
      badge:   'Kashifdawar.jpg',
      tag:     data.tag     || 'admin-msg',
      renotify: true,
      vibrate: [200, 100, 200],
      data:    { url: data.url || './admin.html' }
    })
  );
});


// ============================================================
// v14: NOTIFICATION CLICK — opens/focuses admin tab
// ============================================================
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = (event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : './admin.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // If admin tab is already open — focus it
      for (const client of clientList) {
        if (client.url.includes('admin.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new tab
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
