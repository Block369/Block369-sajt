"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/components/nav-items";

const baseClass =
  "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Links({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string | null;
  onNavigate?: () => void;
  className: string;
}) {
  return (
    <ul className={className}>
      {navItems.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`${baseClass} ${
                active ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Links pathname={pathname} className="hidden items-center gap-1 md:flex" />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Zatvori meni" : "Otvori meni"}
        className="rounded-md p-2 text-foreground/70 hover:text-foreground md:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 border-b border-foreground/10 bg-background px-4 py-3 md:hidden"
        >
          <Links
            pathname={pathname}
            onNavigate={() => setOpen(false)}
            className="flex flex-col"
          />
        </div>
      )}
    </>
  );
}

/** Statička verzija bez aktivnog stanja, dok se pathname ne učita. */
export function NavLinksFallback() {
  return (
    <Links pathname={null} className="hidden items-center gap-1 md:flex" />
  );
}
