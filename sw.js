// UPDATED: Version v7 (Bumped version to force update)
const CACHE_NAME = 'kashif-pro-v7';

// LIST OF ALL FILES TO SAVE OFFLINE
// I added 'scientific calculator.png' just in case you use it in the UI
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './bmi-calculator.html',
  './contact.html',
  './exponent.html',
  './fraction.html',
  './log-calculator.html',
  './mortgage-calculator.html',
  './percentage.html',
  './privacy.html',
  './standard-deviation.html',
  './terms.html',
  './manifest.json',
  './icon.png'
];

// 1. Install Event: Downloads all files
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces new service worker to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching all assets...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate Event: Deletes OLD cache versions (v1...v6)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Removing old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// 3. Fetch Event: "Network First" for HTML, "Cache First" for Assets
self.addEventListener('fetch', (e) => {
  
  // A. IGNORE Google Ads/Analytics/External Links (Don't cache these)
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }

  // B. STRATEGY: Network First for HTML (To ensure users get Updates/Bug Fixes)
  if (e.request.headers.get('accept').includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          // If network works, update the cache with new version
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          // If offline, fallback to cache
          return caches.match(e.request);
        })
    );
    return;
  }

  // C. STRATEGY: Cache First for CSS/JS/Images (For Speed)
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Return cached file if found, otherwise go to network
      return response || fetch(e.request);
    })
  );
});
