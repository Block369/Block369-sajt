import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import "./globals.css";

// Brandbook: naslovi Poppins (700/600), tekst DM Sans 400. 300 je za privremeni logo.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — poslovni konsalting`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: "sr_RS",
    type: "website",
  },
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${poppins.variable} ${dmSans.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: ekstenzije (npr. Grammarly) dodaju atribute na body */}
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
