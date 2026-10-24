---
title: "NBA DFS: Rules, Scoring and Strategy Guide (2026-27)"
description: "How NBA daily fantasy works on DraftKings: roster rules, scoring with a worked example, contest types, and strategy backed by measured data."
pubDate: '2026-10-13T09:30:00'
tags: ["NBA DFS","NBA DFS strategy","DraftKings NBA scoring","NBA DFS late swap","how to play NBA DFS"]
pillar: "NBA DFS Strategy"
contentType: "Pillar"
author: "DFS Engineer Playbook"
draft: false
---

NBA daily fantasy sports (DFS) is a salary-cap game. You build a lineup of eight players under a budget, those players earn fantasy points from their real box-score stats that night, and your lineup is ranked against everyone else's. A new slate runs on most nights from October to April.

Where we measured something, the numbers carry their sample size. Where we are giving an opinion, we say so.

If you already play NFL DFS, the [NBA vs NFL comparison](https://dfsengineer.com/blog/nba-dfs-vs-nfl-dfs-what-changes) maps what you know onto this sport, and it is the shorter read.

## How an NBA DFS slate works

DraftKings groups the night's games into a slate. Sometimes that is every game, and on busy nights it can be a subset, such as the early games or the late ones. You enter a contest on a slate, build a lineup from the players in those games, and your score is the sum of your players' fantasy points.

Every player has a salary set by DraftKings before the games start. Stars cost more. Your whole lineup has to fit under the salary cap. The skill is in finding players whose likely production is worth more than their price.

Prices do not move when news breaks. If a starter is ruled out an hour before tip-off, his teammates' salaries stay where they were while their expected playing time changes. That gap between a fixed price and a changing role is where most of the NBA edge sits.

## DraftKings NBA Classic: roster and rules

| Rule | Detail |
|---|---|
| Salary cap | $50,000 |
| Roster size | 8 players |
| Slots | PG, SG, SF, PF, C, G, F, UTIL |
| Teams and games | Players from at least 2 different NBA teams and 2 different games |
| Lock | Depends on the contest. See the late swap section below |

G can be filled by a point guard or a shooting guard. F can be filled by a small forward or a power forward. UTIL can be filled by anyone.

A player can be eligible at more than one position. A player listed PG/SG can fill the PG, SG, G or UTIL slot. That flexibility is what lets you rearrange a lineup around late news without breaking the roster.

You do not have to spend the full cap, but unspent salary buys nothing, so most players aim to use nearly all of it.

## NBA scoring on DraftKings

| Stat | Fantasy points |
|---|---|
| Point | +1 |
| Made three-pointer | +0.5 |
| Rebound | +1.25 |
| Assist | +1.5 |
| Steal | +2 |
| Block | +2 |
| Turnover | -0.5 |
| Double-double | +1.5 |
| Triple-double | +3 |

A double-double means reaching 10 or more in two of points, rebounds, assists, steals and blocks. A triple-double is 10 or more in three of them.

A guard finishes with 24 points, 3 made threes, 10 rebounds, 6 assists, 2 steals, 1 block and 3 turnovers.

```
Worked example: DraftKings NBA Classic scoring
-----------------------------------------------
Points            24  x 1.00  =  24.00
Made threes        3  x 0.50  =   1.50
Rebounds          10  x 1.25  =  12.50
Assists            6  x 1.50  =   9.00
Steals             2  x 2.00  =   4.00
Blocks             1  x 2.00  =   2.00
Turnovers          3  x -0.50 =  -1.50
Double-double (points + rebounds) =   1.50
                               -------
Total                             53.00
```

Rebounds, assists, steals and blocks are worth more than they look. A rebound is worth 1.25 points and a steal or block is worth two, so a defensive big man who scores 10 points can outscore a guard who scores 18.

Scoring is not the whole story. Points are only one line of the box score, so a player who shoots poorly can still have a good night.

Playing time drives everything. Every line in the table is a counting stat, so more minutes means more chances to collect them. That is why minutes are the central number here.

Scoring and salaries differ by site, and everything here is about DraftKings. If you play on FanDuel, read FanDuel's own rules page before you build, because the roster, cap and scoring values are not the same.

## Contest types

DraftKings offers several formats, and the one you pick should match what you are trying to do.

| Type | What it is | Who it suits |
|---|---|---|
| Tournaments (GPPs) | A large field and a prize pool that pays the top of the standings, with the most money at the very top | Players willing to accept a lower chance of cashing for a chance at a large payout |
| Cash games: 50/50s and double-ups | You win a fixed prize if you finish above a cutoff, roughly the top half of the field in a 50/50 | Players who want a steady, repeatable return |
| Multipliers | You win a set multiple of your entry if you finish in the top share of the field | A middle path between the two |
| Head-to-head and small leagues | You play one opponent or a small group | Learning the game cheaply |

Many tournaments limit how many lineups one person can enter. A single-entry contest gives you one lineup against everyone else's one, which suits a newer player.

Showdown (single game) is a separate format. You pick from one game only, and the roster has a Captain and five Utility spots. The Captain earns 1.5x the fantasy points and costs 1.5x the listed salary. With only two teams in play, the Captain choice dominates the outcome. Showdown is its own strategy problem, and we do not cover it in depth here.

## Strategy: what the data says

NBA strategy advice tends to be repeated and rarely measured. We checked three common claims against box scores from the 2025-26 season.

### Scores are steadier than in the NFL

We compared 144 NBA players averaging 25 or more DraftKings points (20 or more games) with 285 NFL player-seasons.

| | NFL | NBA |
|---|---|---|
| Typical variation (standard deviation as a share of average) | 0.53 | 0.32 |
| Games within 25% of the player's own average | 36% | 57% |
| Games above 1.5x his average | 17% | 6% |

A player's own recent average is a better guide to tonight in the NBA than in the NFL. Two consequences follow, and both are our reading of the numbers, not something we tested directly:

- Cash games are more forgiving, because a lineup built on averages misses less often.
- Tournaments are rarely won by one monster game. A player scores 1.5 times his average in 6% of games, against 17% in the NFL. They are won by several players clearing their number by a bit, and by being right early about who gets more minutes.

The full method and the position breakdown are in the [NBA vs NFL comparison](https://dfsengineer.com/blog/nba-dfs-vs-nfl-dfs-what-changes).

### Stacking is not a lever

In the NFL, a quarterback and his top receiver move together (a correlation of +0.44 in our data). In the NBA we measured rotation teammates averaging 22 or more DraftKings points, across 23,155 pairs, and found a correlation of +0.05, close to none.

The common claim that basketball teammates are negatively correlated did not show up in total fantasy points either. So you do not need to force two teammates into a lineup, and you do not need to avoid it. Build for value and role.

### Minutes are where the edge is

When rotation teammates are out, the minutes go to the bottom of the rotation. Across 1,322 games, when rotation teammates who average 50 to 70 minutes between them were newly out, a bench player's median gain was 4.9 minutes, a role player's was 3.5, a rotation player's was 1.5 and a starter's was 0.5. Below 30 teammate-minutes the effect is close to zero.

This happens often. At least one rotation teammate was newly out in 57% of team-games. The [minutes and injuries guide](https://dfsengineer.com/blog/nba-dfs-minutes-injuries-starter-sits-data) has the full table, how much it varies, and how to apply it step by step.

The practical rule: before you decide who is cheap and good, find out who is playing and for how long. Then look for the player whose minutes just changed and whose salary has not.

### Cash games versus tournaments

This part is opinion, not measurement.

For cash games, take the safest path. Use players with stable minutes and avoid anyone with an unresolved injury tag. You are trying to finish above the line.

For tournaments, you need to be different in the places that matter. In practice that means leaning on a player the field is likely to underplay, such as a bench player whose minutes just jumped after late news. The idea is the same one that drives the [NFL ownership guide](https://dfsengineer.com/blog/nfl-dfs-ownership-projections-full-leverage-guide-2026): the money is in the gap between how popular a player is and how likely he is to pay off. The [NFL GPP guide](https://dfsengineer.com/blog/nfl-dfs-gpp-strategy-guide-process-driven-framework) lays out the contest-selection framework, and it carries over.

## Late swap

Late swap lets you edit your lineup after the slate has started, as long as the player you are removing and the player you are adding have not played yet. Each player locks when his own game tips off. A player whose game has started stays where he is, and everyone else remains editable. DraftKings does not always call it "late swap" on the contest page. If the details say you can edit a player until his team's game starts, that is late swap.

Some older articles are out of date on this. DraftKings removed late swap from NBA contests for the 2016-17 season. It is back: by 2024 DraftKings was offering special "no late swap" NBA contests as a variation, in which every player locks when the contest starts. That means late swap is the normal setup and the no-swap contests are the exception, and the exact rule depends on the contest. Read the contest details before you enter.

Late swap matters in the NBA for two reasons. First, tip-offs are staggered. On a typical slate the first game starts well before the last, so there is a long window in which part of your lineup is still editable. Second, the most valuable news arrives late. Some players are ruled out in the last hour before their game.

### How to use it

1. Build with the late games in mind. Put players from late games in the slots that are easiest to change, and do not lock your most important decisions into the early games.
2. Know which of your players are questionable. If a questionable player is in an early game, you cannot undo him once his game starts, so decide before tip-off.
3. Use position flexibility. A player eligible at PG/SG can move between PG, SG, G and UTIL, which gives you more ways to fit a replacement.
4. Have the replacement ready. Know who you would swap in if a player is ruled out, and what it does to your salary. A swap still has to fit under the cap and into an open slot, so a plan made in advance beats an improvised one.
5. Check as late as your schedule allows. The final lineup checks before each game are the ones that catch scratches.

If you play a contest without late swap, the whole lineup is final at lock. In that case, the minutes data above matters more, because you cannot fix a mistake afterward. Our [minutes guide](https://dfsengineer.com/blog/nba-dfs-minutes-injuries-starter-sits-data) has the details on preparing for questionable players when you cannot change your mind.

## A nightly routine

A slate every night means you cannot rebuild your process from scratch each day, so keep a fixed routine.

1. Morning: check which games are on, the injury report and the salaries. Note which players are questionable.
2. Afternoon: build your first lineup, using recent averages as the baseline and adjusting for who is out.
3. About 90 minutes before the first tip: check the news again. Many role changes show up here.
4. About 30 and 10 minutes before the first tip, and again before each later game if you use late swap: check final injury statuses and confirmed starters.
5. After the games: record what you entered, what you expected, and what happened. A single night tells you very little, and the record is how you find out whether your process works.

## Getting started

These are suggestions, not measured results.

- Start with small entries and a single-entry contest, so you learn the format with limited risk.
- Early in the season, players' averages still reflect last year's rotations. Lean on tonight's news more than on season-long numbers for the first couple of weeks.
- Pick one site, and learn its rules and scoring before you add another.
- Set a bankroll limit before you start, and never enter with money you need. DFS involves risk, and a good process can still lose on any given night.

## Common mistakes

- Treating the lineup as finished once it is built. The news that matters most can arrive after you submit.
- Chasing last night's box score. One big game says little, and a player's price already reflects it.
- Ignoring the size of an absence. One missing role player moves almost no one. A large absence changes the whole rotation.
- Forcing stacks. We did not find the correlation that makes them worth a roster spot.
- Entering too many contests at once. With a slate most nights, a unit size that works weekly will spread you thin.

## FAQ

### How does NBA DFS work?

You build a lineup of eight players under a $50,000 salary cap on DraftKings. Your players earn fantasy points from their real stats that night, such as points, rebounds and assists, and your lineup is ranked against everyone else in the contest. Prizes go to the top finishers.

### What is NBA scoring on DraftKings?

A point is worth 1, a made three 0.5, a rebound 1.25, an assist 1.5, a steal 2, a block 2 and a turnover -0.5. A double-double adds 1.5 and a triple-double adds 3. See the worked example above for how a single stat line adds up.

### What positions do I need in NBA DFS?

DraftKings Classic uses eight slots: PG, SG, SF, PF, C, G, F and UTIL. G can be a point guard or shooting guard, F can be a small forward or power forward, and UTIL can be anyone. You also need players from at least two teams and two games.

### What is late swap in NBA DFS?

Late swap lets you change a player in your lineup after the slate has started, as long as neither the player you remove nor the player you add has started his game. Most NBA contests on DraftKings offer it, and some are run without it, so check the contest details.

### Does stacking work in NBA DFS?

Not the way it does in the NFL. In our data, NBA rotation teammates' fantasy points had a correlation of +0.05, close to none, against +0.44 for an NFL quarterback and his top target. Build for value, role and minutes instead.

### How do I find NBA DFS value?

Look for players whose minutes are likely to rise and whose salary has not moved. The usual benchmark is a return of 5 times salary in thousands, so a $6,000 player needs about 30 points. When teammates who average 50 to 70 minutes between them are newly out, a bench player gains a median of 4.9 minutes, which is where many value plays come from.

### Is NBA DFS easier than NFL DFS?

Individual scores are more predictable in the NBA, with typical variation of 0.32 against 0.53. That does not make winning easier, because everyone has the same information. The sport rewards being faster to the news.

### When should I set my lineup?

Build a first version in the afternoon, then check the news again about 90, 30 and 10 minutes before the first tip. If your contest has late swap, you can keep editing until each player's own game starts. If it does not, your lineup is final at lock.
