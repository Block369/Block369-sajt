import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  title: string;
  description: string;
  /** Format: "GGGG-MM-DD" */
  date: string;
  category: string;
  tags: string[];
  /** Nacrt: vidljiv samo u `npm run dev`, ne ide u produkciju. */
  draft?: boolean;
};

export type Post = PostMeta & { slug: string };

const showDrafts = process.env.NODE_ENV === "development";

/** "Poslovna strategija" -> "poslovna-strategija", sa srpskim slovima. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function validate(slug: string, meta: unknown): PostMeta {
  const m = meta as Partial<PostMeta> | undefined;
  const missing = (["title", "description", "date", "category"] as const).filter(
    (key) => typeof m?.[key] !== "string" || !m[key],
  );
  if (!m || missing.length > 0) {
    throw new Error(
      `Post "${slug}.mdx": nedostaje "export const metadata" polje: ${missing.join(", ")}`,
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(m.date!)) {
    throw new Error(`Post "${slug}.mdx": datum mora biti u formatu GGGG-MM-DD`);
  }
  return {
    title: m.title!,
    description: m.description!,
    date: m.date!,
    category: m.category!,
    tags: Array.isArray(m.tags) ? m.tags : [],
    draft: Boolean(m.draft),
  };
}

/** Svi postovi, uključujući nacrte, najnoviji prvi. */
async function loadPosts(): Promise<Post[]> {
  "use cache";
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod = (await import(`@/content/blog/${slug}.mdx`)) as {
        metadata?: unknown;
      };
      return { slug, ...validate(slug, mod.metadata) };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** Objavljeni postovi (u dev modu i nacrti). */
export async function getPosts(): Promise<Post[]> {
  const posts = await loadPosts();
  return showDrafts ? posts : posts.filter((p) => !p.draft);
}

/** Za generateStaticParams: uvek bar jedan param, i kada postoje samo nacrti. */
export async function getAllPostsIncludingDrafts(): Promise<Post[]> {
  return loadPosts();
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export type Term = { name: string; slug: string; count: number };

function collect(names: string[]): Term[] {
  const map = new Map<string, Term>();
  for (const name of names) {
    const slug = slugify(name);
    const term = map.get(slug) ?? { name, slug, count: 0 };
    term.count++;
    map.set(slug, term);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "sr"));
}

export function getCategories(posts: Post[]): Term[] {
  return collect(posts.map((p) => p.category));
}

export function getTags(posts: Post[]): Term[] {
  return collect(posts.flatMap((p) => p.tags));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("sr-Latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
