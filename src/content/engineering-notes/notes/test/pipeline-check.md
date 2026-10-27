---
title: Pipeline check (test note, safe to delete)
subject: test
summary: A throwaway note that proves notes pull requests are validated, auto-merged and published.
tags: [test]
status: learning
created: 2026-10-27
updated: 2026-10-27
---

**In one line:** If you can read this on the website, the notes pipeline works end to end.

## What this proves

1. A pull request with only notes content was validated by `scripts/check_notes.py`.
2. CI merged it automatically.
3. The same run copied it into the website, built the site, and pushed it.
4. Cloudflare Pages deployed it to `/notes`.

## Revision

### Check yourself

<details>
<summary>What should happen to this note now?</summary>

Delete it: remove `notes/test/` in Engineering-Notes, and the next publish removes it from the website too.

</details>

## History

- 2026-10-27: Created to test auto-merge and publishing.
