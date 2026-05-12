# Bitropix — Full SEO Audit Report

- **Target:** https://www.bitropix.com/
- **Audit date:** 2026-05-11
- **Business type:** Hybrid — Local Service (HQ Noida, IN) + Digital Agency / IT Services
- **Industry:** Agency
- **Pages discovered (sitemap):** 32 (1 home, 9 static, 4 portfolio details, 15 blog posts, 3 careers)
- **Infrastructure:** Next.js 15 (App Router) on Vercel, SSR/SSG (Prerendered)

---

## SEO Health Score: **72 / 100**

| Category                      | Weight   | Score | Weighted |
| ----------------------------- | -------- | ----- | -------- |
| Technical SEO                 | 22%      | 78    | 17.2     |
| Content Quality               | 23%      | 70    | 16.1     |
| On-Page SEO                   | 20%      | 58    | 11.6     |
| Schema / Structured Data      | 10%      | 72    | 7.2      |
| Performance (CWV — estimated) | 10%      | 75    | 7.5      |
| AI Search Readiness           | 10%      | 88    | 8.8      |
| Images                        | 5%       | 70    | 3.5      |
| **TOTAL**                     | **100%** |       | **~72**  |

> The site has strong AI/GEO foundations (llms.txt, llms-full.txt, generous AI crawler allowlist, comprehensive structured data), strong security headers, and clean SSR. The score is dragged down by widespread on-page errors that are individually small but appear on most pages: a duplicated brand suffix in titles, a 404'd OG image, non-ISO blog dates, and a misconfigured JobPosting schema. None of these block indexing — they all leak ranking and CTR.

---

## Executive Summary

### Top 5 Critical Issues

1. **Double "| Bitropix" suffix on every non-home page title.** Layout title template `'%s | Bitropix'` is applied on top of route titles that already end in "| Bitropix". Confirmed on /about, /services, /portfolio, /portfolio/[slug], /careers/[role]. Causes brand dilution and shortens visible keywords in SERPs.
2. **`/images/og-image.jpg` returns 404.** Both `app/layout.tsx` and `app/page.tsx` reference this URL for OpenGraph and Twitter cards. The file does not exist — every social/AI preview is broken.
3. **Home page openGraph overrides the layout's openGraph entirely**, removing the `images` declaration. Next.js replaces (not merges) nested metadata objects. So even if og-image existed, the homepage would still emit no `og:image`. **Live HTML confirms `og:image` is absent on /**.
4. **Apex → www redirect is 307 (temporary).** SEO best practice is 301 (permanent). Search engines deprioritize 307s for link equity consolidation.
5. **Blog `datePublished` / `dateModified` are not ISO 8601.** They use the natural-language `"Mar 15, 2025"`. Google requires ISO format for BlogPosting structured data — current markup will throw Search Console rich results warnings.

### Top 5 Quick Wins

1. Change layout title to `title: { default: 'Bitropix — ...', template: '%s | Bitropix' }` **and** strip the trailing `| Bitropix` from every route title (and from every `metaTitle` in `lib/blog-data.ts` and `lib/portfolio-data.ts`).
2. Generate a real 1200×630 PNG/JPG `og-image` and place at `public/images/og-image.jpg`. Add `images: [...]` to the home page's `openGraph` (or remove the openGraph override and let layout's metadata apply).
3. Normalize blog dates to ISO (`'2025-03-15'`) and format for display at render time. Add `dateModified` from a separate field.
4. Convert the apex redirect to 301 in Vercel (set "permanent: true" or rely on Vercel's domain canonicalization).
5. Add `baseSalary` to `JobPosting` and fix `addressRegion` to be derived from the role's location instead of hardcoded `'KA'`.

---

## 1. Technical SEO — Score 78/100

### What's working

- Vercel SSR with prerendered HTML (`X-Nextjs-Prerender: 1`) — full content delivered without JS execution.
- HSTS preload, X-Content-Type-Options, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy — all set in `next.config.mjs`.
- `robots.txt` is well-structured, explicit allow for all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Applebot, CCBot, Google-Extended, etc.).
- Long-cache immutable headers on static assets (`max-age=31536000`).
- Sitemap declared in robots.txt, valid XML at `/sitemap.xml`, 32 URLs, no orphaned/disallowed entries.
- 404 page returns a real 404 (not soft-404). Has clear CTA back to home.
- Canonical tags present on every audited page.

