// cache name
const CACHE_STATIC_NAME = 'static';
const CACHE_DYNAMIC_NAME = 'dynamic';


// access the service worker in background process and excute event listener
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);

    // load all asset before stop service worker and store into caches
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function(cache) {
                console.log('[Service Worker] Pre-caching App Shell');
                
                // add cache multiple files
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/promise.js',
                    '/src/js/fetch.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/main-image.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ]);
            })
    )
});

// listener activate event
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    // clean up old static cache and dynamic cache if content of changed
    event.waitUntil(
        caches.keys()   // loop all key in caches
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    // if current key not equal updated key in cache then remove old key
                    if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();l
});

// listener fetch event
self.addEventListener('fetch', function(event) {
    // retrieving items from the cache
    event.respondWith(
        // request are your key of cache
        caches.match(event.request)
            .then(function(response) {
                // if request from cache exist then return response when offline
                if(response) {
                    return response;
                } else {
                    // continue request if network is connect
                    return fetch(event.request)
                        .then(function(res) { // after request, server will send response
                            return caches.open(CACHE_DYNAMIC_NAME) // store response from server to cache
                                .then(function(cache) {
                                    // store request and clone res (response) into cache
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                });
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                }
            })

    );
});
