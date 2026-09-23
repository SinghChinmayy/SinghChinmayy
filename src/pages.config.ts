/**
 * Page Metadata Configuration
 * 
 * Centralized SEO metadata for all static pages. Single source of truth
 * for titles and descriptions to ensure consistency across the site.
 * 
 * Usage:
 * ```astro
 * ---
 * import BaseLayout from '../layouts/BaseLayout.astro';
 * import SEO from '../components/SEO.astro';
 * import { pagesConfig } from '../pages.config';
 * ---
 * 
 * <BaseLayout>
 *   <SEO 
 *     slot="head"
 *     title={pagesConfig.projects.title}
 *     description={pagesConfig.projects.description}
 *   />
 *   <!-- Page content -->
 * </BaseLayout>
 * ```
 * 
 * @module pages.config
 */



/**
 * Pages configuration object
 * 
 * Contains metadata for all static pages. Dynamic pages (like individual
 * project or article pages) generate their own metadata from content.
 */
export const pagesConfig = {
  /**
   * Home page (/)
   * Note: Home page uses siteConfig for title/description as it represents the site itself
   */
  home: {
    title: 'Home',
    description: 'Early-career software engineer building backend systems, infrastructure, and developer tools while learning in public.',
  },

  /**
   * Projects listing page (/projects)
   */
  projects: {
    title: 'Projects',
    description: 'Projects and case studies showing how I approach problems, make technical decisions, and build working systems.',
    heading: 'Projects',
    intro: 'A selection of public projects covering backend systems, infrastructure, search, and offline-first application design. Each case study explains the scope, decisions, and current limits.',
  },

  /**
   * Blog listing page (/blogs)
   */
  writing: {
    title: 'Blogs',
    description: 'Technical articles, notes, and things I\'ve learned from building software and studying computer science.',
    heading: 'Blogs',
    intro: 'Notes from building software and studying computer science: architecture trade-offs, infrastructure, search, and the lessons behind unfinished systems.',
  },

  /**
   * Uses/tools page (/uses)
   */
  uses: {
    title: 'Uses - Tools, Stack & Environment',
    description: 'A comprehensive list of the tools, technologies, and environment I use for development work.',
    heading: 'Uses',
    intro: 'A transparent look at the tools, technologies, and environment that power my development workflow. This page documents what I use and why, helping other engineers discover useful tools and understand my technical context.',
  },

  /**
   * Contact page (/contact)
   */
  contact: {
    title: 'Contact',
    description: 'Get in touch — happy to chat about projects, opportunities, or anything engineering.',
    heading: 'Say Hello',
  },
} as const;
