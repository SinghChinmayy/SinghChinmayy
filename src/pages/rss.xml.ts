import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/index';

export async function GET(context: any) {
  const posts = await getCollection('writing', ({ data }) => {
    return data.draft !== true;
  });

  // Sort by date desc
  posts.sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());

  return rss({
    title: `${siteConfig.author.name} - Blogs`,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blogs/${post.id}/`,
    })),
    customData: `<language>${siteConfig.language}</language>`,
  });
}
