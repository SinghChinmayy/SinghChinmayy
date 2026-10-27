/**
 * Helpers for the Engineering Notes section.
 *
 * Entry ids come from the glob loader: "notes/<subject>/<topic>" for topic
 * notes and "practice/<subject>/<NNN-slug>" for practice problems.
 */

import type { CollectionEntry } from 'astro:content';

const ACRONYMS = new Set(['sql', 'os', 'dns', 'http', 'tcp', 'udp', 'api', 'aws', 'ci', 'cd', 'dsa', 'ml', 'ai', 'llm']);

/** "sql" -> "SQL", "system-design" -> "System Design", "operating-systems" -> "Operating Systems" */
export function subjectLabel(subject: string): string {
  return subject
    .split('-')
    .map((word) => (ACRONYMS.has(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

/** Route under /notes: topic notes drop the "notes/" prefix, practice keeps "practice/". */
export function noteSlug(entry: CollectionEntry<'notes'>): string {
  return entry.id.startsWith('notes/') ? entry.id.slice('notes/'.length) : entry.id;
}

export function noteHref(entry: CollectionEntry<'notes'>): string {
  return `/notes/${noteSlug(entry)}`;
}

/** Link to the source file in the Engineering-Notes repository. */
export function sourceHref(entry: CollectionEntry<'notes'>): string {
  return `https://github.com/SinghChinmayy/Engineering-Notes/blob/main/${entry.id}.md`;
}

export function formatNoteDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}
