# Bitropix - Full SEO Audit Report

- **Target:** https://www.bitropix.com/
- **Audit date:** 2026-05-12 (re-audit; previous baseline 2026-05-11)
- **Business type:** Hybrid - Local Service (HQ Noida, IN) + Digital Agency / IT Services
- **Industry:** Agency
- **Pages discovered (sitemap):** 33 URLs (now includes `/sitemap-html`)
- **Infrastructure:** Next.js 15 (App Router) on Vercel, SSR/SSG (Prerendered)

---

## SEO Health Score: **81 / 100** (▲ +9 vs yesterday's 72)

| Category                      | Weight   | Yesterday | Today   | Δ     |
| ----------------------------- | -------- | --------- | ------- | ----- |
| Technical SEO                 | 22%      | 78        | **86**  | ▲ +8  |
| Content Quality               | 23%      | 70        | **72**  | ▲ +2  |
| On-Page SEO                   | 20%      | 58        | **80**  | ▲ +22 |
| Schema / Structured Data      | 10%      | 72        | **88**  | ▲ +16 |
| Performance (CWV - estimated) | 10%      | 75        | 75      | -     |
| AI Search Readiness           | 10%      | 88        | **92**  | ▲ +4  |
| Images                        | 5%       | 70        | **76**  | ▲ +6  |
| **TOTAL**                     | **100%** | **72**    | **~81** | ▲ +9  |

> One commit (`3bf6fbb feat: Update metadata structure and improve job posting schema`) cleared 4 of yesterday's 5 Critical issues plus several High items. The big remaining drag is a single Vercel domain-config item (apex 307) and a regression where blog post titles now ship without the brand suffix in SERPs.

---

## Delta - What changed since yesterday

### ✅ Fixed (confirmed via live HTML)

| #   | Issue                                                         | Yesterday                                  | Today                                                                        | Evidence                                                                                           |
| --- | ------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1   | Title double-suffix                                           | `About Bitropix … \| Bitropix \| Bitropix` | `About Bitropix … \| Bitropix`                                               | `curl /about`                                                                                      |
| 2   | `og-image.jpg` 404                                            | 404                                        | 200, `image/jpeg`, 134 KB                                                    | `curl -I /images/og-image.jpg`                                                                     |
| 3   | Home `og:image` absent                                        | missing                                    | `<meta property="og:image" content=".../og-image.jpg">` present              | `curl /`                                                                                           |
| 4   | Blog `datePublished` non-ISO                                  | `"Mar 15, 2025"`                           | `"2025-03-15"`                                                               | `curl /blogs/<slug>`                                                                               |
| 5   | JobPosting `addressRegion` hardcoded `'KA'`                   | hardcoded                                  | now read from `job.regionCode` in `lib/careers.ts`                           | code                                                                                               |
| 6   | JobPosting missing `baseSalary`                               | absent                                     | `MonetaryAmount` with `QuantitativeValue` minValue/maxValue/unitText present | `curl /careers/full-stack-developer`                                                               |
| 7   | JobPosting `datePosted` recomputed at render                  | unstable                                   | reads `job.postedAt` ISO field                                               | code                                                                                               |
| 8   | Logo `icons` MIME type wrong (`image/webp` for PNG)           | wrong                                      | corrected to `image/png`                                                     | `app/layout.tsx:89-91`                                                                             |
| 9   | `typescript.ignoreBuildErrors: true`                          | present                                    | removed                                                                      | `next.config.mjs`                                                                                  |
| 10  | No `Content-Security-Policy`                                  | absent                                     | `Content-Security-Policy-Report-Only` present with sensible directives       | response header                                                                                    |
| 11  | Sitemap `lastModified` static `2026-05-06`                    | static                                     | uses `VERCEL_GIT_COMMIT_DATE` or build time; blog uses real `dateModified`   | `app/sitemap.ts`                                                                                   |
| 12  | `/sitemap-html` missing from XML sitemap                      | missing                                    | included                                                                     | `app/sitemap.ts:94`                                                                                |
| 13  | FAQ JSON-LD duplicated on home + /services + /contact + /faq  | 4 sources                                  | centralized to `/faq` only (others removed)                                  | `curl` count: home 6 scripts (no FAQPage); /services 0 FAQPage; /contact 0 FAQPage; /faq 1 FAQPage |
| 14  | Hreflang absent                                               | absent                                     | `alternates.languages` declares `en-IN` + `x-default`                        | `app/layout.tsx:55-61`                                                                             |
| 15  | About BreadcrumbList used apex URLs                           | apex                                       | now www                                                                      | code                                                                                               |
| 16  | Contact ContactPage `url` used apex                           | apex                                       | now www                                                                      | code                                                                                               |
| 17  | `llms-full.txt` missing case studies                          | missing                                    | added section with all 4 case studies                                        | `public/llms-full.txt:75-80`                                                                       |
| 18  | Portfolio metaTitle "… \| Bitropix Portfolio" → double-suffix | doubled                                    | cleaned (single brand at end via template)                                   | code                                                                                               |

