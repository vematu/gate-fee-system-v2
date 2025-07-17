const CACHE_NAME = "gate-fee-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./login.html",
  "./home.html",
  "./add-user.html",
  "./enter-gate-fee.html",
  "./view-data.html",
  "./view-data-gate.html",
  "./view-supporters.html",
  "./register-supporter.html",
  "./manifest.json",
  "./style.css",
  "./sw.js",
  "./logo.jpg" // ensure this exists
];

// Install event – caching all files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event – cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event – serve from cache or go to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./index.html'); // Fallback for offline
      });
    })
  );
});
