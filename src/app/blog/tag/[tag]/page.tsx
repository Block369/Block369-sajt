import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPostsIncludingDrafts, getPosts, getTags } from "@/lib/posts";
import { TermPage } from "../../term-page";

export async function generateStaticParams() {
  return getTags(await getAllPostsIncludingDrafts()).map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/tag/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const name = getTags(await getPosts()).find((t) => t.slug === tag)?.name;
  return { title: name ? `#${name} — Blog` : "Blog" };
}

export default function Page({ params }: PageProps<"/blog/tag/[tag]">) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<"/blog/tag/[tag]">, "params">) {
  const { tag } = await params;
  return <TermPage kind="tag" slug={tag} />;
}
