// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static').then((cache) => {
      console.log('Opened cache');
      return cache.addAll([
        'https://tesfaye-eshetie.github.io/reusable-comment-component/',
        'index.html',
        'css/styles.css',
        'images/cute_dog.avif',
        'js/index.js',
        'js/idb/indexedDB.js',
        'js/component/userComment.js',
      ]);
    })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then((res) => {
          return caches.open('dynamic').then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push('static');
  cacheWhitelist.push('dynamic');

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
