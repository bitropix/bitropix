# Bitropix - SEO Action Plan (updated 2026-05-12)

Re-prioritized after commit `3bf6fbb` cleared most of yesterday's Critical/High items.

Effort: S = <1h, M = 1–4h, L = 4–8h, XL = 1d+.

---

## ✅ Done in commit `3bf6fbb` (2026-05-12)

| #   | Item                                                             | Status                                                                                                       |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | Strip duplicate `\| Bitropix` from page titles                   | ✅ verified live (home, /about, /services, /portfolio, /portfolio/[slug], /careers, /careers/[role])         |
| 2   | Create `/images/og-image.jpg` + home `openGraph.images`          | ✅ 200, 134 KB JPEG                                                                                          |
| 4   | Fix logo `icons.type` MIME (was `image/webp` for PNG)            | ✅ now `image/png`                                                                                           |
| 5   | ISO-8601 blog dates                                              | ✅ `"2025-03-15"`                                                                                            |
| 6   | JobPosting: regionCode + baseSalary + stable datePosted          | ✅ MonetaryAmount + QuantitativeValue, derived from `lib/careers.ts`                                         |
| 7   | Add Content-Security-Policy                                      | ✅ shipped in Report-Only mode                                                                               |
| 8   | Replace apex URLs in JSON-LD (About BreadcrumbList, Contact url) | ✅ now www                                                                                                   |
| 13  | Centralize FAQPage JSON-LD to `/faq` only                        | ✅ removed from home, /services, /contact                                                                    |
| 14  | `<html lang="en-IN">` (partial)                                  | ⚠️ hreflang `en-IN` + `x-default` added in metadata, but `<html lang="en">` attribute itself not changed yet |
| 15  | Drop `typescript.ignoreBuildErrors`                              | ✅ removed                                                                                                   |
| 16  | Sitemap dynamic lastmod                                          | ✅ uses `VERCEL_GIT_COMMIT_DATE`                                                                             |
| 17  | Hreflang `en-IN` + `x-default`                                   | ✅ in `app/layout.tsx:55-61`                                                                                 |
| 21  | Sync `llms-full.txt` with case studies                           | ✅ added section                                                                                             |
| 28  | Add `/sitemap-html` to XML sitemap                               | ✅                                                                                                           |

---

## Critical - Fix this week

### 1. Apex `bitropix.com` → www to **301** · S

**Still 307 (Temporary).** No code change; do it in Vercel:

- Project Settings → Domains.
- Click apex (`bitropix.com`).
- Change redirect type from Temporary (307/308) to **Permanent (301)** if available, or simply remove the apex domain and re-add it making `www.bitropix.com` the primary - Vercel will issue a 308 (Permanent) by default.

**Verify:** `curl -I https://bitropix.com/` → status 301 or 308 (both permanent).

### 2. Re-attach brand to blog post titles · S

**New regression** from yesterday's fix. The blogs layout disabled template inheritance.

```ts
// app/blogs/layout.tsx  (current)
title: { absolute: 'Blog | Bitropix - Tech Insights & Digital Marketing Tips' }

// change to:
title: {
  default: 'Blog | Bitropix - Tech Insights & Digital Marketing Tips',
  template: '%s | Bitropix',
}
```

This restores `| Bitropix` to every `/blogs/[slug]` title while preserving the listing page's title.

**Verify:** `curl -s https://www.bitropix.com/blogs/digital-transformation-2024-guide | grep '<title>'` → ends with `… | Bitropix`.

### 3. Generate raster portfolio og:images · M

SVG OG images don't render on LinkedIn/Twitter/Facebook. Currently:

- `/images/portfolio/tourillo.svg` → 200
- `/images/portfolio/tourillo.png` → 404

For each of the 4 case studies:

1. Take a 1200×630 PNG screenshot of the live project (or compose a branded "Case Study: X" card).
2. Save to `public/images/portfolio/{slug}.png`.
3. Update `image:` in `lib/portfolio-data.ts` to `.png`.

Keep the SVGs for inline rendering if useful, but the OG image must be raster.

---

## High - Fix this month

### 4. Reconcile Organization `sameAs` with footer + llms-full social claims · S

Footer shows Twitter & Facebook icons. `llms-full.txt:16-17` lists `twitter.com/bitropix` and `facebook.com/bitropix`. `Organization.sameAs` in `app/layout.tsx:133` lists only LinkedIn and Instagram.

Pick one:

- **(a)** Verify both profiles exist, then add to `sameAs`:
  ```ts
  sameAs: [
    'https://www.linkedin.com/company/bitropix/',
    'https://www.instagram.com/bitropix/',
    'https://twitter.com/bitropix',
    'https://www.facebook.com/bitropix',
  ],
  ```
- **(b)** Remove the Twitter/Facebook icons from `components/footer.tsx` and the two lines from `llms-full.txt`.

### 5. Build out service-detail URLs · L _(carried over)_

Split `/services#anchor` into individual `/services/[slug]` pages with 800–1200 unique words each, FAQ block, related case studies, and dedicated `Service` JSON-LD. Update footer hrefs, sitemap, and 301 from old `#anchor`.

