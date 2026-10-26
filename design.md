# Visual system

This portfolio uses a clean, professional editorial direction: white paper, near-black ink, serif headlines, a clean sans-serif for interface text, and light rules instead of boxes and shadows. It borrows the typography of long-form journalism, not its costume: no mastheads, datelines or heavy black rules. Personality comes from the writing and the real photo; hand-drawn sketches belong in articles and skill guides, not on the homepage.

## Tokens (src/styles/global.css)

- Paper: `--color-bg` `#FFFFFF` in light mode. Cards sit on the same paper; separate them with rules, not fills.
- Dark mode is deliberately soft, not inverted newsprint: charcoal paper `#1B1C1E`, warm off-white ink `#E4E2DD`, muted grey rules (`--color-rule` `#45474B`), and images dimmed slightly so the cream sketches don't glare.
- Ink: `--color-text` `#121212`; `--color-text-secondary` `#363636` for body copy; `--color-text-muted` `#727272` for metadata and captions.
- Rules: `--color-border` `#DFDFDF` for hairlines between items; `--color-rule` `#CFCFCF` (a slightly stronger grey) for section rules under section labels and above the footer.
- Accent: `--color-accent` `#326891`, used sparingly for links and focus rings. No accent-coloured buttons or backgrounds; primary buttons are ink (`--color-text` background, `--color-bg` text).
- Radius: `--border-radius-sm` 2px and `--border-radius-md` 3px. Nothing is pill-shaped except the theme toggle. No shadows, gradients or glows.

## Type

- `--font-serif` (Source Serif 4): headlines, card titles, article body, decks (summaries under headlines), pull quotes. Headlines are 700 weight with tight leading (1.1–1.2) and slight negative tracking.
- `--font-sans` (Libre Franklin): navigation, buttons, kickers, bylines, dates, tags, captions, table text, form labels.
- `--font-mono`: code only.
- Kicker / section label: sans, 700, 0.75rem, uppercase, letter-spacing 0.08em, ink colour, usually sitting above a light section rule.
- Byline: sans 0.875rem; author name 700 ink; date and reading time muted.
- Deck: serif 1.25rem (1.125rem on phones), `--color-text-secondary`, line-height 1.45.

## Layout

- One content width (`--max-width-content`) for index pages; articles use a narrow reading column (`--max-width-article`, 620px) with figures allowed to break out to about 760px.
- Index pages: a section label over a light rule, then items separated by hairline rules. Each item: kicker, serif headline, short deck, sans metadata. Avoid bordered cards with backgrounds.
- Centered headers on article and project detail pages; left-aligned lists elsewhere.

## Interaction

- Links in body copy: ink or accent colour with an underline offset of 3px; headlines underline on hover only.
- Visible 2px focus rings in the accent colour, touch targets at least 44px tall, keyboard-operable mobile menu, reduced-motion support.

## Content

Projects are presented as truthful case studies with constraints, decisions, current state, and lessons. No production claims are implied by prototypes.
