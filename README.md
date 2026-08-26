# dfsengineer.com

Astro static site for DFS Engineer Playbook's NFL DFS content — same stack
as derekjensen.io (Astro content collections → GitHub → Vercel), by
deliberate choice, not default (see `content-plan.md` and
`n8n-pipeline-review.md` in the `skool` project's `dfs-engineer-playbook/`
folder for the full reasoning and the content plan this scaffold serves).

## Structure

- `src/content/blog/` — one markdown file per post. Frontmatter schema is
  defined in `src/content/config.ts` and must stay in sync with what the
  n8n content pipeline writes (`n8n-dfs-content-pipeline.json`, "Build
  Post Content" node): `title`, `description`, `pubDate`, `tags`, `author`,
  `draft`, `heroImage`.
- `src/pages/index.astro` — post listing.
- `src/pages/blog/[...slug].astro` — individual post pages.
- `src/layouts/BlogPost.astro` — shared post layout.

## Status (Aug 26, 2026)

7 posts live (6 fundamentals + an About page). Content plan, the
20-pillar topical map, and the Year 1 page selection live in the
`skool` project: `dfs-engineer-playbook/content-plan.md` and
`content-map-400.md` — but that plan has since been validated against
real keyword/SERP/competitor data and reconciled directly in the
Notion "DFS Content Pipeline" DB (`Keyword`/`Validated`/`Priority`
fields). Most of the original 400-page plan collapsed into ~14 real
page targets once checked against actual search demand; see OpenSEO's
project context (custom section `pillar-keyword-validation`) for the
full breakdown.

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
npm run dev
```
