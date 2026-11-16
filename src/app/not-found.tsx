import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Stranica nije pronađena</h1>
      <p className="mt-4 text-foreground/70">
        Stranica koju tražite ne postoji ili je premeštena.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-brand-gradient px-5 py-3 text-sm font-semibold text-white"
      >
        Nazad na početnu
      </Link>
    </Container>
  );
}
