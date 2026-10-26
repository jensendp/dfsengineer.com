import type { APIRoute } from 'astro';

// Sets the optimizer-beta unlock cookie when visited with the right ?key=,
// then redirects into the gated tool. Share a link like
// /tools/unlock?key=<OPTIMIZER_UNLOCK_SECRET> with a handful of testers —
// after that, the cookie persists so they can revisit the tool directly.
export const prerender = false;

const COOKIE_NAME = 'optimizer_beta';
const COOKIE_MAX_AGE_DAYS = 90;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const key = url.searchParams.get('key');
  const secret = import.meta.env.OPTIMIZER_UNLOCK_SECRET;

  if (!secret || !key || key !== secret) {
    // Don't hint at whether the key was close/wrong — just bounce home.
    return redirect('/', 302);
  }

  cookies.set(COOKIE_NAME, secret, {
    path: '/',
    maxAge: 60 * 60 * 24 * COOKIE_MAX_AGE_DAYS,
    httpOnly: true,
    sameSite: 'lax',
  });

  const response = redirect('/tools/nfl-dfs-optimizer/', 302);
  // Belt-and-suspenders: the destination page already sends a noindex meta
  // tag, but this redirect URL itself carries the ?key= query string, so
  // it gets the same header in case anything ever indexes the raw request.
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
};
