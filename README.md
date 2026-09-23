# Chinmay Singh — Portfolio

A personal portfolio for Chinmay Singh, an early-career software engineer focused on backend development, infrastructure, and systems engineering. It is built with [Astro](https://astro.build), TypeScript, MDX, and native CSS, and deployed to [Cloudflare Pages](https://pages.cloudflare.com).

The site is intentionally engineering-focused. Its project case studies link to public repositories and describe current scope and limitations honestly, including the ongoing Kidney Care engineering prototype.

## Prerequisites

- [Node.js](https://nodejs.org) v18+
- npm (comes with Node.js)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

> **Why?** `npm run dev` runs `astro dev`, which requires the `astro` binary from `node_modules`. If you see `astro: command not found`, this step was missed.

### 2. Start the dev server

```bash
npm run dev
```

The site will be available at **http://localhost:4321**.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
/
├── public/          # Static assets (favicon, fonts, images)
├── src/
│   ├── data/        # Site config (site.json loaded by astro.config.mjs)
│   ├── content/     # MDX content (case studies, blogs, etc.)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Astro pages & routes
│   └── components/  # Reusable Astro components
└── astro.config.mjs # Astro configuration
```

## Content Management

Site content lives in `src/content` as MDX and site configuration lives in `src/data/site.json`.

Generated routes include `/`, `/projects`, `/projects/[slug]`, `/blogs`, `/blogs/[slug]`, `/contact`, `/404`, `/robots.txt`, and `/rss.xml`. The legacy `/rss` and `/writing` paths redirect to their canonical routes.

## Deployment

This site targets **Cloudflare Pages** via the `@astrojs/cloudflare` adapter. Push to your connected branch to trigger a production build.
