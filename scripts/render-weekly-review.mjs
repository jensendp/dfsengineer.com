// Render a weekly "review" draft post from a review export.
//
//   node scripts/render-weekly-review.mjs data/nfl/week-6-review.json
//
// Input is the JSON written by `dfs-local export-weekly-review`: the frozen
// pre-game board (from the committed week-N-signals.json) with real results
// joined on, plus slate-wide accuracy. Output is a markdown post at
// src/content/blog/nfl-dfs-weekly-review/<season>/week-<n>.md with
// `draft: true`; it never publishes and refuses to overwrite a post already
// flipped to draft: false.
//
// Every claim in the prose is computed from the data and worded to match
// whichever way the numbers came out — a week where the model loses reads as
// a loss. No third-party source names and no ownership figures appear here.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];
if (!input) {
  console.error('usage: node scripts/render-weekly-review.mjs <data/nfl/week-N-review.json>');
  process.exit(1);
}
const data = JSON.parse(readFileSync(resolve(root, input), 'utf-8'));
const { season, week, accuracy, outside_opinion: oo } = data;
const retro = Boolean(data.retroactive);
const graded = data.board.filter((p) => p.actual != null && p.model != null && p.public != null);
if (graded.length < 10) {
  console.error(`only ${graded.length} graded players — is the week scored? nothing rendered`);
  process.exit(1);
}

// ---------- stats ----------
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const corr = (a, b) => {
  const ma = mean(a), mb = mean(b);
  const num = a.reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0);
  const den = Math.sqrt(a.reduce((s, x) => s + (x - ma) ** 2, 0) * b.reduce((s, y) => s + (y - mb) ** 2, 0));
  return den ? num / den : null;
};
const A = graded.map((p) => p.actual);
const M = graded.map((p) => p.model);
const P = graded.map((p) => p.public);
const mae = (xs) => mean(xs.map((x, i) => Math.abs(x - A[i])));
const bModelCorr = corr(M, A), bPubCorr = corr(P, A);
const bModelMae = mae(M), bPubMae = mae(P);
const closer = graded.filter((p) => Math.abs(p.model - p.actual) < Math.abs(p.public - p.actual)).length;

const f1 = (v) => (v == null ? 'n/a' : v.toFixed(1));
const f2 = (v) => v.toFixed(2);
const money = (n) => `$${n.toLocaleString('en-US')}`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const split = graded.filter((p) => p.split);
const agreed = graded.filter((p) => !p.split);
const inj = graded.filter((p) => p.injury);
const groupRow = (label, rs) =>
  `| ${label} | ${rs.length} | ${f1(mean(rs.map((p) => p.model)))} | ${f1(mean(rs.map((p) => p.public)))} | ${f1(mean(rs.map((p) => p.actual)))} |`;

const byGap = [...graded].sort((a, b) => (a.actual - a.model) - (b.actual - b.model));
const tooHigh = byGap.slice(0, 6);
const tooLow = byGap.slice(-6).reverse();
const diffTable = (rs) =>
  [
    '| Player | Pos | Team | Salary | Model | Public avg | Actual |',
    '|---|---|---|---:|---:|---:|---:|',
    ...rs.map((p) => `| ${p.player} | ${p.position} | ${p.team ?? 'n/a'} | ${money(p.salary)} | ${f1(p.model)} | ${f1(p.public)} | ${f1(p.actual)} |`),
  ].join('\n');

// ---------- wording that follows the numbers ----------
const verdict = (mc, pc, mm, pm) => {
  const betterCorr = mc > pc, betterMae = mm < pm;
  if (betterCorr && betterMae) return 'better';
  if (!betterCorr && !betterMae) return 'worse';
  return 'mixed';
};
const boardVerdict = verdict(bModelCorr, bPubCorr, bModelMae, bPubMae);
const slateVerdict = verdict(accuracy.model.corr, accuracy.public.avg_corr, accuracy.model.mae, accuracy.public.avg_mae);