### ❌ Still outstanding (or new)

| Severity   | Issue                                                                                                                                                                                                                                                                                                                        | Status                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| **High**   | Apex `bitropix.com/` → www redirect is **307**, not 301                                                                                                                                                                                                                                                                      | unchanged - needs Vercel domain-config edit, not code         |
| **High**   | **Blog detail titles ship with NO brand suffix.** Live: `<title>Complete Guide to Digital Transformation in 2025</title>`. The blogs layout sets `title: { absolute: '…' }` which **disables the layout template for all descendant routes**, so the [slug] page's `title: post.metaTitle` (string) is taken as-is with no ` | Bitropix` appended. SERP CTR for branded queries will suffer. | NEW regression introduced by yesterday's title-template fix |
| **High**   | Portfolio `og:image` still SVG (`/images/portfolio/tourillo.svg` 200, but `.png` is 404). LinkedIn/Twitter/Facebook will not render these previews                                                                                                                                                                           | unchanged                                                     |
| **Medium** | Organization `sameAs` still only LinkedIn + Instagram, but footer + `llms-full.txt` now publicly claim Twitter and Facebook profiles too - inconsistency in entity graph                                                                                                                                                     | unchanged                                                     |
| **Medium** | Canonical on `/` is `https://www.bitropix.com` (no trailing slash); sitemap entry is `https://www.bitropix.com/` (with slash). Minor URL canonicalization inconsistency                                                                                                                                                      | unchanged                                                     |
| **Medium** | Stats discrepancy (50+ projects vs 4 case studies, awards claims)                                                                                                                                                                                                                                                            | unchanged - E-E-A-T gap                                       |
| **Medium** | No service-detail URLs; all 8 services share `/services`                                                                                                                                                                                                                                                                     | unchanged                                                     |
| **Medium** | No author profile pages                                                                                                                                                                                                                                                                                                      | unchanged                                                     |
| **Medium** | Hero animations (framer-motion, 8 infinite loops) untouched - INP risk                                                                                                                                                                                                                                                       | unchanged                                                     |
| **Low**    | Logo PNG still 132 KB                                                                                                                                                                                                                                                                                                        | unchanged                                                     |
| **Low**    | Blog cadence - still no posts after 2025-03-15 (~14 months stale)                                                                                                                                                                                                                                                            | unchanged                                                     |

---

## Executive Summary

### Top 3 Critical/High to fix now

1. **Convert apex → www to 301 (Vercel Domains UI).** Last remaining redirect-quality issue. <5 min.
2. **Re-attach brand to blog post titles.** The blogs layout's `absolute` title broke template inheritance. Fix: change `app/blogs/layout.tsx:4` from `title: { absolute: '…' }` to `title: { default: '…', template: '%s | Bitropix' }` - that lets the home template cascade and the [slug] route's string title get `| Bitropix` appended again.
3. **Generate raster 1200×630 portfolio OG images** (PNG/JPG) and switch `lib/portfolio-data.ts` `image` references.

### Top 3 Quick Wins

1. Sync `Organization.sameAs` with footer & llms-full social claims (add Twitter and Facebook to `app/layout.tsx:133`, or remove from footer).
2. Trim canonical trailing slash mismatch (decide on with-slash or without and apply to both `alternates.canonical` and `app/sitemap.ts`).
3. Convert hero animations from framer-motion to CSS `@keyframes` - meaningful INP win, no functional change.

---

## 1. Technical SEO - Score 86/100 (▲ +8)

### Now working (new today)

- **CSP shipped in Report-Only** mode with sensible directives: `default-src 'self'`; `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com`; `img-src 'self' data: blob: https:`; etc. Includes the necessary Vercel Analytics/Speed-Insights endpoints. Note: switch to enforced (drop `-Report-Only`) once you've validated zero violations in your reporting endpoint.
- **TypeScript build errors no longer ignored** - production builds will now fail on type errors rather than silently shipping broken metadata logic.
- **Hreflang** declared (`en-IN` + `x-default` both pointing to `/`). Minimal but valid.

### Outstanding

