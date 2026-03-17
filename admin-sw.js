const CACHE_NAME = 'kashif-admin-v3.0';
const ASSETS_TO_CACHE = [
  '/Kashifdevskills/admin_1.html',
  '/Kashifdevskills/admin-manifest.json',
  '/Kashifdevskills/Kashifdawar.jpg',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // NEVER cache Firebase or EmailJS API calls
  if (url.origin.includes('firebaseio.com') || url.origin.includes('emailjs.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (event.request.method === 'GET' && response.status === 200) {
          const cln = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cln));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((res) => res || caches.match('/Kashifdevskills/admin_1.html')))
  );
});