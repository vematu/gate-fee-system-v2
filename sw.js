const CACHE_NAME = "gate-fee-cache-v2"; // bump version
const urlsToCache = [
  "./",
  "./index.html",
  "./login.html",
  "./home.html",
  "./add-user.html",
  "./enter-fee.html",
  "./view-data.html",
  "./register-supporter.html",
  "./manifest.json",
  "./style.css"
];

// Install new service worker and force new cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // force immediate activation
});

// Delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => k !== CACHE_NAME && caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch normally from cache or network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

