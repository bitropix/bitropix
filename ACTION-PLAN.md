# Bitropix — SEO Action Plan

Prioritized fixes from the full audit. Effort is engineer-hours (S = <1h, M = 1–4h, L = 4–8h, XL = 1d+).

---

## Critical — Fix this week

### 1. Strip duplicate `| Bitropix` from page titles · S

**Why:** Every non-home page renders `... | Bitropix | Bitropix` (and `/about` has "Bitropix" 3x). Brand dilution + lost keyword visibility in SERPs.

**How:**

- Keep `app/layout.tsx` template: `title: { default: '...', template: '%s | Bitropix' }`.
- Strip `| Bitropix` (and `| Bitropix Portfolio`, `Careers at Bitropix`) suffix from every route title:
  - `app/page.tsx:17`
  - `app/services/page.tsx:26`
  - `app/about/page.tsx:11`
  - `app/portfolio/page.tsx:12`
  - `app/blogs/layout.tsx:4`
  - `app/contact/layout.tsx`
  - `app/faq/page.tsx:11`
  - `app/careers/page.tsx:26`
  - `app/careers/[role]/page.tsx:33`
  - Every `metaTitle` in `lib/blog-data.ts` (15 entries)
  - Every `metaTitle` in `lib/portfolio-data.ts` (4 entries)
- For homepage, set `title: { absolute: 'Bitropix — IT Services & Digital Marketing Agency in Noida, India' }` so the template is bypassed and the brand stays at the start.

**Verify:** `curl -s https://www.bitropix.com/about | grep title` — only one `| Bitropix`.

---

### 2. Create `og-image.jpg` and fix homepage openGraph · S

**Why:** Twitter card image is broken site-wide (confirmed 404). Homepage emits no `og:image` at all.

**How:**

