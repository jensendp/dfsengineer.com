# DFS Engineer — Style Reference

> A data lab for NFL DFS — chalk-white schematics on a blueprint-black field, one signal-green readout burning through the fog.

**Theme:** dark (primary), with a light "printout" mode for long-form articles.

**Inspiration:** [WHOOP](https://styles.refero.design/style/05053a60-1964-4154-9d58-ebdf6352ed3a)'s
high-contrast black/white split-canvas and oversized display type, crossed with
broadcast-graphics football (hash marks, scoreboard numerals) and a terminal/AI
accent (monospace stat readouts, scanline texture). The site should feel like
an instrument panel a sharp bettor built for themselves — not a picks-selling
landing page. Confidence and math, not hype.

## Concept

DFS Engineer operates on a **schematic-on-black** system: full-bleed void
backgrounds carry oversized headline type and thin hairline grids (yard-line
ticks), while content cards sit on a slightly raised carbon surface. Body copy
and article pages flip to a warm paper-white surface for reading comfort —
the dark canvas is for the tool/dashboard/marketing surfaces, the light
canvas is for the blog. A single electric accent (Signal Green) marks
anything the math likes — positive edge, high ceiling, "start" calls — so it
must stay rare and load-bearing. A second accent (Alert Amber) marks risk —
low floor, fade calls, injury flags. Never use both accents decoratively.

## Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Void | `#0a0a0d` | `--color-void` | Primary dark background — hero, nav, dashboard chrome |
| Carbon | `#15161a` | `--color-carbon` | Raised surface on dark — cards, tables, code blocks |
| Hairline | `#2a2c33` | `--color-hairline` | Borders, dividers, grid ticks on dark |
| Paper | `#f7f6f2` | `--color-paper` | Light surface — article/blog canvas |
| Chalk | `#ffffff` | `--color-chalk` | Primary text on dark, headline color |
| Ink | `#12121a` | `--color-ink` | Primary text on light (paper) surfaces |
| Fog | `#9a9ca6` | `--color-fog` | Secondary text on dark — captions, meta |
| Slate | `#5b5d68` | `--color-slate` | Secondary text on light, muted labels |
| Signal Green | `#8bff5a` | `--color-signal` | Single "the math likes this" accent — CTAs, positive deltas, active nav |
| Alert Amber | `#ff9d3d` | `--color-alert` | Risk/fade/injury accent — negative deltas, warnings only |
| Field Green | `#0f2e1c` | `--color-field` | Deep desaturated green wash for section backgrounds, never text |

Dark canvas ≈ 90% of surface area. Signal Green covers well under 5% of any
given view — it reads as a light on an instrument panel, not a brand wash.

## Tokens — Typography

Two-family system: a tight display grotesk for headlines/nav/UI, and a
monospace for every number the site computes.

- **Display / UI:** `"Inter Tight", "Neue Haas Grotesk", system-ui, sans-serif`
  — weights 500/600/700/800. Headlines run large (48–96px) with tight/negative
  tracking (-0.02em to -0.04em), all-caps for eyebrows and nav only.
- **Body:** `"Inter", system-ui, sans-serif` — weight 400/500, 16–18px,
  1.6 line-height on the paper (article) surface for long-form reading.
- **Data / Mono:** `"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace`
  — every projection, salary, ownership %, ROI, and table figure renders in
  mono. This is the "engineer" signature: stats never share a typeface with
  prose. Tabular-nums always on.

Scale (px): 14, 16, 18, 20, 24, 32, 40, 56, 72, 96.

## Tokens — Spacing & Grid

- Base unit 4px; common steps 8, 12, 16, 24, 32, 48, 64, 96.
- Content max-width 1320px on dashboard surfaces, 860px on article body copy.
- Hairline "yard-line" ticks: a repeating 1px `--color-hairline` mark every
  40px along section dividers, echoing field markings without literal
  stripe art.
- Corner radius: 2px on data elements (cards, tables, buttons) — sharp,
  instrument-panel, not soft/consumer. 0 on full-bleed sections.

## Components

- **Stat card:** `--color-carbon` surface, 1px `--color-hairline` border,
  small uppercase mono label (e.g. `CEIL`, `FLOOR`, `PROJ`, `OWN%`), large
  mono figure below it, optional Signal/Alert colored delta arrow.
- **Player row / table:** mono figures right-aligned, tabular-nums, zebra
  via 2% white overlay not color, position tag as a 2px-radius pill.
- **Buttons:** primary = Signal Green fill, Void text, 2px radius, no
  shadow, uppercase small tracking. Secondary = 1px hairline outline,
  transparent fill.
- **Nav:** Void background, Chalk wordmark in display type, thin hairline
  bottom border, active link underlined in Signal Green.
- **Section divider:** thin hairline with a centered small mono coordinate
  label (e.g. `§ 02 — PROJECTIONS`), evoking schematic call-outs.

## Motion

Minimal. Numbers count up on load (200–400ms ease-out) where a projection or
score changes. No decorative hover bounce — hovers shift to Signal Green
text/border only.

## Do / Don't

- Do keep 90%+ of every screen achromatic (void/carbon/chalk/fog); let
  Signal Green and Alert Amber do all the talking.
- Do put every computed number in mono type, everything a human wrote in
  the grotesk/body pair.
- Don't use football clip-art, gradients, or stock photography of stadiums
  — the schematic/hairline grid *is* the football motif. The blog post
  `heroImage` field stays in the schema (the n8n pipeline still writes it)
  but is intentionally not rendered until there's a real asset pipeline
  (generated schematic/data-viz art) to fill it with instead.
- Don't mix Signal Green and Alert Amber in the same component decoratively
  — they're semantic (good/bad), not a duotone palette.
