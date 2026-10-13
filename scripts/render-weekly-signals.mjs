// Render a weekly "signals" draft post from a frozen export.
//
//   node scripts/render-weekly-signals.mjs data/nfl/week-6-signals.json
//
// Input is the JSON written by `dfs-local export-weekly-signals` (committed
// under data/nfl/ as the record the Monday review grades). Output is a
// markdown post at src/content/blog/nfl-dfs-weekly-signals/<season>/week-<n>.md
// with `draft: true` — it never publishes anything, and it refuses to
// overwrite a post that has already been flipped to draft: false.
//
// The tables and per-position lead-ins are computed from the data; only the
// framing text below is written by hand. No third-party source names and no
// ownership figures appear here by design.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];
if (!input) {
  console.error('usage: node scripts/render-weekly-signals.mjs <data/nfl/week-N-signals.json>');
  process.exit(1);
}
const data = JSON.parse(readFileSync(resolve(root, input), 'utf-8'));
const { season, week, players } = data;
if (!Array.isArray(players) || players.length === 0) {
  console.error('export has no players — nothing to render');
  process.exit(1);
}

const POS = ['QB', 'RB', 'WR', 'TE', 'DST'];
const POS_NAME = { QB: 'Quarterbacks', RB: 'Running backs', WR: 'Wide receivers', TE: 'Tight ends', DST: 'Defenses' };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const f1 = (v) => (v == null ? '—' : v.toFixed(1));
const money = (n) => `$${n.toLocaleString('en-US')}`;

const notes = (p) => [p.injury, p.split ? 'Split' : null].filter(Boolean).join(', ') || '—';
const table = (rows) =>
  [
    '| Player | Team | Salary | Model | Public avg | Range | Notes |',
    '|---|---|---:|---:|---:|---|---|',
    ...[...rows]
      .sort((a, b) => b.salary - a.salary)
      .map((p) => `| ${p.player} | ${p.team ?? '—'} | ${money(p.salary)} | ${f1(p.model)} | ${f1(p.public)} | ${cap(p.range)} | ${notes(p)} |`),
  ].join('\n');

function positionSection(pos) {
  const rows = players.filter((p) => p.position === pos);
  if (rows.length === 0) return null;
  const withGap = rows.filter((p) => p.model != null && p.public != null);
  const gap = withGap.sort((a, b) => Math.abs(b.model - b.public) - Math.abs(a.model - a.public))[0];
  const split = rows.filter((p) => p.split).map((p) => p.player);
  let line = `${rows.length} on the board.`;
  if (gap) line += ` Widest gap between the model and the public average: **${gap.player}** (model ${f1(gap.model)}, public ${f1(gap.public)}).`;
  line += split.length ? ` Sources split on ${split.join(', ')}${split[split.length - 1].endsWith('.') ? '' : '.'}` : ' The sources agreed on everyone here.';
  return `### ${POS_NAME[pos]}\n\n${line}\n\n${table(rows)}`;
}

const splitPlayers = players.filter((p) => p.split);

