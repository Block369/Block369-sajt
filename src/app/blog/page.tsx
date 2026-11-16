import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { PostList, TermLinks } from "@/components/post-list";
import { getCategories, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tekstovi o poslovanju, strategiji i rastu.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <Container className="pb-16">
      <PageHeader title="Blog" intro="Tekstovi o poslovanju, strategiji i rastu." />
      <TermLinks terms={getCategories(posts)} base="kategorija" />
      <div className="mt-6">
        <PostList posts={posts} />
      </div>
    </Container>
  );
}
