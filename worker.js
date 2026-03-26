/**
 * ClawToClaude — Cloudflare Worker CORS Proxy
 * Deployed once by you. Invisible to end users.
 * 
 * Routes:
 *   GET /search?q=github&limit=10     → clawhub.ai/api/v1/skills?q=...
 *   GET /download/:slug/:version      → clawhub.ai/api/v1/download/:slug/:version
 *   GET /skill/:slug                  → clawhub.ai/api/v1/skills/:slug
 *   GET /health                       → { status: "ok" }
 */

const CLAWHUB = 'https://clawhub.ai/api/v1';

export default {
  async fetch(request) {
    // CORS preflight
    if (request.method === 'OPTIONS') return cors(null, 204, request);

    const url  = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '');

    try {
      // GET /search?q=...&limit=10
      if (path === '/search') {
        const q     = url.searchParams.get('q') || '';
        const limit = url.searchParams.get('limit') || '10';
        if (!q) return cors(JSON.stringify({ error: 'q required' }), 400, request);

        const up  = await fetch(`${CLAWHUB}/skills?q=${encodeURIComponent(q)}&limit=${limit}`, headers());
        const txt = await up.text();
        return cors(txt, up.status, request, 'application/json');
      }

      // GET /download/:slug/:version
      const dl = path.match(/^\/download\/([^/]+)\/([^/]+)$/);
      if (dl) {
        const up  = await fetch(`${CLAWHUB}/download/${dl[1]}/${dl[2]}`, headers());
        const buf = await up.arrayBuffer();
        return cors(buf, up.status, request, 'application/zip');
      }

      // GET /skill/:slug
      const sk = path.match(/^\/skill\/([^/]+)$/);
      if (sk) {
        const up  = await fetch(`${CLAWHUB}/skills/${sk[1]}`, headers());
        const txt = await up.text();
        return cors(txt, up.status, request, 'application/json');
      }

      // Health check
      if (path === '' || path === '/health') {
        return cors(JSON.stringify({ status: 'ok', proxy: 'clawtoclaude → clawhub.ai' }), 200, request);
      }

      return cors(JSON.stringify({ error: 'Unknown route' }), 404, request);

    } catch (err) {
      return cors(JSON.stringify({ error: err.message }), 502, request);
    }
  }
};

function headers() {
  return { headers: { 'Accept': 'application/json', 'User-Agent': 'ClawToClaude/1.0' } };
}

function cors(body, status, request, type = 'application/json') {
  // Accept any origin — this is a public read-only proxy
  const origin = request.headers.get('Origin') || '*';
  const h = {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age':       '86400',
    'Content-Type':                 type,
    'Cache-Control':                'public, max-age=60',
  };
  if (body === null)                  return new Response(null,   { status, headers: h });
  if (body instanceof ArrayBuffer)    return new Response(body,   { status, headers: h });
  return                                     new Response(body,   { status, headers: h });
}
