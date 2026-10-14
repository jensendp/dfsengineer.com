// Shared build-time helpers for the home page and the NFL / NBA hubs.
// Real data only: a missing or unreadable export renders as "no section",
// never as a placeholder number (same rule the home page followed before
// these were moved out of index.astro).
import { readFileSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Sport = 'nfl' | 'nba';

// Slug prefix decides the sport. Tags can't: "NBA DFS vs NFL DFS" carries both.
export const sportOf = (post: Post): Sport => (post.slug.startsWith('nba-') ? 'nba' : 'nfl');

export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

// Newest first by season, then week / slate date, falling back to pubDate.
export function newestFirst(a: Post, b: Post): number {
  const key = (p: Post) =>
    p.data.slateDate?.valueOf() ?? (p.data.week !== undefined ? p.data.week : 0);
  const season = (p: Post) => String(p.data.season ?? '');
  return season(b).localeCompare(season(a)) || key(b) - key(a) || b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

// Weekly / nightly posts have a `hub` plus a `week` or `slateDate`.
// The evergreen hub anchor (e.g. nfl-dfs-value-plays.md) has `hub` only.
export const isHubEdition = (p: Post) => Boolean(p.data.hub) && (p.data.week !== undefined || p.data.slateDate !== undefined);

export const dateFmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

type AccuracyRow = { profile: string; position: string; n: number; mae: number; corr: number | null };
export function loadAccuracy(): { cards: { label: string; value: string }[]; generatedAt: string | null } {
  try {
    const raw = readFileSync(new URL('../../data/dfs-local-export.json', import.meta.url), 'utf-8');
    const exportData = JSON.parse(raw);
    const rows: AccuracyRow[] = exportData?.model_accuracy?.by_profile_position ?? [];
    const defaults = rows.filter((r) => r.profile === 'default' && r.corr !== null);
    const cards = ['QB', 'RB', 'WR', 'TE']
      .map((pos) => defaults.find((r) => r.position === pos))
      .filter((r): r is AccuracyRow => Boolean(r))
      .map((r) => ({ label: `${r.position} Model Corr`, value: r.corr!.toFixed(3) }));
    return { cards, generatedAt: cards.length ? exportData?.generated_at ?? null : null };
  } catch {
    return { cards: [], generatedAt: null };
  }
}

type SlateHighlight = { matchup: string; over_under?: number; spread?: number } | null;
// Game-level market facts only — never player-level data (see
// dfs-local's slate_snapshot.py for the scope rule).
export function loadSlate(): {
  name: string | null; numGames: number; highestTotal: SlateHighlight; biggestSpread: SlateHighlight;
} | null {
  try {
    const raw = readFileSync(new URL('../../data/slate-snapshot.json', import.meta.url), 'utf-8');
    const snap = JSON.parse(raw);
    if (!(snap?.slate?.num_games > 0)) return null;
    return {
      name: snap.slate.slate_name,
      numGames: snap.slate.num_games,
      highestTotal: snap?.highlights?.highest_total ?? null,
      biggestSpread: snap?.highlights?.biggest_spread ?? null,
    };
  } catch {
    return null;
  }
}

// NBA 2026-27 opening night. Drives the "starts Oct 20" vs "in season"
// badge at build time, so the pre-season wording doesn't go stale.
export const NBA_SEASON_START = new Date('2026-10-20T00:00:00-04:00');
export const nbaSeasonStarted = () => Date.now() >= NBA_SEASON_START.valueOf();

export const editionLabel = (p: Post) =>
  isHubEdition(p) ? (p.data.slateDate ? 'Nightly' : p.data.week !== undefined ? `Week ${p.data.week}` : 'Weekly') : 'Guide';
