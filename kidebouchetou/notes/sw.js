// Ancienne adresse de l'application : ce service worker remplace l'ancien.
// Il retire de cache les pages de l'ancienne adresse, renvoie les fenêtres ouvertes vers la nouvelle adresse
// et se désinstalle. Les caches et les données de la nouvelle adresse ne sont pas touchés.
const OLD=/^\/RapportIntervention\//i, NEW='/TEST_123/';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  try{await self.clients.claim()}catch(err){}
  for(const name of await caches.keys()){const c=await caches.open(name);for(const req of await c.keys()){if(OLD.test(new URL(req.url).pathname))await c.delete(req)}}
  for(const cl of await self.clients.matchAll({type:'window',includeUncontrolled:true})){
    const u=new URL(cl.url);if(OLD.test(u.pathname)){u.pathname=u.pathname.replace(OLD,NEW);try{await cl.navigate(u.href)}catch(err){}}
  }
  await self.registration.unregister();
})()));
// aucune interception : tout va au réseau, donc vers les pages de redirection
