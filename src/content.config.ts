/**
 * Content Collections Configuration
 * 
 * Defines all content collections for the site with their schemas and validation rules.
 * Uses Astro's Content Collections API with Zod for type-safe content management.
 * 
 * Collections:
 * - projects: Case studies with structured narrative format
 * All collections use the glob loader to read MDX files from their respective directories.
 * Schemas enforce data structure and provide TypeScript types throughout the application.
 * 
 * @module content.config
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects (Case Studies) Collection
 * 
 * Structured case studies following a narrative format: Overview → Problem → 
 * Constraints → Approach → Key Decisions → Tech Stack → Impact → Learnings.
 * 
 * Features:
 * - Required narrative sections for consistent storytelling
 * - Key decisions with reasoning and alternatives
 * - Impact metrics (quantitative and qualitative)
 * - Featured flag for homepage showcase
 * - Optional custom order for manual curation
 * - Related project and decision slugs for cross-referencing
 */
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    /** Project title */
    title: z.string(),

    /** Your role in the project */
    role: z.string(),

    /** Year the project was completed */
    year: z.number(),

    /** Project duration (e.g., "3 months", "1.5 years") */
    duration: z.string().optional(),

    /** Team size for scope context */
    teamSize: z.number().optional(),

    /** Brief summary of outcomes and impact */
    outcomeSummary: z.string(),

    /** High-level project overview */
    overview: z.string(),

    /** Problem being addressed */
    problem: z.string(),

    /** Project constraints and limitations */
    constraints: z.array(z.string()),

    /** Solution approach and strategy */
    approach: z.string(),

    /** Key technical decisions with reasoning */
    keyDecisions: z.array(z.object({
      decision: z.string(),
      reasoning: z.string(),
      alternatives: z.array(z.string()).optional(),
    })),

    /** Technologies and frameworks used */
    techStack: z.array(z.string()),

    /** Project impact and results */
    impact: z.object({
      /** Quantitative metrics (optional) */
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      /** Qualitative impact description */
      qualitative: z.string(),
    }),

    /** Key learnings and takeaways */
    learnings: z.array(z.string()),

    /** Whether to feature on homepage */
    featured: z.boolean().default(false),

    /** Project status */
    status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),

    /** Custom sort order (lower numbers first) */
    order: z.number().optional(),

    /** Related project slugs for cross-referencing */
    relatedProjects: z.array(z.string()).optional(),

  }),
});

/**
 * Blog Collection
 * 
 * Blog posts and technical articles with MDX support.
 * 
 * Features:
 * - Draft mode for unpublished content
 * - Publish and update dates
 * - Optional tags for categorization
 */
const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    /** Article title */
    title: z.string(),

    /** Article description for SEO and previews */
    description: z.string(),

    /** Original publication date */
    publishDate: z.coerce.date(),

    /** Last updated date (optional) */
    updatedDate: z.coerce.date().optional(),

    /** Tags for categorization */
    tags: z.array(z.string()).optional(),

    /** Whether the article is a draft (hidden from production) */
    draft: z.boolean().default(false),
  }),
});
/**
 * Export all collections
 * 
 * This object is used by Astro to register all content collections
 * and generate TypeScript types for type-safe content queries.
 */
export const collections = {
  projects: projectsCollection,
  writing: writingCollection,
};
