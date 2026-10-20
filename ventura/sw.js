// Ancienne adresse de l'application : ce service worker remplace l'ancien.
// Il retire du cache les pages de cette application (pas celles des autres applications du domaine), renvoie les fenêtres ouvertes vers la nouvelle adresse
// (mongiamamie.github.io/RapportIntervention) et se désinstalle.
const NEW='https://mongiamamie.github.io';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  try{await self.clients.claim()}catch(err){}
  const MINE=/^\/(RapportIntervention|TEST_123)\//i;
  // seulement les pages de cette application : les autres applications du domaine ne sont pas touchées
  for(const name of await caches.keys()){const c=await caches.open(name);for(const req of await c.keys()){if(MINE.test(new URL(req.url).pathname))await c.delete(req)}}
  for(const cl of await self.clients.matchAll({type:'window',includeUncontrolled:true})){
    const u=new URL(cl.url);if(!MINE.test(u.pathname))continue; // fenêtres des autres applications : on n'y touche pas
    const p=u.pathname.replace(/^\/TEST_123\//i,'/RapportIntervention/');
    try{await cl.navigate(NEW+p+u.search+u.hash)}catch(err){}
  }
  await self.registration.unregister();
})()));
