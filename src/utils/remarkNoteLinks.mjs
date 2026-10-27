/**
 * Remark plugin: rewrite relative Markdown links between engineering notes.
 *
 * Notes link to each other with relative paths such as
 * `../../practice/sql/001-data-science-skills.md`, so the links work on
 * GitHub. On the website the same files live under /notes, so this rewrites
 * them to site URLs:
 *   notes/<subject>/<topic>.md        -> /notes/<subject>/<topic>
 *   practice/<subject>/<file>.md      -> /notes/practice/<subject>/<file>
 * Only files inside src/content/engineering-notes are touched.
 */

import path from 'node:path';
import { visit } from 'unist-util-visit';

const CONTENT_ROOT = path.join('src', 'content', 'engineering-notes');

export function noteUrl(relativePath) {
  const withoutExt = relativePath.replace(/\.md$/, '').split(path.sep).join('/');
  if (withoutExt.startsWith('notes/')) return `/notes/${withoutExt.slice('notes/'.length)}`;
  if (withoutExt.startsWith('practice/')) return `/notes/${withoutExt}`;
  return null;
}

export default function remarkNoteLinks() {
  return (tree, file) => {
    const filePath = file.path || file.history?.[0];
    if (!filePath) return;
    const rootIndex = filePath.indexOf(CONTENT_ROOT);
    if (rootIndex === -1) return;
    const contentRoot = filePath.slice(0, rootIndex + CONTENT_ROOT.length);

    visit(tree, 'link', (node) => {
      const [target, hash] = node.url.split('#');
      if (!target || /^[a-z]+:/i.test(target) || !target.endsWith('.md')) return;
      const absolute = path.resolve(path.dirname(filePath), target);
      const url = noteUrl(path.relative(contentRoot, absolute));
      if (url) node.url = hash ? `${url}#${hash}` : url;
    });
  };
}
