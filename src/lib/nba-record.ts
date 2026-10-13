// Loads the NBA scorecard record exported by nba-local (Projects/nba-local) and pulled onto this machine with
//   nba-local pull-record      (set NBA_RECORD_DEST to <this repo>/data/nba)
// Read at build time, same pattern as the NFL data in data/. Never fabricates: a missing or unreadable file is
// treated as an empty record, which the page renders as the "season hasn't started" state.
import { existsSync, readFileSync } from 'node:fs';

export interface Bucket { mae: number | null; bias: number | null; corr: number | null }
export interface Hit { picks: number; hit_rate: number | null; avg_actual: number | null }
export interface Night {
  date: string; players_played: number; model_mae: number | null; dk_mae: number | null;
  value_picks: number; value_hit_rate: number | null;
}
export interface Summary {
  generated_at: string; season_types: number[]; rows: number; slates: number; nights: number;
  model_versions: string[]; enough_data: boolean; players_played?: number;
  points?: { n: number; model: Bucket; no_absence_logic: Bucket; dk_fppg: Bucket };
  minutes?: { n: number; model_mae: number | null; baseline_mae: number | null };
  range?: { n: number; target: number; coverage: number | null };
  availability?: {
    players_projected_20_plus: number; did_not_play_rate: number | null;
    did_not_play_rate_when_healthy: number | null; did_not_play_rate_when_questionable: number | null;
    questionable_count: number;
  };
  lineups?: {
    projections_with_published_lineup: number; share_of_projections_with_published_lineup: number | null;
    flagged_starters: number; flagged_who_started: number | null; actual_starters_flagged: number | null;
  };
  value_board?: { definition: string; model: Hit; dk_fppg: Hit };
  nightly?: Night[];
}
export interface NbaRecord { summary: Summary; rows: unknown[]; note: string }

export const RECORD_URL = new URL('../../data/nba/scorecard.json', import.meta.url);

export function loadRecord(): NbaRecord | null {
  // NBA_SCORECARD_FILE lets you preview the page against another export without touching data/nba/.
  const override = process.env.NBA_SCORECARD_FILE;
  const path = override ? override : RECORD_URL;
  try {
    if (!existsSync(path)) return null;
    const d = JSON.parse(readFileSync(path, 'utf-8'));
    if (!d || typeof d !== 'object' || !d.summary || !Array.isArray(d.rows)) return null;
    return d as NbaRecord;
  } catch {
    return null;
  }
}
