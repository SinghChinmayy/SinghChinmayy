import type { APIRoute } from "astro";
import { siteConfig } from "../../data/index";

export const prerender = false;

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug ?? "";
  return Response.redirect(new URL(`/blogs/${slug}`, siteConfig.url), 301);
};
