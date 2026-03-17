const CACHE_NAME = 'kashif-admin-v2.1';
const STATIC_ASSETS = [
  '/Kashifdevskills/admin.html',
  '/Kashifdevskills/admin-manifest.json',
  '/Kashifdevskills/Kashifdawar.jpg',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
];

// 1. Install - Pre-cache critical files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    .then(() => self.skipWaiting())
  );
});

// 2. Activate - Cleanup old versions to save mobile storage
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

// 3. Fetch - Smart Strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // CRITICAL: Never cache Firebase real-time traffic
  if (url.origin.includes('firebaseio.com') || url.origin.includes('gstatic.com') || event.request.method !== 'GET') {
    return; 
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If network works, update cache
        if (response.status === 200) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        }
        return response;
      })
      .catch(() => {
        // If offline, try cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback to the main admin page if it's a navigation request
          if (event.request.mode === 'navigate') {
            return caches.match('/Kashifdevskills/admin.html');
          }
        });
      })
  );
});