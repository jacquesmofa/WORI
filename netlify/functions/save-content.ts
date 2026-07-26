// Netlify Function: Securely commits CMS content updates to GitHub
// Deploy to Netlify by placing this in netlify/functions/save-content.ts

interface SavePayload {
  password: string;
  repoOwner: string;
  repoName: string;
  updatedContent: Record<string, unknown>;
}

export const handler = async (event: { httpMethod: string; body: string }) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' }),
    };
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!githubToken) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Server authentication token misconfigured.' }),
      };
    }

    const payload = JSON.parse(event.body) as SavePayload;
    const { password, repoOwner, repoName, updatedContent } = payload;

    if (adminPassword && password !== adminPassword) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unauthorized. Invalid admin password.' }),
      };
    }

    const pathToFile = 'src/data/site-content.json';
    const getUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToFile}`;

    const fileRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'User-Agent': 'Netlify-CMS-Function',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    let sha = '';
    if (fileRes.ok) {
      const fileData = (await fileRes.json()) as { sha: string };
      sha = fileData.sha;
    }

    const contentString = JSON.stringify(updatedContent, null, 2);
    const base64Content = Buffer.from(contentString).toString('base64');

    const putRes = await fetch(getUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'User-Agent': 'Netlify-CMS-Function',
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
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Failed to update GitHub repository.', details: errorMsg }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, message: 'Repository updated and build triggered.' }),
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: msg }),
    };
  }
};