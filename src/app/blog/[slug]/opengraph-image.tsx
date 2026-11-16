import { getAllPostsIncludingDrafts } from "@/lib/posts";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getAllPostsIncludingDrafts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getAllPostsIncludingDrafts()).find((p) => p.slug === slug);
  return renderOg(post?.title ?? "Blog", post?.category ?? "Blog");
}
