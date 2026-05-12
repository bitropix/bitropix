import type { MetadataRoute } from 'next';
import { jobOpenings } from '@/lib/careers';
import { blogPosts } from '@/lib/blog-data';
import { portfolioProjects } from '@/lib/portfolio-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bitropix.com';

// Prefer the Vercel build commit date for accurate freshness signals; fall back to build time.
const BUILD_LAST_MOD = process.env.VERCEL_GIT_COMMIT_DATE ? new Date(process.env.VERCEL_GIT_COMMIT_DATE) : new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const careerRoleUrls: MetadataRoute.Sitemap = jobOpenings.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: BUILD_LAST_MOD,
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const portfolioDetailUrls: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: BUILD_LAST_MOD,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/sitemap-html`,
      lastModified: BUILD_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...portfolioDetailUrls,
    ...blogUrls,
    ...careerRoleUrls,
  ];
}