### Issues

| Severity     | Issue                                                      | Detail                                                                                                                                              |
| ------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Critical** | Apex → www redirect is **307**, not 301                    | `curl -I https://bitropix.com/` → `HTTP/1.1 307 Temporary Redirect`. Causes ambiguity for link equity consolidation.                                |
| **High**     | No **Content-Security-Policy** header                      | All other security headers present, but CSP is missing. Recommend at least `default-src 'self'` baseline with explicit allows for Vercel Analytics. |
| **High**     | `next.config.mjs` has `typescript.ignoreBuildErrors: true` | Production builds skip TS errors. SEO-relevant changes (canonical/meta logic) can ship broken without alerts.                                       |
| **Medium**   | `<html lang="en">` but Organization `inLanguage: 'en-IN'`  | Inconsistent. Use `en-IN` on `<html>` for stronger regional signal.                                                                                 |
| **Medium**   | 404 page lacks Navbar/Footer                               | Users hitting 404s have only "Go Home"/"Contact Us"/4 quick links. No site-wide nav to recover. Hurts engagement metrics.                           |
| **Low**      | No `X-Robots-Tag` header strategy                          | Acceptable since `<meta name="robots">` is present and explicit, but header would be future-proof.                                                  |
| **Low**      | `Bytespider`, `Amazonbot` explicitly allowed               | Editorial choice. Some operators block these. Not wrong, but worth a conscious decision.                                                            |

### Core Web Vitals — estimated (no field data available)

> No CrUX/PSI run was performed in this audit (no API credentials in repo). Predictions are based on code inspection.

| Metric  | Estimate                     | Risk source                                                                                                                                                                                                                   |
| ------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LCP** | Likely 2.0–2.8s on 4G mobile | Hero section is text-only (no LCP image), good. But framer-motion mounts 6+ animated absolute-positioned `<motion.div>` immediately, increasing initial JS.                                                                   |
| **INP** | At-risk on mid-range mobile  | Hero has continuous animations (`rotate: 360` infinite at 60s/45s/30s/20s/35s/15s) running constantly. Combined with `NextTopLoader`, scroll listeners in navbar, and React-Hot-Toast, total main-thread work is non-trivial. |
| **CLS** | Should be ≤0.05              | Hero is full-viewport, fixed-height. Most sections use Tailwind defined sizes. Low risk.                                                                                                                                      |

