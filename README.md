# Chinmay Singh

Early-career software engineer focused on backend development, infrastructure, and systems engineering.

I’m a B.Tech Computer Science & AI student at Manipal Institute of Technology, learning by building public projects and writing about the decisions, trade-offs, and unfinished parts behind them. I like writing the failing test first, keeping a record of why each decision was made, and leaving systems easier to change than I found them.

[Website](https://chinmaysingh.me) · [Blog](https://chinmaysingh.me/blogs) · [Agent Skills](https://chinmaysingh.me/agent-skills) · [LinkedIn](https://www.linkedin.com/in/singhchinmayy/) · [Email](mailto:dev@chinmaysingh.me)

## What I’m working on

- Backend services with clear APIs, persistence, and operational boundaries
- Infrastructure that is understandable, observable, and safe to change
- Building with AI coding agents without giving up tests, reviews, or a readable history
- Technical writing about architecture, reliability, and lessons from building

## Selected projects

### [Car Dealership Inventory System](https://github.com/SinghChinmayy/Kata-Car-Dealership-Inventory-System) · [live demo](https://car-dealership-inventory-umber.vercel.app)

A full-stack inventory system built test-first with AI coding agents: a FastAPI and PostgreSQL API with atomic purchases (20 concurrent buyers, 5 cars, exactly 5 sales), soft delete, and audited restocks, plus a React SPA. Every merge passes four required CI checks, then CI migrates Neon before deploying to Vercel. A kata with a public demo, not a real dealership’s production system.

`Python` `FastAPI` `PostgreSQL` `React` `TypeScript` `Playwright` `GitHub Actions`

### [ChaosLab](https://github.com/SinghChinmayy/chaoslab-petclinic) · [dependency map](https://singhchinmayy.github.io/chaoslab-petclinic/)

Guarded chaos experiments for the Spring PetClinic microservices: it maps service dependencies, predicts the user impact of a failure, injects one bounded fault, and reverts it automatically. In one recorded run, crashing the Visits service left the gateway returning HTTP 200 with the owner’s visits missing; the watchdog reverted the fault after 9.3 seconds. A local prototype.

`Python` `Spring Boot` `Docker Compose` `Prometheus` `Grafana` `Locust` `Zipkin`

### [Kidney Care](https://github.com/SinghChinmayy/kidney-care-health-tracker)

An offline-first Flutter engineering prototype: every write lands in local SQLite first, then a sync engine reconciles it with Supabase/Postgres using last-write-wins and row-level security. This is a learning project, not a production medical system.

`Flutter` `Dart` `Drift` `SQLite` `Supabase` `PostgreSQL`

### [Nextpage](https://github.com/SinghChinmayy/ai-journal)

A local-first Markdown journal for macOS that keeps every note as a plain `.md` file in a folder you choose, with atomic autosave and conflict detection when files change outside the app. Stage 1 makes no AI or sync requests; both are planned.

`Swift` `macOS` `Markdown`

### [Aegis — Controlled Remediation Platform](https://github.com/SinghChinmayy/Aegis-Observability-Controlled-Remediation-Platform)

A Go platform I’m designing for detecting service failures, proposing safe remediation, requiring human approval, and verifying recovery. It’s at the design stage: the architecture and the first backend slice are planned, and implementation is next.

`Go` `REST` `PostgreSQL` `Prometheus` `OpenTelemetry`

## Open source: agent skills

[agent-skills](https://github.com/SinghChinmayy/agent-skills) holds the reusable instructions I give my coding agents: test-driven red-green-refactor, a one-question-at-a-time design interview, database planning, scoped builds, and terse replies. They work with Claude Code, Codex, Cursor, and other agents that read `SKILL.md` files.

```bash
npx skills add SinghChinmayy/agent-skills --skill tdd-red-green-refactor
```

## Learning in public

- [Engineering-Notes](https://github.com/SinghChinmayy/Engineering-Notes): SQL concept notes and solved interview-style problems, with the reasoning behind each query.
- [homelab](https://github.com/SinghChinmayy/homelab): a Docker Compose media stack managed with Portainer, with optional Tailscale access. Under construction.
- [snippetbox](https://github.com/SinghChinmayy/snippetbox): a small Go web application for practising Go’s HTTP patterns.
- NLP search pipeline: document ingestion, normalisation, tokenisation, and an inverted index in Python. The code is private for now; the [write-up](https://chinmaysingh.me/blogs/search-engine-stage-1) walks through the design.

## Writing

- [Red, Green, Robot: How I Build Software with AI Agents Now](https://chinmaysingh.me/blogs/ai-assisted-tdd-workflow)
- [Building Offline-First Local Persistence in Flutter with Kidney Care](https://chinmaysingh.me/blogs/offline-first-local-persistence-flutter-kidney-care)
- [Building the Core of a Search Engine Step by Step (Stage 1)](https://chinmaysingh.me/blogs/search-engine-stage-1)
- [Monolith or Microservices? Choosing the Right Architecture for Scale](https://chinmaysingh.me/blogs/monolith-or-microservices-choosing-the-right-architecture-for-scale)

## This repository

This repository is the source for my personal portfolio website. It uses Astro, TypeScript, MDX, and native CSS, and is deployed through Cloudflare Pages. The visual system is described in [design.md](design.md).

```bash
npm install
npm run dev
```

The production build runs with:

```bash
npm run build
```

I’m early in my career and still learning. The project pages are deliberately specific about what is implemented, what is planned, and what has not been validated yet.
