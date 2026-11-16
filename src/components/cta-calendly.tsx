import Link from "next/link";
import { site } from "@/content/site";

const buttonClass =
  "inline-flex items-center justify-center rounded-md bg-brand-gradient px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90";

/** Dugme "Zakaži konsultacije". Bez Calendly linka vodi na /kontakt. */
export function CalendlyButton({ label = "Zakaži konsultacije" }: { label?: string }) {
  if (!site.calendlyUrl) {
    return (
      <Link href="/kontakt" className={buttonClass}>
        {label}
      </Link>
    );
  }
  return (
    <a
      href={site.calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass}
    >
      {label}
    </a>
  );
}

export function CtaSection() {
  return (
    <section className="my-16 rounded-xl bg-muted px-6 py-10 text-center sm:px-10">
      <h2 className="text-2xl tracking-tight">
        Razgovarajmo o vašem poslu
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-foreground/70">
        Zakažite besplatne uvodne konsultacije i zajedno ćemo videti gde možemo
        da pomognemo.
      </p>
      <div className="mt-6">
        <CalendlyButton />
      </div>
    </section>
  );
}
