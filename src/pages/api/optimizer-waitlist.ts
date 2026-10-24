import type { APIRoute } from 'astro';

// This single route is the only part of the site that's server-rendered —
// see `output: 'hybrid'` in astro.config.mjs. Everything else stays static.
export const prerender = false;

// "DFS Optimizer Waitlist" list in Brevo.
const BREVO_LIST_ID = 8;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let email: string | undefined;
  let sport: string | undefined;

  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = typeof body.email === 'string' ? body.email : undefined;
      sport = typeof body.sport === 'string' ? body.sport : undefined;
    } else {
      const form = await request.formData();
      email = form.get('email')?.toString();
      sport = form.get('sport')?.toString();
    }
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  email = email?.trim();
  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: 'Enter a valid email address.' }, 400);
  }

  const apiKey = import.meta.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('optimizer-waitlist: BREVO_API_KEY is not set.');
    return json({ error: 'Signup is temporarily unavailable. Try again later.' }, 500);
  }

  const attributes: Record<string, string> = {};
  if (sport === 'nfl' || sport === 'nba') {
    attributes.OPTIMIZER_SPORT = sport.toUpperCase();
  }

  const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes,
    }),
  });

  if (!brevoRes.ok) {
    const text = await brevoRes.text();
    console.error('optimizer-waitlist: Brevo contact create failed', brevoRes.status, text);
    return json({ error: 'Something went wrong. Try again in a minute.' }, 502);
  }

  return json({ ok: true });
};
