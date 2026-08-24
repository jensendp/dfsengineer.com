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

## Status (Aug 24, 2026)

Bare scaffold — no real content yet. Built to give the n8n content
pipeline and the `dfs-local export-content-data` hand-off somewhere real
to commit to. Content plan, the 20-pillar topical map, and the Year 1
page selection live in the `skool` project:
`dfs-engineer-playbook/content-plan.md` and `content-map-400.md`.

Known follow-up, not solved yet: the URL scheme here is a flat
`/blog/slug/` pattern (matching derekjensen.io). The real dfsengineer.com
information architecture (per `content-map-400.md`) is pillar-nested
(e.g. `/nfl-dfs-projections/ceiling/`) — revisit the routing once real
content starts landing and it's clear whether the flat structure needs to
change before it's expensive to undo.

## Local development

```
npm install
npm run dev
```
