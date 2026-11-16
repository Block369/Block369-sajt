import Link from "next/link";
import { Suspense } from "react";
import { NavLinks, NavLinksFallback } from "@/components/nav-links";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* TODO: zameniti tekst logoom kada stigne (public/logo.svg) */}
        <Link href="/" className="text-lg font-bold tracking-tight">
          {site.name}
        </Link>

        <nav aria-label="Glavna navigacija">
          <Suspense fallback={<NavLinksFallback />}>
            <NavLinks />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
