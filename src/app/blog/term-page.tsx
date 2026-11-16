import { Container, PageHeader } from "@/components/container";
import { PostList, TermLinks } from "@/components/post-list";
import { getCategories, getPosts, getTags, slugify } from "@/lib/posts";
import { notFound } from "next/navigation";

/** Zajednička lista za /blog/kategorija/[x] i /blog/tag/[x]. */
export async function TermPage({
  kind,
  slug,
}: {
  kind: "kategorija" | "tag";
  slug: string;
}) {
  const all = await getPosts();
  const terms = kind === "kategorija" ? getCategories(all) : getTags(all);
  const term = terms.find((t) => t.slug === slug);
  if (!term) notFound();

  const posts = all.filter((p) =>
    kind === "kategorija"
      ? slugify(p.category) === slug
      : p.tags.some((t) => slugify(t) === slug),
  );

  return (
    <Container className="pb-16">
      <PageHeader
        title={kind === "tag" ? `#${term.name}` : term.name}
        intro={kind === "kategorija" ? "Kategorija" : "Tekstovi sa ovim tagom"}
      />
      {kind === "kategorija" && (
        <TermLinks terms={terms} base="kategorija" activeSlug={slug} />
      )}
      <div className="mt-6">
        <PostList posts={posts} />
      </div>
    </Container>
  );
}
