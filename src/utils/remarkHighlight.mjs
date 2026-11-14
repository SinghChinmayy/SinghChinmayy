/**
 * Remark plugin: `==highlighted text==` -> <mark>highlighted text</mark>.
 *
 * Works on prose only. Code (inline and fenced) is a different node type, so
 * `a == b` inside backticks is never touched. A highlight may span formatting,
 * e.g. `==the **key** idea==`, as long as both markers sit in the same
 * paragraph (or heading, list item text, table cell, ...).
 *
 * Markers must hug the text: `==word==` highlights, `a == b` does not.
 */

// Opening `==`: not after a word char or `=`, followed by a non-space, non-`=`
// char (or right before a formatted node such as **bold**).
const OPEN = /(?<![\w=])==/g;
// Closing `==`: after a non-space, non-`=` char (or right after a formatted
// node such as **bold**), not followed by a word char or `=`.
const CLOSE = /==(?![\w=])/g;

function findOpen(text, beforeNode = false) {
  OPEN.lastIndex = 0;
  let m;
  while ((m = OPEN.exec(text))) {
    const next = text[m.index + 2];
    if (next === undefined ? beforeNode : !/[\s=]/.test(next)) return m.index;
  }
  return -1;
}

function findClose(text, afterNode = false) {
  CLOSE.lastIndex = 0;
  let m;
  while ((m = CLOSE.exec(text))) {
    const prev = text[m.index - 1];
    if (prev === undefined ? afterNode : !/[\s=]/.test(prev)) return m.index;
  }
  return -1;
}

function markNode(children) {
  return { type: 'highlight', data: { hName: 'mark' }, children };
}

function textNode(value) {
  return { type: 'text', value };
}

/** Rewrite one parent's children; returns a new array. */
function transformChildren(input) {
  const queue = [...input];
  const out = [];
  while (queue.length) {
    const node = queue.shift();
    const open =
      node.type === 'text' ? findOpen(node.value, queue.length > 0 && queue[0].type !== 'text') : -1;
    if (open === -1) {
      out.push(node);
      continue;
    }

    const before = node.value.slice(0, open);
    const after = node.value.slice(open + 2);

    // Case 1: closing marker in the same text node.
    const sameClose = findClose(after);
    if (sameClose !== -1) {
      if (before) out.push(textNode(before));
      out.push(markNode([textNode(after.slice(0, sameClose))]));
      const rest = after.slice(sameClose + 2);
      if (rest) queue.unshift(textNode(rest)); // may hold more highlights
      continue;
    }

    // Case 2: closing marker in a later text sibling (highlight spans formatting).
    const j = queue.findIndex((n, k) => k > 0 && n.type === 'text' && findClose(n.value, true) !== -1);
    if (j === -1) {
      out.push(node);
      continue;
    }
    const closer = queue[j];
    const close = findClose(closer.value, true);
    const inner = [];
    if (after) inner.push(textNode(after));
    inner.push(...queue.slice(0, j));
    const tail = closer.value.slice(0, close);
    if (tail) inner.push(textNode(tail));

    if (before) out.push(textNode(before));
    out.push(markNode(inner));
    const rest = closer.value.slice(close + 2);
    queue.splice(0, j + 1, ...(rest ? [textNode(rest)] : []));
  }
  return out;
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  // Never look inside code or raw HTML/JSX containers.
  if (node.type === 'code' || node.type === 'inlineCode' || node.type === 'html') return;
  node.children = transformChildren(node.children);
  for (const child of node.children) walk(child);
}

export default function remarkHighlight() {
  return (tree) => walk(tree);
}
