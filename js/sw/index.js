
/* global self */

import { onInstall } from './onInstall';
import { onActivate } from './onActivate';
import { onFetch } from './onFetch';

self.cacheName = 'v1';

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);

