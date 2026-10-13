// Tell Bing (and other IndexNow engines) that pages are new or changed.
//
//   node scripts/indexnow.mjs <url> [<url> ...]          # dry run: prints what it would send
//   node scripts/indexnow.mjs --send <url> [<url> ...]   # sends it
//
// Only send URLs that are new or edited: resubmitting unchanged pages can get
// the key throttled. The key file in public/ must be deployed before --send
// works, because the engine fetches it to check we own the site. The key is
// public by design (IndexNow requires it to be served from the site).
// Nothing is sent without --send.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'www.dfsengineer.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 100;

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const send = args.includes('--send');
const urls = [...new Set(args.filter((a) => !a.startsWith('--')))];

if (urls.length === 0) {
  console.error('usage: node scripts/indexnow.mjs [--send] <url> [<url> ...]');
  process.exit(1);
}
if (urls.length > MAX_URLS) {
  console.error(`too many URLs (${urls.length}); send at most ${MAX_URLS} at a time`);
  process.exit(1);
}
for (const u of urls) {
  let p;
  try { p = new URL(u); } catch { console.error(`not a URL: ${u}`); process.exit(1); }
  if (p.protocol !== 'https:' || p.host !== HOST) {
    console.error(`must be https://${HOST}/...: ${u}`);
    process.exit(1);
  }
}

// The key is the name of the single 32-hex .txt file in public/, and the file contains the same string.
const keyFiles = readdirSync(resolve(root, 'public')).filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (keyFiles.length !== 1) {
  console.error(`expected exactly one IndexNow key file in public/, found ${keyFiles.length}`);
  process.exit(1);
}
const key = keyFiles[0].replace('.txt', '');
if (readFileSync(resolve(root, 'public', keyFiles[0]), 'utf-8').trim() !== key) {
  console.error('key file contents do not match its filename');
  process.exit(1);
}

const body = { host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList: urls };
console.log(`${send ? 'Sending' : 'Dry run, would send'} ${urls.length} URL(s) to ${ENDPOINT}:`);
for (const u of urls) console.log(`  ${u}`);
if (!send) process.exit(0);

// Check the key file is live first; a 403 from the engine is much harder to read than this.
const live = await fetch(body.keyLocation);
if (!live.ok || (await live.text()).trim() !== key) {
  console.error(`key file is not live at ${body.keyLocation} (HTTP ${live.status}). Deploy it first.`);
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
// 200 and 202 both mean accepted. 202 means the key check is still pending.
console.log(`Response: HTTP ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
  console.error((await res.text()).slice(0, 500));
  process.exit(1);
}
