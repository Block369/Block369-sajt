import Link from "next/link";
import { formatDate, slugify, type Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-foreground/60">Uskoro prvi tekstovi.</p>;
  }
  return (
    <ul className="divide-y divide-foreground/10">
      {posts.map((post) => (
        <li key={post.slug} className="py-6">
          <article>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/60">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <Link
                href={`/blog/kategorija/${slugify(post.category)}`}
                className="font-medium text-brand hover:underline"
              >
                {post.category}
              </Link>
              {post.draft && (
                <span className="rounded bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                  Nacrt
                </span>
              )}
            </div>
            <h2 className="mt-2 text-xl tracking-tight">
              <Link href={`/blog/${post.slug}`} className="hover:text-brand">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-foreground/70">{post.description}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function TermLinks({
  terms,
  base,
  activeSlug,
}: {
  terms: { name: string; slug: string; count: number }[];
  base: "kategorija" | "tag";
  activeSlug?: string;
}) {
  if (terms.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {terms.map((t) => {
        const active = t.slug === activeSlug;
        return (
          <li key={t.slug}>
            <Link
              href={`/blog/${base}/${t.slug}`}
              aria-current={active ? "page" : undefined}
              className={`inline-block rounded-full border px-3 py-1 text-sm transition-colors ${
                active
                  ? "border-transparent bg-brand-gradient text-white"
                  : "border-foreground/15 text-foreground/70 hover:border-brand hover:text-brand"
              }`}
            >
              {base === "tag" ? "#" : ""}
              {t.name}
              <span className="ml-1 opacity-60">{t.count}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
