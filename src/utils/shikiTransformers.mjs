/**
 * Shiki transformers for Markdown code blocks.
 *
 * shikiContrast: github-light-default's comment grey (#6e7781) sits just under
 * WCAG AA (4.5:1) on the off-white code background. Swap it for GitHub's newer
 * muted grey (#59636e), which clears AA. Only the light-theme variable changes.
 */

const LIGHT_REPLACEMENTS = {
  '#6e7781': '#59636e',
};

export const shikiContrast = {
  name: 'shiki-contrast',
  span(node) {
    const style = node.properties?.style;
    if (typeof style !== 'string') return;
    node.properties.style = style.replace(/--shiki-light:(#[0-9a-f]{6})/gi, (match, color) => {
      const swap = LIGHT_REPLACEMENTS[color.toLowerCase()];
      return swap ? `--shiki-light:${swap}` : match;
    });
  },
};
