(function () {
  // ---------- Portrait incrusté (remplace le robot) ----------
  function portrait(cls) {
    return '<div class="pt ' + cls + '"><img src="portrait.webp" alt="Portrait de RAKOTOARIMANGA Fidele" width="640" height="903">' +
      '<i class="scan"></i><b class="cn tl"></b><b class="cn tr"></b><b class="cn bl"></b><b class="cn br"></b></div>';
  }
  document.getElementById('heroArt').insertAdjacentHTML('afterbegin', portrait('lt'));
  document.getElementById('frontArt').innerHTML = portrait('dk');
  document.getElementById('featArt').innerHTML = portrait('dk sm');

  // ---------- Projets : vraies réalisations + lightbox ----------
  var PRJ = [
    {s:"maruti-hotel",t:"g",n:"Maruti Hôtel — Right choice for your stay",d:"Visuel promotionnel",w:640,h:640},
    {s:"rendu-3d-reel",t:"d",n:"Rendu 3D & montage — Reel",d:"3ds Max · Corona Render · Photoshop",w:640,h:640},
    {s:"homestore-cuisine",t:"g",n:"Homestore — Réalisation de cuisine",d:"Visuel promotionnel",w:640,h:619},
    {s:"homestore-easter",t:"g",n:"Homestore — Happy Easter",d:"Visuel de campagne",w:640,h:640},
    {s:"homestore-3d-vs-photo",t:"d",n:"3D réaliste vs photo réelle",d:"Cuisine Homestore",w:640,h:640},
    {s:"lenora-amber",t:"g",n:"Lenora Créations — Modèle Amber",d:"Visuel promotionnel",w:640,h:448},
    {s:"lenora-esmeralda",t:"g",n:"Lenora Créations — Esmeralda",d:"Visuel produit",w:640,h:448},
    {s:"villa-colline",t:"a",n:"Villa sur colline",d:"Visualisation architecturale",w:640,h:512},
    {s:"suv-villa",t:"d",n:"SUV devant villa moderne",d:"Rendu temps réel · Unreal",w:640,h:512},
    {s:"salon-cintre",t:"a",n:"Salon aux fenêtres cintrées",d:"Visualisation d’intérieur",w:640,h:640},
    {s:"maison-contemporaine",t:"a",n:"Maison contemporaine",d:"Visualisation architecturale",w:640,h:640},
    {s:"habitat-foret",t:"a",n:"Habitat modulaire en forêt",d:"Archifidy · rendu de scène",w:640,h:427},
    {s:"habitat-foret-blanc",t:"a",n:"Habitat modulaire — version blanche",d:"Archifidy · étude de volumes",w:640,h:427},
    {s:"villa-piscine",t:"a",n:"Villa méditerranéenne — piscine",d:"Archifidy",w:640,h:480},
    {s:"villa-terrasse",t:"a",n:"Villa méditerranéenne — terrasse",d:"Archifidy",w:640,h:480},
    {s:"villa-aerienne",t:"a",n:"Villa méditerranéenne — vue aérienne",d:"Archifidy",w:640,h:480},
    {s:"maison-21",t:"a",n:"Maison contemporaine n°21",d:"Archifidy",w:512,h:640},
    {s:"salon-lumineux",t:"a",n:"Salon",d:"Archifidy · architecture d’intérieur",w:512,h:640},
    {s:"salle-de-sport",t:"a",n:"Salle de sport",d:"Archifidy · architecture d’intérieur",w:512,h:640},
    {s:"bureau",t:"a",n:"Bureau",d:"Archifidy · architecture d’intérieur",w:512,h:640}
  ];
  var LAB = { g: 'GRAPHISME', d: '3D', a: 'ARCHITECTURE' }, gh = '';
  PRJ.forEach(function (p, i) {
    gh += '<figure class="tile rv" data-t="' + p.t + '" data-i="' + i + '"><img src="img/' + p.s + '-t.webp" width="' + p.w + '" height="' + p.h + '" alt="' + p.n + '" loading="lazy"><b>' + LAB[p.t] + '</b><figcaption><span>' + p.n + '</span><small>' + p.d + '</small></figcaption></figure>';
  });
  var grid = document.getElementById('grid');
  grid.innerHTML = gh;

  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<button class="x" aria-label="Fermer">×</button><button class="pv" aria-label="Précédent">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="nx" aria-label="Suivant">›</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption'), cur = 0;
  function vis() { return Array.prototype.filter.call(grid.children, function (t) { return !t.classList.contains('hide'); }); }
  function show(i) {
    var v = vis(); if (!v.length) return;
    cur = (i + v.length) % v.length;
    var p = PRJ[v[cur].dataset.i];
    lbImg.src = 'img/' + p.s + '.webp'; lbImg.alt = p.n;
    lbCap.innerHTML = '<b>' + p.n + '</b><span>' + p.d + ' · ' + (cur + 1) + ' / ' + v.length + '</span>';
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  grid.addEventListener('click', function (e) {
    var t = e.target.closest('.tile'); if (!t) return;
    show(vis().indexOf(t));
  });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.pv').onclick = function () { show(cur - 1); };
  lb.querySelector('.nx').onclick = function () { show(cur + 1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });

  // ---------- Filtres ----------
  var fb = document.querySelectorAll('.filters button');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      fb.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      document.querySelectorAll('.tile').forEach(function (t) {
        t.classList.toggle('hide', b.dataset.f !== 'all' && t.dataset.t !== b.dataset.f);
      });
    });
  });

  // ---------- Menu mobile ----------
  var bg = document.getElementById('burger'), mn = document.getElementById('menu');
  bg.addEventListener('click', function () { bg.classList.toggle('open'); mn.classList.toggle('open'); });
  mn.addEventListener('click', function () { bg.classList.remove('open'); mn.classList.remove('open'); });

  // ---------- Parallax souris sur le hero ----------
  var hv = document.getElementById('heroArt');
  addEventListener('pointermove', function (e) {
    hv.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3));
    hv.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3));
  });

  // ---------- Apparition au scroll ----------
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .1 });
  document.querySelectorAll('.rv').forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });

  // ---------- Réseau de particules (section CTA) ----------
  var cv = document.getElementById('net'), cx = cv.getContext('2d'), P = [], mx = -999, my = -999;
  function size() { cv.width = cv.clientWidth; cv.height = cv.clientHeight; }
  size(); addEventListener('resize', size);
  for (var k = 0; k < 55; k++) P.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0004, vy: (Math.random() - .5) * .0004 });
  cv.parentNode.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  function draw() {
    var W = cv.width, H = cv.height; cx.clearRect(0, 0, W, H);
    P.forEach(function (p) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; });
    for (var a = 0; a < P.length; a++) {
      var ax = P[a].x * W, ay = P[a].y * H;
      cx.fillStyle = '#ffffffaa'; cx.beginPath(); cx.arc(ax, ay, 2, 0, 6.3); cx.fill();
      for (var b = a + 1; b < P.length; b++) {
        var d = Math.hypot(ax - P[b].x * W, ay - P[b].y * H);
        if (d < 130) { cx.strokeStyle = 'rgba(255,255,255,' + (.22 * (1 - d / 130)) + ')'; cx.beginPath(); cx.moveTo(ax, ay); cx.lineTo(P[b].x * W, P[b].y * H); cx.stroke(); }
      }
      var dm = Math.hypot(ax - mx, ay - my);
      if (dm < 160) { cx.strokeStyle = 'rgba(255,255,255,' + (.5 * (1 - dm / 160)) + ')'; cx.beginPath(); cx.moveTo(ax, ay); cx.lineTo(mx, my); cx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();

  // ---------- Formulaire -> WhatsApp (via /api/notify, repli wa.me) ----------
  var WA = '261340175177';
  var form = document.getElementById('form'), fs = document.getElementById('fs');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var data = { type: 'contact', name: v('n'), email: v('e'), service: v('s'), message: v('m') };
    var btn = form.querySelector('button'); btn.disabled = true; fs.textContent = 'Envoi en cours…';
    function fallback() {
      var t = 'Nouveau message du portfolio\nNom : ' + data.name + '\nE-mail : ' + data.email + '\nService : ' + data.service + '\n\n' + data.message;
      fs.textContent = 'Ouverture de WhatsApp pour finaliser l’envoi…';
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(t), '_blank');
      btn.disabled = false;
    }
    fetch('/api/notify', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw 0; fs.textContent = 'Message envoyé ✓ Je vous réponds très vite.'; form.reset(); btn.disabled = false; })
      .catch(fallback);
  });

  // ---------- Notification de visite (une fois par session) ----------
  try {
    var local = /^(localhost|127\.|\[::1\])/.test(location.hostname) || location.protocol === 'file:';
    if (!local && !sessionStorage.getItem('rf_visit') && !/bot|crawl|spider|headless/i.test(navigator.userAgent)) {
      setTimeout(function () {
        sessionStorage.setItem('rf_visit', '1');
        fetch('/api/notify', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'visit', ref: document.referrer }), keepalive: true }).catch(function () {});
      }, 4000);
    }
  } catch (e) {}
})();
