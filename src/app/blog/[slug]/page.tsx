import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-calendly";
import { formatDate, getAllPostsIncludingDrafts, getPost, slugify } from "@/lib/posts";

export async function generateStaticParams() {
  return (await getAllPostsIncludingDrafts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function Page({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${post.slug}.mdx`);

  return (
    <Container className="max-w-3xl">
      <article className="py-12 sm:py-16">
        <header>
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-foreground/60">
            <Link href="/blog" className="hover:text-foreground">
              ← Blog
            </Link>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <Link
              href={`/blog/kategorija/${slugify(post.category)}`}
              className="font-medium text-brand hover:underline"
            >
              {post.category}
            </Link>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/70">{post.description}</p>
        </header>

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-a:text-brand prose-headings:tracking-tight">
          <Content />
        </div>

        {post.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2 border-t border-foreground/10 pt-6">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tag/${slugify(tag)}`}
                  className="rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/70 hover:border-brand hover:text-brand"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </article>
      <CtaSection />
    </Container>
  );
}
