
/* global self */
import { log } from './log';


let cache;

export function onFetch(e) {

  const url = e.request.url;
  const destination = e.request.destination;
  log('Request Destination', destination);

  switch (destination) {
    case 'style':
    case 'script':
    case 'manifest':
    case 'document':
    case 'font':
    case 'image': {
      log('Fetching cache then network', url);
      e.respondWith(
        self.caches.open(self.cacheName)
        .then(cache_ => {
          cache = cache_;
          return cache.match(e.request);
        })
        .then(cachedResponse => {
          if (cachedResponse) {
            log('Serving from cache', cachedResponse.url);
            return cachedResponse;
          }
          return self.fetch(e.request);
        })
        .then(networkResponse => {
          log('Catching', url);
          e.waitUntil(
            cache.put(e.request, networkResponse.clone())
          );
          return networkResponse;
        })
        .catch(err => {
          log('Fetch error', err);
        })
      );
      return;
    }
    default: {
      // All `XMLHttpRequest` or `fetch()` calls where
      // `Request.destination` is the empty string default value
      log('Fetching network only', url);
      e.respondWith(
        self.fetch(e.request)
      );
      return;
    }
  }


}