**Recommendation:** Run PSI on /, /services, /blogs/digital-transformation-2024-guide. Drop hero animations to CSS where possible (rotate doesn't need framer-motion).

---

## 2. Content Quality & E-E-A-T — Score 70/100

### What's working

- Blog content is genuinely substantive: 800–1200 words per post, clear H2/H3 structure, internal links, original perspective. The Digital Transformation 2025 piece runs ~1100 words with 6 H2s.
- Author identity attached to every post (`author`, `authorRole`).
- Portfolio case studies have a Challenge → Solution → Results structure on each detail page.
- llms-full.txt is a thorough, well-written reference document for AI agents.

### Issues

| Severity   | Issue                                                                                                                                                                                                                                                                                                                                      | Detail                                                                                                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High**   | **Stats discrepancy → E-E-A-T risk.** Homepage and About claim "50+ projects delivered", "50+ happy clients", "25+ team members", "98% client satisfaction", and awards from Clutch.co 2025, NASSCOM 2024, Startup India 2024 — but only **4 portfolio case studies** are published. AI raters and discerning customers will flag the gap. | Either publish more case studies or temper claims to match published evidence (e.g., "Featured case studies: 4 — full client list on request").                                                                                   |
| **High**   | Author profiles are name + role strings only, no bio/photo/social.                                                                                                                                                                                                                                                                         | E-E-A-T 2024 QRG update emphasizes verifiable authors. Build `/authors/[slug]` pages with bio, expertise, links, photo. Reference via `BlogPosting.author.@id`.                                                                   |
| **High**   | No service-detail URLs. All 8 services live on `/services#anchor`.                                                                                                                                                                                                                                                                         | Limits topical depth per service. "Web development services India" and "Cloud migration services India" need standalone pages with 800–1200 words each and dedicated `Service` JSON-LD. Currently aggregated into one `ItemList`. |
| **Medium** | Only 15 blog posts; oldest 2024-12-10, newest 2025-03-15 — no posts in the last ~13 months relative to today (2026-05-11).                                                                                                                                                                                                                 | Cadence dropped. Resume publishing. Date in URL (`digital-transformation-2024-guide`) for a 2025-titled post creates URL/title mismatch — leave URL but update title freshness signal.                                            |
| **Medium** | Generic "We" voice across blogs. No first-person expertise, no specific client outcomes tied to authors.                                                                                                                                                                                                                                   | E-E-A-T leans on "experience." Cite specific Bitropix project numbers in each post.                                                                                                                                               |
| **Medium** | Blog content stored as inline HTML strings in `lib/blog-data.ts` (915 lines).                                                                                                                                                                                                                                                              | Workable for 15 posts; fragile beyond 30–40. Consider MDX or a headless CMS before scale.                                                                                                                                         |
| **Medium** | Duplicate FAQ entries across pages. "Where is Bitropix located?", "How long does it take to build...?" appear on home, /services, /contact, /faq.                                                                                                                                                                                          | OK for users; risks duplicate `FAQPage` markup. Pick one canonical FAQ home (`/faq`) and remove `FAQPage` JSON-LD from other pages (keep visible UI).                                                                             |
| **Low**    | `categories` array on blog includes `"AI & ML"` but no current post is in that category.                                                                                                                                                                                                                                                   | Either remove or publish.                                                                                                                                                                                                         |
| **Low**    | `tagline` field across portfolio is marketing copy ("Power That Farmers Trust"); not SEO-loaded.                                                                                                                                                                                                                                           | Consider supplementing with descriptive H2s with target keywords.                                                                                                                                                                 |

---

## 3. On-Page SEO — Score 58/100

This is the audit's weakest category, almost entirely due to widespread title-template duplication.

### Critical

**Double brand suffix on titles** — confirmed via live HTML:

| URL                             | Live `<title>`                                                              | Issue                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `/`                             | `Bitropix - IT Services & Digital Marketing Agency in Noida, India`         | OK (no template applied — uses default slot via layout title.default) |
| `/about`                        | `About Bitropix \| Leading IT Services Company in Noida, India \| Bitropix` | "Bitropix" 3 times                                                    |
| `/services`                     | `IT Services & Digital Marketing Solutions \| Bitropix \| Bitropix`         | doubled                                                               |
| `/portfolio`                    | `Portfolio - Our Work \| Bitropix \| Bitropix`                              | doubled                                                               |
| `/portfolio/tourillo`           | `Tourillo - Travel Platform Case Study \| Bitropix Portfolio \| Bitropix`   | doubled brand                                                         |
| `/careers/full-stack-developer` | `Full Stack Developer - Careers at Bitropix \| Bitropix`                    | doubled brand                                                         |

**Root cause:** `app/layout.tsx` declares `title: { default, template: '%s | Bitropix' }`. Route metadata that returns a plain string title is wrapped by that template. Every route title in this codebase already ends with `| Bitropix`, so the template appends another.

**Fix:** Either (a) remove `| Bitropix` from every route's title string, or (b) on routes where the title already includes the brand, return `title: { absolute: 'Full title here' }` so the template is skipped.

### Other issues

| Severity   | Issue                                                                                                                                                                                                                                             | Detail                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **High**   | Home page's `openGraph` override drops `images`. Next.js metadata replaces nested objects.                                                                                                                                                        | Either remove the homepage's `openGraph` block (let layout's apply) or add `images: [...]` back.            |
| **High**   | `twitter:image` points to `/images/og-image.jpg` → 404 (confirmed `HTTP/1.1 404`).                                                                                                                                                                | Create the file.                                                                                            |
| **High**   | Portfolio detail `og:image` uses an SVG (`/images/portfolio/tourillo.svg`). LinkedIn/Twitter/Facebook do not render SVG OG images.                                                                                                                | Export raster screenshots (PNG/JPG @1200×630) for each project.                                             |
| **Medium** | Meta description length varies. Some are 145–160 chars (good), some over 170 (will be truncated in SERPs).                                                                                                                                        | Audit and trim to ≤155 chars.                                                                               |
| **Medium** | Canonicals are consistent (`www.bitropix.com`), but two internal schema URLs use apex: `app/about/page.tsx:101` BreadcrumbList items use `https://bitropix.com`; `app/contact/page.tsx:96` ContactPage `url` uses `https://bitropix.com/contact`. | Replace with `https://www.bitropix.com` to match canonical hostname.                                        |
| **Medium** | All service detail content lives on one anchor-segmented `/services#web` page. Internal link `/services#seo` (in footer) doesn't even resolve — no `id="seo"` element exists (only `id="marketing"`).                                             | Verify all anchored hashes resolve. Then consider extracting each service to its own URL for ranking depth. |
| **Low**    | `<html lang="en">` should be `lang="en-IN"` to match Organization and to encourage regional SERP placement.                                                                                                                                       | One-line fix in `app/layout.tsx`.                                                                           |

---

## 4. Schema / Structured Data — Score 72/100

### What's working

- 3 site-wide schemas in `app/layout.tsx`: Organization (+ProfessionalService), WebSite, LocalBusiness (+ProfessionalService) with proper `@id` cross-referencing, full PostalAddress, GeoCoordinates, OpeningHoursSpecification, areaServed GeoCircle (50km radius), ContactPoint with multiple `areaServed` countries.
- BreadcrumbList on every section page.
- BlogPosting on each blog detail with author, publisher, image, mainEntityOfPage.
- ItemList of `Service` items on /services.
- FAQPage on home, services, contact, and /faq.
- JobPosting on careers/[role] with hiringOrganization, jobLocation, employmentType, applicantLocationRequirements.
- ContactPage on /contact.

### Issues

| Severity     | Issue                                                                                                                                                                                                                   | Detail                                                                                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Critical** | `BlogPosting.datePublished` and `dateModified` use natural-language `"Mar 15, 2025"` strings instead of ISO 8601 `2025-03-15`.                                                                                          | Google requires ISO. Search Console rich-results report will flag these and may suppress rich snippets. Fix in `lib/blog-data.ts` (store dates as ISO; format with `Intl.DateTimeFormat` at render time).                                        |
| **High**     | `JobPosting.jobLocation.address.addressRegion` is hardcoded to `'KA'` in `app/careers/[role]/page.tsx:73`. Currently correct for all 3 listed Bangalore roles, but **breaks for any future role in Noida/Mumbai/Pune**. | Derive from `job.location` or add `regionCode` to the data model.                                                                                                                                                                                |
| **High**     | `JobPosting` is missing `baseSalary`. Google strongly recommends; absence reduces rich-result eligibility.                                                                                                              | Add an optional `salaryRange` field to `JobOpening` and emit `baseSalary` JSON-LD when present.                                                                                                                                                  |
| **High**     | `JobPosting.datePosted` is recomputed at render time as "first of current month".                                                                                                                                       | A reader visiting in June sees a different `datePosted` from a reader in May for the same job. Google's documentation expects a stable posting date. Store actual `postedAt` ISO date in `lib/careers.ts`.                                       |
| **Medium**   | About page BreadcrumbList items use `https://bitropix.com` apex URLs (`app/about/page.tsx:101–102`). Contact page ContactPage schema uses `https://bitropix.com/contact` (`app/contact/page.tsx:96`).                   | Use canonical `www.` hostname to avoid mixed URLs in schema graph.                                                                                                                                                                               |
| **Medium**   | FAQ schema appears on 4 pages (home, /services, /contact, /faq). Since Aug 2023 Google restricts FAQ rich results to government/healthcare sites — these will not earn rich snippets for an agency.                     | **Quality-gate rule:** Existing usage flagged **Info** (no removal needed — FAQPage still benefits AI/LLM citations like ChatGPT/Perplexity). However: pick one page as the canonical FAQ source to avoid 4× duplication of identical Q&A pairs. |
| **Medium**   | Organization `sameAs` lists only LinkedIn + Instagram. Footer also displays Twitter and Facebook icons linking to `twitter.com/bitropix` and `facebook.com/bitropix`.                                                   | Either verify those profiles exist and add them to `sameAs`, or remove the icons from the footer. Consistency matters for entity graph.                                                                                                          |
| **Low**      | `LocalBusiness.priceRange: '$$'` — vague.                                                                                                                                                                               | Replace with an actual statement (e.g., `$$ — projects from INR 25,000`) or remove if not desired.                                                                                                                                               |
| **Low**      | `BlogPosting.wordCount` is computed inline as `post.content.replace(/<[^>]*>/g, '').split(/\s+/).length` — includes empty whitespace tokens.                                                                            | Trim and filter empties. Off by 5–15 words per post.                                                                                                                                                                                             |

---

## 5. Performance — Score 75/100 (estimated)

No CrUX/Lighthouse data was pulled for this audit. Observations from code review:

### Risk areas

- **Hero section** mounts 8+ framer-motion `<motion.div>` elements with infinite rotation loops at mount. This is CPU-bound on every page (`HeroSection` is rendered only on `/`). Consider:
  - Replace simple `rotate` animations with CSS `@keyframes` (no JS, no requestAnimationFrame).
  - Or gate animations behind `prefers-reduced-motion: no-preference`.
- **All "section" components use `'use client'`** even when no client state is needed (services-section, technologies-section). This bloats the JS bundle. Audit each section — only those with `useState`/`useEffect`/event handlers truly need client.
- **`'use client'` on `/contact` and `/blogs` listing pages.** Acceptable (forms, filtering), but means the JSON-LD scripts and a chunk of content are rendered after hydration in some cases. Verify SSR'd HTML still contains the JSON-LD.
- **`NextTopLoader`** mounts globally — adds ~7KB. Worth verifying it earns its keep.
- **No image preloading / fetchpriority="high"** for any hero/LCP candidate.

### What's working

- Vercel CDN edge caching (`X-Vercel-Cache: HIT` observed).
- Static immutable cache for images/fonts (`max-age=31536000`).
- WebP and AVIF auto-format conversion enabled in `next.config.mjs.images.formats`.
- Compress enabled.
- Font display: `optional` on Geist/Geist_Mono → no FOIT/FOUT layout shift.

### Recommendations

- Run PageSpeed Insights on /, /services, /portfolio/tourillo, /blogs/digital-transformation-2024-guide.
- Add `priority` only to the LCP image per page (currently `priority` is on the navbar logo, which is fine but small).
- Reduce framer-motion footprint or replace with CSS where the animation is purely decorative.

---

## 6. AI Search Readiness — Score 88/100

This is the site's strongest area.

### Working well

- `llms.txt` — concise, well-formatted, follows the proposed spec.
- `llms-full.txt` — fuller reference with FAQs, identity, services, sitemap.
- Robots.txt explicitly allows: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot, Applebot-Extended, CCBot, Bytespider, Amazonbot, DuckAssistBot, Meta-ExternalAgent, cohere-ai.
- Organization + LocalBusiness schema in JSON-LD on every page provides clean entity grounding.
- Geo meta tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`) — useful for AI assistants doing location-aware recommendation.
- Service descriptions are passage-level citable: each /services entry is a self-contained 50–60 word block with what + how + technologies.

### Improvements

| Severity   | Issue                                                                                                                                                                                                                                      | Detail                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Medium** | The "Featured Case Studies" section in `llms.txt` lists Tourillo, Advanced Beauty, Beverly Agrovet, Dishaa Vertex. Good. But `llms-full.txt` does **not** list them.                                                                       | Add a `## Case Studies` block to `llms-full.txt` mirroring `llms.txt`. |
| **Low**    | No `<link rel="alternate" type="application/llms.txt" href="/llms.txt">` declared in `<head>`. Spec is still proposed, but some agents look for it.                                                                                        | Add it.                                                                |
| **Low**    | `llms-full.txt` lists Embedded Systems & IoT in service summary but homepage and /services prominently market 8 services — IoT and Embedded are present but less prominent. Could expand each to a dedicated paragraph in `llms-full.txt`. | Minor copy expansion.                                                  |
| **Low**    | No FAQ-style passage callouts within each service description (good for AI Overviews snippetability).                                                                                                                                      | Add 1–2 "Common questions" blocks within each service section.         |

---

## 7. Images — Score 70/100

### Working

- WebP service icons (`web.webp`, `app.webp`, etc.) at 16–188 KB — reasonable.
- `next/image` used in navbar, footer, and detail pages.
- `next.config.mjs` outputs AVIF + WebP from any source.

### Issues

| Severity     | Issue                                                                                                                                                                                                                                                                                                                                                                                                               | Detail                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Critical** | `/images/og-image.jpg` returns **404** — yet referenced in OpenGraph and Twitter card metadata. Every social share preview, AI search citation card, and rich-result image is missing.                                                                                                                                                                                                                              | Create a 1200×630 PNG/JPG with logo + tagline. Place at `public/images/og-image.jpg` (or rename references to `og-image.png`).   |
| **High**     | Portfolio og:image is SVG (e.g., `/images/portfolio/tourillo.svg`).                                                                                                                                                                                                                                                                                                                                                 | LinkedIn/Twitter/Facebook reject SVG OG images. Generate raster screenshots of each live project (1200×630) and reference those. |
| **High**     | `app/layout.tsx` `icons` declares `type: 'image/webp'` for a file that is actually a PNG (`/images/logo.png`).                                                                                                                                                                                                                                                                                                      | Mismatch — change `type: 'image/png'` or convert the logo to a real WebP. Browsers won't crash, but icon cache may misbehave.    |
| **Medium**   | Several stub assets in `/public` left over from a v0/template scaffold: `placeholder.jpg` (1064 B), `placeholder.svg`, `placeholder-logo.png`, `placeholder-logo.svg`, `placeholder-user.jpg`, plus descriptively named JPEGs (`professional-team-meeting-in-modern-office-discuss.jpg`, etc.). Grepping confirms a few are still referenced from `app/about/page.tsx`, `careers/page.tsx`, and `lib/blog-data.ts`. | Audit `/public` and delete unreferenced files. Replace stock-looking JPGs with real photography to support E-E-A-T.              |
| **Medium**   | Most image references lack explicit `width`/`height` props in some sections; relies on `next/image` to fill. Verify CLS impact on listings (`/blogs`, `/portfolio`).                                                                                                                                                                                                                                                | Spot-check Lighthouse CLS.                                                                                                       |
| **Low**      | Logo PNG is 132 KB.                                                                                                                                                                                                                                                                                                                                                                                                 | Optimize to ~30 KB (TinyPNG, or convert to WebP at 0.85 quality).                                                                |

---

## 8. Sitemap & Indexability

### Sitemap (`/sitemap.xml`)

- 32 URLs, well-structured.
- All static pages, portfolio details, blog details, and 3 career roles included.
- `lastModified: '2026-05-06'` is a **static constant** for everything except blog posts. Every push to prod returns the same date. Recommendation: pull `process.env.VERCEL_GIT_COMMIT_DATE` or per-page edit timestamps so search engines see real freshness.
- Priority/changeFrequency declared — modern Google ignores both. Harmless but vestigial.

### Indexability

- `robots.txt` correctly disallows `/api/`, `/_next/`, `/admin/`. No issues.
- No `noindex` on any audited page.
- `sitemap-html` is linked in footer (manual HTML sitemap) — verify it exists (I saw the directory but did not open).

### Missing sitemap URLs (consider adding)

- `/sitemap-html` — the human sitemap page should be in the XML sitemap too.
- `/services#<slug>` anchors — Google won't index fragment anchors separately; this is why per-service URLs would help.

---

## 9. Local SEO (Noida)

The site declares LocalBusiness markup correctly. To compete locally:

- **Google Business Profile** is not verifiable from this audit (off-site). Confirm GBP is claimed at the Sector 62, Noida address, photos uploaded, hours match schema (Mon–Fri 9–6, Sat 10–2), and primary category = "Software Company" or "Internet Marketing Service" depending on lead source priority.
- **NAP consistency check** — phone `+91-9318454571`, address "Sector 62, Noida, Uttar Pradesh 201301" — propagate identically to GBP, Justdial, Sulekha, Clutch, GoodFirms, IndiaMART, LinkedIn, Instagram bio.
- **KML file** (`public/bitropix.kml`) — likely for GBP. Verify it's referenced (uploaded to GBP or linked in `<head>` `<link rel="alternate" type="application/vnd.google-earth.kml+xml">`).
- **Service-area pages** — currently no `/noida-web-development`, `/noida-seo-services`, `/sector-62-it-company` city/area landing pages. Given the local schema and Noida HQ, even 1–2 dedicated location pages would unlock map-pack-adjacent traffic.

---

## 10. Site Architecture Observations

- 4 portfolio case studies, 15 blog posts, 8 services-on-one-page, 3 careers, 9 static pages → 32 total URLs. Reasonable for a 2-year-old agency, but thin.
- Internal linking is mostly footer + breadcrumb-driven. Service descriptions on /services reference `relatedServices` arrays (`['mobile', 'design', 'marketing']`) but I did not verify these render as actual `<Link>` elements with descriptive anchor text — recommend confirming.
- Two service slug conventions exist: `services-section.tsx` (homepage) uses `web-development`, `mobile-development`, etc., while `/services/page.tsx` uses `web`, `mobile`, `design`. Footer hrefs (`/services#web`) match the latter; the homepage's `id="web-development"` IDs do not. Consolidate.
- `app/sitemap-html` directory exists — confirm rendered HTML sitemap matches XML.

---

## Appendix A — Confirmed Live HTML Findings

```
$ curl -I https://bitropix.com/
HTTP/1.1 307 Temporary Redirect            # should be 301
Location: https://www.bitropix.com/

$ curl -I https://www.bitropix.com/images/og-image.jpg
HTTP/1.1 404 Not Found                     # critical

$ curl https://www.bitropix.com/ | grep og:image
(no match — og:image meta tag not emitted on homepage)

$ curl https://www.bitropix.com/ | grep twitter:image
<meta name="twitter:image" content="https://www.bitropix.com/images/og-image.jpg"/>
                                       # points to 404'd file

$ curl https://www.bitropix.com/blogs/digital-transformation-2024-guide | grep date
"datePublished":"Mar 15, 2025"            # NOT ISO 8601
"dateModified":"Mar 15, 2025"             # NOT ISO 8601

$ curl https://www.bitropix.com/about | grep title
<title>About Bitropix | Leading IT Services Company in Noida, India | Bitropix</title>
                                       # "Bitropix" appears 3 times
```

---

## Appendix B — Code Locations

| Finding                                    | File                          | Line(s)                                         |
| ------------------------------------------ | ----------------------------- | ----------------------------------------------- |
| Title template causing double-suffix       | `app/layout.tsx`              | 16–19                                           |
| Home page openGraph override               | `app/page.tsx`                | 30–35                                           |
| Missing og-image.jpg                       | (file doesn't exist)          | `public/images/`                                |
| Apex 307 redirect                          | Vercel config (external)      | —                                               |
| Hardcoded `addressRegion: 'KA'`            | `app/careers/[role]/page.tsx` | 73                                              |
| JobPosting `datePosted` computed at render | `app/careers/[role]/page.tsx` | 46                                              |
| `BlogPosting` dates non-ISO                | `app/blogs/[slug]/page.tsx`   | 134–135 (consumes); `lib/blog-data.ts` (source) |
| Apex URL in BreadcrumbList                 | `app/about/page.tsx`          | 101–102                                         |
| Apex URL in ContactPage                    | `app/contact/page.tsx`        | 96                                              |
| Logo MIME mismatch                         | `app/layout.tsx`              | 84–88                                           |
| Bare `<html lang="en">`                    | `app/layout.tsx`              | 196                                             |
| `ignoreBuildErrors: true`                  | `next.config.mjs`             | 4                                               |
| Static `STATIC_LAST_MOD`                   | `app/sitemap.ts`              | 8                                               |
| Sitemap missing `/sitemap-html`            | `app/sitemap.ts`              | —                                               |

---

See `ACTION-PLAN.md` for prioritized fix list with effort estimates.