1. Generate a 1200×630 PNG/JPG branded image: logo + tagline "IT Services & Digital Marketing — Noida, India" on `#0a0a12` background with `#E03B37` accent. Save to `public/images/og-image.jpg`.
2. Also generate per-section variants (optional but recommended): `og-services.jpg`, `og-blog-default.jpg`.
3. In `app/page.tsx`, either delete the `openGraph` block entirely (inherits layout's full openGraph including images) **or** add:
   ```ts
   openGraph: {
     title: '...',
     description: '...',
     type: 'website',
     images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Bitropix' }],
   }
   ```
4. Same fix consideration for blog/portfolio detail pages — they override `openGraph` but include per-asset images, so they're fine; double-check that the image referenced is raster (see #4 below).

**Verify:** `curl -I https://www.bitropix.com/images/og-image.jpg` returns 200. Run https://www.opengraph.xyz/url/https%3A%2F%2Fwww.bitropix.com on home, /about, /services, /portfolio/tourillo.

---

### 3. Switch apex → www to a 301 · S

**Why:** Apex currently 307s. Link equity not consolidated.

**How:** On Vercel, ensure the primary domain is `www.bitropix.com` and the apex is the redirect source set to "Permanent (301)". Project Settings → Domains → Edit the apex entry. Re-test:

```
curl -I https://bitropix.com/
# Expect: HTTP/1.1 308 Permanent Redirect (Vercel) or 301
```

**Verify:** Status code is 301 or 308, not 307.

---

### 4. Convert blog/portfolio OG images to raster + fix logo MIME · S

**Why:** SVG OG images fail on LinkedIn/Twitter/Facebook. Logo MIME type is wrong.

**How:**

- For each portfolio project, capture a 1200×630 PNG screenshot of the live homepage and save to `public/images/portfolio/{slug}.png`. Update `lib/portfolio-data.ts` `image` fields. Keep SVGs available for inline rendering if useful.
- In `app/layout.tsx:84–88`, change `type: 'image/webp'` → `'image/png'` (or convert `/images/logo.png` to a real `.webp` and update references).

---

### 5. ISO-8601 blog dates · M

**Why:** `BlogPosting.datePublished` and `dateModified` are emitted as "Mar 15, 2025" — Google rejects, breaks rich results.

**How:**

1. In `lib/blog-data.ts`, change every `date: 'Mar 15, 2025'` → `date: '2025-03-15'`. Add a `dateModified: '2025-03-15'` field per post.
2. In `app/blogs/[slug]/page.tsx`:
   - Use `post.date` (ISO) directly for `datePublished` in JSON-LD.
   - Use `post.dateModified` (or fall back to `post.date`) for `dateModified`.
   - For visible display, format with `new Date(post.date).toLocaleDateString('en-IN', { year:'numeric', month:'short', day:'numeric' })`.
3. In `app/sitemap.ts:12`, replace `parseBlogDate` with `new Date(post.date)` (now safe since ISO).

**Verify:**

```
curl -s https://www.bitropix.com/blogs/digital-transformation-2024-guide | grep -oE '"date(Published|Modified)":"[^"]+"'
# Expect: "datePublished":"2025-03-15"
```

---

## High — Fix this month

### 6. Fix JobPosting schema · M

**Why:** Hardcoded region, missing salary, unstable datePosted.

**How (`app/careers/[role]/page.tsx`):**

1. Add to `lib/careers.ts`:
   ```ts
   postedAt: '2026-05-01';  // ISO, stable
   validThrough?: '2026-08-01';
   regionCode: 'KA' | 'MH' | 'UP' | ...;  // ISO 3166-2 region code
   salary?: { min: number; max: number; currency: 'INR'; unit: 'YEAR' };
   ```
2. In `buildJobPostingSchema`, replace:
   - `datePosted` → `job.postedAt`
   - `validThrough` → `job.validThrough ?? <90 days from postedAt>`
   - `addressRegion: 'KA'` → `job.regionCode`
   - Emit `baseSalary` block conditionally:
     ```ts
     ...(job.salary && {
       baseSalary: {
         '@type': 'MonetaryAmount',
         currency: job.salary.currency,
         value: { '@type': 'QuantitativeValue', minValue: job.salary.min, maxValue: job.salary.max, unitText: job.salary.unit },
       },
     }),
     ```
3. Validate at https://search.google.com/test/rich-results

---

### 7. Add `Content-Security-Policy` header · M

**Why:** All other security headers are set; CSP completes the suite.

**How:** In `next.config.mjs` headers array, add (start in `report-only` for a week, then enforce):

```js
{ key: 'Content-Security-Policy-Report-Only',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'self'"
}
```

Note: `'unsafe-inline'` is needed for JSON-LD `<script>` tags unless you switch to `nonce`-based.

---

### 8. Fix apex URLs in JSON-LD · S

**Why:** BreadcrumbList in /about and ContactPage URL in /contact use `https://bitropix.com` while canonicals use `www.`. Mixed signals in the entity graph.

**How:**

- `app/about/page.tsx:101–102`: replace `https://bitropix.com` → `https://www.bitropix.com`
- `app/contact/page.tsx:96`: replace `https://bitropix.com/contact` → `https://www.bitropix.com/contact`

---

### 9. Build out service-detail URLs · L

**Why:** All 8 services compete for ranking from a single `/services` page. "Cloud migration services India" and "Mobile app development Noida" need standalone pages with 800–1200 unique words, FAQ block, breadcrumbs, related case studies, and dedicated `Service` JSON-LD.

**How:**

1. Create `app/services/[slug]/page.tsx` reading a richer `serviceData` table (extract from current inline `services` array).
2. Each page: H1 + 3–4 H2 (Why, Process, Stack, Pricing FAQ) + CTA. Target ~1000 words.
3. Update sitemap.ts to include each new URL.
4. Update footer hrefs from `/services#web` → `/services/web-development`.
5. 301 redirect old `/services#anchor` → new URL.

**Quality gate:** Per `references/quality-gates.md` — each service page must have ≥800 unique words. Reuse zero content from the parent `/services` summary.

---

### 10. Bring stats / claims into line with evidence · M

**Why:** "50+ projects", "98% satisfaction", Clutch.co 2025 award — but only 4 portfolio entries. E-E-A-T gap.

**How (pick one):**

- **Option A — Add proof:** Publish 6–10 more case studies (even short 300-word ones). Add a "Trusted by" logo strip. Embed a public Clutch.co profile link in About + footer.
- **Option B — Temper claims:** Change "50+ projects delivered" → "Featured case studies: 4 — full client list on request." Remove unverifiable awards or replace with verifiable badges.

---

### 11. Author profile pages · L

**Why:** Posts have `author: 'Rahul Verma'` strings only. E-E-A-T 2024 QRG values verifiable authors.

**How:**

- Add `app/authors/[slug]/page.tsx` with bio, photo, LinkedIn, expertise areas, post list.
- Update `BlogPosting.author` schema:
  ```ts
  author: { '@type': 'Person', '@id': `https://www.bitropix.com/authors/${authorSlug}#person`, name, jobTitle, image, sameAs: [linkedinUrl] }
  ```
- Link author name on each post to the author page.

---

### 12. Reconcile social profile sameAs · S

**Why:** Footer shows Twitter & Facebook icons but Organization schema only lists LinkedIn + Instagram in `sameAs`.

**How:** Either:

- (a) verify the profiles exist at `twitter.com/bitropix` and `facebook.com/bitropix`, then add to `sameAs` in `app/layout.tsx:133`, or
- (b) remove the Twitter/Facebook icons from `components/footer.tsx:43–52`.

---

## Medium — Fix this quarter

### 13. Deduplicate FAQ schemas · M

Make `/faq` the single canonical FAQPage JSON-LD source. Keep visible accordions on home/services/contact but **remove the JSON-LD blocks** from those pages. Avoids 4× duplicate Q&A in structured data.

(Per the audit's quality gate: FAQPage rich result is gov/healthcare only since Aug 2023, so this is Info priority. Keep one for AI/LLM citations only.)

### 14. Set `<html lang="en-IN">` · S

`app/layout.tsx:196` — one-line change. Aligns with Organization `inLanguage: 'en-IN'`.

### 15. Stop ignoring TypeScript build errors · M

`next.config.mjs:4` — remove `typescript: { ignoreBuildErrors: true }`. Run `pnpm tsc --noEmit` and fix anything that surfaces. Add to CI.

### 16. Sitemap dynamic lastmod · S

`app/sitemap.ts:8` — replace `STATIC_LAST_MOD = '2026-05-06'` with `new Date()` (or build-time env var like `process.env.VERCEL_GIT_COMMIT_DATE`).

### 17. Hreflang strategy · M

Site claims service to IN, US, GB, AE, AU. Either add `hreflang="en-IN"` (current default) plus `x-default`, or build out `/in/`, `/us/` localized paths (heavy lift — only if you actually run separate variants).

For now (minimal): add to `app/layout.tsx` metadata:

```ts
alternates: { canonical: '/', languages: { 'en-IN': '/', 'x-default': '/' } }
```

### 18. Audit and remove unused public/ assets · S

Files in `public/` that look like v0 template stubs and may not be referenced:

- `placeholder.jpg`, `placeholder.svg`, `placeholder-logo.png`, `placeholder-logo.svg`, `placeholder-user.jpg`
- The descriptively-named JPEGs (`professional-team-meeting-...jpg`, `diverse-team-of-professionals-...jpg`, etc.) — replace with real Bitropix-team photos or keep as stock placeholders.

Run: `grep -rE "professional-team-meeting|placeholder\\.jpg|placeholder-user" --include='*.tsx' --include='*.ts' app components lib` and delete any file with zero matches.

### 19. Fix `/services#seo` and other unresolved anchors · S

Footer link `/services#seo` → there's no element with `id="seo"` (only `id="marketing"`). Audit every footer service hash and either fix the link or add the anchor.

### 20. Reduce hero animation cost · M

Replace framer-motion infinite rotation in `components/home/hero-section.tsx` with CSS `@keyframes`. Lighter mainthread, better INP on mobile. Respect `prefers-reduced-motion`.

---

## Low — Backlog

### 21. Add `<link rel="alternate" type="application/llms.txt">` and sync llms-full.txt · S

- Add to head: `<link rel="alternate" type="application/llms.txt" href="/llms.txt" />`.
- Append case studies section to `public/llms-full.txt`.

### 22. Add a `BlogPosting.wordCount` trim · S

`app/blogs/[slug]/page.tsx:148` — filter empties before counting:

```ts
wordCount: post.content
  .replace(/<[^>]*>/g, ' ')
  .split(/\s+/)
  .filter(Boolean).length;
```

### 23. Replace `LocalBusiness.priceRange: '$$'` with a real signal · S

Either remove or change to a description like `'INR 25,000 — INR 10,00,000+'`.

### 24. Resume blog cadence · L

Latest post is 2025-03-15; site shows "12-month freshness gap" relative to today (2026-05-11). Pick a cadence (1 post/week or 2/month) and ship.

### 25. Local content: Noida / Sector 62 landing pages · L

1–2 pages (e.g., `/locations/noida`, `/sector-62-it-company`) with local NAP, embedded Google Map, neighborhood-specific testimonials. Strengthens map-pack signals.

### 26. Verify KML usage · S

`public/bitropix.kml` is served. Confirm it's uploaded to Google Business Profile or linked via:

```html
<link rel="alternate" type="application/vnd.google-earth.kml+xml" href="/bitropix.kml" />
```

### 27. Optimize logo PNG · S

Compress `public/images/logo.png` (132 KB) to ~30 KB.

### 28. Add `/sitemap-html` to XML sitemap · S

One-line addition to `app/sitemap.ts`.

---

## Quick-reference checklist (PR-ready)

```
[ ] 1.  Strip "| Bitropix" suffix from all route titles
[ ] 2.  Create /images/og-image.jpg, add to home openGraph
[ ] 3.  Apex → www set to 301 in Vercel
[ ] 4.  Convert portfolio og:image SVGs to PNG; fix logo MIME
[ ] 5.  ISO-8601 blog dates in lib/blog-data.ts
[ ] 6.  JobPosting: regionCode field + baseSalary + stable datePosted
[ ] 7.  Add CSP (start in Report-Only)
[ ] 8.  Replace bitropix.com apex URLs in BreadcrumbList & ContactPage schema
[ ] 9.  Build /services/[slug] pages
[ ] 10. Reconcile claims (50+ clients, awards) with published evidence
[ ] 11. /authors/[slug] pages
[ ] 12. Sync Organization.sameAs with footer socials
[ ] 13. One FAQPage JSON-LD source (keep on /faq, remove from home/services/contact)
[ ] 14. <html lang="en-IN">
[ ] 15. Drop typescript.ignoreBuildErrors
[ ] 16. Sitemap dynamic lastmod
[ ] 17. Hreflang en-IN + x-default
[ ] 18. Clean unused public/ assets
[ ] 19. Fix unresolved /services#anchor hashes
[ ] 20. CSS-based hero animations
[ ] 21. llms.txt link tag + sync llms-full.txt
[ ] 22. Trim BlogPosting wordCount
[ ] 23. LocalBusiness.priceRange — real signal
[ ] 24. Resume blog publishing cadence
[ ] 25. Noida/Sector 62 location pages
[ ] 26. Verify KML usage in GBP
[ ] 27. Compress logo.png
[ ] 28. Add /sitemap-html to XML sitemap
```

---

## Estimated effort summary

| Priority     | Items        | Total effort           |
| ------------ | ------------ | ---------------------- |
| Critical (5) | 1–5          | ~8h                    |
| High (7)     | 6–12         | ~22h                   |
| Medium (8)   | 13–20        | ~20h                   |
| Low (8)      | 21–28        | ~16h                   |
| **Total**    | **28 items** | **~66h (≈8 dev-days)** |

Most of the lift in the first week (~8 hours) for the Critical fixes will visibly improve SERP titles, social shares, and rich-result eligibility within 1–2 crawl cycles.
