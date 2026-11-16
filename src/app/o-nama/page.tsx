import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { Avatar, TeamCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-calendly";
import { founder, site, team } from "@/content/site";

export const metadata: Metadata = {
  title: "O nama",
  description: `Upoznajte ${site.name} i tim koji stoji iza njega.`,
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader title="O nama" />

      <section className="max-w-3xl space-y-4 text-lg text-foreground/80">
        {site.about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section className="mt-16 grid gap-8 rounded-xl bg-muted p-6 sm:grid-cols-[auto_1fr] sm:p-10">
        <Avatar member={founder} size={160} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Osnivač
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{founder.name}</h2>
          <p className="text-brand">{founder.role}</p>
          <div className="mt-4 space-y-4 text-foreground/80">
            {founder.longBio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {founder.linkedin && (
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-medium text-brand hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>
      </section>

      {team.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Tim</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </section>
      )}

      <CtaSection />
    </Container>
  );
}
