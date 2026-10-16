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
// A record rebuilt after the games (before this pipeline existed) says so on the page.
const retro = Boolean(data.retroactive);
if (!Array.isArray(players) || players.length === 0) {
  console.error('export has no players — nothing to render');
  process.exit(1);
}

const POS = ['QB', 'RB', 'WR', 'TE', 'DST'];
const POS_NAME = { QB: 'Quarterbacks', RB: 'Running backs', WR: 'Wide receivers', TE: 'Tight ends', DST: 'Defenses' };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const f1 = (v) => (v == null ? 'n/a' : v.toFixed(1));
const money = (n) => `$${n.toLocaleString('en-US')}`;

const notes = (p) => [p.injury, p.split ? 'Split' : null].filter(Boolean).join(', ') || 'None';
const table = (rows) =>
  [
    '| Player | Team | Salary | Model | Public avg | Range | Notes |',
    '|---|---|---:|---:|---:|---|---|',
    ...[...rows]
      .sort((a, b) => b.salary - a.salary)
      .map((p) => `| ${p.player} | ${p.team ?? 'n/a'} | ${money(p.salary)} | ${f1(p.model)} | ${f1(p.public)} | ${cap(p.range)} | ${notes(p)} |`),
  ].join('\n');

function positionSection(pos) {
  const rows = players.filter((p) => p.position === pos);
  if (rows.length === 0) return null;
  const withGap = rows.filter((p) => p.model != null && p.public != null);
  const gap = withGap.sort((a, b) => Math.abs(b.model - b.public) - Math.abs(a.model - a.public))[0];
  const split = rows.filter((p) => p.split).map((p) => p.player);
  let line = `${rows.length} on the board.`;
  if (gap) line += ` Widest gap between the model and the public average: ${gap.player} (model ${f1(gap.model)}, public ${f1(gap.public)}).`;
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

const intro = retro
  ? `*Week ${week} was the first board. We rebuilt it from the model's records after the games, before this series existed, so read it as a sample of the format. From Week ${week + 1} on, the snapshot goes up before kickoff and does not change. It shows what the data looked like, not what to play, and the [Week ${week} review](/blog/nfl-dfs-weekly-review/${season}/week-${week}/) grades it.*`
  : `*${asOf()} Salaries, injury tags, and projections can move after this
was pulled. This page records what the data looked like, not what to play,
and the [Week ${week} review](/blog/nfl-dfs-weekly-review/${season}/week-${week}/) grades it once the
games are played.*`;

const body = `${intro}

Most DFS content gives you a list of names and a confidence level. This
page shows the signals the model read before the games, including where
they disagreed, so you can see how the board was built and judge it
yourself. After the games we publish the grade, hits and misses both.

## How the board was built

Each player's row draws on three inputs:

- The in-house model's projection, built from salary, matchup, recent form,
  and the week's market lines.
- Public projections, which are free and publicly available. "Public avg"
  is the average of whichever ones existed for that player.${retro ? ' This week it covers fewer public sources than later weeks will.' : ''}
- Outside opinion: ${outsideLine.charAt(0).toLowerCase()}${outsideLine.slice(1)},
  recorded as bullish or bearish on a player, never as a point number.

All three feed one agreement-weighted score. The board below is
${data.selection}. That score decides which names appear and says nothing
about who to play: a high score means the inputs agree, not that the player
will score.

## How to read the columns

- Model and Public avg are projected DraftKings points. A large gap means
  the model sees something the public numbers don't, or the reverse.
- Range shows how wide a player's outcomes look next to others at the same
  position. Tight is more predictable, Wide is more boom-or-bust, and Mid
  sits between them.
- Notes list the injury tag at snapshot time and whether the sources split
  on the player.

## The board, by position

Each table is sorted by salary, highest first. Split marks players where
the inputs disagreed sharply. For everyone else the model, the public
projections, and outside opinion roughly agreed. Agreement does not make a
player safe. It means fewer inputs are arguing.

**Jump to:** ${POS.filter((p) => players.some((x) => x.position === p))
  .map((p) => `[${POS_NAME[p]}](#${POS_NAME[p].toLowerCase().replace(/ /g, '-')})`)
  .join(' · ')} · [Where the sources split](#where-the-sources-split)

${POS.map(positionSection).filter(Boolean).join('\n\n')}

## Where the sources split

${splitPlayers.length} of the ${players.length} players had at least one input that disagreed
sharply with the rest. These are the open questions on the board, whatever
their raw score says. When inputs disagree, the projection carries more
uncertainty than its number suggests. The disagreement can sit in one
source or in outside opinion, so the averaged projections above can look
close even when the inputs underneath were far apart.

${splitPlayers.map((p) => `- ${p.player} (${p.position}, ${p.team ?? 'n/a'})`).join('\n')}

## What to take from the snapshot

- Where a player's model number sits far from the public average, the
  model is making a specific claim. The review tests those claims.
- A split means the projection is less settled. It says nothing about
  whether to play or fade the player.
- Salary tells you what a player costs, not how he will score.

Come back after the games for the grade: every projection on this page
against what actually happened. The fuller discussion happens in the
[community](https://www.skool.com/brew-loyalty-6636).

## FAQ

### What is this page?

A timestamped record of the signals the model read before Week ${week} kicked off: its own projection, the average of public projections, and where the inputs disagreed. It lists no recommended plays.

### What does "Split" mean?

At least one input disagreed sharply with the others, either in how it ranked the player or in how many points it projected. A split means the projection is less settled. It says nothing about whether to play or fade the player.

### How is the board chosen?

It is ${data.selection}. The agreement score picks and orders the board but is not shown, and a high score does not mean the player will score.

### Does this change after the games?

${retro ? `Not after publication. Week ${week}'s board was rebuilt after the games, so it is a sample of the format. From Week ${week + 1} on, the snapshot goes up before kickoff and the review grades what was shown.` : 'No. This page is the snapshot as it stood before kickoff. The review post grades what is shown here, so the numbers are never updated.'}
`;

const front = `---
title: "NFL DFS Week ${week} Signals: What the Data Looked Like Before Kickoff"
description: "A pre-game snapshot of the Week ${week} board: model and public projections, and where the sources agreed and split. A record to be graded."
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
