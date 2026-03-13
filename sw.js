// ============================================
// SERVICE WORKER - Kashif Dawar Portfolio
// Version: 1.0.0
// ============================================

const CACHE_NAME = "kashif-portfolio-v1";

// Files to cache for offline use
const ASSETS_TO_CACHE = [
  "/Kashifdevskills/",
  "/Kashifdevskills/index.html",
  "/Kashifdevskills/certificate.html",
  "/Kashifdevskills/manifest.json",
  "/Kashifdevskills/Kashifdawar.png",
  "/Kashifdevskills/Basic calculator.png",
  "/Kashifdevskills/1000081919.jpg",
  "/Kashifdevskills/cert-vse.png",
  "/Kashifdevskills/cert-aws.png",
  "/Kashifdevskills/Kashif_Dawar_CV.pdf",
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
];

// ============================================
// INSTALL — Cache all assets
// ============================================
self.addEventListener("install", (event) => {
  console.log("[SW] Installing Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching all assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      console.log("[SW] All assets cached successfully.");
      return self.skipWaiting();
    })
  );
});

// ============================================
// ACTIVATE — Clean up old caches
// ============================================
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating Service Worker...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log("[SW] Service Worker activated.");
      return self.clients.claim();
    })
  );
});

// ============================================
// FETCH — Network first, fallback to cache
// ============================================
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Got a valid response — clone and update cache
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log("[SW] Serving from cache:", event.request.url);
            return cachedResponse;
          }
          // If nothing in cache, return offline fallback
          return caches.match("/Kashifdevskills/index.html");
        });
      })
  );
});
