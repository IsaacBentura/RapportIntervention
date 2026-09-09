// Service worker : hors-ligne + mise à jour proposée à l'utilisateur.
const CACHE='rapports-kidebouchetou-1-8';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('message',e=>{if(e.data==='skipWaiting')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  const isHtml=e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
  // version installée servie depuis le cache (cohérence), réseau en secours ; la détection de mise à jour passe par sw.js
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request,isHtml?{cache:'no-cache'}:{}).then(r=>{if(r.ok){const cl=r.clone();caches.open(CACHE).then(k=>k.put(e.request,cl))}return r})).catch(()=>caches.match('./index.html')));
});
