import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-config';
import { jobOpenings } from '@/lib/careers';
import { blogPosts } from '@/lib/blog-data';
import { portfolioProjects } from '@/lib/portfolio-data';

// Regenerate at most once an hour.
export const revalidate = 3600;

// Prefer the Vercel build commit date for accurate freshness signals; fall back to build time.
const BUILD_LAST_MOD = process.env.VERCEL_GIT_COMMIT_DATE ? new Date(process.env.VERCEL_GIT_COMMIT_DATE) : new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const add = (entry: MetadataRoute.Sitemap[number]) => {
    if (seen.has(entry.url)) return;
    seen.add(entry.url);
    entries.push(entry);
  };

  // --- Static pages ---
  add({ url: absoluteUrl('/'), lastModified: BUILD_LAST_MOD, changeFrequency: 'weekly', priority: 1 });
  add({ url: absoluteUrl('/services'), lastModified: BUILD_LAST_MOD, changeFrequency: 'weekly', priority: 0.9 });
  add({ url: absoluteUrl('/portfolio'), lastModified: BUILD_LAST_MOD, changeFrequency: 'weekly', priority: 0.85 });
  add({ url: absoluteUrl('/blogs'), lastModified: BUILD_LAST_MOD, changeFrequency: 'weekly', priority: 0.75 });
  add({ url: absoluteUrl('/about'), lastModified: BUILD_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 });
  add({ url: absoluteUrl('/careers'), lastModified: BUILD_LAST_MOD, changeFrequency: 'weekly', priority: 0.7 });
  add({ url: absoluteUrl('/contact'), lastModified: BUILD_LAST_MOD, changeFrequency: 'monthly', priority: 0.8 });
  add({ url: absoluteUrl('/faq'), lastModified: BUILD_LAST_MOD, changeFrequency: 'monthly', priority: 0.6 });
  add({ url: absoluteUrl('/sitemap-html'), lastModified: BUILD_LAST_MOD, changeFrequency: 'monthly', priority: 0.4 });
  add({ url: absoluteUrl('/privacy'), lastModified: BUILD_LAST_MOD, changeFrequency: 'yearly', priority: 0.3 });
  add({ url: absoluteUrl('/terms'), lastModified: BUILD_LAST_MOD, changeFrequency: 'yearly', priority: 0.3 });

  // --- Dynamic pages (wrapped so static routes still emit if a source fails) ---
  try {
    for (const project of portfolioProjects) {
      add({
        url: absoluteUrl(`/portfolio/${project.slug}`),
        lastModified: BUILD_LAST_MOD,
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    }
  } catch (err) {
    console.error('[sitemap] portfolio source failed:', err);
  }

  try {
    for (const post of blogPosts) {
      add({
        url: absoluteUrl(`/blogs/${post.slug}`),
        lastModified: new Date(post.dateModified ?? post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch (err) {
    console.error('[sitemap] blog source failed:', err);
  }

  try {
    for (const job of jobOpenings) {
      add({
        url: absoluteUrl(`/careers/${job.slug}`),
        lastModified: job.validThrough ? new Date(job.postedAt) : BUILD_LAST_MOD,
        changeFrequency: 'weekly',
        priority: 0.65,
      });
    }
  } catch (err) {
    console.error('[sitemap] careers source failed:', err);
  }

  return entries;
}
