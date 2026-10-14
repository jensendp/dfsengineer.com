---
title: "NBA DFS Projections: How They Are Made and How We Grade Them (2026-27)"
description: "How our NBA DFS projections work: points per minute times expected minutes, the 80% range, what backtests on 2025-26 showed, the known biases, and how every projection is graded in public."
pubDate: '2026-10-14T11:22:00'
tags: ["NBA DFS projections","NBA DFS","NBA fantasy projections","NBA DFS model","NBA DFS minutes"]
pillar: "NBA DFS Projections"
contentType: "Pillar"
author: "DFS Engineer Playbook"
draft: false
---

An NBA DFS projection is one number: the DraftKings fantasy points a player is expected to score tonight. A projection is only useful if you know how it was made, how often it misses, and whether anyone checked.

This page covers all three for ours. The projections are saved before tip-off and graded against the box score on the [NBA scorecard](https://dfsengineer.com/nba/scorecard/), including the players who did not play.

At the start of the season we do not publish the full nightly table. The daily posts carry the model's value board, and every projection behind the board is graded on the scorecard.

## What a projection is

Our projection is the expected fantasy score if the player plays. It does not blend in a chance that he sits. A player who is ruled out is removed from the board, and a player who was projected and then did not play is graded as a miss on the scorecard.

That is why injury status matters. A Questionable player has a projection like anyone else, and the projection says nothing about whether he suits up. Each player also gets a second number: his projection if the Questionable and Doubtful players on his team are out too. The gap between the two shows how much his value hangs on a pending decision. Status comes from the more severe of DraftKings' tag and ESPN's.

## How the number is built

```
projection = points per minute (last 30 games played) x expected minutes
```

Both halves are simple. Each choice below came from a walk-forward test on the 2025-26 season: fit on earlier games, score on later ones.

**Points per minute.** The rate is the player's DraftKings points per minute over his last 30 played games. We tried 10, 20, 30, 40 and full-season windows. Longer was better, and 30 to 40 games performed about the same, so we use 30.

**Expected minutes.** Minutes carry most of the model's edge. We start with a recency-weighted average of the player's minutes, so a recent role change counts more than a game from two months ago. Then we adjust for how many minutes of rotation teammates are newly out. The adjustment comes from the pattern in the [minutes and injuries data](https://dfsengineer.com/blog/nba-dfs-minutes-injuries-starter-sits-data): the extra minutes go mostly to the bottom of the rotation, and the effect grows with the minutes missing.

"Newly out" has a specific meaning. A teammate counts if he played his team's last game and is out tonight. Someone who has been out for a month is already in everyone's baseline.

## The 80% range

Each projection comes with a range. It runs from the 10th to the 90th percentile of past errors, measured within projection tiers. A player projected at 40 points has a different spread than one projected at 15.

Eight times in ten the actual score should land inside the range. In the backtest it did 79% of the time. Treat the projection as the middle of a spread. A wide range means the minutes are uncertain, and that is useful to know before you roster him.

## What we tested and dropped

| Idea | What happened |
|---|---|
| Pull player rates toward the league average | Hurt. It lifted bench players and added bias |
| Raise a player's points per minute when teammates are out | No effect. Per-minute scoring does not rise on average, so the edge is in the minutes |
| Predict minutes with a linear regression on missing minutes | Did not beat the plain baseline. It overshot |
| Adjust for persisting absences | Hurt |

The tests are on 2025-26 only. They are evidence for what we built. They do not guarantee how next season goes.

## How it did in backtests

Across three train-and-test splits on 2025-26, the model's mean absolute error (MAE) in fantasy points was 7.7 against 7.9 for a plain average of the player's recent fantasy points. The correlation between projection and actual was about 0.74.

In games with 50 or more teammate-minutes newly out, the model's error was 8.5 to 8.9 against 9.1 to 9.9 for the plain average. That is the gap the minutes model exists to close, and it is larger than the overall gap.

Three limits apply:

- It is a modest improvement over a plain average, not a precise forecast. Fed the player's actual minutes, the same rates give an error of about 5.6. With predicted minutes the error is 7.7. Most of the miss is minutes uncertainty.
- The backtest knew who was actually out. Live, the model works from pre-game injury status, so real accuracy is lower whenever a status is unsettled.
- The backtest's plain average is the player's own recent fantasy points. The scorecard uses a different baseline, DraftKings' season average, because that is what readers see on the site.

## Known biases

We found two and did not correct either. A bias correction by projection tier or absence band only moved error between segments without lowering it out of sample.

- Stars projected at 40 or more run about 1.5 points high.
- Games with 50 or more teammate-minutes newly out run about 1 to 2 points low.

Players with fewer than 10 prior games carry a flag, because their minutes error runs 1 to 1.5 minutes worse. A player with fewer than three games has no baseline and no projection.

## How we grade it

The [scorecard](https://dfsengineer.com/nba/scorecard/) runs on a short list of rules:

1. Each player is graded on the last projection saved before his own game started. Nothing is edited afterward, and each row carries its save time.
2. A player who was projected and did not play is a miss. The row stays.
3. The model and each baseline are scored on the same players.
4. No verdict until 30 players are graded, and the sample size sits beside every number.
5. Preseason games are tracked privately and kept out of the public record.

The value board has its own rule. On each slate the model ranks players projected at 15 or more points by projected points per $1,000 of salary, and the top 10 are graded. A pick is a hit when the player scores at least 5 times his salary in thousands. The same rule runs on DraftKings' season averages for comparison. The full record is available as JSON on the scorecard page.

We have no regular-season results yet. The first slate is October 20, 2026, and until 30 players are graded the scorecard shows a progress note and no conclusions.

## Using a projection

Check minutes first. If a projection looks high, find out which minutes it assumes and why. A cheap player projected for 28 minutes who averages 16 is a bet on the absence adjustment, so check that a rotation teammate is actually out.

Then check status. A projection for a Questionable player is only worth something if he plays, so compare his two numbers and decide how much of the lineup hangs on one tag.

Last, look at the range. Our view is that a cash game calls for a narrow range at a fair price. In a large tournament, the upper end of the range is where a ceiling night comes from. For how ownership changes that decision, see the [ownership and leverage guide](https://dfsengineer.com/blog/nba-dfs-ownership-leverage-guide). For the rules and scoring these points are based on, see the [complete NBA DFS guide](https://dfsengineer.com/blog/nba-dfs-complete-guide-rules-scoring-strategy).

## FAQ

### What is an NBA DFS projection?

It is a forecast of the DraftKings fantasy points a player will score in a game. Ours multiplies his points per minute over his last 30 games by his expected minutes, and gives an 80% range alongside.

### How accurate are NBA DFS projections?

In our backtest on 2025-26, the average miss was about 7.7 fantasy points per player, against 7.9 for a plain recent average. Most of the error is minutes uncertainty. These are backtest numbers. The live record starts on October 20, 2026, and appears on the scorecard.

### Why do NBA DFS projections depend so much on minutes?

Fantasy points are minutes times a scoring rate. A player's rate changes little from game to game, and his minutes change a lot, especially when a teammate is out. In our tests, per-minute scoring did not rise when teammates sat, and minutes did.

### Do projections account for injuries?

For teammates, yes: the minutes model adjusts for rotation players who are newly out. For the player himself, the projection assumes he plays. A player who was projected and did not play is graded as a miss on the scorecard.

### How do you know the projections weren't changed after the games?

Each graded row on the scorecard carries the time it was saved, and the scorecard grades the last projection saved before that player's own tip-off. The full record is published as a JSON file so you can check it.

### Do you publish NBA ownership projections?

No. See the [ownership and leverage guide](https://dfsengineer.com/blog/nba-dfs-ownership-leverage-guide) for how to use ownership numbers from any source and how to check them yourself.
