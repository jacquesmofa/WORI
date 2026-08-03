// Cloudflare Worker — GitHub OAuth Proxy for Decap CMS
// Deploy to Cloudflare Workers and update config.yml base_url

const CLIENT_ID = 'Ov23liyEbX99XDmL4YpP';
const CLIENT_SECRET = '9cc5c723df245f6aa093c1e4a691b052fcd972c1';
const ORIGIN = 'https://wadikajaorganization.org';

async function handleAuth(url) {
  const scope = url.searchParams.get('scope') || 'repo,user';
  const redirectUri = `${url.origin}/callback`;
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  return Response.redirect(authUrl.toString(), 302);
}

async function handleCallback(url) {
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response(
      '<p>Authorization failed — no code received. Please try again.</p>',
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
  });

  const tokenData = await res.json();

  if (tokenData.error) {
    return new Response(
      `<p>GitHub error: ${tokenData.error_description || tokenData.error}</p>`,
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Authenticating…</title></head>
<body>
<p style="font-family:system-ui,sans-serif;text-align:center;margin-top:60px;font-size:16px;">
  Authenticated! This window will close automatically.
</p>
<script>
(function(){
  var token = ${JSON.stringify(tokenData)};
  window.opener.postMessage(JSON.stringify({
    type: 'authorization',
    data: token
  }), '${ORIGIN}');
  setTimeout(function(){ window.close(); }, 600);
})();
</script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === '/auth') return handleAuth(new URL(request.url));
    if (pathname === '/callback') return handleCallback(new URL(request.url));
    return new Response('Decap CMS OAuth Proxy running.', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};