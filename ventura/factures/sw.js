// Service worker : hors-ligne + mise à jour proposée à l'utilisateur.
const CACHE='rapports-factures-ventura-1-49';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('message',e=>{if(e.data==='skipWaiting')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  // « Partager vers » avec fichiers : le POST est stocké puis la page rouverte en GET
  if(e.request.method==='POST'&&u.origin===location.origin&&u.searchParams.get('share')==='files'){
    e.respondWith((async()=>{try{const fd=await e.request.formData();const files=fd.getAll('files').filter(f=>f&&f.size);
      const item={title:fd.get('title')||'',text:fd.get('text')||'',url:fd.get('url')||'',files};
      const key='share-inbox-notes-'+(u.pathname.split('/').filter(Boolean).reverse().find(s=>['ventura','kidebouchetou'].includes(s))||'ventura');
      await new Promise((res,rej)=>{const r=indexedDB.open(key,1);r.onupgradeneeded=ev=>ev.target.result.createObjectStore('items',{autoIncrement:true});
        r.onsuccess=ev=>{const d=ev.target.result;const t=d.transaction('items','readwrite');t.objectStore('items').add(item);t.oncomplete=res;t.onerror=rej};r.onerror=rej})}catch(err){}
      return Response.redirect('./index.html?shared=1',303)})());return}
  if(u.origin!==location.origin)return;
  const isHtml=e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
  // version installée servie depuis le cache (cohérence), réseau en secours ; la détection de mise à jour passe par sw.js
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request,isHtml?{cache:'no-cache'}:{}).then(r=>{if(r.ok){const cl=r.clone();caches.open(CACHE).then(k=>k.put(e.request,cl))}return r})).catch(()=>caches.match('./index.html')));
});