const boardLine = {
  better: `On the ${graded.length}-player board, the model's projections lined up better with real results than the public average did`,
  worse: `On the ${graded.length}-player board, the model's projections lined up worse with real results than the public average did`,
  mixed: `On the ${graded.length}-player board, the model and the public average split the grading`,
}[boardVerdict];
const slateLine = {
  better: 'the model beat the public sources on both measures',
  worse: 'the model trailed the public sources on both measures',
  mixed: 'the model won on one measure and lost on the other',
}[slateVerdict];

const sameDir = (split.length && agreed.length)
  ? (mean(split.map((p) => p.actual)) > mean(agreed.map((p) => p.actual))) === (oo.split_avg > oo.agreed_avg)
  : null;
const splitNote = sameDir == null ? '' : sameDir
  ? 'The slate-wide numbers point the same way.'
  : 'The slate-wide numbers point the other way.';

const ordered = oo.bullish_avg > oo.neutral_avg && oo.neutral_avg > oo.bearish_avg;
const oppLine = ordered
  ? `Players flagged bullish by logged articles and podcasts averaged ${f1(oo.bullish_avg)} actual points across the ${oo.n} graded, versus ${f1(oo.neutral_avg)} for neutral and ${f1(oo.bearish_avg)} for bearish, the order you'd hope for.`
  : `Players flagged bullish by logged articles and podcasts averaged ${f1(oo.bullish_avg)} actual points across the ${oo.n} graded, versus ${f1(oo.neutral_avg)} for neutral and ${f1(oo.bearish_avg)} for bearish. That did not line up cleanly this week.`;

const injSection = inj.length === 0 ? '' : `
## Injury tags

${inj.length} player${inj.length === 1 ? '' : 's'} on the board carried an injury tag at snapshot time and averaged ${f1(mean(inj.map((p) => p.actual)))} points against a model average of ${f1(mean(inj.map((p) => p.model)))}. ${mean(inj.map((p) => p.actual)) > mean(inj.map((p) => p.model)) ? 'The model discounted them, and as a group they beat that discount.' : 'The model discounted them, and as a group they did not beat that discount.'} With ${inj.length} player${inj.length === 1 ? '' : 's'} that is an observation to track, not a rule.
`;

const takeaways = [
  boardVerdict === 'better'
    ? 'The model beat the public average on this board. Check whether that holds next week before reading anything into it.'
    : boardVerdict === 'worse'
    ? "The model did not beat the public average on this board. We will check again next week and look at where its big gaps came from."
    : 'The model and the public average split the grading on this board. Neither won outright.',
  slateVerdict === 'mixed'
    ? 'Across the full slate the result was mixed: the model won on one accuracy measure and lost on the other. Whether that holds over more weeks is the test.'
    : slateVerdict === 'better'
    ? 'Across the full slate the model beat the public sources. One week is a start, not a record.'
    : 'Across the full slate the model trailed the public sources. The model earns its place by being checked, so we keep checking.',
  'Publishing the snapshot first and the grade afterward means the grade cannot be adjusted to fit. Bad weeks are as useful as good ones.',
];

const nextWeek = week + 1;
const intro = retro
  ? `*Results as of the Week ${week} games. This grades the
[pre-game board](/blog/nfl-dfs-weekly-signals/${season}/week-${week}/) as we rebuilt it
after the games, a sample of the format from before snapshots went up ahead of
kickoff. From Week ${week + 1} on, each snapshot goes up first and gets graded as published.*`
  : `*Results as of the Week ${week} games. This grades the
[pre-game snapshot](/blog/nfl-dfs-weekly-signals/${season}/week-${week}/) as
published. No projection changed after the fact.*`;

