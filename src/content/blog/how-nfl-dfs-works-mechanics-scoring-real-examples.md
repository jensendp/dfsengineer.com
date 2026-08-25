---
title: "How NFL DFS Works: Mechanics, Scoring & Real Examples"
description: "Learn exactly how NFL DFS works — from salary caps and scoring to contest types and lineup math. A plain-spoken guide with real numbers and examples."
pubDate: '2026-08-25T14:36:17'
tags: ["NFL DFS basics","DFS scoring explained","DFS contest types","NFL DFS beginner guide"]
author: "DFS Engineer Playbook"
draft: false
heroImage: "https://images.unsplash.com/photo-1508863702330-2eece3ea08cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MjQ4MjF8MHwxfHNlYXJjaHwxfHxIb3clMjBORkwlMjBERlMlMjBXb3JrcyUzQSUyME1lY2hhbmljcyUyQyUyMFNjb3JpbmclMjAlMjYlMjBSZWFsJTIwRXhhbXBsZXN8ZW58MHwwfHx8MTc4NzY2ODU3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
---



# How NFL DFS Works: The Complete Mechanical Breakdown for New Players

Most explanations of how NFL DFS works stay surface-level — pick players, stay under the cap, hope for points. That's not enough to actually understand what you're doing.

This guide breaks down the real mechanics. Salary caps, scoring systems, contest structures, and the math that connects them.

If you're placing money on lineups without understanding these pieces, you're guessing. And guessing is expensive.

## What NFL DFS Actually Is (And How It Differs from Season-Long Fantasy)

NFL daily fantasy sports is a single-slate contest. You draft a fresh roster of NFL players before a set of games, stay within a salary cap, and compete against other entrants based on the fantasy points your players accumulate in those games. When the games end, so does the contest. Your roster doesn't carry over. There's no next week for that lineup.

