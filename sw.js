/* Service Worker ของ PC Builder TH: ให้เปิดได้เร็วและใช้งานต่อได้แม้เน็ตหลุด
   - หน้าเว็บ/ราคา: เอาของใหม่จากเน็ตก่อนเสมอ ถ้าไม่มีเน็ตค่อยใช้ของที่เก็บไว้ (จึงอัปเดตทันทีเมื่อแก้ไฟล์ใน GitHub)
   - ไอคอนและไฟล์ตั้งค่าแอป: ใช้ของที่เก็บไว้ก่อน
   - ไม่ยุ่งกับหน้าแอดมิน ไฟล์ตั้งค่า Firebase และทุกอย่างที่มาจากเว็บอื่น (Firebase) */
const V='pcb-v1';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==self.location.origin)return;
  if(/\/(admin\.html|firebase-config\.js|sw\.js)$/.test(u.pathname))return;
  const key=new Request(u.origin+u.pathname);
  if(/\.(png|json|svg|ico)$/.test(u.pathname)&&!/prices\.json$/.test(u.pathname)){
    e.respondWith(caches.match(key).then(h=>h||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(key,cp))}return res})));
    return;
  }
  e.respondWith(
    fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(key,cp))}return res})
      .catch(()=>caches.match(key).then(h=>h||(r.mode==='navigate'?caches.match('index.html'):Response.error())))
  );
});
