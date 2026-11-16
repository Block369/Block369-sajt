import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/components/nav-items";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const { email, phone, linkedin, x, telegram } = site.contact;
  const social = [
    { label: "LinkedIn", href: linkedin },
    { label: "X", href: x },
    { label: "Telegram", href: telegram },
  ].filter((s) => s.href);
  return (
    <footer className="mt-auto border-t border-foreground/10 pb-10 text-sm text-foreground/60">
      <div aria-hidden className="bg-brand-gradient mb-10 h-1 w-full" />
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo className="text-lg" />
          <p className="mt-1">Poslovni konsalting</p>
        </div>
        <nav aria-label="Navigacija u podnožju">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/blog/rss.xml" className="hover:text-foreground">
                RSS
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col gap-1">
          {email && (
            <a href={`mailto:${email}`} className="hover:text-foreground">
              {email}
            </a>
          )}
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-foreground">
              {phone}
            </a>
          )}
          {social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              {s.label}
            </a>
          ))}
        </div>
      </Container>
      <Container className="mt-8">
        <p>
          © <CopyrightYear /> {site.name}. Sva prava zadržana.
        </p>
      </Container>
    </footer>
  );
}