| Severity   | Issue                                                     | Detail                                                                                                                  |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **High**   | Apex → www is **307**, not 301                            | `curl -I https://bitropix.com/` → `HTTP/1.1 307 Temporary Redirect`. Fix in Vercel Domains UI.                          |
| **Medium** | CSP is Report-Only - no policy violations are blocked yet | After 1 week of zero reports, promote to `Content-Security-Policy` (enforced).                                          |
| **Medium** | 404 page (`app/not-found.tsx`) still lacks Navbar/Footer  | unchanged                                                                                                               |
| **Low**    | No CSP report endpoint configured                         | `report-uri` / `report-to` directive missing - violations go unobserved. Add a Vercel function or third-party endpoint. |
| **Low**    | `<html lang="en">` (not `en-IN`)                          | Note: hreflang declares `en-IN` so this is now a soft inconsistency. Easy fix in `app/layout.tsx:196`.                  |

---

## 2. Content Quality & E-E-A-T - Score 72/100 (▲ +2)

The two-point bump comes from `llms-full.txt` gaining a case-studies section. No new posts shipped; the substantive E-E-A-T gaps are unchanged:

- Only 4 portfolio case studies vs claims of "50+ projects delivered".
- Latest blog post is `2025-03-15` (now 14 months stale).
- Authors are still name-only strings; no author profile pages.
- No service-detail URLs to support topic depth.

Recommendations from yesterday's audit (Action Plan items 9, 10, 11, 24, 25) all still stand.

---

## 3. On-Page SEO - Score 80/100 (▲ +22)

### Now working

- Titles on `/`, `/about`, `/services`, `/portfolio`, `/portfolio/[slug]`, `/careers`, `/careers/[role]`, `/blogs` (listing), `/faq`, `/contact` all render with single-brand suffix (or absolute for home).
- Home `openGraph.images` now includes `og-image.jpg` (1200×630, alt text set).
- Apex URLs purged from JSON-LD on /about and /contact.

### Outstanding (one new regression)

| Severity   | Issue                                                                                                                                                                                                                                                                                                   | Detail                                                                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High**   | **Blog post titles ship without brand suffix.** `<title>Complete Guide to Digital Transformation in 2025</title>`, `<title>React 19 Features & Upgrade Guide \| What Is New in React 19</title>`, `<title>Top UX Design Trends 2025: AI, Spatial Computing & More</title>` - none end in "\| Bitropix". | `app/blogs/layout.tsx:4` uses `title: { absolute }` which disables the template for descendant `/blogs/[slug]` routes.                                                                                                          |
| **Medium** | Home canonical is `https://www.bitropix.com` (no trailing slash); sitemap URL is `https://www.bitropix.com/` (with slash).                                                                                                                                                                              | Pick one. Update `alternates.canonical` in `app/layout.tsx:56` to `'/'` (already is) - issue is that `metadataBase` strips the trailing slash. If preferred, change to `canonical: '/'` and confirm Next.js renders with slash. |
| **Medium** | Service section IDs on the homepage (`web-development`, `mobile-development`, …) still don't match `/services` page slugs (`web`, `mobile`, …)                                                                                                                                                          | unchanged                                                                                                                                                                                                                       |
| **Medium** | Some footer `/services#seo`, `/services#consulting` anchors still don't resolve to a matching element id                                                                                                                                                                                                | unchanged                                                                                                                                                                                                                       |

### Fix for blog title regression

```ts
// app/blogs/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Blog | Bitropix - Tech Insights & Digital Marketing Tips',
    template: '%s | Bitropix', // re-enables template for /blogs/[slug]
  },
  // ...
};
```

This restores `| Bitropix` to all blog detail titles while keeping the listing page's full title intact.

---

## 4. Schema / Structured Data - Score 88/100 (▲ +16)

### Now working

- **JobPosting** is now exemplary: `datePosted` from stable `postedAt` field, `validThrough` defaults to +90 days, `addressLocality` from `city`, `addressRegion` from `regionCode`, `baseSalary` with full `MonetaryAmount` + `QuantitativeValue`. Validates cleanly.
- **BlogPosting** dates are ISO 8601.
- **FAQPage** centralized to `/faq` (6 JSON-LD scripts on home; 0 FAQPage; 1 FAQPage on /faq). Resolves the previous 4× duplication.

### Outstanding

| Severity   | Issue                                                                                                                                                                       | Detail                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Medium** | `Organization.sameAs` lists only LinkedIn + Instagram. Footer (`components/footer.tsx`) and `llms-full.txt` line 16-17 both publicly link to Twitter and Facebook accounts. | Pick: either add the two to `sameAs` (and verify the profiles exist), or remove from footer + llms-full.txt. |
| **Low**    | `LocalBusiness.priceRange: '$$'`                                                                                                                                            | Still vague. Optional clean-up.                                                                              |
| **Low**    | `BlogPosting.wordCount` calc still includes empty whitespace tokens                                                                                                         | Minor.                                                                                                       |

