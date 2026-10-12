import { defineCollection, z } from 'astro:content';

// Schema matches the frontmatter the n8n DFS content pipeline writes —
// see skool/dfs-engineer-playbook/n8n-dfs-content-pipeline.json,
// "Build Post Content" node. Keep these in sync: a field renamed on one
// side without the other breaks the build silently (Astro just drops
// unknown/missing fields rather than erroring by default outside strict
// mode, so this schema uses .strict-ish required fields deliberately).
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('DFS Engineer Playbook'),
    draft: z.boolean().default(false),
    pillar: z.string().optional(),
    contentType: z.enum(['Pillar', 'Spoke']).optional(),
    // Hub fields — set on recurring Spoke posts (NFL's weekly value-plays /
    // matchup-analysis, NBA's nightly picks-today, and whatever hub the
    // next sport needs), alongside pillar/contentType above so the
    // existing pillar-filtered "More in this series" widget still surfaces
    // them. See BlogPost.astro's hub-weeks query and dateModified prop.
    // Optional so existing/non-hub posts are unaffected.
    //
    // `hub` is a free string, not an enum, on purpose: NFL's two values
    // ('value-plays', 'matchup-analysis') were hardcoded here, which meant
    // every new sport's hub needed its own schema edit before a single
    // post could validate. Widened once (Oct 2026, multi-sport expansion)
    // so NBA's 'picks-today' and any future sport's hub slot in without
    // touching this file again — see nba/nba-content-plan.md §7.
    hub: z.string().optional(),
    // `season` is a union because NFL's season is a single year (2026) but
    // NBA's spans two (written "2026-27") — widened for the same reason as
    // `hub` above, not NFL-specific anymore.
    season: z.union([z.number(), z.string()]).optional(),
    // `week` stays NFL-shaped (weekly cadence only) — nightly sports use
    // `slateDate` below instead, since "week number" doesn't mean anything
    // for a sport playing most nights. Both are optional and a post sets
    // whichever one its own cadence actually uses, never both.
    week: z.number().optional(),
    slateDate: z.coerce.date().optional(),
    dateModified: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
