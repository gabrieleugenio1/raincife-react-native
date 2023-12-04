const CACHE_NAME = 'Raincife';
const urlsToCache = [
  '/',
  '/home/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) 
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Adicione o escopo ao registrar o Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    .then(function(registration) {
      // Registro bem-sucedido
      console.log('Service Worker registrado com sucesso!', registration);
    })
    .catch(function(error) {
      // O registro falhou
      console.error('Erro ao registrar o Service Worker:', error);
    });
}
