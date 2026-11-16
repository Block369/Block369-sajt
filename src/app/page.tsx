import Link from "next/link";
import { Container } from "@/components/container";
import { CalendlyButton, CtaSection } from "@/components/cta-calendly";
import { Avatar, ServiceCard } from "@/components/cards";
import { PostList } from "@/components/post-list";
import { SquareFrames } from "@/components/logo";
import { founder, services, site } from "@/content/site";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  const featured = services.filter((s) => s.featured).slice(0, 3);

  return (
    <Container>
      <section className="relative py-20 sm:py-28">
        <SquareFrames className="absolute inset-y-16 right-0 hidden w-80 lg:block" />
        <p className="text-brand-gradient inline-block text-sm font-semibold uppercase tracking-widest">
          Poslovni konsalting
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-balance break-words sm:text-6xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/70">
          {site.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CalendlyButton />
          <Link
            href="/usluge"
            className="inline-flex items-center rounded-md border border-foreground/15 px-5 py-3 text-sm font-semibold hover:border-brand hover:text-brand"
          >
            Pogledajte usluge
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl tracking-tight">Usluge</h2>
            <Link href="/usluge" className="text-sm font-medium text-brand hover:underline">
              Sve usluge →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="flex flex-col gap-6 rounded-xl border border-foreground/10 p-6 sm:flex-row sm:items-center sm:p-8">
          <Avatar member={founder} size={112} />
          <div>
            <h2 className="text-2xl tracking-tight">{founder.name}</h2>
            <p className="text-brand">{founder.role}</p>
            <p className="mt-3 text-foreground/70">{founder.bio}</p>
            <Link href="/o-nama" className="mt-3 inline-block text-sm font-medium text-brand hover:underline">
              Više o nama →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl tracking-tight">Sa bloga</h2>
          <Link href="/blog" className="text-sm font-medium text-brand hover:underline">
            Svi tekstovi →
          </Link>
        </div>
        <div className="mt-2">
          <PostList posts={posts} />
        </div>
      </section>

      <CtaSection />
    </Container>
  );
}
