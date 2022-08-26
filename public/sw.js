import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import {
  offlineFallback,
  staticResourceCache,
  imageCache,
} from 'workbox-recipes';
import { setDefaultHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

cleanupOutdatedCaches();

setDefaultHandler(new NetworkOnly());

precacheAndRoute(self.__WB_MANIFEST);

// Cache our static resources (css, js, etc)
staticResourceCache();

// Cache our images
imageCache();

// Provide an offline fallback
offlineFallback({
  pageFallback: '/offline.html',
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
