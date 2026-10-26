// Client-side DK classic NFL lineup solver (V1). Runs entirely in the
// browser against the static pool JSON exported by dfs-local's standalone
// scratch/export_optimizer_pool.py — no server/backend involved.
//
// Standard DFS ILP formulation: rather than model the FLEX slot as its own
// variable, give RB/WR/TE a *range* of allowed counts (their base slots,
// plus one extra to cover whichever position fills FLEX) and force the
// roster to exactly 9 players. The one slack slot among RB/WR/TE is FLEX.
import solver from 'javascript-lp-solver';

export interface OptimizerPlayer {
  player_id: number;
  dk_id: number;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'DST';
  team: string;
  opponent: string;
  salary: number;
  projection: number;
  floor: number | null;
  ceiling: number | null;
  game_over_under: number | null;
  game_spread: number | null;
}

export interface OptimizerPool {
  season: number;
  week: number;
  slate_name: string;
  generated_at: string;
  salary_cap: number;
  roster_slots: Record<string, number>;
  blend_sources: string[];
  blend_weights_by_position: Record<string, Record<string, number>>;
  players: OptimizerPlayer[];
}

export interface SolveOptions {
  salaryCap: number;
  lockedIds?: Set<number>;
  excludedIds?: Set<number>;
  // Each entry is a previously-returned lineup's player_ids. Forbids
  // selecting that exact 9-player combination again (standard DFS
  // "distinct lineups" trick: cap the overlap with any prior lineup at
  // one fewer than its size, forcing at least one swap).
  excludeCombos?: Set<number>[];
}

export interface SolveResult {
  feasible: boolean;
  lineup: OptimizerPlayer[];
  totalSalary: number;
  totalProjection: number;
}

const POSITION_RANGE: Record<string, { min: number; max: number }> = {
  QB: { min: 1, max: 1 },
  RB: { min: 2, max: 3 },
  WR: { min: 3, max: 4 },
  TE: { min: 1, max: 2 },
  DST: { min: 1, max: 1 },
};
const ROSTER_SIZE = 9;

export function buildAndSolve(players: OptimizerPlayer[], options: SolveOptions): SolveResult {
  const excluded = options.excludedIds ?? new Set<number>();
  const locked = options.lockedIds ?? new Set<number>();
  const pool = players.filter((p) => !excluded.has(p.player_id));

  const variables: Record<string, Record<string, number>> = {};
  const binaries: Record<string, 1> = {};
  const byKey = new Map<string, OptimizerPlayer>();

  for (const p of pool) {
    const key = `p_${p.player_id}`;
    byKey.set(key, p);
    variables[key] = {
      projection: p.projection,
      salary: p.salary,
      total: 1,
      [p.position]: 1,
    };
    // `binaries` (not `ints`) is what actually constrains a variable to
    // {0,1} — `ints` alone just means "integer, no upper bound", which let
    // the solver "pick" a player twice to satisfy a position-count
    // constraint instead of selecting 9 distinct players (real bug hit in
    // testing: 7 distinct keys, two with value 2, instead of 9 with value 1).
    binaries[key] = 1;

    // A locked player gets its own `== 1` constraint below rather than a
    // bound on the variable, since javascript-lp-solver binaries don't
    // expose a per-variable "must be 1" shortcut.
    if (locked.has(p.player_id)) {
      variables[key][`lock_${key}`] = 1;
    }
  }

  const constraints: Record<string, Record<string, number>> = {
    salary: { max: options.salaryCap },
    total: { equal: ROSTER_SIZE },
  };
  for (const [pos, range] of Object.entries(POSITION_RANGE)) {
    constraints[pos] = { min: range.min, max: range.max };
  }
  for (const id of locked) {
    const key = `p_${id}`;
    if (byKey.has(key)) {
      constraints[`lock_${key}`] = { equal: 1 };
    }
  }

  (options.excludeCombos ?? []).forEach((combo, i) => {
    const comboName = `combo_${i}`;
    constraints[comboName] = { max: combo.size - 1 };
    for (const id of combo) {
      const key = `p_${id}`;
      if (variables[key]) variables[key][comboName] = 1;
    }
  });

  const model = {
    optimize: 'projection',
    opType: 'max' as const,
    constraints,
    variables,
    binaries,
  };

  const result = solver.Solve(model) as Record<string, number | boolean>;

  if (!result.feasible) {
    return { feasible: false, lineup: [], totalSalary: 0, totalProjection: 0 };
  }

  const lineup: OptimizerPlayer[] = [];
  for (const [key, player] of byKey) {
    if (result[key] === 1) lineup.push(player);
  }

  return {
    feasible: true,
    lineup,
    totalSalary: lineup.reduce((sum, p) => sum + p.salary, 0),
    totalProjection: Math.round(lineup.reduce((sum, p) => sum + p.projection, 0) * 100) / 100,
  };
}

export function buildMultipleLineups(
  players: OptimizerPlayer[],
  options: SolveOptions,
  count: number
): SolveResult[] {
  const results: SolveResult[] = [];
  const combos: Set<number>[] = [...(options.excludeCombos ?? [])];

  for (let i = 0; i < count; i++) {
    const result = buildAndSolve(players, { ...options, excludeCombos: combos });
    if (!result.feasible) break; // no more distinct lineups possible under these rules
    results.push(result);
    combos.push(new Set(result.lineup.map((p) => p.player_id)));
  }

  return results;
}
