// Service worker : hors-ligne + mise à jour automatique.
const CACHE='rapports-kidebouchetou-v3';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return; // Google APIs : réseau uniquement
  const isHtml=e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
  // HTML : toujours revalider en ligne (contourne le cache 10 min de GitHub Pages) ; sinon cache si dispo
  e.respondWith(fetch(e.request,isHtml?{cache:'no-cache'}:{}).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(k=>k.put(e.request,c))}return r})
    .catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