### 6. Reconcile claims with evidence · M _(carried over)_

"50+ projects delivered" vs 4 published case studies; "Clutch.co Top IT Services 2025", "NASSCOM 2024", "Startup India 2024" awards. Either ship 6–10 more short case studies or temper claims.

### 7. Author profile pages · L _(carried over)_

Add `app/authors/[slug]/page.tsx` with bio, photo, LinkedIn, expertise, post list. Reference in `BlogPosting.author.@id`.

### 8. Resume blog cadence · L _(carried over)_

Latest post is 2025-03-15 (~14 months stale relative to 2026-05-12). Pick a cadence (1/week or 2/month) and start shipping.

### 9. Promote CSP from Report-Only to enforced · S

After a week of zero violation reports:

- Rename header key in `next.config.mjs:43` from `Content-Security-Policy-Report-Only` → `Content-Security-Policy`.
- Add `report-to` or `report-uri` directive so violations stay observable post-enforcement.

---

## Medium - Fix this quarter

### 10. Canonical trailing-slash consistency · S

Home canonical: `https://www.bitropix.com` (no slash). Sitemap entry: `https://www.bitropix.com/` (with slash). Decide and align both.

### 11. `<html lang="en-IN">` · S

`app/layout.tsx:196` - change `lang="en"` to `lang="en-IN"` to align with the hreflang/openGraph locale.

### 12. CSS-based hero animations · M _(carried over)_

Replace framer-motion infinite rotation in `components/home/hero-section.tsx` with CSS `@keyframes`. Lighter mainthread, better INP. Honor `prefers-reduced-motion`.

### 13. Convert SVG portfolio images to AVIF or WebP (in addition to PNG OG) · M

Once raster screenshots exist (item 3), serve them via `next/image` to get auto AVIF/WebP. Optimize quality at ~0.85.

### 14. Audit and remove unused public/ assets · S _(carried over)_

v0/Vercel template stubs (`placeholder.jpg`, `placeholder-user.jpg`, descriptively named JPEGs).

### 15. Fix unresolved `/services#anchor` hashes in footer · S _(carried over)_

### 16. Add CSP `report-to` endpoint · M

Configure a Vercel function or third-party Reporting API endpoint and add `report-to` directive to the CSP. Otherwise violations are invisible.

### 17. Fix 404 page recoverability · S

`app/not-found.tsx` should include Navbar + Footer for navigation recovery.

### 18. Centralize Twitter username and verify · S

`twitter:creator: '@bitropix'` is declared. Verify the handle exists; if not, either claim it or remove.

---

## Low - Backlog

### 19. Add `<link rel="alternate" type="application/llms.txt" href="/llms.txt">` · S

### 20. Trim `BlogPosting.wordCount` empties · S

### 21. Replace `LocalBusiness.priceRange: '$$'` with a real signal · S

### 22. Compress logo.png (132 KB → ~30 KB) · S

### 23. Verify KML usage in Google Business Profile · S

### 24. Noida / Sector 62 location landing pages · L _(carried over)_

---

## Updated quick-reference checklist

```
[ ] 1.  Apex → www set to 301/308 (Vercel Domains UI)
[ ] 2.  blogs/layout.tsx: switch from absolute to default+template
[ ] 3.  Generate raster portfolio og:images (4 projects)
[ ] 4.  Reconcile Organization.sameAs with footer/llms-full social claims
[ ] 5.  Build /services/[slug] pages
[ ] 6.  Reconcile claims (50+ clients, awards) with published evidence
[ ] 7.  /authors/[slug] pages
[ ] 8.  Resume blog publishing cadence
[ ] 9.  Promote CSP from Report-Only to enforced
[ ] 10. Canonical trailing-slash consistency
[ ] 11. <html lang="en-IN">
[ ] 12. CSS-based hero animations
[ ] 13. Serve portfolio images via next/image (AVIF/WebP)
[ ] 14. Clean unused public/ assets
[ ] 15. Fix unresolved /services#anchor hashes
[ ] 16. Configure CSP report-to endpoint
[ ] 17. 404 page Navbar + Footer
[ ] 18. Verify @bitropix Twitter handle
[ ] 19. <link rel="alternate" type="application/llms.txt">
[ ] 20. Trim BlogPosting wordCount empties
[ ] 21. LocalBusiness.priceRange - real signal
[ ] 22. Compress logo.png
[ ] 23. Verify KML usage in GBP
[ ] 24. Noida/Sector 62 location pages
```

---

## Estimated remaining effort

| Priority     | Items        | Effort                        |
| ------------ | ------------ | ----------------------------- |
| Critical (3) | 1–3          | ~3h                           |
| High (6)     | 4–9          | ~18h                          |
| Medium (9)   | 10–18        | ~14h                          |
| Low (6)      | 19–24        | ~12h                          |
| **Total**    | **24 items** | **~47h** (was ~66h yesterday) |

The 3 Critical items (~3 hours) will close the loop on yesterday's regression and finish the redirect/OG work. After that the Health Score should clear 85.
