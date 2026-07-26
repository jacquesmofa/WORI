interface Env {
  GITHUB_TOKEN: string;
  ADMIN_PASSWORD: string;
}

export interface SavePayload {
  password: string;
  repoOwner: string;
  repoName: string;
  updatedContent: Record<string, unknown>;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;

    if (!env.GITHUB_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Server authentication token misconfigured.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = (await request.json()) as SavePayload;
    const { password, repoOwner, repoName, updatedContent } = payload;

    if (env.ADMIN_PASSWORD && password !== env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Invalid admin password.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const pathToFile = 'src/data/site-content.json';
    const getUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToFile}`;

    const fileRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'User-Agent': 'Cloudflare-Pages-CMS-Worker',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    let sha = '';
    if (fileRes.ok) {
      const fileData = (await fileRes.json()) as { sha: string };
      sha = fileData.sha;
    }

    const contentString = JSON.stringify(updatedContent, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(contentString)));

    const putRes = await fetch(getUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'User-Agent': 'Cloudflare-Pages-CMS-Worker',
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'Content updated via WORI Admin Dashboard',
        content: base64Content,
        sha: sha || undefined,
      }),
    });

    if (!putRes.ok) {
      const errorMsg = await putRes.text();
      return new Response(
        JSON.stringify({ error: 'Failed to update GitHub repository.', details: errorMsg }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Repository updated and build triggered.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};