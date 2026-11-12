# Content guide

How content and site data work in this repo.

## Where things live

- `src/data/site.json`: site URL, author, social links, nav. Read through `src/data/index.ts`.
- `src/pages.config.ts`: titles, descriptions and intros for listing pages.
- `src/content/projects/*.mdx`: case studies. Schema in `src/content.config.ts`.
- `src/content/writing/*.mdx`: articles, served at `/blogs`.
- `src/content/engineering-notes/`: synced by CI from the Engineering-Notes repo. Do not edit by hand.
- `src/assets/`: images processed by `astro:assets`. `public/`: files that need a fixed URL (favicons, `og-image.png`).

## Case study front matter

Required: `title`, `role`, `year`, `outcomeSummary`, `overview`, `problem`, `constraints`, `approach`, `keyDecisions`, `techStack`, `impact`, `learnings`.

Optional:

- `featured` / `order`: homepage selection. Lower `order` first; `0` is valid.
- `nowBuilding`: homepage "Now building" text for the first featured project. Falls back to `outcomeSummary`.
- `repo`, `demo`: URLs shown in the link row under the title.
- `links`: extra `{ label, url }` entries in the same row (site-relative URLs allowed).
- `status`, `duration`, `teamSize`, `relatedProjects`.

The MDX body renders after the structured sections. Put narrative there, not top-level links.

## Images

Put images in `src/assets/` and render them with `<Picture>` or `<Image>` from `astro:assets` (AVIF/WebP, explicit width and height). Use `public/` only when an absolute, stable URL is required.

## Checks

`npm run build` runs `astro check` then `astro build`. Follow `agents.md` for responsive checks and `design.md` for the visual system.
