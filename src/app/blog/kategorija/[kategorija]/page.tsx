import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPostsIncludingDrafts, getCategories, getPosts, slugify } from "@/lib/posts";
import { TermPage } from "../../term-page";

export async function generateStaticParams() {
  return getCategories(await getAllPostsIncludingDrafts()).map((c) => ({
    kategorija: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/kategorija/[kategorija]">): Promise<Metadata> {
  const { kategorija } = await params;
  const name = (await getPosts()).find((p) => slugify(p.category) === kategorija)?.category;
  return { title: name ? `${name} — Blog` : "Blog" };
}

export default function Page({ params }: PageProps<"/blog/kategorija/[kategorija]">) {
  return (
    <Suspense>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<"/blog/kategorija/[kategorija]">, "params">) {
  const { kategorija } = await params;
  return <TermPage kind="kategorija" slug={kategorija} />;
}
