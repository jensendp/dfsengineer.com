// The full public record, one row per graded projection, so anyone can recompute every number on /nba/scorecard/.
import type { APIRoute } from 'astro';
import { loadRecord } from '../../lib/nba-record';

export const GET: APIRoute = () => {
  const rec = loadRecord() ?? { summary: { rows: 0 }, rows: [], note: 'No graded NBA projections yet.' };
  return new Response(JSON.stringify(rec), { headers: { 'Content-Type': 'application/json' } });
};
