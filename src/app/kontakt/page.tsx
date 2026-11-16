import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { CalendlyButton } from "@/components/cta-calendly";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktirajte ${site.name} ili zakažite konsultacije.`,
};

export default function ContactPage() {
  const { email, phone, linkedin, location } = site.contact;
  const items = [
    email && { label: "Email", value: email, href: `mailto:${email}` },
    phone && { label: "Telefon", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    linkedin && { label: "LinkedIn", value: "Profil na LinkedIn-u", href: linkedin },
    location && { label: "Lokacija", value: location },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <Container>
      <PageHeader
        title="Kontakt"
        intro="Najbrži način je da zakažete kratke uvodne konsultacije. Možete nas kontaktirati i direktno."
      />

      <div className="grid gap-8 pb-16 md:grid-cols-2">
        <section className="rounded-xl bg-muted p-8">
          <h2 className="text-xl font-semibold tracking-tight">Zakažite konsultacije</h2>
          <p className="mt-2 text-foreground/70">
            Izaberite termin koji vam odgovara. Potvrda stiže na email.
          </p>
          <div className="mt-6">
            {site.calendlyUrl ? (
              <CalendlyButton label="Izaberite termin" />
            ) : (
              // TODO: ukloniti kada se doda calendlyUrl u src/content/site.ts
              <p className="text-sm text-foreground/50">[Calendly link uskoro]</p>
            )}
          </div>
        </section>

        <section className="p-2 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight">Direktan kontakt</h2>
          {items.length > 0 ? (
            <dl className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm text-foreground/60">{item.label}</dt>
                  <dd className="font-medium">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-brand"
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            // TODO: popuniti site.contact u src/content/site.ts
            <p className="mt-4 text-sm text-foreground/50">[Kontakt podaci uskoro]</p>
          )}
        </section>
      </div>
    </Container>
  );
}
