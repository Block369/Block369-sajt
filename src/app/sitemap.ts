import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getCategories, getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const pages = ["", "/usluge", "/o-nama", "/blog", "/kontakt"].map((path) => ({
    url: `${site.url}${path}`,
  }));
  return [
    ...pages,
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
    ...getCategories(posts).map((c) => ({ url: `${site.url}/blog/kategorija/${c.slug}` })),
  ];
}