const body = `${intro}

The pre-game post showed what the data looked like. This one grades it:
projections against real DraftKings points, the hits and misses, and
whether the model earned its place on the board. One week is a small
sample, so this page shows the method and the numbers and declares no
winner.

## The short version

- ${boardLine}: correlation ${f2(bModelCorr)} vs ${f2(bPubCorr)}, average miss ${f1(bModelMae)} vs ${f1(bPubMae)} points. The model was closer than the public average on ${closer} of ${graded.length} players.
- Across all ${accuracy.model.n} graded players (not just the board), ${slateLine}: the model's average miss was ${f2(accuracy.model.mae)} points vs ${f2(accuracy.public.avg_mae)} for the ${accuracy.public.sources} public sources (their individual scores averaged), with correlation ${accuracy.model.corr.toFixed(3)} vs ${accuracy.public.avg_corr.toFixed(3)}.
- The board is a selected group, the top-scoring names, so its correlations run lower than a full slate's. Both views are shown for that reason.
- The largest model miss on the board was ${tooHigh[0].player} (model ${f1(tooHigh[0].model)}, actual ${f1(tooHigh[0].actual)}). The largest beat was ${tooLow[0].player} (model ${f1(tooLow[0].model)}, actual ${f1(tooLow[0].actual)}).

## Board results by group

| Group | Players | Avg model | Avg public | Avg actual |
|---|---:|---:|---:|---:|
${[split.length ? groupRow('Sources split', split) : null, agreed.length ? groupRow('Sources agreed', agreed) : null].filter(Boolean).join('\n')}

${split.length && agreed.length ? `Players where the sources agreed averaged ${f1(mean(agreed.map((p) => p.actual)))} points; the split group averaged ${f1(mean(split.map((p) => p.actual)))}. Over the full ${oo.n}-player pool, split players averaged ${f1(oo.split_avg)} vs ${f1(oo.agreed_avg)} for the rest. ${splitNote} ${split.length < 20 ? `With only ${split.length} players in the split group this week there is no reliable conclusion either way.` : ''} We will keep tracking it.` : 'There was no split group to compare this week.'}

## Biggest misses and beats against the model

The largest gaps between the model's projection and what happened, on
the board.

### Model too high

${diffTable(tooHigh)}

### Model too low

${diffTable(tooLow)}

Both lists are ordinary single-week variance, which is why the grade runs over many weeks.

## Outside opinion

${oppLine} One week is not a trend. We will keep tracking it.
${injSection}
## What this means

${takeaways.map((t) => `- ${t}`).join('\n')}

Next week's snapshot goes up before the games and gets graded the same way.
The fuller discussion happens in the [community](https://www.skool.com/brew-loyalty-6636).

## FAQ

### What is this page?

The grade for the Week ${week} signals post: the pre-game projections compared with real DraftKings points, with the hits and the misses.

### Did the projections change after the games?

${retro ? `Week ${week}'s board was rebuilt after the games, not published beforehand, so this week is a sample of the format. From Week ${week + 1} on, the grade is of a snapshot published before kickoff.` : 'No. This grades the snapshot exactly as it was published before kickoff.'}

### Why show both the board and the full slate?

The board is the top-scoring names, a selected group, so its correlations run lower than a full slate's. The full-slate numbers cover everyone. The board covers the players the signals page featured.

### Is one week enough to judge the model?

No. A single slate is noisy, so the same snapshot and grade are published every week.
`;

const iso = (data.generated_at ? new Date(data.generated_at) : new Date()).toISOString().slice(0, 19);
const front = `---
title: "NFL DFS Week ${week} Review: How the Pre-Game Signals Graded"
description: "Week ${week}'s pre-game board graded against real DraftKings points: model vs the public average, hits and misses, and what one week can and can't tell you."
pubDate: "${data.published_at ?? iso}"
dateModified: "${data.published_at ?? iso}"
tags: ["NFL DFS","Week ${week}","Projections","Weekly Review"]
author: "DFS Engineer Playbook"
draft: true
pillar: "NFL DFS Projections"
contentType: "Spoke"
hub: "weekly-review"
season: ${season}
week: ${week}
---

`;

const outPath = resolve(root, `src/content/blog/nfl-dfs-weekly-review/${season}/week-${week}.md`);
if (existsSync(outPath) && /^draft:\s*false\s*$/m.test(readFileSync(outPath, 'utf-8'))) {
  console.error(`${outPath} is already published (draft: false) — refusing to overwrite.`);
  process.exit(1);
}
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, front + body, 'utf-8');
console.log(`wrote ${outPath}`);
