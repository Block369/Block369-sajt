import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/components/nav-items";
import { Container } from "@/components/container";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const { email, phone, linkedin } = site.contact;
  return (
    <footer className="mt-auto border-t border-foreground/10 py-10 text-sm text-foreground/60">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">{site.name}</p>
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
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
          )}
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
