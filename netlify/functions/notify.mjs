// Envoie un message WhatsApp à Fidele via CallMeBot (clé API cachée côté serveur).
// Variables d'environnement Netlify à définir :
//   CALLMEBOT_APIKEY  -> la clé reçue de CallMeBot
//   WA_PHONE          -> 261340175177 (optionnel, valeur par défaut ci-dessous)
//   ALLOWED_ORIGINS   -> https://fidele-rak.netlify.app (séparés par des virgules si plusieurs domaines)

const clean = (v, n) => String(v ?? '').replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n);
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json' } });

export default async (req, context) => {
  if (req.method !== 'POST') return json({ ok: false }, 405);

  const allowed = (process.env.ALLOWED_ORIGINS || 'https://fidele-rak.netlify.app').split(',').map(s => s.trim());
  if (!allowed.includes(req.headers.get('origin') || '')) return json({ ok: false }, 403);

  const key = process.env.CALLMEBOT_APIKEY;
  if (!key) return json({ ok: false, error: 'config' }, 500);
  const phone = (process.env.WA_PHONE || '261340175177').replace(/\D/g, '');

  let b;
  try { b = await req.json(); } catch { return json({ ok: false }, 400); }

  const ua = clean(req.headers.get('user-agent'), 200);
  const country = context?.geo?.country?.name || '';
  const city = context?.geo?.city || '';
  let text;

  if (b.type === 'visit') {
    if (/bot|crawl|spider|headless|preview|monitor|lighthouse/i.test(ua)) return json({ ok: true, skipped: true });
    const device = /mobile|android|iphone/i.test(ua) ? 'Mobile' : /ipad|tablet/i.test(ua) ? 'Tablette' : 'Ordinateur';
    const ref = clean(b.ref, 120) || 'accès direct';
    text = '👀 Nouvelle visite sur ton portfolio\n' +
      '📱 ' + device + '\n' +
      (country ? '📍 ' + [city, country].filter(Boolean).join(', ') + '\n' : '') +
      '🔗 Origine : ' + ref;
  } else if (b.type === 'contact') {
    const name = clean(b.name, 80), email = clean(b.email, 120), service = clean(b.service, 80), msg = clean(b.message, 1200);
    if (!name || !email || !msg || !/^\S+@\S+\.\S+$/.test(email)) return json({ ok: false, error: 'invalid' }, 400);
    text = '📩 Nouveau message du portfolio\n' +
      '👤 ' + name + '\n' +
      '✉️ ' + email + '\n' +
      '🎯 ' + service + '\n\n' + msg;
  } else {
    return json({ ok: false }, 400);
  }

  const url = 'https://api.callmebot.com/whatsapp.php?phone=' + phone + '&text=' + encodeURIComponent(text) + '&apikey=' + encodeURIComponent(key);
  try {
    const r = await fetch(url);
    return json({ ok: r.ok }, r.ok ? 200 : 502);
  } catch {
    return json({ ok: false }, 502);
  }
};

export const config = {
  path: '/api/notify',
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
