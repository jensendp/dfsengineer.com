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
    // Weekly hub fields (nfl-dfs-value-plays / nfl-dfs-matchup-analysis) —
    // set on the weekly Spoke posts, alongside pillar/contentType above so
    // the existing pillar-filtered "More in this series" widget still
    // surfaces them. See BlogPost.astro's hub-weeks query and
    // dateModified prop. Optional so existing/non-hub posts are unaffected.
    hub: z.enum(['value-plays', 'matchup-analysis']).optional(),
    season: z.number().optional(),
    week: z.number().optional(),
    dateModified: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
