
/* global self */
import { log } from './log';

export function onActivate(e) {

  e.waitUntil(
    self.caches.keys()
    .then(cacheNames => {
      log('Activated');
      return Promise.all(
        cacheNames
        .filter(cacheName => cacheName !== self.cacheName)
        .map(cacheName => {
          log('Removing cached files from ', cacheName);
          self.caches.delete(cacheName);
        })
      );
    })
    .then(() => {
      log('Claiming clients');
      return self.clients.claim();
    })
  );
}



