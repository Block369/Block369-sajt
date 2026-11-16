/**
 * Sav sadržaj firme na jednom mestu.
 * Sve što je u [uglastim zagradama] ili označeno sa TODO treba zameniti pravim podacima.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Putanja do slike u /public, npr. "/tim/ime-prezime.jpg" */
  photo?: string;
  linkedin?: string;
};

export type Service = {
  title: string;
  description: string;
  /** Kratke stavke: šta usluga obuhvata */
  points?: string[];
  /** Prikaži na Početnoj */
  featured?: boolean;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  calendlyUrl: string;
  contact: { email: string; phone: string; linkedin: string; location: string };
  about: string[];
};

export const site: SiteConfig = {
  name: "Block369",
  // TODO: slogan firme
  tagline: "[Slogan firme Block369]",
  // TODO: kratak opis firme (1–2 rečenice). Koristi se i za Google i za deljenje linkova.
  description: "Block369 — poslovni konsalting.",
  // TODO: pravi domen kada bude poznat
  url: "https://block369.com",
  // TODO: Calendly link, npr. "https://calendly.com/block369/konsultacije"
  calendlyUrl: "",
  contact: {
    email: "", // TODO
    phone: "", // TODO
    linkedin: "", // TODO
    location: "", // TODO, npr. "Beograd, Srbija"
  },
  // TODO: priča o firmi (svaki string je jedan pasus)
  about: ["[Priča o firmi Block369: kako je nastala, misija i vrednosti.]"],
};

export const founder: TeamMember & { longBio: string[] } = {
  name: "Zlatan Osmanagić",
  role: "Osnivač i glavni konsultant",
  bio: "[Kratak bio u jednoj ili dve rečenice.]",
  // TODO: duži bio (svaki string je jedan pasus)
  longBio: ["[Duži bio: iskustvo, oblasti ekspertize, pristup radu sa klijentima.]"],
  photo: undefined, // TODO: npr. "/tim/zlatan.jpg"
  linkedin: undefined,
};

// TODO: članovi tima
export const team: TeamMember[] = [
  { name: "[Ime i prezime]", role: "[Uloga]", bio: "[Kratak bio]" },
];

// TODO: prave usluge
export const services: Service[] = [
  {
    title: "[Usluga 1]",
    description: "[Opis usluge]",
    points: ["[Stavka]", "[Stavka]"],
    featured: true,
  },
  { title: "[Usluga 2]", description: "[Opis usluge]", featured: true },
  { title: "[Usluga 3]", description: "[Opis usluge]", featured: true },
];
