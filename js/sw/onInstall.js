
/* global self */
import { log } from './log';
import { cacheFilesBefore, cacheFilesAfter } from './cacheFiles';

let cache;

export function onInstall(e) {

  e.waitUntil(
    self.caches.open(self.cacheName)
    .then(cache_ => {
      cache = cache_;
      log('Installed', cache);
      return cache.addAll(cacheFilesBefore);
    })
    .then(() => {
      return self.skipWaiting();
    })
    .then(() => {
      return cache.addAll(cacheFilesAfter);
    })
    .catch(err => {
      log('Install: Error', err);
    })
  );

}
