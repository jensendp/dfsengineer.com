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
  }),
});

export const collections = { blog };
