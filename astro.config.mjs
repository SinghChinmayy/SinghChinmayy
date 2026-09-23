/**
 * Astro Configuration
 * 
 * Main configuration file for the Astro site. Defines build settings, integrations,
 * environment variables schema, image optimization, and markdown processing.
 * 
 * Configuration Sections:
 * - Output mode: Static site generation (SSG)
 * - Integrations: MDX for rich content, Sitemap for SEO
 * - Environment variables: Type-safe schema with defaults
 * - Image optimization: Sharp-based processing with responsive sizes
 * - Markdown: Syntax highlighting with Shiki
 * 
 * Setup:
 * 1. Copy .env.example to .env
 * 2. Set SITE_URL and other environment variables
 * 3. Run `npm run dev` for development or `npm run build` for production
 * 
 * @see https://astro.build/config
 */

import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { remarkAlert } from 'remark-github-blockquote-alert';
import remarkGfm from 'remark-gfm';

import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Load site configuration from local settings instead of .env
 */
const settingsPath = resolve('./src/data/site.json');
const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));
const SITE_URL = settings?.site?.url || 'https://chinmaysingh.me';

/**
 * Astro configuration object
 * 
 * Defines all build-time settings, integrations, and optimizations for the site.
 * 
 * @see https://astro.build/config
 */
export default defineConfig({
  /**
   * Output mode: Static Site Generation with server routes support
   * 
   * In Astro v5+, 'static' mode supports both static generation and
   * server-side rendering for specific routes.
   * Most pages are pre-rendered at build time for optimal performance.
   */
  output: 'static',

  /**
   * Cloudflare adapter
   * 
   * Enables deployment to Cloudflare Pages with support for server-side
   * rendering where needed.
   */
  adapter: cloudflare(),

  /**
   * Redirects
   * 
   * Forward legacy and shorthand URLs to their canonical routes
   */
  redirects: {
    '/rss': '/rss.xml',
    '/writing': '/blogs',
  },

  /**
   * Astro integrations
   * 
   * - MDX: Enables MDX support for rich content authoring with JSX components
   * - Sitemap: Automatically generates sitemap.xml for search engines
   */
  integrations: [
    mdx(),
    sitemap(),
  ],

  /**
   * Site URL
   * 
   * Base URL for the site, loaded from SITE_URL environment variable.
   * Required for:
   * - Sitemap generation
   * - Canonical URLs
   * - Open Graph tags
   * - RSS feeds
   * 
   * Set SITE_URL in your .env file (e.g., https://example.com)
   */
  site: SITE_URL || 'https://example.com',

  /**
   * Environment variables schema (Astro v5+)
   * 
   * Defines type-safe environment variables with validation and defaults.
   * All variables are client-side accessible and public.
   * 
   * Categories:
   * - Build-time: SITE_URL
   */
  env: {
    schema: {
      // Build-time configuration
      SITE_URL: envField.string({ context: 'client', access: 'public', default: SITE_URL }),
    },
  },

  /**
   * Image optimization configuration
   * 
   * Uses Astro's built-in Sharp-based image service for automatic optimization.
   * 
   * Features:
   * - Automatic format conversion (AVIF, WebP, PNG, JPEG)
   * - Responsive image generation with srcset
   * - Build-time optimization for static images
   * - Memory-safe processing with pixel limits
   * 
   * The limitInputPixels setting prevents memory issues when processing
   * very large images (~16K x 16K pixels maximum).
   */
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Limit concurrent image processing to avoid memory issues
        limitInputPixels: 268402689, // ~16K x 16K pixels
      }
    },
    // Remote image patterns (currently empty - add patterns as needed)
    remotePatterns: [],
  },

  /**
   * Markdown configuration
   * 
   * Configures markdown processing and syntax highlighting.
   * 
   * Shiki Configuration:
   * - Theme: GitHub Dark for consistent code highlighting
   * - Wrap: Enables line wrapping for long code lines
   */
  markdown: {
    remarkPlugins: [remarkAlert, remarkGfm],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true
    }
  }
});
