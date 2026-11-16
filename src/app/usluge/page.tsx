import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/container";
import { ServiceCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-calendly";
import { services, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Usluge",
  description: `Usluge poslovnog konsaltinga koje ${site.name} nudi.`,
};

export default function ServicesPage() {
  return (
    <Container>
      <PageHeader
        title="Usluge"
        intro="Kako možemo da pomognemo vašem poslovanju."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <ServiceCard key={s.title} service={s} />
        ))}
      </div>
      <CtaSection />
    </Container>
  );
}