// "As of" line: the consensus snapshot's own timestamp (UTC, from SQLite),
// shown in Eastern time. Falls back to generic wording when unknown.
function asOf() {
  if (!data.data_as_of) return `Snapshot taken before Week ${week} kickoff.`;
  const d = new Date(`${data.data_as_of.replace(' ', 'T')}Z`);
  const when = d.toLocaleString('en-US', {
    timeZone: 'America/New_York', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
  return `As of ${when} ET, before kickoff.`;
}
// `published_at` (local ISO, no zone) lets a hand-built record set the post date;
// otherwise it follows the snapshot time, then falls back to now.
const snapshotDate = data.data_as_of ? new Date(`${data.data_as_of.replace(' ', 'T')}Z`) : new Date();
const iso = data.published_at ?? snapshotDate.toISOString().slice(0, 19);
const outsideLine = data.n_outside_sources
  ? `${data.n_outside_sources} articles and podcasts logged this week`
  : 'Articles and podcasts logged this week';

const body = `*${asOf()} Salaries, injury tags, and projections can move after this
was pulled, and nothing here reflects news after the snapshot. This is a
record of what the data looked like, not instructions — and it gets graded
in the [Week ${week} review](/blog/nfl-dfs-weekly-review/${season}/week-${week}/) once the
games are played.*

Most DFS content gives you a list of names and a confidence level. This
page does something different: it shows the signals the model was reading
before the games, including where they disagreed, so you can see how the
board was built and judge it yourself. Then we publish how it graded —
hits and misses both.

## How the board was built

Three kinds of input go into each player's row:

- **The in-house model's projection** — a points projection built from
  salary, matchup, recent form, and the week's market lines.
- **Public projection sources** — free, publicly available projections.
  The "Public avg" column is the average of whichever public projections
  existed for that player.
- **Outside opinion** — ${outsideLine.charAt(0).toLowerCase()}${outsideLine.slice(1)},
  recorded as bullish or bearish on a player, never as a point number.

Each player gets a single agreement-weighted score from all of it. The
board below is ${data.selection}. That is a selection rule, not a
recommendation: a high score means the inputs agree, not that the player
will score.

## How to read the columns

- **Model / Public avg:** projected DraftKings points. A big gap between
  the two means the model sees something the public numbers don't, or the
  reverse.
- **Range:** how wide the player's outcome range looks relative to their
  projection, compared with others at the same position. *Tight* is the
  more predictable group; *Wide* is more boom-or-bust; *Mid* is neither.
- **Notes:** the official injury tag at snapshot time, and whether the
  sources were split on the player.

## The board, by position

Each table is sorted by salary, highest first. Players marked *Split* are
the ones where the inputs disagreed sharply; everyone else had the model,
public projections, and outside opinion roughly pointing the same way.
Agreement is not safety — it only means fewer of the inputs are arguing.

**Jump to:** ${POS.filter((p) => players.some((x) => x.position === p))
  .map((p) => `[${POS_NAME[p]}](#${POS_NAME[p].toLowerCase().replace(/ /g, '-')})`)
  .join(' · ')} · [Where the sources split](#where-the-sources-split)

${POS.map(positionSection).filter(Boolean).join('\n\n')}

## Where the sources split

${splitPlayers.length} of the ${players.length} players had at least one input disagreeing
sharply with the others. These are the real question marks on the board,
whatever their raw score says: when the inputs can't agree, the projection
is carrying more uncertainty than it looks like. The split can sit in the
individual sources or the outside opinion, so the averaged projections in the
tables above can look close even when the inputs underneath were not.

${splitPlayers.map((p) => `- **${p.player}** (${p.position}, ${p.team ?? '—'})`).join('\n')}

## What to take from the snapshot

- **Look at the gaps.** Players whose model number sits far from the public
  average are where the model is making a specific claim. Those claims are
  exactly what the review will test.
- **Treat splits as uncertainty, not signal.** A split doesn't mean "fade"
  or "play"; it means the projection is less settled.
- **Salary is context.** A player's price tells you what he costs, not how he
  will score.

Come back after the games for the grade: every projection on this page
against what actually happened. The fuller discussion happens in the
[community](https://www.skool.com/brew-loyalty-6636).

## FAQ

### What is this page?

A timestamped record of the signals the model was reading before Week ${week} kicked off: its own projection, the average of public projections, and where the inputs disagreed. It is not a list of recommended plays.

### What does "Split" mean?

At least one input disagreed sharply with the others, either by how it ranked the player or by how many points it projected. A split means the projection is less settled, not that the player is a fade or a play.

### How is the board chosen?

It is ${data.selection}. The agreement score only picks and orders the board; it is not shown, and a high score does not mean the player will score.

### Does this change after the games?

No. This page is the snapshot as it stood before kickoff. The review post grades exactly what is shown here, so the numbers are never updated afterward.
`;

const front = `---
title: "NFL DFS Week ${week} Signals: What the Data Looked Like Before Kickoff"
description: "A pre-game snapshot of the Week ${week} board: model and public projections, and where the sources agreed and split. A record to be graded, not picks."
pubDate: "${iso}"
dateModified: "${iso}"
tags: ["NFL DFS","Week ${week}","Projections","Weekly Signals"]
author: "DFS Engineer Playbook"
draft: true
pillar: "NFL DFS Projections"
contentType: "Spoke"
hub: "weekly-signals"
season: ${season}
week: ${week}
---

`;

const outPath = resolve(root, `src/content/blog/nfl-dfs-weekly-signals/${season}/week-${week}.md`);
if (existsSync(outPath) && /^draft:\s*false\s*$/m.test(readFileSync(outPath, 'utf-8'))) {
  console.error(`${outPath} is already published (draft: false) — refusing to overwrite.`);
  process.exit(1);
}
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, front + body, 'utf-8');
console.log(`wrote ${outPath}`);
