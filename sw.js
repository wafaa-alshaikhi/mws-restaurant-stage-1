var CacheName = 'restaurant-cahce';

let cacheAssests = [
    '/',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',    

];
// insalling the SW andd add the pages to the cache
self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(CacheName).then(function (cache) {
            console.log(cache);
            return cache.addAll(cacheAssests);

        }).catch(erroe => {
            console.log(erroe);
        })
    );
});

//activate the SW and each time update it it will delete the prevois one
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant') &&
                        cacheName != CacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//if the server in offline Mode the server will responce with the pages that in cach
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});