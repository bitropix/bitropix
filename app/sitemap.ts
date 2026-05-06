import type { MetadataRoute } from 'next';
import { jobOpenings } from '@/lib/careers';
import { blogPosts } from '@/lib/blog-data';
import { portfolioProjects } from '@/lib/portfolio-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bitropix.com';

const STATIC_LAST_MOD = '2026-05-06';

function parseBlogDate(dateStr: string): Date {
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date(STATIC_LAST_MOD) : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const careerRoleUrls: MetadataRoute.Sitemap = jobOpenings.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: parseBlogDate(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const portfolioDetailUrls: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...portfolioDetailUrls,
    ...blogUrls,
    ...careerRoleUrls,
  ];
}