> **New to DFS entirely?** If terms like "slate," "GPP," or "chalk" are unfamiliar, the [NFL DFS Glossary](https://dfsengineer.com/blog/nfl-dfs-glossary) defines every key term you'll encounter in this guide and beyond.

That's the core mechanical difference from season-long fantasy. In a season-long league, you draft once, then manage a roster for 17+ weeks — working the waiver wire, negotiating trades, navigating bye weeks, dealing with the guy in your league who won't answer trade texts. In DFS, none of that exists. Every slate is independent. You lost by 3 points last Sunday? Irrelevant. You build a new roster from scratch for the Week 6 main slate and the field resets.

This independence is also what makes understanding the mechanics so important early on. Each decision — every dollar allocated, every player selected — lives and dies in a single contest window.

One more thing worth knowing upfront: DFS operates legally in most U.S. states because the Unlawful Internet Gambling Enforcement Act of 2006 (UIGEA) carved out an exemption for fantasy contests classified as games of skill. That's a different legal category than sports betting, which is regulated under separate state-by-state frameworks. The distinction matters because it shapes how platforms like DraftKings and FanDuel structure contests, handle payouts, and operate across state lines. For a broader overview of how DFS fits into the fantasy sports landscape, see [What Is NFL DFS: A Complete Beginner's Breakdown](https://dfsengineer.com/blog/what-is-nfl-dfs-a-complete-beginners-breakdown-2026).

## How NFL DFS Salary Caps and Roster Construction Work

Every NFL DFS lineup starts with the same constraint: a fixed salary cap and a set number of roster slots. You fill those slots by "buying" players at prices the platform sets, and you cannot exceed the cap by a single dollar.

On DraftKings classic, you get $50,000 to fill 9 spots: QB, RB, RB, WR, WR, WR, TE, FLEX, DST. FanDuel gives you $60,000 across 9 spots with a slightly different structure — QB, RB, RB, WR, WR, WR, TE, FLEX, DEF — and generally higher individual salaries that produce a similar squeeze.

| | DraftKings Classic | FanDuel |
|---|---|---|
| **Salary Cap** | $50,000 | $60,000 |
| **Roster Slots** | 9 (QB, RB, RB, WR, WR, WR, TE, FLEX, DST) | 9 (QB, RB, RB, WR, WR, WR, TE, FLEX, DEF) |
| **Typical Min Salary** | ~$3,000 | ~$4,500 |
| **Avg Per Slot** | $5,556 | $6,667 |

Here's how the tradeoff math works in practice. Say you roster Josh Allen at $8,200 on DraftKings. That leaves $41,800 for your remaining 8 players, averaging $5,225 per spot. The minimum salary on DraftKings is typically $3,000, so you haven't boxed yourself in completely — but paying up at QB means at least one or two roster spots will need cheap, high-upside options.

```
DraftKings Salary Allocation Example
─────────────────────────────────────
Total Cap:             $50,000
QB (Josh Allen):       -$8,200
                       ───────
Remaining:             $41,800  ÷  8 slots  =  $5,225 avg per slot

If you also pay up for an RB at $7,800:
Remaining:             $34,000  ÷  7 slots  =  $4,857 avg per slot

Now add a WR at $7,200:
Remaining:             $26,800  ÷  6 slots  =  $4,467 avg per slot
→ You need at least 1–2 players near minimum salary to fit this build.
```

That's where "punting" comes in. Punting a roster spot means deliberately rostering a low-salary player — say, a $3,200 TE you expect to score only 5–7 points — so you can afford studs elsewhere. You're not hoping the punt play wins you the week. You're accepting a likely below-average score at one position to create salary room that pushes your ceiling higher at others.

This is the core mechanical tension in NFL DFS. You can't roster all the best players. The cap forces real decisions: pay up at QB and punt TE, or go balanced and hope mid-range options hit? Every dollar spent on one player is a dollar unavailable everywhere else. Understanding that zero-sum tradeoff is the first step toward building lineups with intention instead of just filling slots.

## How NFL DFS Scoring Systems Work Across Platforms

The scoring system determines what a player's real-game performance is actually worth to your lineup, and DraftKings and FanDuel don't agree on the answer.

DraftKings uses full PPR (point per reception) scoring. Every catch is worth 1 point. Passing yards pay 0.04 points per yard (1 point per 25 yards), passing touchdowns are worth 6 points, and interceptions cost -1 point. Rushing and receiving yards pay 0.1 per yard (1 point per 10 yards), and touchdowns are 6 points for rushing and receiving. FanDuel uses half-PPR: receptions are worth 0.5 points instead of 1. Passing touchdowns are worth 4 points on FanDuel versus 6 on DraftKings. Yardage rates are identical across both platforms.

| Scoring Category | DraftKings | FanDuel |
|---|---|---|
| **Reception** | 1.0 pt | 0.5 pt |
| **Passing TD** | 6 pts | 4 pts |
| **Rush/Rec TD** | 6 pts | 6 pts |
| **Passing Yards** | 0.04 pt/yd (1 pt per 25 yds) | 0.04 pt/yd (1 pt per 25 yds) |
| **Rush/Rec Yards** | 0.1 pt/yd (1 pt per 10 yds) | 0.1 pt/yd (1 pt per 10 yds) |
| **Interception** | -1 pt | -1 pt |
| **100-yd Rush/Rec Bonus** | +3 pts | None |
| **300-yd Passing Bonus** | +3 pts | None |

That reception gap compounds fast. A slot receiver who catches 8 passes for 60 yards and no touchdowns scores 14.0 on DraftKings (8 receptions + 6.0 receiving yards) but only 10.0 on FanDuel (4.0 receptions + 6.0 receiving yards). If both platforms price him at $5,400, he's a strong value on DraftKings and a mediocre one on FanDuel. The same stat line produces different roster-building decisions depending on the platform.

```
Same Stat Line, Different Platforms
────────────────────────────────────
Player: Slot WR — 8 catches, 60 yards, 0 TDs

DraftKings (Full PPR):
  Receptions:  8 × 1.0  =  8.0
  Rec Yards:  60 × 0.1  =  6.0
  Total:                   14.0 pts

FanDuel (Half PPR):
  Receptions:  8 × 0.5  =  4.0
  Rec Yards:  60 × 0.1  =  6.0
  Total:                   10.0 pts

Difference: 4.0 points — nearly 30% less on FanDuel.
At the same salary, this player is a fundamentally different value.
```

Then there are bonuses. DraftKings awards +3 points for hitting 300 passing yards, 100 rushing yards, or 100 receiving yards. FanDuel has no milestone bonuses. This isn't a footnote — a quarterback who throws for 298 yards and one who throws for 302 yards are nearly identical in real football, but on DraftKings the second QB scores 3 points more. That threshold warps value. Players who regularly flirt with 100 rushing or receiving yards carry hidden upside on DraftKings that doesn't exist on FanDuel, and your lineup construction should reflect it.

> **Tip:** When evaluating a player for DraftKings specifically, check how often he approaches the 100-yard rushing or receiving threshold. A running back who averages 90+ rushing yards per game has a real shot at that +3 bonus on any given week — upside that's invisible on FanDuel and often not priced into the salary.

## Contest Types: How NFL DFS Cash Games and Tournaments Work Differently

Cash games and tournaments follow the same scoring rules but pay out in completely different ways. That difference should change how you build lineups.

**Cash games** include 50/50s, double-ups, and head-to-heads. The math is straightforward. In a $5 double-up with 100 entries, the prize pool is $500, the platform takes roughly 10% ($50), and the remaining $450 gets split among the top 50 finishers — $9 each. You either nearly double your money or lose your $5. There's no bonus for finishing 1st instead of 48th.

**GPPs (guaranteed prize pools)** work nothing like that. A $5 GPP with 10,000 entries collects $50,000, but payouts are heavily top-weighted. First place might take home $10,000 while the bottom 60% of the field gets nothing. Finishing 3,000th out of 10,000 often pays less than your entry fee. You're not trying to beat half the field — you're trying to beat almost all of it.

| | Cash Game (Double-Up) | GPP (Tournament) |
|---|---|---|
| **Goal** | Beat ~50% of the field | Beat ~80–90%+ of the field |
| **Payout Structure** | Flat (~2× entry) to top half | Top-heavy (1st place gets outsized share) |
| **What to Optimize** | Floor (consistency) | Ceiling (upside + differentiation) |
| **Ownership Relevance** | Low — just pick best projections | High — leverage matters |
| **Lineup Style** | Safe, high-floor players | Correlated stacks, contrarian angles |

This is the core strategic fork. Cash games reward floor. You want players who will reliably produce a solid score — the running back with 18 projected touches, not the boom-or-bust deep threat. Consistency keeps you above the 50th-percentile line.

GPPs reward ceiling and differentiation. You need lineups that can score 200+ on DraftKings, which means stacking correlated players, accepting volatility, and targeting spots where you diverge from the field. A "safe" cash-game lineup entered into a large GPP is almost always dead money.

Build for the contest type first. Everything else follows from that decision.

## How Ownership and Leverage Work in NFL DFS

Every player in a [GPP](https://dfsengineer.com/blog/nfl-dfs-glossary) slate has an ownership percentage — the share of lineups that roster him. This number reshapes your tournament equity in ways that pure point projections never capture.

Say two quarterbacks are both priced at $7,400 on the Week 6 main slate. Your projections have them within half a point of each other: 18.5 and 18.2. But one is 25% owned and the other sits at 6%. These are not equivalent plays.

If the 25%-owned QB scores 24 points, you and a quarter of the field all benefit equally. You gained nothing on them. If the 6%-owned QB hits that same 24, roughly 94% of lineups missed it. That separation is where GPP wins come from — not just from scoring points, but from scoring points that most of the field doesn't have.

Now flip it. If the 6%-owned QB puts up 8 points, you barely fall behind the field because almost nobody else rostered him either. The downside is contained. The 25%-owned QB busting at 8 points hurts more lineups, but yours is still stuck in the same spot relative to the 75% who avoided him.

```
Leverage Scenario: Two QBs, Same Salary ($7,400), Similar Projections
─────────────────────────────────────────────────────────────────────
                        QB A (25% owned)     QB B (6% owned)
                        ────────────────     ───────────────
If scores 24 pts:       You + 25% of field   You + 6% of field
                        benefit equally       → 94% of field missed it
                        → No separation       → Massive separation

If scores 8 pts:        25% of field also     Only 6% of field also
                        hurt → crowded pain   hurt → minimal damage

GPP edge favors:        ← Lower leverage      ← Higher leverage ✓
```

This is leverage in practice: finding spots where the risk-reward asymmetry tilts in your favor. It only matters in tournaments. In a 50/50, you need to finish in the top half, and ownership is irrelevant — you want the highest-floor projection at each salary point, period. Chasing low ownership in a double-up adds variance for zero structural benefit.

## The Math Behind How NFL DFS Lineups Become Profitable (or Don't)

Every dollar you enter into a DFS contest doesn't go straight to the prize pool. Platforms take a rake — typically 10–15% of total entry fees. In a $10 contest with 100 entries, that's $1,000 collected but only $850–$900 paid out. You're not just competing against other players. You're competing against other players *and* a built-in house cut. Understanding this layer separates people who think they're winning from people who actually are.

The edges are small, and they favor the disciplined. Most casual players lose over time because the rake creates a headwind that only consistent, process-driven play overcomes. The advantage doesn't come from one brilliant pick on a Tuesday. It comes from repeatable process — projections built on target share and snap counts, ownership modeling, game environment analysis — applied contest after contest.

Here's what break-even math actually looks like. Say you play $5 double-ups consistently and win 55% of the time. Each win pays $9.

```
Break-Even Math: $5 Double-Ups
───────────────────────────────
Win payout:  $9.00
Loss payout: $0.00
Entry cost:  $5.00

At 55% win rate:
  EV = ($9 × 0.55) + ($0 × 0.45) - $5.00
  EV = $4.95 - $5.00 = -$0.05 per contest
  → Barely losing. The rake eats you.

At 57% win rate:
  EV = ($9 × 0.57) + ($0 × 0.43) - $5.00
  EV = $5.13 - $5.00 = +$0.13 per contest
  → 2.6% ROI. Over 500 contests: +$65 profit.

Break-even win rate:
  $9 × W = $5.00  →  W = 55.6%
  → You need to win more than 55.6% of double-ups
     just to overcome the rake.
```

That's roughly breakeven — a 55% win rate in double-ups just barely covers the rake. Push to 57%, and the math looks better: across 500 entries in an NFL season, that's $65 in profit from $5 stakes. Not glamorous. But real, compounding money built on a disciplined edge. Drop below 55.6%, and the rake eats you. The margins are that thin, which is exactly why process matters more than any single lineup.

> **Warning:** The rake is invisible in the moment — you never "see" it deducted. But over a full NFL season of entries, it's the single biggest drag on your bankroll. A 10% rake means the field collectively loses 10 cents of every dollar entered. You have to be better than average just to break even, and meaningfully better to profit.

## How a Single NFL DFS Week Plays Out: Start to Finish

Here's what a typical NFL Sunday main slate week looks like in practice.

**Tuesday–Thursday:** Early injury news trickles in. You're not building lineups yet, but you're noting situations — a starting RB missing practice Wednesday, a top cornerback in concussion protocol. These shape the player pool before you touch a single salary.

**Friday–Saturday:** This is where real work happens. Saturday afternoon, teams release final injury designations. A WR1 ruled out at 4:00 PM Saturday reshapes an entire game's passing distribution. Once you have that information, you build projections (or pull them from a model), identify your player pool, and start constructing lineups against the $50,000 or $60,000 cap.

**Sunday morning before 1:00 PM ET:** Inactive lists drop roughly 90 minutes before kickoff. You scan for surprises — a player you rostered is a healthy scratch, or a backup suddenly enters the starting lineup at minimum salary. You finalize lineups and enter contests. The main slate locks at 1:00 PM ET.

**After lock:** Here's where a key platform difference matters. DraftKings allows late swap — if you have a player in the 4:25 PM ET or Sunday Night game, you can swap him out as long as his game hasn't kicked off. FanDuel locks your entire lineup at 1:00 PM ET when the first game starts. A DraftKings player who rosters a Sunday Night QB has hours to react if afternoon results break a correlation they were counting on. FanDuel players commit to everything upfront.

That mechanical difference changes strategy. On DraftKings, you can roster a 4:25 PM player as a placeholder and swap to a different option if afternoon results shift your needs. On FanDuel, your pre-lock preparation has to be more thorough because there's no adjustment window.

**Sunday evening:** Scores finalize. Contests pay out, usually within minutes of the last game ending. You review what hit, what missed, and whether your process was sound regardless of outcome. That review step is where long-term edges compound.

For a step-by-step walkthrough of actually building a lineup from scratch — player pool, stacking, and final construction — see [Build Your First NFL DFS Lineup](https://dfsengineer.com/blog/nfl-dfs-beginners-guide-build-your-first-lineup-2026).

## Conclusion

Scoring rules, salary caps, contest structures, rake — these aren't background details. They're the actual game. Every lineup decision you make flows from these mechanics, whether you realize it or not.

The break-even math alone makes the point concrete: a 55% win rate in cash games barely covers the platform's cut. That thin margin disappears fast if you're misallocating salary, ignoring scoring differences between platforms, or playing GPP strategy in a double-up. Precision matters because the edges are small.

Knowing that DraftKings' 100-yard bonus changes your player targets, that FanDuel's half-PPR scoring and lower passing TD value deflate certain archetypes, that a 6%-owned QB carries different tournament equity than a 25%-owned one — this is what separates informed decisions from expensive guesses.

None of it guarantees you'll win. But it guarantees you'll know what you're doing and why.

## FAQ

**What percentage of DFS players are profitable?**

A small minority of consistent DFS players turn a long-term profit. The rake — 10–15% taken by the platform on every contest — means you need to be meaningfully better than average just to break even. In a $10 contest with 100 entries, only $850–$900 gets paid back out. Profitable players tend to rely on systematic processes like projections, correlation modeling, and ownership leverage rather than gut picks. The edge is small and compounds slowly.

**Is DFS considered skill or luck?**

Legally, DFS is classified as a game of skill under the Unlawful Internet Gambling Enforcement Act of 2006. In practice, any single week has enormous variance — a backup RB scores 3 TDs, a star gets injured on the first drive. But over hundreds of contests, the same players consistently appear in the top profit percentiles. That's the statistical signature of skill. One week proves nothing. Five hundred weeks reveal a pattern.

**How do you actually play NFL DFS?**

You create an account on DraftKings or FanDuel, deposit funds, and select a contest — cash game or tournament — for an upcoming NFL slate. You draft a roster of players within the salary cap ($50,000 on DraftKings, $60,000 on FanDuel), your players earn fantasy points based on real-game stats, and if your total score beats enough of the field, you win a cash payout. The full breakdown of scoring rules, salary tradeoffs, and contest structures is covered in the sections above. If you want the broader picture of what DFS is and how it fits together, start with [What Is NFL DFS: A Complete Beginner's Breakdown](https://dfsengineer.com/blog/what-is-nfl-dfs-a-complete-beginners-breakdown-2026).