---

## 5. Performance - Score 75/100 (unchanged)

No code changes affecting LCP/INP/CLS. Hero section still mounts 8+ framer-motion infinite-rotation loops. Recommend running PageSpeed Insights on `/`, `/services`, `/blogs/digital-transformation-2024-guide` and applying Action Plan item 20 (CSS keyframes) if INP > 200ms on mid-range Android.

---

## 6. AI Search Readiness - Score 92/100 (▲ +4)

- `llms-full.txt` now has a Case Studies section mirroring `llms.txt`.
- Twitter and Facebook now declared as part of Bitropix's public identity in `llms-full.txt` - improves entity disambiguation for AI assistants.
- All Critical AI-friendly schemas (Organization, LocalBusiness, BlogPosting, JobPosting, FAQPage) emit clean JSON.

Outstanding (from yesterday, unchanged):

- No `<link rel="alternate" type="application/llms.txt" href="/llms.txt">` in `<head>`.
- llms-full.txt now claims Twitter/Facebook, but the live Organization schema doesn't - AI assistants reconciling the two will see contradiction.

---

## 7. Images - Score 76/100 (▲ +6)

### Now working

- `/images/og-image.jpg` returns 200, content-type `image/jpeg`, 134 KB.
- Logo `<link>` `type` metadata now correctly `image/png`.
- Home page emits both `og:image` and `twitter:image` pointing to the new asset.

### Outstanding

| Severity   | Issue                                                                                                            | Detail                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High**   | Portfolio og/twitter images still SVG (`/images/portfolio/<slug>.svg`).                                          | `curl -I /images/portfolio/tourillo.png` → 404. LinkedIn, X/Twitter, Facebook, and most AI search citation cards reject SVG. Need raster screenshots. |
| **Medium** | Stub assets in `/public` (`placeholder.jpg`, `placeholder-user.jpg`, descriptively-named JPEGs from v0 template) | unchanged                                                                                                                                             |
| **Low**    | Logo PNG is 132 KB                                                                                               | Compress to ~30 KB.                                                                                                                                   |

---

## 8. Sitemap & Indexability

### Now working

- `BUILD_LAST_MOD` from `VERCEL_GIT_COMMIT_DATE` env (or build time fallback) → real freshness signals.
- Blog entries use real per-post `dateModified` (falls back to `date`).
- `/sitemap-html` URL included.
- Total URL count: 33.

### Outstanding

- Static `priority` and `changeFrequency` still declared (Google ignores both). Harmless. No fix required.

---

## 9. Local SEO - Unchanged

GBP, NAP propagation, KML verification, and Noida service-area pages are still off-site/external concerns from yesterday's audit. No code changes affect this.

---

## Appendix - Re-verified live HTML signals

```
$ curl -I https://bitropix.com/
HTTP/1.1 307 Temporary Redirect       ← still 307 (Action Plan item 3)

$ curl -I https://www.bitropix.com/images/og-image.jpg
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 134160                 ← FIXED

$ curl -s https://www.bitropix.com/ | grep og:image
<meta property="og:image" content="https://www.bitropix.com/images/og-image.jpg"/>   ← FIXED

$ curl -s https://www.bitropix.com/about | grep title
<title>About Bitropix | Leading IT Services Company in Noida, India</title>   ← FIXED (single brand)

$ curl -s https://www.bitropix.com/blogs/digital-transformation-2024-guide | grep title
<title>Complete Guide to Digital Transformation in 2025</title>                ← NEW: missing brand suffix

$ curl -s https://www.bitropix.com/blogs/digital-transformation-2024-guide | grep -E '"date(Published|Modified)"'
"datePublished":"2025-03-15"           ← FIXED
"dateModified":"2025-03-15"            ← FIXED

$ curl -s https://www.bitropix.com/careers/full-stack-developer | grep baseSalary
"baseSalary":{"@type":"MonetaryAmount","currency":"INR","value":{"@type":"QuantitativeValue","minValue":800000,"maxValue":1800000,"unitText":"YEAR"}}   ← FIXED

$ curl -I https://www.bitropix.com/ | grep -i csp
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' ...   ← NEW

$ curl -I https://www.bitropix.com/images/portfolio/tourillo.png
HTTP/1.1 404 Not Found                 ← portfolio og:image still SVG-only
```

See `ACTION-PLAN.md` for the updated, prioritized fix list.
