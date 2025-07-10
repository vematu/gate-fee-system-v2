const CACHE_NAME = "gate-fee-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./login.html",
  "./home.html",
  "./add-user.html",
  "./enter-fee.html",
  "./view-data.html",
  "./manifest.json"
];

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
