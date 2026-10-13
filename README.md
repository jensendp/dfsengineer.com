# dfsengineer.com

Astro static site for DFS Engineer Playbook's NFL and NBA DFS content — same
stack as derekjensen.io (Astro content collections → GitHub → Vercel), by
deliberate choice, not default (see `content-plan.md` and
`n8n-pipeline-review.md` in the `skool` project's `dfs-engineer-playbook/`
folder for the full reasoning and the content plan this scaffold serves).

## Structure

- `src/content/blog/` — one markdown file per post. Frontmatter schema is
  defined in `src/content/config.ts` and must stay in sync with what the
  n8n content pipeline writes (`n8n-dfs-content-pipeline.json`, "Build
  Post Content" node). Fields: `title`, `description`, `pubDate`, `tags`,
  `author`, `draft`, plus optional `pillar`, `contentType`
  (`Pillar` | `Spoke`), and the hub fields `hub`, `season`, `week`,
  `slateDate`, `dateModified`.
  - `hub` is a free string (NFL: `value-plays`, `matchup-analysis`; NBA
    will use `picks-today`), so a new sport needs no schema change.
  - `season` is a number (NFL, `2026`) or a string (NBA, `"2026-27"`).
  - Weekly sports set `week`; nightly sports set `slateDate`. Never both.
- `src/pages/index.astro`, `about.astro`, `404.astro` — home, about, 404.
- `src/pages/blog/index.astro` — post listing.
- `src/pages/blog/[...slug].astro` — individual post pages (catch-all, so
  nested season/week folders work).
- `src/pages/nba/scorecard.astro` — public NBA model scorecard.
- `src/pages/nba/scorecard.json.ts` — the same record as a JSON endpoint.
- `src/layouts/` — `BaseLayout`, `BlogPost`.
- `src/components/` — `SiteHeader`, `SiteFooter`, `Analytics`.
- `src/lib/nba-record.ts` — build-time loader for the scorecard record.
- `data/` — build inputs, committed:
  - `dfs-local-export.json` — NFL content-grounding export.
  - `slate-snapshot.json` — NFL slate snapshot.
  - `nba/scorecard.json` — NBA record exported by `nba-local`
    (`Projects/nba-local`). Refresh with `nba-local pull-record` with
    `NBA_RECORD_DEST` set to `<this repo>/data/nba`. Set
    `NBA_SCORECARD_FILE` to preview the page against another export.

## Status (Oct 13, 2026)

### NFL — in season

23 posts: 17 evergreen guides plus two weekly hubs
(`nfl-dfs-value-plays`, `nfl-dfs-matchup-analysis`) with Weeks 1–5 of
2026 published. Weekly posts continue through the season.

### NBA — pre-season, data gathering

The 2026-27 NBA season starts **Oct 20, 2026**. Until then, nothing
reports on real results; the work is groundwork:

- 4 evergreen guides are live: complete guide, minutes and injuries,
  ownership and leverage, and NBA DFS vs NFL DFS.
- The `/nba/scorecard/` page and `scorecard.json` endpoint are built and
  linked in the header. `data/nba/scorecard.json` is currently empty
  (`rows: 0`, `enough_data: false`), so the page renders its "season
  hasn't started" state. The loader never fabricates data: a missing or
  unreadable file is treated as an empty record.
- `nba-local` is collecting data for the projection model. Reporting
  starts with real season data once games are played.
- Not built yet: the NBA `picks-today` hub and its nightly posts
  (`hub: picks-today`, `slateDate`), and season/index pages.

### Content planning

The content plan, the 20-pillar topical map, and the Year 1 page
selection live in the `skool` project:
`dfs-engineer-playbook/content-plan.md` and `content-map-400.md`. That plan
has since been validated against real keyword/SERP/competitor data and
reconciled directly in the Notion "DFS Content Pipeline" DB
(`Keyword`/`Validated`/`Priority` fields). Most of the original 400-page
plan collapsed into ~14 real page targets once checked against actual
search demand; see OpenSEO's project context (custom section
`pillar-keyword-validation`) for the full breakdown. NBA planning is in
`nba/nba-content-plan.md`.

### URL structure — resolved

The flat-vs-pillar-nested question from the original plan is settled:

- **Evergreen guides stay flat**: `/blog/slug/` (e.g.
  `/blog/nfl-dfs-optimizer-guide/`). The original pillar-nested idea
  (`/nfl-dfs-projections/ceiling/`) assumed each pillar would have many
  standalone pages; the keyword validation showed the opposite — most
  pillars collapsed to a single real page, with the rest as sections.
  No folder tree is needed for content that isn't a cluster.
- **Recurring/dated content nests by season, then week**, since that
  content genuinely does form a cluster over time and "week 1" repeats
  every season:
  ```
  src/content/blog/nfl-dfs-value-plays.md              → /blog/nfl-dfs-value-plays/            (evergreen hub)
  src/content/blog/nfl-dfs-value-plays/2026/week-1.md   → /blog/nfl-dfs-value-plays/2026/week-1/
  src/content/blog/nfl-dfs-value-plays/2026/week-2.md   → /blog/nfl-dfs-value-plays/2026/week-2/
  src/content/blog/nfl-dfs-value-plays/2027/week-1.md   → /blog/nfl-dfs-value-plays/2027/week-1/
  ```
  Same pattern for `nfl-dfs-matchup-analysis`. Playoffs use named
  rounds instead of week numbers under the same season folder:
  `.../2026/wild-card/`, `.../divisional/`,
  `.../conference-championship/`, `.../super-bowl/`.
  This works with zero new routing code — Astro content collections
  turn nested folders into nested slugs automatically, and the
  existing `src/pages/blog/[...slug].astro` catch-all handles it as
  long as `pubDate`/`draft` frontmatter stays correct. Verified
  end-to-end (including a hub `.md` file coexisting with a same-named
  folder) before writing this down.
- A season-index page (`/blog/nfl-dfs-value-plays/2026/`, listing
  every week) is a reasonable future addition once several weeks
  exist, but isn't built yet — no content lives there today.

## Local development

```
npm install
npm run dev      # dev server
npm run build    # astro check + astro build (35 pages as of Oct 13, 2026)
```
