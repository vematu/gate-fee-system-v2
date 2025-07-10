const CACHE_NAME = "gate-fee-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./login.html",
  "./home.html",
  "./add-user.html",
  "./enter-fee.html",
  "./view-data.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
