o projektu

ovo je fajl o projektu gde cemo kreirati sajt sa blogom

@AGENTS.md

## Project

Block369 website with a blog, built on Next.js 16 (App Router), React 19, TypeScript (strict), and Tailwind CSS 4. Company site for Block369 (business consulting; founder Zlatan Osmanagić). Serbian-only (Latin script). The user communicates in Serbian. No database or CMS: all content lives in the repo and is edited with Claude.

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build (also runs the TypeScript check)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)

No test framework is set up.

## Architecture notes

- Next.js docs matching the installed version live in `node_modules/next/dist/docs/` (`01-app/` is the relevant part). Consult them before writing Next.js code, since APIs differ from older versions.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. With Cache Components, data fetching/caching follows the `'use cache'` model rather than the older implicit fetch caching — see `01-app/01-getting-started/08-caching.md`.
- Tailwind 4 is CSS-first: there is no `tailwind.config.*`. Theme tokens are defined in `src/app/globals.css` via `@theme inline`, and CSS goes through the `@tailwindcss/turbopack` loader configured in `next.config.ts`.
- Source lives under `src/`; the `@/*` import alias maps to `./src/*`.
- Route props use the generated global types (e.g. `LayoutProps<"/">`, `PageProps<...>`), produced by `next dev`/`next build` into `.next/types`.
- The npm package name is `block369-sajt` (lowercase) while the folder is `Block369-sajt`; npm rejects capital letters, so scaffolding tools that read the folder name will fail here.

## Content (where to edit what)

- `src/content/site.ts` — company data: tagline, description, domain (`url`), Calendly link, contact, about text, founder, team, services. Placeholders are in `[brackets]` / marked `TODO`.
- `src/content/blog/<slug>.mdx` — blog posts. Each exports `metadata` (`title`, `description`, `date` "YYYY-MM-DD", `category`, `tags`, optional `draft`). Drafts show only in `next dev`. See `src/content/blog/README.md`.
- `src/lib/posts.ts` — reads posts (sync `readdirSync` + dynamic `import()` inside `'use cache'`), validates metadata, `slugify` handles Serbian letters.
- Brand colors are CSS tokens in `src/app/globals.css` (`--brand`, `--brand-foreground`); OG image color is in `src/lib/og.tsx`.

## Cache Components gotchas (already hit here)

- `dynamicParams` is not allowed; unknown slugs call `notFound()` instead.
- `generateStaticParams` must return ≥1 param, so params include drafts (`getAllPostsIncludingDrafts`) while pages use `getPosts()`.
- With Partial Prefetching, `await params` happens inside `<Suspense>`; an unknown slug therefore returns a soft 404 (HTTP 200 + noindex).
- `new Date()` during render must be inside `'use cache'` (see `CopyrightYear` in the footer).
- Don't import plain values from a `"use client"` module into server components; shared data like nav items lives in `src/components/nav-items.ts`.
