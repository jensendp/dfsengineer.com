---
title: "NBA DFS Minutes and Injuries: What Happens When a Starter Sits (2025-26 Data)"
description: "Measured across 1,322 NBA games: how many extra minutes bench and rotation players get when teammates sit, how often it happens, and how reliable the bump is."
pubDate: '2026-10-13T09:00:00'
tags: ["NBA DFS","NBA DFS injuries","NBA DFS minutes","injury pivots","late swap"]
pillar: "NBA DFS Injuries & Minutes"
contentType: "Pillar"
author: "DFS Engineer Playbook"
draft: false
---

DraftKings sets NBA salaries before the news breaks. When a starter is ruled out, his price stays where it was and his minutes go to someone else.

Most articles stop at "the backup gets more minutes." We measured how many, across 1,322 games from the 2025-26 season.

The short version: the bump goes to the bottom of the rotation. When rotation teammates who average 50 to 70 minutes between them are newly out, a bench player's median gain is 4.9 minutes and a rotation player's is 1.5. Starters move by about half a minute. Below 30 teammate-minutes, the effect is close to zero.

For the mechanics of editing a lineup after news, see the late swap section of the [NBA DFS complete guide](https://dfsengineer.com/blog/nba-dfs-complete-guide-rules-scoring-strategy). If you play NFL too, the [NBA vs NFL comparison](https://dfsengineer.com/blog/nba-dfs-vs-nfl-dfs-what-changes) covers what carries over.

## How we measured it

The sample is every NBA regular-season, play-in and playoff game from October 21, 2025 through June 13, 2026 between two NBA teams: 1,231 regular-season games, 6 play-in games and 85 playoff games. Preseason and the All-Star games are left out because minutes follow different rules there. Box scores come from public game data.

For each player in each game we need two things.

The first is a baseline: what the player had been averaging. We use a recency-weighted average of his last several games played, so a recent role change counts more than a game from December. A player needs at least three prior games to get a baseline. That leaves 26,857 player-games.

The second is how many teammate-minutes are newly out. We look at the teammates who averaged 12 or more minutes and played the team's previous game. Anyone who is absent tonight counts, and we add up their recent minutes. "Newly" matters. A player who has been out for a month is already baked into everyone's baseline, so counting him again would double-count. Only players who played the last game and are missing now are counted.

```
Teammate-minutes newly out: illustrative example
-------------------------------------------------
A team plays tonight without two rotation players who played last game:

  Guard A     averages 31 minutes   -> 31
  Forward B   averages 22 minutes   -> 22

Teammate-minutes newly out = 53  (falls in the 50-70 band)
```

Players are grouped by their average minutes: under 12 (bench), 12 to 20 (role players), 20 to 28 (rotation), and 28 or more (starters). The number we report is the median change in minutes compared with each player's own baseline. A median is the middle result, so a few huge games don't drag it around.

## How often a rotation player is out

It is common. At least one rotation teammate was newly out in 57% of team-games. In 27% of team-games, 30 or more teammate-minutes were newly out, and in 11%, 50 or more.

Counted by player-games (the table below), a given player had a teammate absence of 30 or more minutes about one game in four.

| Teammate-minutes newly out | Share of player-games |
|---|---|
| None | 44.5% |
| 1 to 15 | 6.2% |
| 15 to 30 | 23.4% |
| 30 to 50 | 16.2% |
| 50 to 70 | 6.0% |
| 70 to 90 | 2.2% |
| 90 or more | 1.5% |

Who is out tonight is part of most slates. The size of the absence sets the effect.

## The table: median change in minutes by role and absence size

Each cell is the median change in a player's minutes compared with his own recent average. The number of player-games is in the second table so you can see where the data is thin.

| Player role (avg minutes) | None | 15 to 30 | 30 to 50 | 50 to 70 | 70 to 90 | 90+ |
|---|---|---|---|---|---|---|
| Bench (under 12) | -1.4 | +0.4 | +1.5 | +4.9 | +6.9 | +14.4 |
| Role player (12 to 20) | -1.2 | +0.6 | +1.8 | +3.5 | +5.1 | +7.7 |
| Rotation (20 to 28) | -0.4 | +0.1 | +0.9 | +1.5 | +2.5 | +3.6 |
| Starter (28+) | -0.5 | +0.2 | +0.6 | +0.5 | +1.2 | +2.4 |

| Player role | None | 15 to 30 | 30 to 50 | 50 to 70 | 70 to 90 | 90+ |
|---|---|---|---|---|---|---|
| Bench | 1,798 | 823 | 672 | 265 | 105 | 127 |
| Role player | 2,732 | 1,475 | 1,022 | 389 | 145 | 103 |
| Rotation | 3,374 | 1,959 | 1,390 | 553 | 217 | 130 |
| Starter | 4,052 | 2,026 | 1,271 | 400 | 130 | 35 |

The 1 to 15 band is left out of the display because it behaves like the "None" column (medians between -1.5 and +0.7). Treat the starter 90+ cell (35 player-games) as a rough hint.

## What the table says

The bump goes to the bottom of the rotation. At 50 to 70 teammate-minutes out, a bench player gains a median 4.9 minutes and a role player 3.5. A rotation player gains 1.5. A starter gains 0.5. The players who already play the most have the least room to grow.

Size matters more than any single name. One missing role player (15 to 30 teammate-minutes) moves almost no one: +0.1 to +0.6 minutes across the roles. The effect starts around 30 teammate-minutes and gets large at 50 and above. At 90 or more, bench players gained a median of 14.4 minutes, which is a different job from the one they had last week.

A healthy night is a small step back. The "None" column is negative for every role, between -0.4 and -1.4. Recent averages include earlier games that were inflated by someone else's absence, so a game with a full roster tends to come in a little under the average. If a player's last week included a star sitting out, do not project a full-roster night at that same number.

The averages hide how lopsided the outcomes are. For bench players at 50 to 70 teammate-minutes, the mean gain is 5.6 against a median of 4.9. A few players get a very long run, and the average is pulled up by them.

## How much the bump varies

A median is the middle outcome, and individual games spread out around it. The next table shows how often a player plays at least five minutes more than his own average, with no teammate absence and with 50 or more teammate-minutes newly out.

| Player role | Plays 5+ minutes more: no absence | Plays 5+ minutes more: 50+ out | Plays 5+ minutes less: no absence | Plays 5+ minutes less: 50+ out |
|---|---|---|---|---|
| Bench | 13% | 58% | 21% | 5% |
| Role player | 15% | 47% | 28% | 9% |
| Rotation | 17% | 32% | 21% | 14% |
| Starter | 11% | 20% | 22% | 15% |

A bench player with big teammate absences gets five extra minutes more often than not (58%), and rarely loses five (5%). A starter in the same spot gets five extra minutes one game in five and loses five one game in seven. For starters the absence changes the odds a little. For bench players it changes them a lot.

The error also widens. Across all roles, the typical miss on a player's minutes is about 3.7 minutes on a normal night and 4.9 minutes when 50 or more teammate-minutes are out. The range that covers four games in five runs from 8.2 fewer minutes to 6.0 more with no absence. With 50 or more out it runs from 5.6 fewer to 14.0 more. The downside shrinks and the upside gets longer.

## What it means in fantasy points

Across these games, players scored about one DraftKings point per minute. A bench player who gains five minutes is worth around five more points if his per-minute production is typical, which varies by player, so check his own rate.

The usual value benchmark is 5x salary in thousands. A $3,000 player needs 15 points to reach it, so five extra minutes closes about a third of that gap. That is useful and not enough on its own: the player still has to produce at his usual rate for the extra time. The extra minutes raise his floor more than they guarantee a good night.

## Using it in a nightly process

1. When a player is ruled out, add up the recent average minutes of every rotation teammate who is out and who played the last game. That total is your teammate-minutes figure.
2. Find the band and look at the rows for the players you are considering. Under 30, assume little change. Above 50, bench and role players are where the extra minutes land.
3. Decide who absorbs the minutes. This table is an average over every kind of player. It does not split by position, and a team with one center who sits will push his minutes to the backup center, not evenly across the roster. Treat the table as a starting point and apply it to the position that is short.
4. If a player is questionable, run it both ways. Calculate the situation with him in and with him out, and see which of your plays depend on the decision.
5. Check again as late as your lineup editing allows. Status can change until close to tip, and most DraftKings NBA contests let you swap any player whose game has not started (check the contest details, because some are run without late swap). The late swap section of the [complete guide](https://dfsengineer.com/blog/nba-dfs-complete-guide-rules-scoring-strategy) has the setup.

## What this does not tell you

It covers one season. Rotations and coaching choices change, so the exact numbers will move.

The table is averaged over all teams and positions. It says nothing about which specific player benefits, and position and lineup fit matter.

Blowouts matter. A player can gain minutes from an absence and lose them again in a 25-point game. We did not separate them.

Minutes are not points. A player who gets more minutes can still have a poor shooting night, and the table says nothing about efficiency.

The baseline comes from public box scores, not tracking data. Players with fewer than three prior games are excluded, which leaves out most rookies and recent call-ups.

The 90-plus teammate-minute cells are small, and the starter 90-plus cell has 35 games.

## FAQ

### How many extra minutes does a backup get when a starter is out?

It depends on who else is out and what kind of player the backup is. When a single starter sits and the total absence is 30 to 50 teammate-minutes, a bench player gains a median of 1.5 minutes and a role player 1.8. When the absence reaches 50 to 70 teammate-minutes, those medians rise to 4.9 and 3.5. The minutes are spread across several players, so one backup does not absorb all of them.

### Do starters get more minutes when a teammate sits?

Only a little. A starter's median change stays between -0.5 and +0.7 minutes up to 70 teammate-minutes out, and reaches +1.2 at 70 to 90 and +2.4 at 90 or more (a small sample). Starters are already near their ceiling, and most of the extra time goes to players lower in the rotation.

### How reliable is the minutes bump?

Reliable in direction, loose in size. With 50 or more teammate-minutes out, a bench player played five or more extra minutes 58% of the time and lost five or more minutes only 5% of the time. The size varies a lot, though. The typical miss on a minutes estimate rises from 3.7 to 4.9 minutes in those games.

### How soon before tip-off should I check injury news?

As late as your editing window allows. Player status can change until close to tip, and on DraftKings you can swap any player whose game has not yet started. If your slate has staggered start times, you get more information before your last players lock.

### Does this work the same on FanDuel?

The minutes are the same on any site, because they depend on the game and not the platform. Scoring differs, so a minute is worth a different number of points on FanDuel. See the [NBA vs NFL comparison](https://dfsengineer.com/blog/nba-dfs-vs-nfl-dfs-what-changes) for how the platforms' rules differ, and for the NFL side of the same process, the [NFL DFS strategy guide](https://dfsengineer.com/blog/nfl-dfs-strategy-guide-a-complete-process-for-2026).
