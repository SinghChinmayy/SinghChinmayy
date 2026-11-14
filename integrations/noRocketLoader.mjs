/**
 * Astro integration: keep Cloudflare Rocket Loader away from our scripts.
 *
 * Rocket Loader rewrites every <script type="module"> to a custom type and
 * runs them itself. That breaks View Transitions: when the ClientRouter swaps
 * in the next page, it only runs scripts of type "module" or plain JS, so the
 * rewritten ones never run and widgets such as the table of contents stop
 * working after the first click-through. Rocket Loader skips any script with
 * data-cfasync="false", so after the build this adds it to every <script> in
 * the generated HTML.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  }));
  return files.flat();
}

export default function noRocketLoader() {
  return {
    name: 'no-rocket-loader',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const files = await htmlFiles(fileURLToPath(dir));
        let changed = 0;
        for (const file of files) {
          const html = await readFile(file, 'utf8');
          const next = html.replace(/<script(?![^>]*data-cfasync)(?=[\s>])/g, '<script data-cfasync="false"');
          if (next !== html) {
            await writeFile(file, next);
            changed += 1;
          }
        }
        logger.info(`added data-cfasync="false" to scripts in ${changed} of ${files.length} pages`);
      },
    },
  };
}
